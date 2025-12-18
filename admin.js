// ===========================
// ADMIN PANEL LOGIC
// ===========================

// Default password (change this in production!)
const DEFAULT_PASSWORD = 'admin123';

// Check if already logged in
if (localStorage.getItem('adminLoggedIn') === 'true') {
    showDashboard();
}

// Login form handler
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const password = document.getElementById('adminPassword').value;
    const storedPassword = localStorage.getItem('adminPassword') || DEFAULT_PASSWORD;

    if (password === storedPassword) {
        localStorage.setItem('adminLoggedIn', 'true');
        showDashboard();
    } else {
        document.getElementById('loginError').textContent = 'Incorrect password';
    }
});

// Logout handler
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('adminLoggedIn');
    location.reload();
});

// Show dashboard
function showDashboard() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'block';
    loadContent();
}

// Sidebar navigation
document.querySelectorAll('.sidebar-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Show corresponding section
        const section = btn.dataset.section;
        document.querySelectorAll('.editor-section').forEach(s => s.classList.remove('active'));
        document.getElementById(`section-${section}`).classList.add('active');
    });
});

// ===========================
// CONTENT MANAGEMENT
// ===========================

// Load content from localStorage
function loadContent() {
    const content = JSON.parse(localStorage.getItem('siteContent') || '{}');

    // Home page
    if (content.home) {
        document.getElementById('heroTitle').value = content.home.heroTitle || 'GIACOMO BERTAPELLE';
        document.getElementById('heroSubtitle').value = content.home.heroSubtitle || 'Creative Developer & Entrepreneur';
        document.getElementById('heroLocation').value = content.home.heroLocation || 'Bologna, Italy';
        document.getElementById('aboutLead').value = content.home.aboutLead || '';
        document.getElementById('aboutBody').value = content.home.aboutBody || '';
    }

    // Cyber Luna
    if (content.cyberLuna) {
        document.getElementById('cyberLunaTitle').value = content.cyberLuna.title || 'Cyber Luna';
        document.getElementById('cyberLunaCategory').value = content.cyberLuna.category || '';
        document.getElementById('cyberLunaShortDesc').value = content.cyberLuna.shortDesc || '';
        document.getElementById('cyberLunaHeroSubtitle').value = content.cyberLuna.heroSubtitle || '';
        document.getElementById('cyberLunaOrders').value = content.cyberLuna.orders || '340+';
        document.getElementById('cyberLunaRating').value = content.cyberLuna.rating || '4.8/5';
        document.getElementById('cyberLunaRepeat').value = content.cyberLuna.repeat || '35%';
    }

    // 3D Consulting
    if (content.consulting3D) {
        document.getElementById('3dTitle').value = content.consulting3D.title || '3D Print Consulting & Automation';
        document.getElementById('3dCategory').value = content.consulting3D.category || 'Manufacturing · Materials Engineering';
        document.getElementById('3dDesc').value = content.consulting3D.description || '';
    }

    // FabLab
    if (content.fablab) {
        document.getElementById('fablabTitle').value = content.fablab.title || 'FabLab Projects';
        document.getElementById('fablabCategory').value = content.fablab.category || 'Digital Fabrication';
        document.getElementById('fablabDesc').value = content.fablab.description || '';
    }
}

// Save home content
function saveHomeContent() {
    const content = JSON.parse(localStorage.getItem('siteContent') || '{}');

    content.home = {
        heroTitle: document.getElementById('heroTitle').value,
        heroSubtitle: document.getElementById('heroSubtitle').value,
        heroLocation: document.getElementById('heroLocation').value,
        aboutLead: document.getElementById('aboutLead').value,
        aboutBody: document.getElementById('aboutBody').value
    };

    localStorage.setItem('siteContent', JSON.stringify(content));
    showSuccessMessage('Home page content saved!');
}

// Save Cyber Luna content
function saveCyberLunaContent() {
    const content = JSON.parse(localStorage.getItem('siteContent') || '{}');

    content.cyberLuna = {
        title: document.getElementById('cyberLunaTitle').value,
        category: document.getElementById('cyberLunaCategory').value,
        shortDesc: document.getElementById('cyberLunaShortDesc').value,
        heroSubtitle: document.getElementById('cyberLunaHeroSubtitle').value,
        orders: document.getElementById('cyberLunaOrders').value,
        rating: document.getElementById('cyberLunaRating').value,
        repeat: document.getElementById('cyberLunaRepeat').value
    };

    localStorage.setItem('siteContent', JSON.stringify(content));
    showSuccessMessage('Cyber Luna content saved!');
}

// Save 3D Consulting content
function save3DContent() {
    const content = JSON.parse(localStorage.getItem('siteContent') || '{}');

    content.consulting3D = {
        title: document.getElementById('3dTitle').value,
        category: document.getElementById('3dCategory').value,
        description: document.getElementById('3dDesc').value
    };

    localStorage.setItem('siteContent', JSON.stringify(content));
    showSuccessMessage('3D Consulting content saved!');
}

// Save FabLab content
function saveFabLabContent() {
    const content = JSON.parse(localStorage.getItem('siteContent') || '{}');

    content.fablab = {
        title: document.getElementById('fablabTitle').value,
        category: document.getElementById('fablabCategory').value,
        description: document.getElementById('fablabDesc').value
    };

    localStorage.setItem('siteContent', JSON.stringify(content));
    showSuccessMessage('FabLab content saved!');
}

// Change password
function changePassword() {
    const newPassword = document.getElementById('newPassword').value;

    if (newPassword.length < 6) {
        alert('Password must be at least 6 characters');
        return;
    }

    localStorage.setItem('adminPassword', newPassword);
    document.getElementById('newPassword').value = '';
    showSuccessMessage('Password updated successfully!');
}

// Export content
function exportContent() {
    const content = localStorage.getItem('siteContent') || '{}';
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-content.json';
    a.click();
    URL.revokeObjectURL(url);
    showSuccessMessage('Content exported!');
}

// Import content
function importContent() {
    const file = document.getElementById('importFile').files[0];

    if (!file) {
        alert('Please select a file');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const content = JSON.parse(e.target.result);
            localStorage.setItem('siteContent', JSON.stringify(content));
            loadContent();
            showSuccessMessage('Content imported successfully!');
        } catch (error) {
            alert('Invalid JSON file');
        }
    };
    reader.readAsText(file);
}

// Show success message
function showSuccessMessage(message) {
    const existingMsg = document.querySelector('.success-message');
    if (existingMsg) existingMsg.remove();

    const msg = document.createElement('div');
    msg.className = 'success-message';
    msg.textContent = message;

    const activeSection = document.querySelector('.editor-section.active');
    activeSection.appendChild(msg);

    setTimeout(() => msg.remove(), 3000);
}

console.log('🔐 Admin panel loaded');
console.log('💡 Default password: admin123 (change in Settings)');
