import { Model } from "@vuex-orm/core"

export class Post extends Model {
    static entity = 'posts'

    static fields () {
        return {
            id: this.attr(null),
            title: this.attr(''),
            body: this.attr(''),
            comments: this.hasMany(Comment, 'post_id')
        }
    }
}

export class Comment extends Model {
    static entity = 'comments'

    static fields () {
        return {
            id: this.attr(null),
            post_id: this.attr(null),
            body: this.attr('')
        }
    }
}
