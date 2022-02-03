import { createRouter, createWebHistory } from 'vue-router'

import store from "@/store/index"
import auth from "../middleware/auth"
// import admin from "../middleware/admin"
import guest from "../middleware/guest"
import middlewarePipeline from "@/router/middlewarePipeline"

const WebLayoutAuth = () => import('../layouts/WebLayoutAuth')
const WebLayoutUser = () => import('../layouts/WebLayoutUser')
const WebLayoutGuest = () => import('../layouts/WebLayoutGuest')

// Authentication Routes
const Login = () => import('../views/Auth/Login')
const Register = () => import('../views/Auth/Register')
const AfterRegister = () => import('../views/Auth/AfterRegister')
const NoEmailVerification = () => import('../views/Auth/NoEmailVerification')
const ForgotPassword = () => import('../views/Auth/ForgotPassword')

// Profile Management Routes
const MyProfileManagement = () => import('../views/ProfileManagement/MyProfile')

// Admin Management Routes
const UserManagement = () => import('../views/Users/UserManagement')

// Friend Management Routes
const FriendManager = () => import('../views/Friends/FriendManager')
const FriendSearch = () => import('../views/Friends/FriendSearch')

// Group Management Routes
const NewGroup = () => import('../views/Groups/NewGroup')
const GroupList = () => import('../views/Groups/GroupList')
const GroupLayout = () => import('../views/Groups/GroupLayout')
const GroupLayoutDetails = () => import('../views/Groups/GroupLayouts/GroupDetails')
const GroupLayoutMembers = () => import('../views/Groups/GroupLayouts/GroupMembers')
const GroupLayoutAddMembers = () => import('../views/Groups/GroupLayouts/GroupAddMembers')

const AdminChildRoute = (prop) => [
  {
    path: '/admin/user-management',
    name: prop + '.userManagement',
    meta: { middleware: [auth], name: 'userManagement' },
    component: UserManagement
  }
]

const AuthChildRoute = (prop) => [
  {
    path: '/auth/login',
    name: prop + '.login',
    meta: { middleware: [guest], name: 'login' },
    component: Login
  },
  {
    path: '/auth/register',
    name: prop + '.register',
    meta: { middleware: [guest], name: 'register' },
    component: Register
  },
  {
    path: '/auth/after-register',
    name: prop + '.afterRegister',
    meta: { middleware: [guest], name: 'afterRegister' },
    component: AfterRegister
  },
  {
    path: '/auth/no-email-verification',
    name: prop + '.noEmailVerification',
    meta: { name: 'noEmailVerification' },
    component: NoEmailVerification
  },
  {
    path: '/auth/forgot-password',
    name: prop + '.forgotPassword',
    meta: { middleware: [guest], name: 'forgotPassword' },
    component: ForgotPassword
  }
]

const ProfilesChildRoute = (prop) => [
  {
    path: '/profiles/my-profile',
    name: prop + '.myProfile',
    meta: { middleware: [auth], name: 'myProfile' },
    component: MyProfileManagement
  }
]

const FriendsChildRoute = (prop) => [
  {
    path: '/friends/',
    name: prop + '.myFriends',
    meta: { middleware: [auth], name: 'myFriends' },
    component: FriendManager
  },
  {
    path: '/friends/search',
    name: prop + '.search',
    meta: { middleware: [auth], name: 'search' },
    component: FriendSearch
  }
]

const GroupsChildRoute = (prop) => [
  {
    path: '/groups/create',
    name: prop + '.create',
    meta: { middleware: [auth], name: 'create' },
    component: NewGroup
  },
  {
    path: '/groups/:groupId',
    name: prop + '.control',
    props: true,
    meta: { middleware: [auth], name: 'control' },
    component: GroupLayout,
    children: GroupLayoutChildRoute(prop + '.control')
  },
  {
    path: '/groups/',
    name: prop + '.myGroups',
    meta: { middleware: [auth], name: 'myGroups' },
    component: GroupList
  }
]

const GroupLayoutChildRoute = (prop) => [
  {
    path: '/groups/:groupId/details/',
    name: prop + '.details',
    meta: { middleware: [auth], name: 'details' },
    component: GroupLayoutDetails
  },
  {
    path: '/groups/:groupId/members/',
    name: prop + '.members',
    meta: { middleware: [auth], name: 'members' },
    component: GroupLayoutMembers
  },
  {
    path: '/groups/:groupId/add-members/',
    name: prop + '.addMembers',
    meta: { middleware: [auth], name: 'addMembers' },
    component: GroupLayoutAddMembers
  }
]

const routes = [
  {
    path: "/",
    name: "home",
    meta: { middleware: [guest] },
    component: WebLayoutGuest
  },
  {
    path: '/admin',
    name: 'admin',
    component: WebLayoutUser,
    children: AdminChildRoute('admin')
  },
  {
    path: '/auth',
    name: 'auth',
    component: WebLayoutAuth,
    children: AuthChildRoute('auth')
  },
  {
    path: "/dashboard",
    name: "dashboard",
    meta: { middleware: [auth] },
    component: WebLayoutUser
  },
  {
    path: '/profiles',
    name: 'profiles',
    component: WebLayoutUser,
    children: ProfilesChildRoute('profiles')
  },
  {
    path: '/friends',
    name: 'friends',
    component: WebLayoutUser,
    children: FriendsChildRoute('friends')
  },
  {
    path: '/groups',
    name: 'groups',
    component: WebLayoutUser,
    children: GroupsChildRoute('groups')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  const middleware = to.meta.middleware
  const context = { to, from, next, store }
  if (!middleware) {
    return next()
  }

  middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

export default router
