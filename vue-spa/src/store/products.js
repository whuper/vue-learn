import shop from '@/api/shop'

const state = {
  all: []
}

const actions = {
  addToCart ({commit}, product) {
    commit('add_to_cart', product.id)
  },
  getAllProducts ({commit}) {
    shop.getProducts(products => {
      commit('recieve_products', products)
    })
  }
}

const mutations = {
  recieve_products (state, products) {
    state.all = products
  },
  add_to_cart (state, productId) {
    state.all.find(p => p.id === productId).inventory--
  }
}

const getters = {
  allProducts (state) {
    return state.all
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
