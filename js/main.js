/**
 * 品牌展示站 - 交互脚本
 */

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = navMenu.querySelectorAll("a");

  // ========== 1. 移动端菜单切换 ==========
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("open");
  });

  // 点击链接后关闭菜单
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active");
      navMenu.classList.remove("open");
    });
  });

  // ========== 2. 导航栏滚动效果 ==========
  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // ========== 3. 滚动渐入动画 ==========
  const fadeElements = document.querySelectorAll(
    ".about-grid, .services-grid, .contact-grid, .section-header, .stats"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeElements.forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });

  // ========== 4. 数字递增动画 ==========
  const statNumbers = document.querySelectorAll(".stat-num");

  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count);
          animateCount(el, target);
          countObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((el) => countObserver.observe(el));

  function animateCount(el, target) {
    let current = 0;
    const step = Math.ceil(target / 40);
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      el.textContent = current;
    }, 30);
  }

  // ========== 5. 联系表单提交 ==========
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector("button[type='submit']");
      const originalText = btn.textContent;
      btn.textContent = "已发送 ✓";
      btn.style.background = "#16a34a";
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = "";
        form.reset();
      }, 2500);
    });
  }
});
