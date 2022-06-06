<template lang="pug">

.messenger
    .form
        input.input(
            v-model="input"
        )
        button(
            @click="send"
        ) Send
        button(
            @click="fetch"
        ) Fetch
    transition-group(
        :name="listCompleteAnimationName"
        tag="div"
    )
        .group.list-complete-group(
            v-for="group in messageGroups"
            :key="group.date"
        )
            p {{ group.date }}
            transition-group(
                :name="listCompleteAnimationName"
                tag="div"
                move-class="list-complete-moved"
            )
                .message.list-complete-item(
                    v-for="message in group.messages"
                    :key="`${group.date}-${message.id}`"
                ) {{ message.id }}. {{ message.text }} '{{ message.status }}'

</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator"

@Component
export default class Messages extends Vue {
    listCompleteAnimationName:
        | 'list-complete-top'
        | 'list-complete-bottom' = 'list-complete-top'

    group: Record<string, { date: string, messages: number[] }> = {
        '02.04': {
            date: '02.04',
            messages: [1, 2],
        },
        '03.04': {
            date: '03.04',
            messages: [3, 4],
        }
    }

    messages: Record<string, { id: number, text: string, status: 's' | 'w' | 'e' }> = {
        1: {
            id: 1,
            text: 'some text',
            status: 's',
        },
        2: {
            id: 2,
            text: 'text2',
            status: 's',
        },
        3: {
            id: 3,
            text: 'text3',
            status: 's',
        },
        4: {
            id: 4,
            text: 'text4',
            status: 's',
        },
    }

    classCondition(index: number) {
        return this.listCompleteAnimationName === 'list-complete-bottom'
            ? index === 0
            : index === this.messageGroups.length - 1
    }

    get messageGroups() {
        const groupEntries = Object.entries(this.group)

        return groupEntries
            .sort(([keyFirst], [keySecond]) => {
                const num1 = +keyFirst.replace(/(\d\d).(\d\d)/, '$2$1')
                const num2 = +keySecond.replace(/(\d\d).(\d\d)/, '$2$1')

                return num1 - num2
            })
            .map(([, group]) => {
                return {
                    date: group.date,
                    messages: group.messages
                        .sort((first, second) => {
                            if (group.date === this.activeGroup) {
                                return first - second
                            }
                            return second - first
                        })
                        .map(messageId => this.messages[messageId])
                }
            })
    }

    input = ''
    nextGroup = '03.04'
    activeGroup = '03.04'
    nextItemId = 5

    fetch() {
        this.listCompleteAnimationName = 'list-complete-bottom'

        const firstId = this.nextItemId++
        const secondId = this.nextItemId++

        this.$set(this.group, '01.04', {
            date: '01.04',
            messages: [
                ...this.group?.['01.04']?.messages ?? [],
                firstId,
            ]
        })

        this.$set(this.group, '31.03', {
            date: '31.03',
            messages: [
                ...this.group?.['31.03']?.messages ?? [],
                secondId,
            ]
        })

        this.messages[firstId] = {
            id: firstId,
            text: 'sometxtfirst',
            status: 's'
        }

        this.messages[secondId] = {
            id: secondId,
            text: 'sometxtsecond',
            status: 's'
        }
    }

    send() {
        this.listCompleteAnimationName = 'list-complete-top'

        const id = this.nextItemId++

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.messages[id] = {
            id,
            text: this.input || `text${id}`,
            status: 'w'
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.group[this.nextGroup].messages.push(id)

        setTimeout(() => {
            console.log('timeout')

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.$set(this.messages[id], 'status', 's')
        }, 3000)
    }

    @Watch('messageGroups')
    onChangeMessageGroup(
        newValue: Messages['messageGroups'],
        oldValue: Messages['messageGroups']
    ) {
        // const indexes = []

        // newValue.forEach(group => {
        //     if ()
        // })
    }
}
</script>

<style lang="scss">
.list-complete-top-enter + .list-complete-item {
    transition: all 1s;
}
.list-complete-top-enter, .list-complete-top-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
.list-complete-top-leave-active {
    position: absolute;
}

.list-complete-group {
    transition: all 1s;
}
.list-complete-bottom-enter, .list-complete-bottom-leave-to {
    opacity: 0;
    transform: translateY(-30px);
}
.list-complete-bottom-leave-active {
    position: absolute;
}
</style>
