<template>
  <div class="consult">
    <h1>{{ msg }}</h1>


		<div class="consult-box ">

			<div class="mar top-tool">
			<select class="organSelect" v-model="selectedOrgan">

			<option disabled value="0">请选择医院</option>
  <option v-for="item in hospitals" v-bind:value="item.organId">
    {{ item.organName }}
  </option>
</select>

				<button @click="findByOrganIds">查询</button>	
				<button @click="confirmSync" :disabled="!checkedMeetIds || !checkedMeetIds.length">同步</button>	
			</div>

			<p>
			<!--<span>Selected: {{ selectedOrgan }}</span>-->

			</p>

			<div class="box" v-show="consultLists && consultLists.length">

					<table class="consult-table mar" >
				<tr>
					<th> </th>
					<th>会诊单号</th>
				<th>申请医生</th>
				<th>申请科室</th>
				<th>申请机构</th>
				<th>患者</th>
				<th>疾病名称</th>
				<th>申请时间</th>
				<th>结束时间</th>
			</tr>

				<tr v-for="(consult,key) in consultLists"> 
					<td class="mini"> 
						<input type="checkbox" v-bind:id="consult.meetClinicId" v-bind:value="consult.meetClinicId" v-model="checkedMeetIds">
					</td>
					<td> {{consult.meetClinicId}} </td>
					<td> {{consult.doctorName}} </td>
					<td> {{consult.departName}} </td>
					<td> {{consult.organName}} </td>
					<td> {{consult.patientName}} </td>
					<td> {{consult.diagianName}} </td>
					<td> {{consult.startTime ? consult.startTime.substring(0,16) : ''}} </td>
					<td> {{consult.endTime ? consult.endTime.substring(0,16):''}} </td>
				</tr>

			</table>
					<div class="bottom-tool tl" v-show="consultLists && consultLists.length">

				<button @click="selectAll(true)">全选 </button>	
				<button @click="selectAll(false)">全不选 </button>	
				
			</div>

					<div class="pagination">

						<button @click="pageTurn('prev')" :disabled="currentPage <=1">上一页</button>	
						<span class="num">{{currentPage}}</span>	
						<button @click="pageTurn('next')" :disabled="consultLists.length < pageSize">下一页</button>	
						
					</div>
					<!--pagination end-->

					<p>
					<button class="syncAllBtn" @click="syncAll()" >同步该医院所有记录</button>	
					</p>
				
				
			</div>

			<!--box end-->
			

	<div class="footer">
		
	</div>
	
			

			
		</div>
		
	<loading v-show="isLoading" ></loading>	

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '会诊同步工具',
			selectedOrgan:0,
			hospitals:[],
			consultLists:[],
			checkedMeetIds:[],
			isLoading:false,
			pageSize:20,
			currentPage:1
    }
  },
	mounted(){

		//this.serviceUrl = 'http://ssltest.ngarihealth.com:8280/ehealth-base-test/';
		//this.serviceUrl = 'http://192.168.2.201:8080';
		this.serviceUrl = '/';
		this.jsonServiceUrl = this.serviceUrl + '*.jsonRequest'
		this.getData2();
	
	},
	methods:{
				getData(){
						this.request('POST',{serviceId:'eh.unLoginSevice',Method:'getUrls'},'').then(function(data){
								console.log('## data',data);
								}).catch(function(e){
									console.log('e2',e);
									});			
				},
				getData2(){
					this.request('GET','meetClinicService/findTianJinOrgans','').then((data)=>{
							console.log('data',data);
								//this.hospitals = data.mockHospitals;
								this.hospitals = data;
								}).catch(function(e){
									console.log('e3',e);
									});					
				},
				findByOrganIds(){
					if(!this.selectedOrgan){
						this.showToast('未选择正确的机构');
						return;
					}
					this.checkedMeetIds = [];	
			
					let organs = [this.selectedOrgan];
					let start = (this.currentPage - 1) * this.pageSize;

					let params = {
													"organIds":organs,
													"start":start,
													"limit":this.pageSize
												}
					
					
					this.request('POST','meetClinicService/findByOrganIds',params).then((data)=>{
								//this.consultLists = data.mockList;
								this.consultLists = data;
								if(!data || !data.length){
										this.showToast('没有记录 !');
								}
								
								}).catch(function(e){
									console.log('e4',e);
									});	
				
				
				},
				senderMeetClinic(){
						let params =  this.checkedMeetIds;
					
						this.request('POST','meetClinicService/senderMeetClinic',params).then((res)=>{
								console.log('senderMeetRes',res);
								if(res.code == 609){
								  this.showToast(res.msg);
									this.$dialog.alert('数据同步失败',{okText:'确定'})
								} else if(res.code == 200){
										this.showToast('数据同步成功');
										this.pageTurn('refresh');
								}
								}).catch(function(e){
									console.log('e4',e);
									});	
				
				},
				senderMeetClinicAll(){
						this.request('POST','meetClinicService/batchSendMeetClinic','').then((res)=>{
							
								if(res.code == 609){
								  this.showToast(res.msg);
									this.$dialog.alert('同步失败',{okText:'确定'})
								} else if(res.code == 200){
										this.showToast('所有数据同步成功!');
										this.pageTurn('refresh');
								}
								}).catch(function(e){
									console.log('e5',e);
									});	
				},
				selectAll(val){
					this.checkedMeetIds = [];
					if(val){
						this.consultLists.forEach((item)=>{
									this.checkedMeetIds.push(item['meetClinicId']);	
								});
					} else {
						this.checkedMeetIds = [];	
					}
				},
				showToast(msg) {
						this.$toast({
						title: '提示',
						content: msg,
						type: 'default',
						onShow: () => {
							console.log('on toast show')
						},
						onHide: () => {
							console.log('on toast hide')
						 }
						})
				},
				confirmSync(){
				
					let $this = this;
					this.$dialog.confirm('确定要同步吗',{okText:'确定',cancelText:'取消'})
						.then(function () {
					
							$this.senderMeetClinic();
						})
						.catch(function () {
							console.log('Clicked on cancel')
						});
				
				},
				syncAll(){
							let $this = this;
					this.$dialog.confirm('确定要同步该医院所有的记录吗',{okText:'确定',cancelText:'取消'})
						.then(function () {
						
							$this.senderMeetClinicAll();
						})
						.catch(function () {
							console.log('Clicked on cancel')
						});				
				},
				pageTurn(type){

					switch(type) {
							case 'prev':
								this.currentPage -=1;
								break;
							case 'next':
								this.currentPage +=1;
								break;
							
							default:
								console.log('刷新');
						}
				

					this.findByOrganIds();
				
				},
				request(method,service,data,config){
					var $this = this;
					$this.isLoading = true;
					let options = Object.assign({},config,{
							method,
							data
							});
					options.header = options.header || {
											'Content-Type':'application/json',
											'X-Service-Id':service.serviceId,
											'X-Service-Method':service.Method
					};
					if(options.method == 'GET'){

							let promise = new Promise ( (resolve, reject) => {
								this.$axios({
												method:options.method,
												baseURL:this.serviceUrl,
												url:service,
												params:options.data
										}).then(function(res) {
											$this.isLoading = false;
											resolve(res.data);
									}).catch(function(error){
										$this.isLoading = false;
										reject(error)
									});
										});
								return promise;
					
					} else if(options.method == 'POST'){

								let promise = new Promise ( (resolve, reject) => {
								this.$axios({
												method:options.method,
												baseURL:this.serviceUrl,
												url:service,
												data:options.data
										}).then(function(res) {
											$this.isLoading = false;
											resolve(res.data);
									}).catch(function(error){
										$this.isLoading = false;
											reject(error)
									});
										});
								return promise;
					
					} else {
								let promise = new Promise ( (resolve, reject) => {
								this.$axios({
												method:options.method,
												url:this.jsonServiceUrl,
												headers:options.header,
												data:this.$qs.stringify(options.data)
										}).then(function(res) {
												resolve(res.data.body);
									}).catch(function(error){
										reject(error)
									});
										});
								return promise;
					}
				},
					}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

</style>
