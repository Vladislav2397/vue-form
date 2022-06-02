import Vue from "vue"
import Vuex from "vuex"
import VuexORM from '@vuex-orm/core'
import Group from "@/store/models/Group"
import Message from "@/store/models/Message"
import { Comment, Post } from "@/store/models/Example"

Vue.use(Vuex)

const database = new VuexORM.Database()

// Register Models to Database.
database.register(Message)
database.register(Group)
database.register(Post)
database.register(Comment)

export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {},
    plugins: [VuexORM.install(database)]
})
