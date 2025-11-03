'use client';

import { useState } from 'react';

export default function AuthForm() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('signup');

  return (
    <div className="w-full max-w-sm">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-border-light">
        <div className="mb-6">
          <div className="flex border-b border-border-light">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 pb-3 text-sm font-bold border-b-2 focus:outline-none transition-all duration-300 ${
                activeTab === 'login'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-light-body'
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex-1 pb-3 text-sm font-bold border-b-2 focus:outline-none transition-all duration-300 ${
                activeTab === 'signup'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-light-body'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {activeTab === 'login' ? (
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1">
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="form-input block w-full px-4 py-3 border border-border-light rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="form-input block w-full px-4 py-3 border border-border-light rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-gray-50"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded form-checkbox"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-text-light-body">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-primary/80">
                  Forgot Password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Log In Securely
              </button>
            </div>
          </form>
        ) : (
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="signup-name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="signup-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="form-input block w-full px-4 py-3 border border-border-light rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1">
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="form-input block w-full px-4 py-3 border border-border-light rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="signup-password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="form-input block w-full px-4 py-3 border border-border-light rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-gray-50"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Start for Free
              </button>
            </div>

            <div className="text-center text-xs text-text-light-body">
              By signing up, you agree to our{' '}
              <a href="#" className="font-medium text-primary hover:text-primary/80">
                Terms
              </a>{' '}
              and{' '}
              <a href="#" className="font-medium text-primary hover:text-primary/80">
                Privacy Policy
              </a>.
            </div>
          </form>
        )}

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-light"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-text-light-body">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div>
              <a
                href="#"
                className="w-full inline-flex justify-center py-2.5 px-4 border border-border-light rounded-md shadow-sm bg-white text-sm font-medium text-text-light-body hover:bg-gray-50 transition-colors"
              >
                <span className="sr-only">Continue with Google</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                  <path d="M1 1h22v22H1z" fill="none"></path>
                </svg>
              </a>
            </div>
            <div>
              <a
                href="#"
                className="w-full inline-flex justify-center py-2.5 px-4 border border-border-light rounded-md shadow-sm bg-white text-sm font-medium text-text-light-body hover:bg-gray-50 transition-colors"
              >
                <span className="sr-only">Continue with Apple</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.016 6.435c-.99 0-2.115.545-2.842 1.533-.91.989-1.585 2.578-1.585 4.144 0 3.25 2.455 4.314 4.886 4.314 1.012 0 2.21-.567 2.918-1.511.868-.989 1.458-2.6 1.458-4.144s-2.193-4.336-4.835-4.336zm2.39 8.257c-.524.89-1.284 1.716-2.39 1.716-1.104 0-1.842-.804-2.368-1.694-.758-1.268-1.2-2.936-1.2-4.502 0-2.31.954-3.614 2.413-3.614 1.104 0 1.841.804 2.346 1.672.69.967 1.137 2.76.049 4.422z"></path>
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
