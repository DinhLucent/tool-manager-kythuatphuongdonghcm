export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  isPrototypeResponse?: boolean;
}

export interface DiagnosticTemplate {
  id: string;
  title: string;
  prompt: string;
  category: 'astm' | 'pinout' | 'error_code' | 'hydraulic';
}
