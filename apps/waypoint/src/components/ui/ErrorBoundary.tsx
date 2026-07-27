import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-page p-4">
          <div className="glass max-w-md w-full p-8 rounded-2xl text-center shadow-xl border border-border">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">⚠️</span>
            </div>
            <h2 className="text-2xl font-bold text-navy mb-4">Oops, something went wrong</h2>
            <p className="text-muted mb-6 text-sm">
              An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.
            </p>
            <div className="bg-red-500/5 text-red-500 p-3 rounded-lg text-xs font-mono text-left mb-6 overflow-auto max-h-32">
              {this.state.error?.message || "Unknown error"}
            </div>
            <button
              className="bg-teal hover:bg-cyan text-white px-6 py-2.5 rounded-lg font-medium transition-colors w-full"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
