<template lang="pug">

.home
    p {{ fields }}
    b-form(
        v-model="fields"
    )
        p Наименование
        b-form-input(
            name="name"
            :label="appearance.name.label"
            :placeholder="appearance.name.placeholder"
        )
        label
            input(
                type="checkbox"
                v-model="isShow"
            )
            | Some input
        template(
            v-if="isShow"
        )
            b-form-input(
                name="email"
                :label="appearance.email.label"
                :placeholder="appearance.email.placeholder"
            )
        b-form-collection(
            name="address"
        )
            b-form-input(
                name="country"
                placeholder="Введите страну"
            )
            b-form-input(
                name="city"
                placeholder="Введите город"
                :condition="[ 'address.country', true ]"
            )
            b-form-input(
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
import FormInput from "@/shared/ui/FormInput"

@Component({
    components: {
        'form-field-component': FormField,
        'b-form': Form,
        'b-form-collection': FormCollection,
        'b-form-input': FormInput,
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

    isShow = true

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
