// Constants for Claude's design system
window.CLAUDE_COLORS = {
  // Light theme
  background: '#eeece2',
  backgroundHover: '#e6e3d6',
  text: '#3d3929',
  accent: '#da7756',
  accentHover: '#bd5d3a',
  border: '#3d3929',
  
  // Dark theme
  darkBackground: '#2e2e2b',
  darkText: '#eeece2',
  darkBorder: 'rgba(238, 236, 226, 0.1)',
  darkAccentBg: 'rgba(218, 119, 86, 0.1)',
  
  // Button theme
  buttonBackground: '#272623',
  buttonBackgroundHover: '#191916'
};

window.CLAUDE_STYLES = {
  fontPrimary: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  fontMono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  borderRadius: '8px',
  modalBorderRadius: '12px',
  transition: 'all 0.2s ease'
};

// Add ACTIONS at the top
window.ACTIONS = {
  'submit': 'Submit Message',
  'newLine': 'New Line',
  'stop': 'Stop Generation',
  'newChat': 'New Chat',
  'focusInput': 'Focus Input',
  'copyLastCode': 'Copy Last Code',
  'copyLastResponse': 'Copy Last Response',
  'showShortcuts': 'Show Shortcuts',
  'clearChat': 'Clear Chat',
  'uploadFile': 'Upload File',
  'toggleSidebar': 'Toggle Sidebar'
};

// Shared modal creation
window.createShortcutsModal = function(shortcuts, isPopup = false) {
  const modal = document.createElement('div');
  modal.id = 'shortcuts-modal';
  
  const baseStyles = `
    background: ${CLAUDE_COLORS.darkBackground};
    padding: 24px;
    border-radius: ${CLAUDE_STYLES.modalBorderRadius};
    font-family: ${CLAUDE_STYLES.fontPrimary};
    color: ${CLAUDE_COLORS.darkText};
    width: 600px;
    max-width: 90vw;
  `;

  modal.style.cssText = isPopup ? baseStyles : `
    ${baseStyles}
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    box-shadow: 0 4px 24px rgba(61, 57, 41, 0.1);
  `;

  const shortcutsList = `
    <div class="shortcuts-grid" style="
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px 24px;
      margin-top: 16px;
      padding-right: 4px;
    ">
      <style>
        .shortcuts-grid {
          overflow-y: auto;
          max-height: 70vh;
        }
        @media (max-width: 640px) {
          .shortcuts-grid {
            grid-template-columns: 1fr !important;
          }
        }
        .shortcuts-grid::-webkit-scrollbar {
          width: 8px;
        }
        .shortcuts-grid::-webkit-scrollbar-track {
          background: transparent;
        }
        .shortcuts-grid::-webkit-scrollbar-thumb {
          background-color: rgba(238, 236, 226, 0.1);
          border-radius: 4px;
        }
      </style>
      ${Object.entries(shortcuts).map(([action, shortcut]) => {
        const keys = [];
        if (shortcut.ctrlKey) keys.push('Ctrl');
        if (shortcut.altKey) keys.push('Alt');
        if (shortcut.shiftKey) keys.push('Shift');
        keys.push(shortcut.key);
        
        return `
          <div style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 6px 0;
          ">
            <div style="
              font-size: 14px;
              color: ${CLAUDE_COLORS.darkText};
            ">${ACTIONS[action]}</div>
            <div style="
              font-family: ${CLAUDE_STYLES.fontMono};
              font-size: 12px;
              color: ${CLAUDE_COLORS.accent};
              padding: 4px 8px;
              background: ${CLAUDE_COLORS.darkAccentBg};
              border-radius: 4px;
              text-align: right;
              margin-left: 12px;
            ">
              ${keys.join(' + ')}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  const closeButton = !isPopup ? `
    <button id="close-shortcuts-modal" style="
      background: none;
      border: none;
      padding: 4px;
      cursor: pointer;
      color: ${CLAUDE_COLORS.darkText};
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>
  ` : '';

  modal.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
      <h2 style="margin: 0; font-size: 18px; font-weight: 500; color: ${CLAUDE_COLORS.darkText};">
        Keyboard Shortcuts
      </h2>
      ${closeButton}
    </div>
    ${shortcutsList}
  `;

  return modal;
};

// Shared floating button creation
window.createFloatingButton = function() {
  const button = document.createElement('button');
  button.id = 'shortcuts-floating-button';
  button.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 5H4V19H20V5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8 9H8.01M12 9H12.01M16 9H16.01M8 13H8.01M12 13H12.01M16 13H16.01M8 17H16" 
            stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
  button.title = 'Keyboard Shortcuts';
  
  button.className = `inline-flex
    items-center
    justify-center
    relative
    shrink-0
    ring-offset-2
    ring-offset-bg-300
    ring-accent-main-100
    focus-visible:outline-none
    focus-visible:ring-1
    disabled:pointer-events-none
    disabled:opacity-50
    disabled:shadow-none
    disabled:drop-shadow-none 
    text-text-200
    border-transparent
    transition-colors
    font-styrene
    active:bg-bg-400
    hover:bg-bg-500/40
    hover:text-text-100 
    h-9 
    w-9 
    rounded-md 
    active:scale-95 
    shrink-0`;

  return button;
};
