<template>
    <br>
    <br>
    <div class="flex w-full items-center justify-center">
        <div class="flex w-4/5">
            <div class="flex flex-col gap-4 w-7/12">
                <h2 class="text-2xl font-bold">{{ formData.name }} <span class="text-xl ml-1">({{ formData.age }})</span>
                </h2>
                <h3 class="text-xl font-bold">Photo</h3>
                <div v-if="imageUrls !== 0" class="grid grid-cols-3 gap-3 w-full">
                    <div v-for="imageUrl in imageUrls" :key="imageUrl">
                        <img :src="imageUrl" alt="Image Profile" class="outline">
                    </div>
                </div>
                
                <div v-else>
                    <p>No images found</p>
                </div>
                <div class="flex flex-col gap-4">
                    <h2 class="text-xl font-bold">About Me</h2>
                    <span class="outline p-2 outline-1 rounded-lg">{{ formData.about_me }}</span>
                </div>

            </div>

            <div class="w-full flex flex-col ml-12 border-l border-black pl-12 gap-4">
                <div class="flex flex-col gap-2">
                    <h2 for="education" class="text-xl font-bold">School</h2>
                    <span class="p-2 outline outline-1 rounded-md">{{ formData.education }}</span>
                </div>

                <div class="flex flex-col gap-2">
                    <h2 for="height" class="text-xl font-bold">Height</h2>
                    <span class="p-2 outline outline-1 rounded-md">{{ formData.height }}</span>
                </div>

                <div class="flex flex-col gap-3">
                    <h2 for="smoking" class="font-bold text-xl">Smoking?</h2>
                    <div class="flex gap-5 w-4/5">

                        <span class="hidden"></span>
                        <h3 class="flex flex-col h-10 w-28 border-2 cursor-pointer rounded-full justify-center items-center"
                            :class="{ 'border-pink-500': formData.smoking === 'Smoker' }">Smoker</h3>

                        <span class="hidden"></span>
                        <h3 class="flex flex-col h-10 w-48 border-2 cursor-pointer rounded-full justify-center items-center"
                            :class="{ 'border-pink-500': formData.smoking === 'Non-smoker' }">Non-smoker</h3>

                    </div>
                </div>

                <div class="flex flex-col gap-3">
                    <h2 class="font-bold text-xl">Drinking?</h2>
                    <div class="flex gap-5 w-4/5">
                        <span class="hidden"></span>
                        <h3 class="flex flex-col h-10 w-36 border-2 cursor-pointer rounded-full justify-center items-center"
                            :class="{ 'border-pink-500': formData.drinking === 'Sober curious' }">Sober
                            curious</h3>

                        <span class="hidden"></span>
                        <h3 class="flex flex-col h-10 w-28 border-2 cursor-pointer rounded-full justify-center items-center"
                            :class="{ 'border-pink-500': formData.drinking === 'Socially' }">Socially</h3>

                        <span class="hidden"></span>
                        <h3 class="flex flex-col h-10 w-32 border-2 cursor-pointer rounded-full justify-center items-center"
                            :class="{ 'border-pink-500': formData.drinking === 'Never drink' }">Never
                            drink</h3>

                    </div>
                </div>

                <div class="flex flex-col gap-3">
                    <h2 class="font-bold text-xl">Whar are you looking for?</h2>
                    <div class="flex flex-col gap-3">

                        <div class="flex gap-5">

                            <span class="hidden"></span>
                            <h3 class="flex flex-col h-10 w-28 border-2 cursor-pointer rounded-full justify-center items-center"
                                :class="{ 'border-pink-500': formData.relation === 'Marriage' }">Marriage</h3>

                            <span class="hidden"></span>
                            <h3 class="flex flex-col h-10 w-48 border-2 cursor-pointer rounded-full justify-center items-center"
                                :class="{ 'border-pink-500': formData.relation === 'A serious relationship' }">A
                                serious relationship</h3>

                            <span class="hidden"></span>
                            <h3 class="flex flex-col h-10 w-40 border-2 cursor-pointer rounded-full justify-center items-center"
                                :class="{ 'border-pink-500': formData.relation === 'Something casual' }">Something
                                casual</h3>

                        </div>

                        <div class="flex gap-5">
                            <span class="hidden"></span>
                            <h3 class="flex flex-col h-10 w-40 border-2 cursor-pointer rounded-full justify-center items-center"
                                :class="{ 'border-pink-500': formData.relation === 'Prefer not ot say' }">Prefer
                                not ot say</h3>

                            <span class="hidden"></span>
                            <h3 class="flex flex-col h-10 w-36 border-2 cursor-pointer rounded-full justify-center items-center"
                                :class="{ 'border-pink-500': formData.relation === 'Not sure yet' }">Not
                                sure yet</h3>
                        </div>


                        <div class="flex flex-col gap-2">
                            <h2 for="interest" class="text-xl font-bold">Interest</h2>
                            <div
                                class="border-2 w-32 h-10 flex items-center justify-center rounded-full gap-2 cursor-pointer">
                                <i class="fa-solid fa-plus"></i> <span>interest</span>
                            </div>

                            <div v-if="formData.interests" class="grid grid-cols-3 gap-3">
                                <div v-for="interest in formData.interests">
                                    <div class="flex mt-2 items-center justify-center border-2 rounded-full h-10"
                                        style="border-color: #ea3968;">{{ interest.name }}</div>
                                </div>
                            </div>
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
import axios from 'axios';

const route = useRoute();
const email = route.params.email

const imageUrls = ref([]);
const auth = useAuthStore();
const formData = reactive({
    name: "",
    email: "",
    smoking: "",
    drinking: "",
    relation: "",
    interests: [],
    height: "",
    about_me: "",
    education: "",
})


const getUserInfo = async () => {
    const { data: res, err } = await useFetch(`http://localhost/api/getUser`, {
        method: "POST",
        body: {
            email: email
        }
    })
    if (res.value !== null) {
        // console.log(res.value[0])

        formData.name = res.value[0].user.name
        formData.email = res.value[0].user.email
        formData.drinking = res.value[0].user.info.drinking
        formData.smoking = res.value[0].user.info.smoking
        formData.height = res.value[0].user.info.height
        formData.education = res.value[0].user.info.education
        formData.interests = res.value[0].user.info.interests
        formData.relation = res.value[0].user.info.relation
        formData.about_me = res.value[0].user.info.about_me
        formData.age = res.value[0].age


        console.log(formData)
    }
    else {
        console.log("fail to fetch user info ", err)
    }
}


const getImage = async ()=>{
    const {data: res,error} = await useFetch(`http://localhost/api/getProfileImages/${email}`)
    if (res.value !== null) {
        console.log(res.value)
        imageUrls.value = res.value
        console.log("imageUrls: ",imageUrls.value)
    }
    else {
        console.log("fail to get Image")
    }
}

getImage()
getUserInfo()

</script>


<style>
input:checked+label {
    border-color: #ea3968;
    box-shadow: 0 10px 20px -3px rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
}
</style>