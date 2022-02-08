<template>
  <div class="m-1">
    <ul class="list-group list-group-horizontal">
      <li
        v-for="option in showMenuOptions"
        :key="option.optionKey"
        class="list-group-item flex-fill text-center entity-navbar-option"
        :class="activeOption == option.optionKey ? 'entity-navbar-option-selected' : 'purple-text'"
        @click="selectOption(option.optionKey, option.action)">
        <font-awesome-icon
          :icon="[option.iconPrefix, option.iconName]"
          class="icon-size-1-5" />
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: "EntityNavBar",

  props: {
    urlEntityType: { type: String, required: true },
    entityId: { type: String, required: true },
    authorisation: { type: String, required: true }
  },

  data () {
    return {
      activeOption: '',
      showMenuOptions: [],
      allMenuOptions: [
        {
          optionKey: 'home',
          iconPrefix: 'fas',
          iconName: 'home',
          action: {
            modal: null,
            route: null
          },
          authorisation: null
        },
        {
          optionKey: 'details',
          iconPrefix: 'fas',
          iconName: 'info-circle',
          action: {
            modal: null,
            route: 'details'
          },
          authorisation: null
        },
        {
          optionKey: 'members',
          iconPrefix: 'fas',
          iconName: 'users',
          action: {
            modal: null,
            route: 'members'
          },
          authorisation: null
        },
        {
          optionKey: 'events',
          iconPrefix: 'far',
          iconName: 'calendar-alt',
          action: {
            modal: null,
            route: null
          },
          authorisation: null
        },
        {
          optionKey: 'edit',
          iconPrefix: 'fas',
          iconName: 'edit',
          action: {
            modal: 'groupEditModal',
            route: null
          },
          authorisation: ['owner', 'admin']
        },
        {
          optionKey: 'settings',
          iconPrefix: 'fas',
          iconName: 'cog',
          action: {
            modal: null,
            route: 'settings'
          },
          authorisation: ['owner', 'admin']
        }
      ]
    }
  },

  watch: {
    entityId: {
      immediate: true,
      handler (newVal, oldVal) {
        this.showMenuOptions = []
        this.allMenuOptions.forEach(option => {
          if (option.authorisation === null) {
            this.showMenuOptions.push(option)
          } else {
            if (option.authorisation.includes(this.authorisation)) {
              this.showMenuOptions.push(option)
            }
          }
        })
      }
    }
  },

  methods: {
    selectOption (option, action) {
      if (action.route !== null) {
        this.activeOption = option
        this.$router.push('/' + this.urlEntityType + '/' + this.entityId + '/' + action.route)
      } else {
        this.eventBus.emit('open-modal', action.modal)
      }
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
.icon-size-1-5 {
  font-size: 1.5em;
}
.entity-navbar-option:hover {
  color: var(--bs-light);
  background: var(--bs-purple);
  border-radius: 10px;
}
.entity-navbar-option-selected {
  color: var(--bs-light);
  background: var(--bs-purple);
  border-radius: 10px;
}
</style>
