<template>
    <div id="artists">
        <label id="header">Most Popular Artists</label>
        <PopularItem v-for="(artist, index) in artists" :key="artist.id"
        :id="artist.id" :index="index + 1" :image="artist.image" :name="artist.name" :type="'artist'"
        @click="redirectToArtist(artist.id)"/>
    </div>
</template>
<script>
import PopularItem from './PopularItem.vue'

export default {
    props: {
        artists: Array
    },
    components: {
        PopularItem
    },
    methods: {
        redirectToArtist(id){
            this.$router.push(`/artist/${id}`)
        }
    }
}
</script>
<style scoped>
    #artists{
        background-color: var(--secondary-color);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 30%;
    }

    #header{
        font-size: 1.5em;
        color: var(--text-color);
        margin: 10px;
    }
</style>