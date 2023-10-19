<template>
    <div>
        <ul v-for="user in users" :key="user.id"  class="w-1/2 p-2 outline outline-1">
            <li class="p-4 rounded flex flex-col items-center justify-center">
                {{user.name}}
            </li>
            <NuxtLink :to="`/message/${user.id}`" class="outline outline-blue-400 outline-1 rounded-sm p-2">message</NuxtLink>
            
        </ul>
    </div>
</template>

<script setup>
const users = ref([])

const getAllUser = async () => {
    const { data: response, error } = await useFetch("http://localhost/api/getAllUser")
    if (response !== null) {
        console.log("fetch all user success")
        console.log(response.value)
        users.value = response.value
    }
    else {
        console.log("error: ", error.value)
    }
}

getAllUser()
</script>