<template lang="pug">

.about
    .wrapper(
        ref="about"
    )
        transition(
            name="fade"
            mode="out-in"
        )
            .spinner(
                v-if="isNext && isLoading"
            )
                span
                span
                span
        ul.list
            li.item(
                v-for="item in list"
                ref="item"
            ) {{ item }}
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator"

@Component
export default class AboutView extends Vue {
    @Ref('about') aboutRef!: HTMLDivElement

    list = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

    scrollHeight = 0
    isLoading = false

    get isNext() {
        return this.list.length < 30
    }

    mounted() {
        this.scrollHeight = this.aboutRef.scrollHeight

        this.addEvents()
    }

    beforeDestroy() {
        this.removeEvents()
    }

    async onScroll() {
        if (this.aboutRef.scrollTop === 0 && this.isNext) {
            this.isLoading = true

            setTimeout(() => {
                this.list = [
                    this.list[0] - 5,
                    this.list[0] - 4,
                    this.list[0] - 3,
                    this.list[0] - 2,
                    this.list[0] - 1,
                    ...this.list,
                ]

                this.$nextTick(() => {
                    this.aboutRef.scrollTo(
                        0, this.aboutRef.scrollHeight - this.scrollHeight
                    )

                    this.scrollHeight = this.aboutRef.scrollHeight

                    this.isLoading = false
                })
            }, 1000)
        }
    }

    addEvents() {
        this.aboutRef.addEventListener(
            'scroll',
            this.onScroll,
            { passive: true }
        )
    }

    removeEvents() {
        this.aboutRef.removeEventListener(
            'scroll',
            this.onScroll,
        )
    }
}
</script>

<style lang="scss">
* {
    padding: 0;
    margin: 0;
}

.about {
    margin-top: 50px;
}

@keyframes pulse {
    0% {
        opacity: 1;
    }

    //25% {
    //    opacity: 0;
    //}

    //50% {
    //    opacity: 0;
    //}

    75% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.fade {
    &-enter {
        transform: translateY(-100%);

        &-active {
            transition: transform 0.3s ease;
        }

        &-to {
            transform: translateY(0);
        }
    }

    &-leave {
        transform: translateY(0);

        &-active {
            transition: transform 0.3s ease;
        }

        &-to {
            transform: translateY(-100%);
        }
    }
}

.spinner {
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 60px;

    span {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #ccc;
        animation: pulse 4s ease-in-out infinite;

        & + span {
            margin-left: 20px;
            animation-delay: 1s;

            & + span {
                animation-delay: 2s;
            }
        }

    }
}

.wrapper {
    position: relative;
    width: 600px;
    border: 1px solid;
    height: 90vh;
    overflow-x: hidden;
    overflow-y: auto;
}

.item {
    width: 100%;
    height: 250px;
    font-size: 60px;
    border: 1px solid;

    &:nth-child(n) {
        //background-color: red;
    }

    &:nth-child(2n) {
        //background-color: green;
    }
}
</style>
