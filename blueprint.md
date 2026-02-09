# Purpose and Capabilities

This project is a web-based application that provides a free lottery number generator for the Korean Lotto 6/45. It also includes a feature to recommend lottery numbers based on dream keywords. The application is designed with a clean and beautiful interface and supports multiple languages.

# Style, Design, and Features

## Initial Version

-   **Lottery Number Generation:** Generates 5 sets of 6 random numbers and a bonus number.
-   **Color-coded Numbers:** Numbers are color-coded based on the official Korean Lotto color scheme.
-   **Dark/Light Mode:** Supports both dark and light color schemes.
-   **Multi-language Support:** Supports Korean, English, and Chinese.
-   **Responsive Design:** Optimized for both mobile and desktop devices.
-   **SEO Content:** Includes sections on how to use the application, information about the Korean Lotto, and tips for choosing numbers.

## Current Version

-   **Dream Interpretation:** Recommends lottery numbers based on dream keywords.
-   **Keyword List:** A list of available keywords is displayed when the user hovers over the keyword button.
-   The keyword button has been updated from a "?" to a tag icon for better usability.
-   The flickering issue on the keyword button has been resolved.

# Plan and Steps for the Current Change

1.  **Investigate the flickering bug:**
    *   Examine `index.html` to find the "해몽 키워드" button.
    *   Analyze the related CSS in `style.css` to identify the `:hover` effect that might be causing the flicker.
    *   Analyze the related JavaScript in `app.js` for any `mouseover`/`mouseout` event listeners that could be contributing to the problem.
2.  **Propose a new design for the button:**
    *   Instead of a "?", I will suggest a more intuitive icon, maybe a magnifying glass or a tag icon, to represent "keyword". I will search for a suitable SVG icon.
3.  **Implement the fix and the new design:**
    *   Modify the HTML to replace the "?" with the new icon.
    *   Modify the CSS to fix the flickering issue and style the new icon.
4.  **Update the blueprint.md file.**