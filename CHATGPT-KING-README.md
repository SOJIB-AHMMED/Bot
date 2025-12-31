# CHATGPT KING - Mobile-First Multi-Subdomain Web Platform

A mobile-first web platform built with plain HTML, CSS, and vanilla JavaScript. Features shared design/behavior contracts, role-based access control, and multi-subdomain architecture.

## 📁 Project Structure

```
/
├── core.css                    # Shared CSS (design contract)
├── core.js                     # Shared JavaScript (behavior contract)
├── chatgpt-king-root.html      # Root domain (homepage)
├── chatgpt-king-app.html       # App subdomain (chat interface)
└── CHATGPT-KING-README.md      # This documentation
```

## 🎨 Design System (core.css)

The shared CSS file provides a consistent design language across all subdomains:

### Key Features
- **Mobile-First Responsive Design**: Built for mobile devices, scales up to desktop
- **CSS Custom Properties**: Theme variables for easy customization
- **Component Library**: Header, drawer, accordions, buttons, cards
- **Role-Based Visibility**: CSS classes for guest, member, pro, admin roles
- **Smooth Animations**: Transitions for drawer, accordions, and hover states

### Components
1. **Header**: Fixed navigation bar with logo and menu
2. **Off-Canvas Drawer**: Side menu for mobile navigation
3. **Accordions**: Collapsible content sections
4. **Cards**: Content containers
5. **Buttons**: Primary and secondary button styles
6. **Hero Section**: Landing page hero with responsive typography

### Responsive Breakpoints
- Mobile: < 768px (default)
- Tablet: 768px - 1023px
- Desktop: ≥ 1024px

## 🚀 Behavior System (core.js)

The shared JavaScript file provides consistent behavior across all subdomains:

### Key Features
- **Role Management**: Switch between guest, member, pro, admin roles
- **Off-Canvas Drawer**: Toggle drawer with overlay and keyboard support
- **Accordion System**: Expand/collapse content sections
- **State Persistence**: Role saved to localStorage
- **Event System**: Custom events for role changes
- **No Dependencies**: Pure vanilla JavaScript

### Public API
```javascript
// Access the global API
ChatGPTKing.setRole('member');      // Set user role
ChatGPTKing.getRole();               // Get current role
ChatGPTKing.openDrawer();            // Open side menu
ChatGPTKing.closeDrawer();           // Close side menu
ChatGPTKing.closeAllAccordions();    // Close all accordions
ChatGPTKing.setActiveNavLink();      // Update active navigation
```

## 🌐 Multi-Subdomain Architecture

The platform simulates a multi-subdomain structure using separate HTML files:

### Root Domain (chatgpt-king-root.html)
- **Purpose**: Homepage and marketing
- **Features**: Hero section, feature cards, FAQs, role demos
- **Navigation**: Links to app subdomain

### App Subdomain (chatgpt-king-app.html)
- **Purpose**: Main application interface
- **Features**: Chat interface, quick actions, role-specific tools
- **Navigation**: Links back to root domain

### Real-World Deployment
In production, these would be deployed as:
- `chatgptking.com` → chatgpt-king-root.html
- `app.chatgptking.com` → chatgpt-king-app.html

Both share the same `core.css` and `core.js` files.

## 👥 Role-Based Access Control

Four user roles with progressive access:

### Guest (Default)
- View public content
- Access basic features
- See pricing and sign-up prompts

### Member
- All guest features
- Personalized experience
- Chat history
- Settings access

### Pro
- All member features
- Advanced AI models
- Priority processing
- Exclusive features

### Admin
- All pro features
- User management
- Analytics dashboard
- System configuration

### Implementation
```html
<!-- HTML: Add role-specific class -->
<div class="card role-member">
    This content is only visible to members and above
</div>

<!-- JavaScript: Set role -->
<script>
    ChatGPTKing.setRole('member');
</script>
```

## 📱 Mobile-First Design Principles

1. **Touch-Friendly**: Large tap targets (44x44px minimum)
2. **Readable Typography**: 16px base font size, 1.6 line height
3. **Optimized Performance**: No frameworks, minimal JavaScript
4. **Responsive Images**: Using CSS for scaling
5. **Progressive Enhancement**: Works without JavaScript (except drawer/accordion)

## 🎯 Component Usage Examples

### Header
```html
<header class="header">
    <div class="header-content">
        <a href="/" class="header-logo">Logo</a>
        <nav class="header-nav"><!-- Desktop nav --></nav>
        <button class="menu-toggle">Menu</button>
    </div>
</header>
```

### Off-Canvas Drawer
```html
<div class="drawer-overlay"></div>
<aside class="drawer">
    <div class="drawer-header">
        <h2 class="drawer-title">Menu</h2>
        <button class="drawer-close">&times;</button>
    </div>
    <div class="drawer-body">
        <!-- Navigation content -->
    </div>
</aside>
```

### Accordion
```html
<div class="accordion">
    <div class="accordion-item">
        <button class="accordion-header">
            <span>Question</span>
            <span class="accordion-icon">▼</span>
        </button>
        <div class="accordion-content">
            <div class="accordion-body">Answer</div>
        </div>
    </div>
</div>
```

## 🎨 Customization

### Colors
Edit CSS custom properties in `core.css`:
```css
:root {
    --primary-color: #10a37f;
    --secondary-color: #6e56cf;
    /* ... other variables */
}
```

### Spacing
```css
:root {
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
}
```

## 🔧 Development Setup

No build process required! Simply:

1. Open HTML files in a browser
2. Or serve with any static server:
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js
   npx serve .
   
   # PHP
   php -S localhost:8000
   ```

3. Access:
   - Root: `http://localhost:8000/chatgpt-king-root.html`
   - App: `http://localhost:8000/chatgpt-king-app.html`

## 📦 Deployment

### Static Hosting
Upload all files to any static host:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Cloudflare Pages

### Subdomain Configuration
1. Upload `chatgpt-king-root.html` as `index.html` to root domain
2. Upload `chatgpt-king-app.html` as `index.html` to app subdomain
3. Upload `core.css` and `core.js` to both locations (or serve from CDN)

## 🌟 Features Demonstrated

- ✅ Mobile-first responsive design
- ✅ Off-canvas drawer navigation
- ✅ Accordion components
- ✅ Role-based menu visibility
- ✅ Shared design/behavior contract
- ✅ Multi-subdomain architecture
- ✅ No frameworks or dependencies
- ✅ Pure HTML, CSS, and vanilla JavaScript
- ✅ Accessible keyboard navigation
- ✅ Touch-friendly interface
- ✅ State persistence (localStorage)
- ✅ Smooth animations and transitions

## 🎭 Demo Instructions

### Testing Roles
1. Open either HTML file
2. Click the menu icon (mobile) or open drawer
3. Use the "Demo: Select Your Role" dropdown
4. Observe how content visibility changes based on role

### Testing Navigation
1. Start on `chatgpt-king-root.html`
2. Click "Launch App" or "App Subdomain" button
3. Navigate to `chatgpt-king-app.html`
4. Click "Back to Home" to return

### Testing Responsive Design
1. Open developer tools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test different screen sizes:
   - Mobile: 375px (iPhone SE)
   - Tablet: 768px (iPad)
   - Desktop: 1440px

### Testing Components
- **Drawer**: Click menu icon → drawer slides in
- **Accordions**: Click headers → content expands/collapses
- **Role Visibility**: Change role → content shows/hides
- **Chat**: Type message → simulated AI response

## 📝 Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Optimized for mobile

## 🔒 Security Considerations

- No server-side code
- No external dependencies
- No data transmission
- Role stored in localStorage only (demo purposes)
- In production: Implement server-side authentication

## 📄 License

Built as a demonstration project. Customize and use as needed.

## 🤝 Contributing

This is a demonstration of vanilla web development best practices:
- Semantic HTML
- Mobile-first CSS
- Progressive enhancement
- Accessible components
- Clean, documented code

---

**Built with ❤️ using only HTML, CSS, and JavaScript**
