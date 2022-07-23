<script lang="ts">
import {
    Component,
    Prop,
    VModel,
    Vue
} from "vue-property-decorator"
import { CreateElement, VNode } from "vue"

@Component
export default class Form extends Vue {
    @VModel() valueModel!: Record<string, unknown>
    @Prop() readonly appearance!: Record<keyof Form["valueModel"], any>

    state = {}

    isMounted = false

    created() {
        this.state = { ...this.valueModel }
    }

    mounted() {
        this.isMounted = true
    }

    get filteredSlots(): VNode[] {
        return (this.$slots?.default as VNode[])?.filter(slot => slot.tag)
    }

    render(h: CreateElement) {
        return h('form', { class: 'form' }, [
            h('p', [JSON.stringify(this.state)]),

            ...this.filteredSlots?.map(slot => {
                console.log(slot)

                if (slot.componentOptions?.propsData && slot.data?.attrs?.name) {
                    // @ts-ignore
                    slot.componentOptions.propsData.value =
                        // @ts-ignore
                        this.state[slot.data.attrs.name ?? '']
                }

                if (slot.componentOptions) {
                    if (!slot.componentOptions.listeners) {
                        slot.componentOptions.listeners = {}
                    }
                }

                if (slot.componentOptions) {
                    if (slot.componentOptions.listeners) {
                        const listeners = slot.componentOptions.listeners

                        const onInput = (value: string) => {
                            // @ts-ignore
                            this.state[slot.data.attrs.name] = value
                        }

                        // @ts-ignore
                        if (listeners['input']) {
                            // @ts-ignore
                            if (Array.isArray(listeners?.['input'])) {
                                // @ts-ignore
                                slot.componentOptions.listeners['input'].push(onInput)
                            } else {
                                // @ts-ignore
                                slot.componentOptions.listeners['input'] = [
                                    // @ts-ignore
                                    listeners['input'],
                                    onInput
                                ]
                            }
                        } else {
                            // @ts-ignore
                            slot.componentOptions.listeners['input'] = [
                                onInput
                            ]
                        }
                    }
                }

                return slot
            })
        ])
    }
}
</script>
