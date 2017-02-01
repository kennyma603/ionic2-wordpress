import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
    templateUrl:  'post-detail.html'
})

export class PostDetail {
    selectedPost : any;
    isEditMode: boolean = false; 

    comment: any = {
        content: {rendered: ''},
        author: null,
        post: null
    }

    constructor(private nav: NavController, navParams: NavParams) {
        this.selectedPost = navParams.get('post');
    }

    editCommentChanged(selecteComment) {
        selecteComment.content.rendered = selecteComment.content.rendered.replace(/<br \/>/g, '');
        this.comment = selecteComment;
        this.isEditMode = true;   
    }

} 