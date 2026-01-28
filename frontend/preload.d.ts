export {};

declare global {
  interface Window {
    api: {
      openNewPage: (filename: string) => void;
    },
    api2: {
      close(): unknown;
    };
  }
}