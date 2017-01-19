import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Http } from '@angular/http';
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

    constructor(private http: Http, private wp: WpService) {
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

    deleteComment(commentId) {
        console.log(commentId);
        this.wp.deleteComment(commentId).subscribe(
            data => {
                console.log(data);
            },
            error => {
                console.log(error);
            }
        );
    }

    editComment(comment) {
        this.editCommentChanged.emit(comment);
    }


}