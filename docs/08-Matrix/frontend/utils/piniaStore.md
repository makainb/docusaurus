---
title: Pinia 存储
sidebar_position: 2
---

## 源码

### piniaStore.js

```javascript title="src/utils/piniaStore.js"
import { createPinia, defineStore } from 'pinia';

// 1. 在内部创建 Pinia 实例，不对外直接暴露这个变量名
const pinia = createPinia();

const useSharedStore = defineStore('MK_MATRIX_PINIA_STORAGE', {
  state: () => ({
    data: {}
  }),
  actions: {
    setItem(key, val) { this.data[key] = val; },
    getItem(key) { return this.data[key]; },
    removeItem(key) { delete this.data[key]; },
      // 核心：清空所有数据
    reset() {
      this.data = {};
    },
    
    // 核心：删除匹配前缀的数据
    removeByPrefix(prefix) {
      Object.keys(this.data).forEach(key => {
        if (key.startsWith(prefix)) {
          delete this.data[key];
        }
      });
    }
  }
});

// 2. 导出给基座 main.js 注册使用的实例
export const piniaInstance = pinia;

// 3. 导出封装好的操作方法
export const piniaStore = {
// 1. 纯值存取（非响应式，用于逻辑判断）
  set(key, val) { useSharedStore(piniaInstance).setItem(key, val); },
  get(key) { return useSharedStore(piniaInstance).getItem(key); },

  // 2. 响应式存取（最核心！用于 Vue 组件内）
  // 以后组员在组件里只需要写：const user = mk.piniaStore.use('user')
  use(key) {
    return toRef(useSharedStore(piniaInstance).data, key);
  },

  // 3. 原始对象（用于更复杂的 computed）
  state: () => useSharedStore(piniaInstance).data,

  /**
   * 监听某个 Key 的变化
   * @param {string} key 键名
   * @param {function} callback 回调 (newValue, oldValue)
   */
  watch(key, callback) {
    return watch(() => this.state()[key], callback, { deep: true });
  },

  merge(obj) {
    Object.keys(obj).forEach(key => this.set(key, obj[key]));
  },
  /**
   * 1. 清空所有内存数据
   * 常用于：用户退出登录
   */
  clear() {
    useSharedStore(pinia).reset();
  },

  /**
   * 2. 删除指定前缀的数据
   * @param {string} prefix 前缀字符串
   * 常用于：子应用卸载时清理自己的数据
   */
  clearPrefix(prefix) {
    if (!prefix) return;
    useSharedStore(pinia).removeByPrefix(prefix);
  }



};
```

### mk.js

```javascript title="src/utils/mk.js"
import { createPinia } from 'pinia';
import { http } from './http';
import { storage } from './storage';
import { piniaStore } from './piniaStore';

// 1. 创建单例 Pinia
const pinia = createPinia();

// 2. 组装 mk 对象
export const mk = {
  pinia,
  http,
  storage,
  piniaStore,

  // 快捷属性：让组员直接 mk.user 就能拿到信息
  get user() { return piniaStore.get('user') || {} },
};

export default mk;
```




### main.js
```javascript title="src/main.js"
import { createApp } from 'vue';
import App from './App.vue';
import { piniaInstance } from './utils/piniaStore'; // 👈 引入用于注册的实例

const app = createApp(App);

app.use(piniaInstance); // 只有这里用到一次
app.mount('#app');
```


### 使用
```vue
<script setup>
import mk from 'main_portal/mk';

// 这种方式最爽，不用写 computed，user 本身就是一个 Ref
// 别的地方 set('user')，这里会自动变！
const user = mk.piniaStore.use('user');

// 也可以这样用
// const user = computed(() => mk.piniaStore.state().user);

// 监听某个 Key 的变化，切换站点时初始化数据或者菜单，我还没想好怎么缓存
// mk.piniaStore.watch('lineId', (id) => loadData(id))

</script>

<template>
  <div>{{ user?.name }}</div>
</template>
```


## merge的使用案例

### 场景一：系统初始化（预加载数据）
当基座从后端拿到一大坨基础配置（用户信息、权限、系统设置）时，直接一键同步：
```javascript
// 假设从后端拿到的数据如下
const initData = {
  user: { name: '张工', role: 'ADMIN' },
  auth: ['ADD', 'EDIT', 'DELETE'],
  theme: 'blue',
  lineId: 'LINE_001'
};

// 以前：要写四行
// mk.piniaStore.set('user', initData.user);
// mk.piniaStore.set('auth', initData.auth); ...

// 现在：一行搞定
mk.piniaStore.merge(initData);
```

### 场景二：子应用切换时的状态恢复
当用户从“设备模块”跳回“生产模块”，你想一次性恢复之前缓存的一组状态：
```javascript
const lastState = {
  activeTab: 'orderList',
  queryForm: { status: 1, keyword: 'ABC' },
  scrollPos: 120
};

mk.piniaStore.merge(lastState);
```

### 场景三：配合 storage 实现“记忆功能”
如果你想把 `localStorage` 里存的一堆东西快速同步到内存（Pinia）中：
```javascript
// 从硬盘取出之前存的本地配置
const localSettings = mk.storage.get('local_settings'); 

if (localSettings) {
  // 批量同步到内存，让页面产生响应式变化
  mk.piniaStore.merge(localSettings);
}
```
