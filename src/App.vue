<script setup>
import { RouterView } from 'vue-router'

import { provide } from 'vue'
import mitt from 'mitt'

const bus = mitt();
provide('bus', bus);

</script>

<template>
  <div id="wrapper"><RouterView /></div>
</template>
