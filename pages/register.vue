<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <div class="outline min-h-screen flex flex-col items-center justify-center">
        <div class="text-3xl font-bold my-10">สร้างบัญชี</div>

        <form @submit.prevent="onSubmit()" class="w-4/5 flex flex-col gap-10 items-center justify-center"
            enctype="multipart/form-data">
            <div class="flex">
                <div class="flex w-3/5  justify-center">
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
                            <label for="birthday">วันเกิด</label>
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

                        <div class="flex flex-col gap-2">
                            <label for="gender">เพศ</label>
                            <div class="flex gap-2">
                                <input type="radio" name="gender" v-model="formData.gender" value="man">ผู้ชาย
                                <input type="radio" name="gender" v-model="formData.gender" value="men">ผู้หญิง
                                <input type="radio" name="gender" v-model="formData.gender" value="other">อื่นๆ >
                            </div>
                        </div>

                        <div class="flex flex-col gap-2">
                            <label for="show_sex">เเสดง</label>
                            <div class="flex gap-2">
                                <input type="radio" name="show" v-model="formData.show_gender" value="man">ผู้ชาย
                                <input type="radio" name="show" v-model="formData.show_gender" value="men">ผู้หญิง
                                <input type="radio" name="show" v-model="formData.show_gender" value="all">ทุกคน
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col w-2/5 items-center justify-center">
                    <div class="grid grid-cols-2 items-center justify-center">
                        <div class=" bg-white px-1">
                            <!-- image -->
                            <div class="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
                                <div class="md:flex">
                                    <div class="w-9/12 p-1">
                                        <div
                                            class="relative border-dotted h-48 rounded-lg border-2 border-blue-700 bg-gray-100 flex justify-center items-center">

                                            <div class="absolute">

                                                <div class="flex flex-col items-center">
                                                    <i class="fa fa-folder-open fa-4x text-blue-700"></i>
                                                    <span class="block text-gray-400 font-normal"></span>
                                                </div>
                                            </div>

                                            <input type="file" @change="handleFileImage" class="h-full w-full opacity-0"
                                                name="image">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- end image -->
                    </div>

                    <div class="my-4 w-full flex items-center justify-center">เพิ่มรูปภาพอย่างน้อย 2 รูป</div>
                </div>
            </div>

            <div class="flex flex-col items-center">
                <div class="w-full bg-gray-400 h-0.5 relative flex items-center justify-center">
                    <span class="absolute bg-white rounded-full px-1">or</span>
                </div>
            </div>

            <div class="flex flex-col w-11/12 gap-2">
                <span for="interest">ความสนใจ</span>
                <button class="outline outline-1 outline-gray-400 text-left rounded-full w-1/5"><i
                        class="fa-solid fa-plus"></i> เพิ่มความสนใจ</button>
            </div>

            <div class="flex flex-col w-11/12 gap-2">
                <span for="sexualOrientation">รสนิยมทางเพศ</span>
                <button class="outline outline-1 outline-gray-400 text-left rounded-full w-1/4"><i
                        class="fa-solid fa-plus"></i> เพิ่มรสนิยมทางเพศ</button>
            </div>

            <button type="submit">submit</button>

        </form>

        <br>
        <a href="/login"
            class="font-bold text-blue-500 text-lg hover:bg-gray-200 px-4 py-1 rounded-full">มีบัญชีอยู่เเล้วใช่รึเปล่า?เข้าสู่ระบบได้เลย</a>

    </div>
</template>

<script setup>
definePageMeta({
    layout: ""
})

const formData = reactive({
    name: "",
    email: "",
    password: "",
    birtday: [0, 0, 0],
    gender: "",
    show_gender: "",
    image: null,
})

const handleFileImage = (event) => {
    formData.image = event.target.files[0]
}

const onSubmit = async () => {


    const { name, email, password, gender, show_gender } = formData;
    const birthday = formData.birtday[0] + "-" + formData.birtday[1] + "-" + formData.birtday[2]
    // const {image} = formData;



    // console.log(name, email, password, birthday, gender, show_gender)
    // console.log(formData)

    const { data: response, error } = await useFetch("http://localhost/api/register", {
        method: "POST",
        body: {
            name,
            email,
            password,
            birthday,
            gender,
            show_gender,
        }
    })

    if (response.value !== null) {
        console.log("success")
        console.log(response.value)
    }
    else {
        const { message } = error.value.data
        console.log("error: ", message)
    }
}


</script>

<style></style>