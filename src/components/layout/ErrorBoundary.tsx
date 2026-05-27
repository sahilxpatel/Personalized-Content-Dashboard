"use client";

import { Component, ErrorInfo, ReactNode } from "react";

import { ErrorState } from "@/components/ui/ErrorState";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error("Unhandled dashboard error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorState description="Please refresh to recover." title="Dashboard failed to render" />;
    }

    return this.props.children;
  }
}
