// Profile hash mapping - keeps customization strategy discrete
const profileMap = {
    'a3f9b2': 'blueyonder',  // Blue Yonder WMS Specialist focus
    'k7x2m9': 'mid',         // Functionally focused profile (formerly SAP)
    'p5n8w1': 'saas',    // SaaS/Cloud focus (formerly Logistics)
    'x9z1y4': 'prompt',  // AI & Prompt Engineering focus
    'm4k9j1': 'kn',       // Kuehne + Nagel (KN) focus
    'a8t1s9': 'byats',   // Blue Yonder ATS Optimized focus
    'b7y2a1': 'atsby',   // ATSWA (ATS Blue Yonder) - No Projects
    'k7n1v2': 'kn_new',  // K+N Targeted (New)
    'd3f4u1': 'default'  // General CV (base translations)
};

// Auto-registration registry - profiles register themselves here
const profileRegistry = {};

function registerProfile(name, data) {
    profileRegistry[name] = data;
}

// Get profile from URL parameter
// Returns: profile name string | '__no_hash__' (no ?v= param) | '__invalid__' (bad hash)
function getProfileFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const hash = urlParams.get('v');
    if (!hash) return '__no_hash__';

    const profile = profileMap[hash];
    if (!profile) {
        console.warn(`Unknown profile hash: "${hash}"`);
        return '__invalid__';
    }
    return profile;
}

// Show 404-style block page when no valid profile hash is present
function show404() {
    document.getElementById('area-cv').style.display = 'none';
    document.getElementById('header').style.display = 'none';

    const overlay = document.createElement('div');
    overlay.id = 'cv-404';
    overlay.innerHTML = `
        <div class="cv-404__container">
            <span class="cv-404__code">404</span>
            <p class="cv-404__text">This page doesn't exist or the link has expired.</p>
        </div>
    `;
    document.body.appendChild(overlay);
}
