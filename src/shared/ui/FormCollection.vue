<template lang="pug">

.form-collection
    slot

</template>

<script lang="ts">
import {
    Component,
    InjectReactive,
    Prop,
    ProvideReactive,
    Vue
} from "vue-property-decorator"

@Component
export default class FormCollection extends Vue {
    @Prop() readonly name!: string

    @ProvideReactive('fields') fields: Record<string, unknown> = {}

    @InjectReactive('collections') collections!: Record<string, unknown>

    updated() {
        console.log('FormCollection.updated')
        this.$set(this.collections, this.name, {
            counter: this.counter(),
            fields: this.fields
        })
    }

    mounted() {
        // this.$set(this.collections, this.name, {
        //     counter: this.counter,
        //     fields: this.fields
        // })
        // this.collections[this.name] = {
        //     counter: this.counter,
        //     fields: this.fields
        // }
    }

    counter() {
        const entries = Object.entries(this.fields)

        return {
            all: entries.length,
            fill: entries.reduce((total, [key, value]) => total + +!!value, 0),
        }
    }
}
</script>
