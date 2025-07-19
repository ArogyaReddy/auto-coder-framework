
// Auto-Coder Template Builder Webview Script
(function() {
    const vscode = acquireVsCodeApi();
    
    // Initialize the template builder interface
    function initializeTemplateBuilder() {
        setupComponentPalette();
        setupTemplateEditor();
        setupPreviewPane();
        setupEventHandlers();
    }
    
    function setupComponentPalette() {
        const componentList = document.getElementById('component-list');
        const components = [
            { type: 'test-setup', name: 'Test Setup', category: 'structure' },
            { type: 'test-case', name: 'Test Case', category: 'test' },
            { type: 'page-object', name: 'Page Object', category: 'playwright' },
            { type: 'assertion', name: 'Assertion', category: 'test' }
        ];
        
        componentList.innerHTML = components.map(comp => 
            `<div class="component-item" data-type="${comp.type}">
                <span class="component-name">${comp.name}</span>
                <span class="component-category">${comp.category}</span>
            </div>`
        ).join('');
        
        // Add drag handlers
        componentList.querySelectorAll('.component-item').forEach(item => {
            item.draggable = true;
            item.addEventListener('dragstart', handleComponentDragStart);
            item.addEventListener('click', handleComponentClick);
        });
    }
    
    function setupTemplateEditor() {
        const editorContent = document.getElementById('editor-content');
        editorContent.innerHTML = `
            <div class="template-canvas" id="template-canvas">
                <div class="drop-zone" id="drop-zone">
                    <p>Drag components here to build your template</p>
                </div>
            </div>
        `;
        
        const dropZone = document.getElementById('drop-zone');
        dropZone.addEventListener('dragover', handleDragOver);
        dropZone.addEventListener('drop', handleDrop);
    }
    
    function setupPreviewPane() {
        const previewContent = document.getElementById('preview-content');
        previewContent.innerHTML = `
            <div class="preview-area">
                <pre id="preview-text">// Template preview will appear here</pre>
            </div>
        `;
    }
    
    function setupEventHandlers() {
        // Toolbar buttons
        document.getElementById('new-template').addEventListener('click', handleNewTemplate);
        document.getElementById('save-template').addEventListener('click', handleSaveTemplate);
        document.getElementById('preview-toggle').addEventListener('click', handlePreviewToggle);
        document.getElementById('validate-template').addEventListener('click', handleValidateTemplate);
        
        // Preview mode selector
        document.getElementById('preview-mode').addEventListener('change', handlePreviewModeChange);
    }
    
    function handleComponentDragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.dataset.type);
    }
    
    function handleComponentClick(event) {
        const componentType = event.target.closest('.component-item').dataset.type;
        addComponentToTemplate(componentType);
    }
    
    function handleDragOver(event) {
        event.preventDefault();
    }
    
    function handleDrop(event) {
        event.preventDefault();
        const componentType = event.dataTransfer.getData('text/plain');
        addComponentToTemplate(componentType);
    }
    
    function addComponentToTemplate(componentType) {
        vscode.postMessage({
            command: 'addComponent',
            componentType: componentType
        });
        
        // Update the visual representation
        const dropZone = document.getElementById('drop-zone');
        const componentElement = document.createElement('div');
        componentElement.className = 'template-component';
        componentElement.innerHTML = `
            <div class="component-header">
                <span class="component-title">${componentType}</span>
                <button class="component-remove" onclick="removeComponent(this)">×</button>
            </div>
            <div class="component-body">
                <!-- Component configuration will go here -->
            </div>
        `;
        
        dropZone.appendChild(componentElement);
        updatePreview();
    }
    
    function removeComponent(button) {
        const component = button.closest('.template-component');
        component.remove();
        updatePreview();
    }
    
    function handleNewTemplate() {
        if (confirm('Create new template? Unsaved changes will be lost.')) {
            document.getElementById('drop-zone').innerHTML = '<p>Drag components here to build your template</p>';
            updatePreview();
        }
    }
    
    function handleSaveTemplate() {
        vscode.postMessage({
            command: 'saveTemplate',
            template: getCurrentTemplate()
        });
    }
    
    function handlePreviewToggle() {
        const previewPane = document.getElementById('preview-pane');
        previewPane.style.display = previewPane.style.display === 'none' ? 'block' : 'none';
    }
    
    function handleValidateTemplate() {
        vscode.postMessage({
            command: 'validateTemplate',
            template: getCurrentTemplate()
        });
    }
    
    function handlePreviewModeChange(event) {
        const mode = event.target.value;
        updatePreview(mode);
    }
    
    function getCurrentTemplate() {
        const components = Array.from(document.querySelectorAll('.template-component')).map(comp => ({
            type: comp.querySelector('.component-title').textContent,
            config: {} // Would extract actual configuration
        }));
        
        return {
            components: components,
            metadata: {
                name: 'Current Template',
                framework: 'playwright',
                type: 'test'
            }
        };
    }
    
    function updatePreview(mode = 'rendered') {
        const template = getCurrentTemplate();
        vscode.postMessage({
            command: 'generatePreview',
            template: template,
            mode: mode
        });
    }
    
    // Handle messages from extension
    window.addEventListener('message', event => {
        const message = event.data;
        
        switch (message.command) {
            case 'previewUpdated':
                document.getElementById('preview-text').textContent = message.content;
                break;
                
            case 'templateSaved':
                alert('Template saved to: ' + message.path);
                break;
                
            case 'validationResult':
                if (message.valid) {
                    alert('Template is valid!');
                } else {
                    alert('Validation errors: ' + message.errors.join(', '));
                }
                break;
        }
    });
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeTemplateBuilder);
    } else {
        initializeTemplateBuilder();
    }
})();
