// src/scripts/ConsentManager.ts
import * as CookieConsentAPI from "vanilla-cookieconsent";
import type { CookieConsentType } from "../i18n/utils";
// import type {CookieConsen} from "vanilla-cookieconsent";

declare global {
  interface Window {
    gtag: (type: string, action: string, payload: object) => void;
    CookieConsent: typeof CookieConsentAPI; // ✅ CookieConsent, no initCookieConsent
  }
}

interface ConsentConfig {
  lang: string;
  translations: CookieConsentType;
}

export class ConsentManager {
  private config: ConsentConfig;

  constructor(configData: ConsentConfig) {
    if (!configData?.lang || !configData?.translations) {
      throw new Error("[ConsentManager] Invalid configuration");
    }
    this.config = configData;
  }

  public init(): void {
    // ✅ Verificar window.CookieConsent (no initCookieConsent)
    if (typeof window.CookieConsent === "undefined") {
      throw new Error("[ConsentManager] window.CookieConsent not found");
    }

    // Guardia contra duplicados
    if (document.querySelector("#cc-main")) {
      return;
    }

    // ✅ API v3: CookieConsent.run()
    window.CookieConsent.run({
      autoClearCookies: true,
      manageScriptTags: true,

      guiOptions: {
        consentModal: {
          layout: "box",
          position: "bottom right",
        },
        preferencesModal: {
          layout: "box",
        },
      },

      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },
        analytics: {
          enabled: false,
          readOnly: false,
          autoClear: {
            cookies: [
              {
                name: /^(_ga|_gid|_gat)/,
              },
            ],
          },
        },
      },

      onFirstConsent: ({ cookie }: any) => {
        this.updateGTMConsent(cookie.categories);
      },

      onConsent: ({ cookie }: any) => {
        this.updateGTMConsent(cookie.categories);
      },

      onChange: ({ cookie }: any) => {
        this.updateGTMConsent(cookie.categories);
      },

      language: {
        default: this.config.lang,
        translations: {
          [this.config.lang]: this.config.translations,
        },
      },
    });
  }

  private updateGTMConsent(categories: string[]): void {
    if (typeof window.gtag !== "function") {
      return;
    }

    const consentUpdate = {
      analytics_storage: categories.includes("analytics")
        ? "granted"
        : "denied",
      ad_storage: "denied",
      functionality_storage: categories.includes("analytics")
        ? "granted"
        : "denied",
      personalization_storage: "denied",
      security_storage: "granted",
    };

    window.gtag("consent", "update", consentUpdate);
    console.log("[ConsentManager] GTM updated:", consentUpdate);
  }

  public showSettings(): void {
    window.CookieConsent?.showPreferences();
  }
}
