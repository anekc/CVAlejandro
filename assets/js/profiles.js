// Profile hash mapping - keeps customization strategy discrete
const profileMap = {
    'a3f9b2': 'blueyonder',  // Blue Yonder WMS Specialist focus
    'k7x2m9': 'mid',         // Functionally focused profile (formerly SAP)
    'p5n8w1': 'logistics'    // General Logistics/Supply Chain focus
};

// Get profile from URL parameter
function getProfileFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const hash = urlParams.get('v');
    return hash ? profileMap[hash] : null;
}
