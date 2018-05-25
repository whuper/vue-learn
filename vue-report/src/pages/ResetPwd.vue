<template>
  <div class="reset-pwd ">
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100 ma">
        <md-card-header>
          <div class="md-title">修改密码</div>
        </md-card-header>

        <md-card-content>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('oldPassword')">
                <label for="oldPassword">旧密码</label>
                <md-input type="password" id="oldPassword"   v-model="form.oldPassword" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.oldPassword.required">请输入旧密码</span>
            
              </md-field>
            </div>
</div>

 <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('newPassword1')">
                <label for="newPassword1">新密码</label>
                <md-input type="password"   id="newPassword1" v-model="form.newPassword1" :disabled="sending" />

                <span class="md-error" v-if="!$v.form.newPassword1.required">请输入新密码</span>
                <span class="md-error" v-else-if="!$v.form.newPassword1.minlength">密码不合法</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('newPassword2')">
                <label for="newPassword2">再次输入新密码</label>
                <md-input type="password"  id="newPassword2" v-model="form.newPassword2" :disabled="sending" />

                <span class="md-error" v-if="!$v.form.newPassword2.required">请输入新密码</span>
                <span class="md-error" v-else-if="!$v.form.newPassword2.minlength">密码不合法</span>
              </md-field>
            </div>

          </div>

 
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary md-raised" :disabled="sending">修改</md-button>
        </md-card-actions>
      </md-card>

    </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import {
    required,
    minLength,
    maxLength
  } from 'vuelidate/lib/validators'
import { mapActions,mapGetters,mapState} from 'vuex'
  export default {
    name: 'FormValidation',
    mixins: [validationMixin],
    data: () => ({
      form: {
        oldPassword: null,
        newPassword1:null,
        newPassword2:null
      },
      sending: false
    }),
    computed: {
    // mix the getters into the computed object
    ...mapGetters([
      'userInfo'
    ]),
		...mapState({
			title: state => state.common.title
    })
  },
    validations: {
      form: {
        oldPassword:{
          required
        },
        newPassword1: {
          required,
          minLength: minLength(6)
        },
         newPassword2: {
          required,
          minLength: minLength(6)
        }
      }
    },
  mounted(){
    this.setTitle('用户信息');
  
  },
    methods: {
    ...mapActions([
      'setShowSnackbar',
      'setTitle'
    ]),
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        this.form.oldPassword = null
        this.form.newPassword1 = null
        this.form.newPassword2 = null
        
      },
      update () {
                this.sending = true
        	var data = this.$qs.stringify({
            id:this.userInfo.id,
            userId:this.userInfo.userId,
            password:this.form.oldPassword,
            newPassword:this.form.newPassword1
          });
        // Instead of this timeout, here you can call your API
        this.$axios.post('./index.php/user/reset_password',
          data,
          ).then(response => {         
              if(response.data && response.data.ok){
                  this.setShowSnackbar({bMsg:'密码修改成功,请重新登录',millisecond:1500});
                  this.setTitle('重新登录');

                //删除cookie,重新登录
                this.delCookie('userId');
                this.delCookie('password');
                localStorage.removeItem('userInfo');            
                this.$store.commit('updateinfo_req',{}); 
          
                this.$router.push('/login');                
              
                        
              } else {
                this.setShowSnackbar({bMsg:response.data.msg});   
                  this.sending = false;              
              }
          }).catch(function (error) {
            this.sending = false;  
            this.setShowSnackbar({bMsg:'密码修改失败 # 13'});
              console.log(error);
            });

      },
      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          if(this.form.newPassword1 != this.form.newPassword2){
            this.setShowSnackbar({bMsg:'两次密码输入不一致',millisecond:800});

              return false;
          }
          this.update()
        }
      }
    }
  }
</script>

<style>
 div.reset-pwd  {
   margin-top:30px;
}
</style>
