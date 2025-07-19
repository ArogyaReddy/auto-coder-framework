
const vscode = require('vscode');
const path = require('path');

/**
 * Auto-Coder Framework VS Code Extension
 */
function activate(context) {
    console.log('Auto-Coder Framework extension activated');
    
    // Register commands
    registerCommands(context);
    
    // Register views
    registerViews(context);
    
    // Register webview provider
    registerWebviewProvider(context);
}

function registerCommands(context) {
    // Open Template Builder
    const openBuilder = vscode.commands.registerCommand('auto-coder.openBuilder', () => {
        const panel = vscode.window.createWebviewPanel(
            'auto-coder-builder',
            'Template Builder',
            vscode.ViewColumn.One,
            {
                enableScripts: true,
                localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'webview'))]
            }
        );
        
        panel.webview.html = getWebviewContent(context, panel.webview);
        
        // Handle messages from webview
        panel.webview.onDidReceiveMessage(
            message => handleWebviewMessage(message, panel),
            undefined,
            context.subscriptions
        );
    });
    
    // Generate Template
    const generateTemplate = vscode.commands.registerCommand('auto-coder.generateTemplate', async () => {
        const framework = await vscode.window.showQuickPick(
            ['playwright', 'jest', 'cucumber'],
            { placeHolder: 'Select framework' }
        );
        
        if (framework) {
            const templateType = await vscode.window.showQuickPick(
                ['test', 'page-object', 'step-definition'],
                { placeHolder: 'Select template type' }
            );
            
            if (templateType) {
                await generateTemplateCommand(framework, templateType);
            }
        }
    });
    
    // Discover Templates
    const discoverTemplates = vscode.commands.registerCommand('auto-coder.discoverTemplates', async () => {
        const templates = await discoverTemplatesCommand();
        
        if (templates.length > 0) {
            const selected = await vscode.window.showQuickPick(
                templates.map(t => ({
                    label: t.name,
                    description: t.description,
                    detail: `Framework: ${t.framework}, Type: ${t.type}`,
                    template: t
                })),
                { placeHolder: 'Select template to use' }
            );
            
            if (selected) {
                await useTemplateCommand(selected.template);
            }
        } else {
            vscode.window.showInformationMessage('No templates found');
        }
    });
    
    context.subscriptions.push(openBuilder, generateTemplate, discoverTemplates);
}

function registerViews(context) {
    // Template Explorer
    const templateExplorer = new TemplateExplorer();
    vscode.window.registerTreeDataProvider('auto-coder.templateExplorer', templateExplorer);
    
    // Refresh command
    vscode.commands.registerCommand('auto-coder.refreshTemplates', () => {
        templateExplorer.refresh();
    });
}

function registerWebviewProvider(context) {
    // Template builder webview provider
    const provider = new TemplateBuilderWebviewProvider(context.extensionUri);
    
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider('auto-coder.templateBuilder', provider)
    );
}

async function generateTemplateCommand(framework, templateType) {
    try {
        // Get current file context
        const activeEditor = vscode.window.activeTextEditor;
        const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        
        // Call auto-coder framework
        const { spawn } = require('child_process');
        const process = spawn('npx', ['auto-coder', 'generate', '--framework', framework, '--type', templateType], {
            cwd: workspaceRoot,
            stdio: 'pipe'
        });
        
        let output = '';
        process.stdout.on('data', (data) => {
            output += data.toString();
        });
        
        process.on('close', (code) => {
            if (code === 0) {
                vscode.window.showInformationMessage('Template generated successfully');
                // Open generated file if specified in output
                const fileMatch = output.match(/Generated: (.+)/);
                if (fileMatch && activeEditor) {
                    vscode.workspace.openTextDocument(fileMatch[1]).then(doc => {
                        vscode.window.showTextDocument(doc);
                    });
                }
            } else {
                vscode.window.showErrorMessage('Template generation failed');
            }
        });
        
    } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error.message}`);
    }
}

async function discoverTemplatesCommand() {
    // Call auto-coder framework to discover templates
    return new Promise((resolve, reject) => {
        const { spawn } = require('child_process');
        const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
        
        const process = spawn('npx', ['auto-coder', 'discover', '--format', 'json'], {
            cwd: workspaceRoot,
            stdio: 'pipe'
        });
        
        let output = '';
        process.stdout.on('data', (data) => {
            output += data.toString();
        });
        
        process.on('close', (code) => {
            if (code === 0) {
                try {
                    const templates = JSON.parse(output);
                    resolve(templates);
                } catch (error) {
                    reject(error);
                }
            } else {
                reject(new Error('Discovery failed'));
            }
        });
    });
}

async function useTemplateCommand(template) {
    // Use selected template
    const activeEditor = vscode.window.activeTextEditor;
    if (!activeEditor) {
        vscode.window.showErrorMessage('No active editor');
        return;
    }
    
    // Insert template at cursor position
    const position = activeEditor.selection.active;
    const snippet = new vscode.SnippetString(template.content);
    
    await activeEditor.insertSnippet(snippet, position);
    vscode.window.showInformationMessage(`Template "${template.name}" inserted`);
}

function getWebviewContent(context, webview) {
    const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'webview', 'main.js'));
    const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'webview', 'style.css'));
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Auto-Coder Template Builder</title>
    <link href="${styleUri}" rel="stylesheet">
</head>
<body>
    <div id="app">
        <header>
            <h1>Template Builder</h1>
            <div class="toolbar">
                <button id="new-template">New Template</button>
                <button id="save-template">Save</button>
                <button id="preview-toggle">Toggle Preview</button>
            </div>
        </header>
        
        <main class="main-content">
            <div class="sidebar">
                <div class="component-palette">
                    <h3>Components</h3>
                    <div class="component-list" id="component-list">
                        <!-- Components will be loaded here -->
                    </div>
                </div>
                
                <div class="properties-panel">
                    <h3>Properties</h3>
                    <div class="properties" id="properties">
                        <!-- Properties will be loaded here -->
                    </div>
                </div>
            </div>
            
            <div class="editor-area">
                <div class="template-editor">
                    <div class="editor-header">
                        <span>Template Editor</span>
                        <div class="editor-controls">
                            <button id="validate-template">Validate</button>
                        </div>
                    </div>
                    <div class="editor-content" id="editor-content">
                        <!-- Visual editor will be here -->
                    </div>
                </div>
                
                <div class="preview-pane" id="preview-pane">
                    <div class="preview-header">
                        <span>Preview</span>
                        <select id="preview-mode">
                            <option value="rendered">Rendered</option>
                            <option value="raw">Raw Template</option>
                            <option value="compiled">Compiled</option>
                        </select>
                    </div>
                    <div class="preview-content" id="preview-content">
                        <!-- Preview will be shown here -->
                    </div>
                </div>
            </div>
        </main>
    </div>
    
    <script src="${scriptUri}"></script>
</body>
</html>
    `;
}

function handleWebviewMessage(message, panel) {
    switch (message.command) {
        case 'saveTemplate':
            // Handle save template
            vscode.window.showSaveDialog({
                filters: {
                    'Handlebars Templates': ['hbs']
                }
            }).then(uri => {
                if (uri) {
                    // Save template to file
                    panel.webview.postMessage({
                        command: 'templateSaved',
                        path: uri.fsPath
                    });
                }
            });
            break;
            
        case 'generatePreview':
            // Handle preview generation
            panel.webview.postMessage({
                command: 'previewUpdated',
                content: message.content
            });
            break;
            
        case 'validateTemplate':
            // Handle template validation
            panel.webview.postMessage({
                command: 'validationResult',
                valid: true,
                errors: []
            });
            break;
    }
}

// Template Explorer Tree Data Provider
class TemplateExplorer {
    constructor() {
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    }
    
    refresh() {
        this._onDidChangeTreeData.fire();
    }
    
    getTreeItem(element) {
        return element;
    }
    
    getChildren(element) {
        if (!element) {
            // Root level - show template categories
            return [
                new TemplateItem('Test Templates', vscode.TreeItemCollapsibleState.Expanded, 'category'),
                new TemplateItem('Page Objects', vscode.TreeItemCollapsibleState.Expanded, 'category'),
                new TemplateItem('Step Definitions', vscode.TreeItemCollapsibleState.Expanded, 'category')
            ];
        } else if (element.contextValue === 'category') {
            // Show templates in category
            return this.getTemplatesInCategory(element.label);
        }
        
        return [];
    }
    
    getTemplatesInCategory(category) {
        // This would fetch actual templates
        const templates = {
            'Test Templates': [
                new TemplateItem('Playwright E2E Test', vscode.TreeItemCollapsibleState.None, 'template'),
                new TemplateItem('Jest Unit Test', vscode.TreeItemCollapsibleState.None, 'template')
            ],
            'Page Objects': [
                new TemplateItem('Basic Page Object', vscode.TreeItemCollapsibleState.None, 'template')
            ],
            'Step Definitions': [
                new TemplateItem('Cucumber Steps', vscode.TreeItemCollapsibleState.None, 'template')
            ]
        };
        
        return templates[category] || [];
    }
}

class TemplateItem extends vscode.TreeItem {
    constructor(label, collapsibleState, contextValue) {
        super(label, collapsibleState);
        this.contextValue = contextValue;
        
        if (contextValue === 'template') {
            this.command = {
                command: 'auto-coder.useTemplate',
                title: 'Use Template',
                arguments: [this]
            };
        }
    }
}

// Template Builder Webview Provider
class TemplateBuilderWebviewProvider {
    constructor(extensionUri) {
        this._extensionUri = extensionUri;
    }
    
    resolveWebviewView(webviewView, context, _token) {
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        };
        
        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
    }
    
    _getHtmlForWebview(webview) {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Template Builder</title>
    <style>
        body { font-family: var(--vscode-font-family); }
        .component { 
            padding: 8px; 
            margin: 4px 0; 
            border: 1px solid var(--vscode-panel-border); 
            cursor: pointer; 
        }
        .component:hover { background: var(--vscode-list-hoverBackground); }
    </style>
</head>
<body>
    <h3>Quick Actions</h3>
    <button onclick="openBuilder()">Open Builder</button>
    <button onclick="generateTest()">Generate Test</button>
    
    <h3>Components</h3>
    <div class="component" onclick="addComponent('test-case')">Test Case</div>
    <div class="component" onclick="addComponent('page-object')">Page Object</div>
    <div class="component" onclick="addComponent('assertion')">Assertion</div>
    
    <script>
        const vscode = acquireVsCodeApi();
        
        function openBuilder() {
            vscode.postMessage({ command: 'openBuilder' });
        }
        
        function generateTest() {
            vscode.postMessage({ command: 'generateTest' });
        }
        
        function addComponent(type) {
            vscode.postMessage({ command: 'addComponent', componentType: type });
        }
    </script>
</body>
</html>
        `;
    }
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
