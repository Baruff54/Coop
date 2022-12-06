<script setup>
    import {useSessionStore} from '@/stores/session.js'
    import Navbar from '@/components/Navbar.vue'
    import Conversation from '@/components/Conversation.vue'
    import {ref} from "vue";
    import {useRouter} from 'vue-router';

    const sessionStore = new useSessionStore();

    let listeConv = ref([]);

    onMounted(() => {
        api.get('channels?token='+sessionStore.data.token).then(response => {
            listeConv.value = response;
            console.log(response);
        });
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