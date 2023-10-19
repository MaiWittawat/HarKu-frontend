import { defineStore } from 'pinia'

export const useMessageStore = defineStore('Message', {
    state: () => ({
        sender: { name: "", email: "" },
        receiver: { name: "", email: "" },
        messages: []
    }),
    getters: {
        getMessages: (state) => {
            return state.messages
        },
        getSender: (state) => {
            return state.sender
        },
        getReceiver: (state) => {
            return state.receiver
        }
    },
    actions: {
        setSender(senderName: string, senderEmail: string) {
            this.sender.name = senderName
            this.sender.email = senderEmail
        },
        setReceiver(receiverName: string, receiverEmail: string) {
            this.receiver.name = receiverName
            this.receiver.email = receiverEmail
        },
        setMessages(messages: any) {
            this.messages = messages
        },
        addMessage(message: string) {
            this.messages.push(message)
        },
        clear() {
            this.messages = []
            this.sender.name = ''
            this.sender.email = ''
            this.receiver.name = ''
            this.receiver.email = ''
        },
    }
})