// app/components/auth/AuthenticationPage.tsx
'use client'
import React from 'react';
import { useLogin } from '@privy-io/react-auth';
import { Zap, Briefcase, Users, Shield, Wallet, Mail, Chrome, Smartphone, Twitter } from 'lucide-react';

export const AuthenticationPage: React.FC = () => {
  const { login } = useLogin({
    onComplete: ({ user, isNewUser, wasAlreadyAuthenticated, loginMethod, loginAccount }) => {
      console.log('🎉 User logged in!', { 
        user, 
        isNewUser, 
        wasAlreadyAuthenticated, 
        loginMethod, 
        loginAccount 
      });
      // Optional: Handle new user onboarding here
      if (isNewUser) {
        console.log('Welcome new user!');
      }
      if (wasAlreadyAuthenticated) {
        console.log('User was already authenticated');
      }
    },
    onError: (error) => {
      // Handle different types of errors gracefully
      // Convert error to string for comparison
      const errorString = String(error);
      
      if (errorString.includes('exited_auth_flow') || errorString.includes('user_closed_modal')) {
        console.log('👋 User closed authentication modal');
        // Don't show error for this - it's normal user behavior
        return;
      }
      
      if (errorString.includes('user_denied_permission') || errorString.includes('oauth_user_denied')) {
        console.log('🚫 User denied permission');
        // Show user-friendly message
        alert('Authentication was cancelled. Please try again when you\'re ready to continue.');
        return;
      }

      if (errorString.includes('network') || errorString.includes('connection')) {
        console.log('🌐 Network error');
        alert('Connection error. Please check your internet and try again.');
        return;
      }
      
      // For other errors, log and show generic message
      console.error('❌ Login error:', error);
      console.log('Error details:', { error, errorString });
      
      // Only show alert for actual errors, not user cancellations
      if (!errorString.includes('cancelled') && !errorString.includes('abort')) {
        alert('Authentication failed. Please try again.');
      }
    },
  });

  const features = [
    {
      icon: <Briefcase size={24} />,
      title: 'Browse Jobs',
      description: 'Discover opportunities from top companies in Web3, tech, and creative industries'
    },
    {
      icon: <Users size={24} />,
      title: 'Build Your Profile',
      description: 'Showcase your skills, experience, and projects to stand out to employers'
    },
    {
      icon: <Shield size={24} />,
      title: 'Secure & Private',
      description: 'Your data is protected with enterprise-grade security and Web3 authentication'
    }
  ];

  const loginMethods = [
    {
      method: 'email',
      icon: <Mail size={20} />,
      label: 'Continue with Email',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      method: 'sms',
      icon: <Smartphone size={20} />,
      label: 'Continue with SMS',
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      method: 'wallet',
      icon: <Wallet size={20} />,
      label: 'Connect Wallet',
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      method: 'google',
      icon: <Chrome size={20} />,
      label: 'Continue with Google',
      color: 'bg-red-600 hover:bg-red-700'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Side - Branding & Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-black p-12 flex-col justify-center">
        <div className="max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-lime-400 rounded-xl flex items-center justify-center">
              <Zap size={28} className="text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-lime-400">JobJuice</h1>
              <p className="text-slate-400 text-sm">Powered by Web3</p>
            </div>
          </div>

          {/* Tagline */}
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Your Gateway to the Future of Work
          </h2>
          <p className="text-slate-300 text-lg mb-12 leading-relaxed">
            Connect with innovative companies, showcase your skills, and find your dream job in Web3, tech, and creative industries.
          </p>

          {/* Features */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={`feature-${index}`} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-lime-400/20 text-lime-400 rounded-lg flex items-center justify-center flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                  <p className="text-slate-400 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Authentication */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 bg-lime-400 rounded-xl flex items-center justify-center">
              <Zap size={24} className="text-black" />
            </div>
            <h1 className="text-2xl font-bold text-lime-400">JobJuice</h1>
          </div>

          {/* Auth Card */}
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Welcome to JobJuice</h2>
              <p className="text-slate-400">Choose your preferred sign-in method</p>
            </div>

            {/* Quick Login Button */}
            <button
              onClick={() => login()}
              className="w-full py-4 bg-lime-500 hover:bg-lime-400 text-black font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 mb-6"
            >
              <Zap size={20} />
              Get Started with JobJuice
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-slate-900/50 text-slate-400">Or choose your preferred method</span>
              </div>
            </div>

            {/* Login Methods */}
            <div className="space-y-3">
              {loginMethods.map((method, index) => (
                <button
                  key={`login-${method.method}-${index}`}
                  onClick={() => login()}
                  className={`w-full py-3 px-4 ${method.color} text-white font-medium rounded-lg transition-all duration-200 hover:transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3`}
                >
                  {method.icon}
                  {method.label}
                </button>
              ))}
            </div>

            {/* Terms */}
            <p className="text-xs text-slate-500 text-center mt-6 leading-relaxed">
              By continuing, you agree to our{' '}
              <a href="/terms" className="text-lime-400 hover:text-lime-300 underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-lime-400 hover:text-lime-300 underline">
                Privacy Policy
              </a>
            </p>
          </div>

          {/* Benefits */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-green-400" />
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-lime-400" />
                <span>Fast</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-blue-400" />
                <span>Trusted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};