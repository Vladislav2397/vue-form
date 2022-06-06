<template lang="pug">

.orm
    p {{ groups }}
    p
        p(
            v-for="message in messages"
        ) {{ message.text }} {{ message.id }} {{ message.uid }}
    button(
        @click="onClick"
    ) Button

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import Message from "@/store/models/Message"
import Group from "@/store/models/Group"
// import { Post } from "@/store/models/Example"

@Component
export default class OrmView extends Vue {
    created() {
        // const messages = [
        //     {
        //         id: 1,
        //         text: 'first message',
        //         time: '12:12',
        //         files: [],
        //         group: '01062022'
        //     },
        //     {
        //         id: 2,
        //         text: 'second message',
        //         time: '14:15',
        //         files: [],
        //         group: '01062022'
        //     },
        //     {
        //         id: 3,
        //         text: 'third message',
        //         time: '14:16',
        //         files: [],
        //         group: '02062022'
        //     },
        //     {
        //         id: 4,
        //         text: 'four message',
        //         time: '14:32',
        //         files: [],
        //         group: '02062022',
        //     },
        // ]
        // Message.insert({ data: messages })

        const groups = [
            {
                date: '01062022',
                messages: [
                    {
                        id: 1,
                        text: 'first message',
                        time: '12:12',
                        files: [],
                        group: '01062022'
                    },
                    {
                        id: 2,
                        text: 'second message',
                        time: '14:15',
                        files: [],
                        group: '01062022'
                    },
                ]
            },
            {
                date: '02062022',
                messages: [
                    {
                        id: 3,
                        text: 'third message',
                        time: '14:16',
                        files: [],
                        group: '02062022'
                    },
                ]
            }
        ]
        Group.insert({ data: groups })
    }

    get groups() {
        return Group
            .query()
            .with('messages')
            .find('02062022')
    }

    get messages() {
        return Message.all()
    }

    onClick() {
        Message.update({
            where: message => message.id === 3,
            data: {
                id: 5,
            }
        })
    }
}
</script>

<style lang="scss">
</style>
