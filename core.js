// CHATGPT KING - Core JavaScript (Vanilla JS)
// Shared behavior contract for all subdomains

(function() {
  'use strict';

  // State management
  const state = {
    currentRole: 'guest', // guest, member, pro, admin
    drawerOpen: false,
    openAccordions: new Set()
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // Set initial role from localStorage or default to guest
    loadUserRole();
    
    // Initialize components
    initDrawer();
    initAccordions();
    initRoleSelector();
    
    // Apply role-based visibility
    applyRoleVisibility();
    
    console.log('CHATGPT KING Core initialized with role:', state.currentRole);
  }

  // ========================================
  // Role Management
  // ========================================
  
  function loadUserRole() {
    // Try to load from localStorage
    const savedRole = localStorage.getItem('chatgpt_king_role');
    if (savedRole && ['guest', 'member', 'pro', 'admin'].includes(savedRole)) {
      state.currentRole = savedRole;
    }
    document.body.setAttribute('data-role', state.currentRole);
  }

  function setUserRole(role) {
    if (!['guest', 'member', 'pro', 'admin'].includes(role)) {
      console.error('Invalid role:', role);
      return;
    }
    
    state.currentRole = role;
    localStorage.setItem('chatgpt_king_role', role);
    document.body.setAttribute('data-role', role);
    applyRoleVisibility();
    
    // Trigger custom event for role change
    document.dispatchEvent(new CustomEvent('roleChanged', { detail: { role } }));
    console.log('Role changed to:', role);
  }

  function applyRoleVisibility() {
    // Role visibility is handled by CSS using data-role attribute
    // This function can be extended for additional JavaScript-based visibility logic
  }

  // ========================================
  // Off-Canvas Drawer
  // ========================================
  
  function initDrawer() {
    const menuToggle = document.querySelector('.menu-toggle');
    const drawer = document.querySelector('.drawer');
    const drawerOverlay = document.querySelector('.drawer-overlay');
    const drawerClose = document.querySelector('.drawer-close');

    if (!drawer) return;

    // Open drawer
    if (menuToggle) {
      menuToggle.addEventListener('click', openDrawer);
    }

    // Close drawer
    if (drawerClose) {
      drawerClose.addEventListener('click', closeDrawer);
    }

    if (drawerOverlay) {
      drawerOverlay.addEventListener('click', closeDrawer);
    }

    // Close drawer on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && state.drawerOpen) {
        closeDrawer();
      }
    });

    // Close drawer when clicking internal navigation links
    const drawerLinks = drawer.querySelectorAll('.drawer-nav-link');
    drawerLinks.forEach(link => {
      link.addEventListener('click', function() {
        // Small delay to allow navigation
        setTimeout(closeDrawer, 100);
      });
    });
  }

  function openDrawer() {
    const drawer = document.querySelector('.drawer');
    const drawerOverlay = document.querySelector('.drawer-overlay');
    
    if (drawer) {
      drawer.classList.add('active');
      state.drawerOpen = true;
    }
    
    if (drawerOverlay) {
      drawerOverlay.classList.add('active');
    }
    
    // Prevent body scroll when drawer is open
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    const drawer = document.querySelector('.drawer');
    const drawerOverlay = document.querySelector('.drawer-overlay');
    
    if (drawer) {
      drawer.classList.remove('active');
      state.drawerOpen = false;
    }
    
    if (drawerOverlay) {
      drawerOverlay.classList.remove('active');
    }
    
    // Restore body scroll
    document.body.style.overflow = '';
  }

  // ========================================
  // Accordion
  // ========================================
  
  function initAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach((header, index) => {
      // Add unique ID if not present
      if (!header.id) {
        header.id = `accordion-header-${index}`;
      }

      header.addEventListener('click', function() {
        toggleAccordion(this);
      });
    });
  }

  function toggleAccordion(header) {
    const accordionItem = header.closest('.accordion-item');
    if (!accordionItem) return;

    const content = accordionItem.querySelector('.accordion-content');
    if (!content) return;

    const isOpen = header.classList.contains('active');
    const accordionId = header.id;

    if (isOpen) {
      // Close accordion
      header.classList.remove('active');
      content.classList.remove('active');
      content.style.maxHeight = '';
      state.openAccordions.delete(accordionId);
    } else {
      // Open accordion
      header.classList.add('active');
      content.classList.add('active');
      state.openAccordions.add(accordionId);
      
      // Adjust max-height based on content
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  }

  function closeAllAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header.active');
    accordionHeaders.forEach(header => {
      toggleAccordion(header);
    });
  }

  // ========================================
  // Role Selector (for demo purposes)
  // ========================================
  
  function initRoleSelector() {
    const roleSelector = document.querySelector('#roleSelector');
    if (!roleSelector) return;

    // Set current role
    roleSelector.value = state.currentRole;

    // Listen for changes
    roleSelector.addEventListener('change', function() {
      setUserRole(this.value);
    });
  }

  // ========================================
  // Utility Functions
  // ========================================
  
  function createElement(tag, className, content) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content) element.textContent = content;
    return element;
  }

  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.drawer-nav-link, .header-nav-link');
    
    navLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname;
      if (linkPath === currentPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // ========================================
  // Public API
  // ========================================
  
  window.ChatGPTKing = {
    // Role management
    setRole: setUserRole,
    getRole: () => state.currentRole,
    
    // Drawer
    openDrawer: openDrawer,
    closeDrawer: closeDrawer,
    
    // Accordion
    closeAllAccordions: closeAllAccordions,
    
    // Utilities
    createElement: createElement,
    getQueryParam: getQueryParam,
    setActiveNavLink: setActiveNavLink
  };

  // Set active nav link on load
  setActiveNavLink();

})();
