<template>
  <div class="report md-layout-item md-size-90 md-large-size-80 md-xlarge-size-60 ma" >
    <!--<h2>{{ msg }}</h2>-->

      <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">本周任务</h1>
      </md-table-toolbar>
                    <md-table-row>
                    <md-table-head>内容</md-table-head>  <md-table-head>计划日期</md-table-head> <md-table-head>完成百分比</md-table-head> <md-table-head>完成日期</md-table-head> <md-table-head>备注</md-table-head>
                    </md-table-row>
                   <md-table-row v-for="(task,key,index) in schedules.tasks" v-bind:key="key" v-bind:id="key">

                    <md-table-cell>  {{ task.title }} </md-table-cell>
                    <md-table-cell>  {{ task.scheduledDate }} </md-table-cell> 
                    <md-table-cell>  {{ task.percent + '%'}} </md-table-cell>
                    <md-table-cell>  {{ task.FinishDate }} </md-table-cell>
                    <md-table-cell>  {{ task.remark }} </md-table-cell>
                   
                    </md-table-row>
             </md-table>
						 <p>				
						 </p>

						     <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">本周额外任务</h1>
      </md-table-toolbar>
                    <md-table-row>
                    <md-table-head>内容</md-table-head>   <md-table-head>投入时间</md-table-head> <md-table-head>完成日期</md-table-head> <md-table-head>备注</md-table-head>
                    </md-table-row>
                   <md-table-row v-for="(task,key,index) in schedules.extratTasks" v-bind:key="key" v-bind:id="key">

                    <md-table-cell>  {{ task.title }} </md-table-cell>
                    <md-table-cell>  {{ task.hours }} 小时 </md-table-cell>
                    <md-table-cell>  {{ task.FinishDate }} </md-table-cell>
                    <md-table-cell>  {{ task.remark }} </md-table-cell>
                   
                    </md-table-row>
             </md-table>
             	 <p>				
						 </p>
             						     <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">下周计划</h1>
      </md-table-toolbar>
                    <md-table-row>
                    <md-table-head>内容</md-table-head>  <md-table-head>计划完成日期</md-table-head> <md-table-head>备注</md-table-head>
                    </md-table-row>
                   <md-table-row v-for="(plan,key,index) in schedules.plans" v-bind:key="key" v-bind:id="key">

                    <md-table-cell>  {{ plan.title }} </md-table-cell>
                    <md-table-cell>  {{ plan.scheduledDate }} </md-table-cell>
            
                    <md-table-cell>  {{ plan.remark }} </md-table-cell>
                   
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
      msg: ''
    }
  },
	methods:{
	...mapActions([
      'setTitle'
    ])
	},
	mounted(){
    this.setTitle('周报预览');
  },
	computed: {
   ...mapGetters([
      'schedules'
    ]
		)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


</style>
