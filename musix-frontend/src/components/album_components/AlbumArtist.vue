<template>
    <div id="item" @click="redirectToArtist()">
        <img :src="image" alt=""/>
        <label id="name">{{ name }}</label>
    </div>
</template>
<script>
export default {
    props: {
        id: String,
        image: String,
        name: String

    },
    methods: {
        redirectToArtist(){
            this.$router.push(`/artist/${this.id}`)
        }
    }
}
</script>
<style scoped>
    #item{
        width: 100%;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        overflow: hidden;
    }

        #item:hover label{
            color: var(--primary-color);
            cursor: pointer;
        }

    img{
        width: 50px;
        height: 50px;
        border: 1px solid var(--primary-color);
        border-radius: 5px;
        margin: 0px 10px;
        cursor: pointer;
    }

    label{
        font-size: 1.5em;
        color: var(--text-color);
        margin-left: 10px;
    }

    #name{
        width: 100%
    }
</style>