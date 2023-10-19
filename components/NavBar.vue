<template>
    <nav class="flex items-center justify-center py-6 shadow-lg">
        <div class="flex justify-between w-11/12">
            <div class="flex gap-8">
                <MenuLink to="#" class="cursor-pointer"> logo </MenuLink>
                <MenuLink to="#" class="cursor-pointer"> something </MenuLink>
                <MenuLink to="/profile" class="cursor-pointer"> Profile </MenuLink>
                <MenuLink to="/message" class="cursor-pointer"> Chat </MenuLink>
                <MenuLink to="/match" class="cursor-pointer"> match </MenuLink>
            </div>

            <div v-if="user.name !== '' && user.name !== null" class="flex gap-12  justify-center items-center">
                <div>{{ user.name }}</div>
                <button class="cursor-pointer px-3 py-1 rounded-md hover:bg-slate-500 hover:text-white"
                    @click="logout">logout</button>
            </div>

            <div v-else class="flex gap-12">
                <MenuLink to="/login" class="cursor-pointer px-3 py-1 rounded-md hover:bg-slate-500 hover:text-white"> login</MenuLink>
            </div>


        </div>
    </nav>
</template>


<script setup lang="ts">
import { useAuthStore } from '~/stores/useAuthStore';

const auth = useAuthStore()
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
        console.log("logout success")
        auth.clear()
    }
    else {
        console.log("error", error)
    }
}

</script>