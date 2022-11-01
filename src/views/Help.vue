<style lang="scss" scoped>
    h2 {
        @apply text-xl mx-2 mt-6 mb-3 font-semibold;
    }

    p {
        @apply mx-2;
    }
</style>
<template>
    <main class="flex flex-col justify-center items-centxer md:w-9/12 lg:w-5/12 mx-auto">
        <header class="relative my-6 mx-auto" style="width: 90px">
            <img src="../assets/icon-browser-256.png" style="width: 90px">
            <div class="bg-gradient-to-b from-blue-400 to-blue-500 shadow rounded-2xl p-2 flex justify-center items-center absolute right-0 bottom-0" style="transform: translate(25%, 25%)">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm2-1.645A3.502 3.502 0 0 0 12 6.5a3.501 3.501 0 0 0-3.433 2.813l1.962.393A1.5 1.5 0 1 1 12 11.5a1 1 0 0 0-1 1V14h2v-.645z" fill="rgba(255,255,255,1)"/></svg>
            </div>
        </header>
        <h1 class="text-3xl font-bold mb-4 text-center">Help</h1>
        <h2>Why Need Webpage Contents and Browsing History Permissions?</h2>
        <p>
            Planet Tab provide a easy way to add the website to Planet Tab bookmark bar, so we need webpage permission.
            we may also take advantage of this feature and add more functionality in the future.
            besides, we do not collect your privacy on the site.
        </p>
        <h2>Why weather service always loading?</h2>
        <p>
            If you are living China mainland, the auto detect current location may not working, you need to manually enter an address.
        </p>

        <footer class="mt-24 flex justify-center items-center">
            <button class="bg-blue-500 font-semibold  px-3 py-2 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm17 4.238l-7.928 7.1L4 7.216V19h16V7.238zM4.511 5l7.55 6.662L19.502 5H4.511z" fill="rgba(255,255,255,1)"/></svg>
                <span class="ml-1">Feedback</span>
            </button>
        </footer>
    </main>
</template>