import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export function activate(context: vscode.ExtensionContext) {
    console.log('nb2pdf extension is now active (v1.1.0)');

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

    // Register check dependencies command
    let checkDepsCommand = vscode.commands.registerCommand('nb2pdf.checkDependencies', async () => {
        await checkDependencies(true);
    });

    context.subscriptions.push(convertCommand, convertCustomCommand, configureCommand, checkDepsCommand);
}

async function convertNotebookToPdf(uri?: vscode.Uri, customName: boolean = false) {
    try {
        // Step 1: Check dependencies FIRST
        const depsOk = await checkDependencies(false);
        if (!depsOk) {
            return; // User will see error from checkDependencies
        }

        // Step 2: Get the notebook file path
        const notebookPath = await getNotebookPath(uri);
        if (!notebookPath) {
            vscode.window.showErrorMessage('No notebook file selected');
            return;
        }

        // Step 3: Get output path
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

        // Step 4: Get nb2pdf.py path (bundled with extension or in workspace)
        const nb2pdfScript = await findNb2pdfScript();
        if (!nb2pdfScript) {
            vscode.window.showErrorMessage(
                '❌ nb2pdf.py script not found. Extension may be corrupted.',
                'Reinstall Extension',
                'Get Help'
            ).then(selection => {
                if (selection === 'Reinstall Extension') {
                    vscode.env.openExternal(vscode.Uri.parse('https://marketplace.visualstudio.com/items?itemName=ganesh-kumbhar.nb2pdf'));
                } else if (selection === 'Get Help') {
                    vscode.env.openExternal(vscode.Uri.parse('https://github.com/ganesh250684/nb2pdf/issues'));
                }
            });
            return;
        }

        // Step 5: Create student_info.json from settings
        const configPath = await createStudentInfoFile();

        // Step 6: Get Python path
        const pythonPath = await getPythonPath();

        // Step 7: Show progress
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
                    cwd: path.dirname(nb2pdfScript),
                    timeout: 60000 // 60 second timeout
                });

                progress.report({ message: 'PDF generated successfully!' });

                // Clean up temp config
                try {
                    fs.unlinkSync(configPath);
                } catch (e) {
                    // Ignore cleanup errors
                }

                // Show success message with file size
                const stats = fs.statSync(outputPath);
                const fileSizeKB = (stats.size / 1024).toFixed(2);
                const openPdf = await vscode.window.showInformationMessage(
                    `✅ PDF created successfully: ${path.basename(outputPath)} (${fileSizeKB} KB)`,
                    'Open PDF',
                    'Show in Explorer'
                );

                if (openPdf === 'Open PDF') {
                    vscode.env.openExternal(vscode.Uri.file(outputPath));
                } else if (openPdf === 'Show in Explorer') {
                    vscode.commands.executeCommand('revealFileInOS', vscode.Uri.file(outputPath));
                }

            } catch (error: any) {
                // Clean up temp config
                try {
                    fs.unlinkSync(configPath);
                } catch (e) {
                    // Ignore
                }
                
                // IMPORTANT: Check if PDF was actually created despite stderr output
                // Sometimes warnings go to stderr but PDF is still generated successfully
                if (fs.existsSync(outputPath)) {
                    const stats = fs.statSync(outputPath);
                    if (stats.size > 0) {
                        // PDF was created successfully despite stderr warnings
                        const fileSizeKB = (stats.size / 1024).toFixed(2);
                        const openPdf = await vscode.window.showInformationMessage(
                            `✅ PDF created successfully: ${path.basename(outputPath)} (${fileSizeKB} KB)\n\n(Note: Some warnings were generated but PDF is complete)`,
                            'Open PDF',
                            'Show in Explorer'
                        );

                        if (openPdf === 'Open PDF') {
                            vscode.env.openExternal(vscode.Uri.file(outputPath));
                        } else if (openPdf === 'Show in Explorer') {
                            vscode.commands.executeCommand('revealFileInOS', vscode.Uri.file(outputPath));
                        }
                        return; // Exit - don't show error
                    }
                }
                
                // Only show error if PDF wasn't created or is empty
                handleConversionError(error, notebookPath);
            }
        });

    } catch (error: any) {
        vscode.window.showErrorMessage(`nb2pdf error: ${error.message}`);
    }
}

/**
 * Check if all required dependencies are installed
 */
async function checkDependencies(showSuccess: boolean = false): Promise<boolean> {
    try {
        const pythonPath = await getPythonPath();
        
        // Check 1: Python is available
        try {
            await execAsync(`"${pythonPath}" --version`);
        } catch (error) {
            vscode.window.showErrorMessage(
                '❌ Python not found! Please install Python 3.8 or higher.',
                'Download Python',
                'Configure Path'
            ).then(selection => {
                if (selection === 'Download Python') {
                    vscode.env.openExternal(vscode.Uri.parse('https://www.python.org/downloads/'));
                } else if (selection === 'Configure Path') {
                    vscode.commands.executeCommand('workbench.action.openSettings', 'nb2pdf.pythonPath');
                }
            });
            return false;
        }

        // Check 2: reportlab is installed
        try {
            const { stdout, stderr } = await execAsync(`"${pythonPath}" -c "import reportlab; print(reportlab.Version)"`);
            const version = stdout.trim();
            
            if (showSuccess) {
                vscode.window.showInformationMessage(
                    `✅ All dependencies OK!\n\nPython: ${pythonPath}\nreportlab: ${version}`
                );
            }
            return true;
            
        } catch (error) {
            // reportlab not installed - show helpful error
            const result = await vscode.window.showErrorMessage(
                '❌ Missing required library: reportlab\n\nThis Python library is required to generate PDFs.',
                'Install Now',
                'Manual Install',
                'Learn More'
            );

            if (result === 'Install Now') {
                // Auto-install reportlab
                const terminal = vscode.window.createTerminal('nb2pdf - Installing reportlab');
                terminal.show();
                terminal.sendText(`${pythonPath} -m pip install reportlab`);
                
                vscode.window.showInformationMessage(
                    '⏳ Installing reportlab... Please wait for installation to complete, then try again.',
                    'OK'
                );
            } else if (result === 'Manual Install') {
                // Show manual install instructions
                showManualInstallInstructions();
            } else if (result === 'Learn More') {
                vscode.env.openExternal(vscode.Uri.parse('https://github.com/ganesh250684/nb2pdf#installation'));
            }
            
            return false;
        }

    } catch (error: any) {
        vscode.window.showErrorMessage(`Dependency check failed: ${error.message}`);
        return false;
    }
}

/**
 * Show manual installation instructions
 */
function showManualInstallInstructions() {
    const panel = vscode.window.createWebviewPanel(
        'nb2pdfInstall',
        'Install nb2pdf Dependencies',
        vscode.ViewColumn.One,
        {}
    );

    panel.webview.html = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; }
        code { background: #f0f0f0; padding: 2px 6px; border-radius: 3px; }
        pre { background: #2d2d2d; color: #f8f8f8; padding: 15px; border-radius: 5px; overflow-x: auto; }
        .step { margin: 20px 0; padding: 15px; border-left: 4px solid #007acc; background: #f8f8f8; }
        .success { color: #28a745; }
        .error { color: #dc3545; }
        h1 { color: #007acc; }
        h2 { color: #333; }
    </style>
</head>
<body>
    <h1>📦 Install nb2pdf Dependencies</h1>
    
    <div class="step">
        <h2>Step 1: Open Terminal</h2>
        <p>Open PowerShell, Command Prompt, or VS Code Terminal</p>
    </div>

    <div class="step">
        <h2>Step 2: Run Install Command</h2>
        <pre>pip install reportlab</pre>
        <p><strong>OR</strong> if you have multiple Python versions:</p>
        <pre>python -m pip install reportlab</pre>
    </div>

    <div class="step">
        <h2>Step 3: Verify Installation</h2>
        <pre>python -c "import reportlab; print('✅ Success!')"</pre>
        <p>You should see: <code class="success">✅ Success!</code></p>
    </div>

    <div class="step">
        <h2>Step 4: Reload VS Code</h2>
        <p>Press <code>Ctrl+Shift+P</code> → Type "Reload Window" → Press Enter</p>
    </div>

    <h2>🐛 Troubleshooting</h2>
    
    <div class="step">
        <h3>Error: "pip is not recognized"</h3>
        <p>Solution:</p>
        <pre>python -m pip install reportlab</pre>
    </div>

    <div class="step">
        <h3>Error: "Permission denied"</h3>
        <p>Solution (Run as Administrator or use --user flag):</p>
        <pre>pip install --user reportlab</pre>
    </div>

    <div class="step">
        <h3>Still not working?</h3>
        <p>Check the full troubleshooting guide:</p>
        <p><a href="https://github.com/ganesh250684/nb2pdf#troubleshooting">nb2pdf Troubleshooting Guide</a></p>
    </div>

    <p><strong>💡 Tip:</strong> After installation, run "nb2pdf: Check Dependencies" command to verify everything is working!</p>
</body>
</html>
    `;
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
    const extensionPath = vscode.extensions.getExtension('ganeshkumbhar.nb2pdf')?.extensionPath;
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

function handleConversionError(error: any, notebookPath: string) {
    const errorMsg = error.message || error.toString();
    
    // Check for specific error patterns
    if (errorMsg.includes('ModuleNotFoundError') || errorMsg.includes('No module named')) {
        const moduleName = errorMsg.match(/No module named ['"]([^'"]+)['"]/)?.[1] || 'reportlab';
        vscode.window.showErrorMessage(
            `❌ Missing Python library: ${moduleName}\n\nRequired for PDF generation.`,
            'Install ' + moduleName,
            'Troubleshooting Guide'
        ).then(selection => {
            if (selection === 'Install ' + moduleName) {
                const terminal = vscode.window.createTerminal('nb2pdf - Install Dependencies');
                terminal.show();
                terminal.sendText(`pip install ${moduleName}`);
            } else if (selection === 'Troubleshooting Guide') {
                vscode.env.openExternal(vscode.Uri.parse('https://github.com/ganesh250684/nb2pdf/blob/main/EXTENSION_ERROR_FIX.md'));
            }
        });
    } else if (errorMsg.includes('SyntaxError') || errorMsg.includes('IndentationError')) {
        vscode.window.showErrorMessage(
            `❌ Syntax error in notebook: ${path.basename(notebookPath)}\n\nPlease fix Python errors in your notebook first.`,
            'Open Notebook'
        ).then(selection => {
            if (selection === 'Open Notebook') {
                vscode.commands.executeCommand('vscode.open', vscode.Uri.file(notebookPath));
            }
        });
    } else if (errorMsg.includes('timeout') || errorMsg.includes('timed out')) {
        vscode.window.showErrorMessage(
            '❌ Conversion timed out\n\nYour notebook may have cells that take too long to execute.',
            'View Notebook'
        ).then(selection => {
            if (selection === 'View Notebook') {
                vscode.commands.executeCommand('vscode.open', vscode.Uri.file(notebookPath));
            }
        });
    } else if (errorMsg.toLowerCase().includes('python') && (errorMsg.includes('not found') || errorMsg.includes('not recognized'))) {
        vscode.window.showErrorMessage(
            '❌ Python not found!\n\nPlease install Python 3.8+ or configure the path.',
            'Download Python',
            'Configure Path'
        ).then(selection => {
            if (selection === 'Download Python') {
                vscode.env.openExternal(vscode.Uri.parse('https://www.python.org/downloads/'));
            } else if (selection === 'Configure Path') {
                vscode.commands.executeCommand('workbench.action.openSettings', 'nb2pdf.pythonPath');
            }
        });
    } else {
        // Generic error with detailed output
        const outputChannel = vscode.window.createOutputChannel('nb2pdf Error Details');
        outputChannel.appendLine('='.repeat(50));
        outputChannel.appendLine('nb2pdf Conversion Error');
        outputChannel.appendLine('='.repeat(50));
        outputChannel.appendLine(`Notebook: ${notebookPath}`);
        outputChannel.appendLine(`Time: ${new Date().toISOString()}`);
        outputChannel.appendLine('');
        outputChannel.appendLine('Error Details:');
        outputChannel.appendLine(errorMsg);
        outputChannel.appendLine('');
        outputChannel.appendLine('='.repeat(50));
        outputChannel.show();

        vscode.window.showErrorMessage(
            `❌ Conversion failed\n\nSee Output panel for details.`,
            'View Output',
            'Get Help'
        ).then(selection => {
            if (selection === 'View Output') {
                outputChannel.show();
            } else if (selection === 'Get Help') {
                vscode.env.openExternal(vscode.Uri.parse('https://github.com/ganesh250684/nb2pdf/issues'));
            }
        });
    }
}

export function deactivate() {}
