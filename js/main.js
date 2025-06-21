class PhysicalCardStack {
    constructor() {
        this.sectionHeadings = ["Hi!", "Contact", "Experience", "Projects", "Skills", "Extras"];
        this.cards = document.querySelectorAll('.card');
        this.progressActive = document.querySelector('.progress-dot.active');
        this.progressNext = document.querySelector('.progress-dot.next');
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

    animateProgressText(newText, isNotLastCard) {
        const oldSpan = this.progressActive.querySelector('.text');
        const newSpan = document.createElement('span');
        newSpan.className = 'text slide-in';

        newSpan.textContent = newText;
        this.progressActive.replaceChild(newSpan, oldSpan);

        // Force reflow
        newSpan.offsetWidth;

        newSpan.classList.add('active');
        oldSpan.classList.add('slide-out');
        oldSpan.classList.add('active');


        oldSpan.addEventListener('transitionend', () => oldSpan.remove(), { once: true });

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

            if (isNotLastCard) {
                this.progressActive.querySelector("span").style.color = "#000";
                this.progressNext.querySelector("span").style.color = "#9e9b9b";
                // We dont want to update text of next dot if it is the last card
                this.progressNext.querySelector('.text').textContent = this.sectionHeadings[activeCard + 1] || '';
                this.animateProgressText(
                    this.sectionHeadings[activeCard] || '',
                    isNotLastCard
                );
            } else {
                this.progressActive.querySelector("span").style.color = "#9e9b9b";
                this.progressNext.querySelector("span").style.color = "#000";
            }

            this.currentIndex = activeCard;
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