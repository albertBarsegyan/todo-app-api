export default function excludeKeysFromObject(object: any, keys: any[]) {
  return Object.entries(object).reduce((acc, [key, value]) => {
    if (!keys.includes(key)) {
      acc[key] = value;
    }
    return acc;
  }, {} as any);
}
