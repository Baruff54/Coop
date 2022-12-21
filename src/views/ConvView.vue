<script setup>
import Navbar from '@/components/Navbar.vue'
import {useUserStore} from '@/stores/user.js'
import {useSessionStore} from '@/stores/session.js'
import {useRouter} from 'vue-router';
import Message from '../components/Message.vue';

const router = useRouter();
const userStore = new useUserStore();
const sessionStore = new useSessionStore();

const id_channel = router.currentRoute.value.params.id;

let data = reactive({
    member_id: sessionStore.data.member.id,
    message: '',
    token: sessionStore.data.token,
    channel_id: id_channel
})

let listeMessages = ref([]);
let conv = ref({})



onMounted(() => {

    if(!userStore.isConnected) {
        router.push('/signin');
    }
    if(sessionStore.isValid())
    {
        api.get('channels/'+id_channel+'/posts?token='+sessionStore.data.token).then(response => {
            listeMessages.value = response;
        });

        api.get('channels?token='+sessionStore.data.token).then(response => {
            conv.value = response.find(c => c.id === id_channel);
        })
    }

});

function sendMessage() {
    api.post('channels/'+id_channel+'/posts', {
        body: data
    }).then(response => {
        if(response.message) {
            console.log(response.message)
        }
        else {
            console.log(response);
        }
    })
}
</script>

<template>
    <Navbar />
    <div class="container">
        <div class="conversation-info">
            <h1>{{conv.label}}</h1>
            <h3>{{conv.topic}}</h3>
        </div>
        <div class="messages">
            <Message v-for="unMessage in listeMessages" :m="unMessage"/>
        </div>
        <form @submit.prevent="sendMessage" method="post">
            <input class="input-form" v-model="data.message" type="text" placeholder="Votre message">
            <input class="btn" type="submit" value="Envoyer">
        </form>
    </div>
</template>

<style scoped>

.container > .conversation-info {
    text-align: center;
    margin-bottom: 5em;
}
.container > .messages {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 3em;
}

.container > form {
    margin-top: 10em;
    display: flex;
}

.container > form > .input-form {
    width: 100%;
    padding: 1em;
    border-radius: 10px;
    outline: none;
    border: none;
    margin-right: 2em;
    color: #333;
}

.container > form > .btn {
    width: 8em;
    cursor: pointer;
    color: #333;
    border: none;
    border-radius: 10px;
}

@media screen and (max-width: 750px) {
    .container {
        margin: 0 1em;
    }
}

</style>