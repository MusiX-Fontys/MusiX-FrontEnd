<template>
    <div id="item" @click="redirectToPage">
        <label id="index">{{ index }}.</label>
        <img :src="image" alt="" onerror="this.style.display='none'"/>
        <label id="name">{{ name }}</label>
    </div>
</template>
<script>
export default {
    props: {
        id: String,
        index: Number,
        image: String,
        name: String,
        type: String
    },
    methods: {
        redirectToPage(){
            this.$router.push(`/${this.type}/${this.id}`)
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

    label{
        font-size: 1.5em;
        color: var(--text-color);
        margin-left: 10px;
    }

    img{
        width: 50px;
        height: 50px;
        border: 1px solid var(--primary-color);
        border-radius: 5px;
        margin: 0px 10px;
        cursor: pointer;
    }

    #index{
        min-width: 25px;
        display: flex;
        justify-content: center;
    }

    #name{
        width: 100%
    }
</style>