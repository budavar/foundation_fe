<template>
  <div class="col-12">
    <div class="text-center mb-4">
      <h4>User Management</h4>
    </div>
    <div class="row">
      <div class="col-6">
        <div v-for="user in applicationUsers" :key="user.id">
          <PersonLine class="mb-2" :person="user"/>
        </div>
      </div>
      <div class="col-6">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>

import PersonLine from '@/components/PersonLine'

export default {
  name: "UserManagement",

  components: {
    PersonLine
  },

  data () {
    return {
      applicationUsers: [
        {
          id: 1,
          name: 'Brian Maguire',
          avatar: null
        },
        {
          id: 1,
          name: 'Eva Gal',
          avatar: null
        }
      ]
    }
  }
}
</script>
