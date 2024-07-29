export default function fetchAbort(fn: any, timerMs?: number) {
  const controller = new AbortController();
  const signal = controller.signal;

  timerMs = timerMs || 3000;

  const timer = setTimeout(
    () => new Promise((resolve): void => resolve(controller.abort())),
    timerMs,
  );

  return async function (param?: string) {
    const result = await fn(param, signal);

    clearTimeout(timer);

    return result;
  };
}
