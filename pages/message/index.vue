<template>
    <div class="min-h-full fixed flex bg-white border lg:shadow-sm overflow-hidden inset-0  m-auto lg:h-[90%] rounded-t-lg ">

        <div class="hidden lg:flex relative w-full md:w-[320px] xl:w-[400px] overflow-y-auto shrink-0 h-full border">

            <ChatList></ChatList>

        </div>

        <div class="grid w-full border-l h-full relative overflow-y-auto" style="contain:content">

            <ChatBox></ChatBox>

        </div>
    </div>
    
    <!-- <div
        class="fixed h-full flex bg-white border top-48 lg:shadow-sm overflow-hidden inset-0  m-auto lg:h-[90%] rounded-t-lg ">

        <div class="hidden lg:flex relative w-full md:w-[320px] xl:w-[400px] overflow-y-auto shrink-0 h-full border">

            <ChatListDemo></ChatListDemo>

        </div>

        <div class="grid w-full border-l h-full relative overflow-y-auto" style="contain:content">

            <ChatBoxDemo></ChatBoxDemo>

        </div>

    </div> -->
</template>

<script setup>
definePageMeta({
    layout:"",
})

</script>