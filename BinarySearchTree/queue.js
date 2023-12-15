class Queue{
    constructor(){
        this.q = [];
        this.tail = -1;
    }
    enqueue(data){
        this.q.push(data);
        this.tail++;
    }
    dequeue(){
        if(this.q.length>0){
            const top = this.q[0];
            this.q.shift();
            this.tail--;
            return top;
        }
        else return null;
    }
    peek(){
        return this.q[0];
    }
    size(){
        return this.q.length;
    }
    isEmpty(){
        return this.tail===-1;
    }
}

module.exports = Queue;