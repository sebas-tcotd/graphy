export const assert = (condition: unknown, message: string) => {
  if (!condition) throw new Error(message);
};
