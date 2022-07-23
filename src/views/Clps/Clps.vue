<template lang="pug">

.clps
    c-collapse(
        title="Title"
    )
        p Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        p Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        p Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        button(
            @click="isOpen = !isOpen"
        ) Toggle
        transition(
            name="fade"
            mode="out-in"
        )
            template(
                v-if="isOpen"
            )
                p Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    | Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

</template>

<script>
import Collapse from './Collapse.vue'
import Collapse2 from './Collapse2.vue'

export default {
    name: 'Clps-',
    components: {
        'c-collapse': Collapse,
        'c-collapse-2': Collapse2,
    },
    data: () => ({
        isOpen: true
    })
}
</script>