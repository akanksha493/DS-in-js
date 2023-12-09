class Node{
    constructor(){
        this.value = 0;
        this.next = null;
    }
}

class linkedList{
    constructor(){
        this.size = 0;
        this.head = null;
        this.tail = null;
    }
    append(data){
        const node = new Node();
        node.value = data;
        if(this.size===0){
            this.head = node;
            this.tail = node;
        }
        else{
            this.tail.next = node;
            this.tail = node;
        }
        this.size++;
    }
    prepend(data){
        const node = new Node();
        node.value = data;
        if(this.size === 0){
            this.head = node;
            this.tail = node;
        }
        else{
            node.next = this.head;
            this.head = node;
        }
        this.size++;
    }
    getSize(){
        return this.size;
    }
    getHead(){
        return this.head.value;
    }
    getTail(){
        return this.tail.value;
    }
    at(index){
        if(index>=3)return `node at index ${index} doesn't exist`;
        else{
            let node = this.head;
            for(let i=0;i<index;i++){
                node = node.next;
            }
            return node.value;
        }
    }
    pop(){
        let node = this.head;
        while(node.next.next!==null){
            node = node.next;
        }
        console.log(node.next.value + " is popped");
        node.next = null;
        this.tail = node;
        this.size--;
    }
    contains(value){
        let node = this.head;
        while(node!==null){
            if(node.value === value) return true;
            node = node.next;
        }
        return false;
    }
    find(value){
        let node = this.head;
        let idx = 0;
        while(node!==null){
            if(node.value === value) return idx;
            node = node.next;
            idx++;
        }

        return null;
    }
    toString(){
        let node = this.head;
        let result = "";
        while(node!== null){
            result+=`( ${node.value} ) -> `;
            node = node.next;
        }
        result+="null";
        console.log(result);
    }
    insertAt(value, index){
        const newNode = new Node();
        newNode.value = value;
        if(index === 0){
            newNode.next = this.head;
            this.head = newNode;
            this.size++;
            return `node is successfully added at index :${index}`;
            
        }
        else if(index===this.size){
            this.tail.next = newNode;
            this.tail = newNode;
            this.size++;
            return `node is successfully added at index :${index}`;
        }
        else if(index > this.size){
            return `FAILURE!!please enter a index in range [0, ${this.size-1}]`;
        }
        else{
            let i=0;
            let current = this.head;
            let previous = null;
            while(current!=null && i<index){
                previous = current;
                current = current.next;
                i++;
            }
            previous.next = newNode;
            newNode.next = current;
            this.size++;
            return `node is successfully added at index :${index}`;
        }
        
    }
    removeAt(index){
        if(index > this.size-1){
            return "please enter a valid index";
        }
        let toDelete ;
        if(index === 0){
            toDelete = this.head;
            this.head = this.head.next ;
        }
        else{
            let previous =  this.head;
            for(let i=0;i<index-1;i++){
                previous = previous.next;
            }
            toDelete = previous.next;
            previous.next = previous.next.next;
        }
        this.size--;
        return `${toDelete.value} at index : ${index} is deleted`;
    }
    // get size(){
    //     return this.size;
    // }
    // get head(){
    //     return this.head;
    // }
    // get tail(){
    //     return this.tail;
    // }


}

const ll = new linkedList();
ll.append(3);
ll.append(4);
ll.prepend(5);
ll.append(6);
console.log(ll.getSize());
console.log(ll.getHead());
console.log(ll.getTail());
console.log(ll.at(5));
console.log(ll.at(2));
ll.pop();
console.log(ll.getTail());
console.log(ll.contains(3));
console.log(ll.contains(8));
console.log(ll.find(4));
console.log(ll.find(9));
ll.toString();
console.log(ll.insertAt(8,3));
ll.toString();
console.log(ll.getTail());
console.log(ll.removeAt(0));
ll.toString();

