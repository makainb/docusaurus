
## 1. 编写 src/hooks/useForm.js
这个钩子集成了：响应式表单、持久化暂存、提交状态控制。
```javascript
import { reactive, ref, onMounted, watch } from 'vue';
import mk from '@/utils/mk';

/**
 * 通用表单 Hook
 * @param {Object} options 配置项
 * @param {string} options.key 存储在 piniaStore 中的唯一键名（用于暂存）
 * @param {Object} options.initData 初始数据
 * @param {Function} options.api 提交的 API 函数
 */
export function useForm({ key, initData = {}, api }) {
  // 1. 定义表单响应式数据
  const form = reactive({ ...initData });
  const loading = ref(false);

  // 2. 初始化：如果 piniaStore 里有暂存数据，则恢复
  onMounted(() => {
    if (key) {
      const cache = mk.piniaStore.get(`FORM_CACHE_${key}`);
      if (cache) Object.assign(form, cache);
    }
  });

  // 3. 自动暂存：监听表单变化，实时存入 piniaStore
  if (key) {
    watch(form, (newVal) => {
      mk.piniaStore.set(`FORM_CACHE_${key}`, newVal);
    }, { deep: true });
  }

  // 4. 提交逻辑
  const submit = async (customParams = {}) => {
    if (!api) return;
    loading.value = true;
    try {
      const params = { ...form, ...customParams };
      const res = await api(params);
      
      // 提交成功后，清除暂存
      if (key) mk.piniaStore.remove(`FORM_CACHE_${key}`);
      
      return res;
    } finally {
      loading.value = false;
    }
  };

  // 5. 重置表单
  const reset = () => {
    Object.assign(form, initData);
    if (key) mk.piniaStore.remove(`FORM_CACHE_${key}`);
  };

  return {
    form,
    loading,
    submit,
    reset
  };
}
```

## 2. 子应用中的“爽快”用法
有了这个 Hook，子应用写一个带暂存功能的表单，逻辑代码不到 10 行：
```javascript
<script setup>
import { useForm } from '@/hooks/useForm';
import mk from '@/utils/mk';

// 定义一个提交 API（利用你封装好的 http）
const saveOrder = (data) => mk.http.post('/api/order/save', data);

const { form, loading, submit, reset } = useForm({
  key: 'ORDER_EDIT',      // 只要传了这个 Key，输入时刷新页面数据也不会丢
  initData: { name: '', type: 'A', remark: '' },
  api: saveOrder
});
</script>

<template>
  <el-form :model="form">
    <el-input v-model="form.name" label="订单名称" />
    <el-select v-model="form.type" label="类型">...</el-select>
    
    <mk-button :loading="loading" @click="submit">提交保存</mk-button>
    <el-button @click="reset">清空</el-button>
  </el-form>
</template>
```


## 3. 这个封装好在哪里？
心智负担降低：组员不需要再手动写 onMounted 去回显数据，也不需要手动控制 loading = true/false。

健壮性：即使浏览器突然崩了或者断电，用户之前填写的长表单依然在 piniaStore 里（配合你的 storage 还能实现断电级恢复）。

高度集成：它完美串联了你之前写的 piniaStore（存）和 http（发），体现了中台框架的系统性。

