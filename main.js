/* ==========================================================================
   SDG 11 — Sustainable Cities and Communities
   main.js — theme toggle, card filter, accordion
   ========================================================================== */

(function () {
  "use strict";

  /* ---------- Dark / light theme toggle ---------- */
  function initTheme() {
    var body = document.body;
    var toggleBtn = document.querySelector("[data-theme-toggle]");
    var stored = null;

    try {
      stored = localStorage.getItem("sdg11-theme");
    } catch (err) {
      stored = null;
    }

    if (stored === "dark") {
      body.classList.add("dark-theme");
    }

    updateToggleLabel();

    if (toggleBtn) {
      toggleBtn.addEventListener("click", function () {
        body.classList.toggle("dark-theme");
        var isDark = body.classList.contains("dark-theme");
        try {
          localStorage.setItem("sdg11-theme", isDark ? "dark" : "light");
        } catch (err) {
          /* storage unavailable — theme still works for this page view */
        }
        updateToggleLabel();
      });
    }

    function updateToggleLabel() {
      if (!toggleBtn) return;
      var isDark = body.classList.contains("dark-theme");
      toggleBtn.textContent = isDark ? "☀ Light mode" : "☾ Dark mode";
    }
  }

  /* ---------- Filterable action cards ---------- */
  function initFilters() {
    var bar = document.querySelector("[data-filter-bar]");
    if (!bar) return;

    var buttons = bar.querySelectorAll(".filter-btn");
    var cards = document.querySelectorAll(".action-card");

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");

        var category = btn.getAttribute("data-category");

        cards.forEach(function (card) {
          var matches = category === "all" || card.getAttribute("data-category") === category;
          card.hidden = !matches;
        });
      });
    });
  }

  /* ---------- Accordion (secondary interactive component) ---------- */
  function initAccordion() {
    var triggers = document.querySelectorAll(".accordion-trigger");

    triggers.forEach(function (trigger) {
      var panel = document.getElementById(trigger.getAttribute("aria-controls"));
      if (!panel) return;

      trigger.addEventListener("click", function () {
        var expanded = trigger.getAttribute("aria-expanded") === "true";

        trigger.setAttribute("aria-expanded", String(!expanded));

        if (expanded) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    });
  }

  /* ---------- Mobile Header Scroll Hide/Show ---------- */
    function initHeaderScroll() {
      var header = document.querySelector(".site-header");
      if (!header) return;

      var lastScrollTop = 0;
      var delta = 5;

      window.addEventListener("scroll", function () {
        // Only apply on mobile viewports (matches style.css @media max-width: 760px)
        if (window.innerWidth > 760) {
          header.classList.remove("header-hidden");
          return;
        }

        var st = window.pageYOffset || document.documentElement.scrollTop;

        if (Math.abs(lastScrollTop - st) <= delta) return;

        if (st > lastScrollTop && st > header.offsetHeight) {
          // Scrolling Down -> Hide Header
          header.classList.add("header-hidden");
        } else {
          // Scrolling Up -> Show Header
          header.classList.remove("header-hidden");
        }

        lastScrollTop = st;
      }, { passive: true });
    }

    document.addEventListener("DOMContentLoaded", function () {
      initTheme();
      initFilters();
      initAccordion();
      initHeaderScroll();
    });
  })();
