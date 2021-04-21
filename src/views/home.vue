<template>
  <div class="wrapper">
    {{ welcome }}
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  setup() {
    return {
       welcome : ref('welcome')
    }
  }
}
</script>
<style lang="scss">
.wrapper {
}
</style>