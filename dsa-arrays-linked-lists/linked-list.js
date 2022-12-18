/** Node: node for a singly linked list. */

 

class Node {

  constructor(val) {

    this.val = val;

    this.next = null;

  }

}

 

/** LinkedList: chained together nodes. */

 

class LinkedList {

  constructor(vals = []) {

    this.head = null;

    this.tail = null;

    this.length = 0;

 

    for (let val of vals) this.push(val);

  }

 

  /** push(val): add new value to end of list. */

 

  push(val) {

    const newNode = Node(val);

    this.tail.next = newNode;

    this.tail = newNode;

    this.length ++;

 

  }

 

  /** unshift(val): add new value to start of list. */

 

  unshift(val) {

    const newNode = Node(val);

    newNode.next = this.head;

    this.head = newNode;

    this.length ++;

 

  }

 

  /** pop(): return & remove last item. */

 

  pop() {

    const currNode = this.head;

    const prevNode = null;

    while(curreNode.next !== this.tail){

      prevNode = currNode;

      currNode = currNode.next;

    }

    prevNode.next = null;

    this.length --;

    return prevNode;

   

  }

 

  /** shift(): return & remove first item. */

 

  shift() {

    const currNode = this.head;

    this.head = this.head.next;

    this.length --;

    return currNode;

  }

 

  /** getAt(idx): get val at idx. */

 

  getAt(idx) {

    const currNode = this.head;

    const currIdx = 0;

    while (currIdx !== idx){

      currNode = currNode.next

      currIdx ++;

    }

    return currNode.val;

 

  }

 

  /** setAt(idx, val): set val at idx to val */

 

  setAt(idx, val) {

    const currNode = this.head;

    const currIdx = 0;

    while (currIdx !== idx){

      currNode = currNode.next

      currIdx ++;

    }

    currNode.val = val;

  }

 

  /** insertAt(idx, val): add node w/val before idx. */

 

  insertAt(idx, val) {

    const currIdx = 0;

    const currNode = this.head;

    const prevNode = null;

    while (currIdx !== idx){

      prevNode = currNode;

      currNode = currNode.next;

      currIdx = 0;

    }

    const newNode = Node(val);

    prevNode.next = newNode;

    newNode.next = currNode;

    this.length ++;

  }

 

  /** removeAt(idx): return & remove item at idx, */

 

  removeAt(idx) {

    const currIdx = 0;

    const currNode = this.head;

    const prevNode = null;

    while(currIdx !== idx){

      prevNode = currNode;

      currNode = currNode.next

      currIdx++;

    }

    prevNode = currNode.next.next;

    this.length --;

    return currNode;

  }

 

  /** average(): return an average of all values in the list */

 

  average() {

    const sum = 0;

    currNode = this.head;

    while (currNode !== this.tail){

      sum += currNode.val;

      currNode = currNode.next;

    }

    return sum/this.length

   

  }

}

 

module.exports = LinkedList;