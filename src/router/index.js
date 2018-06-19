import Vue from 'vue'
import Router from 'vue-router'
import Wallet from '@/components/Wallet'
import PXL from '@/components/admin/pxl/PXL'
import Whitelist from '@/components/admin/whitelist/Whitelist'
import Setting from '@/components/admin/setting/Setting'

Vue.use(Router)

const invailidPath = (to, name, addressKey) => {
  return to.name == name && !localStorage.getItem(addressKey)
}

const require = (to, from, next) => {
  const app = this.a.app;
  if (invailidPath(to, 'PXL', app.localStorageKey.PXLAddress) ||
    invailidPath(to, 'Whitelist', app.localStorageKey.whitelistAddress) ||
    invailidPath(to, 'Sale', app.localStorageKey.saleAddress)) {
    alert('Contract address 를 등록해주세요')
    return next({path: '/admin/setting'})
  } else {
    return next();
  }
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Wallet',
      component: Wallet
    },
    {
      path: '/admin',
      redirect: '/admin/pxl',
    },
    {
      path: '/admin/pxl',
      name: 'PXL',
      component: PXL,
      beforeEnter: require
    },
    {
      path: '/admin/whitelist',
      name: 'Whitelist',
      component: Whitelist,
      beforeEnter: require
    },
    {
      path: '/admin/setting',
      name: 'Setting',
      component: Setting
    }
  ]
})
