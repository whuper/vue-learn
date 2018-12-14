<template ref="task1" >
<div ref="task2" class="task md-layout-item md-size-90 md-large-size-80 md-xlarge-size-60 ma">
    <!--<h1>{{ msg }}</h1>-->
    <form novalidate >

<!-- <transition-group name="list" class="report-table md-card md-dense"  tag="md-table" > -->
   <md-table name="list" class="report-table md-card md-dense" v-bind:class="{move:taskIsMoving}" >
    <md-table-toolbar key="1515">
         <div class="md-toolbar-section-start">
        <h1 class="md-title">本周工作小结</h1>
        <md-tooltip md-direction="left">{{this.weekNumber}} </md-tooltip>
        </div>

        <div class="md-toolbar-section-end">
          
          <md-button class="md-raised md-primary" @click="getSchedules" >  <md-icon>cached</md-icon> 
           <md-tooltip md-direction="right"> 刷新 </md-tooltip>
           </md-button>
        	<!-- <md-button class="md-raised md-primary" @click="allDone" > 一键完成</md-button> -->
        </div>
      </md-table-toolbar>
                    <md-table-row v-bind:key="15">
										<md-table-head> </md-table-head> 
                            <md-table-head>内容</md-table-head>  <md-table-head>计划日期</md-table-head>  <md-table-head>百分比</md-table-head>  <md-table-head>完成日期</md-table-head> <md-table-head>备注 </md-table-head> <md-table-head>操作</md-table-head>
                    </md-table-row>

										 
                    <md-table-row class="item " v-bind:class="{newItem:newItemIndex == 'tasks' + key}"  @drop="drop($event,'taskIsMoving')" @dragover="allowDrop($event,'taskIsMoving')" v-for="(task,key) in schedules.tasks" v-bind:key="key" v-bind:id="key" >

										<md-table-cell class="md-table-cell"><p class="move"  draggable='true'  @dragstart="drag($event,'taskIsMoving')">
										<md-icon>arrow_right</md-icon>
										<!--{{key + 1}}-->
		</p> </md-table-cell> 

                  <md-table-cell class="title"> 
											
										<md-field data-md-clearable>									
										<md-textarea v-model="task.title"   md-autogrow></md-textarea>
               <!--  
                    <md-button v-show="task.title && task.title.length > 1" class="md-button md-icon-button md-dense md-input-action md-clear" @click="clear(task)" >
                      <md-icon>clear</md-icon>
                    </md-button> -->

									</md-field>
									</md-table-cell>

                    <md-table-cell class="w-160">
											 <div class="md-layout-item">
                            <md-field>		
                              <md-select md-dense v-model="task.scheduledDate" >
															<md-option v-for="(item,index2) in currentWeekDays"  :value="item.dateStr" :key="index2" >周{{item.week }}({{item.dateStr }})</md-option>
												</md-select>
                       </md-field>	
                       </div>

                    </md-table-cell>

                    <md-table-cell class="w-80 bl" > 		
												<md-field>	
                            <md-select md-dense v-model="task.percent" >
															<md-option ng-hide="item != '?'" v-for="(item,key) in percentList"  :value="item" :key="key" >{{item}} % </md-option>
												</md-select>

               
									</md-field>
                  
                  </md-table-cell> 

                        <md-table-cell class="w-160">
                          <div class="md-layout-item">
                            <md-field>		
													<md-select v-model="task.finishDate" md-dense  >
															<md-option v-for="(item,index2) in currentWeekDays"  :value="item.dateStr" :key="index2" >周{{item.week }}({{item.dateStr }})</md-option>
														</md-select>
                       </md-field>	
                       </div>
											</md-table-cell>


                        <md-table-cell>
																<md-field data-md-clearable>									
										<md-textarea v-model="task.remark"  md-autogrow> </md-textarea>
									</md-field>

												</md-table-cell>
                        <md-table-cell>
		 <md-menu md-size="small" md-dense>
      <md-button class="md-icon-button" md-menu-trigger >
        <md-icon>more_vert</md-icon>
      </md-button>

      <md-menu-content>
				  <md-menu-item @click="addTask('tasks',key)">
			 <md-icon>note_add</md-icon>
			 复制
				 <!--<md-tooltip md-direction="left">复制</md-tooltip>-->
				</md-menu-item>
				<md-menu-item  @click="removeTask('tasks',key)" v-show="schedules.tasks.length > 1"> <md-icon>remove</md-icon>
				移除
				 </md-menu-item>
        <md-menu-item v-show="false" @click="clearTask('tasks',key)" ><md-icon>delete_sweep</md-icon>
				擦除
			
				</md-menu-item>

      </md-menu-content>
    </md-menu>												
												</md-table-cell>
								
                       
                    </md-table-row>
										    </md-table>
						<!-- </transition-group>   -->

		<div class="action text-r">
			<md-button class="md-raised md-primary" @click="addTask('tasks',null)"  >  <md-icon  >add</md-icon>
      <md-tooltip md-direction="left">添加任务</md-tooltip>
      </md-button>
			<!--<md-button class="md-primary" @click="shuffle"  >反转</md-button>-->
		</div>

<!-- <transition-group name="list" class="report-table md-card"  v-bind:class="{move:extraIsMoving}" tag="md-table" > -->

<md-table name="list" class="report-table md-card md-dense" v-bind:class="{move:extraIsMoving}">
    <md-table-toolbar key="1616">
        <h1 class="md-title">本周额外任务</h1>
      </md-table-toolbar>
                    <md-table-row key="161">
											<md-table-head> </md-table-head> 
                            <md-table-head>内容</md-table-head>  <md-table-head>投入时间(小时)</md-table-head>  <md-table-head>完成日期</md-table-head> <md-table-head>备注 </md-table-head> <md-table-head>操作</md-table-head>
                    </md-table-row>

										 
                    <md-table-row class="item" @drop="drop($event,'extraIsMoving')" @dragover='allowDrop($event)' v-for="(task,key) in schedules.extraTasks" v-bind:key="key" v-bind:id="key" v-bind:class="{newItem:newItemIndex == 'extraTasks' + key}" >
										<md-table-cell class="md-table-cell "><p class="move"  draggable='true'  @dragstart="drag($event,'extraIsMoving')">
		<md-icon>arrow_right</md-icon>
		</p> </md-table-cell> 
                  <md-table-cell class="title"> 
									
										<md-field data-md-clearable>									
										<md-textarea v-model="task.title" md-autogrow></md-textarea>
                    <!--         <md-button v-show="task.title && task.title.length > 1" class="md-icon-button md-dense md-input-action md-clear" @click="clear(task)" >
                      <md-icon>clear</md-icon>
                    </md-button> -->
									</md-field>
									</md-table-cell>

                    <md-table-cell class="w-160"> 		
											<md-field>									
										<md-input v-model="task.hours"> </md-input>
									</md-field>
                  </md-table-cell> 

                        <md-table-cell class="w-160">
                          <div class="md-layout-item">
                            <md-field>		
													<md-select v-model="task.finishDate" md-dense  >
															<md-option v-for="(item,index2) in currentWeekDays"  :value="item.dateStr" :key="index2" >周{{item.week }}({{item.dateStr }})</md-option>
														</md-select>
                       </md-field>	
                       </div>
											</md-table-cell>


                        <md-table-cell class="w-250">
																<md-field data-md-clearable>									
										<md-textarea v-model="task.remark" md-autogrow></md-textarea>
									</md-field>

												</md-table-cell>
                        <md-table-cell>
		 <md-menu md-size="small" md-dense>
      <md-button class="md-icon-button" md-menu-trigger >
        <md-icon>more_vert</md-icon>
      </md-button>

            <md-menu-content>
				  <md-menu-item @click="addTask('extraTasks',key)">
			 <md-icon>note_add</md-icon>
			 复制
				 <!--<md-tooltip md-direction="left">复制</md-tooltip>-->
				</md-menu-item>
				<md-menu-item  @click="removeTask('extraTasks',key)"> <md-icon>remove</md-icon>
				移除
				 </md-menu-item>
        <md-menu-item v-show="false" @click="clearTask('extraTasks',key)" ><md-icon>delete_sweep</md-icon>
				擦除			
				</md-menu-item>

      </md-menu-content>

    </md-menu>
												</md-table-cell>
								
                       
                    </md-table-row>										   
					</md-table>
            <!-- </transition-group> -->

		<div class="action text-r">
			<md-button class="md-raised md-primary" @click="addTask('extraTasks',null)"  >  <md-icon  >add</md-icon>
      <md-tooltip md-direction="left">添加额外任务</md-tooltip>
      </md-button>
			<!--<md-button class="md-primary" @click="shuffle"  >反转</md-button>-->
		</div>

<!-- <transition-group name="list" class="report-table plan-table md-card"  v-bind:class="{move:plansIsMoving}" tag="md-table" > -->

	 <md-table  class="report-table md-card md-dense"  v-bind:class="{move:plansIsMoving}">

      <md-table-toolbar key="1717">
        <h1 class="md-title">下周计划</h1>
      </md-table-toolbar>

      <md-table-row key="171">
        <md-table-head > </md-table-head>
        <md-table-head>内容</md-table-head>
        <md-table-head>计划完成日期</md-table-head>
        <md-table-head>备注</md-table-head>
        <md-table-head>操作</md-table-head>
       
      </md-table-row>

       <md-table-row class="item" @drop="drop($event,'plansIsMoving')" @dragover='allowDrop($event)' v-for="(plan,key) in schedules.plans" v-bind:key="key" v-bind:id="key" v-bind:class="{newItem:newItemIndex == 'plans' + key}" >
	<md-table-cell class="md-table-cell w-50">
    <p class="move"  draggable='true'  @dragstart="drag($event,'plansIsMoving')">
		<md-icon>arrow_right</md-icon>
		</p> </md-table-cell> 

        <md-table-cell class="md-table-cell p-45"> 
          	<md-field data-md-clearable>									
										<md-textarea v-model="plan.title" md-autogrow> </md-textarea>
                      <!--       <md-button v-show="plan.title && plan.title.length > 1" class="md-icon-button md-dense md-input-action md-clear" @click="clear(plan)" >
                      <md-icon>clear</md-icon>
                    </md-button> -->
									</md-field> 
                  </md-table-cell>
        <md-table-cell >
              <div class="md-layout-item" >
                  <md-field>		
													<md-select v-model="plan.scheduledDate" md-dense >
															<md-option v-for="(item,index2) in nextWeekDays"  :value="item.dateStr" :key="index2" >周{{item.week }}({{item.dateStr }})</md-option>
														</md-select>
                       </md-field>	

                        <md-tooltip md-direction="top">{{plan.scheduledDate}}</md-tooltip>
               </div>
           </md-table-cell>
        <md-table-cell> 
               	<md-field data-md-clearable>									
										<md-textarea v-model="plan.remark" md-autogrow> </md-textarea>
									</md-field> 
           </md-table-cell>

        <md-table-cell>
		 <md-menu md-size="small" md-dense>
      <md-button class="md-icon-button" md-menu-trigger >
        <md-icon>more_vert</md-icon>
      </md-button>

            <md-menu-content>
				  <md-menu-item @click="addTask('plans',key)">
			 <md-icon>note_add</md-icon>
			 复制
				 <!--<md-tooltip md-direction="left">复制</md-tooltip>-->
				</md-menu-item>
				<md-menu-item  @click="removeTask('plans',key)" v-show="schedules.plans.length > 1"> <md-icon>remove</md-icon>
				移除
				 </md-menu-item>
        <md-menu-item v-show="false" @click="clearTask('plans',key)" ><md-icon>delete_sweep</md-icon>
				擦除			
				</md-menu-item>

      </md-menu-content>

    </md-menu>
	</md-table-cell>								
    
      </md-table-row>
       </md-table>
 <!-- </transition-group> -->


		<div class="action text-r">
			<md-button class="md-raised md-primary" @click="addTask('plans',null)" >  <md-icon >add</md-icon>
      <md-tooltip md-direction="left">添加下周计划</md-tooltip>
      </md-button>
			<!--<md-button class="md-primary" @click="shuffle"  >反转</md-button>-->
		</div>

<div class="mh-30">
  <md-progress-bar md-mode="indeterminate" v-if="isSubmiting" />
</div>
       


    <h3 v-show="isPosted" >你本周的周报已提交成功,现在可以修改</h3>

    	<p class="text-center">
	
		  <md-button class="md-raised md-primary"  @click="checkForm()" :disabled="isSubmiting">  {{isPosted ? '修改' :'提交'}}</md-button>
		</p>

            
    </form>

   <md-dialog-confirm
      :md-active.sync="showConfirm"
      md-title="你确定要提交周报吗?"
     md-content="请仔细检查,确认无误后,再提交"
      md-confirm-text="提交"
      md-cancel-text="预览周报"
      @md-cancel="onCancel"
      @md-confirm="onConfirm" />

    </div>
</template>

<script>
import { mapActions,mapGetters,mapState} from 'vuex'

export default {
  name: "task",
  data() {
    return {
      msg: "工作周报",
      message: "",
      currentFirstDate: "",
      movingDom: "",
      taskIsMoving: false,
      extraIsMoving: false,
      plansIsMoving: false,
			schedules:{},
      newItemIndex:null,
      twinkleOut:null,
      isSubmiting:false,
      showConfirm:false,
      percentList:[90,80,70,60,100,'?',0,50,40,30,20,10]
      //percentList:[0,10,20,30,40,50,60,70,80,90,100]
      //weekNumber:0,
      //isPosted:false
    };
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    ...mapState({
      'isPosted':state => state.report.isPosted,
      'weekNumber':state => state.report.weekNumber
    })
    /*
    weekNumber:function () { 
      return this.getWeekOfYear()
    }
    */
  },
	beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
		this.updateSchedules(this.schedules);
		next();
  },
  mounted() {

    console.log('task mounted');
    EventBus.$on('ready',()=>{
      console.log('get ready');     

      //this.getSchedules();

    })

    
    this.currentWeekDays = this.getWeekDays(new Date());

    let nextDate = this.addDate(this.currentWeekDays[0]['dateStr'],7);   
    

/*     let arrTmp =  nextDate.split('-');
     
     arrTmp.forEach(function(element,index,arr){
      if(element < 10){
          arr[index] =  '0' + element.toString()
            }       
　　  });

    arrTmp = arrTmp.join('-'); */

    var _this = this;

    this.nextWeekDays = this.getWeekDays(new Date(nextDate));

  
    if(this.isPosted){
       this.setTitle('工作周报 (已提交)');
    } else {
      this.setTitle('工作周报');
    }
		if(this.$store.state.report.schedules.tasks && this.$store.state.report.schedules.tasks.length >0){
			this.schedules = this.$store.state.report.schedules;
			return;		
    }
    /*
	this.schedules = {
		tasks:[],
		extraTasks:[],
		plans:[]
  };
  */
this.schedules = this.getSampleData();


/*
    let sampleextraTasks = this.getSampleData('extraTasks');
    this.schedules.extraTasks = [sampleextraTasks];
    
    let samplePlans = this.getSampleData('plans');
    this.schedules.plans = [samplePlans];
 */
//this.weekNumber = this.getWeekOfYear();

 this.getSchedules();

  },
  methods: {
		...mapActions([
      'setTitle',
      'updateSchedules',
			'setShowSnackbar'
    ]),
    dosubmit() {

         
      if(this.schedules.extraTasks.length > 0 && this.schedules.extraTasks[0]['title']){
        var extraTasksText = JSON.stringify(this.schedules.extraTasks);
      } else {
        var extraTasksText = '';
      }
  
      this.isSubmiting = true;

      var data = this.$qs.stringify({
        userId: this.userInfo.userId,
        userName:this.userInfo.userName,
        team:this.userInfo.team,
        department:this.userInfo.department,
        weekNumber:this.weekNumber,
        tasks:JSON.stringify(this.schedules.tasks),
        plans:JSON.stringify(this.schedules.plans),
        extraTasks:extraTasksText    
      });
      var postUrl = ''; 
      if(this.isPosted){
        postUrl = './index.php/report/updateSchedules';
      } else {
        postUrl = './index.php/report/postSchedules';
      }
      var _this = this;
      this.$axios.post(postUrl,
			data,
			).then(response => {
        this.isSubmiting = false;
        if(response.data.ok == true){
          this.$store.commit('updatePostStatus_req',true);

          this.setShowSnackbar({bMsg:response.data.msg,millisecond:1200});

          this.$router.push('/report'); 
		/* 	    setTimeout(()=>{
					this.setShowSnackbar(false);
					},1200) */
               
        } else {
          this.setShowSnackbar({bMsg:response.data.msg,millisecond:1200});
        }
        
      }).catch(function (error) {        
          _this.isSubmiting = false;
					console.log(error);
				 });
		
    },
    onCancel(){
      this.showConfirm = false;
     this.$router.push('/report');
    },
    onConfirm(){
      this.showConfirm = false;
     this.dosubmit();
    },
    checkForm(){

    //检查下周计划

    let promise1 = new Promise ( (resolve, reject) => {
    // begin
    if(this.schedules.plans.length < 1){
        	this.setShowSnackbar({bMsg:'请填写下周计划'});		
          reject();
      } else {
          this.schedules.plans.forEach(element => {
            if(element['title'] && element['title'].replace(/(^\s*)|(\s*$)/g,"") ){           
              resolve('resolve3');
            } else {
              this.setShowSnackbar({bMsg:'下周计划 没有填写完整'});	
              reject('reject3');
            }
          });
      }
      // end --
    } )

    //检查本周任务

    let promise2 = new Promise ( (resolve, reject) => {
    // begin
    
      if(this.schedules.tasks.length < 1){
        		this.setShowSnackbar({bMsg:'请填写本周任务'});		
            reject('reject4')
      } else {
          var taskCount = 0;
          this.schedules.tasks.forEach((element,index) => {
            
            //  && element['percent'] 
            if(element['title'] && element['title'].replace(/(^\s*)|(\s*$)/g,"") && element['percent'] != '?'){

              taskCount += 1;
              
            } else {
                let curTaskIndex = parseInt(index)+1;
                this.setShowSnackbar({bMsg:'本周第' + curTaskIndex + '个工作任务未填写完整'});
                this.twinkle(index,'tasks');     
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                reject('reject4');
                throw new Error('#32');
       
            }
       
          });
          //
          if(taskCount == this.schedules.tasks.length){
              resolve('resolve4');
          } else {
            reject('reject4');       
          }
      }
      // end --
    } )

     //检查额外任务
    let promise3 = new Promise ( (resolve, reject) => {
    // begin        
     if(this.schedules.extraTasks.length > 0){
          this.schedules.extraTasks.forEach(element => {
            if(element['title'] && element['title'].replace(/(^\s*)|(\s*$)/g,"")){
             
              resolve('resolve5');
            } else {
              this.setShowSnackbar({bMsg:'本周额外任务 未填写完整,请检查'}); 
              reject('reject5');
          
            }
          });
     } else {
       resolve('resolve56');
     }

      // end --
    } )

      var promiseAll = Promise.all( [promise3, promise2, promise1] );

      var _this = this;
      promiseAll.then((res)=>{
        console.log('res',res);  
          //this.dosubmit();
          _this.showConfirm = true;
      }  
      ).catch(function(e) {
        _this.isSubmiting = false;
        console.log('e3',e);   

      }

      )
          
    },
    combineList(){
      var _this = this;
      
      //将服务返回的日期,也push到nextWeekDays数组里
      this.schedules.plans.forEach(elementPlan => {
        let count = 0;

        _this.nextWeekDays.forEach(elementNextWeekDays => {
          
            if(elementPlan.scheduledDate != elementNextWeekDays.dateStr){

              count += 1;
  
            }
        });  
        //如果都匹配不上就push
        if(count == _this.nextWeekDays.length && elementPlan.scheduledDate){

          // new Date(nextDate)

          let tempObj =  this.formatDate(new Date(elementPlan.scheduledDate));

          _this.nextWeekDays.push(tempObj);

        }
        
      });
      // console.log('this.nextWeekDays',this.nextWeekDays);

    },
    getSchedules(){

      this.$store.commit('setLoading_req',true);

      let userId = this.getCookie('userId');
 
      var data = this.$qs.stringify({
        // userId: this.userInfo.userId,
        userId: userId,
        weekNumber:this.weekNumber
      });
      var _this = this;
    	this.$axios.post('./index.php/report/getSchedules',
			data,
			).then(response => {
        this.$store.commit('setLoading_req',false) 
        if(response.data){
          this.renderData(response.data);      
					//提交mutation到Store
					//this.$store.commit('updateinfo_req',response.data); 
         
        } else {
          this.setShowSnackbar({bMsg:'错误#02'});
        }
      }).catch( (error) => {
          _this.$store.commit('setLoading_req',false) 
					console.log(error);
				 });


    },
    renderData(resdata){
      //如果本周提交了
      if(resdata.thisWeek){ 
          //this.isPosted = true;
          this.setTitle('工作周报 (已提交)');
          this.$store.commit('updatePostStatus_req',true);

          if(resdata.thisWeek.tasks.length > 1){
              this.schedules.tasks = JSON.parse(resdata.thisWeek.tasks);       
          }
     
          if(resdata.thisWeek.plans.length > 1){
               this.schedules.plans = JSON.parse(resdata.thisWeek.plans);

          }
          if(resdata.thisWeek.extraTasks.length > 1){
              this.schedules.extraTasks = JSON.parse(resdata.thisWeek.extraTasks);            
          }
         

      } else if(resdata.prevWeek && resdata.prevWeek.plans){

          this.schedules.tasks = JSON.parse(resdata.prevWeek.plans);
          this.schedules.tasks.forEach(element => {
              element['scheduledDate'] = element['scheduledDate'];
              element['finishDate'] = element['scheduledDate'];
              if(!element['percent'] || !element['percent'].length){
                element['percent'] = '?';
              }

              if(!element['remark'] || element['remark'] == 'null'){
                element['remark'] = '';
              }
          });
   

      } else {
            let sampleTask = this.getSampleData('tasks');
            this.schedules.tasks = [sampleTask];   

      }

      this.combineList();

    },
    addTask(taskType,index) {
			if(!taskType){
				return;
			}
      if (index == 0 || index) {
        this.schedules[taskType].splice(
          index + 1,
          0,
          JSON.parse(JSON.stringify(this.schedules[taskType][index]))
        );
        this.twinkle(index + 1,taskType);

        return;
      }


      let tmpItem = this.getSampleData(taskType);         

   
      if(this.schedules[taskType] && this.schedules[taskType].length > 0){
            let lastItem = JSON.stringify(this.schedules[taskType][this.schedules[taskType].length - 1]);
            lastItem = JSON.parse(lastItem);

          if(tmpItem.scheduledDate){
              let tmpSd = new Date(lastItem.scheduledDate);
             
              if (tmpSd.getDay() != 0) {
                  tmpItem.scheduledDate = this.addDate(lastItem.scheduledDate, 1);                 
              } else {

                  tmpItem.scheduledDate = lastItem.scheduledDate;
              }
          }
          if(tmpItem.finishDate){
              let tmpfd = new Date(lastItem.finishDate);
              if (tmpfd.getDay() != 0) {
                tmpItem.finishDate = this.addDate(lastItem.finishDate, 1);
              } else {

                  tmpItem.finishDate = lastItem.finishDate;
              }
          }
      }

      

      this.schedules[taskType].push(tmpItem);
    },
    removeTask(taskType,index) {
      if (index != 0 && !index) {
        return;
      }
      this.schedules[taskType].splice(index, 1);
    },
    clearTask(taskType,index) {
      this.schedules[taskType][index].title = "";
      this.schedules[taskType][index].percent = '?';
      this.schedules[taskType][index].remark = "";
    },
    getSampleData(type){

      if(type == 'tasks'){
        return {
                      title: "",
                        scheduledDate: this.currentWeekDays[0].dateStr,
                        percent: '?',
                        finishDate: this.currentWeekDays[0].dateStr,
                        remark: ""
                      }

      }
      if(type == 'plans'){
        return {
                  title: "",
                  scheduledDate: this.nextWeekDays[0].dateStr,
                  remark: ""
                }


      }
      if(type == 'extraTasks'){
        return  {
                  title: "",
                  hours: "2",
                  finishDate: this.currentWeekDays[0].dateStr,
                  remark: ""
                }


      }
      return {
          tasks:[
                  {
                      title: "",
                        scheduledDate: this.currentWeekDays[0].dateStr,
                        percent: '?',
                        finishDate: this.currentWeekDays[0].dateStr,
                        remark: ""
                      }
                    ],          
          extraTasks:[
                
              ],
          plans:[
                {
                  title: "",
                  scheduledDate: this.nextWeekDays[0].dateStr,
                  remark: ""
                }
              ]
          }
    },
    formatDate(date) {
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var week = ["日", "一", "二", "三", "四", "五", "六"][date.getDay()];
      
      //如果不够2位,数字前补0
      //month = (Array(2).join('0') + month).slice(-2)
      //day = (Array(2).join('0') + day).slice(-2)

      if(month < 10){
          month =  '0' + month.toString()
      }
      if(day < 10){
          day =  '0' + day.toString()
      }   

      return {
        dateStr: year + "-" + month + "-" + day,
        week: week,
        index: date.getDay()
      };
    },
    getWeekDays(date) {
      // console.log('date##',date);
      var week = date.getDay() - 1;
      date.setDate(date.getDate() + week * -1);
      this.currentFirstDate = new Date(date);

      let weekDays = [];

      for (var i = 0; i < 7; i++) {
        var weekDay = "";
        if (i == 0) {
          weekDay = this.formatDate(date);
        } else {
          date.setDate(date.getDate() + 1);
          weekDay = this.formatDate(date);
        }

        weekDays.push(weekDay);
      }
      return weekDays;
    },    
    getWeekOfYear() {
      var today = new Date();
      var firstDay = new Date(today.getFullYear(),0, 1);
      var dayOfWeek = firstDay.getDay(); 
      var spendDay= 1;
      if (dayOfWeek !=0) {
        spendDay=7-dayOfWeek+1;
      }
      firstDay = new Date(today.getFullYear(),0, 1+spendDay);
      var d =Math.ceil((today.valueOf()- firstDay.valueOf())/ 86400000);
      var result =Math.ceil(d/7);
      return result+1;
    },
    addDate(date, days) {
    
      var d = new Date(date.replace(/-/g,"/") );
      d.setDate(d.getDate() + days);
      var month = d.getMonth() + 1;
      var day = d.getDate();
      if(month < 10){
        month = '0' + month.toString();
      }
    if(day < 10){
        day = '0' + day.toString();
      }
      return d.getFullYear() + "-" + month + "-" + day;
    },
    //拖放操作
    drag: function(event,tabletype) {
      this.movingDom = event.currentTarget;
      this[tabletype] = true;
    },
    drop: function(event,tabletype) {
      event.preventDefault();
      this[tabletype] = false;
			var taskType = '';
			switch(tabletype){
				case 'taskIsMoving':
					taskType = 'tasks';
					break;
				case 'extraIsMoving':
					taskType = 'extraTasks';
					break;
				case 'plansIsMoving':
					taskType = 'plans';
					break;
				default:
					return;
			
			}

      var curNode = event.target.parentNode;
      while (curNode.tagName != "TR") {
        //result.push(x);
        curNode = curNode.parentNode;
      }
			while (this.movingDom.tagName != "TR") {
        this.movingDom = this.movingDom.parentNode;
      }
    
      let targetId = curNode.getAttribute("id");
      let movingId = this.movingDom.getAttribute("id");

      if (Math.abs(targetId - movingId) >= 2) {
        //数组交换位置
        //this.tasks[targetId] = this.schedules[taskType].splice(movingId, 1, this.schedules[taskType][targetId])[0];

        //移动数组
        if (movingId > targetId) {
          let tempVal = JSON.stringify(this.schedules[taskType][movingId]);
          this.schedules[taskType].splice(movingId, 1);
          this.schedules[taskType].splice(targetId, 0, JSON.parse(tempVal));
          this.twinkle(targetId,taskType);	
        } else {
          this.twinkle(targetId-1,taskType);	
          this.schedules[taskType].splice(targetId, 0, this.schedules[taskType][movingId]);
          this.schedules[taskType].splice(movingId, 1);
        }
        
      }
    },
    allowDrop: function(event) {
      event.preventDefault();
    },
    shuffle() {
      this.tasks.reverse();
    },
    twinkle(index,taskType){
      clearTimeout(this.twinkleOut);
      this.newItemIndex = taskType + index;        
        var _this = this;
       this.twinkleOut =  setTimeout(()=>{
            _this.newItemIndex = null;
        },2000);
    },
    allDone(){
       this.setShowSnackbar({bMsg:'还没做',millisencond:500});
         
    },
    clear(item){
      item.title = ' ';
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
/* h1,
h2 {
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
} */

.task {
  /*
  .list-enter-active,
  .list-leave-active {
    transition: all 0.3s;
  }
  .list-enter,
  .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
 
  }
   .list-move {
    transition: all 1s;
  }
  .list-move-active {
    position: absolute;
  } */

  .action {
    margin-bottom: 25px;
  }
  .text-r {
    text-align: right;
  }
  .report-table {
    margin: 0 auto;
    p.move:hover {
      //background: #eee;
      cursor: move;
    }
  }
	.report-table.move {
			border-collapse:collapse;
			tr.item {
				border: 2px dashed #ccc;
			}
	
	}


  select {
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
    /*appearance: none;*/
    font-size: 14px;
  }
  select option {
    line-height: 30px;
  }
  input.drop:hover {
    
  }
}
</style>
