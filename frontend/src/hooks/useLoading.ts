export function useLoading() {
  const ref = useRef(false);

  const run = async (fn: Function) => {
    if (ref.current) return;

    ref.current = true;
    try {
      return await fn();
    } finally {
      ref.current = false;
    }
  };

  return run;
}