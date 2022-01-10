<template>
    <div id="favorite" @click="redirectToPage()">
        <label>{{ type }}</label>
        <img :src="item.image" alt=""/>
        <label>{{ item.name }}</label>
    </div>
</template>
<script>
export default {
    props: {
        item: Object,
        type: String
    },
    methods: {
        redirectToPage(){
            this.$router.push(`/${this.type.toLowerCase()}/${this.item.id}`)
        }
    }    
}
</script>
<style scoped>
    #favorite{
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
    }

        #favorite:hover label{
            color: var(--primary-color)
        }

    img{
        height: 300px;
        width: 300px;
        object-fit: cover;
        margin: 5px 0px;
    }

    label{
        font-size: 2em;
        font-weight: normal;
    }
</style>