import { z } from "zod";

export const promoCodeSchema = z.object({
	code: z.string(),
});
export type PromoCodeFormData = z.infer<typeof promoCodeSchema>;
