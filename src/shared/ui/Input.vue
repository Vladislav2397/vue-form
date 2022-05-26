<template lang="pug">

label.input
    p.input__label {{ label }}
    input.input__field(
        v-model="valueModel"
        :placeholder="placeholder"
    )

</template>

<script lang="ts">
import { Component, Prop, VModel, Vue } from "vue-property-decorator"

@Component
export default class FormCollection extends Vue {
    @VModel() valueModel!: string

    @Prop() readonly placeholder!: string
    @Prop() readonly label!: string
}
</script>

<style lang="scss">
.input {
    &__label {
        font-size: 12px;
    }

    &__field {
        border: 1px solid;
        border-radius: 6px;
        font-size: 16px;
    }
}
</style>
