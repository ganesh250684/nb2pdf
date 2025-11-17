#!/usr/bin/env python3
"""
Notebook to PDF Converter (nb2pdf)
A professional tool to convert Jupyter notebooks (.ipynb) to beautifully formatted PDFs.

Usage:
    python nb2pdf.py <notebook.ipynb>
    python nb2pdf.py <notebook.ipynb> --output myreport.pdf
    python nb2pdf.py <notebook.ipynb> --config student_info.json

Author: Generated for IITM students
License: Free to use and share
"""

# Set matplotlib to non-interactive backend before any other imports
import matplotlib
matplotlib.use('Agg')  # Use non-interactive backend to prevent popup windows

import json
import sys
import io
import argparse
import re
import os
from pathlib import Path
from datetime import datetime
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle, Preformatted
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.pdfgen import canvas


def get_unique_output_path(output_path):
    """Generate unique output path if file exists by appending datetime.
    
    Args:
        output_path: Path object for desired output file
        
    Returns:
        Path object with unique filename if original exists
    """
    if not output_path.exists():
        return output_path
    
    # File exists, create new name with timestamp
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    stem = output_path.stem
    suffix = output_path.suffix
    parent = output_path.parent
    
    new_name = f"{stem}_{timestamp}{suffix}"
    new_path = parent / new_name
    
    print(f"[INFO] Output file exists. Creating: {new_name}")
    return new_path


class NumberedCanvas(canvas.Canvas):
    """Custom canvas to add page numbers"""
    def __init__(self, *args, **kwargs):
        canvas.Canvas.__init__(self, *args, **kwargs)
        self.pages = []

    def showPage(self):
        self.pages.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        page_count = len(self.pages)
        for page_num in range(page_count):
            self.__dict__.update(self.pages[page_num])
            self.draw_page_number(page_num + 1, page_count)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_page_number(self, page_num, page_count):
        self.setFont("Helvetica", 9)
        self.setFillColorRGB(0, 0, 0)
        # Page number on right
        self.drawRightString(
            A4[0] - 1.5*cm, 1*cm,
            f"Page {page_num} of {page_count}"
        )


def draw_footer(canvas_obj, doc):
    """Draw footer content (extension reference + clickable link)."""
    canvas_obj.saveState()
    canvas_obj.setFont("Helvetica", 7)
    canvas_obj.setFillColorRGB(0.4, 0.4, 0.4)
    footer_text = "Generated using nb2pdf VSCode Extension"
    canvas_obj.drawString(1.5*cm, 1*cm, footer_text)

    link_x = 1.5*cm + canvas_obj.stringWidth(footer_text, "Helvetica", 7) + 0.1*cm
    link_text = "Get Extension"
    canvas_obj.setFillColorRGB(0.2, 0.4, 0.8)
    canvas_obj.drawString(link_x, 1*cm, link_text)

    link_width = canvas_obj.stringWidth(link_text, "Helvetica", 7)
    try:
        canvas_obj.linkURL(
            "https://marketplace.visualstudio.com/items?itemName=GaneshKumbhar.nb2pdf",
            (link_x, 0.8*cm, link_x + link_width, 1.2*cm),
            relative=0
        )
    except Exception:
        pass
    finally:
        canvas_obj.restoreState()


def syntax_highlight_python(code):
    """Apply VS Code-style syntax highlighting to Python code"""
    # VS Code Dark+ theme colors
    COLORS = {
        'keyword': '#C586C0',      # Purple - if, for, def, class, return, etc.
        'builtin': '#4EC9B0',      # Cyan - print, len, str, int, etc.
        'string': '#CE9178',       # Orange - strings
        'comment': '#6A9955',      # Green - comments
        'function': '#DCDCAA',     # Yellow - function names
        'number': '#B5CEA8',       # Light green - numbers
        'default': '#000000'       # Black - default text for better readability
    }
    
    # Python keywords
    keywords = {
        'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 
        'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 
        'except', 'finally', 'for', 'from', 'global', 'if', 'import', 
        'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 
        'return', 'try', 'while', 'with', 'yield'
    }
    
    # Built-in functions
    builtins = {
        'print', 'len', 'str', 'int', 'float', 'list', 'dict', 'set', 
        'tuple', 'range', 'enumerate', 'zip', 'map', 'filter', 'sum', 
        'min', 'max', 'abs', 'all', 'any', 'bool', 'bytes', 'display',
        'isinstance', 'type', 'open', 'sorted', 'append', 'setdefault'
    }
    
    # Tokenize and colorize
    result = []
    i = 0
    while i < len(code):
        # Skip already processed
        char = code[i]
        
        # Comments
        if char == '#':
            end = code.find('\n', i)
            if end == -1:
                end = len(code)
            comment = code[i:end].replace('<', '&lt;').replace('>', '&gt;').replace('&', '&amp;')
            result.append(f'<font color="{COLORS["comment"]}">{comment}</font>')
            i = end
            continue
        
        # Strings
        if char in ('"', "'"):
            quote = char
            j = i + 1
            # Handle triple quotes
            if code[i:i+3] in ('"""', "'''"):
                quote = code[i:i+3]
                j = i + 3
                end = code.find(quote, j)
                if end != -1:
                    end += 3
                else:
                    end = len(code)
            else:
                # Single/double quote
                while j < len(code):
                    if code[j] == '\\' and j + 1 < len(code):
                        j += 2
                    elif code[j] == quote:
                        j += 1
                        break
                    else:
                        j += 1
                end = j
            
            string = code[i:end].replace('<', '&lt;').replace('>', '&gt;').replace('&', '&amp;')
            result.append(f'<font color="{COLORS["string"]}">{string}</font>')
            i = end
            continue
        
        # Numbers
        if char.isdigit():
            j = i
            while j < len(code) and (code[j].isdigit() or code[j] == '.'):
                j += 1
            number = code[i:j]
            result.append(f'<font color="{COLORS["number"]}">{number}</font>')
            i = j
            continue
        
        # Identifiers (keywords, builtins, functions)
        if char.isalpha() or char == '_':
            j = i
            while j < len(code) and (code[j].isalnum() or code[j] == '_'):
                j += 1
            word = code[i:j]
            
            if word in keywords:
                result.append(f'<font color="{COLORS["keyword"]}">{word}</font>')
            elif word in builtins:
                result.append(f'<font color="{COLORS["builtin"]}">{word}</font>')
            else:
                # Check if it's a function definition
                if i > 0 and code[max(0,i-4):i].strip() == 'def':
                    result.append(f'<font color="{COLORS["function"]}">{word}</font>')
                else:
                    result.append(f'<font color="{COLORS["default"]}">{word}</font>')
            i = j
            continue
        
        # Everything else (operators, whitespace, etc.)
        safe_char = char.replace('<', '&lt;').replace('>', '&gt;').replace('&', '&amp;')
        result.append(f'<font color="{COLORS["default"]}">{safe_char}</font>')
        i += 1
    
    return ''.join(result)


def load_config(config_path):
    """Load user info from config file"""
    default_config = {
        "name": "Your Name",
        "id": "",
        "project_title": "",
        "project_subtitle": ""
    }
    
    if config_path and Path(config_path).exists():
        try:
            with open(config_path, 'r', encoding='utf-8') as f:
                config = json.load(f)
                return {**default_config, **config}
        except Exception as e:
            print(f"Warning: Could not load config: {e}")
    
    return default_config


def create_header(config):
    """Create a styled header for the PDF"""
    styles = getSampleStyleSheet()
    
    # Custom title style
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=18,
        textColor=colors.HexColor('#1a237e'),
        spaceAfter=6,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )
    
    # Custom info style
    info_style = ParagraphStyle(
        'InfoStyle',
        parent=styles['Normal'],
        fontSize=11,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#424242')
    )
    
    story = []
    
    # Add title
    story.append(Paragraph("Jupyter Notebook Execution Report", title_style))
    story.append(Spacer(1, 0.3*cm))
    
    # Add user info table
    info_data = [
        ['Name:', config['name']],
        ['ID:', config['id']] if config['id'] else None,
        ['Project Title:', config['project_title']] if config['project_title'] else None,
        ['Project SubTitle:', config['project_subtitle']] if config['project_subtitle'] else None,
        ['Date:', datetime.now().strftime('%B %d, %Y')],
    ]
    info_data = [row for row in info_data if row]  # Remove None rows
    
    info_table = Table(info_data, colWidths=[4*cm, 12*cm])
    info_table.setStyle(TableStyle([
        ('ALIGN', (0, 0), (0, -1), 'RIGHT'),
        ('ALIGN', (1, 0), (1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
        ('FONTNAME', (1, 0), (1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('TEXTCOLOR', (0, 0), (-1, -1), colors.HexColor('#424242')),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
    ]))
    
    story.append(info_table)
    story.append(Spacer(1, 0.5*cm))
    
    # Add horizontal line
    line_data = [['_' * 100]]
    line_table = Table(line_data, colWidths=[17*cm])
    line_table.setStyle(TableStyle([
        ('TEXTCOLOR', (0, 0), (-1, -1), colors.HexColor('#1a237e')),
        ('FONTSIZE', (0, 0), (-1, -1), 8),
    ]))
    story.append(line_table)
    story.append(Spacer(1, 0.5*cm))
    
    return story


def execute_notebook(notebook_path):
    """Execute all cells in notebook and capture outputs"""
    notebook_path = Path(notebook_path).resolve()
    original_cwd = Path.cwd()
    
    # Change to notebook directory for execution so relative paths work
    try:
        os.chdir(notebook_path.parent)
    except Exception as cwd_error:
        print(f"[WARN] Could not change directory to notebook folder {notebook_path.parent}: {cwd_error}")
    
    try:
        with open(notebook_path, 'r', encoding='utf-8') as f:
            nb = json.load(f)
        
        cells = nb.get('cells', [])
        results = []
        
        # Create global namespace for execution
        glb = {'__name__': '__main__'}
        
        # Ensure matplotlib uses non-interactive backend in execution context
        import matplotlib
        matplotlib.use('Agg', force=True)
        import matplotlib.pyplot as plt
        plt.ioff()  # Turn off interactive mode
        
        # Storage for captured DataFrames and plots
        captured_dataframes = []
        captured_plots = []
        
        # Custom display function
        def display(obj):
            try:
                import pandas as pd
                if isinstance(obj, pd.DataFrame):
                    # Store DataFrame for table rendering with a marker
                    marker = f"__DATAFRAME_MARKER_{len(captured_dataframes)}__"
                    captured_dataframes.append(obj.copy())
                    # Print marker so we know where to insert the table
                    print(marker)
                    return
            except:
                pass
            print(repr(obj))
        
        glb['display'] = display
        
        for idx, cell in enumerate(cells, 1):
            cell_type = cell.get('cell_type')
            source = ''.join(cell.get('source', []))
            
            # Reset DataFrame and plot capture for each cell
            captured_dataframes.clear()
            captured_plots.clear()
            
            cell_result = {
                'index': idx,
                'type': cell_type,
                'source': source,
                'output': '',
                'error': None,
                'dataframes': [],
                'plots': []
            }
            
            if cell_type == 'code':
                # Capture stdout and stderr
                old_stdout = sys.stdout
                old_stderr = sys.stderr
                buf_out = io.StringIO()
                buf_err = io.StringIO()
                sys.stdout = buf_out
                sys.stderr = buf_err
                
                try:
                    # Try to eval the last expression to capture its value like Jupyter does
                    # Split into lines and check if last line is an expression
                    lines = source.strip().split('\n')
                    if lines:
                        # Try to compile and exec all but last line, then eval last line
                        try:
                            if len(lines) > 1:
                                exec('\n'.join(lines[:-1]), glb)
                            # Try to evaluate the last line as an expression
                            result = eval(lines[-1], glb)
                            if result is not None:
                                print(repr(result))
                        except SyntaxError:
                            # If last line isn't an expression, just exec everything
                            exec(source, glb)
                    else:
                        exec(source, glb)
                    
                    # Capture matplotlib figures after execution
                    try:
                        import matplotlib.pyplot as plt
                        # Get all figure numbers before capturing
                        fig_nums = plt.get_fignums()
                        if fig_nums:
                            for fig_num in fig_nums:
                                try:
                                    fig = plt.figure(fig_num)
                                    # Save figure to BytesIO
                                    buf = io.BytesIO()
                                    fig.savefig(buf, format='png', dpi=150, bbox_inches='tight')
                                    buf.seek(0)
                                    captured_plots.append(buf.getvalue())
                                except Exception as fig_err:
                                    print(f"Warning: Could not capture figure {fig_num}: {fig_err}", file=sys.stderr)
                            plt.close('all')  # Close all figures to free memory
                    except Exception as plt_err:
                        print(f"Warning: Error capturing plots: {plt_err}", file=sys.stderr)
                        
                except Exception as e:
                    import traceback
                    cell_result['error'] = traceback.format_exc()
                finally:
                    sys.stdout = old_stdout
                    sys.stderr = old_stderr
                
                output = buf_out.getvalue()
                errors = buf_err.getvalue()
                
                if output:
                    cell_result['output'] = output
                if errors:
                    cell_result['output'] += '\n[STDERR]\n' + errors
                
                # Store captured DataFrames and plots
                if captured_dataframes:
                    cell_result['dataframes'] = [df.copy() for df in captured_dataframes]
                if captured_plots:
                    cell_result['plots'] = captured_plots.copy()
            
            results.append(cell_result)
        
        return results
    finally:
        # Restore original working directory
        os.chdir(original_cwd)


def dataframe_to_table(df, max_rows=50):
    """Convert a pandas DataFrame to a ReportLab Table"""
    # Limit rows to prevent huge tables
    if len(df) > max_rows:
        df = df.head(max_rows)
        truncated = True
    else:
        truncated = False
    
    # Prepare data with headers
    data = []
    
    # Add column headers
    headers = [''] + list(df.columns) if df.index.name or not all(isinstance(i, int) and i == idx for idx, i in enumerate(df.index)) else list(df.columns)
    if headers[0] == '':
        headers = ['Index'] + list(df.columns)
        data.append(headers)
        # Add rows with index
        for idx, row in df.iterrows():
            data.append([str(idx)] + [str(val) for val in row])
    else:
        data.append(list(df.columns))
        # Add rows without index
        for _, row in df.iterrows():
            data.append([str(val) for val in row])
    
    # Create table with styling
    table = Table(data, repeatRows=1)
    
    # Apply table style
    table.setStyle(TableStyle([
        # Header row
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1976d2')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, 0), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 9),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 8),
        ('TOPPADDING', (0, 0), (-1, 0), 8),
        
        # Data rows
        ('BACKGROUND', (0, 1), (-1, -1), colors.white),
        ('TEXTCOLOR', (0, 1), (-1, -1), colors.black),
        ('ALIGN', (0, 1), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 1), (-1, -1), 8),
        ('TOPPADDING', (0, 1), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 1), (-1, -1), 4),
        
        # Grid
        ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        
        # Alternating row colors
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f5f5f5')]),
    ]))
    
    return table, truncated


def create_pdf(notebook_path, output_path, config):
    """Create PDF from notebook execution results"""
    print(f"[*] Loading notebook: {notebook_path}")
    
    # Check if output file exists and get unique path if needed
    output_path = get_unique_output_path(Path(output_path))
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    # Execute notebook
    print("[*] Executing cells...")
    results = execute_notebook(notebook_path)
    
    # Create PDF
    print(f"[*] Generating PDF: {output_path}")
    doc = SimpleDocTemplate(
        str(output_path),
        pagesize=A4,
        rightMargin=2*cm,
        leftMargin=2*cm,
        topMargin=2.5*cm,
        bottomMargin=3.5*cm  # Increased to avoid text trimming near page numbers
    )
    
    styles = getSampleStyleSheet()
    
    # Custom styles
    code_style = ParagraphStyle(
        'Code',
        parent=styles['Code'],
        fontSize=9,
        fontName='Courier',
        leftIndent=10,
        rightIndent=10,
        textColor=colors.HexColor('#000000'),  # Darker black for better readability
        backColor=colors.HexColor('#f5f5f5'),
        borderPadding=5,
        spaceBefore=5,
        spaceAfter=5,
        leading=14  # Increased line spacing (was 9, now 14 = ~1.5x line height)
    )
    
    output_style = ParagraphStyle(
        'Output',
        parent=styles['Code'],
        fontSize=9,
        fontName='Courier',
        leftIndent=10,
        rightIndent=10,
        textColor=colors.HexColor('#2e7d32'),
        backColor=colors.HexColor('#e8f5e9'),
        borderPadding=5,
        spaceBefore=5,
        spaceAfter=5,
        leading=14  # Increased line spacing for better readability
    )
    
    error_style = ParagraphStyle(
        'Error',
        parent=styles['Code'],
        fontSize=9,
        fontName='Courier',
        leftIndent=10,
        rightIndent=10,
        textColor=colors.HexColor('#c62828'),
        backColor=colors.HexColor('#ffebee'),
        borderPadding=5,
        leading=14  # Increased line spacing for error messages
    )
    
    cell_header_style = ParagraphStyle(
        'CellHeader',
        parent=styles['Heading3'],
        fontSize=11,
        textColor=colors.HexColor('#1976d2'),
        spaceAfter=5,
        fontName='Helvetica-Bold'
    )
    
    markdown_style = ParagraphStyle(
        'Markdown',
        parent=styles['Normal'],
        fontSize=10,
        leftIndent=10,
        spaceAfter=10
    )
    
    story = []
    
    # Add header
    story.extend(create_header(config))
    
    # Add cells
    for result in results:
        # Cell header
        cell_type_label = "📝 Markdown" if result['type'] == 'markdown' else "💻 Code"
        header_text = f"Cell {result['index']}: {cell_type_label}"
        story.append(Paragraph(header_text, cell_header_style))
        
        if result['type'] == 'markdown':
            # Render markdown as paragraph
            md_text = result['source'].replace('<', '&lt;').replace('>', '&gt;')
            # Simple markdown rendering
            lines = md_text.split('\n')
            for line in lines:
                if line.strip():
                    # Convert markdown headings
                    if line.startswith('# '):
                        story.append(Paragraph(f"<b>{line[2:]}</b>", styles['Heading1']))
                    elif line.startswith('## '):
                        story.append(Paragraph(f"<b>{line[3:]}</b>", styles['Heading2']))
                    elif line.startswith('### '):
                        story.append(Paragraph(f"<b>{line[4:]}</b>", styles['Heading3']))
                    else:
                        story.append(Paragraph(line, markdown_style))
        
        elif result['type'] == 'code':
            # Add code with syntax highlighting
            if result['source'].strip():
                # Split code into lines and apply highlighting per line
                code_lines = result['source'].split('\n')
                for line in code_lines:
                    if line.strip():
                        # Apply syntax highlighting to non-empty lines
                        highlighted = syntax_highlight_python(line)
                        try:
                            story.append(Paragraph(highlighted, code_style))
                        except:
                            # Fallback to plain text if highlighting fails
                            safe_line = line.replace('<', '&lt;').replace('>', '&gt;').replace('&', '&amp;')
                            story.append(Preformatted(safe_line, code_style))
                    else:
                        # Empty line
                        story.append(Spacer(1, 0.1*cm))
            
            # Process output - combine text and DataFrames
            if result.get('output') or result.get('dataframes'):
                story.append(Spacer(1, 0.2*cm))
                story.append(Paragraph("<b>Output:</b>", styles['Normal']))
                story.append(Spacer(1, 0.1*cm))
                
                # If we have DataFrames, split output by markers and insert tables
                if result.get('dataframes'):
                    output_text = result.get('output', '')
                    dataframes = result['dataframes']
                    
                    # Split by DataFrame markers
                    parts = output_text.split('__DATAFRAME_MARKER_')
                    
                    for i, part in enumerate(parts):
                        # First part is text before first DataFrame
                        if i == 0:
                            if part.strip():
                                for line in part.split('\n'):
                                    if line.strip():
                                        safe_line = line.replace('<', '&lt;').replace('>', '&gt;')
                                        story.append(Preformatted(safe_line, output_style))
                        else:
                            # Extract DataFrame index and remaining text
                            if '__' in part:
                                df_idx_str, remaining = part.split('__', 1)
                                try:
                                    df_idx = int(df_idx_str)
                                    if df_idx < len(dataframes):
                                        # Add the DataFrame as a table
                                        story.append(Spacer(1, 0.1*cm))
                                        table, truncated = dataframe_to_table(dataframes[df_idx])
                                        story.append(table)
                                        if truncated:
                                            story.append(Paragraph(f"<i>... (showing first 50 rows)</i>", styles['Italic']))
                                        story.append(Spacer(1, 0.1*cm))
                                        
                                        # Add remaining text after this DataFrame
                                        if remaining.strip():
                                            for line in remaining.split('\n'):
                                                if line.strip():
                                                    safe_line = line.replace('<', '&lt;').replace('>', '&gt;')
                                                    story.append(Preformatted(safe_line, output_style))
                                except (ValueError, IndexError):
                                    # If parsing fails, just show as text
                                    safe_line = part.replace('<', '&lt;').replace('>', '&gt;')
                                    story.append(Preformatted(safe_line, output_style))
                
                # If no DataFrames, just show text output
                elif result.get('output'):
                    output_lines = result['output'].split('\n')
                    for line in output_lines[:100]:  # Limit output lines
                        safe_line = line.replace('<', '&lt;').replace('>', '&gt;')
                        story.append(Preformatted(safe_line, output_style))
                    if len(output_lines) > 100:
                        story.append(Paragraph(f"<i>... ({len(output_lines)-100} more lines truncated)</i>", styles['Italic']))
            
            # Add matplotlib plots
            if result.get('plots'):
                from reportlab.platypus import Image as RLImage
                story.append(Spacer(1, 0.2*cm))
                for plot_data in result['plots']:
                    try:
                        # Create image from bytes
                        img = RLImage(io.BytesIO(plot_data))
                        # Scale to fit page width (max 16cm to leave margins)
                        max_width = 16*cm
                        if img.drawWidth > max_width:
                            aspect = img.drawHeight / img.drawWidth
                            img.drawWidth = max_width
                            img.drawHeight = max_width * aspect
                        story.append(img)
                        story.append(Spacer(1, 0.2*cm))
                    except Exception as e:
                        story.append(Paragraph(f"<i>[Error rendering plot: {str(e)}]</i>", styles['Italic']))
            
            # Add error
            if result['error']:
                story.append(Spacer(1, 0.2*cm))
                story.append(Paragraph("<b>Error:</b>", styles['Normal']))
                error_lines = result['error'].split('\n')
                for line in error_lines:
                    safe_line = line.replace('<', '&lt;').replace('>', '&gt;')
                    story.append(Preformatted(safe_line, error_style))
        
        story.append(Spacer(1, 0.5*cm))
    
    # Build PDF with page numbers and footer
    doc.build(
        story,
        onFirstPage=draw_footer,
        onLaterPages=draw_footer,
        canvasmaker=NumberedCanvas
    )
    print(f"[SUCCESS] PDF created successfully: {output_path}")


def main():
    parser = argparse.ArgumentParser(
        description='Convert Jupyter Notebook to Professional PDF',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python nb2pdf.py mynotebook.ipynb
  python nb2pdf.py mynotebook.ipynb --output report.pdf
  python nb2pdf.py mynotebook.ipynb --config student_info.json
        """
    )
    
    parser.add_argument('notebook', help='Path to Jupyter notebook (.ipynb)')
    parser.add_argument('--output', '-o', help='Output PDF path (default: notebook_name.pdf)')
    parser.add_argument('--config', '-c', help='Student info config file (default: student_info.json)')
    
    args = parser.parse_args()
    
    # Validate notebook path
    notebook_path = Path(args.notebook)
    if not notebook_path.exists():
        print(f"[ERROR] Notebook not found: {notebook_path}")
        sys.exit(1)
    
    if not notebook_path.suffix == '.ipynb':
        print(f"[ERROR] File must be a Jupyter notebook (.ipynb)")
        sys.exit(1)
    
    # Determine output path
    if args.output:
        output_path = Path(args.output)
    else:
        output_path = notebook_path.with_suffix('.pdf')
    
    # Load config
    config_path = args.config or 'student_info.json'
    config = load_config(config_path)
    
    # Create PDF
    try:
        create_pdf(notebook_path, output_path, config)
    except Exception as e:
        print(f"[ERROR] Error creating PDF: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == '__main__':
    main()
