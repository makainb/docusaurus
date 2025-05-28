---
title: 二分搜索
sidebar_position: 1
---
## 算法思路
二分搜索是一种在 **有序数组中每次折半查找目标值** 的高效算法。

1. **前提条件**：数组必须是**有序的**。
2. **每次查找过程**：

   * 取当前查找范围的中间元素 `mid`
   * 比较 `mid` 元素与目标值 `target`

     * 如果相等，查找成功，返回下标
     * 如果 `target` 比 `mid` 小，目标在左边 -> 继续在左半部分查找
     * 如果 `target` 比 `mid` 大，目标在右边 -> 继续在右半部分查找
3. 直到查找范围为空（`left > right`），表示查找失败

---

## 示例步骤

假设我们在有序数组 `[1, 3, 5, 7, 9, 11, 13]` 中查找目标值 `9`

初始范围：`left = 0`, `right = 6`

第一次计算中间：`mid = (0 + 6) // 2 = 3` → `arr[3] = 7`
7 < 9 → 目标在右边，缩小范围到 `left = 4, right = 6`

第二次计算中间：`mid = (4 + 6) // 2 = 5` → `arr[5] = 11`
11 > 9 → 目标在左边，缩小范围到 `left = 4, right = 4`

第三次计算中间：`mid = (4 + 4) // 2 = 4` → `arr[4] = 9`
找到目标，返回索引 `4`

---

## 代码实现

```java
public static boolean binarySearch(int[] arr, int key) {
    if (arr == null || arr.length == 0) {
        return false;
    }

    int left = 0;
    int right = arr.length - 1;
    int mid;
    while (left <= right) {
        mid = (left + right) / 2;
        if (key > arr[mid]) {
            left = mid + 1;
        } else if (key < arr[mid]) {
            right = mid - 1;
        } else {
            return true;
        }
    }

    return false;
}
```
---

## 对数器
```java
public static void main(String[] args) {

    // 随机数组最大长度
    int length = 50;
    // 随机的每个值
    int maxNum = 1000;
    // 测试次数
    int testTimes = 5000;

    for (int i = 0; i < testTimes; i++) {
        int[] arr = ArrayUtils.randomArray(length, maxNum);
        Arrays.sort(arr);
        boolean b = binarySearch(arr, i);
        boolean b1 = validator(arr, i);

        if(b != b1){
            System.out.println("出错了：" + Arrays.toString(arr));
        }
    }
}

public static boolean validator(int[] arr, int key){
    for (int i : arr) {
        if (i == key) {
            return true;
        }
    }
    return false;
}

```

---
## 复杂度分析
如果数组长度为N

### ⏱ 时间复杂度：**O(log n)**

* 每次查找都将搜索区间缩小一半（除以 2）
* 最多只需进行约 `log₂(n)` 次比较就能找到目标或确认不存在
* 因此，对于长度为 `n` 的有序数组，时间复杂度是 **对数级别**，即：

$$
T(n) = O(\log n)
$$

### 🧠 空间复杂度：

O(1)，只用常数级别的变量（`left`, `right`, `mid`）




## 变种1 大于等于最左

用二分法查找大于等于 `Num` 最左边的数。

### 步骤分析

有一个数组 `[3, 6, 8, 8, 8, 13, 17, 25]`，找大于等于 `8` 的数
初始化下标 `index = -1` 

第1轮： left = 0, right = 7, mid = (0+7)/2 = 3
结果：arr[3] = 8, 8 >= 8 ,更新 index = mid = 3 , right = mid -1 = 2，left \<= right 可以分下一轮）。

第2轮：left = 0, right = 2, mid = (0+2)/2 = 1
结果：arr[1] = 6, 6 \< 8 , 更新left = mid + 1 = 2, left \<= right  可以分下一轮

第3轮：left = 2, right = 2, mid = (2+2)/2 = 2
结果：arr[2] = 8, 8 >= 8 , 更新 index = mid = 2 , right = mid -1 = 1，left > right 停止循环。

### 算法思路
由上面的步骤得出规律：
1. 初始化 `index` 为 `-1` 
2. 大于等于num时，更新 `index`，`right = mid - 1`。
3. 小于num时，`left = mid + 1` 。
4. 只要 `left` \<= `right` 就可以继续下一轮循环

### 代码实现
```java
/**
 * 二分搜索之大于等于最左边
 * @param arr
 * @param key
 * @return
 */
public static int binarySearchFindLeft(int[] arr, int key) {
    int index = -1;
    if (arr == null || arr.length == 0) {
        return index;
    }

    int left = 0;
    int right = arr.length - 1;
    int mid;
    while (left <= right) {
        mid = (left + right) / 2;
        if (key > arr[mid]) {
            left = mid + 1;
        } else  {
            right = mid - 1;
            index = mid;
        }
    }

    return index;
}
```



## 变种2 小于等于最右

### 算法思路
跟上面的相同，只是方向反了.

### 代码实现
```java
public static int binarySearchFindRight(int[] arr, int key) {
    int index = -1;
    if (arr == null || arr.length == 0) {
        return index;
    }

    int left = 0;
    int right = arr.length - 1;
    int mid;
    while (left <= right) {
        mid = (left + right) / 2;
        if (key < arr[mid]) {
            right = mid - 1;
        } else  {
            left = mid + 1;
            index = mid;
        }
    }

    return index;
}
```