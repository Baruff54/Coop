<script setup>
const props = defineProps(['c']);
</script>

<template>
    <div class="conv">
        <div class="conv-info">
            <h2>{{c.label}}</h2>
            <p>{{c.topic}}</p>
            <p>{{c.modified_at}}</p>
        </div>
        <div class="conv-action">
            <router-link :to="{name: 'conversation', params: {id: c.id}}">Voir la conversation</router-link>
        </div>
    </div>
</template>