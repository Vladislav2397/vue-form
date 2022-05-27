<template lang="pug">

form.form
    pre {{ collections }}
    slot

</template>

<script lang="ts">
import {
    Component,
    Emit,
    ProvideReactive,
    VModel,
    Vue
} from "vue-property-decorator"

@Component
export default class Form extends Vue {
    @VModel() valueModel!: any

    @Emit('changeField')
    changeField(collections: Record<string, unknown>) {
        return collections
    }

    @ProvideReactive('collections') collections: Record<string, unknown> = Vue.observable({
        //
    })

    updated() {
        console.log('Form.updated')
        this.changeField(this.collections)
    }
}
</script>
