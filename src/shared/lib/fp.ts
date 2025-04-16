export const filterObjectKeys = <T extends object, K extends keyof T>(
  object: T,
): K[] => (Object.keys(object) as K[]).filter((key) => !!object[key]);
