<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />

    <div>
        <div class="border-gray-900 h-16 border-b absolute top-0 w-full flex flex-nowrap justify-between"
            id="messagebox_header">

            <div class="flex items-center gap-1 ml-4 text-lg w-full" id="">


                <div class="flex items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer w-full">

                    <div id="img_container" class="h-8 w-9 mx-0 my-auto ml-3">
                        <img src="https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                            alt="" class="object-cover w-full h-full rounded-full outline outline-1">
                    </div>

                    <div v-if="receiver.name !== ''" id="name" class="pl-2 w-full">
                        {{ receiver.name }}
                    </div>

                    <div v-else class="pl-2 w-full">
                        unknow
                    </div>
                </div>

            </div>

            <div id="info"
                class="text-center text-xl flex flex-nowrap items-center mr-0.5  w-3/12 justify-around text-blue-500">

                <div id="info_item" class="hover:cursor-pointer">
                    <i class="fa-solid fa-phone"></i>
                </div>

                <div id="info_item" class="hover:cursor-pointer">
                    <i class="fa-regular fa-image"></i>
                </div>

                <div id="info_item" class="hover:cursor-pointer">
                    <i class="fa-solid fa-circle-info"></i>
                </div>

            </div>

        </div>

        <div id="messagebox_body" class="absolute w-full top-16  overflow-y-scroll overflow-hidden"
            style="height: 70.5%;">

            <div v-for="message in messages" :key="message">
                <div v-if="auth.user.id === message.sender_id" id="msg_body_me" class="block my-4 rounded-t-lg rounded-l-lg p-2 bg-gray-200 outline mr-6 ml-auto"
                    style="max-width: 80%">
                    {{ message.body }}
                    <!-- me -->
                    <div id="msg_body_me_footer" class="w-full flex justify-end items-end ">
                        <div id="date">
                            5 day ago
                        </div>
                        <div id="read" class="text-green-900">
                            <i class="fa-solid fa-check"></i>
                        </div>
                    </div>
                </div>


                <div v-else id="msg_body_reciver" class="block ml-6 my-4 rounded-t-lg rounded-r-lg p-2 bg-blue-500 text-white"
                    style="max-width: 80%">
                    {{ message.body }}
                    <!-- receiver -->
                    <div id="msg_body_reciver_footer" class="w-full flex justify-end items-end ">
                        <div id="date">
                            5 day ago
                        </div>
                        <div id="read" class="">
                            <i class="fa-solid fa-check"></i>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script setup>


import { useAuthStore } from '~/stores/useAuthStore';
import { useMessageStore } from '~/stores/useMessageStore';
import axios from 'axios';

// const receiverStore = useReceiverStore()
// const receiver = computed(() => receiverStore.getReceiver);
// const messages = ref({})
// const chats = useChatStore()

const auth = useAuthStore()
const messageStore = useMessageStore()

const messages = computed(() => messageStore.messages);
const receiver = computed(() => messageStore.getReceiver)


const m = ref({
    sender_id : auth.user.id,
    receiver_id : null
})

watch(receiver, () => {
    console.log('Receiver changed: ', receiver.value)
    getChatMessage()
},
    { deep: true }
);


const getChatMessage = async () => {
    await getReceiverId()

    console.log(m.value.receiver_id)
    console.log(m.value.sender_id)

    const response = await axios.post('http://localhost/api/chat', {
        sender_id: m.value.sender_id,
        receiver_id: m.value.receiver_id,

    })

    if (response !== null) {
        // console.log('get message success')
        // messages.value = response.data
        // console.log(messages.value)
        console.log(response.data)
  
        
        // const messageBodies = response.data.map(message => message.body);
        // console.log(messageBodies)
        const messageBodies = response.data
        messageStore.setMessages(messageBodies);
        
        console.log(messageStore.messages)


    }
    else {
        console.log('fail to get message')
    }
}

const getReceiverId = async()=>{
    // console.log(messageStore.receiver.email)
    const response = await axios.post("http://localhost/api/getUser",{
        email : messageStore.receiver.email
    })
    if(response !== null){
        // console.log(response)
        m.value.receiver_id = response.data.id
        // console.log("m.receiver_id = ",m.value.receiver_id)
    }
    else {
        console.log("fail to getUser")
    }
}

getChatMessage()
</script>