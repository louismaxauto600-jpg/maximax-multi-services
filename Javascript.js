/* =========================================================
   MAXIMAX MULTI SERVICES
   javascript.js — COMPLETE & FINAL
   LANGUAGES: ENG / ESP / KRE
   NO FRA
   ========================================================= */

(function () {
  "use strict";

  /* =======================================================
     GLOBAL ELEMENTS
  ======================================================= */

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const currentYear = document.getElementById("currentYear");

  const languageButtons = document.querySelectorAll(".lang-btn");

  const STORAGE_KEY = "maximaxLanguage";

  const SUPPORTED_LANGUAGES = ["en", "es", "ht"];


  /* =======================================================
     CURRENT YEAR
  ======================================================= */

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* =======================================================
     LANGUAGE SYSTEM
     🇺🇸 ENG
     🇪🇸 ESP
     🇭🇹 KRE
  ======================================================= */

  function setLanguage(language) {

    if (!SUPPORTED_LANGUAGES.includes(language)) {
      language = "en";
    }

    document.documentElement.lang =
      language === "ht" ? "ht" : language;


    /* -------------------------------------------------------
       CHANGE PAGE TEXT
    ------------------------------------------------------- */

    const translatedElements = document.querySelectorAll(
      "[data-en], [data-es], [data-ht]"
    );

    translatedElements.forEach(function (element) {

      let translatedText = "";

      if (language === "en") {
        translatedText = element.getAttribute("data-en");
      }

      if (language === "es") {
        translatedText = element.getAttribute("data-es");
      }

      if (language === "ht") {
        translatedText = element.getAttribute("data-ht");
      }

      /*
       FALLBACK TO ENGLISH IF TRANSLATION
       HAS NOT YET BEEN ADDED TO A PAGE.
      */

      if (!translatedText) {
        translatedText = element.getAttribute("data-en");
      }

      if (translatedText) {
        element.textContent = translatedText;
      }

    });


    /* -------------------------------------------------------
       UPDATE LANGUAGE BUTTONS
    ------------------------------------------------------- */

    languageButtons.forEach(function (button) {

      const buttonLanguage = button.dataset.lang;

      const isActive = buttonLanguage === language;

      button.classList.toggle("active", isActive);

      button.setAttribute(
        "aria-pressed",
        isActive ? "true" : "false"
      );

    });


    /* -------------------------------------------------------
       SAVE LANGUAGE
    ------------------------------------------------------- */

    try {
      localStorage.setItem(
        STORAGE_KEY,
        language
      );
    } catch (error) {
      console.warn(
        "Maximax language preference could not be saved."
      );
    }

  }


  /* =======================================================
     LANGUAGE BUTTON EVENTS
  ======================================================= */

  languageButtons.forEach(function (button) {

    button.addEventListener(
      "click",
      function () {

        const language = button.dataset.lang;

        if (
          SUPPORTED_LANGUAGES.includes(language)
        ) {
          setLanguage(language);
        }

      }
    );

  });


  /* =======================================================
     LOAD SAVED LANGUAGE
     REMOVE OLD FRA SETTING
  ======================================================= */

  let savedLanguage = "en";

  try {

    const storedLanguage =
      localStorage.getItem(STORAGE_KEY);

    if (
      SUPPORTED_LANGUAGES.includes(storedLanguage)
    ) {

      savedLanguage = storedLanguage;

    } else {

      /*
       OLD "fr" VALUE IS INVALID.
       RESET TO ENGLISH.
      */

      localStorage.setItem(
        STORAGE_KEY,
        "en"
      );

      savedLanguage = "en";
    }

  } catch (error) {

    savedLanguage = "en";

  }

  setLanguage(savedLanguage);


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  function openMenu() {

    if (!mainNav || !menuToggle) {
      return;
    }

    mainNav.classList.add("open");

    menuToggle.classList.add("active");

    menuToggle.setAttribute(
      "aria-expanded",
      "true"
    );

    menuToggle.innerHTML = "✕";

  }


  function closeMenu() {

    if (!mainNav || !menuToggle) {
      return;
    }

    mainNav.classList.remove("open");

    menuToggle.classList.remove("active");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.innerHTML = "☰";

  }


  function toggleMenu() {

    if (!mainNav) {
      return;
    }

    if (
      mainNav.classList.contains("open")
    ) {

      closeMenu();

    } else {

      openMenu();

    }

  }


  if (menuToggle) {

    menuToggle.addEventListener(
      "click",
      function (event) {

        event.stopPropagation();

        toggleMenu();

      }
    );

  }


  /* =======================================================
     CLOSE MENU AFTER NAVIGATION
  ======================================================= */

  if (mainNav) {

    mainNav
      .querySelectorAll("a")
      .forEach(function (link) {

        link.addEventListener(
          "click",
          closeMenu
        );

      });

  }


  /* =======================================================
     CLICK OUTSIDE MENU
  ======================================================= */

  document.addEventListener(
    "click",
    function (event) {

      if (
        !mainNav ||
        !menuToggle
      ) {
        return;
      }

      if (
        !mainNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }

    }
  );


  /* =======================================================
     ESCAPE KEY
  ======================================================= */

  document.addEventListener(
    "keydown",
    function (event) {

      if (event.key === "Escape") {
        closeMenu();
      }

    }
  );


  /* =======================================================
     RESET MENU ON DESKTOP
  ======================================================= */

  window.addEventListener(
    "resize",
    function () {

      if (window.innerWidth > 850) {
        closeMenu();
      }

    }
  );


  /* =======================================================
     SMOOTH SCROLL
  ======================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(function (link) {

      link.addEventListener(
        "click",
        function (event) {

          const href =
            link.getAttribute("href");

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

          closeMenu();

        }
      );

    });


  /* =======================================================
     SERVICE CARDS
     KEYBOARD ACCESSIBILITY
  ======================================================= */

  document
    .querySelectorAll(".service-card")
    .forEach(function (card) {

      if (card.tagName.toLowerCase() === "a") {
        return;
      }

      card.setAttribute(
        "tabindex",
        "0"
      );

      card.addEventListener(
        "keydown",
        function (event) {

          if (
            event.key === "Enter" ||
            event.key === " "
          ) {

            const link =
              card.querySelector("a[href]");

            if (link) {

              event.preventDefault();

              window.location.href =
                link.href;

            }

          }

        }
      );

    });


  /* =======================================================
     HOMEPAGE STAT CARDS
  ======================================================= */

  function makeClickable(
    selector,
    destination
  ) {

    const element =
      document.querySelector(selector);

    if (!element) {
      return;
    }

    element.style.cursor = "pointer";

    element.setAttribute(
      "tabindex",
      "0"
    );

    element.setAttribute(
      "role",
      "link"
    );


    element.addEventListener(
      "click",
      function () {

        if (
          destination.startsWith("#")
        ) {

          const target =
            document.querySelector(destination);

          if (target) {

            target.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });

          }

        } else {

          window.location.href =
            destination;

        }

      }
    );


    element.addEventListener(
      "keydown",
      function (event) {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          element.click();

        }

      }
    );

  }


  const statCards =
    document.querySelectorAll(
      ".hero-stats > div"
    );


  if (statCards.length >= 4) {

    /*
      16 CORE SERVICES
    */

    statCards[0].style.cursor =
      "pointer";

    statCards[0].onclick =
      function () {

        const services =
          document.getElementById(
            "services"
          );

        if (services) {

          services.scrollIntoView({
            behavior: "smooth"
          });

        }

      };


    /*
      3 LANGUAGES
    */

    statCards[1].style.cursor =
      "pointer";

    statCards[1].onclick =
      function () {

        const switcher =
          document.querySelector(
            ".language-switch"
          );

        if (switcher) {

          switcher.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });

        }

      };


    /*
      AI ASSISTANCE
    */

    statCards[2].style.cursor =
      "pointer";

    statCards[2].onclick =
      function () {

        window.location.href =
          "./pages/ai-center.html";

      };


    /*
      24/7 DIGITAL ACCESS
    */

    statCards[3].style.cursor =
      "pointer";

    statCards[3].onclick =
      function () {

        window.location.href =
          "./pages/client-portal.html";

      };

  }


  /* =======================================================
     EXTERNAL LINKS SECURITY
  ======================================================= */

  document
    .querySelectorAll(
      'a[target="_blank"]'
    )
    .forEach(function (link) {

      const currentRel =
        link.getAttribute("rel") || "";

      const relValues =
        currentRel
          .split(/\s+/)
          .filter(Boolean);

      if (
        !relValues.includes("noopener")
      ) {
        relValues.push("noopener");
      }

      if (
        !relValues.includes("noreferrer")
      ) {
        relValues.push("noreferrer");
      }

      link.setAttribute(
        "rel",
        relValues.join(" ")
      );

    });


  /* =======================================================
     ACTIVE NAVIGATION SECTION
  ======================================================= */

  const sections =
    document.querySelectorAll(
      "main section[id]"
    );

  const navigationLinks =
    document.querySelectorAll(
      '#mainNav a[href^="#"]'
    );


  if (
    "IntersectionObserver" in window &&
    sections.length &&
    navigationLinks.length
  ) {

    const observer =
      new IntersectionObserver(

        function (entries) {

          entries.forEach(
            function (entry) {

              if (!entry.isIntersecting) {
                return;
              }

              const id =
                entry.target.id;

              navigationLinks.forEach(
                function (link) {

                  const isCurrent =
                    link.getAttribute("href") ===
                    "#" + id;

                  link.classList.toggle(
                    "active",
                    isCurrent
                  );

                }
              );

            }
          );

        },

        {
          root: null,
          threshold: 0.35
        }

      );


    sections.forEach(
      function (section) {

        observer.observe(section);

      }
    );

  }


  /* =======================================================
     FORMS — PREVENT EMPTY SUBMISSION
  ======================================================= */

  document
    .querySelectorAll("form")
    .forEach(function (form) {

      form.addEventListener(
        "submit",
        function (event) {

          if (!form.checkValidity()) {

            event.preventDefault();

            form.reportValidity();

          }

        }
      );

    });


  /* =======================================================
     CREDIT REVIEW WORKSPACE
  ======================================================= */

  const creditReviewForm =
    document.querySelector(
      "#creditReviewForm"
    );


  if (creditReviewForm) {

    creditReviewForm.addEventListener(
      "submit",
      function (event) {

        event.preventDefault();

        if (
          !creditReviewForm.checkValidity()
        ) {

          creditReviewForm.reportValidity();

          return;

        }


        const formData =
          new FormData(
            creditReviewForm
          );


        const review = {

          id:
            "MMS-CR-" +
            Date.now(),

          created:
            new Date()
              .toISOString(),

          bureau:
            formData.get("bureau") || "",

          itemType:
            formData.get("itemType") || "",

          creditor:
            formData.get("creditor") || "",

          reference:
            formData.get("reference") || "",

          review:
            formData.get("review") || ""

        };


        let existingReviews = [];

        try {

          existingReviews =
            JSON.parse(
              localStorage.getItem(
                "maximaxCreditReview"
              )
            ) || [];

        } catch (error) {

          existingReviews = [];

        }


        existingReviews.push(
          review
        );


        try {

          localStorage.setItem(
            "maximaxCreditReview",
            JSON.stringify(
              existingReviews
            )
          );

        } catch (error) {

          console.warn(
            "Credit review could not be saved locally."
          );

        }


        const confirmation =
          document.getElementById(
            "creditReviewConfirmation"
          );


        if (confirmation) {

          confirmation.hidden = false;

          confirmation.innerHTML =
            "<strong>MAXIMAX CREDIT REVIEW</strong>" +
            "<p>Review prepared successfully.</p>" +
            "<p>Reference: " +
            review.id +
            "</p>";

          confirmation.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });

        } else {

          alert(
            "MAXIMAX CREDIT REVIEW\n\n" +
            "Review prepared successfully.\n" +
            "Reference: " +
            review.id
          );

        }

      }
    );

  }


  /* =======================================================
     IMAGE FALLBACK
     maximax-logo.jpg
     maximax-multi-services.jpg
  ======================================================= */

  document
    .querySelectorAll("img")
    .forEach(function (image) {

      image.addEventListener(
        "error",
        function () {

          console.warn(
            "Image not found:",
            image.getAttribute("src")
          );

          image.classList.add(
            "image-load-error"
          );

        }
      );

    });


  /* =======================================================
     PAGE READY
  ======================================================= */

  document.documentElement
    .classList.add(
      "js-enabled"
    );


  window.addEventListener(
    "load",
    function () {

      document.body
        .classList.add(
          "page-ready"
        );

    }
  );

})();
