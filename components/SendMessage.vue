<template>
    <div>
        <form @submit.prevent="onSubmit()">
            <div class="absolute bg-white border-t w-full bottom-0 flex" id="chatbox_footer">

                <div id="custom_form_group" class="flex flex-nowrap w-full py-2 px-2 ">
                    <input v-model="messageIp" type="text" id="control"
                        class="outline-none p-1 shadow-none rounded-md bg-gray-200 pl-4" style="width: 90%">
                    <button id="submit" class="text-base font-bold text-blue-700" style="width: 10%">Send</button>
                </div>
            </div>
        </form>

    </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/useAuthStore';
import { useMessageStore } from '~/stores/useMessageStore';
import axios from 'axios';

const { $io } = useNuxtApp()

const messageIp = ref()
const auth = useAuthStore()
const m = ref({
    sender_id: auth.user.id,
    receiver_id: null
})


const messageStore = useMessageStore()

onMounted(() => {
    $io.on('message', (messageValue) => {
        // // console.log('message from onMounted: ',message)
        // messageStore.addMessage(message)
        // // console.log('messageStore', messageStore.messages)

        const created_at = getFormattedDate();

        const message = {
            id: messageStore.messages.length + 1, // คำนวณ ID ตามจำนวนข้อความที่มี
            sender_id: m.value.receiver_id, // คุณอาจต้องแก้ไขให้ถูกต้องตามข้อมูล
            receiver_id: m.value.sender_id, // คุณอาจต้องแก้ไขให้ถูกต้องตามข้อมูล
            read: 0,
            body: messageValue,
            created_at: created_at,
            updated_at: created_at
        };

        messageStore.addMessage(message)
    })
})


const onSubmit = async () => {
    await getReceiverId()

    // console.log(messageIp.value.trim())
    if (messageIp.value.trim()) {
        try {
            const response = await axios.post('http://localhost/api/message', {
                sender_id: m.value.sender_id,
                receiver_id: m.value.receiver_id,
                body: messageIp.value.trim()
            });
            if (messageStore.messages.length !== 0) {
                const lastIndex = await useFetch('http://localhost/api/lastMessageIndex')
                // console.log(lastIndex.data.value)
                const messageValue = messageIp.value.trim()

                const message = {
                    id: parseInt(lastIndex.data.value),
                    sender_id: m.value.sender_id,
                    receuver_id: m.value.receiver_id,
                    read: 0,
                    body: messageValue,
                    created_at: getFormattedDate(),
                    updated_at: getFormattedDate()
                }
                // console.log(message)
                messageStore.addMessage(message)
                $io.emit("message", messageValue)
                // console.log(messageStore.messages);

            }
            // console.log(response)


        } catch (error) {
            console.error('Fail to send Message:', error);
        }
        messageIp.value = '';
    }
};


const getReceiverId = async () => {

    const response = await axios.post("http://localhost/api/getUser", {
        email: messageStore.receiver.email
    })
    if (response !== null) {
        // console.log(response)
        m.value.receiver_id = response.data.id

    }
    else {
        console.log("fail to getUser")
    }
}

const getFormattedDate = () => {
    const currentDate = new Date();
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Bangkok'
    };

    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(currentDate);
}


</script>