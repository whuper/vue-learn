<template>
  <div class="list">
    <ul v-for="(item, key) in newsListShow">
      <news-item
      :newsDate="item"
      :key="key"
      ></news-item>
    </ul>
  </div>
</template>
 
<script>
import NewsItem from './NewsItem.vue'
 
export default {
  name: 'News',
  data () {
    return {
      newsListShow: [],
    }
  },
  components: {
    NewsItem
  },
  created() {
    this.setNewsApi();
  },
  methods:{
    setNewsApi: function() {
      this.$axios.get('/news/list')
      .then(res => {
        console.log(res);
        this.newsListShow = res.data.articles;
      });
    },
  }
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.list ul {
max-width:500px;
margin:0 auto;	
list-style-type:none;
	li {
		//cursor:pointer;

		a{
			color:#555;
		}
		
	}
	li:hover {
	   background-color:#cecece;
	   }

}
</style>
