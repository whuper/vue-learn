<template>
  <div class="task">
    <!--<h1>{{ msg }}</h1>-->
    <!--<h2>本周工作小结</h2>-->
		<div class="action main text-r">
			<md-button class="md-raised md-primary" @click="addTask(null)"  >  <md-icon  >add</md-icon>
      <md-tooltip md-direction="left">添加任务</md-tooltip>
      </md-button>
			<md-button class="md-primary" @click="shuffle"  >反转</md-button>
		</div>
		
    <form novalidate >

			 <transition-group name="list" class="report-table"  v-bind:class="{move:isMoving}" tag="md-table" >
                    <md-table-row v-bind:key="88">
                            <md-table-head>内容</md-table-head>  <md-table-head>计划日期</md-table-head>  <md-table-head>百分比</md-table-head>  <md-table-head>完成日期</md-table-head> <md-table-head>备注 </md-table-head> <md-table-head>操作</md-table-head>
                    </md-table-row>

										 
                    <md-table-row class="item" draggable='true' @drop='drop($event)' @dragover='allowDrop($event)' @dragstart='drag($event)' v-for="(task,key,index) in tasks" v-bind:key="key" v-bind:id="key" >
                  <md-table-cell> 
									
										<md-field>									
										<md-input v-model="task.title" ></md-input>
									</md-field>
									</md-table-cell>

                    <md-table-cell>
											 <div class="md-layout-item">
                            <md-field>		
                              <md-select v-model="task.scheduledDate" >
															<md-option v-for="(item,index2) in currentWeekDays"  :value="item.dateStr" :key="index2" >周{{item.week }}({{item.dateStr }})</md-option>
												</md-select>
                       </md-field>	
                       </div>

                    </md-table-cell>

                    <md-table-cell> 		
												<md-field>									
										<!-- <md-input v-model="task.percent" ></md-input> -->
										<input type="range" v-model.number="task.percent"> {{ task.percent }}%
									</md-field></md-table-cell> 

                        <md-table-cell>
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
    
        <md-menu-item> <md-button @click="addTask(key)"  > <md-icon>note_add</md-icon>复制</md-button></md-menu-item>
        <md-menu-item> <md-button class="md-primary" @click="removeTask(key)" :disabled="tasks.length ==1"> <md-icon>delete</md-icon>移除</md-button> </md-menu-item>
        <md-menu-item>	<md-button @click="clearTask(key)"  > <md-icon>delete_sweep</md-icon>擦除</md-button> </md-menu-item>

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

            <!--
           			 <transition-group name="list" class="report-table"  v-bind:class="{move:isMoving}" tag="ul" >

                            <li class="item" v-for="(task,key,index) in tasks" v-bind:key="key" v-bind:id="key" >
                                    {{task.scheduledDate}}      </li>


</transition-group>
            -->

				<p>
	
		  <md-button class="md-raised md-primary" @click="dosubmit" >  提交</md-button>
		</p>
            
    </form>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "工作周报",
      message: "",
      currentFirstDate: "",
      currentWeekDays: [],
      tasks: [],
      movingDom: "",
      isMoving: false
    };
  },
  mounted() {
    this.getWeekDays(new Date());
    this.tasks = [
      {
        title: "1",
        scheduledDate: this.currentWeekDays[0].dateStr,
        percent: "1",
        FinishDate: this.currentWeekDays[0].dateStr,
        remark: "1"
      }
    ];
  },
  methods: {
    dosubmit() {
      console.log("##提交");
    },
    addTask(index) {
      if (index == 0 || index) {
        this.tasks.splice(
          index + 1,
          0,
          JSON.parse(JSON.stringify(this.tasks[index]))
        );
        return;
      }

      let tmpItem = JSON.stringify(this.tasks[this.tasks.length - 1]);
      tmpItem = JSON.parse(tmpItem);

      let tmpSd = new Date(tmpItem.scheduledDate);
      if (tmpSd.getDay() != 0) {
        tmpItem.scheduledDate = this.addDate(tmpItem.scheduledDate, 1);
      }

      let tmpfd = new Date(tmpItem.FinishDate);
      if (tmpfd.getDay() != 0) {
        tmpItem.FinishDate = this.addDate(tmpItem.FinishDate, 1);
      }

      this.tasks.push(tmpItem);
    },
    removeTask(index) {
      if (index != 0 && !index) {
        return;
      }
      this.tasks.splice(index, 1);
    },
    clearTask(index) {
      this.tasks[index].title = "";
      this.tasks[index].percent = "";
      this.tasks[index].remark = "";
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
    drag: function(event) {
      this.movingDom = event.currentTarget;
      this.isMoving = true;
    },
    drop: function(event) {
      event.preventDefault();
      this.isMoving = false;

      console.log(event.target.tagName);
      var curNode = event.target.parentNode;
      while (curNode.tagName != "TR") {
        //result.push(x);
        curNode = curNode.parentNode;
      }
      console.log("event.target", curNode.getAttribute("id"));
      console.log("movingDom", this.movingDom.getAttribute("id"));

      let targetId = curNode.getAttribute("id");
      let movingId = this.movingDom.getAttribute("id");

      if (Math.abs(targetId - movingId) >= 2) {
        //数组交换位置
        //this.tasks[targetId] = this.tasks.splice(movingId, 1, this.tasks[targetId])[0];

        //移动数组
        if (movingId > targetId) {
          let tempVal = JSON.stringify(this.tasks[movingId]);
          this.tasks.splice(movingId, 1);
          this.tasks.splice(targetId, 0, JSON.parse(tempVal));
        } else {
          this.tasks.splice(targetId, 0, this.tasks[movingId]);
          this.tasks.splice(movingId, 1);
        }
      }
    },
    allowDrop: function(event) {
      event.preventDefault();
    },
    shuffle() {
      this.tasks.reverse();
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

  .main {
    width: 1000px;
    margin: 0 auto;
  }
  .action {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .text-r {
    text-align: right;
  }
  .report-table {
    margin: 0 auto;
    tr.item:hover {
      //background: #eee;
      cursor: move;
    }
  }
  .report-table.move {
    //border-collapse:separate;
  }
  .report-table.move tr.item {
    border: 1px dashed #555;
  }

  .report-table tr {
    line-height: 35px;
  }
  .report-table tr td:first-child {
    padding-left: 20px;
  }
  .report-table td,
  .report-table th {
    text-align: left;
    /*border: 1px solid #ccc;*/
  }
  .report-table td input {
    //max-width: 150px;
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
