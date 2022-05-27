import Input from '@/shared/ui/Input.vue'
import { CreateElement, RenderContext } from "vue"

let oldCounter = {
    fill: 0,
    all: 0,
}

export default {
    functional: true,
    render(h: CreateElement, { props, listeners }: RenderContext) {
        console.log('render collections')

        const fields = {
            inn: {
                value: props.inn,
                placeholder: 'ИНН',
                label: 'ИНН',
            },
            kpp: {
                value: props.kpp,
                placeholder: 'КПП',
                label: 'КПП',
            }
        }

        const entries = Object.entries(fields)
        if (listeners?.['updateCounter']) {
            const counter = {
                all: entries.length,
                fill: entries.reduce((total, [, field]) => {
                    return total + +!!field.value
                }, 0)
            }

            console.log(oldCounter, counter)
            if (oldCounter.all !== counter.all || oldCounter.fill !== counter.fill) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                listeners?.['updateCounter'](counter)
                console.log('send')
            }

            oldCounter = {
                ...counter
            }
        }

        const renderChildren = () => Object.entries(fields).map(([ key, field ]) => {
            return h(Input, {
                props: {
                    value: field.value,
                    label: field.label,
                    placeholder: field.placeholder
                },
                on: {
                    input: (value: unknown) => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        listeners?.[`update:${key}`](value)
                    }
                }
            })
        })

        return h('div', renderChildren())
    }
}
