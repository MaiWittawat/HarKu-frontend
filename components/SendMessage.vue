<template>
    <footer class="shrink-0 z-10 bg-white inset-x-0">

        <div class="p-2 border-t">

            <form @submit.prevent="sendMessage()" autocapitalize="off">
                <input type="hidden" autocomplete="false" style="display: none;">
                <div class="grid grid-cols-12">
                    <input v-model="messageIp" type="text" autocomplete="off" autofocus placeholder="write you message here" maxlength="1700"
                        class="col-span-11 bg-gray-100 border-0 outline-0 focus:border-0 focus:ring-0 hover:ring-0 rounded-lg focus:outline-none px-3 py-1.5">

                    <button type="submit" class="col-span-1 text-blue-700 font-bold hover:bg-gray-700 mx-4 rounded-md hover:text-white">Send</button>
                </div>
            </form>

        </div>

    </footer>
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
    $io.on('message', (messageValue, sender, receiver) => {

        console.log("from onMounted before set: ",messageStore.last_message)
        messageStore.setLastMessage(messageValue)
        console.log("from onMounted after set: ",messageStore.last_message)

        const created_at = getFormattedDate();

        const message = {
            id: messageStore.messages.length + 1,
            sender_id: m.value.receiver_id,
            receiver_id: m.value.sender_id,
            read: 0,
            body: messageValue,
            created_at: created_at,
            updated_at: created_at
        };

        messageStore.addMessage(message)
    })
})


const sendMessage = async () => {
    console.log(messageIp.value)

    await getReceiverId()


    if (messageIp.value.trim()) {

        const res = await getMatch(messageIp.value.trim(), { id: auth.user.id, name: auth.user.name, email: auth.user.email }, { id: m.value.receiver_id, name: messageStore.receiver.name, email: messageStore.receiver.email })
  
        if (res !== "error") {
            try {
                const response = await axios.post('http://localhost/api/message', {
                    sender_id: m.value.sender_id,
                    receiver_id: m.value.receiver_id,
                    body: messageIp.value.trim()
                });
                if (messageStore.messages.length !== 0) {
                    const lastIndex = await useFetch('http://localhost/api/lastMessageIndex')
             
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

                    messageStore.addMessage(message)
                    messageStore.setLastMessage(message)
                    
             

                }
           


            } catch (error) {
                console.error('Fail to send Message:', error);
            }
        }
        else {
            console.error("Fail to send message")
        }
        messageIp.value = '';
    }
};


const getReceiverId = async () => {

    const response = await axios.post("http://localhost/api/getUser", {
        email: messageStore.receiver.email
    })
    if (response !== null) {
        // console.log(response.data)
        m.value.receiver_id = response.data[0].user.id

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


const getMatch = async (message, sender, receiver) => {

    // console.log("sender: ", sender)
    // console.log("receiver: ", receiver)
    // console.log("message: ", message)

    try {
        const { data: res, error } = await useFetch('http://localhost/api/isMatch', {
            method: "POST",
            body: {
                sender_id: sender.id,
                receiver_id: receiver.id,
            }
        });

        if (res.value !== null) {
            // console.log("have value: ", res.value);

            $io.emit("message", message, sender, receiver, res.value.matchesBy, res.value.matchesTo)
            return "ok"

        } else {
            // console.error("can't send you message");
            return "error"
        }
    } catch (error) {
        console.error("Error in fetching data:", error);
    }
}


</script>