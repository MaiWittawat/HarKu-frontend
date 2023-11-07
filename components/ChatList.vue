<template>
    <div class="flex flex-col transition-all h-full overflow-hidden w-full">
        <header class="px-3 z-10 bg-white sticky top-0 w-full py-2">

            <div class="border-b justify-between flex items-center pb-2">

                <div class="flex items-center gap-2">
                    <h5 class="text-2xl font-extrabold">Chats</h5>
                </div>

                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="h-7 w-7"
                        viewBox="0 0 16 16">
                        <path
                            d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                    </svg>
                </button>

            </div>

        </header>


        <main class="overflow-y-scroll overflow-hidden grow h-full relative" style="contain: content;">

            <!-- ChatList -->

            <ul v-for="data in users" :key="data.user.id" class="p-2 grid w-full spacey-y-2">
                <li @click="handleSelectUser(data.user.id, data.user.name, data.user.email)"
                    class="py-3 hover:bg-gray-100 rounded-2xl dark:hover:bg-gray-700 transition-colors duration-150 flex gap-4 cursor-pointer px-2">
                    <a href="#" class="shrink-0">

                        <div v-if="data.profileImage !== null" class="ml-auto mr-2 h-10 w-10">
                            <img class="object-cover w-full h-full rounded-full" :src="data.profileImage" alt="">
                        </div>

                        <Avatar v-else></Avatar>
                    </a>
                    <aside class="grid grid-col-12 w-full border-b">

                        <a href="#"
                            class="col-span-11 boder-b pb-2 boder-gray-200 relative overflow-hidden truncate leading-5 w-full flex-nowrap p-1">


                            <!-- name and date -->

                            <div class="flex justify-between w-full items-center">

                                <h6 class="truncate font-medium tracking-wider text-gray-500">{{ data.user.name }}</h6>
                                <small class="text-gray-700">{{ calculateOfflineTime(data.user.last_seen) }}</small>

                            </div>

                            <!-- Message body -->

                            <div class="flex gap-x-2 items-center">

                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-check2" viewBox="0 0 16 16">
                                        <path
                                            d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                                    </svg>
                                </span>
                    
                                <p v-if="data.lastMessage !== null && last_message === ''" class="grow truncate text-sm font-[100]">{{data.lastMessage.body }}</p>
                                <p v-else-if="last_message !== '' " class="grow truncate text-sm font-[100]">{{last_message.body }}</p>
                                <p v-else class="grow truncate text-sm font-[100]">don't have message</p>

                            </div>

                        </a>

                    </aside>
                </li>

            </ul>
        </main>
    </div>
</template>

<script setup>

import { useAuthStore } from '~/stores/useAuthStore';
import { useMessageStore } from '~/stores/useMessageStore';

const users = ref([])
const auth = useAuthStore()
const { $io } = useNuxtApp()
const messageStore = useMessageStore()

const last_message = computed(() => messageStore.last_message);

last_message.value = messageStore.last_message



const handleSelectUser = async (id, name, email) => {
    console.log("messageStore: ",messageStore.last_message)
    console.log(`select: ${name}`);
    await getMatch({ id: auth.user.id, name: auth.user.name, email: auth.user.email }, { id: id, name: name, email: email })

    messageStore.clear()

    messageStore.setReceiver(name, email)
    messageStore.setSender(auth.user.name, auth.user.email)
}


const getMatch = async (sender, receiver) => {

    // console.log("sender: ", sender.id)
    // console.log("receiver: ", receiver.id)

    try {
        const { data: res, error } = await useFetch('http://localhost/api/isMatch', {
            method: "POST",
            body: {
                sender_id: sender.id,
                receiver_id: receiver.id,
            }
        });

        if (res.value !== null) {
            // console.log("have value: ",res.value);

            $io.emit("messageTo", res.value.matchesBy, res.value.matchesTo)

        }

    } catch (error) {
        console.error("Error in fetching data:", error);
    }
}

const getChatList = async () => {
    const { data: res, error } = await useFetch(`http://localhost/api/getChatList/${auth.user.email}`)
    if (res.value !== null) {
        users.value = res.value
    }
    else {
        console.log("fail to fetch ", error)
    }
}

const calculateOfflineTime = (lastSeen) => {
    if (lastSeen === null) {
        return "ออนไลน์";
    }

    const currentTime = new Date();
    const lastSeenTime = new Date(lastSeen);
    const timeDifference = (currentTime - lastSeenTime) / 1000; // เปลี่ยนเป็นวินาที

    const minutes = Math.floor(timeDifference / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    switch (true) {
        case years > 0:
            return `${years} ปี`;
        case months > 0:
            return `${months} เดือน`;
        case days > 0:
            return `${days} วัน`;
        case hours > 0:
            return `${hours} ชั่วโมง`;
        case minutes > 0:
            return `${minutes} นาที`;
        default:
            return `${Math.floor(timeDifference)} วินาที`;
    }
};

getChatList()
</script>