<template lang="pug">
#app
    keep-alive
        router-view(
            v-keep-scroll-position
        )
</template>
