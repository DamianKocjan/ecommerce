import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useForm } from "~/hooks/use-form";
import { promoCodeSchema, type PromoCodeFormData } from "~/schemas/product";

export function PromoCodeCard() {
	const form = useForm({
		schema: promoCodeSchema,
	});

	function handleSubmit(data: PromoCodeFormData) {
		console.log("Applying promo code", data.code);
	}

	return (
		<Card className="overflow-hidden">
			<CardHeader className="bg-muted/50 flex flex-row items-start">
				<CardTitle>Promo Code</CardTitle>
			</CardHeader>
			<CardContent className="p-6 text-sm">
				<Form {...form}>
					<form
						className="grid gap-3"
						onSubmit={form.handleSubmit(handleSubmit)}
					>
						<FormField
							control={form.control}
							name="code"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											placeholder="Enter promo code"
											className="w-full"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button variant="secondary" className="w-full" type="submit">
							Apply
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
