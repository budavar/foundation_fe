<template>

  <div ref="sideBarNav" class="offcanvas offcanvas-start bg-light" tabindex="-1" id="sideBarNavID" aria-labelledby="sideBarNavLabel" style="width: 300px;">
    <div class="m-3">
      <div class="d-flex justify-content-center pb-3">
        <div>
          <Avatar
            :username="authUser.name"
            :src="authUser.avatar == null ? null : avatarLocation + authUser.avatar"
            :rounded="authUser.avatar == null ? true : false"
            :size=100>
          </Avatar>
        </div>
      </div>
      <div class="text-center">
        <h5>{{authUser.name}}</h5>
        <h6>{{authUser.email}}</h6>
      </div>
      <hr class="m-0"/>
    </div>
    <div class="offcanvas-body">
      <div class="purple-text">
        <ul class="nav nav-pills flex-column mb-auto">
          <li v-for="option in menuOptions" class="nav-item m-1" :key="option.optionKey">
            <div
              v-if="option.route != null" class="p-1 ps-3 sidebar-option"
              :class="activeOption == option.optionKey ? 'sidebar-option-selected' : ''"
              @click="selectOption(option.optionKey, option.route)">
              <div class="d-flex align-items-center">
                <font-awesome-icon
                  :icon="[option.iconPrefix, option.iconName]"
                  class="me-2 fa-2x" />
                <p class="m-0 p-0">{{option.label}}</p>
              </div>
            </div>
            <div v-else :class="option.open ? 'sidebar-option-subgroup-header' : ''">
              <div class="p-1 ps-3 sidebar-option" @click="option.open = !option.open">
                <div class="d-flex align-items-center" >
                  <font-awesome-icon
                    :icon="[option.iconPrefix, option.iconName]"
                    class="me-2 fa-2x"
                    />
                  <p class="m-0 p-0">
                    {{option.label}}
                  </p>
                  <span class="flex-grow-1 text-end">
                    <font-awesome-icon icon="caret-down" />
                  </span>
                </div>
              </div>
              <div v-show="option.open">
                <hr class="m-0"/>
                <ul class="nav nav-pills flex-column mb-auto sidebar-option-subgroup">
                  <li v-for="subOption in option.subOptions" class="nav-item " :key="subOption.optionKey">
                    <div
                      class="p-1 ps-3 sidebar-option p-2"
                      :class="activeOption == subOption.optionKey ? 'sidebar-option-selected' : ''"
                      @click="selectOption(subOption.optionKey, subOption.route)">
                      <div class="d-flex align-items-center">
                        <font-awesome-icon :icon="[subOption.iconPrefix, subOption.iconName]" class="me-2" />
                        <p class="m-0 p-0">{{subOption.label}}
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from "vuex"
import Avatar from '@/components/Avatar'
import { fileLocations } from "@/config/BaseConfig"

export default {
  name: "SideNavBar",

  components: {
    Avatar
  },

  data () {
    return {
      avatarLocation: fileLocations.avatars,
      activeOption: '',
      menuOptions: [
        {
          label: 'Home',
          optionKey: 'home',
          iconPrefix: 'fas',
          iconName: 'home',
          route: '',
          subOptions: null
        },
        {
          label: 'Admin',
          optionKey: 'admin',
          iconPrefix: 'fas',
          iconName: 'tools',
          route: null,
          open: false,
          subOptions: [
            {
              label: 'Users',
              optionKey: 'admin.users',
              iconPrefix: 'fas',
              iconName: 'users',
              route: '/admin/user-management'
            },
            {
              label: 'Accounts',
              optionKey: 'admin.accounts',
              iconPrefix: 'fas',
              iconName: 'building',
              route: ''
            }
          ]
        },
        {
          label: 'Friends',
          optionKey: 'friends',
          iconPrefix: 'fas',
          iconName: 'user-friends',
          route: '/friends',
          subOptions: null
        },
        {
          label: 'Groups',
          optionKey: 'groups',
          iconPrefix: 'fas',
          iconName: 'users',
          route: null,
          open: false,
          subOptions: [
            {
              label: 'Create New',
              optionKey: 'group.create',
              iconPrefix: 'fas',
              iconName: 'users',
              route: '/groups/'
            },
            {
              label: 'My Groups',
              optionKey: 'groups.myGroups',
              iconPrefix: 'fas',
              iconName: 'users',
              route: ''
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapGetters("auth", ["authUser"])
  },
  methods: {
    selectOption (option, route) {
      this.activeOption = option
      this.$router.push(route)
      this.$emit('hide-sidebar')
    }
  }
}
</script>

<style scoped>
.center-avatar {
  margin: auto;
}
.purple-text {
  color: var(--bs-purple);
}
.sidebar-option:hover {
  color: var(--bs-light);
  background: var(--bs-purple);
  border-radius: 10px;
}
.sidebar-option-selected {
  color: var(--bs-light);
  background: var(--bs-purple);
  border-radius: 10px;
}
.sidebar-option-subgroup-header {
  color: var(--bs-purple);
  background: #d2beeb;
  border-radius: 10px 10px 0px 0px;
}
.sidebar-option-subgroup {
  color: var(--bs-purple);
  background: #e9def5;
  border-radius: 0px 0px 10px 10px;
}
</style>
