<template>
    <div id="items">
        <div id="head" :style="{ backgroundImage: `url(${items[0][type].image})` }" @click="redirectToPage(items[0][type].id)">
            <label id="name-head">{{ items[0][type].name }}</label>
            <label id="plays-head">{{ items[0].scrobbleAmount }} plays</label>
        </div>
        <div id="side">
            <div v-for="item in items.slice(1, 5)" :key="item[type].id" class="side-item" 
            :style="{ backgroundImage: `url(${item[type].image})` }" 
            @click="redirectToPage(item[type].id)">
                <label class="name-side">{{ item[type].name }}</label>
                <label class="plays-side">{{ item.scrobbleAmount }} plays</label>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        items: Array,
        type: String
    },
    methods: {
        redirectToPage(id){
            this.$router.push(`/${this.type}/${id}`)
        }
    }
}
</script>
<style scoped>
    #items{
        display: flex;
    }

    #head{
        height: 450px;
        min-width: 450px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        color: var(--secondary-color);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        text-shadow: 0 0 10px rgb(0 0 0 / 70%);
    }

        #head:hover{
            color: var(--primary-color);
            cursor: pointer;
        }

    #name-head{
        font-size: 2.5em;
        margin: 5px 20px;
    }

    #plays-head{
        font-size: 1.5em;
        margin: 0px 0px 10px 20px;
    }

    #side{
        display: flex;
        flex-wrap: wrap;
    }

    .side-item{
        height: 225px;
        width: 225px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        color: var(--secondary-color);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        text-shadow: 0 0 10px rgb(0 0 0 / 70%);
    }

        .side-item:hover{
            color: var(--primary-color);
            cursor: pointer;
        }

    .name-side{
        font-size: 1.5em;
        margin: 2.5px 10px;
    }

    .plays-side{
        font-size: 1em;
        margin: 0px 0px 5px 10px;
    }
</style>