import {defineStore} from 'pinia'
export const useReceiverStore = defineStore('recevier',{
    state: ()=>{
        return {
            receiver: {name: "", id: null}
        }
    },
    getters: {
        // getReceiverId: (state) => {return state.receiver.id;},
        getReceiver: (state) => {
            return state.receiver
        }
    },
    actions: {
        setReceiver(id: any , name: string){
            this.receiver.id = id
            this.receiver.name = name
        },
        clear(){
            this.receiver.id = null
            this.receiver.name = ''
        },
        clearReceiverId(){
            this.receiver.id = null
        }
    },
    persist: true
})