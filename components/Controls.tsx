import React, { useState } from 'react';
import { Settings, Type, Minus, Plus, Moon, Sun, Coffee, Ghost } from 'lucide-react';
import { Theme, ReaderSettings } from '../types';
import { THEMES, MIN_FONT_SIZE, MAX_FONT_SIZE } from '../constants';

interface ControlsProps {
  settings: ReaderSettings;
  onUpdate: (newSettings: ReaderSettings) => void;
}

export const Controls: React.FC<ControlsProps> = ({ settings, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const themeIcon = {
    [Theme.Light]: <Sun size={18} />,
    [Theme.Sepia]: <Coffee size={18} />,
    [Theme.Dark]: <Moon size={18} />,
    [Theme.Midnight]: <Ghost size={18} />,
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {isOpen && (
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-2xl rounded-2xl p-4 w-72 border border-gray-200 dark:border-gray-700 animate-in slide-in-from-bottom-5 fade-in duration-200">
            {/* Font Size */}
            <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Typography</span>
                    <span className="text-xs text-gray-400">{settings.fontSize}px</span>
                </div>
                <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                    <button 
                        onClick={() => onUpdate({...settings, fontSize: Math.max(MIN_FONT_SIZE, settings.fontSize - 2)})}
                        className="flex-1 p-2 hover:bg-white dark:hover:bg-gray-600 rounded-md shadow-sm transition-all disabled:opacity-50"
                        disabled={settings.fontSize <= MIN_FONT_SIZE}
                    >
                        <Minus size={16} className="mx-auto text-gray-600 dark:text-gray-300"/>
                    </button>
                    <span className="font-serif text-lg text-gray-700 dark:text-gray-200">Aa</span>
                    <button 
                        onClick={() => onUpdate({...settings, fontSize: Math.min(MAX_FONT_SIZE, settings.fontSize + 2)})}
                        className="flex-1 p-2 hover:bg-white dark:hover:bg-gray-600 rounded-md shadow-sm transition-all disabled:opacity-50"
                        disabled={settings.fontSize >= MAX_FONT_SIZE}
                    >
                        <Plus size={16} className="mx-auto text-gray-600 dark:text-gray-300"/>
                    </button>
                </div>
            </div>

            {/* Themes */}
            <div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Theme</span>
                <div className="grid grid-cols-4 gap-2">
                    {Object.values(Theme).map((t) => (
                        <button
                            key={t}
                            onClick={() => onUpdate({...settings, theme: t})}
                            className={`h-10 rounded-lg border-2 flex items-center justify-center transition-all ${
                                settings.theme === t 
                                    ? 'border-indigo-500 scale-105 shadow-md' 
                                    : 'border-transparent hover:scale-105'
                            } ${
                                t === Theme.Light ? 'bg-white text-gray-800' :
                                t === Theme.Sepia ? 'bg-[#f4ecd8] text-[#5b4636]' :
                                t === Theme.Dark ? 'bg-gray-900 text-gray-300' :
                                'bg-black text-gray-400'
                            }`}
                            title={t}
                        >
                           {themeIcon[t]}
                        </button>
                    ))}
                </div>
            </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-xl transition-all duration-300 ${
            isOpen 
            ? 'bg-indigo-600 text-white rotate-90' 
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:scale-110'
        }`}
      >
        {isOpen ? <Settings size={24} /> : <Type size={24} />}
      </button>
    </div>
  );
};
