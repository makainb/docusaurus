---
title: 预加载
sidebar_position: 0
---

## 源码
```javascript title="src/utils/preloader.js"
import mk from './mk';

/**
 * 预加载核心函数
 * 负责从后端获取基础配置、用户信息等
 */
export async function preloadSystemData() {
  try {
    console.log('[Preloader] 开始预加载全局数据...');
    
    // 1. 同时发起多个初始化请求（提高效率）
    const [userInfo, dictData] = await Promise.all([
      mk.http.get('/api/user/info'),
      mk.http.get('/api/common/dictionary')
    ]);

    // 2. 将数据存入 piniaStore
    mk.piniaStore.set('user', userInfo);
    mk.piniaStore.set('dict', dictData);
    mk.piniaStore.set('isInitialized', true); // 标记初始化完成

    console.log('[Preloader] 全局数据预加载完成');
  } catch (err) {
    console.error('[Preloader] 预加载失败:', err);
  }
}
```

## 挂载

```javascript title="src/main.js"
import { createApp } from 'vue';
import App from './App.vue';
import mk from './utils/mk';
import { preloadSystemData } from './utils/preloader';

const app = createApp(App);

// 挂载 Pinia 实例
app.use(mk.pinia);

// 执行预加载
preloadSystemData().then(() => {
  // 数据准备好后再挂载页面，防止子应用拿不到数据
  app.mount('#app');
});
```

## 子应用使用
```vue
<script setup>
import { computed, onMounted } from 'vue';
import mk from 'main_portal/mk';

// 1. 直接获取预加载好的用户信息
const user = mk.piniaStore.get('user');

// 2. 响应式绑定字典数据
const statusOptions = computed(() => mk.piniaStore.state().dict?.orderStatus || []);

onMounted(() => {
  console.log('子应用启动，用户信息已就绪:', user.name);
});
</script>

<template>
  <el-select v-model="orderStatus">
    <el-option 
      v-for="item in statusOptions" 
      :key="item.value" 
      :label="item.label" 
      :value="item.value" 
    />
  </el-select>
</template>
```

## 按需预加载

如果你觉得一次性加载所有数据太慢，可以在路由守卫里根据 “子应用前缀” 来预加载：

```javascript
// 基座路由守卫
router.beforeEach(async (to) => {
  if (to.path.startsWith('/mes') && !mk.piniaStore.get('mes_config')) {
    // 只有进入 MES 模块时，才去预加载 MES 特有的配置
    const config = await mk.http.get('/api/mes/config');
    mk.piniaStore.set('mes_config', config);
  }
});
```