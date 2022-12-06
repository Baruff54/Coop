<script setup>
import {useSessionStore} from '@/stores/session.js'
import {useUserStore} from '@/stores/user.js'
import {useRouter} from 'vue-router';
const userStore = new useUserStore();
const sessionStore = new useSessionStore();
const router = useRouter();


function deconnexion() {

    let token = sessionStore.data.token
    if(!userStore.isConnected) {
        router.push('/signin');
    }
    if(sessionStore.isValid())
    {
        api.delete('members/signout?token=' + token).then(response => {
            if(response.message === 'Utilisateur déconnecté')
            {
                sessionStore.setSession(null, null);
                userStore.disconnect();
                router.push('/signin');
            }
            else
            {
                alert(response.message);
            }
            
        })
    }
    
}
</script>

<template>
  <div class="navbar">
    <ul>
        <li>COOP</li>
        <li><RouterLink to="/">Conversations</RouterLink></li>
        <li><RouterLink to="/membres">Membres</RouterLink></li>
    </ul>

    <button v-if="userStore.isConnected" @click="deconnexion">Se déconnecter</button>

    
  </div>
</template>