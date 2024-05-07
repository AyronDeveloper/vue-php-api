<script setup>
import axios from 'axios';
import { ref } from 'vue';

const loaderCreate=ref(true) 
const nombre=ref("")
const dataImagen=ref("")
const imgPrev=ref(null)

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
    console.log(nombre.value)

    const form=new FormData()
    form.append("nombre",nombre.value)
    form.append("imagen",dataImagen.value)

    const res= await axios.post(`http://localhost/proyectos/PHP/apiPHP-MVC/api/crearComida`,form)

    if(res.data){
        console.log(res.data)
        nombre.value=""
        dataImagen.value=""
        imgPrev.value=null
    }
}

</script>
<template>
    <div class="container">
        <h1>AÑADIR COMIDA</h1>
        <div class="create__content">
            <div class="create__image">
                <div v-if="imgPrev==null" class="create__img_previus">
                    <span class="create__img_ico"><v-icon icon="mdi-image-area" /></span>
                </div>
                <img v-else class="create__img" :src="imgPrev" alt="">
            </div>
            <form class="create__form" @submit="handleSubmit">
                <input class="form__input" type="text" v-model="nombre">
                <input class="form__input_file" id="imagen" type="file" @change="handleFile">
                <label class="form__btn_img" for="imagen">
                    <span class="btn__img_text">Agregar Imagen</span>
                    <span class="btn__img_ico"><v-icon icon="mdi-image-area" /></span>
                </label>
                <button class="btn__create" v-if="loaderCreate">AGREGAR</button>
                <button class="btn__create" v-else><span class="loader loader__create"></span></button>
            </form>
        </div>
    </div>
</template>
<style scoped>
.create__content{
    max-width: 1000px;
    margin: 0 auto;
}
.create__image{
    width: 500px;
    margin: 0 auto;
}
.create__img_previus{
    min-height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #c2c2c2;
}
.create__img_ico{
    font-size: 40px;
}
.create__img{
    width: 100%;
    pointer-events: none;
}
.create__form{
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
.btn__create{
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