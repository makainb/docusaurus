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

class MyQueue {

    private Stack<Integer> s1;
    private Stack<Integer> s2;

    public MyQueue() {
        s1 = new Stack<>();
        s2 = new Stack<>();
    }

    public void push(int x) {
        s1.push(x);
    }

    public int pop() {
        s1ToS2();
        return s2.pop();
    }

    public int peek() {
        s1ToS2();
        return s2.peek();
    }

    private void s1ToS2(){
        if (!s2.isEmpty()) {
            return ;
        }

        while (!s1.isEmpty()) {
            s2.push(s1.pop());
        }
    }

    public boolean empty() {
        return s1.isEmpty() && s2.isEmpty();
    }
}

```

## 队列实现栈
### 力扣
https://leetcode.cn/problems/implement-stack-using-queues/

### 代码
```java
class MyStack {

    private Queue<Integer> queue;


    public MyStack() {
        queue = new LinkedList<>();
    }

    public void push(int x) {
        int len = queue.size();
        queue.offer(x);
        for (int i = 0; i < len; i++) {
            queue.offer(queue.poll());
        }
    }

    public int pop() {
        return queue.poll();
    }

    public int top() {
        return queue.peek();
    }

    public boolean empty() {
        return queue.isEmpty();
    }
}
```

## 最小栈
### 力扣
https://leetcode.cn/problems/min-stack/

### 代码
说明：由于Java本身的Stack效率低下，造成时间比较慢，可以用自定义数组实现栈，效率会高点，不过用处不大，学习原理就行。

```java
class MinStack {

    private Stack<Integer> stack;
    private Stack<Integer> minStack;

    public MinStack() {
        stack = new Stack<>();
        minStack = new Stack<>();
    }

    public void push(int val) {
        stack.push(val);
        if (minStack.isEmpty() || val < minStack.peek()) {
            minStack.push(val);
        } else {
            minStack.push(minStack.peek());
        }
    }

    public void pop() {
        stack.pop();
        minStack.pop();
    }

    public int top() {
        return stack.peek();
    }

    public int getMin() {
        return minStack.peek();
    }
}

```

## 双端队列
### 力扣
https://leetcode.cn/problems/design-circular-deque

### 代码
```java

class MyCircularDeque {

    private int[] data;

    int l = 0;
    int r = 0;
    int limit;
    int size = 0;

    public MyCircularDeque(int k) {
        data = new int[k];
        limit = k;
    }

    public boolean insertFront(int value) {
        if (isFull()) {
            return false;
        }
        l = (l - 1 + limit) % limit;
        data[l] = value;
        size++;
        return true;
    }

    public boolean insertLast(int value) {
        if (isFull()) {
            return false;
        }
        data[r] = value;
        r = (r + 1 + limit) % limit;
        size++;
        return true;
    }

    public boolean deleteFront() {
        if (isEmpty()) {
            return false;
        }
        l = (l + 1 + limit) % limit;
        size--;
        return true;
    }

    public boolean deleteLast() {
        if (isEmpty()) {
            return false;
        }
        r = (r - 1 + limit) % limit;
        size--;
        return true;
    }

    public int getFront() {
        if (isEmpty()) {
            return -1;
        }
        return data[l];
    }

    public int getRear() {
        if (isEmpty()) {
            return -1;
        }
        return data[(r - 1 + limit) % limit];
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public boolean isFull() {
        return size == limit;
    }
}

```