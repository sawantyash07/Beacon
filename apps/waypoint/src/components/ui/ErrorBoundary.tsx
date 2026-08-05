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

    // Automatically handle stale asset / dynamic module import errors post-deployment
    if (
      error.message?.includes('dynamically imported module') ||
      error.message?.includes('Importing a module script failed') ||
      error.message?.includes('Loading chunk')
    ) {
      const refreshed = sessionStorage.getItem('chunk_reload_retry');
      if (!refreshed) {
        sessionStorage.setItem('chunk_reload_retry', 'true');
        window.location.reload();
      }
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#001731] p-4 text-white font-body">
          <div className="glass-dark max-w-md w-full p-8 rounded-2xl text-center shadow-xl border border-cyan/30">
            <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-400">
              <span className="text-3xl">⚠️</span>
            </div>
            <h2 className="text-2xl font-bold font-heading text-white mb-3">Updating Application Assets</h2>
            <p className="text-cyan-200/70 mb-6 text-xs font-mono">
              A new version of Beacon has been deployed. Please click below to refresh and load the latest updates.
            </p>
            <div className="bg-red-500/10 text-red-300 p-3 rounded-xl text-xs font-mono text-left mb-6 overflow-auto max-h-32 border border-red-500/20">
              {this.state.error?.message || "Module loading error"}
            </div>
            <button
              className="bg-gradient-to-r from-teal to-cyan text-navy font-bold px-6 py-3 rounded-xl text-xs font-mono hover:brightness-110 transition-all w-full shadow-lg"
              onClick={() => {
                sessionStorage.removeItem('chunk_reload_retry');
                window.location.reload();
              }}
            >
              Refresh & Load Latest Version
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
