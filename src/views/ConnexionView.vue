<script setup>
import {useSessionStore} from '@/stores/session.js'
import Navbar from '@/components/Navbar.vue'
import {useUserStore} from '@/stores/user.js'
import {ref} from "vue";
import {useRouter} from 'vue-router';

const router = useRouter();
const sessionStore = new useSessionStore();
const userStore = new useUserStore();

let member = reactive({
    email: '',
    password: ''
})

const error = ref("");
const errorConnexion = ref(false);



function connexion() {
    api.post('members/signin', {
        body: member
    }).then(response => {
        if(response.message) {
            errorConnexion.value = true;
            error.value = response.message;
        }
        else {
            sessionStore.setSession(response.member,response.token);
            userStore.setConnected();
            router.push('/');
        }
    })
}

</script>

<template>
    <Navbar />
    <h1>Connexion</h1>
    <form @submit.prevent="connexion" method="POST">
        <div>
            <label>Email</label>
            <input class="input-form" v-model="member.email" type="email" placeholder="email@domain.com">
        </div>
        <div>
            <label>Mot de passe</label>
            <input class="input-form" v-model="member.password" type="password" placeholder="Votre mot de passe">
        </div>
        <div>
            <input class="input-form" type="submit" value="Envoyer">
        </div>
        <div>
            <p class="form-error" v-if="errorConnexion" v-text="error"></p>
        </div>
    </form>
</template>