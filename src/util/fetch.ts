import { createFetch } from "@vueuse/core";
import { getToken } from "./index";

import { API_PREFIX as BASE_URL } from '/@@/constant'
// const BASE_URL = '/api'

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

export default useMyFetch