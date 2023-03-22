import { ResetPasswordBO, UserLoginBO, UserRegisterBO, UserVO } from '/@/api/types/index';
import useMyFetch from "/@/util/fetch";

export async function fetchVerifyCode(username: string, isRegister: boolean = true) {
    return await useMyFetch(`/user/code?username=${username}&isRegister=${isRegister}`);
}

export async function fetchResetCode(email: string) {
    return await useMyFetch(`/user/reset?email=${email}`);
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

export async function fetchUpdateUserInfo(userInfo: UserVO) {
    return await useMyFetch(`/user`, {
        body: JSON.stringify(userInfo),
        headers: {
            'Content-Type': 'application/json'
        }
    }).put().json()
}

export async function fetchResetPassword(bo: ResetPasswordBO) {
    return await useMyFetch(`/user/resetPassword`, {
        body: JSON.stringify(bo),
        headers: {
            'Content-Type': 'application/json'
        }
    }).put().json()
}