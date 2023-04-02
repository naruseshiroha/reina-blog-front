import { IPageQuery, IUserQueryBO, ResetPasswordBO, UserRegisterBO, UserVO } from '/@/api/types/index';
import { defineStore } from 'pinia';
import { UserLoginBO } from '/@/api/types';
import { fetchVerifyCode, fetchResetCode, fetchLogin, fetchRegister, fetchUserInfo, fetchUpdateUserInfo, fetchResetPassword } from '/@/api/user';
import { fetchAdminPageUser } from '/@/api/admin'

interface IUserState {
  userId: string;
  nickName: string;
  avatar: string;
  token: string;
  userInfo: UserVO | undefined;
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
    userInfo: undefined,
  }),
  persist: true,
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
    getUserInfo(): UserVO {
      return this.userInfo as UserVO;
    }
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
    setUserInfo(userInfo: UserVO) {
      this.userInfo = userInfo;
    },
    logout() {
      this.userId = ''
    },
    // api
    async fetchVerifyCode(email: string): Promise<string> {
      const { data: code } = await fetchVerifyCode(email);
      return (unref(code) as string)
    },
    async fetchResetCode(email: string): Promise<string> {
      const { data: code } = await fetchResetCode(email);
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
    async fetchUserInfo(id: string) {
      const { data } = await fetchUserInfo(id)
      this.setUserInfo(unref(data).data as UserVO)
    },
    async fetchUpdateUserInfo(userInfo: UserVO): Promise<boolean> {
      const { data } = await fetchUpdateUserInfo(userInfo).catch(err => err)
      return unref(data);
    },
    async fetchResetPassword(bo: ResetPasswordBO) {
      const  {data}  = await fetchResetPassword(bo).catch(err => err)
      return unref(data);
    },
    // admin api
    async fetchAdminPageUser(page: IPageQuery, bo: IUserQueryBO) {
      const { data } = await fetchAdminPageUser(page, bo)
      return unref(data).data
    }
  },
});

export default useUserStore;
