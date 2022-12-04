<script setup>
import {useRouter} from 'vue-router';
import Navbar from '../components/Navbar.vue'
const router = useRouter();

let member = reactive({
    fullname: '',
    email: '',
    password: ''
})

function validationFormulaire() {
    api.post('members', {
        body: member
    }).then(response => {
        if(response.message) {
            alert(response.message)
        }
        else {
            console.log(response);
            if(confirm("Votre compte a été crée. Voulez-vous vous connecter ?")) {
                router.push('/signin');
            }
        }
    })
}
</script>

<template>
    <Navbar />
    <h1>Inscription</h1>
    <form @submit.prevent="validationFormulaire" method="POST">
        <div>
            <label>Email</label>
            <input class="input-form" v-model="member.email" type="email" placeholder="email@domain.com">
        </div>
        <div>
            <label>Nom</label>
            <input class="input-form" v-model="member.fullname" type="text" placeholder="Votre nom">
        </div>
        <div>
            <label>Mot de passe</label>
            <input class="input-form" v-model="member.password" type="password" placeholder="Votre mot de passe">
        </div>
        <div>
            <input class="input-form" type="submit" value="Envoyer">
        </div>
    </form>
</template>
