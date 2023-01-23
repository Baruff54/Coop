<script setup>
const props = defineProps(['c']);
</script>

<template>
    <div class="conversation">
        <div class="conversation-info">
            <h2>{{c.label}}</h2>
            <p>{{c.topic}}</p>
            <p>{{c.modified_at}}</p>
        </div>
        <div class="conversation-action">
            <RouterLink :to="{name: 'conversation', params: {id: c.id}}">Voir la conversation</RouterLink>
        </div>
    </div>
</template>

<style scoped>



.conversation {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 20em;
    width: 20em;
    background: #1d1d42;
    border-radius: 15px;
    box-shadow: -1rem 0 2rem #000;
    margin-bottom: 3em;
    padding: 10px;
}

.conversation > .conversation-info{
    display: flex;
    flex-direction: column;
    align-items: center;
}

.conversation > .conversation-info > h2 {
    margin-bottom: 1em;
    text-align: center;
}

</style>