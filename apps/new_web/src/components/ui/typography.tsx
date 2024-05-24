import * as React from "react";

import { cn } from "~/lib/utils";

export interface HeadingProps
	extends React.HTMLAttributes<HTMLHeadingElement> {}

export function H1({ children, className, ...props }: HeadingProps) {
	return (
		<h1
			className={cn(
				"scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
				className,
			)}
			{...props}
		>
			{children}
		</h1>
	);
}

export function H2({ children, className, ...props }: HeadingProps) {
	return (
		<h2
			className={cn(
				"scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
				className,
			)}
			{...props}
		>
			{children}
		</h2>
	);
}

export function H3({ children, className, ...props }: HeadingProps) {
	return (
		<h3
			className={cn(
				"scroll-m-20 text-2xl font-semibold tracking-tight",
				className,
			)}
			{...props}
		>
			{children}
		</h3>
	);
}

export function H4({ children, className, ...props }: HeadingProps) {
	return (
		<h4
			className={cn(
				"scroll-m-20 text-xl font-semibold tracking-tight",
				className,
			)}
			{...props}
		>
			{children}
		</h4>
	);
}

export interface ParagraphProps
	extends React.HTMLAttributes<HTMLParagraphElement> {}

export function P({ children, className, ...props }: ParagraphProps) {
	return (
		<p
			className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
			{...props}
		>
			{children}
		</p>
	);
}

export interface BlockquoteProps
	extends React.HTMLAttributes<HTMLQuoteElement> {}

export function Blockquote({ children, className, ...props }: BlockquoteProps) {
	return (
		<blockquote
			className={cn("mt-6 border-l-2 pl-6 italic", className)}
			{...props}
		>
			{children}
		</blockquote>
	);
}

export interface UnorderedListProps
	extends React.HTMLAttributes<HTMLUListElement> {}

export function Ul({ children, className, ...props }: UnorderedListProps) {
	return (
		<ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)} {...props}>
			{children}
		</ul>
	);
}

export interface OrderedListProps
	extends React.HTMLAttributes<HTMLOListElement> {}

export function Ol({ children, className, ...props }: OrderedListProps) {
	return (
		<ol
			className={cn("my-6 ml-6 list-decimal [&>li]:mt-2", className)}
			{...props}
		>
			{children}
		</ol>
	);
}

export interface InlineCodeProps extends React.HTMLAttributes<HTMLElement> {}

export function InlineCode({ children, className, ...props }: InlineCodeProps) {
	return (
		<code
			className={cn(
				"bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
				className,
			)}
			{...props}
		>
			{children}
		</code>
	);
}

export interface LeadProps extends ParagraphProps {}

export function Lead({ children, className, ...props }: LeadProps) {
	return (
		<p className={cn("text-muted-foreground text-xl", className)} {...props}>
			{children}
		</p>
	);
}

export interface LargeProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Large({ children, className, ...props }: LargeProps) {
	return (
		<div className={cn("text-lg font-semibold", className)} {...props}>
			{children}
		</div>
	);
}

export interface SmallProps extends React.HTMLAttributes<HTMLElement> {}

export function Small({ children, className, ...props }: SmallProps) {
	return (
		<small
			className={cn("text-sm font-medium leading-none", className)}
			{...props}
		>
			{children}
		</small>
	);
}

export interface MutedProps
	extends React.HTMLAttributes<HTMLParagraphElement> {}

export function Muted({ children, className, ...props }: MutedProps) {
	return (
		<p className={cn("text-muted-foreground text-sm", className)} {...props}>
			{children}
		</p>
	);
}
