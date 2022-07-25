<script lang="ts">
import {
    Component,
    Provide,
    ProvideReactive,
    VModel,
    Vue
} from "vue-property-decorator"
import { CreateElement } from "vue"
import { createOrUpdateObjectField } from "@/shared/lib/convert"

@Component
export default class Form extends Vue {
    @VModel() valueModel!: Record<string, unknown>
    // @Prop() readonly appearance!: Record<keyof Form["valueModel"], any>

    @ProvideReactive('$form') state = {}
    @Provide('addFormCondition')
    addFormCondition = (nameField: string, condition: [string, boolean]) => {
        this.$set(this.conditions, nameField, condition)
    }

    conditions = {}
    cache = {}

    created() {
        this.state = { ...this.valueModel }
    }

    mounted() {
        Object.entries(this.conditions).forEach(([name, condition]) => {
            // @ts-ignore
            this.$watch(`state.${condition[0]}`, (n, o) => {
                // @ts-ignore
                console.log(condition[0])

                // @ts-ignore
                if (!!n !== condition[1]) {
                    this.cache = { ...this.state }

                    // @ts-ignore
                    createOrUpdateObjectField(this.state, condition[0], undefined)
                } else {
                    // @ts-ignore
                    createOrUpdateObjectField(this.state, condition[0], createOrUpdateObjectField(this.cache, condition[0]))
                }
            })
        })
    }

    // beforeMount() {
    //     this.state = { ...this.valueModel }
    // }

    render(h: CreateElement) {
        return h('form', { class: 'form' }, [
            // h('p', [JSON.stringify(this.state)]),

            this.$slots?.default,
        ])
    }
}
</script>
