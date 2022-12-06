<script setup>
import {useSessionStore} from '@/stores/session.js'
import {useUserStore} from '@/stores/user.js'
import {useRouter} from 'vue-router';
import Navbar from '@/components/Navbar.vue'
const sessionStore = new useSessionStore();
const userStore = new useUserStore();
const router = useRouter();

let member = ref({})

onMounted(() => {

    if(!userStore.isConnected) {
        router.push('/signin');
    }
    if(sessionStore.isValid())
    {
        const id = router.currentRoute.value.params.id;
        const token = sessionStore.data.token;
        api.get('members?token=' + token).then(response => {
            member.value = response.find(m => m.id === id);
            member.value.created_at = new Date(member.value.created_at).toLocaleDateString('fr-FR', {weekday: 'long',day: 'numeric', month: 'long', year: 'numeric'})
        })
        
    }

})
</script>

<template>
    <Navbar />
    <div class="container">
        <div class="test">
            <h1>{{member.fullname}}</h1>
            <p>Email : {{member.email}}</p>
            <p>Membre depuis le {{member.created_at}}</p>
        </div>
        
    </div>
</template>