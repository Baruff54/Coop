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
    <div class="container">
        <h1>Connexion</h1>
        <form @submit.prevent="connexion" method="POST">
            <input class="input-form" v-model="member.email" type="email" placeholder="Email">
            <input class="input-form" v-model="member.password" type="password" placeholder="Mot de passe">
            <input class="btn" type="submit" value="Envoyer">
            <div>
                <p class="form-error" v-if="errorConnexion" v-text="error"></p>
            </div>
        </form>
    </div>
    
</template>

<style scoped>
.container {
    max-width: 1100px;
    margin: 0 auto;
    text-align: center;
    padding-top: 8em;
}

.container > h1 {
    margin-bottom: 2em;
}

.container > form {
    display: flex;
    align-items: center;
    flex-direction: column;
}

.container > form > div > p {
    color: #f77017;
    font-weight: bold;
}

.container > form > input {
    height: 3em;
    width: 20em;
    padding: 0.5em;
    outline: none;
    border: 3px solid rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    margin-bottom: 3em;
    font-size: 1rem;
    transition: border-color 0.3s ease-in-out;
}

.container > form > input:focus {
    border-color: #f77017;
}

.container > form > .btn{
    font-weight: bold;
    background: #1d1d42;
    width: 10em;
    border: 2px solid rgba(255, 255, 255, 0.1);
    transition: 0.4s linear;
    cursor: pointer;
    transition: border-color 0.3s ease-in-out;

}

.container > form > .btn:hover{
    border-color: #f77017;
}




</style>