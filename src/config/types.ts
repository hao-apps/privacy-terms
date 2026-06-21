export type AppFaq = {
	question: string;
	answer: string;
};

export type AppConfig = {
	slug: string;
	name: string;
	companyName?: string;
	supportEmail?: string;
	privacyEmail?: string;
	appStoreUrl?: string;
	googlePlayUrl?: string;
	websiteUrl?: string;
	faqs?: AppFaq[];
};
