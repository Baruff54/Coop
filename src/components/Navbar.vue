<script setup>
import {useSessionStore} from '@/stores/session.js'
import {useUserStore} from '@/stores/user.js'
import {useRouter} from 'vue-router';
const userStore = new useUserStore();
const sessionStore = new useSessionStore();
const router = useRouter();

let isActive = ref(false);

function menuToggle() {
    isActive.value = !isActive.value;
}


function deconnexion() {
    
    if(!userStore.isConnected) {
        router.push('/signin');
    }
    if(sessionStore.isValid())
    {
        let token = sessionStore.data.token
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
    <RouterLink to="/">COOP</RouterLink>
    <div class="navbar-links" :class="{active: isActive}">
        <ul>
            <li @click="menuToggle"><RouterLink to="/">Conversations</RouterLink></li>
            <li @click="menuToggle"><RouterLink to="/membres">Membres</RouterLink></li>           
            <button class="deconnexion" v-if="userStore.isConnected" @click="deconnexion(); menuToggle();">Se déconnecter</button>
        </ul>
    </div>
    <div @click="menuToggle" class="hamburger" :class="{active: isActive}">
        <span class="ligne"></span>
    </div>
  </div>
</template>

<style scoped>
.navbar {
    display: flex;
    background-color: #333;
    padding: 3em;
    align-items: center;
    justify-content: space-between;
}

.navbar > a {
    color: #f1f1f1;
    font-weight: bold;
    text-decoration: none;
    font-size: 2rem;
}

.navbar > .navbar-links > ul {
    display: flex;
    list-style: none;
    align-items: center;
}
.navbar > .navbar-links > ul > li:not(:last-child) {
    margin-right: 4em;
    font-size: 1.1rem;
}

.navbar > .navbar-links > ul > li > a {
    color: #f1f1f1;
    text-decoration: none;
}

.navbar > .navbar-links > ul > li:active > a {
    font-weight: bold;
    color: rgb(241, 41, 41);
}
.navbar > .navbar-links > ul > .deconnexion {
    padding: 0.7em;
    background: none;
    border-radius: 5px;
    color: #f1f1f1;
    border: 1px solid #f1f1f1;
    cursor: pointer;
    font-size: 1.1rem;
}

.hamburger {
    width: 45px;
    height: 25px;
    position: relative;
    cursor: pointer;
    display: none;
}

.hamburger.active > .ligne {
    background-color: transparent;
}

.hamburger > .ligne {
    width: 100%;
    height: 4px;
    display: block;
    background-color: #f1f1f1;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 5px;
}

.hamburger.active > .ligne::before {
    transform: translateY(0px) rotateZ(45deg);
}

.hamburger.active > .ligne::after {
    transform: translateY(0px) rotateZ(-45deg);
}

.hamburger > .ligne::before, .hamburger > .ligne::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 4px;
    background-color: #f1f1f1;
    transition: transform 0.5s ease-in-out;
    border-radius: 5px;
}

.hamburger > .ligne::before {
    transform: translateY(-15px);
}

.hamburger > .ligne::after {
    transform: translateY(15px);
}

@media screen and (max-width: 770px) {

    /* .navbar {
        padding: 0;
    } */

    .navbar > a {
        position: absolute;
        z-index: 100;
        left: 40px;
        top: 25px;
    }


    .navbar > .navbar-links {
        position: absolute;
        top:0;
        left: 0;
        background-color: #333;
        backdrop-filter: blur(7px);
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: translateX(-100%);
        transition: transform 0.5s ease;
    }

    .navbar > .navbar-links.active {
        
        transform: translateX(0);
    }

    .navbar > .navbar-links > ul {
        flex-direction: column;
        align-items: center;  
    }

    .navbar > .navbar-links > ul > li:not(:last-child) {
    margin-bottom: 2em;
    margin-right: 0;
}

    .hamburger {
        display: block;
        position: absolute;
        right: 40px;
        top: 35px;
    }
}
</style>