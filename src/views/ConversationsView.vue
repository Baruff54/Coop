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
    <div class="container">
        <h1>Liste des Conversations</h1>
        <p class="subtitle">
            <router-link to="/newConversation">Créer une nouvelle conversation</router-link>
        </p>
        <div class="conversations">
            <Conversation v-for="uneConv in listeConv" :c="uneConv"/>
        </div>
    </div>
    
</template>

<style scoped>

.container > .subtitle {
    margin-bottom: 5em;
    display: inline-block;
    background: #1d1d42;
    font-weight: bold;
    padding: 1em;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;  
}

.container > .subtitle > a {
    text-decoration: none;
    transition: color 0.3s ease-in-out;
}

.container > .subtitle > a:hover {
    color: #f77017;
}
.container > .conversations {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

@media screen and (max-width: 750px) {
    .container > .conversations {
        flex-direction: column;
        align-items: center;
    }

    .container > .subtitle {
        text-align: center;
        display: block;
        margin-right: 3em;
        margin-left: 3em;
    }
}

</style>