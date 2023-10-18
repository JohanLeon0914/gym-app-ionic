import { Component, OnInit, Input } from '@angular/core';
import { Exercise } from 'src/models/Exercise.model';

@Component({
  selector: 'app-detail-exercise',
  templateUrl: './detail-exercise.component.html',
  styleUrls: ['./detail-exercise.component.scss'],
})
export class DetailExerciseComponent  implements OnInit {
  
  @Input() exercise: Exercise;
  constructor() { }

  ngOnInit() {}

}
