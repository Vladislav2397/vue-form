import { Model } from '@vuex-orm/core'
import Message from "@/store/models/Message"

export default class Group extends Model {
    static entity = 'groups'

    static primaryKey = 'date'

    static fields () {
        return {
            date: this.attr(''),
            messages: this.hasMany(Message, 'date')
        }
    }
}
