---
title: 选择排序
sidebar_position: 1
---

## 算法思路
i 起始为 0 , 目标是数组长度-1，每次递增1。n为数组长度。  
在 `i ~ n-1` 范围上，找到最小值并放入 i 位置，然后 `i+1 ~ n-1` 范围继续。

## 算法步骤

原始数组：[5, 3, 1, 2, 4]  

第1轮：0到4的下标上找到最小值，并和0下标替换（数字1和5换）  
第1轮结果：[1, 3, 5, 2, 4]

第2轮：1到4的下标上找最小值，并和1下标替换（数字3和2换）  
第2轮结果：[1, 2, 5, 3, 4]

第3轮：2到4的下标上找最小值，并和2下标替换（数字5和3换）  
第3轮结果：[1, 2, 3, 5, 4]

第4轮：3到4的下标上找最小值，并和3下标替换（数字5和4换）  
第4轮结果：[1, 2, 3, 4, 5]

此时只剩一个4的位置，不用换了，排序完成。

## 算法代码
```java
public static void selectionSort(int[] arr) {
    if (arr == null || arr.length < 2) {
        return;
    }

    for (int i = 0; i < arr.length - 1; i++) {
        int minIndex = i;
        for (int j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        swap(arr, i, minIndex);
    }
}
```

## 测试方法
```java
public static void main(String[] args) {
    int[] arr = {5, 3, 1, 2, 4};
    selectionSort(arr);
    print(arr);
}
```


## 时间复杂度

暂无

## 附：工具类代码
```java title="ArrayUtils.java"
import java.util.Arrays;

public class ArrayUtils {

    public static void swap(int[] arr, int i, int j) {
        int swap = arr[i];
        arr[i] = arr[j];
        arr[j] = swap;
    }

    public static void print(int[] arr){
        System.out.println(Arrays.toString(arr));
    }
}

```