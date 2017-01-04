import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { PostDetail } from '../postDetail/post-detail.component';
import { StoresPosts } from '../storesPosts/stores-posts.component';
import { UtilService, WpService } from '../../services/index';

@Component({
    templateUrl: 'home.html'
})

export class Home {
    posts: any;
    loader: any;
    params = {
    };

    constructor(
        public navCtrl: NavController,
        private http: Http,
        private nav:
            NavController,
        public up: UtilService,
        private wp: WpService
    ) {

        this.params['page'] = 1;
        //this.loader = this.up.getLoader("Loading Posts...");
        // this.loader.present();

        this.wp.getPosts(this.params)
            .subscribe(data => {
                this.posts = data;
                //this.loader.dismiss();
                console.log(this.posts);
            });
    }

    ionViewDidEnter() {

    }

    postTapped(event, post) {
        this.nav.push(PostDetail, {
            post: post
        });
    }

    storeTapped(event, store) {
        console.log(store);
        this.nav.push(StoresPosts, {
            store: store
        });
    }

    nextPageClick() {
        this.params['page'] = this.params['page'] + 1;
        this.loader = this.up.getLoader("Loading Posts...");
        this.loader.present();

        this.wp.getPosts(this.params)
            .subscribe(data => {
                this.posts = data;
                this.loader.dismiss();
                console.log(this.posts);
            });
    }

}