---
title: 队列和栈
sidebar_position: 2
---

## 栈与队列的定义
队列 → Queue
特点：先进先出（FIFO, First In, First Out）

栈 → Stack
特点：后进先出（LIFO, Last In, First Out）

## Java环形队列
### 力扣原题
https://leetcode.cn/problems/design-circular-queue

### 代码
```java

class MyCircularQueue {

    int l = 0;
    int r = 0;
    int limit = 0;
    int size = 0;
    int[] arr = null;

    public MyCircularQueue(int k) {
        this.limit = k;
        arr = new int[k];
    }

    public boolean enQueue(int value) {
        if (isFull()) {
            return false;
        }
        arr[r] = value;
        r = (r + 1) % limit;
        size++;
        return true;
    }

    public boolean deQueue() {
        if(isEmpty()){
            return false;
        }
        l = (l + 1) % limit;
        size--;
        return true;
    }

    public int Front() {
        if(isEmpty()){
            return -1;
        }

        return arr[l];
    }

    public int Rear() {
        if(isEmpty()){
            return -1;
        }

        return arr[r == 0 ? limit - 1 : r - 1];
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public boolean isFull() {
        return size == limit;
    }
}
```

## 用栈实现队列
### 力扣
https://leetcode.cn/problems/implement-queue-using-stacks
### Java代码
```java

```

## 队列实现栈
### 力扣
https://leetcode.cn/problems/implement-stack-using-queues/

### 代码
```java

```