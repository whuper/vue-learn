<template>
  <li class="news-list">
        <h3 @click="jumpPage">{{newsDate.title}}</h3>
        <p class="Cleft">
			<!--<img :src="newsDate.thumbnail_pic_s" style="border-radius: 0.2rem;">-->
        </p>
        <p class="Cright">
          <span class="fl">{{newsDate.author_name}}</span>
          <span>{{newsDate.date}}</span>
		  <router-link :to="{name: 'detail', params: {id: newsDate.id}}" class="title">{{ 'view' }}</router-link>
        </p>
  </li>
</template>
 
<script>
export default {
  name: 'NewsItem',
  props: {
    newsDate: Object
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
    jumpPage: function () {
				  console.log('this',this);
      //window.location.href = this.newsDate.url
				  // 命名的路由
		this.$router.push({ name: 'detail', params: { id: 1 }})
    }
  }
}
</script>
 
<style scoped>

</style>
