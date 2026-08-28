export type RuntimeType = 'node' | 'python' | 'go' | 'rust';

export interface CrashScenario {
  id: RuntimeType;
  label: string;
  command: string;
  errorTitle: string;
  errorMessage: string;
  errorLocation: string;
  codeSnippet?: {
    file: string;
    line: number;
    lines: { num: number; code: string; isError?: boolean }[];
  };
  scrubbedItems: { original: string; redacted: string; type: string }[];
  llmPacket: string;
}

export interface ToastMessage {
  id: string;
  text: string;
  type?: 'success' | 'info' | 'copied';
}
