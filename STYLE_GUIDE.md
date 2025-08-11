# The Cawnpore Magazine Style Guide

*A comprehensive guide to visual consistency, brand identity, and implementation standards*

> **Implementation Note:** This document uses CSS classes for visual examples rather than inline styles to improve maintainability. When adapting this guide for other formats (like PDF export), you may need to include the CSS definitions or convert them back to inline styles.

---

## Table of Contents

1. [Brand Identity](#brand-identity)
2. [Typography](#typography)
3. [Color System](#color-system)
4. [Component Standards](#component-standards)
5. [Layout & Spacing](#layout--spacing)
6. [Animation Guidelines](#animation-guidelines)
7. [Accessibility Standards](#accessibility-standards)
8. [Implementation Examples](#implementation-examples)
9. [Responsive Design](#responsive-design)

---

## Brand Identity

### Core Principles

The Cawnpore Magazine's visual identity embodies:

- **Literary heritage**: Reflecting both historical context and contemporary literary culture
- **Elegance**: Clean, sophisticated design that puts content first
- **Warmth**: Inviting color palette that creates a comfortable reading experience
- **Cultural connection**: Visual elements that honor Cawnpore's history and significance

### Logo Usage

- Maintain clear space around the logo equal to 50% of its height
- Minimum display size: 32px height
- Always use the logo in its entirety without cropping or modifying
- Acceptable variants: primary burgundy on light backgrounds, cream on dark backgrounds

---

## Typography

### Font Families

| Element Type | Font Family | Weight | Style |
|-------------|-------------|--------|-------|
| Primary Headings | "Crimson Text", serif | 700 | Italic |
| Body Text | Georgia, serif | 400 | Normal |
| Navigation | Serif fonts | 400 | Normal |
| Quotes | Georgia, serif | 400 | Italic |

### Type Scale

| Element | Desktop | Tablet | Mobile | Line Height |
|---------|---------|--------|--------|------------|
| H1 | 62px | 48px | 32px | 1.2 |
| H2 | 36px | 30px | 24px | 1.25 |
| H3 | 24px | 20px | 18px | 1.3 |
| Body | 16px | 16px | 14px | 1.6 |
| Small | 14px | 13px | 12px | 1.5 |

### Usage Guidelines

- Use heading elements (h1-h6) semantically, not just for styling
- Maintain a single H1 per page for proper document structure
- Limit line length to 65-75 characters for optimal readability
- Avoid all-caps text except for navigation items
- Use proper typographic punctuation (smart quotes, em dashes)

---

## Color System

### Primary Palette

<style>
/* CSS classes for color swatches */
.color-swatch {
  width: 50px;
  height: 30px;
  border: 1px solid #ccc;
}
.burgundy {
  background-color: #780000;
}
.cream {
  background-color: #fdf0d5;
}
.deep-rose {
  background-color: #c5415d;
}
.deep-purple {
  background-color: #37163a;
}
</style>

<table>
  <tr>
    <th>Color</th>
    <th>Swatch</th>
    <th>Hex Code</th>
    <th>RGB</th>
    <th>Usage</th>
  </tr>
  <tr>
    <td>Burgundy</td>
    <td><div class="color-swatch burgundy"></div></td>
    <td>#780000</td>
    <td>rgb(120, 0, 0)</td>
    <td>Headers, navigation, buttons, accents</td>
  </tr>
  <tr>
    <td>Cream</td>
    <td><div class="color-swatch cream"></div></td>
    <td>#fdf0d5</td>
    <td>rgb(253, 240, 213)</td>
    <td>Backgrounds, text on dark colors</td>
  </tr>
  <tr>
    <td>Deep Rose</td>
    <td><div class="color-swatch deep-rose"></div></td>
    <td>#c5415d</td>
    <td>rgb(197, 65, 93)</td>
    <td>Highlights, active states</td>
  </tr>
  <tr>
    <td>Deep Purple</td>
    <td><div class="color-swatch deep-purple"></div></td>
    <td>#37163a</td>
    <td>rgb(55, 22, 58)</td>
    <td>Secondary accents, card backgrounds</td>
  </tr>
</table>

### Gradient Specifications

<style>
/* CSS classes for gradient demonstrations */
.gradient-demo {
  width: 100px;
  height: 30px;
  border: 1px solid #ccc;
}
.gradient-primary {
  background: linear-gradient(135deg, #d24848, #7a0000, #cea8bc);
}
.gradient-card {
  background: linear-gradient(to bottom, #cdb2ad, #fdf0d5, #bcaf87);
}
.gradient-button {
  background: linear-gradient(45deg, #37163a, pink);
}
.gradient-secondary-button {
  background: linear-gradient(45deg, pink, #37163a);
}
</style>

<table>
  <tr>
    <th>Gradient Name</th>
    <th>Visual</th>
    <th>CSS Definition</th>
    <th>Usage</th>
  </tr>
  <tr>
    <td>Primary Gradient</td>
    <td><div class="gradient-demo gradient-primary"></div></td>
    <td><code>linear-gradient(135deg, #d24848, #7a0000, #cea8bc)</code></td>
    <td>Navigation background, feature sections</td>
  </tr>
  <tr>
    <td>Card Gradient</td>
    <td><div class="gradient-demo gradient-card"></div></td>
    <td><code>linear-gradient(to bottom, #cdb2ad, #fdf0d5, #bcaf87)</code></td>
    <td>Card backgrounds, content containers</td>
  </tr>
  <tr>
    <td>Button Gradient</td>
    <td><div class="gradient-demo gradient-button"></div></td>
    <td><code>linear-gradient(45deg, #37163a, pink)</code></td>
    <td>Primary buttons</td>
  </tr>
  <tr>
    <td>Secondary Button</td>
    <td><div class="gradient-demo gradient-secondary-button"></div></td>
    <td><code>linear-gradient(45deg, pink, #37163a)</code></td>
    <td>Secondary buttons</td>
  </tr>
</table>

### Color Accessibility

- Ensure text has a minimum contrast ratio of 4.5:1 against backgrounds
- Use the WebAIM contrast checker for verification: https://webaim.org/resources/contrastchecker/
  > **Note:** Always verify the trustworthiness of external tools before use. WebAIM is a reputable organization, but you may also consider alternative contrast checkers such as [Color Contrast Accessibility Validator](https://color.a11y.com/) or [Accessible Colors](https://accessible-colors.com/).
- Don't rely solely on color to convey information or state
- Provide additional visual cues (icons, patterns, etc.) alongside color indicators

### Color Combinations & Pairings

<style>
/* CSS classes for color combinations */
.text-sample {
  padding: 5px;
}
.primary-content {
  background-color: #fdf0d5;
  color: #262626;
}
.inverted-content {
  background-color: #780000;
  color: #fdf0d5;
}
.highlighted-content {
  background-color: #c5415d;
  color: #ffffff;
}
.secondary-content {
  background-color: #37163a;
  color: #fdf0d5;
}
/* Dark mode colors */
.dark-mode-sample {
  width: 100px;
  height: 20px;
  border: 1px solid #ccc;
}
.dark-brown {
  background-color: #1a0f05;
}
.lighter-burgundy {
  background-color: #a63636;
}
.off-white {
  background-color: #e0e0e0;
}
</style>

The following color combinations are recommended for consistent usage across the site:

<table>
  <tr>
    <th>Purpose</th>
    <th>Foreground</th>
    <th>Background</th>
    <th>Example</th>
  </tr>
  <tr>
    <td>Primary Content</td>
    <td>Dark Text (#262626)</td>
    <td>Cream (#fdf0d5)</td>
    <td><div class="text-sample primary-content">Text Sample</div></td>
  </tr>
  <tr>
    <td>Inverted Content</td>
    <td>Cream (#fdf0d5)</td>
    <td>Burgundy (#780000)</td>
    <td><div class="text-sample inverted-content">Text Sample</div></td>
  </tr>
  <tr>
    <td>Highlighted Content</td>
    <td>White (#ffffff)</td>
    <td>Deep Rose (#c5415d)</td>
    <td><div class="text-sample highlighted-content">Text Sample</div></td>
  </tr>
  <tr>
    <td>Secondary Content</td>
    <td>Cream (#fdf0d5)</td>
    <td>Deep Purple (#37163a)</td>
    <td><div class="text-sample secondary-content">Text Sample</div></td>
  </tr>
</table>

### Dark Mode Specifications

While the site currently doesn't implement dark mode, these color mappings should be used if dark mode is implemented:

<table>
  <tr>
    <th>Light Mode Color</th>
    <th>Dark Mode Equivalent</th>
    <th>Sample</th>
  </tr>
  <tr>
    <td>Cream Background (#fdf0d5)</td>
    <td>Dark Brown (#1a0f05)</td>
    <td><div class="dark-mode-sample dark-brown"></div></td>
  </tr>
  <tr>
    <td>Burgundy (#780000)</td>
    <td>Lighter Burgundy (#a63636)</td>
    <td><div class="dark-mode-sample lighter-burgundy"></div></td>
  </tr>
  <tr>
    <td>Dark Text (#262626)</td>
    <td>Off-white Text (#e0e0e0)</td>
    <td><div class="dark-mode-sample off-white"></div></td>
  </tr>
</table>

---

## Component Standards

### Form Elements

#### Text Inputs

```css
input[type="text"],
input[type="email"],
input[type="password"],
textarea {
  padding: 15px;
  border: none;
  border-radius: 15px;
  width: 100%;
  background-color: #fff;
  margin-bottom: 15px;
  font-family: Georgia, serif;
  font-size: 16px;
  transition: box-shadow 0.3s ease;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus,
textarea:focus {
  outline: none;
  box-shadow: 0 0 0 2px #780000;
}
```

#### Checkboxes and Radio Buttons

```css
input[type="checkbox"],
input[type="radio"] {
  margin-right: 8px;
  accent-color: #780000;
}

label {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 16px;
  color: #333;
}
```

#### Select Dropdown

```css
select {
  padding: 12px 15px;
  border: none;
  border-radius: 15px;
  background-color: #fff;
  width: 100%;
  font-family: Georgia, serif;
  font-size: 16px;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 16px;
}

select:focus {
  outline: none;
  box-shadow: 0 0 0 2px #780000;
}
```

#### Form Layout

```css
form {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-error {
  color: #c5415d;
  font-size: 14px;
  margin-top: 5px;
}
```

### Buttons

#### Primary Button

```css
.primary-button {
  display: inline-block;
  text-decoration: none;
  color: white;
  border: none;
  border-radius: 95px 8px;
  padding: 12px 34px;
  font-size: 13px;
  font-weight: 600;
  background: linear-gradient(45deg, #37163a, pink);
  position: relative;
  cursor: pointer;
}
```

#### Secondary Button

```css
.secondary-button {
  display: inline-block;
  text-decoration: none;
  color: #f9f9e6;
  border: none;
  border-radius: 8px 95px;
  padding: 12px 46px;
  font-size: 13px;
  font-weight: 600;
  background: linear-gradient(45deg, pink, #37163a);
  position: relative;
  cursor: pointer;
}
```

#### Button States

| State | Appearance |
|-------|------------|
| Default | As specified above |
| Hover | Border: 1px solid #780000; Gradient reversed; Transition: 1s |
| Focus | Same as hover + visible outline |
| Active | Scale: 0.95 |
| Disabled | Opacity: 0.6; Cursor: not-allowed |

### Cards

```css
.card {
  display: block;
  position: relative;
  width: 300px;
  height: auto;
  min-height: 416px;
  background-color: rgba(234, 171, 214, 0.4);
  border-radius: 10px;
  padding: 2em 1.2em;
  margin: 12px;
  text-decoration: none;
  z-index: 0;
  overflow: hidden;
  background: linear-gradient(to bottom, #cdb2ad, #fdf0d5, #bcaf87);
  font-family: Arial, Helvetica, sans-serif;
  box-shadow: 10px 10px 20px #c6bcc5;
  max-width: 320px;
}
```

### Navigation

```css
.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 5%;
  margin-right: 6px;
  background: linear-gradient(135deg,
      rgba(242, 237, 237, 0.3),
      rgba(122, 0, 0, 0.8),
      rgba(17, 16, 16, 0.3)
  );
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-bottom: 1px solid rgba(179, 177, 177, 0.2);
  position: fixed;
  top: 0;
  height: 9%;
  width: 100%;
  z-index: 999;
}
```

---

## Layout & Spacing

### Container Widths

- Main content: 80% (desktop), 90% (mobile)
- Header height: 60vh (desktop), 40vh (mobile)
- Standard section padding: 80px top/bottom, 20px left/right

### Spacing Scale

| Size | Value | Usage |
|------|-------|-------|
| xs | 4px | Minimal separation, icon padding |
| sm | 8px | Close elements, button padding |
| md | 16px | Standard spacing, card margin |
| lg | 32px | Section internal spacing |
| xl | 64px | Major section breaks |
| xxl | 80px | Section padding top/bottom |

### Grid System

- Use flexible layouts with CSS Grid or Flexbox
- Standard gap between grid items: 16px
- Card layouts should use flexible sizing with min/max width constraints

```css
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem;
}
```

---

## Animation Guidelines

### Transition Speeds

| Speed | Duration | Usage |
|-------|----------|-------|
| Fast | 0.2s | Micro-interactions, icon changes |
| Medium | 0.3-0.5s | Hover effects, color changes |
| Slow | 0.8-1s | Major transitions, gradient changes |

### Standard Animations

#### Link Hover Animation

```css
.nav-links ul li::after {
    content: '';
    width: 0%;
    height: 2px;
    background: #fdf0d5;
    display: block;
    margin: auto;
    transition: 0.5s;
}

.nav-links ul li:hover::after {
    width: 100%;
}
```

#### Card Hover Effect

```css
.card:before {
  content: '';
  position: absolute;
  z-index: -1;
  top: -16px;
  right: -16px;
  background: linear-gradient(135deg, #8B0000, #5a0000);
  height: 40px;
  width: 40px;
  border-radius: 32px;
  transform: scale(1);
  transform-origin: 50% 50%;
  transition: transform 0.35s ease-out;
}

.card:hover:before {
  transform: scale(28);
}

.card:hover .small-desc {
  transition: all 0.5s ease-out;
  color: rgba(255, 255, 255, 0.8);
}
```

#### Loading Animation

```css
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.loader i {
    animation: spin 2s linear infinite;
}
```

### Motion Sensitivity

- Provide a mechanism to reduce or disable animations for users with vestibular disorders
- Avoid animations that involve large movements of page elements
- Keep animations subtle and purposeful, not distracting

---

## Accessibility Standards

### Core Requirements

- All pages must be navigable by keyboard
- Interactive elements must have visible focus states
- Color alone should not convey meaning
- Text should maintain minimum contrast ratio of 4.5:1
- Images should have appropriate alt text

### ARIA Usage

- Use appropriate ARIA landmarks for page sections (e.g., `role="navigation"`, `role="main"`)
- Include ARIA attributes when native HTML semantics are insufficient
- Use ARIA labels for elements that need additional context

Example:
```html
<nav role="navigation" aria-label="Main Menu">
  <!-- Navigation content -->
</nav>
```

### Focus States

All interactive elements must have visible focus states that meet WCAG 2.1 AA requirements:
- Focus indicators must have sufficient contrast
- Focus must be clearly visible and not obscured
- Focus should move in a logical order through the page

### Testing Procedures

Accessibility should be tested using the following methods and tools:

#### Automated Testing
- Use the WAVE Web Accessibility Evaluation Tool: https://wave.webaim.org/
  > **Note:** Always verify the trustworthiness of external tools before use. Alternative tools include [Axe by Deque](https://www.deque.com/axe/), [Siteimprove Accessibility Checker](https://siteimprove.com/), or [Tenon](https://tenon.io/).
- Run Lighthouse accessibility audits in Chrome DevTools
- Use the axe DevTools browser extension

#### Manual Testing
- Test keyboard navigation (Tab, Enter, Space, Arrow keys)
- Verify with screen readers (NVDA on Windows, VoiceOver on Mac)
- Check for sufficient color contrast in different lighting conditions
- Test with zoomed browser content (up to 200%)
- Disable CSS to verify logical content structure

#### Checklist for Common Elements
- **Navigation**: Can be accessed and used with keyboard only
- **Images**: Have appropriate alt text (decorative images should use `alt=""`)
- **Forms**: All inputs have associated labels and error messages
- **Interactive Elements**: Have appropriate roles and states
- **Dynamic Content**: Announces changes to screen readers

### Accessibility Statement

Each page should link to an accessibility statement that:
- States the target compliance level (WCAG 2.1 AA)
- Provides contact information for accessibility issues
- Lists any known accessibility limitations

---

## Implementation Examples

### Standard Section Structure

```html
<section class="standard-section">
  <h2 class="section-heading">Section Title</h2>
  <div class="section-content">
    <p>Content paragraph with appropriate line length and spacing.</p>
    <!-- Additional content -->
  </div>
</section>
```

### Card Implementation

```html
<div class="card">
  <p class="card-title">Card Title</p>
  <p class="small-desc">
    Card description text goes here. Keep it concise and meaningful.
  </p>
  <div class="go-corner">
    <div class="go-arrow">→</div>
  </div>
</div>
```

### Navigation Implementation

```html
<nav role="navigation" aria-label="Main Menu">
  <div class="nav-links" id="navLinks">
    <i class="fa fa-times" onclick="hideMenu()"></i>
    <ul>
      <li><a href="index.html">HOME</a></li>
      <li><a href="about.html">ABOUT</a></li>
      <!-- Additional navigation items -->
    </ul>
  </div>
  <i class="fa fa-bars" onclick="showMenu()"></i>
</nav>
```

---

## Responsive Design

### Breakpoints

| Breakpoint | Width | Target Devices |
|------------|-------|----------------|
| Small | Up to 700px | Mobile phones |
| Medium | 701px - 1024px | Tablets, small laptops |
| Large | 1025px and above | Desktops, large screens |

### Media Query Usage

Use these standard media query templates for consistent responsive behavior:

```css
/* Mobile styles */
@media (max-width: 700px) {
  /* Mobile-specific styles */
}

/* Tablet styles */
@media (min-width: 701px) and (max-width: 1024px) {
  /* Tablet-specific styles */
}

/* Desktop styles */
@media (min-width: 1025px) {
  /* Desktop-specific styles */
}
```

### Print Styles

Include these print styles for optimal printed output:

```css
@media print {
  /* Hide navigation, footer, and interactive elements */
  nav, footer, button, .social-icons, .subscription-box {
    display: none !important;
  }
  
  /* Optimize text for print */
  body {
    font-size: 12pt;
    line-height: 1.5;
    color: #000;
    background: #fff;
  }
  
  /* Ensure all text is visible */
  .card, .card:hover .small-desc {
    color: #000 !important;
    background: #fff !important;
  }
  
  /* Display full URLs for links */
  a[href]:after {
    content: " (" attr(href) ")";
    font-size: 90%;
  }
  
  /* Page breaks */
  h1, h2, h3 {
    page-break-after: avoid;
    page-break-inside: avoid;
  }
  
  img {
    page-break-inside: avoid;
    max-width: 100% !important;
  }
  
  /* Avoid wasteful blank pages */
  @page {
    margin: 2cm;
  }
}
```

### Mobile Adaptations

- Navigation collapses to hamburger menu
- Multi-column layouts stack vertically
- Font sizes reduce according to type scale
- Touch targets maintain minimum size of 44px × 44px
- Card layouts adjust to single column with full width

#### Mobile Navigation CSS

```css
@media (max-width: 700px) {
    .nav-links ul {
        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;
        padding: 40px 20px;
    }

    .nav-links ul li {
        display: block;
        opacity: 0;
        transform: translateX(30px);
        animation: slideIn 0.4s forwards;
    }

    .nav-links {
        position: fixed;
        background: linear-gradient(135deg, #d24848, #7a0000, #cea8bc);
        height: 100vh;
        width: 200px;
        top: 0;
        right: -100%;
        text-align: left;
        z-index: 2;
        box-shadow: -8px 0 20px rgba(0, 0, 0, 0.5);
        transition: right 0.4s ease-in-out;
    }
    
    .nav-links.nav-active {
        right: 0;
    }
}
```

---

*This style guide is a living document and may be updated as the design system evolves. Always refer to the most recent version when implementing new features or making changes to existing components.*
