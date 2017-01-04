import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import {PostDetail} from '../postDetail/post-detail.component';

@Component({
    selector: 'page-stores-posts',
    templateUrl: 'stores-posts.html'
})

export class StoresPosts {

    url: string = 'http://sumsy.com/wp-json/wp/v2/deal?_embed'
    posts: any;
    selectedStore: any;

	constructor(private nav: NavController, private http: Http, navParams: NavParams ) {
	
        this.selectedStore = navParams.get('store');
    }

    ionViewDidEnter() {
        this.http.get(this.url + '&filter[taxonomy]=deal-store&filter[term]='+ this.selectedStore.name)
            .map(res => res.json())
            .subscribe(data => {
                this.posts = data;
                console.log(this.posts);
            });
    }

    postTapped(event, post) {
		this.nav.push(PostDetail, {
		  post: post
		});
	}

}