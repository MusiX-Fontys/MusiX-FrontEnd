<template>
    <div id="component" @click="redirectToArtist">
        <img v-if="this.image" :src="image" alt=""/>
        <div v-else id="placeholder">[NO IMAGE]</div>
        <div id="content">
            <h1>{{ name }}</h1>
            <div v-if="genres.length"><label>Genres: </label>{{ genres.join(', ') }}</div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        id: String,
        name: String,
        image: String,
        genres: Array
    },
    methods: {
        redirectToArtist(){
            this.$router.push(`/artist/${this.id}`)
        }
    }
}
</script>
<style scoped>
    #component{
        width: 30%;
        min-height: 100px;
        height: fit-content;
        background-color: var(--secondary-color);
        cursor: pointer;
        border-radius: 5px;
        padding: 10px;
        display: flex;
    }

        #component:hover h1{
            color: var(--primary-color);
        }

    img{
        height: 100px;
        min-width: 100px;
        border-radius: 5px;
        object-fit: cover;
        border: 1px solid var(--primary-color);
    }

    #placeholder{
        height: 100px;
        min-width: 100px;
        border-radius: 5px;
        border: 1px solid var(--primary-color);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #content{
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-left: 10px;
        justify-content: space-between;
    }

    h1{
        margin-top: 5px;
        margin-bottom: 0;
        font-weight: normal;
        color: var(--text-color);
    }

    label{
        color: var(--primary-color);
    }
</style>