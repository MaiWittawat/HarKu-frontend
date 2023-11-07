<template>
    <div class="w-full overflow-hidden">

        <div class="border-b flex flex-col grow h-full">

            <!-- header -->

            <header class="w-full sticky inset-x-0 flex pb-[5px] pt-[5px] top-0 z-10 bg-white border-b">

                <div class="flex w-full items-center px-2 lg:px-4 gap-2 md:gap-5">
                    <a href="/main" class="shrink-0 lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                        </svg>
                    </a>

                    <div v-if="receiver.image !== null && receiver.image !== undefined" class="shrink-0 h-10 w-10">
                        <img class="object-cover w-full h-full rounded-full " :src="receiver.image" alt="" style="">
                    </div>

                    <div v-else-if="receiver.image === null && receiver.name !== '' && receiver.email !== ''" class="shrink-0 h-10 w-10">
                        <Avatar></Avatar>
                    </div>

                    <h6 v-if="receiver.name !== ''" class="font-bold truncate">{{ receiver.name }}</h6>

                </div>
            </header>

            <!-- body -->

            <main ref="messagesContainer"
                class="flex flex-col gap-3 p-2.5 overflow-y-auto flex-grow overscroll-contain overflow-x-hidden w-full my-auto">


                <div v-for="message in messages" :key="message">
                    <div v-if="auth.user.id === message.sender_id" class="chat chat-end">
                        <div class="chat-header flex items-center gap-2">
                            You
                            <time class="text-xs opacity-50 flex">{{ format(new Date(message.created_at), 'dd/MM/yyyy HH: mm') }}
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-check" viewBox="0 0 16 16">
                                    <path
                                        d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                </svg>
                            </time>

                        </div>

                        <div class="chat-bubble max-w-xs text-sm md:text-base tracking-wide lg:tracking-normal text-white" style="background-color: #ea3968;">{{
                            message.body }}</div>

                    </div>

                    <div v-else class="chat chat-start">
                        <Avatar class="chat-image avatar"></Avatar>
                        <div class="chat-header flex items-center gap-2">
                            {{ receiver.name }}
                            <time class="text-xs opacity-50 flex">{{ format(new Date(message.created_at), 'dd/MM/yyyy HH:mm') }}
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-check" viewBox="0 0 16 16">
                                    <path
                                        d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                </svg>
                            </time>

                        </div>
                        <div class="chat-bubble max-w-xs text-sm md:text-base tracking-wide lg:tracking-normal bg-gray-300 text-black">{{
                            message.body }}
                        </div>
                    </div>
                </div>
            </main>


            <!-- footer -->

            <!-- Send Message -->

            <SendMessage v-if="messageStore.sender.name !== '' && messageStore.receiver.name !== ''"></SendMessage>
            <div v-else class="min-h-full flex items-center justify-center font-bold text-xl">Select to start chat</div>

        </div>

    </div>
</template>

<script setup>
import { format } from 'date-fns';
import { useAuthStore } from '~/stores/useAuthStore';
import { useMessageStore } from '~/stores/useMessageStore';
import axios from 'axios';


const auth = useAuthStore()
const messageStore = useMessageStore()
const messagesContainer = ref(null);
const messages = computed(() => messageStore.messages);
const receiver = computed(() => messageStore.getReceiver);

console.log(messageStore.sender.name === '');

const m = ref({
    sender_id: auth.user.id,
    receiver_id: null
})

watch(receiver, () => {
    // console.log('Receiver changed: ', receiver.value)
    getChatMessage()
},
    { deep: true }
);


const getChatMessage = async () => {

    const data = await getReceiverId()

    if (data === "ok") {

        const res = await axios.get(`http://localhost/api/getImage/${messageStore.receiver.email}`)

        if (Object.keys(res.data).length !== 0) {
            receiver.value.image = res.data;
            // console.log(receiver.value)
        }
        else {
            receiver.value.image = null;
        }

        const response = await axios.post('http://localhost/api/chat', {
            sender_id: m.value.sender_id,
            receiver_id: m.value.receiver_id,
        })

        if (response !== null) {

            const messageBodies = response.data
            messageStore.setMessages(messageBodies);

            // console.log(messageStore.messages)
        }
        else {
            console.log('fail to get message')
        }

    }
    else {
        console.log("fail to get Receiver");
    }

}

const getReceiverId = async () => {

    // console.log(messageStore.receiver.email)
    const response = await axios.post("http://localhost/api/getUser", {
        email: messageStore.receiver.email
    })
    if (response !== null) {
        // console.log(response)
        m.value.receiver_id = response.data[0].user.id
        return "ok"
        // console.log("m.receiver_id = ",m.value.receiver_id)
    }
    else {
        console.log("fail to getUser")
        return "error"
    }
}

const scrollMessagesContainerToBottom = () => {
    if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
};


onMounted(() => {
    scrollMessagesContainerToBottom();
});

onUpdated(() => {
    scrollMessagesContainerToBottom();
});

getChatMessage()
</script>