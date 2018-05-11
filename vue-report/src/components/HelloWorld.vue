<template>
  <div class="task">
    <!--<h1>{{ msg }}</h1>-->
    <!--<h2>本周工作小结</h2>-->
		<div class="action main text-r">
			<button type="button" class="btn" @click="addTask(null)"  >添加</button>
			<button type="button" class="btn" @click="shuffle"  >随机</button>
		</div>
		
    <form novalidate >

			 <transition-group name="list" class="report-table"  v-bind:class="{move:isMoving}" tag="table" >
                    <tr v-bind:key="88">
                    <th>内容</th>  <th>计划日期</th>  <th>百分比</th>  <th>完成日期</th> <th>备注</th> <th>操作</th>
                    </tr>

										 
                    <tr class="item" draggable='true' @drop='drop($event)' @dragover='allowDrop($event)' @dragstart='drag($event)' v-for="(task,key,index) in tasks" v-bind:key="key" v-bind:id="key" >
                    <td> <input type="text" class="drop" v-model="task.title" /> </td>  
                    <td>
											<div class="select">
												
											</div>
											
												<select v-model="task.scheduledDate" >
															<option v-for="(item,index2) in currentWeekDays"  :value="item.dateStr">周{{item.week }}({{item.dateStr }})</option>
												</select>
										</td>  
                    <td><input type="text" v-model="task.percent" /> </td> 
                        <td>
													<select v-model="task.FinishDate" >
															<option v-for="(item,index2) in currentWeekDays"  :value="item.dateStr">周{{item.week }}({{item.dateStr }})</option>
												</select>
											</td>
                        <td><input type="text" v-model="task.remark"  /> </td>
                        <td>
													<button type="button" class="btn" @click="removeTask(key)" :disabled="tasks.length ==1">移除</button>
													<button type="button" class="btn" @click="addTask(key)" >复制</button>
													<button type="button" class="btn" @click="clearTask(key)" >重置</button>
												</td>
								
                       
                    </tr>
										   
						</transition-group>


				<p>
		<button type="button" class="btn" @click="dosubmit"  >提交</button>
		</p>
            
    </form>
    </div>
</template>

<script>
import { mapActions,mapGetters } from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      message: '',
			currentFirstDate:'',
			currentWeekDays:[],
			tasks:[],
			movingDom:'',
			isMoving:false
    }
  },
	mounted(){
    this.getWeekDays(new Date());
		this.tasks = [
			{
				title:'1',
				scheduledDate:this.currentWeekDays[0].dateStr,
				percent:'1',
				FinishDate:this.currentWeekDays[0].dateStr,
				remark:'1',
			
			}]
  },
  methods: {
				dosubmit(){
					console.log('##提交');				 
						 },
				addTask(index){

					if(index == 0 || index){
						console.log('追加'+ index);
							this.tasks.splice( index+1,0,JSON.parse( JSON.stringify(this.tasks[index]) ) );
							return;
					} 

					let tmpItem = JSON.stringify( this.tasks[this.tasks.length-1] );
					tmpItem = JSON.parse(tmpItem);

					let tmpSd = new Date(tmpItem.scheduledDate);
					console.log(tmpSd.getDay());
					if(	tmpSd.getDay() != 0){
							tmpItem.scheduledDate = this.addDate(tmpItem.scheduledDate,1);
					}

					let tmpfd = new Date(tmpItem.FinishDate);
					if(tmpfd.getDay() != 0){
							tmpItem.FinishDate = this.addDate(tmpItem.FinishDate,1);
					}

								 
					
					this.tasks.push(tmpItem);	
					
						 },
				removeTask(index){
					if(index != 0 && !index){
						return;					
					}
					this.tasks.splice(index, 1);
				},
				clearTask(index){
										this.tasks[index].title = '';
										this.tasks[index].percent = '';
										this.tasks[index].remark = '';
				},
				formatDate(date){
						  var year = date.getFullYear();
							var month = (date.getMonth()+1) ;
							var day = date.getDate() ;
							var week = ['日','一','二','三','四','五','六'][date.getDay()];  

							return {
										dateStr: year + '-' +  month + '-' + day,
										week:	week,
										index:date.getDay()
								}
				},
				getWeekDays(date){             
                var week = date.getDay()-1;
                date.setDate(date.getDate() + week*-1); 
                this.currentFirstDate = new Date(date);

                for(var i = 0;i<7;i++){
									var weekDay = '';
									if(i==0) {
											weekDay = this.formatDate(date);
									} else {
											date.setDate(date.getDate()+1);
											weekDay = this.formatDate(date);
									}
									
                  this.currentWeekDays.push( weekDay );
                }                
								console.log(this.currentWeekDays);
            },
						addDate(date,days){ 
							 var d = new Date(date); 
							 d.setDate(d.getDate() + days); 
							 var m = d.getMonth() + 1; 
							 return d.getFullYear()+'-'+m+'-'+d.getDate(); 
						 },
						//拖放操作
						drag:function(event){
               this.movingDom = event.currentTarget;
               this.isMoving = true;
            },
            drop:function(event){
              event.preventDefault();
							this.isMoving = false;
							console.log('event.target',event.target.parentNode.getAttribute('id'));
							console.log('movingDom',this.movingDom.getAttribute('id'));

							let targetId = event.target.parentNode.getAttribute('id');
							let movingId = this.movingDom.getAttribute('id');

							if(Math.abs(targetId - movingId) >= 2){
								//数组交换位置
								this.tasks[targetId] = this.tasks.splice(movingId, 1, this.tasks[targetId])[0];
							
							}
            },
            allowDrop:function(event){
              event.preventDefault();
            },
						shuffle(){
								this.tasks.reverse();		
											}
		
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
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
.task {
.list-item {
transition: all 0.5s;
}
.list-enter-active, .list-leave-active {
  transition: all 0.3s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-move {
  transition: all 1s;
}
	.main {
	width:1000px;
	margin:0 auto;
	}
	.action {
	margin-top:10px;
	margin-bottom:10px;
	}
	.text-r {
	text-align:right;
	}
	.report-table {
	width:1000px;
	border-collapse:collapse;
	margin:0 auto;
		tr.item:hover {
			  background: #eee;
				cursor:move;
					
		}
	
	}
	.report-table.move {
	//border-collapse:separate;
	
	}
	.report-table.move tr {
		border:1px dashed #555;
	}

	.report-table tr {
	line-height:35px;
	
	}
	.report-table tr td:first-child {
		padding-left:20px;
	
	}
	.report-table td,.report-table th {
		text-align:left;
		/*border: 1px solid #ccc;*/
	}
	.report-table td input {
	max-width:150px;
	}
			
	select {
			height: 30px;
			line-height: 30px;
			padding-left:10px;
			/*appearance: none;*/
			font-size:14px;
			
	}
	select option {
	line-height:30px;
	}
	input.drop:hover {
		
	}

}



</style>
