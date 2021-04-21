<template>
  <div class="wrapper">
    <router-view />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  name: "App",

  setup() {
    return {
      name: ref('app')
    };
  },
};
</script>