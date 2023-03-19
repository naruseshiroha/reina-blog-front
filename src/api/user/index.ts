import { UserLoginBO, UserRegisterBO } from './../types/index';
import useMyFetch from "/@/util/fetch";

export async function fetchVerifyCode(username: string, isRegister: boolean = true) {
    return await useMyFetch(`/user/code?username=${username}&isRegister=${isRegister}`);
}

export async function fetchLogin(bo: UserLoginBO) {
    return await useMyFetch(`/user/login`, {
        body: JSON.stringify(bo),
        headers: {
            'Content-Type': 'application/json'
        }
    }).post().json()
}

export async function fetchRegister(bo: UserRegisterBO) {
    return await useMyFetch(`/user/register`, {
        body: JSON.stringify(bo),
        headers: {
            'Content-Type': 'application/json'
        }
    }).post().json()
}

export async function fetchUserInfo(id: string) {
    return await useMyFetch(`/user/${id}`).get().json()
}