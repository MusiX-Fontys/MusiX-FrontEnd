<template>
    <div id="albums">
        <label id="header">Most Popular Albums</label>
        <PopularItem v-for="(album, index) in albums" :key="album.id"
        :id="album.id" :index="index + 1" :image="album.image" :name="album.name" :type="'album'"
        @click="redirectToAlbum(album.id)"/>
    </div>
</template>
<script>
import PopularItem from './PopularItem.vue'

export default {
    props: {
        albums: Array
    },
    components: {
        PopularItem
    },
    methods: {
        redirectToAlbum(id){
            this.$router.push(`/album/${id}`)
        }
    }
}
</script>
<style scoped>
    #albums{
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