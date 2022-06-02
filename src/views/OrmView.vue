<template lang="pug">

.orm
    p {{ groups }}
    p {{ messages }}
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
                // messages: [
                //     3, 4
                // ]
            }
        ]
        Group.insert({ data: groups })

        // const posts = {
        //     id: 1,
        //     title: 'title',
        //     body: 'body',
        //     comments: [
        //         {
        //             id: 1,
        //             post_id: 1,
        //             body: 'some body',
        //         },
        //         {
        //             id: 2,
        //             post_id: 1,
        //             body: 'some body 2',
        //         },
        //     ]
        // }
        //
        // Post.insert({ data: posts })
    }

    get groups() {
        const found = Group.find('02062022')

        return found?.$toJson()
    }

    get messages() {
        return Message.all()
    }

    onClick() {
        Message.insert({
            data: {
                ...Message.find(4),
                id: 5,
            }
        })

        Group.update({
            where: '02062022',
            data: {
                messages: [3, 5],
            }
        })
    }
}
</script>

<style lang="scss">
</style>
