import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface AuthPromptProps {
  title?: string;
  message?: string;
  showSignUp?: boolean;
}

export default function AuthPrompt({ 
  title = "Sign in required",
  message = "Please sign in to continue with your order",
  showSignUp = true 
}: AuthPromptProps) {
  const location = useLocation();
  const currentPath = location.pathname + location.search;

  return (
    <div className="min-h-screen bg-white">
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          {/* Logo */}
          <Link to="/" className="inline-block mb-8">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F0ba0452a2d1340e7b84136d8ed253a1b%2Fb6e642e462f04f14827396626baf4d5e?format=webp&width=800"
              alt="eazyy logo"
              className="h-8 w-auto mx-auto"
            />
          </Link>

          {/* Icon */}
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>

          {/* Content */}
          <h1 className="text-2xl font-medium text-black mb-4">{title}</h1>
          <p className="text-gray-600 mb-8">{message}</p>

          {/* Actions */}
          <div className="space-y-4">
            <Link
              to="/auth/login"
              state={{ from: currentPath }}
              className="block w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Sign In
            </Link>
            
            {showSignUp && (
              <Link
                to="/auth/signup"
                state={{ from: currentPath }}
                className="block w-full border border-gray-300 text-black py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Create Account
              </Link>
            )}
          </div>

          {/* Back Link */}
          <div className="mt-8">
            <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm">
              ← Continue browsing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}