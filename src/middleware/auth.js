/* eslint-disable */
export default function auth ({ to, next, store }) {
  const loginQuery = { path: "/auth/login", query: { redirect: to.fullPath } }
  const NoEmailVerificationQuery = { path: "/auth/no-email-verification", query: { redirect: to.fullPath } }
  if (!store.getters["auth/authUser"]) {
    store.dispatch("auth/getAuthUser").then(() => {
      if (!store.getters["auth/authUser"]) { 
        next (loginQuery) 
      } else if (store.getters["auth/userEmailVerified"] == false) {
        next (NoEmailVerificationQuery) 
      } else {
        next ()
      }
    })
  } else {
    console.log(store.getters["auth/userEmailVerified"])
    if (store.getters["auth/userEmailVerified"] == false) {
      console.log('switch to no email view')
      next (NoEmailVerificationQuery) 
    } else {
      console.log('continue to view')
      next ()
    }
  }
}
