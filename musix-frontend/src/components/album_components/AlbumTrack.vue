<template>
    <div id="item" @click="redirectToTrack()">
        <label id="index">{{ index }}.</label>
        <label id="name">{{ name }}</label>
        <label id="duration">{{ millisecondsToMinutes(duration) }}</label>
    </div>
</template>
<script>
export default {
    props: {
        id: String,
        index: Number,
        name: String,
        duration: Number

    },
    methods: {
        redirectToTrack(){
            this.$router.push(`/track/${this.id}`)
        },

        millisecondsToMinutes(){
            var totalSeconds = (this.duration / 1000)
            var minutes = Math.floor(totalSeconds / 60)
            var seconds = Math.round(totalSeconds - (minutes * 60))
            if(seconds < 10){
                seconds = `0${seconds}`
            }
            return `${minutes}:${seconds}`
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

    #index{
        min-width: 25px;
        display: flex;
        justify-content: center;
    }

    #name{
        width: 100%
    }

    #duration{
        margin-right: 5px;
    }
</style>