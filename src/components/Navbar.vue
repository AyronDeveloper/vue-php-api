<script setup>
import logoPhp from '../assets/img/php.png'
import logoVue from '../assets/img/vue.png'
</script>
<template>
    <nav class="navbar">
        <router-link class="navbar__link" to="/">INICIO</router-link>
        <div class="navbar__images">
            <img class="navbar__img navbar__img_vue" :src="logoVue" alt="Logo Vue">
            <img class="navbar__img navbar__img_php" :src="logoPhp" alt="Logo PHP">
        </div>
        <router-link class="navbar__link" to="/create">AGREGAR</router-link>
    </nav>
</template>
<style scoped>
    .navbar{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        background-color: #13694a;
        border-bottom-left-radius: 25px;
        border-bottom-right-radius: 25px;
        box-shadow: 0px 0px 6px 6px #188359;
    }
    .navbar__link{
    display: block;
    background-color: #41b883;
    border-radius: 15px;
    width: 150px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    text-decoration: none;
    color: #fff;
    font-weight: 600;
    }
    .navbar__images{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }
    .navbar__img{
        display: block;
    }
    .navbar__img_vue{
        width: 30%;
    }
    .navbar__img_php{
        width: 40%;
    }
</style>