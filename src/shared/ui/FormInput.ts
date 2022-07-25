import { CreateElement, VNode } from "vue"
import {
    Component, Inject,
    InjectReactive,
    Prop,
    Vue
} from "vue-property-decorator"
import Input from "@/shared/ui/Input.vue"
import { createOrUpdateObjectField } from "@/shared/lib/convert"

@Component({
    inheritAttrs: false
})
export default class FormInput extends Vue {
    @Prop() readonly name!: string
    @Prop() readonly condition!: [string, boolean] // | string

    @InjectReactive('$form') $form!: Record<string, any>
    @Inject('addFormCondition')
    addFormCondition!: (nameField: string, condition: [string, boolean]) => void

    cacheValue = ''

    created() {
        if (this.condition) {
            this.addFormCondition(this.name, this.condition)
        }
    }

    // get isCondition() {
    //     console.log('call isCondition')
    //
    //     let condition: [string, boolean]
    //
    //     if (this.condition === undefined) {
    //         return true
    //     } else {
    //         condition = this.condition
    //     }
    //
    //     const isCondition = createOrUpdateObjectField(this.$form, condition[0]) === condition[1]
    //
    //     console.log(this.$form)
    //     console.log(condition, createOrUpdateObjectField(this.$form, condition[0]))
    //
    //     if (isCondition) {
    //         this.$set(this.$form, this.name, this.cacheValue)
    //     } else {
    //         this.cacheValue = this.provideValue
    //
    //         this.$delete(this.$form, this.name)
    //         // delete this.$form[this.name]
    //     }
    //
    //     return isCondition
    // }

    get provideValue() {
        return this.$form[this.name] ?? ''
    }

    onInput(value: string) {
        // this.$set(this.$form, this.name, value)
        this.$form[this.name] = value
    }

    render(h: CreateElement): VNode[] {
        // @ts-ignore
        return h(Input, {
            props: {
                value: this.provideValue,
                ...this.$attrs,
            },
            on: {
                input: this.onInput
            }
        })
    }
}
