<script setup>
const props = defineProps(['m'])
console.log(props)
</script>

<template>
    <div class="membre">
        <div class="membre-information">
            <h2>{{m.fullname}}</h2>
            <p>{{m.email}}</p>
        </div>
        <div class="membre-btn">
            <button>Profil</button>
            <button>Supprimer</button>
        </div>
    </div>
</template>