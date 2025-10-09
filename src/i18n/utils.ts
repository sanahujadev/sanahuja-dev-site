import ctaEN from "./ctaEN.json";
import ctaES from "./ctaES.json";
import contactEN from "./contactEN.json";
import contactES from "./contactES.json";
import featuresEN from "./featuresEN.json";
import featuresES from "./featuresES.json";
import footerEN from "./footerEN.json";
import footerES from "./footerES.json";
import heroEN from "./heroEN.json";
import heroES from "./heroES.json";
import hero404 from "./hero404.json";
import hero500 from "./hero500.json";
import responsiveDesignEN from "./responsiveDesignEN.json";
import responsiveDesignES from "./responsiveDesignES.json";
import reviewsEN from "./reviewsEN.json";
import reviewsES from "./reviewsES.json";
import solutionEN from "./solutionEN.json";
import solutionES from "./solutionES.json";
import maintenanceConditionsEN from "./maintenanceConditionsEN.json";
import maintenanceConditionsES from "./maintenanceConditionsES.json";
import reputationConditionsEN from "./reputationConditionsEN.json";
import reputationConditionsES from "./reputationConditionsES.json";
import supportPackConditionsEN from "./supportPackConditionsEN.json";
import supportPackConditionsES from "./supportPackConditionsES.json";
import analyticsReportConditionsEN from "./analyticsReportConditionsEN.json";
import analyticsReportConditionsES from "./analyticsReportConditionsES.json";
import servicesIndexEN from "./servicesIndexEN.json";
import servicesIndexES from "./servicesIndexES.json";
import contentPlanConditionsEN from "./contentPlanConditionsEN.json";
import contentPlanConditionsES from "./contentPlanConditionsES.json";
import addOnsEN from "./addOnsEN.json";
import addOnsES from "./addOnsES.json";
import packsEN from "./packsEN.json";
import packsES from "./packsES.json";
import coreFeaturesEN from "./coreFeaturesEN.json";
import coreFeaturesES from "./coreFeaturesES.json";
import aboutEN from "./aboutEN.json";
import aboutES from "./aboutES.json";
import en from "./en.json";
import es from "./es.json";

const translations = {
	en: {
		common: en,
		hero: heroEN,
		features: featuresEN.features,
		reviews: reviewsEN,
		solution: solutionEN.solution,
		cta: ctaEN,
		footer: footerEN,
		services: maintenanceConditionsEN,
		servicesIndex: servicesIndexEN,
		reputation: reputationConditionsEN,
		supportPack: supportPackConditionsEN,
		analyticsReport: analyticsReportConditionsEN,
		contentPlanConditions: contentPlanConditionsEN,
		addOns: addOnsEN,
		packs: packsEN,
		responsiveDesign: responsiveDesignEN,
		coreFeatures: coreFeaturesEN.coreFeatures,
		about: aboutEN.about,
		contact: contactEN.contact,
	},
	es: {
		common: es,
		hero: heroES,
		features: featuresES.features,
		reviews: reviewsES,
		solution: solutionES.solution,
		cta: ctaES,
		footer: footerES,
		services: maintenanceConditionsES,
		servicesIndex: servicesIndexES,
		reputation: reputationConditionsES,
		supportPack: supportPackConditionsES,
		analyticsReport: analyticsReportConditionsES,
		contentPlanConditions: contentPlanConditionsES,
		addOns: addOnsES,
		packs: packsES,
		responsiveDesign: responsiveDesignES,
		coreFeatures: coreFeaturesES.coreFeatures,
		about: aboutES.about,
		contact: contactES.contact,
	},
	"404": {
		common: es,
		hero: hero404,
		features: null,
		reviews: null,
		solution: null,
		cta: null,
		footer: footerES,
		services: null,
		servicesIndex: null,
		reputation: null,
		supportPack: null,
		analyticsReport: null,
		contentPlanConditions: null,
		addOns: null,
		packs: null,
		responsiveDesign: null,
		coreFeatures: null,
		about: null,
		contact: null,
	},
	"500": {
		common: es,
		hero: hero500,
		features: null,
		reviews: null,
		solution: null,
		cta: null,
		footer: footerES,
		services: null,
		servicesIndex: null,
		reputation: null,
		supportPack: null,
		analyticsReport: null,
		contentPlanConditions: null,
		addOns: null,
		packs: null,
		responsiveDesign: null,
		coreFeatures: null,
		about: null,
		contact: null,
	},
};

export const getTranslations = (lang: "en" | "es" | "404" | "500") => {
	return translations[lang];
};

export type MaintenanceConditions = typeof maintenanceConditionsEN;
export type ReputationConditions = typeof reputationConditionsEN;
export type SupportPackConditions = typeof supportPackConditionsEN;
export type AnalyticsReportConditions = typeof analyticsReportConditionsEN;
export type ContentPlanConditions = typeof contentPlanConditionsEN;
export type AddOns = typeof addOnsEN;
export type Packs = typeof packsEN;
export type ServicesIndex = typeof servicesIndexEN;
export type Features = typeof featuresEN.features;
export type ResponsiveDesign = typeof responsiveDesignEN.responsiveDesign;

export type CoreFeatureItem = {
  icon: string;
  title: string;
  description: string;
  points?: string[];
  cta: {
    text: string;
    url: string;
  } | null;
};

export type CoreFeatures = {
  title: string;
  features: CoreFeatureItem[];
};

export type Link = {
  label: string;
  url: string;
};

export type SocialLink = {
  name: string;
  label: string;
  url: string;
};

export type Help = {
  text: string;
  contact: string;
  url: string;
};

export type Footer = {
  links: Link[];
  social: SocialLink[];
  legal: Link[];
  tagline: string;
  copyright: string;
  help: Help;
};

export type About = typeof aboutEN.about;
export type CallToAction = typeof ctaEN;
export type StatsSolition = typeof solutionEN.solution;
export type ContactType = typeof contactEN.contact;