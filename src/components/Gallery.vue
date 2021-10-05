<template>
  <div>
    <ul
    ref="gallery"
    v-infinite-scroll="loadMore" 
    infinite-scroll-disabled="disabled" 
    infinite-scroll-distance="30">

        <li 
        v-for="(image, i) in data" 
        :key="i"
        @click="deleteImage(image)">

            <img 
            v-lazy="image.thumbnailUrl" 
            :alt="image.title" 
            :title="image.title"/>
        </li>
    </ul>
  </div>
</template>

<script>
var infiniteScroll = require('vue-infinite-scroll');

export default {
    name: 'Gallery',
    props: {
        images: Array
    },
    directives: {infiniteScroll},
    data() {
        return {
            data: [],
            page: 0,
            total: 30,
            disabled: false
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            this.loadMore()
        },
        loadMore() {

            if (!this.images) return

            // Si la pagina actual es igual al numero maximo de paginacion deshabilito el scroll infinito
            if(this.page == (this.images.length / this.total)) {
                this.disabled = true; 
                return
            }

            // Calculo de paginacion
            const length = this.page * this.total

            this.data.push(...this.images.slice(length, this.total + length))

            this.page++
        },
        deleteImage(image) {
            
            // Buscar el indice que ocupa la imagen dentro del array para poder eliminarlo con splice
            const findIndex = this.data.findIndex(f => +f.id === +image.id)

            if (findIndex >= 0) this.data.splice(findIndex, 1)
        }
    }
}
</script>

<style lang="scss" scoped>
ul {
    margin: 0 auto;
    padding: 0;
    list-style: none;
    display: flex;
    align-items: center;
    flex-flow: row;
    flex-wrap: wrap;
    width: 100%;
    @media(min-width: 768px) { width: 700px; }
    @media(min-width: 991px) { width: 800px; }
    @media(min-width: 1200px) { width: 1100px; }
    
    li {
        background-color: white;
        padding: 5px;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px #0000001f, 0 1px 2px #0000003d;
        margin: 5px;
        cursor: pointer;
        width: calc((100% / 2) - 20px);
        @media (min-width: 500px) { width: calc(100% / 3 - 20px); }
        @media (min-width: 768px) { width: calc(100% / 4 - 20px); }
        @media (min-width: 991px) { width: calc(100% / 5 - 20px); }
        @media (min-width: 1200px) { width: calc(100% / 6 - 20px); }
        img {
            width: 100%;
        }
    }
}
</style>
