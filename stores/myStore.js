import { EventEmitter} from "events"

class myStore extends EventEmitter{
    constructor(){
        super()
        this.todos
    }
}

const mystore = new myStore;

export default mystore;