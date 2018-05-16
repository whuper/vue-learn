<template>
<div class="task md-layout-item md-size-90 md-large-size-80 md-xlarge-size-60 ma">
    <!--<h1>{{ msg }}</h1>-->
    <form novalidate >

<transition-group name="list" class="report-table md-card"  v-bind:class="{move:taskIsMoving}" tag="md-table" >
    <md-table-toolbar key="8989">
         <div class="md-toolbar-section-start">
        <h1 class="md-title">本周工作小结</h1>
        </div>

        <div class="md-toolbar-section-end">
        	<md-button class="md-raised md-primary" @click="" > 一键完成</md-button>
        </div>
      </md-table-toolbar>
                    <md-table-row v-bind:key="88">
										<md-table-head> </md-table-head> 
                            <md-table-head>内容</md-table-head>  <md-table-head>计划日期</md-table-head>  <md-table-head>完成百分比</md-table-head>  <md-table-head>完成日期</md-table-head> <md-table-head>备注 </md-table-head> <md-table-head>操作</md-table-head>
                    </md-table-row>

										 
                    <md-table-row class="item " v-bind:class="{newItem:newItemIndex == 'tasks' + key}"  @drop="drop($event,'taskIsMoving')" @dragover="allowDrop($event,'taskIsMoving')" v-for="(task,key,index) in schedules.tasks" v-bind:key="key" v-bind:id="key" >

										<md-table-cell class="md-table-cell w-50"><p class="move"  draggable='true'  @dragstart="drag($event,'taskIsMoving')">
										<md-icon>arrow_right</md-icon>
										<!--{{key + 1}}-->
		</p> </md-table-cell> 
                  <md-table-cell> 
											
										<md-field >									
										<md-input v-model="task.title" ></md-input>
									</md-field>
									</md-table-cell>

                    <md-table-cell class="w-160">
											 <div class="md-layout-item">
                            <md-field>		
                              <md-select v-model="task.scheduledDate" >
															<md-option v-for="(item,index2) in currentWeekDays"  :value="item.dateStr" :key="index2" >周{{item.week }}({{item.dateStr }})</md-option>
												</md-select>
                       </md-field>	
                       </div>

                    </md-table-cell>

                    <md-table-cell class="percent" > 		
												<md-field>									
										<!-- <md-input v-model="task.percent" ></md-input> -->
										<input type="range" v-model.number="task.percent"> {{ task.percent }}%
									</md-field></md-table-cell> 

                        <md-table-cell class="w-160">
                          <div class="md-layout-item">
                            <md-field>		
													<md-select v-model="task.FinishDate" >
															<md-option v-for="(item,index2) in currentWeekDays"  :value="item.dateStr" :key="index2" >周{{item.week }}({{item.dateStr }})</md-option>
														</md-select>
                       </md-field>	
                       </div>
											</md-table-cell>


                        <md-table-cell>
																<md-field>									
										<md-input v-model="task.remark" ></md-input>
									</md-field>

												</md-table-cell>
                        <md-table-cell>
		 <md-menu md-size="small">
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
        <md-menu-item @click="clearTask('tasks',key)" ><md-icon>delete_sweep</md-icon>
				擦除
			
				</md-menu-item>

      </md-menu-content>
    </md-menu>
<!--
		<md-speed-dial class="md-top-left" md-event="click"  md-direction="bottom">
      <md-speed-dial-target class="md-primary">
        <md-icon>edit</md-icon>
      </md-speed-dial-target>

      <md-speed-dial-content>
        <md-button class="md-icon-button" @click="addTask(key)" >
          <md-icon>add</md-icon>
        </md-button>

        <md-button class="md-icon-button"  @click="clearTask(key)" >
          <md-icon>note</md-icon>
        </md-button>
				
				 <md-button class="md-icon-button" @click="removeTask(key)" :disabled="tasks.length ==1">
          <md-icon>delete</md-icon>
        </md-button>
      </md-speed-dial-content>

    </md-speed-dial>
		-->

												
												</md-table-cell>
								
                       
                    </md-table-row>
										   
						</transition-group>

		<div class="action text-r">
			<md-button class="md-raised md-primary" @click="addTask('tasks',null)"  >  <md-icon  >add</md-icon>
      <md-tooltip md-direction="left">添加任务</md-tooltip>
      </md-button>
			<!--<md-button class="md-primary" @click="shuffle"  >反转</md-button>-->
		</div>

            <!--
           			 <transition-group name="list" class="report-table"  v-bind:class="{move:isMoving}" tag="ul" >

                            <li class="item" v-for="(task,key,index) in tasks" v-bind:key="key" v-bind:id="key" >
                                    {{task.scheduledDate}}      </li>


</transition-group>
            -->

<md-table name="list" class="report-table md-card"  v-bind:class="{move:extraIsMoving}">
    <md-table-toolbar>
        <h1 class="md-title">本周额外任务</h1>
      </md-table-toolbar>
                    <md-table-row>
											<md-table-head> </md-table-head> 
                            <md-table-head>内容</md-table-head>  <md-table-head>投入时间(小时)</md-table-head>  <md-table-head>完成日期</md-table-head> <md-table-head>备注 </md-table-head> <md-table-head>操作</md-table-head>
                    </md-table-row>

										 
                    <md-table-row class="item" @drop="drop($event,'extraIsMoving')" @dragover='allowDrop($event)' v-for="(task,key,index) in schedules.extratTasks" v-bind:key="key" v-bind:id="key" v-bind:class="{newItem:newItemIndex == 'extratTasks' + key}" >
										<md-table-cell class="md-table-cell "><p class="move"  draggable='true'  @dragstart="drag($event,'extraIsMoving')">
		<md-icon>arrow_right</md-icon>
		</p> </md-table-cell> 
                  <md-table-cell> 
									
										<md-field>									
										<md-input v-model="task.title" ></md-input>
									</md-field>
									</md-table-cell>

                    <md-table-cell class="w-160"> 		
												<md-field>									
										<md-input v-model="task.hours"> </md-input>
									</md-field></md-table-cell> 

                        <md-table-cell class="w-160">
                          <div class="md-layout-item">
                            <md-field>		
													<md-select v-model="task.FinishDate" >
															<md-option v-for="(item,index2) in currentWeekDays"  :value="item.dateStr" :key="index2" >周{{item.week }}({{item.dateStr }})</md-option>
														</md-select>
                       </md-field>	
                       </div>
											</md-table-cell>


                        <md-table-cell class="w-250">
																<md-field>									
										<md-input v-model="task.remark" ></md-input>
									</md-field>

												</md-table-cell>
                        <md-table-cell>
		 <md-menu md-size="small">
      <md-button class="md-icon-button" md-menu-trigger >
        <md-icon>more_vert</md-icon>
      </md-button>

            <md-menu-content>
				  <md-menu-item @click="addTask('extratTasks',key)">
			 <md-icon>note_add</md-icon>
			 复制
				 <!--<md-tooltip md-direction="left">复制</md-tooltip>-->
				</md-menu-item>
				<md-menu-item  @click="removeTask('extratTasks',key)" v-show="schedules.extratTasks.length > 1"> <md-icon>remove</md-icon>
				移除
				 </md-menu-item>
        <md-menu-item @click="clearTask('extratTasks',key)" ><md-icon>delete_sweep</md-icon>
				擦除			
				</md-menu-item>

      </md-menu-content>

    </md-menu>
												</md-table-cell>
								
                       
                    </md-table-row>
										   
						</md-table>

		<div class="action text-r">
			<md-button class="md-raised md-primary" @click="addTask('extratTasks',null)"  >  <md-icon  >add</md-icon>
      <md-tooltip md-direction="left">添加额外任务</md-tooltip>
      </md-button>
			<!--<md-button class="md-primary" @click="shuffle"  >反转</md-button>-->
		</div>


	 <md-table  class="report-table md-card"  v-bind:class="{move:plansIsMoving}">
      <md-table-toolbar>
        <h1 class="md-title">下周计划</h1>
      </md-table-toolbar>

      <md-table-row>
        <md-table-head > </md-table-head>
        <md-table-head>内容</md-table-head>
        <md-table-head>计划完成日期</md-table-head>
        <md-table-head>备注</md-table-head>
        <md-table-head>操作</md-table-head>
       
      </md-table-row>

       <md-table-row class="item" @drop="drop($event,'plansIsMoving')" @dragover='allowDrop($event)' v-for="(plan,key,index) in schedules.plans" v-bind:key="key" v-bind:id="key" v-bind:class="{newItem:newItemIndex == 'plans' + key}" >
										<md-table-cell class="md-table-cell "><p class="move"  draggable='true'  @dragstart="drag($event,'plansIsMoving')">
		<md-icon>arrow_right</md-icon>
		</p> </md-table-cell> 

        <md-table-cell> {{plan.title}} </md-table-cell>
        <md-table-cell> {{plan.scheduledDate}} </md-table-cell>
        <md-table-cell>{{plan.remark}}  </md-table-cell>

        <md-table-cell>
		 <md-menu md-size="small">
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
        <md-menu-item @click="clearTask('plans',key)" ><md-icon>delete_sweep</md-icon>
				擦除			
				</md-menu-item>

      </md-menu-content>

    </md-menu>
												</md-table-cell>
								
    
      </md-table-row>


    </md-table>
		<div class="action text-r">
			<md-button class="md-raised md-primary" @click="addTask('plans',null)" >  <md-icon >add</md-icon>
      <md-tooltip md-direction="left">添加下周计划</md-tooltip>
      </md-button>
			<!--<md-button class="md-primary" @click="shuffle"  >反转</md-button>-->
		</div>




				<p class="text-center">
	
		  <md-button class="md-raised md-primary" @click="dosubmit" >  提交</md-button>
		</p>

            
    </form>

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
      currentWeekDays: [],
      movingDom: "",
      taskIsMoving: false,
      extraIsMoving: false,
      plansIsMoving: false,
			schedules:{},
      newItemIndex:null,
      twinkleOut:null
    };
  },
	beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
		this.updateSchedules(this.schedules);
		next();
  },
  mounted() {
    this.getWeekDays(new Date());
		this.setTitle('工作周报');
		if(this.$store.state.report.schedules.tasks.length >0){
			this.schedules = this.$store.state.report.schedules;
			return;		
		}
		this.schedules = {
		tasks:[],
		extratTasks:[],
		plans:[]
	};
  this.schedules.tasks = [
      {
        title: "本周任务1",
        scheduledDate: this.currentWeekDays[0].dateStr,
        percent: "50",
        FinishDate: this.currentWeekDays[0].dateStr,
        remark: "备注1"
      }
    ];
		
		this.schedules.extratTasks = [
      {
        title: "额外任务1",
        hours: "2",
        FinishDate: this.currentWeekDays[0].dateStr,
        remark: "备注1"
      }
    ];
    this.schedules.plans = [
      {
        title: "下周计划1",
        scheduledDate: this.currentWeekDays[0].dateStr,
        remark: "备注1"
      }
    ];
  },
  methods: {
		...mapActions([
      'setTitle',
      'updateSchedules',
			'setShowSnackbar'
    ]),
    dosubmit() {
			this.setShowSnackbar('ok');
			setTimeout(()=>{
					this.setShowSnackbar(false);
					},1200)
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

      let tmpItem = JSON.stringify(this.schedules[taskType][this.schedules[taskType].length - 1]);
      tmpItem = JSON.parse(tmpItem);

      let tmpSd = new Date(tmpItem.scheduledDate);
      if (tmpSd.getDay() != 0) {
        tmpItem.scheduledDate = this.addDate(tmpItem.scheduledDate, 1);
      }

      let tmpfd = new Date(tmpItem.FinishDate);
      if (tmpfd.getDay() != 0) {
        tmpItem.FinishDate = this.addDate(tmpItem.FinishDate, 1);
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
      this.schedules[taskType][index].percent = 50;
      this.schedules[taskType][index].remark = "";
    },
    formatDate(date) {
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var week = ["日", "一", "二", "三", "四", "五", "六"][date.getDay()];

      return {
        dateStr: year + "-" + month + "-" + day,
        week: week,
        index: date.getDay()
      };
    },
    getWeekDays(date) {
      var week = date.getDay() - 1;
      date.setDate(date.getDate() + week * -1);
      this.currentFirstDate = new Date(date);

      for (var i = 0; i < 7; i++) {
        var weekDay = "";
        if (i == 0) {
          weekDay = this.formatDate(date);
        } else {
          date.setDate(date.getDate() + 1);
          weekDay = this.formatDate(date);
        }

        this.currentWeekDays.push(weekDay);
      }
    },
    addDate(date, days) {
      var d = new Date(date);
      d.setDate(d.getDate() + days);
      var m = d.getMonth() + 1;
      return d.getFullYear() + "-" + m + "-" + d.getDate();
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
					taskType = 'extratTasks';
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
h1,
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
}
.task {
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
  }
  .report-table li {
  }


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
  .report-table td input {
    //max-width: 150px;
  }
.report-table td.percent {
min-width:180px;
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
