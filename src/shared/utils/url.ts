export const removeFirstUrlSegment = (url: string): string => {
  const segments = url.split('/');
  segments.shift();
  return segments.join('/');
};
