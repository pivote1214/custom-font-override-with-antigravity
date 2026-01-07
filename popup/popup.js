// Custom Font Override - Popup Script

document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const enabledToggle = document.getElementById('enabled');
    const normalFontInput = document.getElementById('normalFont');
    const codeFontInput = document.getElementById('codeFont');
    const mathFontInput = document.getElementById('mathFont');
    const saveBtn = document.getElementById('saveBtn');
    const statusEl = document.getElementById('status');

    // Default settings
    const DEFAULT_SETTINGS = {
        enabled: true,
        normalFont: 'Noto Sans JP',
        codeFont: 'Cascade Mono',
        mathFont: 'Cambria Math'
    };

    // Load saved settings
    function loadSettings() {
        chrome.storage.sync.get(DEFAULT_SETTINGS, (settings) => {
            enabledToggle.checked = settings.enabled;
            normalFontInput.value = settings.normalFont;
            codeFontInput.value = settings.codeFont;
            mathFontInput.value = settings.mathFont;
            updateDisabledState();
        });
    }

    // Save settings
    function saveSettings() {
        const settings = {
            enabled: enabledToggle.checked,
            normalFont: normalFontInput.value.trim() || DEFAULT_SETTINGS.normalFont,
            codeFont: codeFontInput.value.trim() || DEFAULT_SETTINGS.codeFont,
            mathFont: mathFontInput.value.trim() || DEFAULT_SETTINGS.mathFont
        };

        chrome.storage.sync.set(settings, () => {
            showStatus('✓ 設定を保存しました');

            // Reload current tab to apply changes
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs[0] && tabs[0].id) {
                    chrome.tabs.reload(tabs[0].id);
                }
            });
        });
    }

    // Show status message
    function showStatus(message) {
        statusEl.textContent = message;
        statusEl.classList.add('show');

        setTimeout(() => {
            statusEl.classList.remove('show');
        }, 2000);
    }

    // Update disabled state
    function updateDisabledState() {
        if (enabledToggle.checked) {
            document.body.classList.remove('disabled');
        } else {
            document.body.classList.add('disabled');
        }
    }

    // Event listeners
    enabledToggle.addEventListener('change', updateDisabledState);
    saveBtn.addEventListener('click', saveSettings);

    // Allow Enter key to save
    [normalFontInput, codeFontInput, mathFontInput].forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveSettings();
            }
        });
    });

    // Initial load
    loadSettings();
});
