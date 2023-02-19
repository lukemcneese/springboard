class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    if (val === null) return undefined;
    if (this.root === null){
      this.root.val= val;
      return this;
    }
    let curr = this.root;
    let inserted = false;
    while (!inserted){
      if(val < curr.val){
        if(curr.left === null){
          curr.left = new Node(val);
          inserted = true;
        } else {
          curr = curr.left;
        }
      } else if (val > curr.val){
        if(curr.right === null){
          curr.right = new Node(val);
          inserted = true;
        } else {
          curr = curr.right
        }
      }
    }
    return this;
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    if (val === null) return undefined;
    if (this.root === null){
      this.root.val= val;
      return this;
    }

    if (val < curr.val) {
      if (curr.left === null) {
        curr.left = new Node(val);
        return this;
      }
      return this.insertRecursively(val, curr.left);
    } else {
      if (curr.right === null) {
        curr.right = new Node(val);
        return this;
      }
      return this.insertRecursively(val, curr.right);
    }

  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val, curr = this.root) {
    if (val === null) return undefined;
    let found = false;

    if (curr === null) return undefined;
    if (val === curr.val) return curr;

    while(curr && !found){
      if(val < curr.val){
        curr = curr.left;
      } else if (val > curr.val){
        curr = curr.right;
      } else{
        found = true; 
      }
    }

    if(!found) return undefined;
    return curr;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, curr = this.root) {
    if (val === null) return undefined;
    if (curr === null) return undefined;
    if (val < curr.val) {
      if (curr.left === null) return undefined;
      return this.findRecursively(val, curr.left);
    } else if (val > curr.val) {
      if (curr.right === null) return undefined;
      return this.findRecursively(val, curr.right);
    }
    return curr;

  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder(curr = this.root) {
    let visistedNodes = [];

    function traverse(node){
      visistedNodes.push(node.val);
      node.left && traverse(node.left);
      node.right && traverse(node.right);
    }
    traverse(curr);
    return visistedNodes;

  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder(curr = this.root) {
    let visistedNodes = [];

    function traverse(node){
      node.left && traverse(node.left);
      visistedNodes.push(node.val);
      node.right && traverse(node.right);
    }
    traverse(curr);
    return visistedNodes;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder(curr = this.root) {
    let visistedNodes = [];

    function traverse(node){
      node.left && traverse(node.left);
      node.right && traverse(node.right);
      visistedNodes.push(node.val);
    }
    traverse(curr);
    return visistedNodes;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs(curr = this.root) {
    let visistedNodes = [];
    let queue = [];
    queue.push(curr);

    while (queue.length){
      curr = queue.shift();
      visistedNodes.push(curr.val);
      if(curr.left) queue.push(curr.left);
      if(curr.right) queue.push(curr.right)
    }
    return visistedNodes

  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {

  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {

  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    
  }
}

module.exports = BinarySearchTree;
