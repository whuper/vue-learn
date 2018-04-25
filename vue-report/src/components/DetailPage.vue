<template>
  <div class="detail">
    <h1>{{ msg }}</h1>
    <h2>detail</h2>
	  <p>
	    {{ $route.params.id }}
	  </p>

	  <h3> {{product.title}} </h3>
	  <p>
	  {{product.content}}
	  </p>
	  <p>
	  {{product.date}}
	  </p>

  </div>
</template>

<script>
export default {
  name: 'DetailPage',
  data () {
    return {
      msg: 'Welcome to DetailPage',
	product:{}
    }
  },
  computed: {
      /*product () {
        let id = parseInt(this.$route.params.id)
        return this.getDetail(id) || {}
      }
	  */
    },
created:function(){
		this.getDetail(this.$route.params.id);
		},
methods:{
		getDetail:function(id){			
			const _self = this;
			this.$axios.get('/news/detail/1')
			.then(res => {
				_self.product = res.data.detail;
				_self.msg = 'sad';
			});
		
		 }
		}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
