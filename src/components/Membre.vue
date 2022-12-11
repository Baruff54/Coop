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