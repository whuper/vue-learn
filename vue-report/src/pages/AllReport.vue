<template>
  <div class="all-report report md-layout-item md-size-90 ma" >
    <!--<h2>{{ msg }}</h2>-->

<div class="action" v-show="showToolBar">
<!--      <md-button class="md-icon-button  md-primary">
        <md-icon>people</md-icon>
      </md-button>
 -->

    <md-menu md-size="small" md-align-trigger md-dense>
      <md-button md-menu-trigger>{{this.increase == -1 ? '上周' :'本周'}} 
    <md-tooltip md-direction="right"> 查看本周或者上周的周报 </md-tooltip>

      </md-button>

      <md-menu-content >

        <md-menu-item  @click="changeWeek(0)"> 本周 </md-menu-item>  
         <md-menu-item  @click="changeWeek(-1)"> 上周 </md-menu-item>  

      </md-menu-content>

    </md-menu>


    <md-menu md-size="medium" md-align-trigger md-dense>
      <md-button md-menu-trigger> 筛选 <span >({{curTeam||'未选择'}})</span>
        <md-tooltip md-direction="right"> 按组或者部门查看 </md-tooltip>
        </md-button>

      <md-menu-content >
         <md-subheader> 按小组</md-subheader>

        <md-menu-item :disabled="curTeam == team" v-for= "(team,key) in teams"  v-bind:key="key+'t'"  @click="getReports('team',team)">{{team}}</md-menu-item>  

           <md-subheader> 按部门</md-subheader>

          <md-menu-item :disabled="curTeam == department" v-for= "(department,key) in departments"  v-bind:key="key+'d'"  @click="getReports('department',department)">{{department}}</md-menu-item> 

      </md-menu-content>

    </md-menu>

    
    <md-menu v-show="false" md-size="medium" md-align-trigger md-dense>
      <md-button md-menu-trigger>业务部门</md-button>

      <md-menu-content>
  <md-menu-item v-for= "(department,key) in departments"  v-bind:key="key"  @click="getReports('department',department)">{{department}}</md-menu-item> 
      </md-menu-content>
    </md-menu>

   

      <md-button class="md-icon-button md-primary" @click="changeView">
        <md-icon v-if="currentView == 'taskType'">view_list</md-icon>
        <md-icon v-if="currentView == 'person'">person_outline</md-icon>
         <md-tooltip md-direction="right"> 切换视图 </md-tooltip>
      </md-button>



      <md-button class="md-icon-button  md-primary" @click="refresh">
        <md-icon>cached</md-icon>
        <md-tooltip md-direction="right"> 刷新 </md-tooltip>
      </md-button>

      <span class="count" v-show="reportsByPerson.length > 0" 
      >当前分组共 <strong>{{reportsByPerson.length}}</strong> 份
      </span>

      <md-button class="md-icon-button print md-primary" @click="print">
        <md-icon>print</md-icon>
        <md-tooltip md-direction="right"> 打印周报 </md-tooltip>
      </md-button>

      

</div>

<div class="report-info text-center" v-show="(reportsByType.task && reportsByType.task.length) || (!reportsByPerson.length)">


<div v-show="reportInfo && reportInfo.length" class="report-info-box">
<h2 class="md-title"> <strong>{{this.increase == -1 ? '上周' :'本周'}} </strong>已提交的周报 </h2>

 <p  class="md-display-2" v-for="(item,key) in reportInfo"  v-bind:key="key">
  {{item[reportView]||"其他"}} <i class="material-icons">trending_flat</i>  <b>{{item.counts}}</b> 份
</p>




</div>

<div v-show="!reportInfo || !reportInfo.length">
<h1 class="md-display-4"> 还没有周报提交</h1>

</div>


<!-- <h4>共有 </h4> -->


</div>

<!-- 周报汇总 -->
<h2 class="text-center" v-show="curTeam">{{curTeam}} 周报汇总</h2>

<p><br /></p>

<!-- 视图 1 开始 -->
<div class="view-task" v-if="currentView == 'taskType' && ((reportsByType.tasks && reportsByType.tasks.length) || (reportsByType.plans && reportsByType.plans.length) )" >
      <md-table md-card md-dense>
    <md-table-toolbar>
        <h1 class="md-title">本周任务</h1>
      </md-table-toolbar>
                    <md-table-row>
                      <md-table-head>姓名</md-table-head> 
                    <md-table-head>内容</md-table-head>  <md-table-head>计划日期</md-table-head> <md-table-head>完成百分比</md-table-head> <md-table-head>完成日期</md-table-head> <md-table-head>备注</md-table-head>
                    </md-table-row>
                   <md-table-row v-for="(task,key) in reportsByType.tasks" v-bind:key="key" v-bind:id="key">

                    <md-table-cell class="usern" nowrap> {{ task.username }} </md-table-cell>
                    <md-table-cell> {{ task.title }} </md-table-cell>
                    <md-table-cell nowrap> {{ task.scheduledDate }} </md-table-cell> 
                    <md-table-cell> {{ task.percent ? task.percent : '0'}} %</md-table-cell>
                    <md-table-cell nowrap> {{ task.finishDate }} </md-table-cell>
                    <md-table-cell> {{ task.remark|wh}} </md-table-cell>
                   
                    </md-table-row>
             </md-table>
						 <p>				
						 </p>

		<md-table md-card md-dense>
      <md-table-toolbar>
        <h1 class="md-title">本周额外任务</h1>
      </md-table-toolbar>
                    <md-table-row>
                      <md-table-head>姓名</md-table-head> 
                    <md-table-head>内容</md-table-head>   <md-table-head>投入时间</md-table-head> <md-table-head>完成日期</md-table-head> <md-table-head>备注</md-table-head>
                    </md-table-row>
                   <md-table-row v-for="(task,key) in reportsByType.extraTasks" v-bind:key="key" >

                    <md-table-cell class="usern" nowrap>  {{ task.username }} </md-table-cell>
                    <md-table-cell>  {{ task.title }} </md-table-cell>
                    <md-table-cell>  {{ task.hours }} 小时 </md-table-cell>
                    <md-table-cell nowrap>  {{ task.finishDate }} </md-table-cell>
                    <md-table-cell>  {{ task.remark |wh }} </md-table-cell>
                   
                    </md-table-row>
             </md-table>
             	 <p>				
						 </p>
   <md-table md-card md-dense>
      <md-table-toolbar>
        <h1 class="md-title">下周计划</h1>
      </md-table-toolbar>
                    <md-table-row>
                        <md-table-head>姓名</md-table-head> 
                    <md-table-head>内容</md-table-head>  <md-table-head>计划完成日期</md-table-head> <md-table-head>备注</md-table-head>
                    </md-table-row>
                   <md-table-row v-for="(plan,key) in reportsByType.plans" v-bind:key="key">

                    <md-table-cell class="usern" nowrap>  {{ plan.username }} </md-table-cell>
                    <md-table-cell>  {{ plan.title }} </md-table-cell>
                    <md-table-cell nowrap>  {{ plan.scheduledDate }} </md-table-cell>
            
                    <md-table-cell>  {{ plan.remark|wh}} </md-table-cell>
                   
                    </md-table-row>
             </md-table>
</div>


 <!-- 视图2 开始 ###############  -->

<!-- row start // -->
<div v-if="currentView == 'person' && reportsByPerson && reportsByPerson.length" class="user-report" v-for="(report,key) in reportsByPerson"  v-bind:key="key">
  <h3>{{report.username}}</h3>
    <md-table md-card >
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

 <md-table md-card >
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
      reportsByType:[],
      reportsByPerson:[],
      reportInfo:null,
      curTeam:null,
      increase:0,
      currentView:'taskType'
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
      'weekNumber':state => state.report.weekNumber,
      'showToolBar': state => state.common.showToolBar
    })

  },
  methods:{
	...mapActions([
      'setTitle'
    ]),
   getBasicData(type){
    
    this.$store.commit('setLoading_req',true)
      this.$axios.get('./index.php/user/get_basic_data').then(response => {       
          this.teams = response.data.teams;           
          this.departments = response.data.departments;    
      }).catch(function (error) {
        
					console.log(error);
         });

    //获取周报概览
      if(!type){
           type = 'team';           
      }
      this.reportView = type;
      console.log('this.reportView',this.reportView);
              
      this.$axios.get('./index.php/report/get_report_info',{params: {
      weekNumber:this.weekNumber + this.increase,
      type:type
    }}).then(response => {       
          this.reportInfo = response.data.report_info;           
            this.$store.commit('setLoading_req',false)
      }).catch( (error) => {
            this.$store.commit('setLoading_req',false)
        
					console.log(error);
         });

      },
    getReports(type,val){
      if(!type || !val) {
        this.setShowSnackbar({bMsg:'条件不完整...'});
        return false;
      }
      //获取概览
      this.getBasicData(type);

      document.title = val + '工作周报';
      this.curTeam = val;
      this.$store.commit('setLoading_req',true)
      this.$axios.get('./index.php/report/get_reports_by_type',{params: {
      type: type,
      val:val,
      weekNumber:this.weekNumber + this.increase
    }}).then(response => {
      this.$store.commit('setLoading_req',false) 
      
      var tempListByPerson = response.data.reports;

      var tempListByType = {
            plans:[],
            tasks:[],
            extraTasks:[]
      }

      tempListByPerson.forEach((element,index,arr) => {
        if(element.plans){        
            element.plans = JSON.parse(element.plans);

            element.plans.forEach(elementTmp => {
                elementTmp.username = element.username;
            });
            
        };
        if(element.tasks){   
            element.tasks = JSON.parse(element.tasks);

            element.tasks.forEach(elementTmp => {
                elementTmp.username = element.username;
            });
            
        };
        if(element.extraTasks){        
            element.extraTasks = JSON.parse(element.extraTasks);
            
            element.extraTasks.forEach(elementTmp => {
                elementTmp.username = element.username;
            });  
            
        };

      });
 

      for (let key = 0; key < tempListByPerson.length; key++) { 
        //合并数组
        if(tempListByPerson[key].plans && tempListByPerson[key].plans.length > 0){
            Array.prototype.push.apply(tempListByType.plans,tempListByPerson[key].plans);

        }
        if(tempListByPerson[key].tasks && tempListByPerson[key].tasks.length > 0){
          Array.prototype.push.apply(tempListByType.tasks,tempListByPerson[key].tasks); 
        }

        if(tempListByPerson[key].extraTasks && tempListByPerson[key].extraTasks.length > 0){
         Array.prototype.push.apply(tempListByType.extraTasks,tempListByPerson[key].extraTasks);

        }
      
       

        
/*         
        let tmpUsername = tempListByPerson[key]['username'];

        console.log('key',tmpUsername);

        tempListByType.plans.forEach((element,index,arr) => {
          element.username = tmpUsername; 
        });
        tempListByType.tasks.forEach((element,index,arr) => {
          element.username = tmpUsername; 
        });
        tempListByType.extraTasks.forEach((element,index,arr) => {
          element.username = tmpUsername;  
        }); */

      /*    tempListByType.plans.push(tempListByPerson[index].plans);
         tempListByType.tasks.push(tempListByPerson[index].tasks);
         tempListByType.extraTasks.push(tempListByPerson[index].extraTasks);   */      
      }
      
      this.reportsByType = tempListByType;

      this.reportsByPerson = tempListByPerson;
      
      //console.log('this.reportsByPerson',this.reportsByPerson);
      //console.log('this.reportsByType',this.reportsByType);
      
           
      }).catch( (error) => {
        this.$store.commit('setLoading_req',false) 
					console.log(error);
         });
      
    },
    changeWeek(num){

      this.increase = num;
      this.curTeam = null;
      this.getBasicData();
    },
    changeView(){

      if(this.currentView == 'taskType'){
          this.currentView = 'person';
      } else {
          this.currentView = 'taskType';
      }


    },
    print(){
      this.$store.commit('updateShowToolBar_req',false)
      setTimeout(function() {
           window.print();
      },300);

     
    },
    refresh(){
      this.teams=[]
      this.departments = []
      this.reportsByType = []
      this.reportsByPerson = []
      this.reportInfo = null
      this.curTeam = null
      this.increase = 0
      this.currentView ='taskType'

      this.getBasicData();

    },
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


</style>
