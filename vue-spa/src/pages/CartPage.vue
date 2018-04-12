<template>
  <div class="cart">
    <p v-show="!products.length"><i>Please add some products to cart.</i></p>
    <div v-show="products.length > 0">
    <table class="checkout-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Per Unit</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="p in products">
        <td><router-link :to="{name: 'product', params: {id: p.id}}">{{ p.title }}</router-link></td>
        <td>$ {{ p.price }}</td>
        <td>{{ p.quantity }}</td>
        <td>$ {{ p.price * p.quantity }}</td>
      </tr>
      <tr class='total'>
        <td><b>TOTAL</b></td>
        <td></td>
        <td></td>
        <td>$ {{ total }}</td>
      </tr>
      </tbody>
    </table>
    <p><button :disabled="!products.length" @click="checkout(products)" class='checkout-button'>Checkout</button></p>
    </div>
    <p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        products: 'cartProducts'
      }),
      checkoutStatus () {
        return this.$store.state.cart.lastCheckout
      },
      total () {
        return this.products.reduce((total, p) => {
          return total + p.price * p.quantity
        }, 0)
      }
    },
    methods: {
      ...mapActions([
        'checkout'
      ])
    }
  }
</script>

<style>

.cart {
  width: 600px;
}
.checkout-table {
  width: 100%;
}

.checkout-table th {
  text-align: left;
  padding: 15px 0px;
  border-bottom: 1px solid #aaa;
}

.checkout-table td {
  padding: 8px 0px;
}

.checkout-button {
  float: right;
  width: 120px;
  height: 40px;
  margin-top: 20px;
}

.total td {
  border-top: 1px solid #aaa;
  padding-top: 10px;
}
</style>
