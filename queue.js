'use strict';
class _Node {
  constructor(data) {
    this.data = data,
    this.ahead = null,
    this.behind = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
  }

  enqueue(data){
    let newNode = new _Node(data);

    if(this.first === null){
      this.first = newNode;
    }

    if(this.last){
      newNode.ahead = this.last;
      this.last.behind = newNode;
    }

    this.last = newNode;
  }

  dequeue(){
    if(this.first === null){
      return;
    }
    let toRemove = this.first;
    this.first = toRemove.behind;
    if(toRemove === this.last){
      this.last = null;
    }
    //this.first.ahead = null; //not in curriculum, removes ahead value to new first
    return toRemove.value;
  }

}

module.exports = Queue;