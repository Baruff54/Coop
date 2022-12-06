<script setup>
const props = defineProps(['m'])
</script>

<template>
    <div class="membre">
        <div class="membre-information">
            <h2>{{props.m.fullname}}</h2>
            <p>{{props.m.email}}</p>
        </div>
        <div class="membre-btn">
            <RouterLink :to="{name: 'profilMembre', params: {id: props.m.id}}"><button>Profil</button></RouterLink> 
            <button>Supprimer</button>
        </div>
    </div>
</template>