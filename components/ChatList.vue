<template>
    <div style="height: 100%" class="">

        <div class="border-gray-900 h-16 border-b flex flex-nowrap items-center justify-center text-center"
            id="chatlist_header">
            <div id="title" class="text-lg flex px-px py-0.5">
                Chat
            </div>
            <div id="img_container" class="ml-auto mr-2 h-12 w-12">
                <img class="object-cover w-full h-full rounded-full"
                    src="https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                    alt="">
            </div>

        </div>

        <div id="chatlist_body"
            class="mr-2 flex flex-col items-center overflow-hidden overflow-y-scroll gap-y-2 mt-3 pl-2 pr-3"
            style="height: 79%">

            <!-- @if (count($conversations) > 0)
            @foreach ($conversations as $conversation) -->
            <div v-for="user in users" :key="user.id" id="chatlist_item">

                <div @click="handleSelectUser(user.id, user.name, user.email)"
                    class="flex flex-nowrap w-full items-center justify-center bg-gray-200 rounded-lg">
                    <div id="chatlist_img_container" class="w-12 h-12 m-auto">
                        <img src="https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                            alt="" class="object-cover w-full h-full rounded-full">
                    </div>


                    <div id="chatlist_info" class="w-9/12 block py-1 px-2 outline-red-300">
                        <div id="top_row" class="flex w-full flex-nowrap">
                            <div id="list_username" class="text-base w-9/12 font-bold">{{ user.name }}</div>
                            <span id="date" class="ml-auto text-sm font-medium">2d </span>
                        </div>

                        <div id="button-row" class="flex w-full flex-nowrap">
                            <div id="message_body" class="w-9/12 truncate font-light text-gray-400">
                                last conversation message
                            </div>

                            <div id="unread_count"
                                class="ml-auto text-sm bg-gray-200 px-1 py-0.5 rounded-full font-light text-red-500">
                                56
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
        <!-- @endforeach

    @else
    you have no conversation
    @endif -->

    </div>
</template>

<script setup>

import { io } from 'socket.io-client';
import { useAuthStore } from '~/stores/useAuthStore';
import { useMessageStore } from '~/stores/useMessageStore';

const users = ref([])
const auth = useAuthStore()
const { $io } = useNuxtApp()
 
const messageStore = useMessageStore()


const handleSelectUser = (id, name, email) => {
    // console.log(`handleSelectUser receiver id : ${id} name :${name}`)
    // receiver.clear()
    // receiver.setReceiver(id, name)
    // chats.clearMessages()
    // chats.setSender(auth.user.id)
    // console.log(chats.sender_id)
    // console.log("set Receiver")
    
    $io.emit("messageTo", {id:id, name:name, email:email})

    messageStore.clear()
    // console.log(messageStore.messages)

    messageStore.setReceiver(name, email)
    messageStore.setSender(auth.user.name, auth.user.email)

    // console.log("sender: ",messageStore.sender)
    // console.log("receiver: ",messageStore.receiver)
    
}

const getAllUser = async () => {

    const { data: res, err } = await useFetch("http://localhost/api/auth/me", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${auth.token}`
        }
    })

    if(res.value !== null){
        console.log(res.value)
        const { id } = res.value
        // console.log(id)
        const {data: allUsers, error} = await useFetch("http://localhost/api/getAllUser",{
            method: "POST",
            body: { userId: id }
        }) 
        
        if(allUsers.value !== null){
            console.log("Fetch all user success")
            // console.log(allUsers.value)
            users.value = allUsers.value
            // receiver.clearReceiverId();
        }
        else {
            console.log("Fetch all user fail", error)
        }
    }
    else {
        console.log("Error fail to get me api", err)
    }
}

getAllUser()
</script>