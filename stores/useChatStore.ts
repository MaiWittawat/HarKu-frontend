import { defineStore } from 'pinia';

export const useChatStore = defineStore('chat', {
    state: () => ({
        sender_id: null,
        // receiver_id: null,
        messages: [], // สร้าง array เพื่อเก็บข้อความ
    }),
    getters: {
        getChat: (state) => {
            return state.messages
        }
    },
    actions: {
        setSender(id:any){
            this.sender_id = id
        },
        setChat(chat:any){
            this.messages = chat
        },
        addMessage(message: string) {
            this.messages.push(message)
        },
        clearMessages() {
            this.messages = []
            this.sender_id = null
            // this.receiver_id = null
        },
    },
});
