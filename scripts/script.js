// LENIS
const initLenis = () => {
    // Initialize Lenis
    const lenis = new Lenis();

    // Use requestAnimationFrame to continuously update the scroll
    function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
}

initLenis()


// TEXT OPACITY ON SCROLL
const paragraph = document.getElementById('paragraph')

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


//ALPINE.JS
document.addEventListener('alpine:init', () => {
    const toggleable = () => ({
        state: false,
        toggle() {
            this.state = !this.state;
        },
    });

    Alpine.data('show', () => toggleable());

    Alpine.store('data', {
        links: links,
        services: services,
        socials: socials,
    });

    Alpine.data('projects', () => ({
        isLoading: true,
        allRepos: undefined,
        filteredRepos: undefined,
        fallbackRepos: latestWork,
        years: [],
        selectedYear: undefined,
        avatar: undefined,

        getData(url) {
            this.isLoading = true;
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    this.allRepos = data;
                    this.avatar = data[0].owner.avatar_url;
                    this.years = [...new Set(data.map(repo => new Date(repo.created_at).getFullYear()))].sort((a, b) => b - a);
                    this.selectedYear = this.years[0];
                    this.filteredRepos = this.allRepos.filter(repo => new Date(repo.created_at).getFullYear() === this.selectedYear);
                })
                .catch((error) => {
                    // console.error('Error fetching data:', error);
                }).finally(() => {
                    this.isLoading = false;
                });
        },

        setSelectedYear(year) {
            this.selectedYear = year;
        },

        filterRepos(year) {
            this.filteredRepos = this.allRepos.filter(repo => new Date(repo.created_at).getFullYear() === year);
        }
    }));
})