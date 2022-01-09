<template>
    <div id="section">
        <div>
            <div v-for="comment in currentComments" :key="comment.id" class="comment">
                <label class="name" @click="redirectToProfile(comment.id)">{{ comment.name }}</label>
                <label>{{ comment.comment }}</label>
            </div>
        </div>
        <div id="add-comment">
            <input v-model="comment"/>
            <button @click="addComment()">Add Comment</button>
        </div>
    </div>
</template>
<script>
import CommentWrapper from '../../wrappers/CommentWrapper'
import JwtUtil from '../../utils/JwtUtil'

export default {
    data() {
        return {
            comment: '',
            currentComments: []
        }
    },
    props:{
        id: String,
        comments: Array
    },
    created() {
        this.setComments()
    },
    methods: {
        setComments(){
            this.currentComments = this.comments
            console.log(this.currentComments)
        },
        redirectToProfile(id){
            this.$router.push(`/profile/${id}`)
        },
        async addComment(){
            const user = this.getUserInfo()

            this.currentComments.push({
                id: user.id,
                name: user.name,
                comment: this.comment
            })

            await CommentWrapper.postComment(this.id, this.comment)

            this.comment = ''
        },
        getUserInfo(){
            const jwt = localStorage.getItem('jwt')
            const claims = JwtUtil.parseJwt(jwt)

            return {
                id: claims.sub,
                name: claims.name
            }
        }
    }
}
</script>
<style scoped>
    #section{
        width: 100%;
    }

    .comment{
        padding: 10px;
        font-size: 1.5em;
    }

    .name{
        color: var(--primary-color);
        margin-right: 20px;
        cursor: pointer;
    }

    #add-comment{
        padding: 10px;
        display: flex;
        align-items: center;
    }

        #add-comment input{
            font-family: inherit;
            font-size: 1.25em;
            border-radius: 5px;
            border: 1px solid var(--primary-color);
            width: 100%;
            margin-right: 20px;
            padding: 5px;
        }

        #add-comment button{
            border-radius: 5px;
            border: none;
            background-color: var(--primary-color);
            color: var(--secondary-color);
            font-family: inherit;
            font-size: 1.25em;
            width: 25%;
            display: flex;
            padding: 5px;
            justify-content: center;
            transition:  0.2s ease transform;
        }

            #add-comment button:hover{
                transform: scale(1.05);
                box-shadow: 3px 3px 5px 0px rgb(0 0 0 / 50%);
                cursor: pointer;
            }
</style>