<template lang="pug">

.home
    b-form(
        v-model="fields"
        :appearance="appearance"
    )
        p Наименование
        b-input(
            name="name"
            :label="appearance.name.label"
            :placeholder="appearance.name.placeholder"
        )
        b-input(
            name="email"
            :label="appearance.email.label"
            :placeholder="appearance.email.placeholder"
        )
        b-form-collection(
            name="address"
        )
            b-input(
                name="country"
                placeholder="Введите страну"
            )
            b-input(
                name="city"
                placeholder="Введите город"
            )
            b-input(
                name="house"
                placeholder="Введите номер дома"
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
        'b-form': Form,
        'b-form-collection': FormCollection,
        'b-input': Input,
    }
})
export default class HomeView extends Vue {
    fields = {
        name: 'name',
        email: 'email',
        address: {
            country: '',
            city: 'Volgograd',
            house: '3',
        }
    }

    appearance = {
        name: {
            component: Input,
            label: 'Имя',
            placeholder: 'Введите имя'
        },
        email: {
            component: Input,
            label: 'Email',
            placeholder: 'Введите email'
        }
    }
}
</script>
