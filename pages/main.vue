<template>
    <br>
    <br>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />

    <div class="flex flex-col items-center justify-center w-full ">
        <div v-if="currentUserData" class="flex flex-col  justify-center w-3/5  rounded-lg "
            style="box-shadow: 2px 3px 12px 2px #c0c0c0;">

            <div class="flex w-full">
                <div class="outline outline-1 outline-gray-200 rounded-l-lg relative">

                    <div v-if="users[currentUserIndex].profileImage.length <= 0" class="w-72 h-full carousel rounded-l-lg">
                        <div class="carousel-item w-full">
                            <img src="https://embed.pixiv.net/artwork.php?illust_id=107134987"
                                class="w-full h-full object-cover" alt="Tailwind CSS Carousel component" />
                        </div>
                        <div class="carousel-item w-full rounded-l-lg">
                            <img src="https://i.pinimg.com/originals/ac/aa/fa/acaafa228a368d536bef032ecaa93624.jpg"
                                class="w-full h-full object-cover" alt="Tailwind CSS Carousel component" />
                        </div>
                        <div class="carousel-item w-full rounded-l-lg">
                            <img src="https://live.cdn.renderosity.com/gallery/items/3110392/images/2102603/c634843038d3902f1f396ec01836f532_original.jpg"
                                class="w-full h-full object-cover" alt="Tailwind CSS Carousel component" />
                        </div>
                        <div class="carousel-item w-full rounded-l-lg">
                            <img src="https://play-lh.googleusercontent.com/zkesmz0yJ0gL6rZwdKZcqXYzNESfVhcUSu4edBA36AmLN2pLgOU1RCA7MkHMFcfGkg"
                                class="w-full h-full object-cover" alt="Tailwind CSS Carousel component" />
                        </div>
                        <div class="carousel-item w-full rounded-l-lg">
                            <img src="https://play-lh.googleusercontent.com/szO6we7uEfu_QN1ZT8ed5Lh0s1Zgo3P-niDKz3r_mk4gJ_5CCK7SH23UZHj1oziu7q2n"
                                class="w-full h-full object-cover" alt="Tailwind CSS Carousel component" />
                        </div>
                    </div>

                    <div v-else class="w-72 h-full carousel rounded-l-lg">
                        <div v-for="image in users[currentUserIndex].profileImage"
                            class="carousel-item w-full rounded-l-lg">
                            <img :src="image" class="w-full h-full object-cover" alt="Profile Image" />
                        </div>
                    </div>


                    <div class="absolute bottom-5 text-white  w-full flex item-center justify-center gap-20">
                        <button @click="onDisLike()"
                            class="outline-red-500 outline outline-1 bg-transparent  w-16 h-16 rounded-full dislikeBtn hover:scale-125 flex items-center justify-center"><img
                                src="~/assets/image/incorrect_icon.png" alt="" class="h-8 w-8 object-cover"></button>

                        <button @click="onLike(users[currentUserIndex].user.id)"
                            class="outline-pink-500 outline outline-1 bg-transparent  w-16 h-16 rounded-full relative likeBtn hover:scale-125 flex items-center justify-center"><img
                                src="~/assets/image/love_icon.png" alt="" class="h-8 w-10 object-cover"></button>

                    </div>

                </div>

                <div class="flex flex-col ml-5 gap-2">
                    <br>
                    <div class="text-xl font-bold">{{ currentUserData.user.name }}</div>
                    <span>Computer Science, Student Kasetsart University</span>
                    <div class="flex items-center gap-2">
                        <i class="fa-solid fa-cake-candles"></i>
                        <div>{{ currentUserData.age }}</div>
                    </div>
                    <div class="flex flex-col gap-1">
                        <div class="text-sm font-bold">Height</div>
                        <div>{{ currentUserData.user.info.height }} cm</div>
                    </div>

                    <div class="flex flex-col gap-1">
                        <div class="text-sm font-bold">Education</div>
                        <div>{{ currentUserData.user.info.education }}</div>
                    </div>

                    <div class="flex flex-col gap-1">
                        <div class="text-sm font-bold">Smoking</div>
                        <div>{{ currentUserData.user.info.smoking }}</div>
                    </div>

                    <div class="flex flex-col gap-1">
                        <div class="text-sm font-bold">Drinking</div>
                        <div>{{ currentUserData.user.info.drinking }}</div>
                    </div>


                    <div class="flex flex-col gap-3">
                        <div class="text-sm font-bold">Looking For</div>
                        <div class="outline outline-1 flex items-center justify-center rounded-full text-white w-48"
                            style="outline: 1px solid #ea3968; background-color: #ea3968;">{{
                                currentUserData.user.info.relation
                            }}</div>
                    </div>

                    <br>

                </div>


            </div>

        </div>


        <div v-else-if="currentUserIndex >= (users.length - 1) && users.length !== 0">
            <div class="font-bold text-2xl">End of range</div>
        </div>

        <div v-else>
            <div class="font-bold text-2xl">Fail to fetch</div>
        </div>
    </div>

    <br>
</template>


<style>
.dislikeBtn {
    box-shadow: 5px 15px 20px 15px #bc0202 inset
}

.dislikeBtn:hover {
    box-shadow: 5px 15px 20px 30px #bc0202 inset
}

.likeBtn {
    box-shadow: 5px 15px 20px 15px #ea3968 inset
}

.likeBtn:hover {
    box-shadow: 5px 15px 20px 30px #ea3968 inset
}
</style>

<script setup>

import { useAuthStore } from '~/stores/useAuthStore';


const isContentOpen = ref(false);
const auth = useAuthStore()
const users = ref([])
const currentUserIndex = ref(0)

const currentUserData = computed(() => {
    return users.value[currentUserIndex.value]
});

const onDisLike = () => {
    currentUserIndex.value++
};


const onLike = async (id) => {
    const email = auth.user.email
    // console.log(id)
    const { data: res, err } = await useFetch('http://localhost/api/like', {
        method: "POST",
        body: {
            email: email,
            likeTo: id,
        }
    })
    if (res.value !== null) {
        console.log(res.value)
    }
    else {
        console.log("fail to like ", err)
    }
    currentUserIndex.value++
};

const getAllUser = async () => {
    // console.log(currentUserIndex.value)
    // console.log(users.value.length)

    const { data: res, err } = await useFetch("http://localhost/api/auth/me", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${auth.token}`
        }
    })

    if (res.value !== null) {
        // console.log(res.value)
        const { email } = res.value

        const { data: allUsers, error } = await useFetch(`http://localhost/api/getUserForMatch/${email}`)

        if (allUsers.value !== null) {
            console.log("Fetch all user success")
            // console.log(allUsers.value)
            users.value = allUsers.value
            // console.log(users.value)
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

