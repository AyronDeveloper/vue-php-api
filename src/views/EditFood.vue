<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import useApi from '../hook/useApi';
import axios from 'axios';

const {data, loading, getData}=useApi()

const loaderUpdate=ref(true)
const nombre=ref("")
const imagen=ref("")
const dataImagen=ref("")
const imgPrev=ref(null)

const route=useRoute()
const id=route.params.id

onMounted(()=>{
    getData(`http://localhost/proyectos/PHP/apiPHP-MVC/api/comidas/${id}`)
})

watch(data,()=>{
    nombre.value=data.value.nombre
    imagen.value=data.value.imagen
})

const handleFile=(e)=>{
    dataImagen.value=e.target.files[0]

    const render=new FileReader()
    render.onload=(e)=>{
      imgPrev.value=e.target.result
    }
    render.readAsDataURL(e.target.files[0])
}

const handleSubmit=async(e)=>{
    e.preventDefault()
    
    const form=new FormData()
    form.append("nombre", nombre.value)
    form.append("imagen",dataImagen.value)

    const res= await axios.post(`http://localhost/proyectos/PHP/apiPHP-MVC/api/actualizarComida/${id}`,form)
    console.log(res.data)
}
</script>
<template>
    <div class="container">
        <h1>EDITAR</h1>
        <div class="edit__content">
            <div class="edit__image">
                <img class="edit__img" v-if="imgPrev==null" :src="imagen" alt="">
                <img class="edit__img" v-else :src="imgPrev" alt="">
            </div>
            <form class="edit__form" @submit="handleSubmit">
                <input class="form__input" type="text" v-model="nombre">
                <input class="form__input_file" id="imagen" type="file" @change="handleFile">
                <label class="form__btn_img" for="imagen">
                    <span class="btn__img_text">Agregar Imagen</span>
                    <span class="btn__img_ico"><v-icon icon="mdi-image-area" /></span>
                </label>
                <button class="btn__update" v-if="loaderUpdate">AGREGAR</button>
                <button class="btn__update" v-else><span class="loader loader__create"></span></button>
            </form>
        </div>
    </div>
</template>
<style scoped>
.edit__content{
    max-width: 1000px;
    margin: 0 auto;
}
.edit__image{
    width: 500px;
    margin: 0 auto;
}
.edit__img{
    width: 100%;
    pointer-events: none;
}
.edit__form{
    max-width: 500px;
    margin-top: 15px;
    margin: 0 auto;
}
.form__input{
    display: block;
    width: 100%;
    border: solid 1px #c2c2c2;
    padding: 0 5px;
    font-size: 16px;
    font-weight: 600;
    outline: none;
    margin: 10px 0;
}
.form__input_file{
    opacity: 0;
    position: absolute;
}
.form__btn_img{
    display: flex;
    width: 200px;
    height: 40px;
    line-height: 40px;
    margin-bottom: 10px;
    cursor: pointer;
}
.btn__img_text{
    display: block;
    width: 80%;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    background-color: #41b883;
    color: #fff;
    text-align: center;
    font-weight: 600;
}
.btn__img_ico{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20%;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color: #26a370;
    color: #fff;
    text-align: center;
    font-size: 18px;
}
.btn__update{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    border: solid 1px #41b883;
    border-radius: 5px;
    background-color: #fff;
    color: #41b883;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
    transition: all 300ms ease-in-out;
}
</style>