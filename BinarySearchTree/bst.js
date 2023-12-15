const Queue = require('./queue');

class TreeNode{
    constructor(_data){
        this.data = _data;
        this.left = null;
        this.right = null;
    }
}
class BinarySearchTree{
    constructor(array){
        this.root = this.buildTree(array);
    }
    buildTreeUtil(array,l,h){
        if(l>h) return null;
        if(l === h) return new TreeNode(array[l]);
        
        const mid = Math.floor((l+h)/2);
        const node = new TreeNode(array[mid]);
        node.left = this.buildTreeUtil(array, l, mid-1);
        node.right = this.buildTreeUtil(array, mid+1, h);
        return node;
    }
    buildTree(array){
        array.sort((a,b)=> a-b);
        array = [...new Set(array)];
        return this.buildTreeUtil(array, 0, array.length-1);
    }
    prettyPrint(node, prefix = "", isLeft = true){
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
    insert(node, value){
        if(node === null) return new TreeNode(value);
        else if (value < node.data){
            node.left = this.insert(node.left, value);
        }
        else if(value > node.data){
            node.right = this.insert(node.right, value);
        }
        return node;
    }
    inorderPredecessor(node){
        node = node.left;
        while(node.right!==null){
            node = node.right;
        }
        return node;
    }
    delete(node, value){
        if(node === null) return null;
        else if(node.data === value){
            //0 child
            if(node.left===null && node.right===null){
                return null;
            }

            //1 child(left)
            else if(node.left!==null && node.right===null){
                node.data = node.left.data;
                node.left = null;
                return node;
            }
            //1 child (right)
            else if(node.left===null && node.right !== null){
                node.data = node.right.data;
                node.right = null;
                return node;
            }

            //2 child
            else{
                const ip = this.inorderPredecessor(node);
                node.data = ip.data;
                node.left = this.delete(node.left, ip.data);
                return node;
            }
        }
        else if(value < node.data){
            node.left = this.delete(node.left, value);
        }
        else{
            node.right = this.delete(node.right, value);
        }
        return node;
    }
    find(node, value){
        if(node === null) return null;
        else if(value < node.data){
            return this.find(node.left, value);
        }
        else if(value > node.data){
            return this.find(node.right, value)
        }
        else{
            return node;
        }
    }
    inorder(node, traversal, callback = a =>a){
        if(node === null) return;
        this.inorder(node.left, traversal, callback);
        traversal.push(callback(node.data));
        this.inorder(node.right, traversal, callback);
    }
    preorder(node, traversal, callback = a =>a){
        if(node === null) return;
        traversal.push(callback(node.data));
        this.preorder(node.left, traversal, callback);
        this.preorder(node.right, traversal, callback);
    }
    postorder(node, traversal, callback = a =>a){
        if(node === null) return;
        this.postorder(node.left, traversal, callback);
        this.postorder(node.right, traversal, callback);
        traversal.push(callback(node.data));
    }
    levelOrder(node, callback = (a)=>a){
        const q = new Queue();
        q.enqueue(node);
        const traversal = [];
        while(!q.isEmpty()){
            let node = q.dequeue();
            if(node.left!==null){
                q.enqueue(node.left);
            }
            if(node.right!==null){
                q.enqueue(node.right);
            }
            traversal.push(callback(node.data));
        }
        return traversal;
    }
    //level order recursive
    currentLevel(node, level, traversal, callback){
        if(node !== null){
            if(level===0) {
                traversal.push(callback(node.data));
            }
            else if(level>0){
                this.currentLevel(node.left, level-1, traversal, callback);
                this.currentLevel(node.right, level-1, traversal, callback);
            }
        } 
    }
    levelOrderRec(node, callback = (a)=>a){
        const h = this.height(node);
        const traversal = [];
        for(let i=0;i<=h;i++){
            this.currentLevel(node, i, traversal, callback);
        }
        return traversal;
    }
    height(node){
        if(node === null) return -1;
        return Math.max(this.height(node.left), this.height(node.right))+1;
    }
    depth(node){
        return this.height(this.root)-this.height(node);
    }
    isBalanced(){
        return this.height(this.root.left)+1 >= this.height(this.root.right);
    }
    reBalance(){
        const array = this.levelOrder(this.root);
        this.root = this.buildTree(array);
    }
}

function generateRandomArray(lowerRange , upperRange, n = 1){
    if(n===1){
        return Math.floor(Math.random()*upperRange);
    }
    else if(n>1){
        const array = [];
        for(let i=0 ; i<n;i++){
            array.push(Math.floor(Math.random()*upperRange)+lowerRange);
        }
        return array;
    }
}

//driver code
const array = generateRandomArray(0, 100, 10);
const t = new BinarySearchTree(array);
t.prettyPrint(t.root);

console.log("Is tree balanced? "+t.isBalanced());

let inorderTraversal = [];
t.inorder(t.root, inorderTraversal);
console.log("inorder : "+ inorderTraversal);
let preorderTraversal = [];
t.preorder(t.root, preorderTraversal);
console.log("preorder : "+ preorderTraversal);
let postorderTraversal = [];
t.postorder(t.root, postorderTraversal);
console.log("postorder : "+ postorderTraversal);

const newElements = generateRandomArray(100, 500, 10);
for(element of newElements){
    t.insert(t.root, element);
}
t.prettyPrint(t.root);
console.log("Is tree balanced now? "+t.isBalanced());

console.log("Rebalancing Tree..");
t.reBalance();
t.prettyPrint(t.root);
console.log("Is tree balanced now? "+t.isBalanced());

inorderTraversal = [];
t.inorder(t.root, inorderTraversal);
console.log("inorder : "+ inorderTraversal);
preorderTraversal = [];
t.preorder(t.root, preorderTraversal);
console.log("preorder : "+ preorderTraversal);
postorderTraversal = [];
t.postorder(t.root, postorderTraversal);
console.log("postorder : "+ postorderTraversal);


