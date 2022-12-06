<script setup>
import {useSessionStore} from '@/stores/session.js'
import {useUserStore} from '@/stores/user.js'
import {useRouter} from 'vue-router';
import Membre from '@/components/Membre.vue'
import Navbar from '@/components/Navbar.vue'
const sessionStore = new useSessionStore();
const userStore = new useUserStore();
const router = useRouter();

let member = reactive({});

onMounted(() => {
    if(!userStore.isConnected) {
        router.push('/signin');
    }
    if(sessionStore.isValid())
    {
        api.get('members/' + $route.params.id + '?token=' + sessionStore.data.token).then(response => {
            console.log(response);
            // member = response;
        })
    }

})
</script>

<template>
    <Navbar />
    <div class="container">
        <h1>Profil de Test</h1>
        <!-- <Membre v-for="member in members" :m="member"/> -->
    </div>
</template>