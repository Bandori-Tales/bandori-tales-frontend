const cache = new Map<string, Promise<HTMLImageElement>>();

export function createImageResource(src: string) {
  let promise = cache.get(src);
  if (!promise) {
    promise = loadImage(src);
    cache.set(src, promise);
  }
  return promise;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
  });
}
