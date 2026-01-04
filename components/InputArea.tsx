import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface InputAreaProps {
  onStartReading: (text: string, title?: string) => void;
  initialText: string;
}

export const InputArea: React.FC<InputAreaProps> = ({ onStartReading, initialText }) => {
  const [text, setText] = useState(initialText);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-6">
      <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl p-8 w-full max-w-3xl border border-white/50">
        <div className="text-center mb-8">
          <div className="bg-indigo-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transform -rotate-6">
            <BookOpen size={32} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2 font-serif tracking-tight">ZenReader</h1>
          <p className="text-gray-600">Distraction-free reading environment</p>
        </div>

        <div className="space-y-4">
          <textarea
            className="w-full h-64 p-4 rounded-xl border border-gray-200 bg-white/50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all resize-none font-serif text-gray-700 text-lg leading-relaxed outline-none"
            placeholder="Paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          
          <button
            onClick={() => onStartReading(text, "Draft")}
            disabled={!text.trim()}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl active:scale-95"
          >
            Start Reading
          </button>
        </div>
      </div>
    </div>
  );
};