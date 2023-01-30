<script setup>
import {useRouter} from 'vue-router';
const props = defineProps(['m']);
const sessionStore = new useSessionStore();
const router = useRouter();
const state = reactive({
    active : true
});

function deleteMembre(id) {
    let token = sessionStore.data.token
    api.get('channels?token=' + token).then(channels => {
        channels.forEach(channel => {
            api.get('channels/'+channel.id+'/posts?token=' + token).then(messages => {
                messages.forEach(message => {
                    if(message.member_id === id) {
                        api.delete('channels/' + channel.id + '/posts/' + message.id + '?token=' + token).then(() => {
                            console.log("Le message '"+message.message+"' viens d'être supprimé.");
                        });
                    }
                });
            });
        });
    });
    api.delete('members/'+id+'?token=' + token).then(response => {
        state.active = false;
    });
}
</script>

<template>
    <div v-if="state.active" class="membre">
        <div class="membre-information">
            <h2>{{props.m.fullname}}</h2>
            <p>{{props.m.email}}</p>
        </div>
        <div class="membre-btn">
            <RouterLink :to="{name: 'profilMembre', params: {id: props.m.id}}"><button>Profil</button></RouterLink> 
            
            <button v-if="(props.m.id != sessionStore.data.member.id)" @click="deleteMembre(props.m.id)">Supprimer</button>
        </div>
    </div>
</template>

<style scoped>

.membre {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 20em;
    width: 20em;
    background: #1d1d42;
    border-radius: 15px;
    box-shadow: -1rem 0 2rem #000;
}

.membre > .membre-information {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.membre > .membre-information > h2 {
    margin-bottom: 1em;
}

.membre > .membre-information + .membre-btn {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
}

.membre > .membre-information + .membre-btn button {
    color: #f1f1f1;
    padding: 0.7em;
    width: 8em;
    font-weight: bold;
    background-color: #141432;
    cursor: pointer;
    border-radius: 10px;
    border: 2px solid rgba(255, 255, 255, 0.1);
    transition: border-color 0.3s ease-in-out;
}

.membre > .membre-information + .membre-btn button:hover {
    border-color: #f77017;
}
</style>