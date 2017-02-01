import { Component, Input, Output, EventEmitter } from "@angular/core";
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
    @Input() isEditMode: boolean;
    @Output() isEditModeChange = new EventEmitter();
    @Output() commentChange = new EventEmitter();
    jwtHelper: JwtHelper = new JwtHelper();
    statusMessage = '';

    isEditing: boolean = false;


    constructor(private wp:WpService, private auth: AuthService, private nav:
            NavController) {
    }

    ngOnInit() {
        this.comment.post = this.postId;
        this.comment.author = this.wp.getCurrentAuthorId();
    }

    onCancel() {
        this.commentChange.emit({
            content: {rendered: ''},
            author: null,
            post: this.postId
        }); 
        this.isEditing = false;
        this.isEditModeChange.emit(false);
        this.statusMessage = '';
        return false;
    }

    showPanel() {
        return this.auth.authenticated() && (this.isEditing) || this.isEditMode;
    }

    updateComment(form) {
        let params = {
            content: this.comment.content.rendered,
        }; 

        this.wp.userUpdateComment(this.comment.id, params)
                .subscribe(
                    data => {
                        this.statusMessage = "Comment updated successfully!";
                        //clear form
                        form.reset();
                    },
                    error => {
                        console.log(error._body);
                        this.statusMessage = error._body;
                    }
        );   

    }

    submitComment(form) {
        console.log(this.comment, form);
        let params = {
            content: this.comment.content.rendered,
            author: this.wp.getCurrentAuthorId(),
            post: this.comment.post
        };
        console.log(params);
        this.comment.author = this.wp.getCurrentAuthorId();
        this.wp.userAddComment(params)
                .subscribe(
                    data => {
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
        this.nav.push(ProfilePage);
    }
}