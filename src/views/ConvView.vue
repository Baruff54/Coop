<script setup>
import Navbar from '@/components/Navbar.vue'
import {useUserStore} from '@/stores/user.js'
import {useSessionStore} from '@/stores/session.js'
import {useRouter} from 'vue-router';
import Message from '../components/Message.vue';

const router = useRouter();
const userStore = new useUserStore();
const sessionStore = new useSessionStore();
const bus = inject('bus');

const id_channel = router.currentRoute.value.params.id;

let data = reactive({
    member_id: sessionStore.data.member.id,
    message: '',
    token: sessionStore.data.token,
    channel_id: id_channel
})

let listeMessages = ref([]);
let conv = ref({})

bus.on('recharger-messages', chargerMessages);

async function chargerMessages() {  
        const response = await api.get('channels/'+id_channel+'/posts?token='+sessionStore.data.token);
        listeMessages.value = response.reverse();
        setTimeout(() => bus.emit('fin-recharger-messages'), 10); 
    
    
}

async function chargerConversation() {

    if(sessionStore.isValid())
    {   
        const response = await api.get('channels?token='+sessionStore.data.token);
        conv.value = response.find(c => c.id === id_channel);
    }
}


onMounted(() => {

    if(!userStore.isConnected) {
        router.push('/signin');
    }
    else {
        chargerConversation();
        chargerMessages();
    }

});

function messageSorting(a,b) {
    var dateA = new Date(a.date).getTime();
    var dateB = new Date(b.date).getTime();
    return dateA > dateB ? 1 : -1; 
}

function sendMessage() {
    api.post('channels/'+id_channel+'/posts', {
        body: data
    }).then(response => {
        data.message = "";
        console.log(response)
        bus.emit('recharger-messages');
        bus.off('fin-recharger-messages');
        bus.on('fin-recharger-messages',() => {
            bus.emit(`defiler-message`, response.id);
        });
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
    flex-direction: column;
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