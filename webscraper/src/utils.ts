function countLineBreaks(str: string) {
 const regex = /\r\n|\r|\n/g;
 const matches = str.match(regex);
 return matches ? matches.length : 0;
}
function size(bytes: number) {
 const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
 if (bytes === 0) return '0 Byte';
 const i = Math.floor(Math.log(bytes) / Math.log(1024));
 return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
}
function parseUrl(src: string, origin: string) {
 if (!src || src === '/') return;
 if (src.startsWith('//')) {
  return `https:${src}`;
 } else if (src.startsWith('/')) {
  return origin + src;
 } else if (src.startsWith('http')) {
  return src;
 }
 return `${origin}/${src}`;
}

export { size, countLineBreaks, parseUrl };
