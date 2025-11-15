import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export function activate(context: vscode.ExtensionContext) {
    console.log('nb2pdf extension is now active');

    // Register convert notebook command
    let convertCommand = vscode.commands.registerCommand('nb2pdf.convertNotebook', async (uri?: vscode.Uri) => {
        await convertNotebookToPdf(uri, false);
    });

    // Register convert with custom name command
    let convertCustomCommand = vscode.commands.registerCommand('nb2pdf.convertWithCustomName', async (uri?: vscode.Uri) => {
        await convertNotebookToPdf(uri, true);
    });

    // Register configure student info command
    let configureCommand = vscode.commands.registerCommand('nb2pdf.configureStudentInfo', async () => {
        await configureStudentInfo();
    });

    context.subscriptions.push(convertCommand, convertCustomCommand, configureCommand);
}

async function convertNotebookToPdf(uri?: vscode.Uri, customName: boolean = false) {
    try {
        // Get the notebook file path
        const notebookPath = await getNotebookPath(uri);
        if (!notebookPath) {
            vscode.window.showErrorMessage('No notebook file selected');
            return;
        }

        // Get output path
        let outputPath = notebookPath.replace('.ipynb', '.pdf');
        if (customName) {
            const customOutput = await vscode.window.showInputBox({
                prompt: 'Enter PDF output name',
                value: path.basename(outputPath),
                placeHolder: 'output.pdf'
            });
            if (!customOutput) {
                return; // User cancelled
            }
            outputPath = path.join(path.dirname(notebookPath), customOutput);
            if (!outputPath.endsWith('.pdf')) {
                outputPath += '.pdf';
            }
        }

        // Get nb2pdf.py path (bundled with extension or in workspace)
        const nb2pdfScript = await findNb2pdfScript();
        if (!nb2pdfScript) {
            vscode.window.showErrorMessage(
                'nb2pdf.py script error! Please reinstall the extension.',
                'Reinstall Extension'
            ).then(selection => {
                if (selection === 'Reinstall Extension') {
                    vscode.env.openExternal(vscode.Uri.parse('https://marketplace.visualstudio.com/items?itemName=ganesh-kumbhar.nb2pdf'));
                }
            });
            return;
        }

        // Create student_info.json from settings
        const configPath = await createStudentInfoFile();

        // Get Python path
        const pythonPath = await getPythonPath();

        // Show progress
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: 'Converting notebook to PDF',
            cancellable: false
        }, async (progress) => {
            progress.report({ message: 'Executing notebook cells...' });

            // Build command
            const cmd = `"${pythonPath}" "${nb2pdfScript}" "${notebookPath}" --output "${outputPath}" --config "${configPath}"`;

            try {
                // Execute nb2pdf
                const { stdout, stderr } = await execAsync(cmd, {
                    cwd: path.dirname(nb2pdfScript)
                });

                progress.report({ message: 'PDF generated successfully!' });

                // Show success message
                const openPdf = await vscode.window.showInformationMessage(
                    `✅ PDF created: ${path.basename(outputPath)}`,
                    'Open PDF',
                    'Show in Explorer'
                );

                if (openPdf === 'Open PDF') {
                    const config = vscode.workspace.getConfiguration('nb2pdf');
                    if (config.get('autoOpenPdf')) {
                        vscode.env.openExternal(vscode.Uri.file(outputPath));
                    }
                } else if (openPdf === 'Show in Explorer') {
                    vscode.commands.executeCommand('revealFileInOS', vscode.Uri.file(outputPath));
                }

            } catch (error: any) {
                // Handle errors
                handleConversionError(error);
            }
        });

    } catch (error: any) {
        vscode.window.showErrorMessage(`nb2pdf error: ${error.message}`);
    }
}

async function getNotebookPath(uri?: vscode.Uri): Promise<string | undefined> {
    if (uri) {
        return uri.fsPath;
    }

    // Try active editor
    const activeEditor = vscode.window.activeTextEditor || vscode.window.activeNotebookEditor;
    if (activeEditor) {
        const doc = 'document' in activeEditor ? activeEditor.document : activeEditor.notebook;
        if (doc.uri.fsPath.endsWith('.ipynb')) {
            return doc.uri.fsPath;
        }
    }

    // Ask user to select file
    const files = await vscode.window.showOpenDialog({
        canSelectFiles: true,
        canSelectFolders: false,
        canSelectMany: false,
        filters: { 'Jupyter Notebooks': ['ipynb'] },
        title: 'Select Notebook to Convert'
    });

    return files?.[0]?.fsPath;
}

async function findNb2pdfScript(): Promise<string | undefined> {
    // First, try the bundled script in the extension
    const extensionPath = vscode.extensions.getExtension('ganesh-kumbhar.nb2pdf')?.extensionPath;
    if (extensionPath) {
        const bundledScript = path.join(extensionPath, 'scripts', 'nb2pdf.py');
        if (fs.existsSync(bundledScript)) {
            return bundledScript;
        }
    }

    // Fallback: Check workspace root (for development/custom versions)
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders) {
        for (const folder of workspaceFolders) {
            const scriptPath = path.join(folder.uri.fsPath, 'nb2pdf.py');
            if (fs.existsSync(scriptPath)) {
                return scriptPath;
            }
        }
    }

    return undefined;
}

async function getPythonPath(): Promise<string> {
    const config = vscode.workspace.getConfiguration('nb2pdf');
    const customPath = config.get<string>('pythonPath');
    
    if (customPath) {
        return customPath;
    }

    // Try to get Python path from Python extension
    try {
        const pythonExtension = vscode.extensions.getExtension('ms-python.python');
        if (pythonExtension) {
            await pythonExtension.activate();
            const pythonPath = pythonExtension.exports?.settings?.getExecutionDetails?.()?.execCommand?.[0];
            if (pythonPath) {
                return pythonPath;
            }
        }
    } catch (error) {
        // Python extension not available
    }

    // Default to 'python'
    return 'python';
}

async function createStudentInfoFile(): Promise<string> {
    const config = vscode.workspace.getConfiguration('nb2pdf');
    
    const studentInfo = {
        student_name: config.get<string>('studentName') || 'Your Full Name',
        roll_number: config.get<string>('rollNumber') || '21f1234567',
        course: config.get<string>('course') || 'IITM BS Degree - Data Science',
        assignment: config.get<string>('assignment') || 'Assignment Title'
    };

    // Create temp file
    const tempDir = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || process.cwd();
    const configPath = path.join(tempDir, '.nb2pdf_config.json');
    
    fs.writeFileSync(configPath, JSON.stringify(studentInfo, null, 2));
    
    return configPath;
}

async function configureStudentInfo() {
    const config = vscode.workspace.getConfiguration('nb2pdf');

    // Prompt for each field
    const name = await vscode.window.showInputBox({
        prompt: 'Enter your full name',
        value: config.get<string>('studentName'),
        placeHolder: 'John Doe'
    });

    if (name) {
        await config.update('studentName', name, vscode.ConfigurationTarget.Global);
    }

    const rollNumber = await vscode.window.showInputBox({
        prompt: 'Enter your roll number',
        value: config.get<string>('rollNumber'),
        placeHolder: '21f1234567'
    });

    if (rollNumber) {
        await config.update('rollNumber', rollNumber, vscode.ConfigurationTarget.Global);
    }

    const course = await vscode.window.showInputBox({
        prompt: 'Enter your course name',
        value: config.get<string>('course'),
        placeHolder: 'IITM BS Degree - Data Science'
    });

    if (course) {
        await config.update('course', course, vscode.ConfigurationTarget.Global);
    }

    const assignment = await vscode.window.showInputBox({
        prompt: 'Enter assignment title',
        value: config.get<string>('assignment'),
        placeHolder: 'Mini Project Part A'
    });

    if (assignment) {
        await config.update('assignment', assignment, vscode.ConfigurationTarget.Global);
    }

    vscode.window.showInformationMessage('✅ Student information updated!');
}

function handleConversionError(error: any) {
    const errorMsg = error.message || error.toString();
    
    // Check for common errors
    if (errorMsg.includes('ModuleNotFoundError') || errorMsg.includes('No module named')) {
        const moduleName = errorMsg.match(/No module named ['"]([^'"]+)['"]/)?.[1] || 'required module';
        vscode.window.showErrorMessage(
            `Missing Python dependency: ${moduleName}`,
            'Install Dependencies',
            'View Docs'
        ).then(selection => {
            if (selection === 'Install Dependencies') {
                const terminal = vscode.window.createTerminal('nb2pdf - Install Dependencies');
                terminal.show();
                terminal.sendText(`pip install ${moduleName}`);
            } else if (selection === 'View Docs') {
                vscode.env.openExternal(vscode.Uri.parse('https://github.com/ganesh250684/nb2pdf#readme'));
            }
        });
    } else if (errorMsg.includes('python') && errorMsg.includes('not found')) {
        vscode.window.showErrorMessage(
            'Python not found! Please install Python or configure the path.',
            'Open Settings'
        ).then(selection => {
            if (selection === 'Open Settings') {
                vscode.commands.executeCommand('workbench.action.openSettings', 'nb2pdf.pythonPath');
            }
        });
    } else {
        // Generic error
        vscode.window.showErrorMessage(
            `Conversion failed: ${errorMsg}`,
            'View Output'
        ).then(selection => {
            if (selection === 'View Output') {
                // Could show detailed output in a channel
                const outputChannel = vscode.window.createOutputChannel('nb2pdf');
                outputChannel.appendLine(errorMsg);
                outputChannel.show();
            }
        });
    }
}

export function deactivate() {}
