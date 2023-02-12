import { createFetch } from "@vueuse/core"

const BASE_URL = "/api";

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

const useMyFetch = createFetch({
  baseUrl: BASE_URL,
  options: {
    async beforeFetch({ options }) {
      // const myToken = await getMyToken()
      const token = getToken();

      const reqHeaders = new Headers(options.headers);
      reqHeaders.set('Authorization', `Bearer ${token}`);
      if(!reqHeaders.get('User-Agent')) {
        const USER_AGENT = "";
        reqHeaders.set('User-Agent', USER_AGENT);
      }
      options.headers = reqHeaders;

      return { options }
    },
  },
  fetchOptions: {
    mode: 'cors'
  }
})

export default useMyFetch;