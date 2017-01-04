import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
    templateUrl:  'post-detail.html'
})

export class PostDetail {
    selectedPost : any; 

    constructor(private nav: NavController, navParams: NavParams) {
        this.selectedPost = navParams.get('post');
    }

} 