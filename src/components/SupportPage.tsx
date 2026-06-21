import { MailIcon, StoreIcon } from "lucide-react";
import type { AppConfig } from "@/config/types";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type Props = {
	app: AppConfig;
};

export function SupportPage({ app }: Props) {
	const faqs = app.faqs ?? [];
	const hasStoreLinks = Boolean(app.appStoreUrl || app.googlePlayUrl);

	return (
		<div className="flex flex-col gap-6">
			<section className="flex flex-col items-center gap-3 text-center">
				<h1 className="mx-auto max-w-full text-3xl font-bold text-pretty text-foreground lg:text-4xl">
					{app.name} Support
				</h1>
				<p className="max-w-2xl text-base leading-7 text-muted-foreground">
					Need help with {app.name}? Contact us and include your app name,
					device model, OS version, and a short description of the issue.
				</p>
			</section>

			{app.supportEmail && (
				<Card>
					<CardHeader>
						<CardTitle>Contact Support</CardTitle>
						<CardDescription>
							We will use your message to investigate and respond to your
							request.
						</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
						<p className="text-sm text-muted-foreground">{app.supportEmail}</p>
						<Button asChild>
							<a href={`mailto:${app.supportEmail}`}>
								<MailIcon data-icon="inline-start" />
								Email Support
							</a>
						</Button>
					</CardContent>
				</Card>
			)}

			<Card>
				<CardHeader>
					<CardTitle>Subscription Support</CardTitle>
					<CardDescription>
						App Store subscriptions are managed through Apple.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p className="text-sm leading-6 text-muted-foreground">
						If you purchased a subscription through the App Store, you can
						manage or cancel it from your Apple ID subscription settings.
					</p>
				</CardContent>
			</Card>

			{faqs.length > 0 && (
				<section className="-mx-6 mt-4 flex flex-col gap-10 rounded-[2rem] bg-muted px-6 py-12 text-foreground sm:mx-0 sm:px-8 sm:py-16">
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
							Frequently asked questions about {app.name}
						</h2>
					</div>

					<div className="mx-auto w-full max-w-full">
						<Accordion
							type="single"
							collapsible
							defaultValue="item-0"
							className="w-full rounded-2xl bg-card px-6 py-2 shadow-sm"
						>
							{faqs.map((faq, index) => (
								<AccordionItem key={faq.question} value={`item-${index}`}>
									<AccordionTrigger className="cursor-pointer py-5 text-left text-base font-semibold hover:no-underline sm:text-lg">
										{faq.question}
									</AccordionTrigger>
									<AccordionContent className="text-base leading-7 text-muted-foreground">
										{faq.answer}
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</div>
				</section>
			)}

			{hasStoreLinks && (
				<div className="flex flex-col gap-4">
					<Separator />
					<div className="flex flex-wrap justify-end gap-3">
						{app.appStoreUrl && (
							<Button variant="outline" asChild>
								<a href={app.appStoreUrl}>
									<StoreIcon data-icon="inline-start" />
									View on the App Store
								</a>
							</Button>
						)}

						{app.googlePlayUrl && (
							<Button variant="outline" asChild>
								<a href={app.googlePlayUrl}>
									<StoreIcon data-icon="inline-start" />
									View on Google Play
								</a>
							</Button>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
