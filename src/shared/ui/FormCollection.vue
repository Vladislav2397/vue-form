<script lang="ts">
import { CreateElement, VNode } from "vue"
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

    @ProvideReactive('$form') state = {}
    @InjectReactive('$form') $form!: Record<string, any>

    created() {
        this.state = this.$form[this.name]
    }

    render(h: CreateElement): VNode {
        return h('section', [
            // h('p', [JSON.stringify(this.state)]),
            this.$slots.default
        ])
    }
}
</script>
