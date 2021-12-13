<template>
    <div id="tracks">
        <label id="header">Most Popular Tracks</label>
        <PopularItem v-for="(track, index) in tracks" :key="track.id"
        :id="track.id" :index="index + 1" :image="track.image" :name="track.name" :type="'track'"
        @click="redirectToTrack(track.id)"/>
    </div>
</template>
<script>
import PopularItem from './PopularItem.vue'

export default {
    props: {
        tracks: Array
    },
    components: {
        PopularItem
    },
    methods: {
        redirectToTrack(id){
            this.$router.push(`/track/${id}`)
        }
    }
}
</script>
<style scoped>
    #tracks{
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