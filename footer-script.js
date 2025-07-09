// script.js
document.addEventListener("DOMContentLoaded", () => {
  const footer = document.querySelector(".section-footer");

  function onScroll() {
    const threshold = 100;
    const scrolledToBottom =
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - threshold;
    if (scrolledToBottom) {
      footer.classList.add("visible");
      window.removeEventListener("scroll", onScroll);
    }
  }

  window.addEventListener("scroll", onScroll);
  // immediate check in case page is short
  onScroll();
});
