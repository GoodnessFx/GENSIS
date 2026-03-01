'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white p-8 text-center">
          <h2 className="text-4xl font-bold mb-4 font-title">Something went wrong.</h2>
          <p className="text-zinc-400 mb-8 max-w-md">
            The cinematic engine encountered an unexpected error. This can happen due to GPU limitations or shader issues.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-white text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
          >
            RELOAD EXPERIENCE
          </button>
        </div>
      );
    }

    return this.children;
  }
}
