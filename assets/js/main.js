/*==================== SHOW MENU ====================*/

const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);

    // Validate that variables exist
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            // We add the show-menu class to the div tag with the nav__menu class
            nav.classList.toggle('show-menu');
        });
    }
};
showMenu('nav-toggle', 'nav-menu');
/*==================== REMOVE MENU MOBILE ====================*/

const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));
/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*==================== SHOW SCROLL TOP ====================*/
function scrollTop() {
    const scrollTop = document.getElementById('scroll-top');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 200) scrollTop.classList.add('show-scroll');
    else scrollTop.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollTop);

/*==================== LANGUAGE SWITCHING ====================*/
const languageButton = document.getElementById('language-button');
const currentLang = localStorage.getItem('selected-lang') || 'en'; // Default to English

// Function to update text content based on language
function updateLanguage(lang) {
    // Update simple text elements with data-lang attribute
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        const keys = key.split('.');
        let value = translations[lang];

        // Navigate nested object
        for (const k of keys) {
            if (value) value = value[k];
        }

        if (value) {
            element.textContent = value;
        }
    });

    // Update section titles
    const sectionTitles = {
        'profile': translations[lang].profile.title,
        'experience': translations[lang].experience.title,
        'skills': translations[lang].skills.title,
        'education': translations[lang].education.title,
        'languages': translations[lang].languages.title,
        'social': translations[lang].social.title
    };

    Object.keys(sectionTitles).forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            const title = section.querySelector('.section-title');
            if (title) title.textContent = sectionTitles[id];
        }
    });

    // Update profile description
    const profileDesc = document.querySelector('.profile__description');
    if (profileDesc) {
        profileDesc.textContent = translations[lang].profile.description;
    }

    // Update experience
    const expContents = document.querySelectorAll('.experience__content');
    expContents.forEach((content, index) => {
        if (translations[lang].experience.jobs[index]) {
            const job = translations[lang].experience.jobs[index];
            const titleEl = content.querySelector('.experience__title');
            const companyEl = content.querySelector('.experience__company');
            const descEl = content.querySelector('.experience__description');

            if (titleEl) titleEl.textContent = job.title;
            if (companyEl) companyEl.textContent = job.company;
            if (descEl) descEl.innerHTML = job.description.replace(/\n/g, '<br>');
        }
    });

    // Update skills
    const skillItems = document.querySelectorAll('.skills__name');
    translations[lang].skills.items.forEach((skill, index) => {
        if (skillItems[index]) {
            const circle = skillItems[index].querySelector('.skills__circle');
            skillItems[index].innerHTML = '';
            if (circle) skillItems[index].appendChild(circle);
            skillItems[index].appendChild(document.createTextNode(skill));
        }
    });

    // Update education
    const eduTitle = document.querySelector('.education__title');
    const eduStudies = document.querySelector('.education__studies');
    const eduYear = document.querySelector('.education__year');
    if (eduTitle) eduTitle.textContent = translations[lang].education.degree;
    if (eduStudies) eduStudies.textContent = translations[lang].education.institution;
    if (eduYear) eduYear.textContent = translations[lang].education.years;

    // Update languages
    const langItems = document.querySelectorAll('.languages__name');
    translations[lang].languages.items.forEach((language, index) => {
        if (langItems[index]) {
            const circle = langItems[index].querySelector('.languages__circle');
            langItems[index].innerHTML = '';
            if (circle) langItems[index].appendChild(circle);
            langItems[index].appendChild(document.createTextNode(language));
        }
    });

    // Store preference
    localStorage.setItem('selected-lang', lang);
}

// Apply saved language on load
if (currentLang) {
    updateLanguage(currentLang);
}

// Toggle language on button click
if (languageButton) {
    languageButton.addEventListener('click', () => {
        const newLang = localStorage.getItem('selected-lang') === 'en' ? 'es' : 'en';
        updateLanguage(newLang);
    });
}

/*==================== DARK LIGHT THEME ====================*/

const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'bx-sun';

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun';

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme);
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});
/*==================== REDUCE THE SIZE AND PRINT ON AN A4 SHEET ====================*/
function scaleCv() {
    document.body.classList.add('scale-cv');
}

/*==================== REMOVE THE SIZE WHEN THE CV IS DOWNLOADED ====================*/

function removeScale() {
    document.body.classList.remove('scale-cv');

}
/*==================== GENERATE PDF (Harvard Format via Print) ====================*/
// Use browser print to respect @media print CSS (Harvard format)
let resumeButton = document.getElementById('resume-button');
let mobileButton = document.querySelector('.home__button-movil');

// Function to generate PDF using browser print
function generateResume() {
    console.log('Opening print dialog for Harvard PDF...');
    window.print();
}

// Desktop download icon
if (resumeButton) {
    resumeButton.addEventListener('click', () => {
        console.log('Desktop download button clicked');
        generateResume();
    });
} else {
    console.error('Resume button not found');
}

// Mobile download button
if (mobileButton) {
    mobileButton.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default link behavior
        console.log('Mobile download button clicked');
        generateResume();
    });
} else {
    console.error('Mobile button not found');
}