<script setup lang="ts">
import { ref } from 'vue'
import type { ComponentMap } from './types/login-type'

//免密登录组件
import PhoneCodeForm from './components/PhoneCodeForm.vue'
//账号登录组件
import AccountForm from './components/AccountForm.vue'
//扫码登录组件
import QcodeForm from './components/QcodeForm.vue'

//全局北京颜色
const bgColor = 'linear-gradient(0deg, #2196f3, #00bcd4, #00bcd4, #03a9f4)'
const loginPanelWidth = '800px'
const loginPanelHeight = '400px'

//tab切换显示对应内容
const tabList = ref<ComponentMap[]>([
  { name: '免密登录', componentName: PhoneCodeForm },
  { name: '账号登录', componentName: AccountForm },
  { name: '扫码登录', componentName: QcodeForm }
])

//高亮
const currentTab = ref(0)

//点击切换对应内容
const changeTab = (index: number) => {
  currentTab.value = index
}
</script>

<template>
  <div class="login-page">
    <div class="login-panel">
      <div class="login-logo-panel">
        <img src="../../assets/logo.svg" alt="" />
      </div>
      <div class="login-split-line"></div>
      <div class="logion-form-panel">
        <div class="tabs">
          <div
            v-for="(item, index) in tabList"
            :key="index"
            @click="changeTab(index)"
            :class="{ selected: currentTab === index }"
            class="tab-item"
          >
            {{ item.name }}
          </div>
          <!-- <div @click="changeTab(2)" :class="{ selected: currentTab === 2 }" class="tab-item">
            账号登录
          </div>
          <div @click="changeTab(3)" :class="{ selected: currentTab === 3 }" class="tab-item">
            扫码登录
          </div> -->
        </div>
        <div class="tabs-content">
          <component :is="tabList[currentTab].componentName"></component>
          <!-- <PhoneCodeForm v-if="currentTab === 1" />
          <AccountForm v-else-if="currentTab === 2" />
          <QcodeForm v-else /> -->
        </div>
      </div>
    </div>
    <div class="login-footer">版权所有: 通用管理系统</div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  &-page {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: v-bind(bgColor);
  }

  &-panel {
    width: v-bind(loginPanelWidth);
    height: v-bind(loginPanelHeight);
    background-color: #fff;
    margin: 0 auto;
    margin-top: calc((100vh - v-bind(loginPanelHeight)) / 2);
    box-shadow: 0 0 20px 2px #4a4a8b;
    display: flex;

    .login-logo-panel {
      width: 40%;
      text-align: center;

      img {
        width: 60%;
        margin-top: calc((v-bind(loginPanelHeight) - 166px) / 2);
      }
    }

    .login-split-line {
      width: 1px;
      background-color: #f8f8f8;
      margin: 0 10px;
      height: v-bind(loginPanelHeight);
    }

    .logion-form-panel {
      flex: 1;

      .tabs {
        height: 45px;
        line-height: 45px;
        text-align: center;
        display: flex;
        margin-top: 25px;

        .tab-item {
          flex: 1;
          cursor: pointer;

          &.selected,
          &:hover {
            color: red;
          }
        }
      }

      // .tabs-content {
      // }
    }
  }

  &-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    text-align: center;
    line-height: 60px;
    font-size: 14px;
    color: #fff;
  }
}
</style>
