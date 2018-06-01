<template>
  <div class="all-report report md-layout-item md-size-90 md-large-size-80 md-xlarge-size-60 ma" >
    <!--<h2>{{ msg }}</h2>-->

<div class="action">

    <md-menu md-size="medium" md-align-trigger>
      <md-button md-menu-trigger>小组</md-button>

      <md-menu-content >

        <md-menu-item v-for= "(team,key) in teams"  v-bind:key="key"  @click="getReports('team',team)">{{team}}</md-menu-item>  

      </md-menu-content>

    </md-menu>

    
    <md-menu v-show="false" md-size="medium" md-align-trigger>
      <md-button md-menu-trigger>业务部门</md-button>

      <md-menu-content>
  <md-menu-item v-for= "(department,key) in departments"  v-bind:key="key"  @click="getReports('department',department)">{{department}}</md-menu-item> 
      </md-menu-content>
    </md-menu>

</div>

<div class="report-info text-center" v-show="!reports || !reports.length">


<h2> 已提交的周报 </h2>

<p class="info" v-for="(item,key) in reportInfo"  v-bind:key="key">
  {{item.team}} *  <b>{{item.counts}}</b> 份
</p>

<!-- <h4>共有 </h4> -->


</div>

<h2 class="text-center" v-show="curTeam">{{curTeam}} 周报汇总</h2>
<!-- row start // -->
<div class="user-report" v-for="(report,key) in reports"  v-bind:key="key">
  <h3>{{report.username}}</h3>
        <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">本周任务</h1>
      </md-table-toolbar>
                    <md-table-row>
                    <md-table-head>内容</md-table-head>  <md-table-head>计划日期</md-table-head> <md-table-head>完成百分比</md-table-head> <md-table-head>完成日期</md-table-head> <md-table-head>备注</md-table-head>
                    </md-table-row>
                   <md-table-row v-for="(task,key) in report.tasks" v-bind:key="key" v-bind:id="key">

                    <md-table-cell>  {{ task.title }} </md-table-cell>
                    <md-table-cell>  {{ task.scheduledDate }} </md-table-cell> 
                    <md-table-cell>  {{ task.percent ? task.percent : '0'}} %</md-table-cell>
                    <md-table-cell>  {{ task.finishDate }} </md-table-cell>
                    <md-table-cell>  {{ task.remark|wh}} </md-table-cell>
                   
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
                   <md-table-row v-for="(task,key) in report.extraTasks" v-bind:key="key" >

                    <md-table-cell>  {{ task.title }} </md-table-cell>
                    <md-table-cell>  {{ task.hours }} 小时 </md-table-cell>
                    <md-table-cell>  {{ task.finishDate }} </md-table-cell>
                    <md-table-cell>  {{ task.remark |wh }} </md-table-cell>
                   
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
                   <md-table-row v-for="(plan,key) in report.plans" v-bind:key="key">

                    <md-table-cell>  {{ plan.title }} </md-table-cell>
                    <md-table-cell>  {{ plan.scheduledDate }} </md-table-cell>
            
                    <md-table-cell>  {{ plan.remark|wh}} </md-table-cell>
                   
                    </md-table-row>
             </md-table>

</div>
<!-- row end // -->

    </div>
</template>

<script>
import { mapActions,mapGetters,mapState} from 'vuex'
export default {
  name: 'Report',
  data () {
    return {
      msg: '',
      teams:[],
      departments:[],
      reports:[],
      reportInfo:null,
      curTeam:null
    }
  },
  filters: {
    wh(str) {
      if(str && str != 'null'){
          return str;
        } else {
          return ' ';
        }     
      }
  },
	mounted(){
    this.setTitle('所有周报');
    this.getBasicData();
  },
	computed: {
   ...mapGetters([
      'schedules',
      'userInfo'
    ]),
    ...mapState({
      'weekNumber':state => state.report.weekNumber
    })

  },
  methods:{
	...mapActions([
      'setTitle'
    ]),
   getBasicData(){
    this.$store.commit('setLoading_req',true)
      this.$axios.get('./index.php/user/get_basic_data').then(response => {       
          this.teams = response.data.teams;           
          this.departments = response.data.departments;    
      }).catch(function (error) {
        
					console.log(error);
         });
         
      this.$axios.get('./index.php/report/get_report_info').then(response => {       
          this.reportInfo = response.data.report_info;           
            this.$store.commit('setLoading_req',false)
      }).catch(function (error) {
            this.$store.commit('setLoading_req',false)
        
					console.log(error);
         });

      },
    getReports(type,val){
      if(!type || !val) {
        return false;
      }
      this.curTeam = val;
      this.$store.commit('setLoading_req',true)
      this.$axios.get('./index.php/report/get_reports_by_type',{params: {
      type: type,
      val:val,
      weekNumber:this.weekNumber - 1
    }}).then(response => {
      this.$store.commit('setLoading_req',false) 
      
      let tempList = response.data.reports;
      tempList.forEach((element,index,arr) => {
        if(element.plans){
            element.plans = JSON.parse(element.plans);
        };
        if(element.tasks){
            element.tasks = JSON.parse(element.tasks);
        };
        if(element.extraTasks){
            element.extraTasks = JSON.parse(element.extraTasks);
        };

      });
      
      this.reports = tempList;
      
           
      }).catch(function (error) {
        this.$store.commit('setLoading_req',false) 
					console.log(error);
         });
      
    }
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


</style>
