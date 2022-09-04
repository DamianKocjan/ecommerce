import { IconButton } from "@ecommerce/ui";
import { useRouter } from "next/router";
import { MagnifyingGlass as SearchIcon } from "phosphor-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

const DesktopSearch: React.FC = () => {
	const [search, setSearch] = useState("");
	const searchInputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();

	useEffect(() => {
		document.addEventListener("keydown", handleShortcutFocusInput);

		return () => {
			document.removeEventListener("keydown", handleShortcutFocusInput);
		};
	}, []);

	useEffect(() => {
		if (router.query["q"]) {
			setSearch(decodeURIComponent(router.query["q"] as string));
		} else {
			setSearch("");
		}
	}, [router]);

	const handleShortcutFocusInput = useCallback((e: KeyboardEvent) => {
		if (
			e.key === "k" &&
			e.ctrlKey &&
			(document.activeElement === null ||
				document.activeElement !== searchInputRef.current)
		) {
			e.preventDefault();
			searchInputRef.current?.focus();
		}
	}, []);

	const handleSearchInput = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setSearch(e.target.value);
		},
		[]
	);

	const handleSearchSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			const searchParsed = search.trim();

			const path = router.asPath;
			if (path.includes("/c/")) {
				if (path.includes("?q=")) {
					const slug = router.query["slug"];

					router.push(`/c/${slug}?q=${encodeURIComponent(searchParsed)}`);
				} else {
					router.push(`${path}?q=${encodeURIComponent(searchParsed)}`);
				}
			} else {
				router.push(`/catalog/?q=${encodeURIComponent(searchParsed)}`);
			}
		},
		[search, router]
	);

	const handleFocusInput = useCallback(() => {
		searchInputRef.current?.focus();
	}, [searchInputRef]);

	return (
		<form
			className="flex items-center justify-between"
			onSubmit={handleSearchSubmit}
		>
			<label className="flex items-center" htmlFor="search">
				<IconButton
					type="submit"
					className="flex-none"
					onClick={handleFocusInput}
				>
					<span className="sr-only">Search</span>
					<SearchIcon className="block h-6 w-6 text-black" aria-hidden="true" />
				</IconButton>

				<input
					type="text"
					placeholder="Search"
					id="search"
					className="flex-1 focus:ring-teal-400 focus:border-teal-400 ring-black border-ring-black"
					onChange={handleSearchInput}
					value={search}
					ref={searchInputRef}
				/>
			</label>
		</form>
	);
};

export default DesktopSearch;
