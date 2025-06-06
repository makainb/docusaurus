---
title: 链表
sidebar_position: 1
---

## 链表反转

### 力扣原题

https://leetcode.com/problems/reverse-linked-list

### 代码实现
```java
public ListNode reverseList(ListNode head) {

    ListNode pre = null;
    ListNode next = null;

    while (head != null) {
        next = head.next;
        head.next = pre;
        pre = head;
        head = next;
    }

    return pre;
}
```

## 合并两个有序链表

### 力扣原题
https://leetcode.com/problems/merge-two-sorted-lists

### 代码实现
```java
public ListNode mergeTwoLists(ListNode list1, ListNode list2) {

    if(list1 == null) return list2;
    if(list2 == null) return list1;

    ListNode head = null;
    ListNode v1 = list1;
    ListNode v2 = list2;
    if (list1.val < list2.val) {
        head = list1;
        v1 = list1.next;
    } else {
        head = list2;
        v2 = list2.next;
    }

    ListNode pre = head;
    while (v1 != null && v2 != null) {
        if (v1.val < v2.val) {
            pre.next = v1;
            v1 = v1.next;
        } else {
            pre.next = v2;
            v2 = v2.next;
        }
        pre = pre.next;
    }
    if (v1 != null) {
        pre.next = v1;
    } else {
        pre.next = v2;
    }

    return head;

}
```

## 两个链表相加

### 力扣原题

https://leetcode.cn/problems/add-two-numbers

### 代码
```java
public ListNode addTwoNumbers(ListNode l1, ListNode l2) {

    if (l1 == null) {
        return l2;
    }
    if (l2 == null) {
        return l1;
    }

    ListNode firstNode = null;
    ListNode current = null;

    int one = 0;
    for (int temp = 0, sum = 0; l1 != null || l2 != null; l1 = l1 == null ? null : l1.next, l2 = l2 == null ? null : l2.next) {
        temp = (l1 == null ? 0 : l1.val) + (l2 == null ? 0 : l2.val) + one;
        one = temp / 10;
        sum = temp % 10;
        if (firstNode == null) {
            firstNode = new ListNode(sum);
            current = firstNode;
        } else {
            current.next = new ListNode(sum);
            current = current.next;
        }
    }

    if (one > 0) {
        current.next = new ListNode(one);
    }


    return firstNode;
}

```


## 划分链表

### 力扣原题
https://leetcode.cn/problems/partition-list/description/

### 代码
```java

```