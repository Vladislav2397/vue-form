<template lang="pug">

.form-field
    slot

</template>

<script lang="ts">
import {
    Component,
    InjectReactive,
    Prop,
    Vue,
} from "vue-property-decorator"

@Component
export default class FormField extends Vue {
    @Prop() readonly name!: string
    @Prop() readonly value!: unknown

    @InjectReactive('fields') fields!: Record<string, unknown>

    mounted() {
        // this.$set(this.fields, this.name, this.value)
        // this.fields[this.name] = this.value
    }

    updated() {
        console.log('FormField.updated')
        this.fields[this.name] = this.value
    }

    // @Watch('value')
    // onChangeValue(newValue: string, oldValue: string) {
    //     if (newValue !== oldValue) {
    //         this.$set(this.fields, this.name, this.value)
    //     }
    // }
}
</script>
