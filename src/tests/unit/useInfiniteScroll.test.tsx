import { render } from "@testing-library/react";
import React, { useRef } from "react";

import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

const TestComponent = ({ onLoad }: { onLoad: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  useInfiniteScroll({ sentinelRef: ref, hasMore: true, onLoadMore: onLoad });
  return (
    <div>
      <div>content</div>
      <div ref={ref} data-testid="sentinel" />
    </div>
  );
};

describe("useInfiniteScroll", () => {
  const original = globalThis.IntersectionObserver;

  beforeEach(() => {
    globalThis.IntersectionObserver = class MockIntersectionObserver implements IntersectionObserver {
      readonly root: Element | Document | null = null;
      readonly rootMargin = "0px";
      readonly thresholds = [0];

      constructor(private readonly callback: IntersectionObserverCallback) {}

      observe = () => {
        this.callback([{ isIntersecting: true } as IntersectionObserverEntry], this);
      };

      unobserve = () => {};
      disconnect = () => {};
      takeRecords = () => [];
    } as unknown as typeof IntersectionObserver;
  });

  afterEach(() => {
    globalThis.IntersectionObserver = original;
  });

  test("calls onLoadMore when sentinel intersects", () => {
    const load = jest.fn();
    render(<TestComponent onLoad={load} />);
    expect(load).toHaveBeenCalled();
  });
});
