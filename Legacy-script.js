class ScrollTextImageEffect {
  constructor() {
    this.textItems = document.querySelectorAll(".slider-text-item");
    this.images = document.querySelectorAll(".slider-image");
    this.currentIndex = 0;
    this.isTransitioning = false;
    this.section = document.querySelector(".legacy-section");
    this.navContainer = document.querySelector(".slider-nav");

    this.initBullets();
    this.init();
  }

  initBullets() {
    this.textItems.forEach((_, idx) => {
      const bullet = document.createElement("div");
      bullet.classList.add("bullet");
      if (idx === 0) bullet.classList.add("active");
      bullet.addEventListener("click", () => this.switchContent(idx));
      this.navContainer.appendChild(bullet);
    });
    this.bullets = this.navContainer.querySelectorAll(".bullet");
  }

  init() {
    // Reveal section as soon as it enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.section.classList.add("visible");
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(this.section);

    // Initial active content
    this.textItems[0]?.classList.add("active");
    this.images[0]?.classList.add("active");

    // Scroll-triggered slide change
    let ticking = false;
    window.addEventListener("scroll", () => {
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
    if (this.isTransitioning) return;

    const rect = this.section.getBoundingClientRect();
    const totalScroll = -rect.top;
    const maxScroll = rect.height - window.innerHeight;

    // Only within scrollable range
    if (totalScroll < 0) {
      this.goToIndex(0);
      return;
    }
    if (totalScroll >= maxScroll) {
      this.goToIndex(this.textItems.length - 1);
      return;
    }

    const progress = totalScroll / maxScroll;
    let rawIndex = Math.floor(progress * this.textItems.length);
    // Clamp index
    const newIndex = Math.min(this.textItems.length - 1, Math.max(0, rawIndex));

    if (newIndex !== this.currentIndex) {
      this.switchContent(newIndex);
    }
  }

  goToIndex(idx) {
    if (idx === this.currentIndex) return;
    this.switchContent(idx);
  }

  switchContent(newIndex) {
    if (this.isTransitioning || newIndex === this.currentIndex) return;
    this.isTransitioning = true;

    // Update bullets
    this.bullets.forEach((b, i) =>
      b.classList.toggle("active", i === newIndex)
    );

    const oldText = this.textItems[this.currentIndex];
    const newText = this.textItems[newIndex];
    const oldImage = this.images[this.currentIndex];
    const newImage = this.images[newIndex];

    oldText.classList.add("prev");
    oldText.classList.remove("active");
    oldImage.classList.add("prev");
    oldImage.classList.remove("active");

    setTimeout(() => {
      newText.classList.add("active");
      newText.classList.remove("prev");
      newImage.classList.add("active");
      newImage.classList.remove("prev");
    }, 100);

    setTimeout(() => {
      oldText.classList.remove("prev");
      oldImage.classList.remove("prev");
      this.isTransitioning = false;
    }, 1000);

    this.currentIndex = newIndex;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new ScrollTextImageEffect();
});
