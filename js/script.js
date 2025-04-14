/**
 * Save Our Libraries - Main JavaScript
 * Handles interactive elements like dark mode toggle and responsive navigation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initialize theme based on user preference or system setting
    initializeTheme();
    
    // Set up event listeners
    setupEventListeners();
});

/**
 * Initialize theme based on user preference or system setting
 */
function initializeTheme() {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        // Apply saved theme
        document.body.classList.toggle('dark-mode', savedTheme === 'dark');
        updateThemeIcon(savedTheme === 'dark');
    } else {
        // Check if user's system prefers dark mode
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (prefersDark) {
            document.body.classList.add('dark-mode');
            updateThemeIcon(true);
            localStorage.setItem('theme', 'dark');
        }
    }
}

/**
 * Set up event listeners for interactive elements
 */
function setupEventListeners() {
    // Theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Handle window resize for mobile menu
    window.addEventListener('resize', handleWindowResize);
}

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    updateThemeIcon(isDarkMode);
    
    // Announce theme change for screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('class', 'sr-only');
    announcement.textContent = `Theme changed to ${isDarkMode ? 'dark' : 'light'} mode`;
    document.body.appendChild(announcement);
    
    // Remove announcement after it's been read
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 3000);
}

/**
 * Update the theme toggle icon based on current theme
 */
function updateThemeIcon(isDarkMode) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.textContent = isDarkMode ? '☀️' : '🌓';
        themeToggle.setAttribute('aria-label', isDarkMode ? 'Switch to light mode' : 'Switch to dark mode');
    }
}

/**
 * Toggle mobile menu visibility
 */
function toggleMobileMenu() {
    const mainNav = document.getElementById('main-nav');
    const isVisible = mainNav.classList.toggle('show');
    
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', isVisible ? 'true' : 'false');
    }
}

/**
 * Handle window resize events for mobile menu
 */
function handleWindowResize() {
    if (window.innerWidth > 768) {
        const mainNav = document.getElementById('main-nav');
        if (mainNav && mainNav.classList.contains('show')) {
            mainNav.classList.remove('show');
            
            const menuToggle = document.getElementById('menu-toggle');
            if (menuToggle) {
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    }
}

/**
 * Add accessibility features
 */
// Add screen reader only class
const style = document.createElement('style');
style.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }
`;
document.head.appendChild(style);
