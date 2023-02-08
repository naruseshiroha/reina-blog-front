import { defineStore } from 'pinia';
import { fetchVerifyCode } from '/@/api/user';

interface IUserState {
  nickName: string;
  avatar: string;
  verifyCode: string;
  token: string;
}

// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useUserStore = defineStore('userStore', {
  // other options...
  state: (): IUserState => ({
    nickName: '',
    avatar: '',
    verifyCode: '',
    token: '',
  }),
  getters: {
    getNickName(): string {
      return this.nickName;
    },
    getAvatar(): string {
      return this.avatar;
    },
    getVerifyCode(): string {
      return this.verifyCode;
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
    setVerifyCode(verifyCode: string) {
      this.verifyCode = verifyCode;
    },
    setToken(token: string) {
      this.token = token;
    },
    // api
    async getVerifyCode(email: string) {
      const { data: code } = await fetchVerifyCode(email);
      // if (code) this.setVerifyCode(code);
      if (code) this.setVerifyCode("code");
    },
  },
});
