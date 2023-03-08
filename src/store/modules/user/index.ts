import { UserRegisterBO } from '/@/api/types/index';
import { defineStore } from 'pinia';
import { UserLoginBO } from '/@/api/types';
import { fetchVerifyCode, fetchLogin, fetchRegister } from '/@/api/user';

interface IUserState {
  userId: string;
  nickName: string;
  avatar: string;
  token: string;
}

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
const useUserStore = defineStore('userStore', {
  // other options...
  state: (): IUserState => ({
    userId: '',
    nickName: '',
    avatar: '',
    token: '',
  }),
  getters: {
    getUserId(): string {
      return this.userId;
    },
    getNickName(): string {
      return this.nickName;
    },
    getAvatar(): string {
      return this.avatar;
    },
    getToken(): string {
      return this.token;
    },
  },
  actions: {
    patch(partial: Partial<IUserState>) {
      this.$patch(partial);
    },
    reset() {
      this.$reset();
    },
    setNickName(nickName: string) {
      this.nickName = nickName;
    },
    setAvatar(avatar: string) {
      this.avatar = avatar;
    },
    setToken(token: string) {
      this.token = token;
    },
    logout() {
      this.userId = ''
    },
    // api
    async fetchVerifyCode(email: string): Promise<string> {
      const { data: code } = await fetchVerifyCode(email);
      return (unref(code) as string)
    },
    async fetchLogin(bo: UserLoginBO) {
      const { data } = await fetchLogin(bo)
      const { data: userId, error, message } = unref(data)
      if (error) {
        return Error(message);
      } else {
        // @Todo: set userId
        this.userId = userId;
        return userId;
      }
    },
    async fetchRegister(bo: UserRegisterBO) {
      const { data } = await fetchRegister(bo);
      const { data: result, error, message } = unref(data)
      if (error) {
        return Error(message);
      } else {
        return result;
      }
    },
  },
});

export default useUserStore;
