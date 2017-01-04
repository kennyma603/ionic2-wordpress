import { Component } from '@angular/core';

import { AuthService, WpService } from '../../services/index';

@Component({
    templateUrl: './profile.html',
})
export class ProfilePage {

    constructor(
        private auth: AuthService,
        private wp: WpService) {
    }

    getInfo() {
        console.log(this.auth.token);
        this.wp.getCurrentUserProfile().subscribe(data => {
            console.log(data);
        }, (error) => {
        });
    }

    userAddComment() {
        let obj = {
            author: 1,
            content: 'YourCommentHere1',
            post: 55
        };

        this.wp.userAddComment(obj)
            .subscribe(data => {
                console.log(data);
            });
    }

    logout() {
        this.auth.logout();
    }

}