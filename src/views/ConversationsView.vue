<script setup>
import {useSessionStore} from '@/stores/session.js'
import {useUserStore} from '@/stores/user.js'
import {useRouter} from 'vue-router';
const userStore = new useUserStore();
const sessionStore = new useSessionStore();
const router = useRouter();


function deconnexion() {

    let token = {
        "token": sessionStore.data.token
    }
    
    api.delete('members/signout', {
        body: token
    }).then(response => {
        if(response.message === 'Utilisateur déconnecté')
        {
            localStorage.removeItem('session');
            userStore.disconnect();
            router.push('/signin');
        }
        else
        {
            alert(response.message);
        }
        
    })
    
}
</script>
<template>

</template>