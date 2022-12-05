<script setup>
import {useSessionStore} from '@/stores/session.js'
import Membre from '@/components/Membre.vue'
import Navbar from '../components/Navbar.vue'
const sessionStore = new useSessionStore();

let members = ref([]);

onMounted(() => {
    api.get('members?token=' + sessionStore.data.token).then(response => {
        members.value = response;
    })

})
</script>

<template>
    <Navbar />
    <div class="container">
        <h1>Liste des membres</h1>
        <Membre v-for="member in members" :m="member"/>
    </div>
</template>