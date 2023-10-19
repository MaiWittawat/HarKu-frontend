<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
        integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <div class="flex justify-center">

        <div id="chat_container"
            class="fixed w-11/12 h-3/4 mt-8 border-black border flex flex-nowrap rounded-xl px-2 bg-white">

            <div id="chat_list_container" class="h-full border-r border-gray-900" style="width: 27%">
                <ChatList></ChatList>
            </div>


            <div id="chat_box_container" class="w-3/4 h-full relative">
                <ChatBox></ChatBox>

                <SendMessage></SendMessage>
            </div>

        </div>


    </div>
</template>

