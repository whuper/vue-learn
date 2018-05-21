<template>
  <div class="users md-layout-item md-size-90 md-large-size-80 md-xlarge-size-60 ma" >


 <md-table v-model="users" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <h1 class="md-title">{{ msg }}</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }" >
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.userId }}</md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.username }}</md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="province" md-sort-by="province">{{ item.province }}</md-table-cell>
        <md-table-cell md-label="Job Title" md-sort-by="title">{{ item.title }}</md-table-cell>
      </md-table-row>


    </md-table>

</div>
</template>

<script>
import { mapActions,mapGetters,mapState} from 'vuex'
export default {
  name: 'Report',
  data () {
    return {
      msg: '所有用户',
      users:[]
    }
  },
	mounted(){
    this.setTitle('用户管理');
    this.getUsers();
  },
	computed: {
   ...mapGetters([
      'schedules'
    ]
		)
  },
	methods:{
	...mapActions([
      'setTitle'
    ]),
    getUsers(){
     	this.$axios.get('/user/list').then(response => {
        if(response.data){
          this.users = response.data.users; 
          console.log('this.users',this.users);       
        } else {
          this.setShowSnackbar('错误#07');
        }
      }).catch(function (error) {
					console.log(error);
				 });


    }
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


</style>
