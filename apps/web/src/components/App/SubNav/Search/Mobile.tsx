import { useRouter } from "next/router";
import { MagnifyingGlass as SearchIcon } from "phosphor-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { Flex } from "../../../shared/core/Flex";
import { IconButton } from "../../../shared/core/IconButton";

export const MobileSearch: React.FC = () => {
	const [search, setSearch] = useState("");
	const [isUserSubmit, setIsUserSubmit] = useState(false);
	const [showOpenSearch, setShowOpenSearch] = useState(true);
	const searchInputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();
	const slug = router.query["slug"] as string;
	const query = router.query["q"] as string;

	useEffect(() => {
		if (query) {
			setSearch(decodeURIComponent(query));
		} else {
			setSearch("");
		}
	}, [query, router]);

	const handleSearchInput = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setSearch(e.target.value);
		},
		[],
	);

	const handleSearchSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			if (!isUserSubmit) {
				return;
			}

			const searchParsed = search.trim();
			const path = router.asPath;
			const encodedSearch = encodeURIComponent(searchParsed);

			if (path.includes("/c/")) {
				if (path.includes("?q=")) {
					void router.push(`/c/${slug}?q=${encodedSearch}`);
				} else {
					void router.push(`${path}?q=${encodedSearch}`);
				}
			} else {
				void router.push(`/catalog/?q=${encodedSearch}`);
			}

			setIsUserSubmit(false);
		},
		[isUserSubmit, search, router, slug],
	);

	const handleFocusInput = useCallback(() => {
		setShowOpenSearch(false);
		setTimeout(() => searchInputRef.current?.focus(), 200);
	}, [searchInputRef]);

	return (
		<Flex
			as="form"
			items="center"
			justify="between"
			onSubmit={handleSearchSubmit}
		>
			<Flex as="label" items="center" htmlFor="search">
				{showOpenSearch ? (
					<IconButton className="flex-none" onClick={handleFocusInput}>
						<span className="sr-only">Search</span>
						<SearchIcon
							className="block h-6 w-6 text-black"
							aria-hidden="true"
						/>
					</IconButton>
				) : (
					<>
						<IconButton
							type="submit"
							className="flex-none"
							onClick={() => setIsUserSubmit(true)}
						>
							<span className="sr-only">Search</span>
							<SearchIcon
								className="block h-6 w-6 text-black"
								aria-hidden="true"
							/>
						</IconButton>

						<input
							type="text"
							placeholder="Search"
							id="search"
							className="border-ring-black flex-1 ring-black focus:border-teal-400 focus:ring-teal-400"
							onChange={handleSearchInput}
							onBlur={() => setShowOpenSearch(true)}
							value={search}
							ref={searchInputRef}
							enterKeyHint="search"
						/>
					</>
				)}
			</Flex>
		</Flex>
	);
};
