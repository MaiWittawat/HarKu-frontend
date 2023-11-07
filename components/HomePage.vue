<template> 
  <div class="min-h-screen hero"
    style="background-image: url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg);">
    <div class="flex absolute top-5 justify-around text-white w-11/12 text-lg">
      <div class="flex gap-8 items-center justify-start w-full">
        <div class="w-20">
          <img src="~/assets/image/logo-app.png" alt="logo-app">
        </div>
        <NuxtLink to="/howto" class="cursor-pointer choice "> วิธีการใช้งาน </NuxtLink>
      </div>
      <div class="flex w-full items-center justify-end">
        <NuxtLink to="/login" class="px-4 py-2 bg-white text-black rounded-lg">เข้าสู่ระบบ</NuxtLink>
      </div>
    </div>
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="hero-content text-center text-neutral-content">
      <div class="max-w-md">
        <h1 class="mb-5 text-5xl font-bold">Welcome To QuickDate</h1>
        <p class="mb-5 text-2xl">Find Your Life Partner.</p>
        <NuxtLink to="/register" class="btn bg-pink-500 text-white hover:text-black">สร้างบัญชี</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style>
.choice{
    position: relative;
    text-decoration: none;
    font-family: 'Poppins',sans-serif;
    color: #dedede;
    font-size: 18px;
    letter-spacing: 0.5px;
    padding: 0 10px;
}
.choice:after{
    content: "";
    position: absolute;
    background-color: #ff3c78;
    height: 2px;
    width: 0;
    left: 0;
    bottom: -10px;
    transition: 0.3s;
}
.choice:hover{
    color: #ffffff;
}
.choice:hover:after{
    width: 100%;
}
</style>