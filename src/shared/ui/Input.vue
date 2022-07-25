<template lang="pug">

label.input
    p.input__label {{ label }}
    input.input__field(
        v-model="valueModel"
        :placeholder="placeholder"
    )

</template>

<script lang="ts">
import {
    Component,
    Prop,
    VModel,
    Vue
} from "vue-property-decorator"

@Component
export default class Input extends Vue {
    @VModel() valueModel!: string

    // @InjectReactive('$form') $form!: Record<string, any>

    @Prop() readonly placeholder!: string
    @Prop() readonly label!: string

    // onInput(event: InputEvent) {
    //     if (this.$form) {
    //         // @ts-ignore
    //         this.$set(this.$form, this.$attrs.name, event.target?.value)
    //     }
    // }

    // created() {
    //     if (this.$form[this.$attrs.name]) {
    //         console.log('default value', this.$form[this.$attrs.name])
    //         this.valueModel = this.$form[this.$attrs.name]
    //     }
    // }
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
