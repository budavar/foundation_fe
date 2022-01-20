<template>
  <div class="col-md-8 col-lg-6 col-xl-5 mt-5">
    <div class="text-center mb-4">
      <h4>Create New Group</h4>
    </div>
    <NewGroupForm class="p-3 bg-white" />
  </div>
</template>

<script>
import NewGroupForm from "@/forms/Group/NewGroupForm"

export default {
  name: "NewGroup",
  components: {
    NewGroupForm
  }
}
</script>
