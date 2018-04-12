<template>
  <div class='product-container'>
    <div v-for="p in allProducts" class="product">
      <router-link :to="{name: 'product', params: {id: p.id}}" class="title">{{ p.title }}</router-link>
      <span class="price">$ {{ p.price }}</span>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    mounted () {
      this.getAllProducts()
    },
    computed: {
      ...mapGetters([
        'allProducts'
      ])
    },
    methods: {
      ...mapActions([
        'getAllProducts'

      ])
    }
  }
</script>

<style>
.product {
  padding: 10px 0px;
  border-bottom: 1px solid #eee;
  width: 400px;
}

.title {
  color: #312377;
}

.price {
  float: right;
}

.product-container {
  margin-bottom: 50px;
}
</style>
