<template>
    <div id="item" @click="redirectToAlbum">
        <img :src="image" alt="https://picsum.photos/200"/>
        <label id="name">{{ name }}</label>
    </div>
</template>
<script>
export default {
    props: {
        id: String,
        name: String,
        image: String
    },
    methods: {
        redirectToAlbum(){
            this.$router.push(`/album/${this.id}`)
        }
    }    
}
</script>
<style scoped>
    #item{
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        cursor: pointer;
        margin-bottom: 10px;
        background-color: rgba(248, 38, 38, 1);
        border-radius: 5px;
        box-shadow: 5px 5px 5px 1px rgb(248 38 38 / 50%);
    }

        #item:hover #name{
            color: var(--secondary-color);
            cursor: pointer;
        }

    img{
        width: 200px;
        height: 200px;
        border-radius: 5px;
        cursor: pointer;
    }

    #name{
        font-size: 1.5em;
        color: var(--text-color);
        padding-top: 10px;
        width: 200px;
        word-break: break-word;
        display: flex;
        justify-content: center;
        align-items: flex-start;
    }
</style>