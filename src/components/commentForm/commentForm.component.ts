import { Component, Input } from "@angular/core";
import { JwtHelper } from 'angular2-jwt';
import { WpService } from '../../services/index';

@Component({
    selector: 'comment-form',
    templateUrl: './commentForm.html'
})

export class CommentFormComponent {
    @Input() postId: number;
    jwtHelper: JwtHelper = new JwtHelper();
    statusMessage = '';

    editing: false;
    model: any = {
        content: '',
        author: null,
        post: null
    }

    constructor(private wp:WpService) {
        
    }

    ngOnInit() {
        this.model.post = this.postId;
        let token = localStorage.getItem('id_token');
        //debugger;
        if(token) {
            let myToken = this.jwtHelper.decodeToken(token);
            this.model.author = Number(myToken.data.user.id);
        }
    }

    submitComment() {
        console.log(this.model);
        this.wp.userAddComment(this.model)
                .subscribe(
                    data => {
                        console.log(data);
                        this.statusMessage = "Comment added successfully!";

                        //clear form
                        this.model = {content: ''}
                    },
                    error => {
                        console.log(error._body);
                        this.statusMessage = error._body;
                    }
        );
    }
}