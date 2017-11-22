import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {

  @Input() rating: number;
  starWidth: number;
  @Output() ratingClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }
  
  ngOnInit() { }
    
  ngOnChanges() {
    this.starWidth = this.rating * 86 / 5;
  }
  
  onClick():void {
    this.ratingClicked.emit(true);
  }

}
