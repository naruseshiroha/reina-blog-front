import { useFetch } from "@vueuse/core";

export async function fetchVerifyCode(email: string) {
    const res = await useFetch(`/api/user/code?email=${email}`);
    console.log('res', res);
    return res
}