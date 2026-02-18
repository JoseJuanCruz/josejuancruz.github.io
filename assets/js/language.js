// Language switching functionality with query parameter support
// Supports: ?lang=es or ?lang=en in URL

(function () {
  "use strict";

  const LanguageManager = {
    // Available languages
    languages: ["en", "es"],
    defaultLanguage: "en",
    currentLanguage: "en",

    // Translation dictionary
    translations: {
      // Navigation
      about: { en: "about", es: "sobre mí" },
      blog: { en: "blog", es: "blog" },
      publications: { en: "publications", es: "publicaciones" },
      projects: { en: "projects", es: "proyectos" },
      repositories: { en: "repositories", es: "repositorios" },
      cv: { en: "cv", es: "cv" },
      teaching: { en: "teaching", es: "docencia" },
      submenus: { en: "submenus", es: "submenús" },
      bookshelf: { en: "bookshelf", es: "biblioteca" },

      // Section headers
      news: { en: "news", es: "noticias" },
      latest_posts: { en: "latest posts", es: "últimas entradas" },
      selected_publications: { en: "selected publications", es: "publicaciones destacadas" },

      // Blog elements
      min_read: { en: "min read", es: "min de lectura" },
      no_news: { en: "No news so far...", es: "Aún no hay noticias..." },
      search_placeholder: { en: "Type to start searching", es: "Escribe para buscar" },
      ctrl_k: { en: "ctrl k", es: "ctrl k" },

      // Footer
      copyright: { en: "Copyright", es: "Derechos de autor" },
      last_updated: { en: "Last updated:", es: "Última actualización:" },
      powered_by: { en: "Powered by", es: "Desarrollado con" },
      hosted_by: { en: "Hosted by", es: "Alojado en" },
      photos_from: { en: "Photos from", es: "Fotos de" },

      // Page elements
      by_categories: { en: "by categories in reversed chronological order", es: "por categorías en orden cronológico inverso" },
      a_growing_collection: { en: "A growing collection of your cool projects.", es: "Una colección creciente de tus proyectos interesantes." },
      edit_repositories: {
        en: "Edit the `_data/repositories.yml` and change the `github_users` and `github_repos` lists to include your own GitHub profile and repositories.",
        es: "Edita el archivo `_data/repositories.yml` y cambia las listas `github_users` y `github_repos` para incluir tu propio perfil de GitHub y repositorios.",
      },
      materials_for_courses: {
        en: "Materials for courses you taught. Replace this text with your description.",
        es: "Materiales para los cursos que impartiste. Reemplaza este texto con tu descripción.",
      },
      github_users: { en: "GitHub users", es: "Usuarios de GitHub" },
      github_repositories: { en: "GitHub Repositories", es: "Repositorios de GitHub" },

      // Bookshelf
      books_reading: { en: "Books that I am reading, have read, or will read", es: "Libros que estoy leyendo, he leído o leeré" },

      // Categories
      work: { en: "work", es: "trabajo" },
      fun: { en: "fun", es: "diversión" },
    },

    // Initialize language system
    init: function () {
      this.currentLanguage = this.determineLanguage();
      this.applyLanguage();
      this.setupEventListeners();
      this.updateToggleButton();
      this.updateHTMLLangAttribute();

      // Store preference if coming from query param
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has("lang")) {
        localStorage.setItem("language", this.currentLanguage);
      }
    },

    // Determine language from URL param, localStorage, or default
    determineLanguage: function () {
      // Check URL parameter first (highest priority)
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get("lang");
      if (urlLang && this.languages.includes(urlLang)) {
        return urlLang;
      }

      // Check localStorage
      const storedLang = localStorage.getItem("language");
      if (storedLang && this.languages.includes(storedLang)) {
        return storedLang;
      }

      // Default to English
      return this.defaultLanguage;
    },

    // Apply translations to the page
    applyLanguage: function () {
      const lang = this.currentLanguage;

      // Update all elements with data-i18n attribute
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (this.translations[key] && this.translations[key][lang]) {
          el.textContent = this.translations[key][lang];
        }
      });

      // Update placeholders
      document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (this.translations[key] && this.translations[key][lang]) {
          el.placeholder = this.translations[key][lang];
        }
      });

      // Update titles
      document.querySelectorAll("[data-i18n-title]").forEach((el) => {
        const key = el.getAttribute("data-i18n-title");
        if (this.translations[key] && this.translations[key][lang]) {
          el.title = this.translations[key][lang];
        }
      });

      // Toggle visibility of bilingual content
      this.toggleBilingualContent();
    },

    // Toggle between English and Spanish content blocks
    toggleBilingualContent: function () {
      const lang = this.currentLanguage;

      // Hide all language-specific content first
      document.querySelectorAll(".content-en, .content-es").forEach((el) => {
        el.style.display = "none";
      });

      // Show content for current language
      document.querySelectorAll(".content-" + lang).forEach((el) => {
        el.style.display = "block";
      });
    },

    // Switch to a specific language
    setLanguage: function (lang) {
      if (!this.languages.includes(lang)) return;

      this.currentLanguage = lang;
      localStorage.setItem("language", lang);

      this.applyLanguage();
      this.updateToggleButton();
      this.updateHTMLLangAttribute();

      // Update URL without reloading (optional - remove query param)
      this.updateURL(lang);
    },

    // Toggle between languages
    toggleLanguage: function () {
      const newLang = this.currentLanguage === "en" ? "es" : "en";
      this.setLanguage(newLang);
    },

    // Update the toggle button text
    updateToggleButton: function () {
      const toggle = document.getElementById("language-toggle");
      if (toggle) {
        const otherLang = this.currentLanguage === "en" ? "es" : "en";
        toggle.textContent = otherLang.toUpperCase();
        toggle.title = this.currentLanguage === "en" ? "Cambiar a español" : "Switch to English";
      }
    },

    // Update HTML lang attribute
    updateHTMLLangAttribute: function () {
      document.documentElement.setAttribute("lang", this.currentLanguage);
    },

    // Update URL to reflect language (clean up query param)
    updateURL: function (lang) {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", lang);
      window.history.replaceState({}, "", url.toString());
    },

    // Setup event listeners
    setupEventListeners: function () {
      const self = this;

      const toggle = document.getElementById("language-toggle");
      if (toggle) {
        toggle.addEventListener("click", function () {
          self.toggleLanguage();
        });
      }
    },

    // Get translation for a specific key
    t: function (key) {
      if (this.translations[key] && this.translations[key][this.currentLanguage]) {
        return this.translations[key][this.currentLanguage];
      }
      return key;
    },
  };

  // Expose to global scope
  window.LanguageManager = LanguageManager;

  // Auto-initialize - wait for DOM to be ready
  function initLanguageManager() {
    LanguageManager.init();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLanguageManager);
  } else {
    // DOM is already ready
    initLanguageManager();
  }
})();
