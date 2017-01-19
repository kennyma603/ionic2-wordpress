import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
    templateUrl:  'post-detail.html'
})

export class PostDetail {
    selectedPost : any; 

    comment: any = {
        content: '',
        author: null,
        post: null
    }

    constructor(private nav: NavController, navParams: NavParams) {
        this.selectedPost = navParams.get('post');
    }

    editCommentChanged(selecteComment) {
        console.log(selecteComment);
        debugger;
        this.comment.content = selecteComment.content.rendered;
        
    }

} 