<template>
    <div class="flex flex-col items-center justify-center">
        <div class="outline outline-1 outline-red-300 p-2 rounded-lg">Member</div>
        <br>
        <div class="w-64 carousel rounded-box h-96" id="box">
            <div class="carousel-item w-full h-80 " v-for="user in users" :key="user.id">
                <div class="card w-64 bg-base-100 shadow h-80">
                    <div class="h-32 flex items-center justify-center"><img
                            src="https://i.pinimg.com/564x/7e/90/41/7e90413a41d442649f4283fb73b846f6.jpg" alt="Shoes"
                            class="h-full object-cover" /></div>
                    <div class="card-body">
                        <h2 class="card-title">{{ user.name }}!</h2>
                        <p>{{ user.gender }}</p>
                        <div class="card-actions justify-end">
                            <NuxtLink class="btn btn-primary" :to="`/message/${user.id}`">Send Message</NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br>
</template>

<script setup>
import { useAuthStore } from '~/stores/useAuthStore';
definePageMeta({
    layout: "custom",
});

const auth = useAuthStore()
const users = ref([])

const getAllUser = async () => {

    const { data: res, err } = await useFetch("http://localhost/api/auth/me", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${auth.token}`
        }
    })

    if (res.value !== null) {
        console.log(res.value)
        const { id } = res.value
        console.log(id)
        const { data: allUsers, error } = await useFetch("http://localhost/api/getAllUser", {
            method: "POST",
            body: { userId: id }
        })

        if (allUsers.value !== null) {
            console.log("Fetch all user success")
            users.value = allUsers.value
        }
        else {
            console.log("Fetch all user fail", error)
        }
    }
    else {
        console.log("error", err)
    }
}

getAllUser()
</script>
