<template lang="pug">

.collapse
    .header(
        @click="isOpen = !isOpen"
    )
        .title {{ title }}
        .status {{ isOpen ? '-' : '+' }}
    transition(
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @leave="onLeave"
    )
        .wrapper(
            v-if="isOpen"
            ref="wrapper"
        )
            .content(
                ref="content"
            )
                slot

</template>

<script>
import CollapseAnimation from './CollapseAnimation.vue'

export default {
    name: 'Clps-',
    components: {
        CollapseAnimation
    },
    props: {
        title: String
    },
    data: () => ({
        isOpen: false,
        height: {
            current: 0,
            computed: 0,
        }
    }),
    beforeUpdate() {
        console.log('beforeUpdate')
        if (this.wrapperRef && this.isOpen) {
            this.$nextTick(() => {
                console.log('this.contentRef.getBoundingClientRect().height', this.contentRef.getBoundingClientRect().height)
                this.wrapperRef.style.height = `${this.contentRef.getBoundingClientRect().height}px`
            })
        }
    },
    computed: {
        wrapperRef: {
            get() {
                return this.$refs.wrapper
            },
            cache: false,
        },
        contentRef: {
            get() {
                return this.$refs.content
            },
            cache: false,
        }
    },
    methods: {
        onBeforeEnter(el) {
            el.style.height = `${this.height.current}px`

            this.contentRef.style.opacity = '0'
        },
        onEnter(el) {
            this.height.computed = this.contentRef.getBoundingClientRect().height
            console.log('this.contentRef.getBoundingClientRect().height', this.contentRef.getBoundingClientRect().height)

            el.style.height = `${this.height.computed}px`

            this.height.current = this.height.computed

            setTimeout(() => {
                this.contentRef.style.opacity = '1'
            }, 200)
        },
        // onAfterEnter(el) {
        //     el.style.height = 'auto'
        // },
        // onBeforeLeave(el) {
        //     el.style.height = `${this.contentRef.height}px`
        // },
        onLeave(el) {
            this.height.computed = 0

            el.style.height = `${this.height.computed}px`

            this.height.current = this.height.computed

            this.contentRef.style.opacity = '0'
        }
    },
}
</script>

<style lang="scss">
.collapse {
    .header {
        background-color: #ccc;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
    }

    .wrapper {
        background-color: #ddd;
        overflow: hidden;
        border: 1px solid;
        // height: 0px;
    }

    .content {
        *:first-child {
            margin-top: 0;
        }

        *:last-child {
            margin-bottom: 0;
        }
    }
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}

.content {
    transition: opacity 0.3s ease;
}

.wrapper {
    transition: height 0.5s ease;
}
</style>
