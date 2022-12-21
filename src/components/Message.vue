<script setup>
import {useSessionStore} from '@/stores/session.js'
const sessionStore = new useSessionStore();

const props = defineProps(['m'])

let data = reactive({
    member: {},
    conv: {}
})

onMounted(() => {

    const id = props.m.member_id;
    const token = sessionStore.data.token;
    api.get('members?token=' + token).then(response => {
        data.member = response.find(m => m.id === id);
    })
    props.m.created_at = new Date(props.m.created_at).toLocaleDateString('fr-FR', {weekday: 'long',day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second:'numeric'})

})
</script>

<template>
    <div class="message">
        <div class="message-information">
            <h2><span class="message-information-member">{{data.member.fullname}}</span> - Envoyé le {{props.m.created_at}}</h2>
        </div>
        <div class="message-content">
            <p>{{props.m.message}}</p>
        </div>
    </div>
</template>

<style scoped>

.message {
    background: #1d1d42;
    border-radius: 15px;
    box-shadow: -1rem 0 2rem #000;
    padding: 2em;
}

.message > .message-information > h2 {
    font-weight: 500;
    font-size: 1.1em;
}

.message > .message-information > h2 > .message-information-member {
    color: #f77017;
    font-weight: bold;
    font-size: 1.5em;
}
</style>