declare const process: {
  env: Record<string, string | undefined>;
};

declare const console: {
  error(...args: unknown[]): void;
  log(...args: unknown[]): void;
};

declare function fetch(
  input: string,
  init?: { method?: string; headers?: Record<string, string>; body?: string }
): Promise<{ ok: boolean; status: number; text(): Promise<string>; json(): Promise<unknown> }>;
