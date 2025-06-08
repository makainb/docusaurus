---
title: 二叉树
sidebar_position: 3
---

前序、中序、后序遍历的规则，是否对二叉树中任意一个节点都适用

## 树的简介
### 什么是二叉树,以及二叉树的节点

### 递归之前序、中序、后序
- 前序：中 → 左 → 右
- 中序：左 → 中 → 右
- 后序：左 → 右 → 中

> 以上内容对所有子节点通用。  
前序就是中在前，中序就是中在中，后序就是中在后


二叉树的遍历，本质上是按照某种顺序“访问”树中的每个节点。递归定义一般是围绕“访问根节点 + 递归遍历左右子树”来展开的。访问顺序不同 → 就形成了 前序、中序、后序 三种常见遍历。

### 案例讲解

```
        A
       / \
      B   C
     / \  / \
    D  E F  G
```

---

### 三种遍历结果更新

1️⃣ 前序遍历（Preorder）： A → B → D → E → C → F → G

2️⃣ 中序遍历（Inorder）： D → B → E → A → F → C → G

3️⃣ 后序遍历（Postorder）： D → E → B → F → G → C → A


## 递归-前序遍历
### 力扣
https://leetcode.cn/problems/binary-tree-preorder-traversal

### 代码
```java
public List<Integer> preorderTraversal(TreeNode root) {
    List<Integer> list = new ArrayList<>();
    preorderTraversal(root, list);
    return list;
}

public void preorderTraversal(TreeNode root, List<Integer> list) {
    if(root == null){
        return ;
    }
    list.add(root.val);
    preorderTraversal(root.left, list);
    preorderTraversal(root.right, list);
}
```

## 递归-中序遍历
### 力扣
https://leetcode.cn/problems/binary-tree-inorder-traversal/

### 代码
```java
public List<Integer> inorderTraversal(TreeNode root) {
    List<Integer> list = new ArrayList<>();
    inorderTraversal(root, list);
    return list;
}

public void inorderTraversal(TreeNode root, List<Integer> list) {
    if(root == null){
        return ;
    }
    inorderTraversal(root.left, list);
    list.add(root.val);
    inorderTraversal(root.right, list);
}
```

## 递归-后序遍历
### 力扣
https://leetcode.cn/problems/binary-tree-postorder-traversal/

### 代码
```java
public List<Integer> postorderTraversal(TreeNode root) {
    List<Integer> list = new ArrayList<>();
    postorderTraversal(root, list);
    return list;
}

public void postorderTraversal(TreeNode root, List<Integer> list) {
    if(root == null){
        return ;
    }
    postorderTraversal(root.left, list);
    postorderTraversal(root.right, list);
    list.add(root.val);
}
```

## 栈-前序遍历
### 力扣
https://leetcode.cn/problems/binary-tree-preorder-traversal

### 代码
```java
public List<Integer> preorderTraversal(TreeNode root) {
    List<Integer> list = new ArrayList<>();
    preorderTraversal(root, list);
    return list;
}

public void preorderTraversal(TreeNode head, List<Integer> list) {
    Stack<TreeNode> stack = new Stack<>();
    stack.push(head);
    while (!stack.isEmpty()) {
        head = stack.pop();
        list.add(head.val);
        if(head.right != null){
            stack.push(head.right);
        }
        if(head.left != null){
            stack.push(head.left);
        }
    }
}
```

## 栈-中序遍历
### 力扣
https://leetcode.cn/problems/binary-tree-inorder-traversal/

### 代码
```java
public List<Integer> inorderTraversal(TreeNode root) {
    List<Integer> list = new ArrayList<>();
    inorderTraversal(root, list);
    return list;
}

public void inorderTraversal(TreeNode head, List<Integer> list) {
    Stack<TreeNode> stack = new Stack<>();
    while (!stack.isEmpty() || head != null) {
        if(head != null) {
            stack.push(head);
            head = head.left;
        }  else {
            head = stack.pop();
            list.add(head.val);
            head = head.right;
        }
    }
}
```

## 双栈-后序遍历
### 力扣
https://leetcode.cn/problems/binary-tree-postorder-traversal/

### 代码
```java
public List<Integer> postorderTraversal(TreeNode root) {
    List<Integer> list = new ArrayList<>();
    postorderTraversal(root, list);
    return list;
}

public void postorderTraversal(TreeNode head, List<Integer> list) {
    Stack<TreeNode> stack = new Stack<>();
    Stack<TreeNode> collect = new Stack<>();

    stack.push(head);

    while (!stack.isEmpty()) {
        head = stack.pop();
        collect.add(head);
        if(head.left != null){
            stack.push(head.left);
        }
        if(head.right != null){
            stack.push(head.right);
        }
    }

    while (!collect.isEmpty()) {
        list.add(collect.pop().val);
    }

}
```

## 单栈-后序遍历
### 力扣
https://leetcode.cn/problems/binary-tree-postorder-traversal/

### 代码
```java
public List<Integer> postorderTraversal(TreeNode root) {
    List<Integer> list = new ArrayList<>();
    postorderTraversal2(root, list);
    return list;
}

public void postorderTraversal(TreeNode h, List<Integer> list) {
    Stack<TreeNode> stack = new Stack<>();

    stack.push(h);
    TreeNode cur = null;

    // 如果始终没有打印过节点，h就一直是头节点
    // 一旦打印过节点，h就变成打印节点
    // 之后h的含义 : 上一次打印的节点
    while (!stack.isEmpty()) {
        cur = stack.peek();
        if (cur.left != null && h.val != cur.left.val && h.val != cur.right.val) {
            // 有左树且左树没处理过
            stack.push(cur.left);
        } else if (cur.right != null && h.val != cur.right.val){
            // 有右树且右树没处理过
            stack.push(cur.right);
        } else {
            list.add(cur.val);
            h = stack.pop();
        }
    }

}

```