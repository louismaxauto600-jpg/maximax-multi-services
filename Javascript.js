FILE NAME: javascript.js

/* =========================================================
   MAXIMAX MULTI SERVICES
   FILE: javascript.js
   COMPLETE GLOBAL JAVASCRIPT
   ========================================================= */

(() => {
  "use strict";

  /* =======================================================
     ELEMENTS
     ======================================================= */

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const currentYear = document.getElementById("currentYear");

  const languageButtons = document.querySelectorAll(".lang-btn");

  const translatableElements = document.querySelectorAll(
    "[data-en], [data-fr], [data-ht]"
  );

  /* =======================================================
     CURRENT YEAR
     ======================================================= */

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  /* =======================================================
     MOBILE MENU
     ======================================================= */

  if (menuToggle && mainNav) {

    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", () => {

      const isOpen = mainNav.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

      menuToggle.textContent = isOpen ? "✕" : "☰";

    });

    mainNav.querySelectorAll("a").forEach((link) => {

      link.addEventListener("click", () => {

        mainNav.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        menuToggle.textContent = "☰";

      });

    });

  }

  /* =======================================================
     LANGUAGE SYSTEM
     ENG / FRA / KRE
     ======================================================= */

  const LANGUAGE_STORAGE_KEY = "maximaxLanguage";

  const supportedLanguages = [
    "en",
    "fr",
    "ht"
  ];

  function normalizeLanguage(language) {

    if (supportedLanguages.includes(language)) {
      return language;
    }

    return "en";

  }

  function setLanguage(language) {

    const selectedLanguage = normalizeLanguage(language);

    document.documentElement.lang =
      selectedLanguage === "ht"
        ? "ht"
        : selectedLanguage;

    translatableElements.forEach((element) => {

      const translationKey = `data-${selectedLanguage}`;

      const translatedText =
        element.getAttribute(translationKey);

      if (
        translatedText !== null &&
        translatedText.trim() !== ""
      ) {

        element.textContent = translatedText;

      }

    });

    languageButtons.forEach((button) => {

      const buttonLanguage =
        button.getAttribute("data-lang");

      if (buttonLanguage === selectedLanguage) {

        button.classList.add("active");

        button.setAttribute(
          "aria-pressed",
          "true"
        );

      } else {

        button.classList.remove("active");

        button.setAttribute(
          "aria-pressed",
          "false"
        );

      }

    });

    try {

      localStorage.setItem(
        LANGUAGE_STORAGE_KEY,
        selectedLanguage
      );

    } catch (error) {

      console.warn(
        "Language preference could not be saved.",
        error
      );

    }

  }

  languageButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const language =
        button.getAttribute("data-lang");

      setLanguage(language);

    });

  });

  let savedLanguage = "en";

  try {

    const localLanguage =
      localStorage.getItem(
        LANGUAGE_STORAGE_KEY
      );

    if (localLanguage) {
      savedLanguage = localLanguage;
    }

  } catch (error) {

    console.warn(
      "Language preference could not be loaded.",
      error
    );

  }

  setLanguage(savedLanguage);

  /* =======================================================
     SMOOTH SCROLL FOR INTERNAL LINKS
     ======================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener(
        "click",
        function(event) {

          const href =
            this.getAttribute("href");

          if (
            !href ||
            href === "#"
          ) {
            return;
          }

          const target =
            document.querySelector(href);

          if (!target) {
            return;
          }

          event.preventDefault();

          const header =
            document.querySelector("header");

          const headerHeight =
            header
              ? header.offsetHeight
              : 0;

          const targetPosition =
            target.getBoundingClientRect().top +
            window.pageYOffset -
            headerHeight -
            15;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });

        }
      );

    });

  /* =======================================================
     SERVICE CARD KEYBOARD ACCESS
     ======================================================= */

  document
    .querySelectorAll(".service-card")
    .forEach((card) => {

      const cardLink =
        card.querySelector("a");

      if (!cardLink) {
        return;
      }

      card.setAttribute(
        "tabindex",
        "0"
      );

      card.setAttribute(
        "role",
        "link"
      );

      card.addEventListener(
        "keydown",
        (event) => {

          if (
            event.key === "Enter" ||
            event.key === " "
          ) {

            event.preventDefault();

            cardLink.click();

          }

        }
      );

    });

  /* =======================================================
     CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
     ======================================================= */

  document.addEventListener(
    "click",
    (event) => {

      if (
        !mainNav ||
        !menuToggle
      ) {
        return;
      }

      if (
        !mainNav.classList.contains("open")
      ) {
        return;
      }

      const clickedInsideNav =
        mainNav.contains(event.target);

      const clickedMenuButton =
        menuToggle.contains(event.target);

      if (
        !clickedInsideNav &&
        !clickedMenuButton
      ) {

        mainNav.classList.remove("open");

        menuToggle.textContent = "☰";

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    }
  );

  /* =======================================================
     ESCAPE KEY CLOSES MOBILE MENU
     ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key !== "Escape" ||
        !mainNav ||
        !menuToggle
      ) {
        return;
      }

      mainNav.classList.remove("open");

      menuToggle.textContent = "☰";

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

    }
  );

  /* =======================================================
     RESPONSIVE NAV RESET
     ======================================================= */

  window.addEventListener(
    "resize",
    () => {

      if (
        window.innerWidth > 850 &&
        mainNav &&
        menuToggle
      ) {

        mainNav.classList.remove("open");

        menuToggle.textContent = "☰";

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    }
  );

  /* =======================================================
     EXTERNAL LINKS SECURITY
     ======================================================= */

  document
    .querySelectorAll(
      'a[target="_blank"]'
    )
    .forEach((link) => {

      const rel =
        link.getAttribute("rel") || "";

      const relValues =
        new Set(
          rel
            .split(" ")
            .filter(Boolean)
        );

      relValues.add("noopener");
      relValues.add("noreferrer");

      link.setAttribute(
        "rel",
        Array
          .from(relValues)
          .join(" ")
      );

    });

  /* =======================================================
     ACTIVE SECTION NAVIGATION
     ======================================================= */

  const sections =
    document.querySelectorAll(
      "section[id]"
    );

  const navLinks =
    document.querySelectorAll(
      '#mainNav a[href^="#"]'
    );

  if (
    sections.length &&
    navLinks.length &&
    "IntersectionObserver" in window
  ) {

    const observer =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(
            (entry) => {

              if (!entry.isIntersecting) {
                return;
              }

              const id =
                entry.target.id;

              navLinks.forEach(
                (link) => {

                  const href =
                    link.getAttribute("href");

                  if (
                    href === `#${id}`
                  ) {

                    link.classList.add(
                      "active-section"
                    );

                  } else {

                    link.classList.remove(
                      "active-section"
                    );

                  }

                }
              );

            }
          );

        },
        {
          rootMargin:
            "-30% 0px -60% 0px"
        }
      );

    sections.forEach(
      (section) => {
        observer.observe(section);
      }
    );

  }

  /* =======================================================
     PAGE READY
     ======================================================= */

  document.body.classList.add(
    "page-ready"
  );

})();
