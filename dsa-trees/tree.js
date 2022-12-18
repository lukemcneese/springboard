/** TreeNode: node for a general tree. */

 

class TreeNode {

  constructor(val, children = []) {

    this.val = val;

    this.children = children;

  }

}

 

class Tree {

  constructor(root = null) {

    this.root = root;

  }

 

  /** sumValues(): add up all of the values in the tree. */

 

  sumValues() {

    let stack = [this.root]

    let sum = 0;

    while (stack.length){

      let current = stack.pop();

      sum += current.val;

      for(let child of current.children){

        stack.push(child);

      }

    }

   

  }

 

  /** countEvens(): count all of the nodes in the tree with even values. */

 

  countEvens() {

    let stack = [this.root]

    let count = 0;

    while (stack.length){

      let current = stack.pop();

      if (current.val % 2 === 0){

        count ++;

      }

      for(let child of current.children){

        stack.push(child)

      }

    }

 

  }

 

  /** numGreater(lowerBound): return a count of the number of nodes

   * whose value is greater than lowerBound. */

 

  numGreater(lowerBound) {

    let stack = [this.root]

    let count = 0;

    while (stack.length){

      let current = stack.pop();

      if (current.val > lowerBound){

        count ++;

      }

      for(let child of current.children){

        stack.push(child)

      }

  }

}

 

module.exports = { Tree, TreeNode };