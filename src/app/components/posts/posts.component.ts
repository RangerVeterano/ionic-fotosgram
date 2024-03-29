import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {

  //recibimos del padre todos los posts
  @Input() posts:Post[] = [];

  constructor() { }

  ngOnInit() {

  }

}
