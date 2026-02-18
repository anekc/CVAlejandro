// Profile hash mapping - keeps customization strategy discrete
const profileMap = {
    'a3f9b2': 'blueyonder',  // Blue Yonder WMS Specialist focus
    'k7x2m9': 'mid',         // Functionally focused profile (formerly SAP)
    'p5n8w1': 'saas',    // SaaS/Cloud focus (formerly Logistics)
    'x9z1y4': 'prompt',  // AI & Prompt Engineering focus
    'm4k9j1': 'kn',       // Kuehne + Nagel (KN) focus
    'a8t1s9': 'byats',   // Blue Yonder ATS Optimized focus
    'b7y2a1': 'atsby'    // ATSWA (ATS Blue Yonder) - No Projects
};

// Get profile from URL parameter
function getProfileFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const hash = urlParams.get('v');
    return hash ? profileMap[hash] : null;
}
