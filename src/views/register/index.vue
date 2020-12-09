<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">欢迎注册AD管理系统</div>
        <el-form ref="registerForm"
            :model="form"
            class="ms-content"
            :rules="registerRules"
            size="mini"
            label-width="0px"
            style="padding-top: 8px"
        >
          <el-form-item prop="username">
            <el-input
                v-model.trim="form.username"
                v-focus
                style="margin-top: 20px;width: 273px;"
                type="text"
                placeholder="请输入用户名"
                auto-complete="off"
            >
            </el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
                v-model.trim="form.password"
                type="password"
                placeholder="请输入密码"
                autocomplete="new-password"
            >
            </el-input>
          </el-form-item>

          <el-form-item prop="checkPass">
            <el-input
                v-model.trim="form.checkPass"
                type="password"
                placeholder="请再次输入密码"
                autocomplete="off"
            >
            </el-input>
          </el-form-item>

          <el-form-item prop="phone">
            <el-input
                v-model.trim="form.phone"
                type="text"
                placeholder="请输入手机号"
                maxlength="11"
                show-word-limit
                autocomplete="off"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="phoneCode" style="position: relative">
            <el-input
                v-model.trim="form.phoneCode"
                type="text"
                placeholder="手机验证码"
            >
            </el-input>
            <el-button
                style="right: 0px; top: 3px; width: 97px; height: 24px; margin-right: 4px; padding-top: 5px;"
                type="primary"
                class="show-pwd phone-code"
                :disabled="isGetphone"
                @click="getPhoneCode"
            >
              {{ phoneCode }}
            </el-button>
          </el-form-item>

          <el-form-item>
            <el-button
                style="margin-left: 72px; margin-top: 0px;"
                class="register-btn"
                type="primary"
                @click.native.prevent="handleReister"
            >
              注册
            </el-button>
            <el-button @click="resetForm('registerForm')" class="resetButton">重置</el-button>
<!--            <router-link to="/login">-->
<!--              <div style="margin-top: 9px;font-size: 14px;">返回</div>-->
<!--            </router-link>-->
          </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
 function isPassword(str) {
  return str.length >= 6
}
 function isPhone(str) {
   const reg = /^1\d{10}$/
   return reg.test(str)
 }
import { register } from '@/api/user'
export default {
  directives: {
    focus: {
      inserted(el) {
        el.querySelector('input').focus()
      },
    },
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if ('' == value) {
        callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!isPassword(value)) {
        callback(new Error('密码不能少于6位'))
      }
        callback()
    }
    const validatePhone = (rule, value, callback) => {
      if (!isPhone(value)) {
        callback(new Error('请输入手机号'))
      } else {
        var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
          if (!myreg.test(value)) {
            callback(new Error('请输入正确的手机号'));
          } else {
            callback();
          }
        }
      }
    var validateCheckpass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      isGetphone: false,
      getPhoneIntval: null,
      phoneCode: '获取验证码',
      showRegister: false,
      nodeEnv: process.env.NODE_ENV,
      title: this.$baseTitle,
      form: {},
      registerRules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入用户名' },
          { max: 20, trigger: 'blur', message: '最多不能超过20个字' },
          { validator: validateUsername, trigger: 'blur' },
        ],
        phone: [
          { required: true, trigger: 'blur', message: '请输入手机号码' },
          { validator: validatePhone, trigger: 'blur' },
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' },
          { validator: validatePassword, trigger: 'blur' },
        ],
        checkPass: [
          { required: true, trigger: 'blur', message: '请再次输入密码' },
          { validator: validateCheckpass, trigger: 'blur'},
        ],
        phoneCode: [
          { required: true, trigger: 'blur', message: '请输入手机验证码' },
        ],
      },
      loading: false,
      passwordType: 'password',
      checkPass: '',
    }
  },
  created() {
    document.body.style.overflow = 'hidden'
  },
  beforeDestroy() {
    document.body.style.overflow = 'auto'
    this.getPhoneIntval = null
    clearInterval(this.getPhoneIntval)
  },
  methods: {
    getPhoneCode() {
      this.isGetphone = true
      let n = 60
      this.getPhoneIntval = setInterval(() => {
        if (n > 0) {
          n--
          this.phoneCode = '重新获取(' + n + 's)'
        } else {
          this.getPhoneIntval = null
          clearInterval(this.getPhoneIntval)
          this.phoneCode = '获取验证码'
          this.isGetphone = false
        }
      }, 1000)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleReister() {
      this.$refs['registerForm'].validate(async (valid) => {
        if (valid) {
          const param = {
            username: this.form.username,
            phone: this.form.phone,
            password: this.form.password,
            phoneCode: this.form.phoneCode,
          }
          alert('注册成功！')
          const { msg } = await register(param)
          this.$baseMessage(msg, 'success')
        }
        else {
          alert('注册失败，请检查注册内容!');
          console.log('注册失败!!');
          return false;
        }
      })
      this.$refs['registerForm'].validate((valid) => {
        if (valid) {
          this.$router.push('/login');
        }
      })
    },
  },
}
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(~@/assets/login/login.jpg);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #8cb5e3;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}

.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}


.register-btn {
  display: inherit;
  width: 123px;
  height: 32px;
  margin-top: 5px;
  border: 0;
}

:hover {
   opacity: 0.9;
 }
.phone-code {
  width: 120px;
  height: 36px;
  font-size: 14px;
  color: #fff;
  border-radius: 3px;
}



:first-of-type {
  margin-right: 16px;
 }

.resetButton{
  background-color: rgba(0,0,0,0);
  margin-left: 0px;
  margin-top: 0px;
  font-size: 14px;
  border-left-width: 0px;
  border-top-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 0px;
  padding-left: 0px;
  color: #1f2f3d;

}


.show-pwd {
  position: absolute;
  top: 14px;
  right: 25px;
  font-size: 8px;
  cursor: pointer;
  user-select: none;
}

input {
  height: 58px;
  padding-left: 45px;
  line-height: 58px;
  background: #f6f4fc;
  border: 0;

}

</style>