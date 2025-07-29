# LEARN.md – Contributing to The Cawnpore Magazine Website

Welcome to **The Cawnpore Magazine** open-source repository! This guide is designed to help new contributors quickly understand the project, tools, and workflow. If you're new to frontend web development or open source, this document is your starting point.

---

## **1. What is This Project?**
This is a static website built using **HTML, CSS, and JavaScript**. It hosts magazine issues, creative content, and cultural stories while welcoming contributions from developers, designers, and creatives.

---

## **2. Tech Stack Basics**
- **HTML5** – Structure of the web pages.
- **CSS3** – Styling and layout.
- **Vanilla JavaScript** – Adds interactivity (e.g., navigation, small dynamic features).
- **GitHub Pages** – The website is hosted directly from this repository.

Quick resources for beginners:
- [HTML Basics (MDN)](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics)
- [CSS Basics (MDN)](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics)
- [JavaScript Basics (MDN)](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics)

---

## **3. How to Test Locally**
1. **Fork** and **clone** the repo:
   ```bash
   git clone https://github.com/your-username/TheCawnporeMag.github.io.git
   cd TheCawnporeMag.github.io
   ```
2. Open the project in VSCode (or any editor).
3. Install the **Live Server** extension in VSCode.
4. Right-click on `index.html` → **Open with Live Server**.

Your changes will now auto-refresh in the browser.

---

## **4. How to Contribute**
- **Edit an HTML file:** Update text, fix typos, or add new content.
- **Improve CSS:** Add responsive design or fix styling issues.
- **Add Images or Content:** Place assets in the `assets/` folder.
- **JavaScript Enhancements:** Update `index.js` for minor interactive features.

For detailed steps, check [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## **5. Design & Responsiveness Tips**
- Test your changes on **desktop and mobile screen sizes**.
- Use browser dev tools (F12 → Toggle Device Toolbar) to simulate smaller screens.
- Follow a **consistent style** and class naming convention.
- Always ensure fonts, colors, and spacing remain uniform across pages.

---

## **6. Common Mistakes to Avoid**
- Forgetting to test on both **mobile and desktop** views.
- Using **large, unoptimized images** that slow down loading.
- Adding CSS styles that **conflict with global styles**.
- Not including **alt text** for images (bad for accessibility and SEO).
- Pushing changes directly to `main` instead of creating a feature branch.

---

## **7. Recommended Tools**
- **VSCode Extensions:**
  - **Prettier** – For auto-formatting.
  - **Live Server** – To preview changes instantly.
  - **Auto Rename Tag** – Makes editing HTML easier.
- **Image Optimization:** [TinyPNG](https://tinypng.com/).
- **Browser Tools:** Use Chrome DevTools → Performance tab for site speed checks.

---

## **8. Workflow for New Contributors**
1. **Fork** the repository.
2. **Create a new branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make and test your changes.
4. Run through this checklist:
   - Are changes **responsive**?
   - Do images load fast?
   - Are there no **console errors**?
5. **Commit and push:**
   ```bash
   git add .
   git commit -m "feat: description of changes"
   git push origin feature/your-feature-name
   ```
6. **Submit a Pull Request** using the template provided.

---

## **9. Starter Tasks for Beginners**
- Fix broken links or typos in HTML.
- Improve responsiveness of `about.html`.
- Optimize large images in `assets/`.
- Add alt text for accessibility.
- Suggest a dark mode feature.

---

## **10. Beginner-Friendly Resources**
- [How to Make a Pull Request (GitHub)](https://docs.github.com/en/pull-requests).
- [Open Source Guide](https://opensource.guide/how-to-contribute/).
- [FreeCodeCamp Responsive Design](https://www.freecodecamp.org/learn/responsive-web-design/).

---

## **11. Useful Links**
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Tricks](https://css-tricks.com/)
- [FreeCodeCamp Responsive Design](https://www.freecodecamp.org/learn/responsive-web-design/)

---

Happy contributing! 🎉