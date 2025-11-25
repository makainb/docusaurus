---
title: 对数器
sidebar_position: 1
---

## 英文表述
Algorithm Logarithm Checker

## 作用
在算法领域，对数器主要有以下作用：
- **验证算法正确性**：通过将待测试算法与一个绝对正确（通常是简单、暴力但一定正确的解法，如针对排序算法，可使用双重循环比较的简单排序方式）的算法在大量随机生成的测试数据上进行对比。若两者输出结果一致，可在一定程度上证明待测试算法逻辑的正确性。例如在开发一个新的排序算法时，利用对数器与传统冒泡排序（作为对照正确算法）对比，若对于各种规模和元素取值的数组，排序结果都相同，就说明新算法大概率是正确的。 
- **辅助算法调试**：当算法在面对大规模数据或复杂数据结构时出现错误，对数器可以帮助定位问题。通过对比两个算法在不同数据输入下的输出差异，能更快发现是算法逻辑错误、边界条件处理不当还是其他问题，从而提高调试效率 。
- **评估算法性能**：虽然对数器核心不是评估性能，但在对同一组数据多次测试过程中，可间接辅助了解算法的时间复杂度和空间复杂度情况。例如对比两个算法在处理逐渐增大规模数据时的运行时间和资源占用变化，为算法优化提供参考 。 


## 对数器的意义

1. 你想要测的方法a（最优解）
2. 实现复杂度不好但是容易实现的方法b（暴力解）
3. 实现一个随机样本产生器（长度也随机、值也随机）
4. 把方法a和方法b跑相同的输入样本，看看得到的结果是否一样
5. 如果有一个随机样本使得比对结果不一致，打印这个出错的样本进行人工干预，改对方法a和方法b
6. 当样本数量很多时比对测试依然正确，可以确定方法a（最优解）已经正确。


> 关键是第5步，找到一个数据量小的错误样本，便于你去带入debug  
然后把错误例子带入代码一步一步排查  
Print大法、断点技术都可以  
对数器的门槛其实是比较高的，因为往往需要在两种不同思路下实现功能相同的两个方法，暴力一个、想象中的最优解是另一个。  
以后的很多题目都会用到对数器，几乎可以验证任何方法，尤其在验证贪心、观察规律方面很有用  
到时候会丰富很多对数器的实战用法，这里只是一个简单易懂的示例   


## 对数器代码


```java
import lombok.SneakyThrows;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Arrays;
import java.util.Random;

public class Validator {

    public static void main(String[] args) throws NoSuchAlgorithmException {
        Random random = SecureRandom.getInstanceStrong();

        // 随机数组最大长度
        int length = 50;
        // 随机的每个值
        int maxNum = 1000;
        // 测试次数
        int testTimes = 5000;
        System.out.println("测试开始");
        for (int i = 0; i < testTimes; i++) {
            // 随机得到一个长度，值是[0~N-1]
            int currentLength = random.nextInt(length) ;
            // 根据长度和最大值，获取随机数组
            int[] arr = randomArray(currentLength, maxNum);
            int[] arr1 = cloneArray(arr);
            int[] arr2 = cloneArray(arr);
            int[] arr3 = cloneArray(arr);

            // 暴力解
            M001SelectionSort.selectionSort(arr1);
            M002BubblingSort.bubbleSort(arr2);

            // 最优解
            M003InsertionSort.insertionSort(arr3);

            // 验证结果是否相同
            if(!sameArray(arr1, arr2, arr3)) {
                // 当有错了打印出是什么例子出错的
                // 可以手动调用三个功能看排成什么样。
                // 可以把例子带入每个方法进行debug
                System.out.println("出错了：" + Arrays.toString(arr));
            }

        }
        System.out.println("测试结束!");


    }



    /**
     * 得到一个随机数组。
     * @param length 数组
     * @param maxNum 随机数
     * @return
     */
    @SneakyThrows
    public static int[] randomArray(int length, int maxNum) {
        int[] arr = new int[length];
        Random random = SecureRandom.getInstanceStrong();
        for (int i = 0; i < length; i++) {
            arr[i] = random.nextInt(maxNum) + 1;
        }
        return arr;
    }

    /**
     * 克隆一个数组
     * @param arr 源数据
     * @return 克隆的新数组
     */
    public static int[] cloneArray(int[] arr) {
        int[] dest = new int[arr.length];
        System.arraycopy(arr, 0, dest, 0, arr.length);
        return dest;
    }

    /**
     * 验证多个数组是否相同
     * @param arr1 源数组
     * @param arr2 待对比的目标数组
     * @return 相同为true,否则为flase
     */
    public static boolean sameArray(int[] arr1, int[]... arr2) {
        for (int[] ints : arr2) {
            if (ints.length != arr1.length) {
                return false;
            }

            for (int i = 0; i < arr1.length; i++) {
                if (ints[i] != arr1[i]) {
                    return false;
                }
            }
        }
        return true;
    }

}
```