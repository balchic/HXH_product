# Blueprint: SEO Optimized NUMÉRO 45 (Lottery Number Generator)

## 1. Project Overview

This project aims to enhance the existing "NUMÉRO 45" lottery number generator website by applying SEO best practices based on Google and Naver guidelines, and by adding multi-language support.

## 2. Core SEO Strategy

- **Content:** The existing content will be enhanced with SEO considerations.
- **Crawlability:** `robots.txt` and `sitemap.xml` will be created/updated.
- **Metadata:** Unique `<title>`, `<meta name="description">`, `<link rel="canonical">`, and Open Graph/Twitter tags for each page.
- **Semantic HTML:** Conversion of `div`-based layouts to semantic HTML5 tags (`<header>`, `<main>`, `<footer>`, `<section>`, `<article>`).
- **Image Optimization:** Not directly applicable to the current content (uses emojis for buttons).
- **Internal Linking:** Existing navigation will be maintained.

## 3. Design & User Experience (UX)

- **Visuals:** Existing clean design will be preserved.
- **Responsiveness:** Existing responsive design will be maintained.
- **Usability:** Improved with semantic HTML and multi-language support.

## 4. Multi-language Support

- **Languages:** Korean (ko), English (en), Chinese (zh).
- **Implementation:**
    - `translations.js`: A JavaScript file to store all translated text.
    - `app.js`: A JavaScript file with logic to switch languages, update `data-i18n-key` elements, and persist language preference in `localStorage`.
    - Language switcher buttons (`한국어`, `ENGLISH`, `中文`) added to the header of each page.
    - `data-i18n-key` attributes added to all translatable text elements in HTML.

## 5. Implementation Plan

1.  **[completed]** **Analyze Existing Files:** Read `index.html`, `articles.html`, `about.html`, `privacy.html`, `style.css`.
2.  **[completed]** **SEO Enhancement for `index.html`:**
    *   Update `<head>` with descriptive title, meta description, canonical, OG/Twitter tags.
    *   Convert `div`-based body structure to semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`).
3.  **[completed]** **SEO Enhancement for `articles.html`:**
    *   Update `<head>` with descriptive title, meta description, canonical, OG/Twitter tags.
    *   Convert `div`-based body structure to semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`, `<article>`).
4.  **[completed]** **SEO Enhancement for `about.html`:**
    *   Update `<head>` with descriptive title, meta description, canonical, OG/Twitter tags.
    *   Convert `div`-based body structure to semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`).
5.  **[completed]** **SEO Enhancement for `privacy.html`:**
    *   Update `<head>` with descriptive title, meta description, canonical, OG/Twitter tags.
    *   Convert `div`-based body structure to semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`, `<article>`).
6.  **[completed]** **Create `robots.txt`:** Allow all crawlers.
7.  **[completed]** **Create `sitemap.xml`:** Include all HTML pages.
8.  **[completed]** **Implement Multi-language Support:**
    *   Add language switcher buttons to header of all HTML files.
    *   Add `data-i18n-key` attributes to all translatable elements.
    *   Create `translations.js` with all Korean, English, and Chinese translations.
    *   Create `app.js` with language switching logic and `localStorage` persistence.
    *   Add styling for language buttons in `style.css`.
