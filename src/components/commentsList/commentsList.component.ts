import { Component, Input } from "@angular/core";
import { Http } from '@angular/http';
import { SITE_URL, WpService } from '../../services/index';

@Component({
    selector: 'comments-list',
    templateUrl: './commentsList.html'
})

export class CommentsListComponent {

    @Input() postId: number;
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


}