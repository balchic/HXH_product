const savedLanguage = localStorage.getItem('language') || 'ko';
setLanguage(savedLanguage);

function setLanguage(lang) {
  const elements = document.querySelectorAll('[data-i18n-key]');
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n-key');
    if (translations[key] && translations[key][lang]) {
      element.textContent = translations[key][lang];
    }
  });
  document.documentElement.lang = lang;
  localStorage.setItem('language', lang);
}
