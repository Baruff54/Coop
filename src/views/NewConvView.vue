<script setup>
import {useSessionStore} from '@/stores/session.js'
import Navbar from '@/components/Navbar.vue'
import {ref} from "vue";

const sessionStore = new useSessionStore();

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
            })
        }
    })
}
</script>

<template>
    <Navbar/>
    <h1>Création d'une nouvelle conversation</h1>
    <form @submit.prevent="addConv" method="POST">
        <div>
            Nom
            <input class="input-form" v-model="conv.label" type="text" placeholder="Nom">
        </div>

        <div>
            Description
            <input class="input-form" v-model="conv.topic" type="text" placeholder="Description">
        </div>

        <div>
            <input class="input-form" type="submit" value="Envoyer">
        </div>

        <div>
            <p class="form-error" v-if="(error.length != 0)" v-text="error"></p>
        </div>
    </form>
</template>