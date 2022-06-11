<template lang="pug">

transition(
    name="collapsible"
    mode="out-in"

    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @leave="onLeave"
)
    slot

</template>

<script>
export default {
    name: 'CollapseAnimation',
    props: {
        contentRefHeightFn: Function,
        isOpen: Boolean,
    },
    data: () => ({
        height: {
            current: 0,
            computed: 0,
        },
        updateStylesFn: () => {/**/}
    }),
    beforeUpdate() {
        console.log('CollapseAnimation.beforeUpdate', this.wrapperRef, this.isOpen)
        if (this.wrapperRef && this.isOpen) {
            this.$nextTick(() => {
                this.updateStylesFn()
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
    },
    methods: {
        onBeforeEnter(el) {
            el.style.height = `${this.height.current}px`

            this.$emit('before-enter', el)
        },
        onEnter(el) {
            this.height.computed = this.contentRefHeightFn()
            console.log('this.contentRefHeight', this.contentRefHeightFn())

            el.style.height = `${this.height.computed}px`

            this.height.current = this.height.computed

            this.updateStylesFn = () => {
                el.style.height = `${this.contentRefHeightFn()}px`
            }

            this.$emit('enter', el)
        },
        onLeave(el) {
            this.height.computed = 0

            el.style.height = `${this.height.computed}px`

            this.height.current = this.height.computed

            this.$emit('leave', el)
        }
    },
}
</script>

<style>
.collapsible-enter-active, .collapsible-leave-active {
    transition: height 0.5s ease;
}
</style>