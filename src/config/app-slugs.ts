type LegalDocument = "privacy" | "terms";

const privacyModules = import.meta.glob("../content/apps/*/privacy.md");
const termsModules = import.meta.glob("../content/apps/*/terms.md");

const documentModules: Record<LegalDocument, Record<string, unknown>> = {
	privacy: privacyModules,
	terms: termsModules,
};

function extractSlug(filePath: string): string | null {
	const match = filePath.match(/\/apps\/([^/]+)\//);

	return match?.[1] ?? null;
}

function collectSlugs(paths: string[]): string[] {
	return Array.from(
		paths.reduce((slugs, filePath) => {
			const slug = extractSlug(filePath);

			if (slug) {
				slugs.add(slug);
			}

			return slugs;
		}, new Set<string>()),
	).sort();
}

export function getAppSlugsForDocument(document: LegalDocument): string[] {
	return collectSlugs(Object.keys(documentModules[document]));
}

export function getAppSlugs(): string[] {
	return collectSlugs([
		...Object.keys(privacyModules),
		...Object.keys(termsModules),
	]);
}
