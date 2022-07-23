import Input from "@/shared/ui/Input.vue"
import { CreateElement, RenderContext } from "vue"

let oldCounter = {
    fill: 0,
    all: 0,
}

export default {
    functional: true,
    render(h: CreateElement, { props, listeners }: RenderContext) {
        const fields = {
            inn: {
                value: props.inn,
                placeholder: "ИНН",
                label: "ИНН",
            },
            kpp: {
                value: props.kpp,
                placeholder: "КПП",
                label: "КПП",
            },
        }

        const entries = Object.entries(fields)
        if (listeners?.["updateCounter"]) {
            const counter = {
                all: entries.length,
                fill: entries.reduce((total, [, field]) => {
                    return total + +!!field.value
                }, 0),
            }

            if (
                oldCounter.all !== counter.all ||
                oldCounter.fill !== counter.fill
            ) {
                // @ts-ignore
                listeners?.["updateCounter"](counter)
                console.log("send")
            }

            oldCounter = {
                ...counter,
            }
        }

        const checkCounter = () => ({
            all: entries.length,
            fill: entries.reduce((total, [, field]) => {
                return total + +!!field.value
            }, 0),
        })

        if (listeners?.validateFn && !Array.isArray(listeners?.validateFn)) {
            console.log(listeners?.validateFn)
            // @ts-ignore
            listeners?.validateFn(checkCounter)
        }

        const renderChildren = () =>
            Object.entries(fields).map(([key, field]) => {
                return h(Input, {
                    props: {
                        value: field.value,
                        label: field.label,
                        placeholder: field.placeholder,
                    },
                    on: {
                        input: (value: unknown) => {
                            // @ts-ignore
                            listeners?.[`update:${key}`](value)
                        },
                    },
                })
            })

        return h("div", renderChildren())
    },
}
