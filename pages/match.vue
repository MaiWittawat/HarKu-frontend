<template>
    <br>
    <br>
    <div class="flex flex-col items-center">

        <div class="w-11/12 flex gap-3 px-2.5">
            <button @click="getAllMatch" class=" w-36 h-12 rounded-full border-2 font-semibold">
                <div class="flex gap-3 justify-center items-center">
                    <span>
                     
                    </span>
                    <span class="text-xl">Match</span>
                </div>
            </button>


            <button @click="getMatchesBy" class=" w-36 h-12 rounded-full border-2  font-semibold">
                <div class="flex gap-3 justify-center items-center">
                    <span>
                     
                    </span>
                    <span class="text-xl">Like To</span>
                </div>
            </button>


            <button @click="getMatchesTo" class=" w-36 h-12 rounded-full border-2  font-semibold">
                <div class="flex gap-3 justify-center items-center">
                    <span>
                    
                    </span>
                    <span class="text-xl">Like By</span>
                </div>
            </button>
        </div>

        <br>
        <div v-if="data" class="flex w-11/12 flex-col">
            <div v-if="data.length !== 0" class="grid grid-cols-5">
                <div v-for="user in data" class="flex px-3 py-3">
                    <div class="max-w-sm rounded overflow-hidden shadow-lg relative">

                        <img v-if="user['profileImage']" class="w-full h-48 object-cover" :src="user['profileImage']">
                        <img v-else class="w-full h-48 object-cover" src="https://tailwindcss.com/img/card-top.jpg"
                            alt="Sunset in the mountains">

                        <div class="px-6 py-4">
                            <div class="font-bold text-xl mb-2">{{ user['user']['name'] }}</div>
                            <p class="text-gray-700 text-base">
                                {{ user['user']['email'] }} <br>
                            </p>

                            <div v-if="user['user']['last_seen'] === null">
                                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor"
                                    class="bi bi-dot text-green-500 absolute -top-5 -right-5 " viewBox="0 0 16 16">
                                    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                </svg>
                            </div>

                            <div v-else>
                                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor"
                                    class="bi bi-dot text-gray-500 absolute -top-5 -right-5 " viewBox="0 0 16 16">
                                    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                </svg>
                            </div>


                        </div>
                        <br>
                        <div class="flex flex-col items-center pb-6">
                            <div class="flex items-center justify-between w-11/12">
                                <NuxtLink :to="`profile/${user['user']['email']}`"
                                    class="flex items-center justify-center bg-white rounded-md px-3 text-base font-semibold text-gray-900 border w-32 py-2 shadow-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-person-circle mr-2 " viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                        <path fill-rule="evenodd"
                                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                    </svg>
                                    Profile
                                </NuxtLink>
                                <a href="/message" v-if="status === 1"
                                    class="flex items-center justify-center bg-gray-900 rounded-md px-3 text-base font-semibold text-white border w-32 py-2 shadow-md"><svg
                                        xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-chat-dots-fill mr-2" viewBox="0 0 16 16">
                                        <path
                                            d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                    </svg> Message</a>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>

import { useAuthStore } from '~/stores/useAuthStore';

const data = ref();
const auth = useAuthStore();
const status = ref();

const getAllMatch = async () => {
    const { data: res, error } = await useFetch(`http://localhost/api/getMatch/${auth.user.email}`);
    if (res.value !== null) {
        data.value = res.value
        status.value = 1
    }
    else {
        console.log("fail to fetch data getAllMatch ", error)
    }
}

const getMatchesBy = async () => {
    const { data: res, error } = await useFetch(`http://localhost/api/getMatchesBy/${auth.user.email}`);
    if (res.value !== null) {
        data.value = res.value
        status.value = 2
    }
    else {
        console.log("fail to fetch data getRequestMatch", error)
    }
}

const getMatchesTo = async () => {
    const { data: res, error } = await useFetch(`http://localhost/api/getMatchesTo/${auth.user.email}`);
    if (res.value !== null) {
        data.value = res.value
        status.value = 3
    }
    else {
        console.log("fail to fetch data test", error)
    }
}


getAllMatch()
</script>