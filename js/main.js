class PhysicalCardStack {
    constructor() {
        this.sectionHeadings = ["Hi!", "Contact", "Experience", "Projects", "Skills", "Extras"];
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

        if (activeCard !== this.currentIndex && activeCard >= 0) {
            const isNotLastCard = this.sectionHeadings[activeCard] !== this.sectionHeadings[this.totalCards - 1]            
            this.currentIndex = activeCard;
        }

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

        

        this.cards.forEach((card, index) => {
            card.classList.remove('visible', 'coming', 'covering', 'covered');

            if (index < cardProgress) {
                card.classList.add('covered');
                card.querySelector(".card-content").style.opacity = Math.max(1 - (cardProgress - index), 0.1);
            } else if (index <= cardProgress + 1) {
                if (index === Math.floor(cardProgress)) {
                    card.classList.add('visible');
                } else {
                    const slideProgress = cardProgress - Math.floor(cardProgress);
                    card.classList.add('covering');
                    card.style.transform = `translateX(-50%) translateY(${(1 - slideProgress) * 100}vh)`;
                }
            } else {
                card.classList.add('coming');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PhysicalCardStack();
});