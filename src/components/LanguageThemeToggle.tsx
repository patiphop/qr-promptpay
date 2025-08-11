import React from 'react';
import { Language } from '../types';
import { getTranslation } from '../lib/translations';

interface LanguageThemeToggleProps {
    currentLanguage: Language;
    onLanguageChange: (lang: Language) => void;
    currentTheme: 'dark' | 'light';
    onThemeChange: (theme: 'dark' | 'light') => void;
}

const LanguageThemeToggle: React.FC<LanguageThemeToggleProps> = ({
    currentLanguage,
    onLanguageChange,
    currentTheme,
    onThemeChange
}) => {
    return (
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 lg:top-6 lg:right-6 flex items-center space-x-1 sm:space-x-2 lg:space-x-3 z-50">
            {/* Language Toggle */}
            <div className="relative group">
                <button
                    className="flex items-center space-x-1 px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all duration-300 group-hover:scale-105 shadow-lg hover:shadow-xl"
                    onClick={() => onLanguageChange(currentLanguage === 'th' ? 'en' : 'th')}
                >
                    <span className="text-sm sm:text-base lg:text-lg">
                        {currentLanguage === 'th' ? '🇹🇭' : '🇺🇸'}
                    </span>
                    <span className="font-medium text-xs hidden lg:block ml-1">
                        {currentLanguage === 'th' ? 'TH' : 'EN'}
                    </span>
                    <svg 
                        className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:rotate-180 hidden sm:block" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                
                {/* Tooltip */}
                <div className="absolute top-full right-0 mt-1 sm:mt-2 px-2 py-1 sm:px-3 sm:py-2 bg-black/80 backdrop-blur-xl border border-white/20 rounded-lg text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
                    {getTranslation(currentLanguage, 'language')}
                </div>
            </div>

            {/* Theme Toggle */}
            <div className="relative group">
                <button
                    className="flex items-center space-x-1 px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 lg:py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all duration-300 group-hover:scale-105 shadow-lg hover:shadow-xl"
                    onClick={() => onThemeChange(currentTheme === 'dark' ? 'light' : 'dark')}
                >
                    <span className="text-sm sm:text-base lg:text-lg">
                        {currentTheme === 'dark' ? '🌙' : '☀️'}
                    </span>
                    <span className="font-medium text-xs hidden lg:block ml-1">
                        {currentTheme === 'dark' ? 'Dark' : 'Light'}
                    </span>
                    <svg 
                        className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:rotate-180 hidden sm:block" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                
                {/* Tooltip */}
                <div className="absolute top-full right-0 mt-1 sm:mt-2 px-2 py-1 sm:px-3 sm:py-2 bg-black/80 backdrop-blur-xl border border-white/20 rounded-lg text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
                    {getTranslation(currentLanguage, 'theme')}
                </div>
            </div>
        </div>
    );
};

export default LanguageThemeToggle;
