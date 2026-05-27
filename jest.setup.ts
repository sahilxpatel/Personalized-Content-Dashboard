import React from "react";
import "@testing-library/jest-dom";

jest.mock("next/image", () => ({
	__esModule: true,
	default: ({ alt, fill: _fill, ...props }: Record<string, unknown>) => {
		return React.createElement("img", { alt: String(alt), ...props });
	},
}));

Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: (query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(),
		removeListener: jest.fn(),
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	}),
});

class IntersectionObserverMock {
	observe() {}
	unobserve() {}
	disconnect() {}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).IntersectionObserver = IntersectionObserverMock;
