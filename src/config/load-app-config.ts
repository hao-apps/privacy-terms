import { z } from "astro/zod";
import type { AppConfig } from "./types";

const appFaqSchema = z.object({
	question: z.string().min(1),
	answer: z.string().min(1),
});

const rawAppConfigSchema = z.object({
	name: z.string().min(1).optional(),
	companyName: z.string().min(1).optional(),
	supportEmail: z.string().email().optional(),
	privacyEmail: z.string().email().optional(),
	appStoreUrl: z.string().url().optional(),
	googlePlayUrl: z.string().url().optional(),
	websiteUrl: z.string().url().optional(),
	faqs: z.array(appFaqSchema).optional(),
});

const defaultConfigSchema = rawAppConfigSchema.required({
	name: true,
	companyName: true,
	supportEmail: true,
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
	};
}
