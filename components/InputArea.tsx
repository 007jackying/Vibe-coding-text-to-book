import React, { useState } from 'react';
import { BookOpen, Sparkles, PenTool, Loader2 } from 'lucide-react';
import { polishText, generateStory } from '../services/geminiService';

interface InputAreaProps {
  onStartReading: (text: string, title?: string) => void;
  initialText: string;
}

export const InputArea: React.FC<InputAreaProps> = ({ onStartReading, initialText }) => {
  const [text, setText] = useState(initialText);
  const [isProcessing, setIsProcessing] = useState(false);
  const [storyPrompt, setStoryPrompt] = useState('');
  const [mode, setMode] = useState<'paste' | 'generate'>('paste');

  const handlePolishAndRead = async () => {
    if (!text.trim()) return;
    setIsProcessing(true);
    try {
      const polished = await polishText(text);
      onStartReading(polished, "Untitled Draft");
    } catch (error) {
      console.error("Failed to polish", error);
      onStartReading(text, "Untitled Draft");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGenerateStory = async () => {
    if (!storyPrompt.trim()) return;
    setIsProcessing(true);
    try {
      const result = await generateStory(storyPrompt);
      onStartReading(result.content, result.title);
    } catch (error) {
      console.error("Failed to generate", error);
      alert("Could not generate story. Please check API Key.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-6">
      <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl p-8 w-full max-w-3xl border border-white/50">
        <div className="text-center mb-8">
          <div className="bg-indigo-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transform -rotate-6">
            <BookOpen size={32} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2 font-serif tracking-tight">ZenReader</h1>
          <p className="text-gray-600">Distraction-free reading with AI superpowers</p>
        </div>

        {/* Mode Switcher */}
        <div className="flex bg-gray-100 p-1 rounded-xl mb-6 w-fit mx-auto">
          <button
            onClick={() => setMode('paste')}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === 'paste' 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Paste Text
          </button>
          <button
            onClick={() => setMode('generate')}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              mode === 'generate' 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Generate Story
          </button>
        </div>

        {mode === 'paste' ? (
          <div className="space-y-4">
            <textarea
              className="w-full h-64 p-4 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all resize-none font-serif text-gray-700 text-lg leading-relaxed outline-none"
              placeholder="Paste your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            
            <div className="flex gap-4">
              <button
                onClick={() => onStartReading(text, "Draft")}
                disabled={!text.trim() || isProcessing}
                className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl active:scale-95"
              >
                Read Immediately
              </button>
              <button
                onClick={handlePolishAndRead}
                disabled={!text.trim() || isProcessing}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95"
              >
                {isProcessing ? <Loader2 className="animate-spin" size={20}/> : <Sparkles size={20} />}
                Polish & Read
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
             <div className="relative">
                <input
                  type="text"
                  value={storyPrompt}
                  onChange={(e) => setStoryPrompt(e.target.value)}
                  placeholder="e.g., A sci-fi mystery on Mars in 2099"
                  className="w-full p-4 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-lg outline-none pr-12"
                  onKeyDown={(e) => e.key === 'Enter' && handleGenerateStory()}
                />
                <PenTool className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
             </div>
             <button
                onClick={handleGenerateStory}
                disabled={!storyPrompt.trim() || isProcessing}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-4 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95"
              >
                {isProcessing ? <Loader2 className="animate-spin" size={20}/> : <Sparkles size={20} />}
                Generate Magic Story
              </button>
              <p className="text-xs text-center text-gray-400 mt-2">
                Powered by Gemini 3 Flash Preview
              </p>
          </div>
        )}
      </div>
    </div>
  );
};
