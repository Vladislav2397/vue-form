<template lang="pug">

.collapse
    .header(
        @click="isOpen = !isOpen"
    )
        .title {{ title }}
        .status {{ isOpen ? '-' : '+' }}
    CollapseAnimation(
        :contentRefHeightFn="() => contentRef.getBoundingClientRect().height"
        :isOpen="isOpen"

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
    name: 'Collapse-2',
    components: {
        CollapseAnimation,
    },
    props: {
        title: String
    },
    data: () => ({
        isOpen: false,
    }),
    computed: {
        contentRef: {
            get() {
                return this.$refs.content
            },
            cache: false,
        },
        contentRefHeight: {
            get() {
                return this.contentRef.getBoundingClientRect().height
            },
            cache: false,
        }
    },
    methods: {
        onBeforeEnter() {
            this.contentRef.style.opacity = '0'
        },
        onEnter() {
            setTimeout(() => {
                this.contentRef.style.opacity = '1'
            }, 200)
        },
        onLeave() {
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