import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Http } from '@angular/http';
import { AlertController, ToastController } from 'ionic-angular';
import { SITE_URL, WpService } from '../../services/index';

@Component({
    selector: 'comments-list',
    templateUrl: './commentsList.html'
})

export class CommentsListComponent {

    @Input() postId: number;
    @Output() editCommentChanged = new EventEmitter();
    wpApiURL: string = SITE_URL + '/wp-json/wp/v2';
    comments: any = [];
    authorId = null;

    constructor(
        private http: Http, 
        private wp: WpService,
        private alertCtrl: AlertController,
        private toastCtrl: ToastController
        ) {
    }

    ngOnInit(){
        // Load comments
        this.loadComments(this.postId);
    }

    loadComments(postId) {
        this.wp.getCommentsByPostId({post: postId}).subscribe(
            data => {
                console.log(data);
                this.comments = data;
            },
            error => {}            
        );
    }

    canDeleteComment(authorId) {
        //console.log(authorId, this.wp.getCurrentAuthorId(), authorId === this.wp.getCurrentAuthorId());
        return authorId === this.wp.getCurrentAuthorId();
    }

    deleteComment(comment) {

        let confirm = this.alertCtrl.create({
            title: 'Delete Comment',
            message: 'Are you sure to delete this comment?',
            buttons: [
                {
                text: 'Yes',
                handler: () => {
                    let toast = this.toastCtrl.create({
                        message: 'processing'
                        });
                    toast.present();
                    this.wp.deleteComment(comment).subscribe(
                        data => {
                            console.log(data);
                            toast.dismiss();
                            this.showToast('Comment is successfully deleted.');
                        },
                        error => {
                            console.log(error);
                            toast.dismiss();
                            this.showToast(error);
                        }
                    );
                }
                },
                {
                text: 'Cancel',
                handler: () => {
                    console.log('delete comment action cancelled');
                }
                }
            ]
            });
        confirm.present();
    }

    editComment(comment) {
        this.editCommentChanged.emit(comment);
    }

    showToast(message) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 3000
            });
        toast.present();
    }


}