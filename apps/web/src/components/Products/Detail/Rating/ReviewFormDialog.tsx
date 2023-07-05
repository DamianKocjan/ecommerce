import { Dialog, Transition } from "@headlessui/react";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { useSession } from "next-auth/react";
import React, { Fragment } from "react";
import { z } from "zod";

import { RouterOutputs, trpc } from "../../../../utils/trpc";
import { Button } from "../../../shared/core/Button";
import { Flex } from "../../../shared/core/Flex";
import { Form, useForm } from "../../../shared/forms/Form";
import { Input } from "../../../shared/forms/Input";
import { Textarea } from "../../../shared/forms/Textarea";
import { useReviewFormDialog } from "./useReviewFormDialog";

const reviewSchema = z.object({
	title: z
		.string()
		.min(50, "Title must contain at least 50 characters.")
		.max(100, "Title must contain at most 100 characters."),
	comment: z.string().max(500, "Comment must contain at most 500 characters."),
});

export interface ReviewFormDialogProps {
	slug: string;
	review: NonNullable<RouterOutputs["review"]["get"]["userReview"]>;
}

export const ReviewFormDialog: React.FC<ReviewFormDialogProps> = ({
	slug,
	review,
}) => {
	const { data: sessionData } = useSession();
	const { open, setOpen } = useReviewFormDialog();
	const form = useForm({
		schema: reviewSchema,
		defaultValues: {
			comment: review.comment ?? "",
			title: review.title ?? "",
		},
	});

	const queryKey = getQueryKey(trpc.review.get, { slug });
	const queryClient = useQueryClient();
	const { mutateAsync: writeReview } = trpc.review.write.useMutation({
		async onSuccess() {
			try {
				await queryClient.invalidateQueries(queryKey);
			} catch (error) {
				console.error(error);
			}
		},
	});

	const handleWriteReview = async (data: z.infer<typeof reviewSchema>) => {
		if (!sessionData) {
			return;
		}

		await writeReview({
			id: review.id,
			...data,
		});

		setOpen(false);
	};

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as="div"
				className="fixed inset-0 z-10 overflow-y-auto"
				onClose={setOpen}
			>
				<Flex
					className="min-h-screen text-center md:block md:px-2 lg:px-4"
					style={{ fontSize: 0 }}
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 hidden bg-zinc-900 bg-opacity-75 backdrop-blur-sm transition-opacity md:block" />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className="hidden md:inline-block md:h-screen md:align-middle"
						aria-hidden="true"
					>
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
						enterTo="opacity-100 translate-y-0 md:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 md:scale-100"
						leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
					>
						<Flex className="w-full transform text-left text-base transition md:my-8 md:inline-block md:max-w-xl md:px-4 md:align-middle lg:max-w-2xl">
							<Flex
								direction="col"
								className="relative w-full overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8"
							>
								<Form form={form} onSubmit={handleWriteReview}>
									<h3 className="text-xl">Write a review</h3>
									<Input label="Title" {...form.register("title")} />
									<Textarea
										label="Comment"
										rows={5}
										{...form.register("comment")}
									/>

									<Flex className="mt-4 gap-4 self-end">
										<Button intent="secondary" onClick={() => setOpen(false)}>
											Cancel
										</Button>
										<Button intent="secondary">Submit</Button>
									</Flex>
								</Form>
							</Flex>
						</Flex>
					</Transition.Child>
				</Flex>
			</Dialog>
		</Transition.Root>
	);
};
