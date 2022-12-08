<script setup>
import {useSessionStore} from '@/stores/session.js'
import {useUserStore} from '@/stores/user.js'
import {useRouter} from 'vue-router';
import Navbar from '@/components/Navbar.vue'
const sessionStore = new useSessionStore();
const userStore = new useUserStore();
const router = useRouter();

let data = reactive({
    member: {}
})

onMounted(() => {

    if(!userStore.isConnected) {
        router.push('/signin');
    }
    if(sessionStore.isValid())
    {
        const id = router.currentRoute.value.params.id;
        const token = sessionStore.data.token;
        api.get('members?token=' + token).then(response => {
            data.member = response.find(m => m.id === id);
            data.member.created_at = new Date(data.member.created_at).toLocaleDateString('fr-FR', {weekday: 'long',day: 'numeric', month: 'long', year: 'numeric'})
        })
        
    }

})
</script>

<template>
    <Navbar />
    <div class="container">
        <div class="test">
            <h1>{{data.member.fullname}}</h1>
            <p>Email : {{data.member.email}}</p>
            <p>Membre depuis le {{data.member.created_at}}</p>
        </div>
        
    </div>
</template>