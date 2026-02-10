// Cookie Consent Management
(function() {
  'use strict';

  const COOKIE_CONSENT_KEY = 'cookie_consent';
  const COOKIE_EXPIRY_DAYS = 365;

  // Cookie utility functions
  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  function getConsent() {
    const consent = getCookie(COOKIE_CONSENT_KEY);
    if (consent) {
      try {
        return JSON.parse(consent);
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  function saveConsent(consent) {
    setCookie(COOKIE_CONSENT_KEY, JSON.stringify(consent), COOKIE_EXPIRY_DAYS);
  }

  function hasConsent() {
    return getCookie(COOKIE_CONSENT_KEY) !== null;
  }

  // Initialize cookie banner
  function initCookieBanner() {
    if (hasConsent()) {
      return; // Don't show banner if consent already given
    }

    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.style.display = 'block';
    }

    // Accept all cookies
    const acceptBtn = document.getElementById('cookie-accept');
    if (acceptBtn) {
      acceptBtn.addEventListener('click', function() {
        const consent = {
          technical: true,
          analytics: true,
          marketing: true,
          timestamp: new Date().toISOString()
        };
        saveConsent(consent);
        hideBanner();
        loadCookies(consent);
      });
    }

    // Reject all cookies (only technical)
    const rejectBtn = document.getElementById('cookie-reject');
    if (rejectBtn) {
      rejectBtn.addEventListener('click', function() {
        const consent = {
          technical: true,
          analytics: false,
          marketing: false,
          timestamp: new Date().toISOString()
        };
        saveConsent(consent);
        hideBanner();
        loadCookies(consent);
      });
    }

    // Open configuration modal
    const configBtn = document.getElementById('cookie-config');
    if (configBtn) {
      configBtn.addEventListener('click', function() {
        openConfigModal();
      });
    }

    // Modal close
    const modalClose = document.getElementById('cookie-modal-close');
    if (modalClose) {
      modalClose.addEventListener('click', function() {
        closeConfigModal();
      });
    }

    // Save preferences
    const saveBtn = document.getElementById('cookie-save');
    if (saveBtn) {
      saveBtn.addEventListener('click', function() {
        const consent = {
          technical: true, // Always true
          analytics: document.getElementById('cookie-analytics').checked,
          marketing: document.getElementById('cookie-marketing').checked,
          timestamp: new Date().toISOString()
        };
        saveConsent(consent);
        closeConfigModal();
        hideBanner();
        loadCookies(consent);
      });
    }

    // Close modal on outside click
    const modal = document.getElementById('cookie-modal');
    if (modal) {
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          closeConfigModal();
        }
      });
    }
  }

  function hideBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.style.display = 'none';
    }
  }

  function openConfigModal() {
    const modal = document.getElementById('cookie-modal');
    const consent = getConsent();
    
    if (modal) {
      // Set current preferences if consent exists
      if (consent) {
        document.getElementById('cookie-analytics').checked = consent.analytics || false;
        document.getElementById('cookie-marketing').checked = consent.marketing || false;
      }
      
      modal.style.display = 'flex';
    }
  }

  function closeConfigModal() {
    const modal = document.getElementById('cookie-modal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  // Load cookies based on consent
  function loadCookies(consent) {
    if (!consent) {
      consent = getConsent();
    }

    if (!consent) {
      return;
    }

    // Load analytics cookies if consented (Google Analytics gtag.js)
    if (typeof gtag === 'function') {
      if (consent.analytics) {
        gtag('consent', 'update', { 'analytics_storage': 'granted' });
      } else {
        gtag('consent', 'update', { 'analytics_storage': 'denied' });
      }
      if (consent.marketing) {
        gtag('consent', 'update', { 'ad_storage': 'granted' });
      } else {
        gtag('consent', 'update', { 'ad_storage': 'denied' });
      }
    }
  }

  // Initialize on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initCookieBanner();
      const consent = getConsent();
      if (consent) {
        loadCookies(consent);
      }
    });
  } else {
    initCookieBanner();
    const consent = getConsent();
    if (consent) {
      loadCookies(consent);
    }
  }

  // Export functions for external use
  window.cookieConsent = {
    getConsent: getConsent,
    hasConsent: hasConsent,
    openConfig: openConfigModal
  };

})();
