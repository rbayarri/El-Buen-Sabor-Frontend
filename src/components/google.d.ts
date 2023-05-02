declare namespace google {
  namespace accounts {
    namespace id {
      function initialize(options: { client_id: string; callback: (response: any) => void }): void;
      function renderButton(element: Element | null, options: { theme?: string; size?: string; width?: number}): void;
      function prompt(): void;
    }
  }
}