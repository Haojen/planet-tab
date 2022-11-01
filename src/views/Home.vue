<style scoped>
@font-face {
    font-family: Prisma;
    src: url("../assets/Azonix.otf");
}
.home {
    background: black;
    background: url('../assets/2k_stars.webp')
}
</style>
<template>
    <main class="w-screen h-screen home text-white">
        <Planet/>
        <article class="absolute top-0 left-0 w-full h-full z-50 flex flex-col justify-center items-center">
            <section class="flex-1 w-full flex justify-center items-center flex-col">
                <header class="flex justify-center items-center mb-4">
                    <img class="mr-2" src="../assets/icon-browser-256.png" alt="" style="width: 64px">
                    <h1 class="text-white text-center text-6xl pt-4" style="font-family: Prisma;">Planet</h1>
                </header>
                <h2 class="text-2xl text-center font-semibold md:w-5/12 mx-2">
                    A cool dynamic 3D planet new tab, support Search, Clock and Weather and custom.
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
            </section>
            <footer class="flex flex-col justify-center items-center font-bold">
                <div class="flex justify-center items-center">
                    <router-link to="to" class="mx-2">Help</router-link>
                    <router-link to="to" class="mx-2">Privacy Police</router-link>
                    <router-link to="to" class="mx-2 flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z" fill="rgba(255,255,255,1)"/></svg>
                        <span class="ml-1">
                            Project on Github
                        </span>
                    </router-link>
                </div>
                <div class="my-2 text-sm text-gray-500 font-semibold">
                    <span>Copyright © 2022 HAOZHEN MA</span>
                </div>
            </footer>
        </article>
    </main>
</template>

<script lang="ts" setup>
import Planet from '@/component/Planet.vue'
</script>
