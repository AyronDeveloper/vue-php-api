<script setup>
import { onMounted, ref, watch } from 'vue';
import useApi from '../hook/useApi';
import axios from 'axios';

const {loading, data, getData}=useApi()

const comidas=ref([])

onMounted(()=>{
    getData("http://localhost/proyectos/PHP/apiPHP-MVC/api/comidas")
})


watch(data,()=>{
    comidas.value=data.value
    //console.log(comidas.value)
})

const handleClick=async(id)=>{
    //console.log(id)
    const res=await axios.delete(`http://localhost/proyectos/PHP/apiPHP-MVC/api/eliminarComida/${id}`)
    //console.log(res.data)

    comidas.value=(comidas.value.filter((com)=>com.id!==id))
}
</script>
<template>
    <div class="container">
        <h1>INICIO</h1>
        <div class="food" v-if="loading">
            <div class="food__content">
                <div class="food__content">
                    <article class="food__card" v-for="com in comidas" :key="com.id">
                        <img class="food__img" :src="com.imagen" alt="">
                        <h3 class="food__title">{{com.nombre}}</h3>
                        <div class="food__options">
                            <router-link :to="`/edit/${com.id}`">Editar</router-link>
                            <button @click="()=>handleClick(com.id)">Eliminar</button>
                        </div>
                    </article>
                </div>
            </div>
        </div>
        <div class='food__loader' v-else><span class='loader'></span></div>
    </div>
</template>

<style scoped>
.food__loader{
    display: flex;
    justify-content: center;
}
.food__content{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 1200px;
    margin: 0 auto;
}
.food__card{
    width: 350px;
    border: solid 1px #c2c2c2;
    border-radius: 15px;
    padding: 10px;
    margin: 10px;
}
.food__img{
    width: 100%;
    pointer-events: none;
}
.food__title{
    text-align: center;
}
.food__options{
    display: flex;
    justify-content: space-evenly;
}
</style>