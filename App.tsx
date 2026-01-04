import React, { useState } from 'react';
import { Reader } from './components/Reader';
import { InputArea } from './components/InputArea';
import { Controls } from './components/Controls';
import { ReaderState, ReaderSettings, Theme } from './types';
import { DEFAULT_CONTENT } from './constants';

const App: React.FC = () => {
  const [appState, setAppState] = useState<ReaderState>(ReaderState.Input);
  const [bookData, setBookData] = useState({ title: '', content: DEFAULT_CONTENT });
  const [settings, setSettings] = useState<ReaderSettings>({
    theme: Theme.Light,
    fontSize: 20,
    lineHeight: 1.8,
  });

  const handleStartReading = (content: string, title: string = "Untitled") => {
    setBookData({ title, content });
    setAppState(ReaderState.Reading);
  };

  const handleExitReader = () => {
    setAppState(ReaderState.Input);
  };

  return (
    <>
      {appState === ReaderState.Input && (
        <InputArea 
            onStartReading={handleStartReading} 
            initialText={bookData.content !== DEFAULT_CONTENT ? bookData.content : ''}
        />
      )}

      {appState === ReaderState.Reading && (
        <>
          <Reader
            content={bookData.content}
            title={bookData.title}
            settings={settings}
            onExit={handleExitReader}
          />
          <Controls settings={settings} onUpdate={setSettings} />
        </>
      )}
    </>
  );
};

export default App;
