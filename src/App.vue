<template>
  <div id="app">

    <!-- Cargando -->
    <div 
      v-if="images.loading" 
      class="loading">
      <Spinner/>
    </div>

    <!-- Error carga -->
    <div 
      v-else-if="images.error" 
      class="error">
      <img :src="require('@/assets/error.svg')"/>
      <p>Ups! Parece que algo ha ido mal...</p>
    </div>

    <!-- No hay contenido -->
    <div 
      v-else-if="!images.data.length" 
      class="empty">
      <img :src="require('@/assets/empty.svg')"/>
      <p>No hay nada que mostrar</p>
    </div>

    <!-- Galeria -->
    <Gallery 
      v-else 
      :images="images.data"/>

  </div>
</template>

<script>
import {getImages} from '@/api/api.js'

import Gallery from '@/components/Gallery'
import Spinner from '@/components/Spinner'

export default {
  name: 'App',
  components: {
    Gallery,
    Spinner
  },
  data() {
    return {
      images: {
        data: [],
        loading: false,
        error: false
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {

    async init() {

      this.images.loading = true

      try {

        let {data} = await getImages() // Peticion para traer imagenes a traves de la api
        this.images.data = data

      } catch (e) {

        this.images.error = true
      }

      this.images.loading = false
    }
  }
}
</script>

<style lang="scss">
html, 
body {
  margin: 0
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color:#f1f1f1;

  .loading,
  .error,
  .empty {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .error, 
  .empty {
    display: flex;
    flex-flow: column;
    img {
      width: 60%;
      max-width: 200px;
      margin-bottom: 1rem;
    }
    p {
      padding: 0 10px;
      font-size: 1.2rem;
      color: #7a7a7a;
    }
  }
}
</style>
