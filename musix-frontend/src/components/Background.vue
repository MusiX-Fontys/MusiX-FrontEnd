<template>
    <div>
        <img :src="image" alt="">
    </div>
</template>

<script>
import image from '../assets/background.jpg'

export default {
    name: 'Background',
    data() {
        return {
            image: image
        }
    }
}
</script>

<style scoped>
    div{
        position: fixed;
        z-index: -1;
    }

    img{
        width: 100vw;
        height: 100vh;
    }
</style>