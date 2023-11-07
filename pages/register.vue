<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <div class="outline min-h-screen flex flex-col items-center justify-center">
        <div class="text-3xl font-bold my-10">สร้างบัญชี</div>

        <form @submit.prevent="onSubmitForm()" class="w-4/5 flex flex-col gap-10 items-center justify-center"
            enctype="multipart/form-data">
            <div class="flex">
                <div class="flex w-4/5  justify-center">
                    <div class="flex w-4/5 gap-3 flex-col">
                        <div class="flex flex-col gap-2">
                            <label for="name">ชื่อ</label>
                            <input type="text" placeholder="ชื่อ" v-model="formData.name"
                                class="outline outline-1 outline-gray-400 rounded-md p-2">


                        </div>

                        <div class="flex flex-col gap-2">
                            <label for="password">รหัสผ่าน</label>
                            <input type="text" placeholder="รหัสผ่าน" v-model="formData.password"
                                class="outline outline-1 outline-gray-400 rounded-md p-2">
                        </div>

                        <div class="flex flex-col gap-2">
                            <label for="email">อีเมล</label>
                            <input type="text" placeholder="อีเมล" v-model="formData.email"
                                class="outline outline-1 outline-gray-400 rounded-md p-2">
                        </div>

                        <div class="flex flex-col gap-2">
                            <label for="birthday">วันเกิด (ค.ศ.)</label>
                            <div class="grid grid-cols-3 gap-3 w-3/5">
                                <input type="number" placeholder="วัน"
                                    class="outline outline-1 outline-gray-400 text-center rounded py-2"
                                    v-model="formData.birtday[0]">
                                <input type="number" placeholder="เดือน"
                                    class="outline outline-1 outline-gray-400 text-center rounded py-2"
                                    v-model="formData.birtday[1]">
                                <input type="number" placeholder="ปี"
                                    class="outline outline-1 outline-gray-400 text-center rounded py-2"
                                    v-model="formData.birtday[2]">
                            </div>
                        </div>

                        <br>

                        <div class="flex flex-col gap-2">
                            <label for="gender">เพศ</label>
                            <div class="flex gap-2">
                                <input type="radio" id="gender_1" name="gender" v-model="formData.gender" value="man"
                                    class="hidden">
                                <label for="gender_1"
                                    class="flex flex-col h-10 w-24 border-2 cursor-pointer rounded-full justify-center items-center">ผู้ชาย</label>

                                <input type="radio" id="gender_2" name="gender" v-model="formData.gender" value="men"
                                    class="hidden">
                                <label for="gender_2"
                                    class="flex flex-col h-10 w-24 border-2 cursor-pointer rounded-full justify-center items-center">ผู้หญิง</label>

                                <input type="radio" id="gender_3" name="gender" v-model="formData.gender" value="other"
                                    class="hidden">
                                <label for="gender_3"
                                    class="flex flex-col h-10 w-24 border-2 cursor-pointer rounded-full justify-center items-center">อื่นๆ
                                    ></label>
                            </div>
                        </div>

                        <div class="flex flex-col gap-2">
                            <label for="show_sex">เเสดง</label>
                            <div class="flex gap-2">
                                <input type="radio" id="show_1" name="show" v-model="formData.show_gender" value="man"
                                    class="hidden">
                                <label for="show_1"
                                    class="flex flex-col h-10 w-24 border-2 cursor-pointer rounded-full justify-center items-center">ผู้ชาย</label>
                                <input type="radio" id="show_2" name="show" v-model="formData.show_gender" value="men"
                                    class="hidden">
                                <label for="show_2"
                                    class="flex flex-col h-10 w-24 border-2 cursor-pointer rounded-full justify-center items-center">ผู้หญิง</label>
                                <input type="radio" id="show_3" name="show" v-model="formData.show_gender" value="all"
                                    class="hidden">
                                <label for="show_3"
                                    class="flex flex-col h-10 w-24 border-2 cursor-pointer rounded-full justify-center items-center">ทุกคน</label>
                            </div>
                        </div>

                        <br>

                        <div class="flex flex-col gap-2">
                            <label for="education" class="font-bold text-xl">Where did you go to school?</label>
                            <input v-model="formData.education" type="text" name="education"
                                placeholder="Add name of school or university"
                                class="outline outline-1 outline-gray-400 rounded-md p-2">
                        </div>

                        <div class="flex flex-col gap-2">
                            <label for="about_me" class="font-bold text-xl">About me?</label>
                            <input v-model="formData.about_me" name="about_me" type="text"
                                placeholder="Add something about you"
                                class="outline outline-1 outline-gray-400 rounded-md p-2">
                        </div>

                        <div class="flex flex-col gap-2">
                            <label for="height" class="font-bold text-xl">How tall are you?</label>
                            <input v-model="formData.height" name="height" type="number" placeholder="height"
                                class="outline outline-1 outline-gray-400 rounded-md p-2 w-24">
                        </div>

                        <div class="flex flex-col gap-2">
                            <div class="font-bold text-xl">Age</div>
                            <span class="text-gray-500">How old are there?</span>
                            <div class="flex items-center justify-start">
                                <label for="min_age"></label>
                                <input v-model="formData.min_age" name="min_age" type="number" placeholder="18"
                                    class="outline outline-1 outline-gray-400 rounded-md w-16 pl-2">
                                <span class="mx-3">To</span>
                                <label for="max _age"></label>
                                <input v-model="formData.max_age" name="max_age" type="number" placeholder="100"
                                    class="outline outline-1 outline-gray-400 rounded-md w-16 pl-2">
                            </div>
                        </div>

                        <div class="flex flex-col gap-2">
                            <label for="distance" class="font-bold text-xl">Distance</label>
                            <span class="text-gray-500">How far away do they live?</span>
                            <input v-model="formData.distance" name="distance" type="number"
                                class="outline outline-1 outline-gray-400 rounded-md w-20 px-2 py-0.5">
                        </div>

                        <div class="flex flex-col gap-2">
                            <label for="relation" class="font-bold text-xl">What are you looking for?</label>
                            <div class="flex flex-col gap-2  w-full">

                                <div class="flex gap-5">
                                    <input type="radio" id="relation_1" name="relation" v-model="formData.relation"
                                        value="Marriage" class="hidden">
                                    <label for="relation_1"
                                        class="flex flex-col h-10 w-48 border-2 cursor-pointer rounded-full justify-center items-center">Marriage</label>

                                    <input type="radio" id="relation_2" name="relation" v-model="formData.relation"
                                        value="A serious relationship" class="hidden">
                                    <label for="relation_2"
                                        class="flex flex-col h-10 w-full border-2 cursor-pointer rounded-full justify-center items-center">A
                                        serious relationship</label>

                                    <input type="radio" id="relation_3" name="relation" v-model="formData.relation"
                                        value="Something casual" class="hidden">
                                    <label for="relation_3"
                                        class="flex flex-col h-10 w-full border-2 cursor-pointer rounded-full justify-center items-center">Something
                                        casual</label>

                                </div>

                                <div class="flex gap-5">
                                    <input type="radio" id="relation_4" name="relation" v-model="formData.relation"
                                        value="Prefer not ot say" class="hidden">
                                    <label for="relation_4"
                                        class="flex flex-col h-10 w-40 border-2 cursor-pointer rounded-full justify-center items-center">Prefer
                                        not ot say</label>

                                    <input type="radio" id="relation_5" name="relation" v-model="formData.relation"
                                        value="Not sure yet" class="hidden">
                                    <label for="relation_5"
                                        class="flex flex-col h-10 w-36 border-2 cursor-pointer rounded-full justify-center items-center">Not
                                        sure yet</label>
                                </div>

                            </div>
                        </div>

                        <div class="flex flex-col gap-2">
                            <label for="smoking" class="font-bold text-xl">Smoking?</label>
                            <div class="flex gap-5 w-4/5">
                                <input type="radio" id="smoking_1" name="smoking" v-model="formData.smoking" value="Smoker"
                                    class="hidden">
                                <label for="smoking_1"
                                    class="flex flex-col h-10 w-28 border-2 cursor-pointer rounded-full justify-center items-center">Smoker</label>

                                <input type="radio" id="smoking_2" name="smoking" v-model="formData.smoking"
                                    value="Non-smoker" class="hidden">
                                <label for="smoking_2"
                                    class="flex flex-col h-10 w-48 border-2 cursor-pointer rounded-full justify-center items-center">Non-smoker</label>

                            </div>
                        </div>

                        <div class="flex flex-col gap-2">
                            <label for="drinking" class="font-bold text-xl">Drinking?</label>
                            <div class="flex gap-5 w-4/5">
                                <input type="radio" id="drinking_1" name="drinking" v-model="formData.drinking"
                                    value="Sober curious" class="hidden">
                                <label for="drinking_1"
                                    class="flex flex-col h-10 w-36 border-2 cursor-pointer rounded-full justify-center items-center">Sober
                                    curious</label>

                                <input type="radio" id="drinking_2" name="drinking" v-model="formData.drinking"
                                    value="Socially" class="hidden">
                                <label for="drinking_2"
                                    class="flex flex-col h-10 w-28 border-2 cursor-pointer rounded-full justify-center items-center">Socially</label>

                                <input type="radio" id="drinking_3" name="drinking" v-model="formData.drinking"
                                    value="Never drink" class="hidden">
                                <label for="drinking_3"
                                    class="flex flex-col h-10 w-32 border-2 cursor-pointer rounded-full justify-center items-center">Never
                                    drink</label>

                            </div>
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
                                        style="border-color: #ea3968;">{{ interest }}</div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>



                <div class="flex flex-col w-2/5 items-center ">
                    <div class="flex items-center justify-center  w-full">
                        <div class=" bg-white w-full">
                            <!-- image -->
                            <div class=" w-full flex items-center justify-center rounded-lg overflow-hidden md:max-w-xl">
                                <div class="md:flex">
                                    <div class="p-1  w-full">
                                        <div
                                            class="relative border-dotted h-48 rounded-lg border-2 border-blue-700 bg-gray-100 flex justify-center items-center">

                                            <div class="absolute">

                                                <div class="flex flex-col items-center">
                                                    <i class="fa fa-folder-open fa-4x text-blue-700"></i>
                                                    <span class="block text-gray-400 font-normal"></span>
                                                </div>
                                            </div>

                                            <input @change="handleFileChange()" ref="fileInput" type="file"
                                                class="h-full w-full opacity-0" name="image" multiple>

                                        </div>
                                        <div class="my-4 w-full flex items-center justify-center">เพิ่มรูปภาพอย่างน้อย 1 รูป
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center justify-center ">
                                <div class="grid grid-cols-3 gap-2 justify-center items-center w-10/12 ">
                                    <div v-for="(preview, index) in imagePreviews" :key="index">
                                        <img :src="preview" alt="Image Preview"
                                            class="h-32 w-32 object-cover rounded-md">
                                    </div>
                                </div>

                            </div>

                        </div>
                        <!-- end image -->
                    </div>
                </div>
            </div>


            <button class="border-2 w-1/2 py-2 rounded-full text-white" style="background-color: #ff7b9f;">ยืนยัน </button>

        </form>

        <dialog id="my_modal_3" class="modal">
            <div class="modal-box">
                <form method="dialog" class="flex flex-col gap-4">
                    <h3 class="font-bold text-2xl ml-1">Interest</h3>
                    <div class="grid grid-cols-3 gap-4">
                        <div v-for="interest in showInterests" :key="interest.id">
                            <input type="checkbox" :id="'interest_' + interest.id" v-model="interests"
                                :value="interest.name" class="hidden">
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
        <a href="/login"
            class="font-bold text-blue-500 text-lg hover:bg-gray-200 px-4 py-1 border-2 rounded-full">มีบัญชีอยู่เเล้วใช่รึเปล่า?เข้าสู่ระบบได้เลย</a>

    </div>
</template>

<script setup>
definePageMeta({
    layout: ""
})
import axios from 'axios';
import { useAuthStore } from '~/stores/useAuthStore';

const showInterests = ref([]);
const interests = ref([]);
const fileInput = ref(null);
const uploadedImage = ref(null);
const auth = useAuthStore();
const imagePreviews = ref([]);

const err = ref({
    status: 0,
    msg: ""

})


const formData = reactive({
    name: "",
    email: "",
    password: "",
    birtday: [0, 0, 0],
    gender: "",
    show_gender: "",
    relation: "",
    smoking: "",
    drinking: "",
    education: "",
    height: 0,
    max_age: 0,
    min_age: 0,
    distance: 0,
    about_me: "",
    interests: [],
})


// const handleFileChange = () => {
    
//     uploadedImage.value = null;

//     uploadedImage.value = Array.from(fileInput.value.files);


//     for (let i = 0; i < uploadedImage.value.length; i++) {
//         const reader = new FileReader();
//         reader.onload = (e) => {
//             imagePreviews.value.push(e.target.result);
//         };
//         reader.readAsDataURL(uploadedImage.value[i]);
//     }
// };

const handleFileChange = () => {
    imagePreviews.value = [];

    uploadedImage.value = Array.from(fileInput.value.files);

    for (let i = 0; i < uploadedImage.value.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreviews.value.push(e.target.result);
        };
        reader.readAsDataURL(uploadedImage.value[i]);
    }
};


const getUserIP = async () => {
    const { data } = await axios("https://ipapi.co/json")
    return data
};


const getInterest = async () => {
    const { data: res, err } = await useFetch("http://localhost/api/getInterests")
    if (res.value !== null) {
        console.log("success")
        showInterests.value = res.value
    }
    else {
        console.log("fail to fetch interest ", err)
    }
}

const submitInterest = async () => {
    // console.log(interests.value)
    formData.interests = interests.value

}

const onSubmitForm = async () => {

    // console.log(formData)
    const { latitude, longitude } = await getUserIP()

    const { name, email, password, gender, show_gender, relation, smoking, drinking, education, height, max_age, min_age, distance, about_me } = formData
    const birthday = formData.birtday[2] + "-" + formData.birtday[1] + "-" + formData.birtday[0]
    const interests = formData.interests

    if (!validateForm()) {
        return;
    }


    const { data: res, err } = await useFetch("http://localhost/api/register", {
        method: "POST",
        body: {
            name,
            email,
            password,
            birthday,
            gender,
            show_gender,
            relation,
            smoking,
            drinking,
            education,
            height,
            max_age,
            min_age,
            distance,
            about_me,
            latitude,
            longitude,
            interests,
        }
    })

    if (res.value !== null) {
        console.log(res.value)
    }
    else {
        console.log("fail to create user ", err)
    }

    if (uploadedImage.value.length > 0) {


        const form = new FormData();
        form.append('email', formData.email);

        uploadedImage.value.forEach((file, index) => {
            form.append(`image[${index}]`, file);
        });

        console.log(form)


        try {
            const response = await fetch('http://localhost/api/upload-image', {
                method: 'POST',
                body: form
            });

            if (response.ok) {
                console.log("Add Image Success")
                alert("Create user success try to login")
                navigateTo('/login')
            } else {
                console.error('Failed to upload image');
            }

        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }
    else {
        console.log("file fail")
    }
}


const validateForm = () => {
    const { name, email, password, gender, show_gender, relation, smoking, drinking, education, height, max_age, min_age, birtday } = formData;

    if (!name || !email || !password || !gender || !show_gender || !relation || !smoking || !drinking || !education) {
        alert('กรุณากรอกข้อมูลทุกช่อง');
        return false;
    }

    if (!validateEmail(formData.email)) {
        alert("กรุณากรอกอีเมลในรูปแบบที่ถูกต้อง");
        return false;
    }

    if (height < 100) {
        alert('ส่วนสูงต้องไม่น้อยกว่า 100');
        return false;
    }

    if (max_age > 100 || max_age < 18 || min_age < 18) {
        alert('อายุต้องอยู่ระหว่าง 18 ถึง 100 ปี');
        return false;
    }
    if (uploadedImage.value.length <= 0 || uploadedImage.value.length > 6) {
        alert('จำนวนภาพต้องไม่น้อยกว่า 1 รูปเเละไม่เกิน 6 รูป');
        return false;
    }

    const [day, month, year] = birtday;
    const currentDate = new Date();
    const maxBirthYear = currentDate.getFullYear() - 18;
    console.log(maxBirthYear)

    if (year < 1900 || year > maxBirthYear || month < 1 || month > 12 || day < 1 || day > 31) {
        alert('กรุณากรอกวันเกิดที่ถูกต้อง');
        return false;
    }

    const userBirthDate = new Date(year, month - 1, day);
    const maxValidDate = new Date();
    maxValidDate.setFullYear(maxValidDate.getFullYear() - 18);

    if (userBirthDate > maxValidDate) {
        alert('คุณต้องมีอายุอย่างน้อย 18 ปีเพื่อใช้บริการนี้');
        return false;
    }

    return true;
};

const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
};


</script>

<style>
input:checked+label {
    border-color: #ea3968;
    box-shadow: 0 10px 20px -3px rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
}
</style>