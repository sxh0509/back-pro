<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
//引入表单数据类型
import type { PhoneCodeFormType } from '../types/login-type'
//引入校验
import { phoneCodeFormRules } from '../rules'
const ruleFormRef = ref<FormInstance>()
const LoginForm = reactive<PhoneCodeFormType>({
  phone: '',
  smscode: '',
  imgcode: '',
  savePhone: false
})

import { useGetPhoneCode, useHandleSaveUser } from '../composable/phone-code'
//图片验证码
import { useGetImgCode } from '../composable'
const { disabled, getSmsCode, smsCodeBtnText } = useGetPhoneCode(LoginForm)
const { saveLocalUser, getLocalUser } = useHandleSaveUser(LoginForm)
const { imgCodeSrc, getImgCode } = useGetImgCode()
//获取图片验证码
// const imgCodeSrc = ref(new URL('../../../assets/code.png', import.meta.url).href)
//点击切换图片验证码
// const getImgCode = () => {}
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // 1. 点击登录按钮,判断是否保存用户名,如果保存用户名,则将用户名和保存的状态存储到本地
      saveLocalUser()
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

onMounted(() => {
  getLocalUser()
})
</script>

<template>
  <div class="phone-code-page">
    <el-form
      ref="ruleFormRef"
      :model="LoginForm"
      :rules="phoneCodeFormRules"
      class="demo-ruleForm"
      status-icon
      label-width="0"
    >
      <el-form-item prop="phone" size="large">
        <el-input prefix-icon="Avatar" v-model="LoginForm.phone" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item prop="smscode" size="large">
        <div class="flex login-line">
          <div class="flex-item">
            <el-input
              prefix-icon="Picture"
              v-model="LoginForm.smscode"
              placeholder="请输入短信验证码"
            />
          </div>
          <div class="code-btn">
            <el-button :disabled="disabled" size="large" type="primary" @click="getSmsCode">{{
              smsCodeBtnText
            }}</el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item prop="imgcode" size="large">
        <div class="flex login-line">
          <div class="flex-item">
            <el-input
              prefix-icon="PictureRounded"
              v-model="LoginForm.imgcode"
              placeholder="请输入图片验证码"
            />
          </div>
          <div class="code-btn">
            <img @click="getImgCode" :src="imgCodeSrc" alt="" />
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="LoginForm.savePhone">记住用户名</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button
          type="danger"
          size="large"
          class="login-btn"
          round
          @click="submitForm(ruleFormRef)"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.login-line {
  width: 100%;
  .code-btn {
    width: 100px;
    margin-left: 10px;

    :deep(.el-button),
    :deep(img) {
      width: 100px;
    }

    &:deep(.el-button) {
      font-size: 12px;
    }

    img {
      height: 40px;
      cursor: pointer;
    }
  }
}
.login-btn {
  width: 100%;
}
</style>
