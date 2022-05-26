<template lang="pug">

form.form
    pre {{ collections }}
    slot

</template>

<script lang="ts">
import { Component, ProvideReactive, VModel, Vue } from "vue-property-decorator"

@Component
export default class Form extends Vue {
    @VModel() valueModel!: any

    @ProvideReactive('collections') collections: Record<string, unknown> = Vue.observable({
        //
    })

    updated() {
        console.log('Form.updated')
        this.valueModel = this.collections
    }
}
</script>
