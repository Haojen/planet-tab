<style scoped>
@font-face {
    font-family: Prisma;
    src: url("../assets/Azonix.otf");
}
</style>
<template>
    <main class="w-full h-full home">
        <Planet class="absolute pointer-events-none"/>
        <article class="relative z-10 w-full h-full flex flex-col justify-center items-center">
            <header class="flex justify-center items-center mb-4" style="margin-top: -100px;">
                <img class="mr-2" src="../assets/icon-browser-256.png" alt="" style="width: 64px">
                <h1 class="text-white text-center text-6xl pt-4" style="font-family: Prisma;">Planet</h1>
            </header>
            <h2 class="text-2xl text-center font-semibold md:w-5/12 mx-2">
                A cool dynamic 3D planet new tab, support Search, Clock, Weather and custom.
            </h2>
            <section class="mt-12 mx-2 flex justify-center items-center">
                <a href="">
                    <img style="height: 46px;" src="../assets/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg" alt="">
                </a>
                <a class="mx-4" href="">
                    <img style="height: 46px;" src="../assets/Download_on_the_Mac_App_Store_Badge_US-UK_RGB_wht_092917.svg" alt="">
                </a>
                <a href="">
                    <img class="rounded-lg bg-white" style="height: 45px;" src="../assets/chrome-webstore.svg" alt="">
                </a>
            </section>
        </article>
    </main>
</template>

<script lang="ts" setup>
import Planet from '@/component/Planet.vue'
</script>
