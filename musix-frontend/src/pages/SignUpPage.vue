<template>
    <div class="panel">
        <div class="top-section">
            <span class="logo fa-stack fa-2x">
                <i class="logo-back fas fa-square fa-stack-2x" />
                <i class="logo-front fas fa-compact-disc fa-stack-1x" />
            </span>
            <h1 class="title">MusiX</h1>
        </div>
        <div class="section">
            <div class="input">
                <i class="icon fas fa-envelope"/>
                <div class="line" />
                <input v-model="email" class="input-field" placeholder="Email"/>
            </div>
            <div class="input">
                <i class="icon fas fa-user"/>
                <div class="line" />
                <input v-model="username" class="input-field" placeholder="Username"/>
            </div>
        </div>
        <div class="section" >
            <router-link to="signin" class="existing-account">Already have an account?</router-link>
            <button class="btn" @click="handleSignUp">Sign Up</button>
        </div>
    </div>
</template>

<script>
import api from "../wrappers/RegistrationWrapper.js"

export default {
    data() {
        return {
            email: '',
            username: ''
        }
    },
    methods: {
        async handleSignUp(e) {
            e.preventDefault()

            if(!this.email.trim() || !this.username.trim()){
                alert('All fields need to be filled in.')
                return
            }

            const payload = { 
                email: this.email, 
                username: this.username 
            };

            const response = await api.signUp(payload);

            if(response.success){
                alert(response.message)

                this.$router.push('signin')
            }
            else{
                alert(response.message)
            }
        }
    }
}
</script>

<style scoped>
    .panel{
        min-width: 500px;
        width: 32.5vw;
        min-height: fit-content;
        height: 50vh;
        top:0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        background-color: var(--secondary-color);
        box-shadow: 5px 5px 5px 1px rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .top-section{ 
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .section{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .logo{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 1vw;
    }

    .logo-front{
        color: var(--secondary-color);
        font-size: 1.5em;
        transition: 2s ease transform;
    }

    .logo-front:hover{
        transform: rotate(900deg);
    }

    .logo-back{
        color: var(--primary-color);
        font-size: 2.5em;
    }

    .title{
        font-weight: 400;
        font-style: normal;
        font-size: 4em;
        color: var(--text-color);
        opacity: 0.85;
    }

    .input{
        width: 75%;
        height: 50px;
        border: 3px solid var(--primary-color);
        border-radius: 10px;
        display: flex;
        align-items: center;
        margin-bottom: 25px;
    }

    .icon{
        font-size: 2rem;
        color: var(--text-color);
        opacity: 0.85;
        margin: 20px;
        min-width: 32px;
        display: flex;
        justify-content: center;
    }

    .line{
        border: 1px solid var(--text-color);
        opacity: 0.85;
        height: 35px;
    }

    .input-field{
        font-family: Strait;
        padding: 20px;
        font-weight: 400;
        font-style: normal;
        font-size: 1.5rem;
        color: var(--text-color);
        opacity: 0.85;
        height: 0px;
        width: 100%;
        border: none;
        background: var(--secondary-color);
    }

    .input-field:focus{
        outline: none;
    }

    .existing-account{
        font-weight: 400;
        font-style: normal;
        font-size: 1.5rem;
        color: var(--primary-color);
        opacity: 1;
        margin: 1em;
        text-decoration: none;
    }

    .existing-account:hover{
        opacity: 0.75 !important;
        cursor: pointer;
    }

    .btn{
        width: 50%;
        height: 50px;
        font-family: Strait;
        padding: 20px;
        font-weight: 400;
        font-style: normal;
        font-size: 2rem;
        color: var(--secondary-color);
        background: var(--primary-color);
        border-radius: 10px;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.2s ease;
    }

    .btn:hover{
        transform: scale(1.025);
        box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.25);
        cursor: pointer;
    }
</style>