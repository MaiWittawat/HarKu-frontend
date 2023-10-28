<template>
    <br>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <div class="flex flex-col items-center justify-center w-full">
        <div v-if="currentUserData" class="flex outline outline-1 w-4/5 rounded-lg">
            <div class="min-h-fit w-2/5 outline outline-1 rounded-l-lg relative">
                <img src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?s=612x612&w=0&k=20&c=kPvoBm6qCYzQXMAn9JUtqLREXe9-PlZyMl9i-ibaVuY=" alt="" class="h-full w-full object-cover rounded-l-lg">
                
                <div class="absolute bottom-10 text-white  w-full flex item-center justify-center gap-20">
                    <button @click="disLike()" class="outline outline-1 bg-black w-16 h-16 rounded-full">DisLike</button>
                    <button @click="" class="outline outline-1 bg-black w-16 h-16 rounded-full">Like</button>
                </div>
               
            </div>

            <div class="flex flex-col ml-5 gap-2">
                <br>
                <name class="text-xl font-bold">{{ currentUserData.name}}</name>
                <span>Computer Science, Student Kasetsart University</span>
                <div class="flex items-center gap-2">
                    <i class="fa-solid fa-cake-candles"></i>
                    <age>{{ currentUserData.info.age }}</age>
                </div>
                <div class="flex flex-col gap-1">
                    <div class="text-sm font-bold">Height</div>
                    <height>{{ currentUserData.info.height }} cm</height>
                </div>  

                <div class="flex flex-col gap-1">
                    <div class="text-sm font-bold">Education</div>
                    <education>{{ currentUserData.info.education }}</education>
                </div>  

                <div class="flex flex-col gap-1">
                    <div class="text-sm font-bold">Smoking</div>
                    <smoking>{{ currentUserData.info.smoking }}</smoking>
                </div>  
        
                <div class="flex flex-col gap-1">
                    <div class="text-sm font-bold">Drinking</div>
                    <drinking>{{ currentUserData.info.drinking }}</drinking>
                </div>  
                
                <div class="flex flex-col gap-3">
                    <div class="text-sm font-bold">Looking For</div>
                    <looking-for class="outline outline-1 flex items-center justify-center w-32 rounded-full text-white" style="outline: 1px solid #ea3968; background-color: #ea3968;">{{ currentUserData.info.relation }}</looking-for>
                </div>  
                
                <div class="flex flex-col gap-3">
                    <div class="text-sm font-bold">My idea for first date</div>
                    <my-idea-first-date class="flex outline outline-1 bg-gray-300 items-center px-4 py-1">{{ currentUserData.info.first_date_idea }}</my-idea-first-date>
                </div>  
                
                <br>
                <!-- <button @click="getAllUser()">getAllUser</button> -->

            </div>
        </div>


        <div v-else-if="currentUserIndex >= (users.length-1) && users.length !== 0">
            end of end
        </div>

        <div v-else>
            fail to fetch
        </div>
    </div>

    <br>

</template>

<script setup>
import { useAuthStore } from '~/stores/useAuthStore';


const auth = useAuthStore()
const users = ref([])
const currentUserIndex = ref(0)
const currentUserData = computed(() => {
  return users.value[currentUserIndex.value]
});

const disLike = () => {
    currentUserIndex.value++
};

const getAllUser = async ()=>{
    // console.log(currentUserIndex.value)
    // console.log(users.value.length)

    /* Laravel */
    const {data: res, err} = await useFetch("http://localhost/api/auth/me",{
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${auth.token}`
        }
    })

    /* Java */
    // const {data: res, err} = await useFetch("http://localhost:8091/api/auth/me",{
    //     method: "POST",
    //     headers: {
    //         "Accept": "application/json",
    //         "Authorization": `Bearer ${auth.token}`
    //     }
    // })

    if (res.value !== null) {
        // console.log(res.value)
        const { email } = res.value
        // console.log(email)
        const { data: allUsers, error } = await useFetch(`http://localhost/api/getUserForMatch/${email}`)

        if (allUsers.value !== null) {
            console.log("Fetch all user success")
            // console.log(allUsers.value)
            users.value = allUsers.value
            console.log(users.value)
        }
        else {
            console.log("Fetch all user fail", error)
        }
    }
    else {
        console.log("error", err)
    }

}

getAllUser()

</script>

