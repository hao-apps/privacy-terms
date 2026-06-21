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
	return (
		<div className="flex flex-col gap-6">
			<section className="flex flex-col gap-3">
				<p className="text-sm text-muted-foreground">{app.companyName}</p>
				<h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
					{app.name} Support
				</h1>
				<p className="max-w-2xl text-base leading-7 text-muted-foreground">
					Need help with {app.name}? Contact us and include your app name,
					device model, OS version, and a short description of the issue.
				</p>
			</section>

			<Card>
				<CardHeader>
					<CardTitle>Contact Support</CardTitle>
					<CardDescription>
						We will use your message to investigate and respond to your request.
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

			{app.faqs && app.faqs.length > 0 && (
				<Card>
					<CardHeader>
						<CardTitle>FAQ</CardTitle>
						<CardDescription>Common questions about support and billing.</CardDescription>
					</CardHeader>
					<CardContent>
						<Accordion type="single" collapsible>
							{app.faqs.map((faq, index) => (
								<AccordionItem key={faq.question} value={`item-${index}`}>
									<AccordionTrigger>{faq.question}</AccordionTrigger>
									<AccordionContent forceMount>{faq.answer}</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</CardContent>
				</Card>
			)}

			{(app.appStoreUrl || app.googlePlayUrl) && (
				<div className="flex flex-col gap-4">
					<Separator />
					<div className="flex flex-wrap gap-3">
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
