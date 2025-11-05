// src/scripts/init-consent.ts
import { ConsentManager } from './ConsentManager';
import type { CookieConsentType } from '../i18n/utils';

interface ConsentConfig {
  lang: string;
  translations: CookieConsentType;
}

const MAX_RETRIES = 10;
let retries = 0;

export function initializeCookieConsent(config: ConsentConfig) {
  // Guardia 1: Singleton
  if ((window as any).__consentManagerInstance || document.querySelector('#cc-main')) {
    return;
  }

  // Guardia 2: ¿Está window.CookieConsent disponible?
  if (typeof window.CookieConsent === 'undefined') {
    retries++;
    if (retries < MAX_RETRIES) {
      setTimeout(() => initializeCookieConsent(config), 200); 
    } else {
      console.error('[Gambito] window.CookieConsent no se cargó después de', MAX_RETRIES, 'intentos');
    }
    return;
  }

  // ¡La librería está lista!
  try {
    const manager = new ConsentManager(config);
    manager.init();
    (window as any).__consentManagerInstance = manager;
    retries = 0;
  } catch (error) {
    console.error('[ConsentManager] Init failed:', error);
  }
}

// Auto-init si hay config en window
function autoInit() {
  const config = (window as any).__CONSENT_CONFIG__;
  if (config) {
    initializeCookieConsent(config);
  }
}

// Para navegaciones de Astro
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', autoInit);
} else {
  autoInit();
}

document.addEventListener('astro:page-load', autoInit);