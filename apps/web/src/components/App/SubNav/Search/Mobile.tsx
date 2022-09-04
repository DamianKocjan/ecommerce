import { IconButton } from "@ecommerce/ui";
import { Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { MagnifyingGlass as SearchIcon } from "phosphor-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

// TODO: smoother transition of input box hiding/showing
const MobileSearch: React.FC = () => {
	const [search, setSearch] = useState("");
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [showOpenSearch, setShowOpenSearch] = useState(true);
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
		setIsSearchOpen(true);
		setShowOpenSearch(false);
		setTimeout(() => searchInputRef.current?.focus(), 200);
	}, [searchInputRef]);

	return (
		<form
			className="flex items-center justify-between"
			onSubmit={handleSearchSubmit}
		>
			<label className="flex items-center" htmlFor="search">
				{showOpenSearch ? (
					<IconButton className="flex-none" onClick={handleFocusInput}>
						<span className="sr-only">Search</span>
						<SearchIcon
							className="block h-6 w-6 text-black"
							aria-hidden="true"
						/>
					</IconButton>
				) : (
					<IconButton type="submit" className="flex-none">
						<span className="sr-only">Search</span>
						<SearchIcon
							className="block h-6 w-6 text-black"
							aria-hidden="true"
						/>
					</IconButton>
				)}

				<Transition
					show={isSearchOpen}
					enter="transform transition ease-in-out duration-200"
					enterFrom="translate-x-[120%] scale-x-0"
					enterTo="translate-x-0 scale-x-100"
					leave="transform transition ease-in-out duration-500"
					leaveFrom="translate-x-0 scale-x-100"
					leaveTo="translate-x-[120%] scale-x-0"
					afterLeave={() => setShowOpenSearch(true)}
				>
					<input
						type="text"
						placeholder="Search"
						id="search"
						className="flex-1 focus:ring-teal-400 focus:border-teal-400 ring-black border-ring-black"
						onChange={handleSearchInput}
						onBlur={() => isSearchOpen && setIsSearchOpen(false)}
						value={search}
						ref={searchInputRef}
						enterKeyHint="search"
					/>
				</Transition>
			</label>
		</form>
	);
};

export default MobileSearch;
