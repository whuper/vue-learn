import shop from '@/api/shop'

const state = {
  added: [],
  lastCheckout: null
}

const actions = {
  // The first argument is the vuex store, but we're using only the
  // dispatch function, which applies a mutation to the store,
  // and the current state of the store
  checkout ({commit, state}, products) {
    const savedCartItems = [...state.added]
    commit('checkout_request')
    shop.buyProducts(
      products,
      () => commit('checkout_successful'),
      () => commit('checkout_failure', savedCartItems)
    )
  }
}

const mutations = {
  add_to_cart (state, productId) {
    state.lastCheckout = null
    const record = state.added.find(p => p.id === productId)
    if (!record) {
      state.added.push({
        id: productId,
        quantity: 1
      })
    } else {
      record.quantity++
    }
  },
  checkout_request (state) {
    // clear cart
    state.added = []
    state.lastCheckout = null
  },
  checkout_successful (state) {
    state.lastCheckout = 'successful'
  },
  checkout_failure (state, savedCartItems) {
    // rollback to the cart saved before sending the request
    state.added = savedCartItems
    state.lastCheckout = 'failed'
  }
}

const getters = {
  cartProducts (state, getters, rootState) {
    return state.added.map(({ id, quantity }) => {
      const product = rootState.products.all.find(p => p.id === id)
      return {
        title: product.title,
        price: product.price,
        id,
        quantity
      }
    })
  },
  cartCount (state) {
    var totalCount = 0
    state.added.forEach(({ quantity }) => {
      totalCount += quantity
    })
    return totalCount
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
