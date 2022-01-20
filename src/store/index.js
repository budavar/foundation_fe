import { createStore } from 'vuex'

import * as auth from "@/store/modules/Auth"
import * as user from "@/store/modules/User"
import * as friend from "@/store/modules/Friend"
import * as group from "@/store/modules/Group"

export default createStore({
  modules: {
    auth,
    user,
    friend,
    group
  }
})
