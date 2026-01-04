export enum Theme {
  Light = 'Light',
  Sepia = 'Sepia',
  Dark = 'Dark',
  Midnight = 'Midnight',
}

export enum ReaderState {
  Input = 'Input',
  Reading = 'Reading',
}

export interface ReaderSettings {
  theme: Theme;
  fontSize: number; // in pixels (base)
  lineHeight: number;
}

export interface BookData {
  title: string;
  content: string;
  totalPages: number;
  currentPage: number;
}
