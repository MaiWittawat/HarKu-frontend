<template>
    <div class="flex min-h-screen">
        <div class="w-3/5 bg-cover bg-no-repeat"
            style="background-image: url('https://images.wallpaperscraft.com/image/single/sea_coast_stones_1013919_1920x1080.jpg');">
        </div>

        <div class="w-2/5 flex flex-col items-center justify-center shadow-2xl">

            <div class="flex flex-col items-center">
                <div>logo</div>
                <span>ยินดีต้อนรับสู่ง Tinner</span>
            </div>

            <form @submit.prevent="onSubmit()" class="flex flex-col gap-5 w-3/5 mt-6 ">

                <div class="outline outline-slate-400 outline-1 rounded-sm">
                    <label for="email"></label>
                    <input type="text" v-model="formData.email" placeholder="@email" class="py-2.5 px-2 w-full">
                </div>

                <div class="outline outline-slate-400 outline-1 rounded-sm">
                    <label for="password"></label>
                    <input type="text" v-model="formData.password" placeholder="password" class="py-2.5 px-2 w-full">
                </div>

                <button type="submit" class="shadow-lg my-6 py-1.5 rounded-sm bg-red-400 text-white">เข้าสู่ระบบ</button>
            </form>

            <br>

            <div class="flex flex-col items-center">
                <div class="w-full bg-gray-400 h-0.5 relative flex items-center justify-center">
                    <span class="absolute bg-white rounded-full px-1">or</span>
                </div>
                <br>
                <div>ยังไม่ได้ลงทะเบียนใช่หรือไม่? <a href="/register" class="border-b border-black font-bold">ลงทะเบียนที่นี่</a></div>
            </div>

        </div>
    </div>
</template>

<script setup>

import { useAuthStore } from '~/stores/useAuthStore';

definePageMeta({
    layout: "",
});

const auth = useAuthStore()
const formData = reactive({
    email: "",
    password: "",
})

const onSubmit = async () => {

    const { email, password } = formData

    const { data: response, error } = await useFetch("http://localhost/api/auth/login", {
        method: "POST",
        body: { email, password },
    })

    if (response.value !== null) {
        
        const { access_token, token_type } = response.value

        // console.log("get token")

        if (access_token !== null) {
            auth.setNewToken(access_token)
            const { data: user, error } = await useFetch("http://localhost/api/auth/me", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${auth.token}`
                }
            })

            // console.log(user.value)

            if (user.value !== null) {
                auth.setUser(user.value.name, user.value.email, user.value.id)
                await navigateTo("/main")
            } else {
                auth.clear()
                console.log("Please try again")
            }
        }
    }
    else {
        console.log("error", error)
    }
}


</script>


