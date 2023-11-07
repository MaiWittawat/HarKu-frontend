<template>
    <nav class="flex items-center justify-center py-6 shadow-lg">
        <div class="flex justify-between w-11/12">
            <div class="flex gap-8 items-center justify-around w-1/2">
                <div class="w-14">
                    <img src="~/assets/image/logo-app.png" alt="logo-app">
                </div>
                <MenuLink to="/main" class="cursor-pointer" :class="{ 'router-link-active': $route.name === 'main' }"> Home </MenuLink>
                <MenuLink to="/message" class="cursor-pointer" :class="{ 'router-link-active': $route.name === 'message' }"> Chat </MenuLink>
                <MenuLink to="/match" class="cursor-pointer" :class="{ 'router-link-active': $route.name === 'match' }"> match </MenuLink>
            </div>

            <div v-if="user.name !== '' && user.name !== null" class="flex gap-5 justify-center items-center  w-1/2">
                <div class=" w-full flex items-center justify-end">{{ user.name }}</div>
                <div class="navbar bg-base-100 w-32">
                    <div class="flex-none gap-2">
                        <div class="dropdown dropdown-end">
                            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                                <div class="w-full rounded-full">
                                    <img v-if="profile !== ''" :src="profile" />
                                    <img v-else src="https://imgv3.fotor.com/images/gallery/Realistic-Male-Profile-Picture.jpg" />
                                </div>
                            </label>
                            <ul tabindex="0"
                                class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                <li>
                                    <MenuLink to="/profile"> Profile </MenuLink>
                                </li>
                                <li>
                                    <MenuLink to="/setting"> Settings </MenuLink>
                                </li>
                                <!-- <li><button class="cursor-pointer px-3 py-1 rounded-md hover:bg-slate-500 hover:text-white" @click="logout">logout</button></li> -->
                                <li><button @click="logout">logout</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="flex gap-12 items-center justify-center">
                <MenuLink to="/login" class="cursor-pointer px-5 py-2 rounded-md hover:bg-slate-500 hover:text-white border-2 hover:bg-pink-500"> login
                </MenuLink>
            </div>

        </div>
    </nav>
</template>

<style>

.router-link-active {
  color: #ea3968; /* เปลี่ยนสีตามที่คุณต้องการ */
}

</style>


<script setup lang="ts">
import { useAuthStore } from '~/stores/useAuthStore';

const auth = useAuthStore()
const profile = ref()

const user = ref(auth.user)

const logout = async () => {

    const { data: response, error } = await useFetch("http://localhost/api/auth/logout", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${auth.token}`
        }
    })

    if (response !== null) {

        const {data: res, error} = await useFetch("http://localhost/api/updateStatus/",{
            method: "POST",
            body: {
                email: auth.user.email
            }
        })

        if(res.value !== null){
            console.log(res.value)
            auth.clear()
        }
        else {
            console.log("fail to logout")
        }   

    }
    else {
        console.log("error", error)
    }
}

const load = async () => {
    const { data: res, error } = await useFetch("http://localhost/api/getUser", {
        method: "POST",
        body: {
            email: auth.user.email
        }
    })
    if (res.value !== null) {
        profile.value = res.value[0].image

    }
    else {
        console.error("fail to get User ", error)
    }
}
load()

</script>