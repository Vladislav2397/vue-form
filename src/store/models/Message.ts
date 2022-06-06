import { Model } from '@vuex-orm/core'
import Group from "@/store/models/Group"

export default class Message extends Model {
    static entity = 'messages'

    static primaryKey = 'uid'

    static fields () {
        return {
            uid: this.uid(),
            id: this.attr(null),
            time: this.attr(''),
            files: this.attr([]),
            text: this.attr(''),
            date: this.attr(''),
            group: this.belongsTo(Group, 'date'),
        }
    }
}
