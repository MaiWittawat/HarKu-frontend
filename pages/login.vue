<template>
    
    <div class="flex min-h-screen">
        <div class="w-3/5 bg-cover bg-no-repeat bg-[url('~/assets/image/login_bg.png')] " style="filter: blur(1px);">
        </div>

        <div class="w-2/5 flex flex-col items-center justify-center shadow-2xl">

            <div class="flex flex-col items-center mb-3">
                <div><img src="~/assets/image/logo-app.png" alt="" class="w-32 h-32 rounded-md"></div>
                <br>
                <span class="subpixel-antialiased">Welcome to QUICKDATE</span>
            </div>

            <form @submit.prevent="onSubmit()" class="flex flex-col gap-5 w-3/5 mt-6 ">

                <div class="relative h-12 w-full min-w-[200px]">
                    <input v-model="formData.email" type="text"
                        class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder=" " />
                    <label for="email"
                        class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1 flex h-full w-full select-none text-[10px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Email
                    </label>
                </div>


                <div v-if="showPassword" class="relative h-12 w-full min-w-[200px]">
                    <input v-model="formData.password" type="text"
                        class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder=" " />
                    <label for="password"
                        class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1 flex h-full w-full select-none text-[10px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Password
                    </label>

                    <div @click="togglePasswordVisibility" class="absolute right-3 top-3.5 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye"
                            viewBox="0 0 16 16">
                            <path
                                d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                            <path
                                d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                        </svg>
                    </div>

                </div>


                <div v-else class="relative h-12 w-full min-w-[200px]">
                    <input v-model="formData.password" type="password"
                        class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder=" " />
                    <label for="password"
                        class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1 flex h-full w-full select-none text-[10px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Password
                    </label>


                    <div @click="togglePasswordVisibility" class="absolute right-3 top-3.5 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-eye-slash" viewBox="0 0 16 16">
                            <path
                                d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                            <path
                                d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                            <path
                                d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                        </svg>
                    </div>
                </div>



                <div class="flex justify-end">
                    <a href="http://localhost/forgot-password" class="flex justify-end hover:underline">Forget password</a>
                </div>


                <button type="submit" class="my-6 py-2.5 rounded-sm bg-pink-500 text-white loginBtn">Login</button>
            </form>

            <br>

            <div class="flex flex-col items-center w-3/5 px-0.5 gap-11">
                <div class="w-full bg-gray-400 h-0.5 relative flex items-center justify-center">
                    <span class="absolute bg-white rounded-full px-1">or</span>
                </div>

                <div class="mt-2">Not registered yet? <a href="/register"
                        class="border-b border-black font-bold">Register here</a></div>
                <a href="/" class="font-bold hover:underline">Go to home</a>
            </div>

        </div>
    </div>
</template>

<style>
.loginBtn:hover {
    box-shadow: 2px 3px 12px 2px #c0c0c0;
}
</style>

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

const showPassword = ref(false);

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

const validate = (email, password) => {
    if (!email) {
        alert("email is  not emtry");
    }
    else if (!password) {
        alert("password is not emtry");
    }
    else if (!email && !password) {
        alert("email and password is not emtry")
    }
    else {
        return true
    }
}

const onSubmit = async () => {

    const { email, password } = formData
    const valid = validate(email, password);

    if (!valid) {
        return
    }

    const { data: response, error } = await useFetch("http://localhost/api/auth/login", {
        method: "POST",
        body: { email, password },
    })

    if (response.value !== null) {
        console.log(response.value)
        const { access_token, token_type } = response.value

        if (access_token !== null) {
            auth.setNewToken(access_token)

            const { data: user, error } = await useFetch("http://localhost/api/auth/me", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${auth.token}`
                }
            })


            if (user.value !== null) {
                auth.setUser(user.value.name, user.value.email, user.value.id)
                await navigateTo("/main")
            } else {
                auth.clear()
                alert("Please try again")
            }
        }
    }
    else {
        alert("Email or password is valid");
    }

}


</script>


