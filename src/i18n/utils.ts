import ctaEN from "./ctaEN.json";
import ctaES from "./ctaES.json";
import featuresEN from "./featuresEN.json";
import featuresES from "./featuresES.json";
import footerEN from "./footerEN.json";
import footerES from "./footerES.json";
import heroEN from "./heroEN.json";
import heroES from "./heroES.json";
import hero404 from "./hero404.json";
import hero500 from "./hero500.json";
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
export type ServicesIndex = typeof servicesIndexEN;
