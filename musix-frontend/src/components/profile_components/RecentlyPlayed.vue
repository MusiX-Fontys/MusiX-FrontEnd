<template>
    <div id="item" @click="redirectToTrack">
        <img :src="image" alt="" onerror="this.style.display='none'"/>
        <label id="name">{{ name }}</label>
        <label id="played-at">{{ playedAt }}</label>
    </div>
</template>
<script>
export default {
    props: {
        id: String,
        image: String,
        name: String,
        playedAt: String
    },
    methods: {
        redirectToTrack(){
            this.$router.push(`/track/${this.id}`)
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
        font-size: 1.25em;
        color: var(--text-color);
        margin-left: 10px;
        width: 100%;
    }

    img{
        width: 45px;
        height: 45px;
        border: 1px solid var(--primary-color);
        border-radius: 5px;
        margin: 0px 7.5px;
        cursor: pointer;
    }

    #played-at{
        text-align: right;
        margin-right: 10px;
    }
</style>