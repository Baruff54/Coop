<script setup>
import {useSessionStore} from '@/stores/session.js'
import {useUserStore} from '@/stores/user.js'
import Navbar from '@/components/Navbar.vue'
import Conversation from '@/components/Conversation.vue'
import {ref} from "vue";
import {useRouter} from 'vue-router';
const router = useRouter();

const userStore = new useUserStore();
const sessionStore = new useSessionStore();

let listeConv = ref([]);

onMounted(() => {

    if(!userStore.isConnected) {
        router.push('/signin');
    }
    if(sessionStore.isValid())
    {
        api.get('channels?token='+sessionStore.data.token).then(response => {
            listeConv.value = response;
        });
    }
    
});
</script>

<template>
    
    <Navbar/>
    <h1>Liste des Conversations</h1>

    <p class="subtitle">
      <router-link to="/newConversation">Créer une nouvelle conversation</router-link>
    </p>

    <Conversation v-for="uneConv in listeConv" :c="uneConv"/>
</template>