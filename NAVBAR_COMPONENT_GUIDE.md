# Common Navbar Component Guide

## Overview
The website now uses a dual navbar component system that provides consistent navigation across all pages while optimizing for different page types:

- **Homepage**: Full hero section with navigation bar
- **Other Pages**: Simple navigation bar only

## Implementation Details

### Component Structure
- **Location**: `scripts/component-loader.js`
- **Component Names**: 
  - `navbar-hero` (for homepage)
  - `navbar-simple` (for other pages)
- **Container Element**: `<div id="navbar-container" data-component="[component-name]"></div>`

### Features
- ✅ **Dual Design**: Hero navbar for homepage, simple navbar for other pages
- ✅ **Consistent Navigation**: Same navigation links across all pages
- ✅ **Responsive Design**: Mobile-friendly hamburger menu
- ✅ **Progress Bar**: Scroll progress indicator on all pages
- ✅ **Path-Aware**: Automatically adjusts links based on page location
- ✅ **Auto-Loading**: Components load automatically when DOM is ready

### Usage in Pages

#### For Homepage (index.html):
```html
<!-- In index.html -->
<div id="navbar-container" data-component="navbar-hero"></div>
<script src="scripts/component-loader.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    ComponentLoader.loadComponent('navbar-hero', '#navbar-container');
});
</script>
```

#### For Other Pages (pages/*.html):
```html
<!-- In pages/*.html -->
<div id="navbar-container" data-component="navbar-simple"></div>
<script src="../scripts/component-loader.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    ComponentLoader.loadComponent('navbar-simple', '#navbar-container');
    ComponentLoader.loadComponent('back-button');
});
</script>
```

### Component Differences

#### navbar-hero (Homepage)
- Full height hero section with background image
- Integrated hero content (title, tagline, quote widget)
- Navigation bar positioned at top of hero section
- Background: Hero image with overlay

#### navbar-simple (Other Pages)
- Compact navigation bar only
- No hero section or background image
- Dark background with navigation links
- Minimal height for better content focus

### Navigation Links
Both components include all main site sections:
- HOME
- ABOUT  
- SUBMIT
- ISSUE
- MASTHEAD
- FAQ
- Gallery
- OPEN SOURCE
- OUR JOURNEY

### Styling
Each component includes appropriate CSS for:
- Navigation bar styling
- Progress bar
- Mobile responsive menu
- Hover effects
- Hero content styling (navbar-hero only)

### JavaScript Functionality
- **Progress Bar**: Tracks scroll position and updates progress bar
- **Mobile Menu**: Toggle functionality for mobile navigation
- **Path Resolution**: Automatically determines correct asset and link paths

## Benefits
1. **Optimized Experience**: Homepage gets full hero treatment, other pages focus on content
2. **Consistency**: Identical navigation experience across all pages
3. **Maintainability**: Changes to navigation only need to be made in one place
4. **Performance**: Appropriate styling for each page type
5. **Responsive**: Mobile-first design with proper breakpoints

## File Structure
```
scripts/
├── component-loader.js    # Main component system with both navbar types
├── back-button-component.js (legacy)
└── index.js              # General page functionality

styles/
├── style.css             # Main styles (navbar styles now in component)
└── back-button.css       # Back button styles (now in component)
```

## Page Types
- **Homepage (index.html)**: Uses `navbar-hero` with full hero section
- **Content Pages (pages/*.html)**: Use `navbar-simple` with compact navigation
- **All Pages**: Include progress bar and mobile menu functionality

The dual navbar component system provides the perfect balance between an impressive homepage experience and efficient content page navigation while maintaining complete consistency in the navigation structure.
