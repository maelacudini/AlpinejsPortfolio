// TAILWIND DARK MODE
// TODO: USE https://alpinejs.dev/directives/on @click, also find a way to set the icon with x-if or something like that
const themeSwitch = document.getElementById('theme-switch')

function setTheme() {
    if (document.documentElement.classList.contains('dark')) {
        themeSwitch.innerHTML = `<i class="bi bi-moon"></i>`;
        document.documentElement.classList.remove('dark')
    } else {
        themeSwitch.innerHTML = `<i class="bi bi-brightness-low"></i>`;
        document.documentElement.classList.add('dark');
    }
}


// LENIS SMOOTH SCROLL
const initLenis = () => {
    const lenis = new Lenis({
        content: document.getElementById('body'),
        lerp: 0.1,
        smoothWheel: true,
    })

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
}

initLenis()


// TEXT OPACITY ON SCROLL
const paragraph = document.getElementById('paragraph')

function splitText() {
    const text = "I'm a Front End developer based in Berlin, Germany. Let's build your future together."

    text.split('').forEach(letter => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.classList.add('letter');
        paragraph.appendChild(span);
    });
}

function reduceLettersOpacity() {
    const letters = document.querySelectorAll('#paragraph .letter');
    const scrollPosition = window.scrollY;
    const scrollPercentage = Math.min(scrollPosition / paragraph.clientHeight, 1);
    const maxLettersToFade = Math.round(letters.length * scrollPercentage);

    letters.forEach((letter, index) => {
        if (index < maxLettersToFade) {
            letter.style.opacity = 0.4;
        } else {
            letter.style.opacity = 1;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    splitText();
});

document.addEventListener('scroll', () => {
    reduceLettersOpacity();
});

// FETCH DATA
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        return json.data;
    } catch (error) {
        console.error(error.message);
    }
}

//ALPINE.JS
document.addEventListener('alpine:init', () => {
    Alpine.store('data', {
        links: links,
        selectedYear: new Date().getFullYear(),
        selectYear(year) {
            this.selectedYear = year
        },
        years: years,
        projects: projects,
        services: services,
        socials: socials
    });
    Alpine.data('show', () => ({
        show: false,

        toggleShow() {
            this.show = !this.show
        },
    }));
    Alpine.data('lazyLoad', () => ({
        load: false,

        lazyLoad() {
            this.load = !this.load
        },
    }));
    Alpine.data('expanded', () => ({
        expanded: false,

        toggleExpanded() {
            this.expanded = !this.expanded
        },
    }));
})