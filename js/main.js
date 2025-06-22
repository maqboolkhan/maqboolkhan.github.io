class PhysicalCardStack {
    constructor() {
        this.cards = document.querySelectorAll('.card');
        this.scrollHint = document.querySelector('.scroll-hint');
        this.scrollHint = document.querySelector('.scroll-hint');
        this.title = document.getElementById('title');
        this.currentIndex = 0;
        this.totalCards = this.cards.length;
        this.scrollProgress = 0;
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    handleScroll() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.querySelector('.scroll-container').offsetHeight;

        const maxScroll = documentHeight - windowHeight;
        this.scrollProgress = Math.min(scrollTop / maxScroll, 1);
        const cardProgress = this.scrollProgress * (this.totalCards - 1);
        const activeCard = Math.floor(cardProgress);

        this.scrollHint.style.display = (this.scrollProgress >= 1)  ? 'none' : 'block';

        if (activeCard == 0 && this.title.textContent != "Hi!") {
            this.title.style.opacity = 0;
            setTimeout(() => {
                this.title.textContent = "Hi!";
                this.title.style.opacity = 1;
            }, 500);
        } 
        if (activeCard == 1 && this.title.textContent != "Maqbool") {
            this.title.style.opacity = 0;
            setTimeout(() => {
                this.title.style.opacity = 1;
                this.title.textContent = "Maqbool";
            }, 500);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PhysicalCardStack();
});