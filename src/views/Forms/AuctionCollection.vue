<template lang="pug">

.home

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

import FormCollection from "@/shared/ui/FormCollection.vue"
import Form from "@/shared/ui/Form.vue"
import Input from "@/shared/ui/Input.vue"
import FormField from "@/shared/ui/FormField.vue"
import AuctionCollection from "@/shared/ui/auctionCollection"

@Component({
    components: {
        AuctionCollection,
        'form-field-component': FormField,
        "form-component": Form,
        "form-collection-component": FormCollection,
        'input-component': Input,
    }
})
export default class HomeView extends Vue {
    fields = {
        inn: '',
        kpp: '',
        ogrn: '',
        okpo: '',
    }

    validateFn: (() => void) | null = null

    setValidateFn(cb: any) {
        console.log('setValidateFn')
        this.validateFn = cb
    }

    inputs = null
    counter = {
        fill: 0,
        all: 1
    }

    // onChangeCounter(counter: HomeView['counter']) {
    //     this.counter = counter
    // }

    beforeUpdate() {
        console.log('beforeUpdate HomeView')
    }

    appearance = {
        inn: {
            placeholder: 'ИНН',
            label: 'ИНН',
        },
        kpp: {
            placeholder: 'КПП',
            label: 'КПП',
        },
        ogrn: {
            placeholder: 'ОГРН',
            label: 'ОГРН',
        },
        okpo: {
            placeholder: 'ОКПО',
            label: 'ОКПО',
        },
    }
}
</script>
