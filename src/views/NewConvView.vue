<script setup>

import {useSessionStore} from '@/stores/session.js'
import Navbar from '@/components/Navbar.vue'
import {ref} from "vue";
import {useRouter} from 'vue-router';

const sessionStore = new useSessionStore();
const router = useRouter();

let conv = reactive({
    label: '',
    topic: '',
    token: sessionStore.data.token
});

const error = ref("");

function addConv() {
    api.post('channels', {
        body: conv
    }).then(response => {
        if(response.message) {
            error.value = response.message;
        } else {
            api.get('channels?token='+sessionStore.data.token).then(response => {
                console.log(response);
                router.push('/')
            })
        }
    })
}
</script>

<template>
    <Navbar/>
    <div class="container">
        <h1>Création d'une nouvelle conversation</h1>
        <form @submit.prevent="addConv" method="POST">
            <input class="input-form" v-model="conv.label" type="text" placeholder="Nom">
            <input class="input-form" v-model="conv.topic" type="text" placeholder="Description">
            <input class="btn" type="submit" value="Envoyer">
            <div>
                <p class="form-error" v-if="(error.length != 0)" v-text="error"></p>
            </div>
        </form>
    </div>
    
</template>

<style scoped>

.container > form {
    display: flex;
    align-items: center;
    flex-direction: column;
}

.container > form > div > .form-error {
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
    color: #333;
}

.container > form > input:focus {
    border-color: #f77017;
}

.container > form > .btn{
    font-weight: bold;
    background: #1d1d42;
    width: 10em;
    border: 2px solid rgba(255, 255, 255, 0.1);
    cursor: pointer;
    transition: border-color 0.3s ease-in-out;
    color: #f1f1f1;

}

.container > form > .btn:hover{
    border-color: #f77017;
}

</style>