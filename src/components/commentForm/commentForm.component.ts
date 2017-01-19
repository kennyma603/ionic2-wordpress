import { Component, Input } from "@angular/core";
import { JwtHelper } from 'angular2-jwt';
import { NavController } from 'ionic-angular';
import { WpService, AuthService } from '../../services/index';
import { ProfilePage } from '../../pages/profile/profile';

@Component({
    selector: 'comment-form',
    templateUrl: './commentForm.html'
})

export class CommentFormComponent {
    @Input() postId: number;
    @Input() comment: any;
    jwtHelper: JwtHelper = new JwtHelper();
    statusMessage = '';

    editing: false;


    constructor(private wp:WpService, private auth: AuthService, private nav:
            NavController) {
    }

    ngOnInit() {
        this.comment.post = this.postId;
        this.comment.author = this.wp.getCurrentAuthorId();

        
    }

    submitComment(form) {
        console.log(this.comment, form);
        this.comment.author = this.wp.getCurrentAuthorId();
        this.wp.userAddComment(this.comment)
                .subscribe(
                    data => {
                        console.log(data);
                        this.statusMessage = "Comment added successfully!";

                        //clear form
                        form.reset();
                    },
                    error => {
                        console.log(error._body);
                        this.statusMessage = error._body;
                    }
        );
    }

    commentFormNotAuthClicked() {
        console.log('not auth');
        this.nav.push(ProfilePage);
    }
}