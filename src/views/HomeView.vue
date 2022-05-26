<template lang="pug">

.home
    form-component(
        v-model="inputs"
    )
        form-collection-component(
            name="auction"
        )
            form-field-component(
                v-for="(value, name) in fields"
                :key="name"
                :name="name"
                :value="fields[name]"
            )
                input-component(
                    v-model="fields[name]"
                    v-bind="appearance[name]"
                )

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

import FormCollection from "@/shared/ui/FormCollection.vue"
import Form from "@/shared/ui/Form.vue"
import Input from "@/shared/ui/Input.vue"
import FormField from "@/shared/ui/FormField.vue"

@Component({
    components: {
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

    inputs = null

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
