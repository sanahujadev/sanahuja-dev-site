import ctaEN from "./ctaEN.json";
import ctaES from "./ctaES.json";
import featuresEN from "./featuresEN.json";
import featuresES from "./featuresES.json";
import footerEN from "./footerEN.json";
import footerES from "./footerES.json";
import heroEN from "./heroEN.json";
import heroES from "./heroES.json";
import reviewsEN from "./reviewsEN.json";
import reviewsES from "./reviewsES.json";
import solutionEN from "./solutionEN.json";
import solutionES from "./solutionES.json";
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
	},
	es: {
		common: es,
		hero: heroES,
		features: featuresES.features,
		reviews: reviewsES,
		solution: solutionES.solution,
		cta: ctaES,
		footer: footerES,
	},
};

export const getTranslations = (lang: "en" | "es") => {
	return translations[lang];
};
