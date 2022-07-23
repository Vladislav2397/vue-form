<template lang="pug">

.products
    button( @click="onClick('+')" ) Increase
    button( @click="onClick('-')" ) Decrease
    button( @click="onClick('M')" ) Move
    button( @click="onClick('R')" ) Reverse
    button( @click="onClick('A')" ) Addition

    transition(
        name="fade"
        mode="out-in"
    )
        transition-group.list(
            v-if="list.length"
            name="list-complete"
            move-class="list-complete-move"
        )
            .item.list-complete-item(
                v-for="item in list"
                :key="item"
            )
                p {{ item }}
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component
export default class AnimationList extends Vue {
    count = 6;
    list = [1, 2, 3, 4, 5];

    onClick(type: "-" | "+" | "M" | "R" | "A") {
        if (type === "-") {
            this.list.pop()
            this.count--
        } else if (type === "+") {
            this.list.push(this.count++)
            this.list.push(this.count++)
            this.list.push(this.count++)
        } else if (type === "M") {
            const copy = [...this.list]
            const element = copy.pop()

            copy.splice(2, 0, element!)
            this.list = copy
        } else if (type === "R") {
            this.list = this.list.reverse()
        } else if (type === "A") {
            const list = this.list.map((item) => item + 10)

            this.list = []

            this.$nextTick(() => {
                this.list = list
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.fade {
    &-enter,
    &-leave-to {
        opacity: 0;
    }
}

.list {
    transition: opacity 0.3s ease;
}

.list-complete {
    &-item {
        transition: all 0.5s ease;
    }

    &-move {
        transition: transform 0.5s ease;
    }

    &-enter {
        opacity: 0;
        transform: translateY(-30px);

        &-active {
            transition: all 0.3s 0.2s ease;
        }
    }

    &-leave {
        &-to {
            opacity: 0;
            transform: translateY(30px);
        }

        &-active {
            transition: all 0.2s ease;
        }
    }
}
</style>
