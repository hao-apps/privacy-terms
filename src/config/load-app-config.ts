import { z } from "astro/zod";
import type { AppConfig } from "./types";

const appFaqSchema = z.object({
	question: z.string().min(1),
	answer: z.string().min(1),
});

const optionalString = z.preprocess(
	(value) => (typeof value === "string" ? value.trim() || undefined : value),
	z.string().min(1).optional(),
);
const optionalEmail = z.preprocess(
	(value) => (typeof value === "string" ? value.trim() || undefined : value),
	z.string().email().optional(),
);
const optionalUrl = z.preprocess(
	(value) => (typeof value === "string" ? value.trim() || undefined : value),
	z.string().url().optional(),
);

const rawAppConfigSchema = z.object({
	name: z.string().min(1).optional(),
	companyName: optionalString,
	supportEmail: optionalEmail,
	privacyEmail: optionalEmail,
	appStoreUrl: optionalUrl,
	googlePlayUrl: optionalUrl,
	websiteUrl: optionalUrl,
	faqs: z.array(appFaqSchema).optional(),
});

const defaultConfigSchema = rawAppConfigSchema.required({
	name: true,
});

type RawAppConfig = z.infer<typeof rawAppConfigSchema>;

const configModules = import.meta.glob("./apps/*.json", {
	eager: true,
	import: "default",
}) as Record<string, unknown>;

const defaultConfigResult = defaultConfigSchema.safeParse(
	configModules["./apps/default.json"],
);

if (!defaultConfigResult.success) {
	throw new Error(
		`Invalid or missing required config file: src/config/apps/default.json\n${defaultConfigResult.error.message}`,
	);
}

const parsedConfigs = new Map<string, RawAppConfig>();

for (const [path, value] of Object.entries(configModules)) {
	if (path === "./apps/default.json") {
		continue;
	}

	const parsed = rawAppConfigSchema.safeParse(value);

	if (!parsed.success) {
		throw new Error(`Invalid app config: src/config/apps/${path.split("/").at(-1)}\n${parsed.error.message}`);
	}

	parsedConfigs.set(path, parsed.data);
}

export function loadAppConfig(appSlug: string): AppConfig {
	const appConfig = parsedConfigs.get(`./apps/${appSlug}.json`);

	return {
		...defaultConfigResult.data,
		...appConfig,
		slug: appSlug,
		companyName: appConfig?.companyName,
		supportEmail: appConfig?.supportEmail,
		privacyEmail: appConfig?.privacyEmail,
		appStoreUrl: appConfig?.appStoreUrl,
		googlePlayUrl: appConfig?.googlePlayUrl,
		websiteUrl: appConfig?.websiteUrl,
		faqs: appConfig?.faqs,
	};
}
