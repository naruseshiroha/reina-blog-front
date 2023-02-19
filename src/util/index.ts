
const MIME = [
  'image/gif',
  'image/jpeg',
  'image/avif',
  'image/png',
  // 'image/svg+xml',
  'image/tiff',
  'image/vnd.wap.wbmp',
  'image/webp',
  // 'image/x-icon',
  'image/x-jng',
  'image/x-ms-bmp',
]


export function isImage(mime: string): boolean {
  return MIME.includes(mime)
}

export function getToken(): string {
  return "token";
}

export default { }