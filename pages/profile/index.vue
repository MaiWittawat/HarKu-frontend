<template>
    <br>
    <br>
    <form @submit.prevent="onSubmitForm()" class="flex w-full items-center justify-center">
        <div class="flex w-4/5">
            <div class="flex flex-col gap-4 w-7/12">
                <h2 class="text-2xl font-bold">{{ auth.user.name }} <span class="text-xl ml-1">({{ formData.age }})</span>
                </h2>
                <h3 class="text-xl font-bold">Photo</h3>

                <div v-if="imageUrls.length !== 0" class="grid grid-cols-3 gap-5 w-full">
                    <div v-for="imageUrl in imageUrls" :key="imageUrl">
                        <img :src="imageUrl" alt="Image Profile" class="h-36 w-32 rounded-md border-2">
                    </div>
                </div>


                <div class="flex flex-col gap-4">
                    <label for="about_me" class="text-xl font-bold">About Me</label>
                    <input v-model="formData.about_me" type="text" name="about_me" class="border-2 p-2  rounded-lg w-4/5"
                        placeholder="Add something about you">
                </div>

                <div class="">
                    <br>
                    <button
                        class="flex select-none items-center gap-3 rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="submit" data-ripple-light="true">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" aria-hidden="true" class="h-5 w-5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z">
                            </path>
                        </svg>
                        Save
                    </button>
                </div>
            </div>

            <div class="w-full flex flex-col ml-12 border-l border-black pl-12 gap-4">
                <div class="flex flex-col gap-2">
                    <label for="education" class="text-xl font-bold">School</label>
                    <input v-model="formData.education" type="text" name="education" placeholder="Add name of school"
                        class="p-2 border-2 rounded-md">
                </div>

                <div class="flex flex-col gap-2">
                    <label for="height" class="text-xl font-bold">Height</label>
                    <input v-model="formData.height" type="text" name="height" placeholder="Add height"
                        class="p-2 border-2 rounded-md">
                </div>

                <div class="flex flex-col gap-3">
                    <label for="smoking" class="font-bold text-xl">Smoking?</label>
                    <div class="flex gap-5 w-4/5">
                        <input type="radio" id="smoking_1" name="smoking" v-model="formData.smoking" value="Smoker"
                            class="hidden">
                        <label for="smoking_1"
                            class="flex flex-col h-10 w-28 border-2 cursor-pointer rounded-full justify-center items-center"
                            :class="{ 'border-pink-500': formData.smoking === 'Smoker' }">Smoker</label>

                        <input type="radio" id="smoking_2" name="smoking" v-model="formData.smoking" value="Non-smoker"
                            class="hidden">
                        <label for="smoking_2"
                            class="flex flex-col h-10 w-48 border-2 cursor-pointer rounded-full justify-center items-center"
                            :class="{ 'border-pink-500': formData.smoking === 'Non-smoker' }">Non-smoker</label>

                    </div>
                </div>

                <div class="flex flex-col gap-3">
                    <label for="drinking" class="font-bold text-xl">Drinking?</label>
                    <div class="flex gap-5 w-4/5">
                        <input type="radio" id="drinking_1" name="drinking" v-model="formData.drinking"
                            value="Sober curious" class="hidden">
                        <label for="drinking_1"
                            class="flex flex-col h-10 w-36 border-2 cursor-pointer rounded-full justify-center items-center"
                            :class="{ 'border-pink-500': formData.drinking === 'Sober' }">Sober
                            curious</label>

                        <input type="radio" id="drinking_2" name="drinking" v-model="formData.drinking" value="Socially"
                            class="hidden">
                        <label for="drinking_2"
                            class="flex flex-col h-10 w-28 border-2 cursor-pointer rounded-full justify-center items-center"
                            :class="{ 'border-pink-500': formData.drinking === 'Socially' }">Socially</label>

                        <input type="radio" id="drinking_3" name="drinking" v-model="formData.drinking" value="Never drink"
                            class="hidden">
                        <label for="drinking_3"
                            class="flex flex-col h-10 w-32 border-2 cursor-pointer rounded-full justify-center items-center"
                            :class="{ 'border-pink-500': formData.drinking === 'Never drink' }">Never
                            drink</label>

                    </div>
                </div>

                <div class="flex flex-col gap-3">
                    <label for="relation" class="font-bold text-xl">Whar are you looking for?</label>
                    <div class="flex flex-col gap-3">

                        <div class="flex gap-5">
                            <input type="radio" id="relation_1" name="relation" v-model="formData.relation" value="Marriage"
                                class="hidden">
                            <label for="relation_1"
                                class="flex flex-col h-10 w-28 border-2 cursor-pointer rounded-full justify-center items-center"
                                :class="{ 'border-pink-500': formData.relation === 'Marriage' }">Marriage</label>

                            <input type="radio" id="relation_2" name="relation" v-model="formData.relation"
                                value="A serious relationship" class="hidden">
                            <label for="relation_2"
                                class="flex flex-col h-10 w-48 border-2 cursor-pointer rounded-full justify-center items-center"
                                :class="{ 'border-pink-500': formData.relation === 'A serious relationship' }">A
                                serious relationship</label>

                            <input type="radio" id="relation_3" name="relation" v-model="formData.relation"
                                value="Something casual" class="hidden">
                            <label for="relation_3"
                                class="flex flex-col h-10 w-40 border-2 cursor-pointer rounded-full justify-center items-center"
                                :class="{ 'border-pink-500': formData.relation === 'Something casual' }">Something
                                casual</label>

                        </div>

                        <div class="flex gap-5">
                            <input type="radio" id="relation_4" name="relation" v-model="formData.relation"
                                value="Prefer not ot say" class="hidden">
                            <label for="relation_4"
                                class="flex flex-col h-10 w-40 border-2 cursor-pointer rounded-full justify-center items-center"
                                :class="{ 'border-pink-500': formData.relation === 'Prefer not ot say' }">Prefer
                                not ot say</label>

                            <input type="radio" id="relation_5" name="relation" v-model="formData.relation"
                                value="Not sure yet" class="hidden">
                            <label for="relation_5"
                                class="flex flex-col h-10 w-36 border-2 cursor-pointer rounded-full justify-center items-center"
                                :class="{ 'border-pink-500': formData.relation === 'Not sure yet' }">Not
                                sure yet</label>
                        </div>


                        <div class="flex flex-col gap-2">
                            <label for="interest" class="text-xl font-bold">Interest</label>
                            <div onclick="my_modal_3.showModal()" @click="getInterest()"
                                class="border-2 w-32 h-10 flex items-center justify-center rounded-full gap-2 cursor-pointer">
                                <i class="fa-solid fa-plus"></i> <span>interest</span>
                            </div>

                            <div v-if="formData.interests.length > 0" class="grid grid-cols-3 gap-3">
                                <div v-for="interest in formData.interests">
                                    <div class="flex items-center justify-center border-2 rounded-full h-10"
                                        style="border-color: #ea3968;">{{ interest.name }}</div>
                                </div>
                            </div>
                        </div>


                        <div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    </form>


    <dialog id="my_modal_3" class="modal">
        <div class="modal-box">
            <form method="dialog" class="flex flex-col gap-4">
                <h3 class="font-bold text-2xl ml-1">Interest</h3>
                <div class="grid grid-cols-3 gap-4">
                    <div v-for="interest in showInterests" :key="interest.id">
                        <input type="checkbox" :id="'interest_' + interest.id" v-model="interests" :value="interest.name"
                            class="hidden">
                        <label :for="'interest_' + interest.id"
                            class="flex flex-col h-10 w-32 border-2 cursor-pointer rounded-full justify-center items-center">{{
                                interest.name }}</label>
                    </div>
                </div>
                <button @click="submitInterest()" class="py-2 rounded-full bg-pink-500 text-white border-2">ยืนยัน</button>
            </form>

            <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
        </div>
    </dialog>

    <br>
</template>

<script setup>
import { useAuthStore } from '~/stores/useAuthStore';
import axios from 'axios';

const auth = useAuthStore();
const showInterests = ref([]);
const interests = ref([]);
const formData = reactive({
    smoking: "",
    drinking: "",
    relation: "",
    interests: [],
    height: "",
    about_me: "",
    education: "",
})

const imageUrls = ref([]);

const uploadedImages = ref(new Array(6).fill(null));

const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            uploadedImages.value[index] = e.target.result;
        };

        reader.readAsDataURL(file);
    }
};

const getImage = (async () => {
    try {
        const { data: response, error } = await useFetch(`http://localhost/api/getProfileImages/${auth.user.email}`);
        if (response.value !== null) {
            imageUrls.value = response.value;
        } else {
            console.error('Failed to fetch image data');
        }
    } catch (error) {
        console.error('Error fetching image data', error);
    }
});


const getInterest = async () => {
    const { data: res, err } = await useFetch("http://localhost/api/getInterests")
    if (res.value !== null) {
        console.log("success")
        showInterests.value = res.value
    }
    else {
        console.log("fail to fetch interest ", err.value)
    }
}

const submitInterest = async () => {
    // console.log(interests.value)
    formData.interests = interests.value

}

const getUserInfo = async () => {
    const email = auth.user.email
    const { data: res, err } = await useFetch(`http://localhost/api/getUser`, {
        method: "POST",
        body: {
            email: email
        }
    })
    if (res.value !== null) {
        console.log(res.value)

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

const onSubmitForm = async () => {
    console.log(uploadedImages);
    const formImage = new FormData();

    for (let i = 0; i < uploadedImages.length; i++) {
        if (uploadedImages[i]) {
            const base64Data = uploadedImages[i].split(',')[1];
            formImage.append(`image_${i}`, base64Data, `image_${i}.jpg`);
        }
    }


    const { relation, smoking, drinking, education, height, about_me } = formData

    const { data: res, err } = await useFetch("http://localhost/api/editProfile", {
        method: "POST",
        body: {
            email: auth.user.email,
            relation: relation,
            smoking: smoking,
            drinking: drinking,
            education: education,
            height: parseInt(height),
            about_me: about_me,
            interests: interests,
            images: formImage,
        }
    })
    if (res.value !== null) {
        console.log(res.value)
    }
    else {
        console.log("fail to change user profile ", err)
    }
}


watch([() => auth.user.email, () => auth.user.name], ([newEmail, newName]) => {
    if (newEmail === "" && newName === "") {
        formData.smoking = "";
        formData.drinking = "";
        formData.relation = "";
        formData.interests = [];
        formData.height = "";
        formData.about_me = "";
        formData.education = "";
    }
});

getUserInfo()
getImage()

</script>


<style>
input:checked+label {
    border-color: #ea3968;
    box-shadow: 0 10px 20px -3px rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
}
</style>