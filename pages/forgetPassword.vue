<template>
    <div class="flex min-h-screen">
        <div class="w-3/5 bg-cover bg-no-repeat"
            style="background-image: url('https://images.wallpaperscraft.com/image/single/sea_coast_stones_1013919_1920x1080.jpg');">
        </div>

        <div class="w-2/5 flex flex-col items-center justify-center shadow-2xl">

            <div class="flex flex-col items-center">
                <div>logo</div>
                <span>Forget Password</span>
            </div>

            <form @submit.prevent="onSubmit()" class="flex flex-col gap-5 w-3/5 mt-6">

                <div class="outline-1 rounded-sm flex flex-col gap-1">
                    <label for="email">Email </label>
                    <input type="text" v-model="email" placeholder="@email" class="py-1 px-2 w-full outline outline-slate-400 outline-1 rounded-sm">
                </div>

                <button type="submit" class="shadow-lg my-6 py-1.5 rounded-sm text-white" style="background-color: #ea3968;">send</button>


                <br>

                <div class="flex items-center w-1/4 outline outline-4 rounded-xl text-white justify-center" style="background-color: #ff7b9f;">
                    <a href="/login">Back</a>
                </div>
            </form>


        </div>
    </div>
</template>

<script setup>
// import nodemailer from 'nodemailer'

definePageMeta({
    layout: "",
})

// const transporter = nodemailer.createTransport({
//   host: "smtp.forwardemail.net",
//   port: 465,
//   secure: true,
//   auth: {
//     // TODO: replace `user` and `pass` values from <https://forwardemail.net>
//     user: "REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM",
//     pass: "REPLACE-WITH-YOUR-GENERATED-PASSWORD",
//   },
// });


const email = ref()




// const onSubmit = () => {
// };


</script>