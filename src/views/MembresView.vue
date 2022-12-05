<script setup>
import {useSessionStore} from '@/stores/session.js'
import {useUserStore} from '@/stores/user.js'
import {useRouter} from 'vue-router';
import Membre from '@/components/Membre.vue'
import Navbar from '@/components/Navbar.vue'
const sessionStore = new useSessionStore();
const userStore = new useUserStore();
const router = useRouter();

let members = ref([]);

onMounted(() => {
    if(!userStore.isConnected) {
        router.push('/signin');
    }
    if(sessionStore.isValid())
    {
        api.get('members?token=' + sessionStore.data.token).then(response => {
            members.value = response;
        })
    }
    

})
</script>

<template>
    <Navbar />
    <div class="container">
        <h1>Liste des membres</h1>
        <Membre v-for="member in members" :m="member"/>
    </div>
</template>