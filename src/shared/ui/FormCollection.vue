<script lang="ts">
import { CreateElement, VNode } from "vue"
import { Component, Emit, Prop, Vue } from "vue-property-decorator"

@Component
export default class FormCollection extends Vue {
    @Emit('input') inputEmit() {
        return this.state
    }

    // @Prop() readonly name!: string
    @Prop() readonly value!: Record<string, unknown>

    created() {
        console.log('name & value', this.$attrs.name, this.value)

        this.state = { ...this.value }
    }

    state = {}

    get filteredSlots(): VNode[] {
        return (this.$slots?.default as VNode[])?.filter(slot => slot.tag)
    }

    render(h: CreateElement): VNode {
        return h('section', [
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

                            this.inputEmit()
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
