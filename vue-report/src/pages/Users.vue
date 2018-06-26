<template>
  <div class="users md-layout-item md-size-90 md-large-size-80 md-xlarge-size-60 ma" >


 <md-table v-model="searched" md-sort="name" @md-selected="onSelect" md-card md-fixed-header v-show="users.length > 0">
      <md-table-toolbar>
        <h1 class="md-title">{{ msg }}</h1>


  <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="按姓名搜索" v-model="search" @input="searchOnTable" />
</md-field>

        <div class="md-toolbar-section-end">
          <md-button class="md-button" @click="add">
            <md-icon>add</md-icon>
            添加用户
          </md-button>

      <md-button class="md-button" @click="getUsers">           
            刷新
          </md-button>
          
        </div>

      </md-table-toolbar>

   <md-table-empty-state
        md-label="没有找到用户"
        :md-description="`没有匹配到 '${search}' 的用户. 请注意拼写是否正确.`">
        <md-button class="md-primary md-raised" @click="add">添加用户</md-button>
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }" :class="getClass(item.id)" md-selectable="single">
        <md-table-cell md-label="工号"   md-numeric>{{ item.userId }}</md-table-cell>
        <md-table-cell md-label="姓名"  >{{ item.userName }}</md-table-cell>
        <md-table-cell md-label="性别"  >{{ item.gender == 1 ? '男' : '女' }}</md-table-cell>
        <md-table-cell md-label="所在小组"  >{{ item.team }}</md-table-cell>
        <md-table-cell md-label="所在部门"  >{{ item.department }}</md-table-cell>
        <md-table-cell md-label="手机号码"  >{{ item.phone }}</md-table-cell>
  
        <md-table-cell md-label="状态"  >{{ item.status == 1 ? '正常' : '禁用' }}</md-table-cell>
        
      </md-table-row>
      
    </md-table>

<div class="action-box  mh">

   <div v-show="selected && selected.id" class="text-right"> 
      <md-button class="md-raised md-primary" @click="showEdit">修改</md-button>
      <md-button class="md-raised md-accent" @click="toDel(selected.id)">删除</md-button>    
    </div>
</div>
<!-- edit form begin -->


   <md-dialog :md-active.sync="showDialog" class="user-form">
      <md-dialog-title>用户信息</md-dialog-title>

  <form novalidate class="md-layout" >
      <div class="md-layout-item md-size-100">

 
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('userName')">
                <label for="userName">姓名</label>
                <md-input id="userName"  v-model="form.userName" />
                <span class="md-error" v-if="!$v.form.userName.required">请输入姓名</span>
                <span class="md-error" v-else-if="!$v.form.userName.minlength">姓名不合法</span>
              </md-field>
            </div>


            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('userId')">
                <label for="userId">工号</label>
                <md-input type="text" id="userId" name="userId"  v-model="form.userId" />
                <span class="md-error" v-if="!$v.form.userId.required">请输入工号</span>
                <span class="md-error" v-else-if="!$v.form.userId.minLength">不合法</span>
              </md-field>
            </div>

                    </div>
      
          <!-- md-gutter end -->
        
           <div class="md-layout md-gutter">

              <div class="md-layout-item md-small-size-100">

               <md-autocomplete v-model="form.team" :md-options="teams" md-dense >
                       <label>所在组</label>
               </md-autocomplete>

              </div>

               <div class="md-layout-item md-small-size-100">
              <md-field  >
                <label for="gender">性别</label>
                <md-select name="gender" id="gender" v-model="form.gender" md-dense :disabled="sending"> 
                  <md-option value="1">男</md-option>
                  <md-option value="0">女</md-option>
                </md-select>            
              </md-field>
            </div>

            </div>

        <!-- md-gutter end -->

          <div class="md-layout md-gutter" v-if="status == 'edit'">
             
              <div class="md-layout-item md-small-size-100">
    
                <md-autocomplete v-model="form.department" :md-options="departments" md-dense >
                       <label>所在部门</label>
               </md-autocomplete>

              </div>

               <div class="md-layout-item md-small-size-100">
              <md-field >
                <label for="status">状态</label>
                <md-select  id="status" v-model="form.status" md-dense > 
                  <md-option value="1">正常</md-option>
                  <md-option value="0">禁用</md-option>
                </md-select>            
              </md-field>
            </div>

            </div>

            <!-- md-gutter end -->

             <div class="md-layout md-gutter" v-if="status == 'edit'">
             
              <div class="md-layout-item md-small-size-100">
                    <md-field>
                    <label for="email">电子邮箱</label>
                    <md-input type="email"  id="email"  v-model="form.email" :disabled="sending" />
                  </md-field>
              </div>

               <div class="md-layout-item md-small-size-100">
             <md-field >
                <label for="phone">电话号码</label>
                <md-input type="number" id="phone"   v-model="form.phone"/>
            
              </md-field>
            </div>

  
            </div>      
      
          <!-- md-gutter end -->
  
    <div class="md-layout md-gutter" v-if="status == 'edit'">
        <div class="md-layout-item md-small-size-100">     
          <md-checkbox v-model="form.resetPwd" value="1">重置密码(重置为123456)</md-checkbox>
        </div>
    </div>   
  <!-- md-gutter end -->

          <!-- <md-button type="submit" class="md-primary md-raised" :disabled="sending" @click="add" >创建用户</md-button> -->
   
      </div>

    
    </form>

     <md-dialog-actions>
        <md-button class="md-primary md-raised" v-show="status == 'add'" @click="validateUser">确定</md-button>
        <md-button class="md-primary md-raised" v-show="status == 'edit'" @click="validateUser">提交修改</md-button>
        <md-button class="md-primary" @click="showDialog = false">取消</md-button>       
      </md-dialog-actions>
      
    </md-dialog>

    <!-- edit form end -->
    </div>

</div>
</template>

<script>

  const toLower = text => {
    return text.toString().toLowerCase()
  }

  const searchByName = (items, term) => {
    if (term) {
         console.log('term',items);
      return items.filter(item => toLower(item.userName).includes(toLower(term)) )
    }
 

    return items
  }

import { validationMixin } from 'vuelidate'
import {
    required,
    email,
    minLength,
    maxLength
  } from 'vuelidate/lib/validators'


import { mapActions,mapGetters,mapState} from 'vuex';

export default {
  name: 'Report',
  mixins: [validationMixin],
  data () {
    return {
      msg: '所有用户',
      users:[],
      showDialog:false,
      status:null,
      selected: {},
      form: {
        userName: '',
        userId: '',
        gender: 1,
        team: null,
        department:null,
        resetPwd:false
      },
      search: null,
      searched: [],
      userSaved: false,
      sending: false,
      departments:[],
      teams:[],
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
   validations: {
      form: {
        userName: {
          required,
          minLength: minLength(2)
        },
        userId: {
          required,
          minLength: minLength(2)
        }
      }
    },
	methods:{
	...mapActions([
      'setTitle',
      'dialogAlert',
      'setShowSnackbar'
    ]),
/*      getClass: ({ id }) => ({
        'md-primary': id === 2,
        'md-accent': id === 3
      }), */
      getClass: (id) => {
        if(id%2 == 0){
            return 'md-primary';
         } else {
            return 'md-accent';
         }
      }, 
      searchOnTable () {
        this.searched = searchByName(this.users, this.search)
      },
      onSelect (item) {
        this.selected = item
      },
    getUsers(){   

     	this.$axios.get('./index.php/user/get_users',{params: {
      curpage: 1,
      pagesize:200
    }}).then(response => {
        if(response.data){
          this.users = response.data;           
          this.searched = response.data; 
             
        } else {
          this.setShowSnackbar({bMsg:'错误#07'});
        }
      }).catch(function (error) {
					console.log(error);
         });
         
        this.getBasicData();
    },
    toDel(id){
      this.dialogAlert({
        active:true,
        title:'你确定要删除 '+ this.selected.userName +' 吗',
        content:'此操作不可以恢复',
        confirmText:'删除',cancelText:'取消',
        onConfirm:()=>{
          this.del(this.selected.id);
        }
        });
    },
    del(id){
      if(!id){
          return;
      }

      this.$axios.get('./index.php/user/del',{params: {
      delId: id
       }}).then(response => {
        if(response.data.ok){
              this.setShowSnackbar({bMsg:'该用户已删除',millisecond:800});
              this.dialogAlert({active:false});
              this.getUsers();
           
        } else {
          this.setShowSnackbar({bMsg:'错误 #09'});
        }
      }).catch(function (error) {
					console.log(error);
         });
         
 
    
    },
    refresh(str){
    
    
    },
    showEdit(){
        this.showDialog = true;
        this.status = 'edit';
        this.form = JSON.parse(JSON.stringify(this.selected));
    },
    add(){
      this.clearForm()
        this.showDialog = true;
        this.status = 'add';

    },
    getValidationClass (fieldName) {
      console.log('fieldName',fieldName);
      
        const field = this.$v.form[fieldName]
        console.log('field',field);
        
        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        //this.$v.$reset();
        this.form = {};
        this.form.gender = 1;
  /*       this.form.userName = null
        this.form.userId = null
        this.form.team = null
        this.form.gender = 1
        this.form.department = null
        this.form.resetPwd = false */

      },
      getBasicData(){

      this.$axios.get('./index.php/user/get_basic_data').then(response => {       
          this.teams = response.data.teams;           
          this.departments = response.data.departments;    
      }).catch(function (error) {
					console.log(error);
				 });
      },
      saveUser () {
        this.sending = true
        	var data = this.$qs.stringify(this.form);
        // Instead of this timeout, here you can call your API
        this.$axios.post('./index.php/user/register',
          data,
          ).then(response => {         
              if(response.data && response.data.ok){
                  this.setShowSnackbar({bMsg:'添加用户成功',millisecond:800});
            
                  this.sending = false
                  this.clearForm()
                  this.showDialog = false;
                  this.status = null;
                  this.getUsers();                  
              
                        
              } else {
                this.setShowSnackbar({bMsg:'未添加'});                 
              }
          }).catch(function (error) {
            this.setShowSnackbar({bMsg:'添加失败 # 11'});
              console.log(error);
            });

      },
      updateUser () {
        this.sending = true 
        var data = this.$qs.stringify(this.form);
        this.$axios.post('./index.php/user/complete',
          data,
          ).then(response => {         
              if(response.data && response.data.ok){
                  this.setShowSnackbar({bMsg:'更新成功',millisecond:800});            
                  this.sending = false
                  this.clearForm()
                  this.showDialog = false;
                  this.status = null;
                  this.getUsers();
              } else {
                this.setShowSnackbar({bMsg:response.data.msg});                 
              }
          }).catch(function (error) {
            this.setShowSnackbar({bMsg:'更新失败 # 12'});
              console.log(error);
            });

      },
      validateUser () {
        console.log('form',this.form);        
        this.$v.$touch()  

        console.log('this.$v.$invalid',this.$v.$invalid);
        
       
        if (!this.$v.$invalid) {

          if(this.status == 'add'){
              this.saveUser()
          }
          if(this.status == 'edit'){
              this.updateUser()
          }
        } else {
          console.log('不合法');
          
        }
      }
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.action-box {
 
}
.edit-form {

  margin-top:30px;
}
.md-dialog {
  min-width: 450px;
    max-width: 768px;
  }
.md-dialog.user-form {
 min-width: 550px;

}
</style>
