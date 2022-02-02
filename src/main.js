import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import './assets/css/app.css'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import mitt from 'mitt'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faQuestionCircle, faCalendarAlt, faEnvelope, faEye, faEyeSlash, faTimesCircle, faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { faEdit, faBars, faCog, faUser, faUsers, faUserFriends, faSignInAlt, faSignOutAlt, faUserPlus, faKey, faHome, faBuilding, faTools, faCaretDown, faSearch, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faQuestionCircle, faCalendarAlt, faEdit, faBars, faCog, faUser, faUsers, faUserFriends, faSignInAlt, faSignOutAlt, faUserPlus, faEnvelope, faKey, faEye, faEyeSlash, faHome, faBuilding, faTools, faCaretDown, faTimesCircle, faSearch, faPlusCircle, faTrashAlt)

const eventBus = mitt()

const app = createApp(App).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon)

app.config.globalProperties.eventBus = eventBus

app.mount('#app')
