/** Node: node for a stack. */

 

class Node {

  constructor(val) {

    this.val = val;

    this.next = null;

  }

}

 

/** Stack: chained-together nodes where you can

 *  remove from the top or add to the top. */

 

class Stack {

  constructor() {

    this.first = null;

    this.last = null;

    this.size = 0;

  }

 

  /** push(val): add new value to end of the stack. Returns undefined. */

 

  push(val) {

    const newNode = new Node(val);

    this.size ++;

    this.last.next = newNode;

    this.last = newNode;

  }

 

  /** pop(): remove the node from the top of the stack

   * and return its value. Should throw an error if the stack is empty. */

 

  pop() {

    if (this.size === 0){

      throw new Error(e)

    }

    const val = this.last.val;

    const currNode = this.head;

    while(currNode.next != this.tail){

      currNode = currNode.next

    }

    this.tail = currNode;

    return val;

  }

 

  /** peek(): return the value of the first node in the stack. */

 

  peek() {

    return this.first.val;

  }

 

  /** isEmpty(): return true if the stack is empty, otherwise false */

 

  isEmpty() {

    if (this.size === 0){

      return true;

    }

    return false;

 

  }

}

 

module.exports = Stack;