(() => {
  "use strict";

  const menu = document.querySelector("[data-menu]");
  const toggle = document.querySelector("[data-menu-toggle]");
  const backTop = document.querySelector("[data-back-top]");

  toggle?.addEventListener("click", () => {
    const open = menu?.classList.toggle("open") ?? false;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.querySelector("i")?.classList.toggle("bi-x-lg", open);
    toggle.querySelector("i")?.classList.toggle("bi-list", !open);
  });

  menu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    menu.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  }));

  window.addEventListener("scroll", () => backTop?.classList.toggle("show", window.scrollY > 600), { passive: true });
  backTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  document.querySelectorAll("[data-counter]").forEach((el) => {
    const target = Number(el.dataset.counter || 0);
    const counterObserver = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      const started = performance.now();
      const duration = 1200;
      const animate = (now) => {
        const progress = Math.min((now - started) / duration, 1);
        el.textContent = `+${Math.floor(target * (1 - Math.pow(1 - progress, 3)))}`;
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
      counterObserver.disconnect();
    }, { threshold: .65 });
    counterObserver.observe(el);
  });
})();
