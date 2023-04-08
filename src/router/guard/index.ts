import router from '/@/router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useUserStore } from '/@/store'
import { createDiscreteApi } from 'naive-ui'

nProgress.configure({
  showSpinner: false
})

// 全局前置守卫
router.beforeEach((to, _from) => {
  nProgress.start()

  const userStore = useUserStore();
  const { userInfo } = storeToRefs(userStore)

  console.log('userId', userInfo.value?.role);
  if (to.meta['requiresAuth'] && userInfo.value?.role !== 'ADMIN') {
    const { message } = createDiscreteApi(
      ['message',]
    )
    message.info('您的权限不够！')
    setTimeout(() => {
      router.go(-1)
    }, 800)
    return false
  }

  return true
})

// 全局后置钩子
router.afterEach((_to, _from) => {
  nProgress.done(true)
})
