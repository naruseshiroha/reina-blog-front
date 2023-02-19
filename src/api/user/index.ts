import useMyFetch from "/@/util/fetch";

export async function fetchVerifyCode(email: string) {
    return await useMyFetch(`/user/code?email=${email}`);
}