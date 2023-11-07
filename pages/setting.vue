<template>
    <br>
    <div class="flex w-full justify-center">
        <div class="flex w-4/5">
            <div class="w-4/12 flex flex-col gap-4">
                <div class="text-2xl font-bold">Account Setting</div>

                <div class="flex flex-col gap-4 my-2">
                    <div class="text-lg font-bold">Email</div>
                    <span class="border border-1 border-gray-300 rounded-md px-2 py-2.5">{{ email }}</span>
                </div>

                <form @submit.prevent="onSubmitForm()" class="flex flex-col gap-4">

                    <div class="flex flex-col gap-2 my-1">
                        <label for="currentPassword" class="text-lg font-bold">Change Password</label>
                        <span>Password is at least 4 characters long</span>
                        <br>
                        <input v-model="formData.currentPassword" type="text" placeholder="current password"
                            name="currentPassword" class="px-2 py-2.5 border border-1 border-gray-300 rounded-md">
                        <span v-if="err.status === 1" class="text-red-600">{{ err.msg }}</span>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label for="newPassword">New Password</label>
                        <input v-model="formData.newPassword" type="text" placeholder="new password" name="newPassword"
                            class="px-2 py-2.5 border border-1 border-gray-300 rounded-md">
                        <span v-if="err.status === 2" class="text-red-600">{{ err.msg }}</span>
                    </div>



                    
                    <div class="flex flex-col gap-2 relative">
                        <label for="confirmNewPassword">Confirm Password</label>
                        <input v-model="formData.confirmNewPassword" type="text" placeholder="confirm new password"
                            name="confirmNewPassword" class="px-2 border border-1 border-gray-300 py-2.5 rounded-md">
                        <span v-if="err.status === 3" class="text-red-600">{{ err.msg }}</span>

                    </div>

                    <br>

                    <button
                        class="border border-1 border-gray-300 text-white border-gray-300text-white rounded-full w-24 h-10 shadow-lg"
                        style="background-color:#ea3968;">Change</button>
                </form>



            </div>
            <div class="w-8/12 relative flex items-center justify-center">
                <div class="absolute h-72 w-72 object-cover">
                    <img src="~/assets/image/changeProfile.png" alt="" class="w-full h-full">
                </div>
            </div>
        </div>
    </div>
    <br>
</template>


<style>
input:focus {
    outline-color: #ea3968;
}
</style>

<script setup>

import Swal from 'sweetalert2'
import { useAuthStore } from '~/stores/useAuthStore';

const auth = useAuthStore()
const email = auth.user.email

// const newPassword = ref('')
// const confirmNewPassword = ref('')
// const currentPassword = ref('')

const formData = ref({})

const err = ref({
    status: 0,
    msg: ""

})



const validate = (currentPassword, newPassword, confirmNewPassword) => {
    err.value.msg = '';
    err.value.status = 0;
    // console.log(currentPassword)
    if (currentPassword === "" || currentPassword === undefined) {
        err.value.msg = "Please enter your password."
        err.value.status = 1
        return false
    }
    else if (newPassword.length < 4) {
        err.value.msg = "Password must be at least 4 characters."
        err.value.status = 2
        return false
    }
    else if (newPassword === "" || newPassword === undefined) {
        err.value.msg = "Please enter your new password."
        err.value.status = 2
        return false
    }

    else if (confirmNewPassword === "" || confirmNewPassword === undefined) {
        err.value.msg = "Please enter your new password again."
        err.value.status = 3
        return false
    }
    else if (newPassword !== confirmNewPassword) {
        err.value.msg = "Passwords don't match"
        err.value.status = 3
        return false
    }

    return true

}


const onSubmitForm = async () => {

    const { currentPassword, newPassword, confirmNewPassword } = formData.value
    const check = validate(currentPassword, newPassword, confirmNewPassword)
    console.log(check)
    if (check) {
        Swal.fire({
            title: 'Do you want to save the changes?',
            showCancelButton: true,
            confirmButtonText: 'Save',
        }).then(async (result) => {

            if (result.isConfirmed) {
                const { data: res, error } = await useFetch("http://localhost/api/changePassword", {
                    method: "POST",
                    body: {
                        email: email,
                        newPassword: newPassword,
                        oldPassword: currentPassword,
                    }
                })

                if (res.value !== null) {
                    Swal.fire(`${res.value}!`, '', 'success').then(() => {
                        location.reload();
                    });
                }
                else {
                    Swal.fire('Fail to change', 'Password is valid', 'error');
                }
            }
        })
    }
}

</script>