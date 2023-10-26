import { Component } from '@angular/core';
import { Exercise } from 'src/models/Exercise.model';
import { ExerciseCategory } from 'src/models/Category.model';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { UtilService } from 'src/app/services/util.service';
import { DetailExerciseComponent } from 'src/app/shared/components/detail-exercise/detail-exercise.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  exercises: Exercise[] = [];
  search: String = '';
  categorySelected = '';

  constructor(private api: ApiServiceService, private utilSvc: UtilService) {}

  ngOnInit(): void {
    this.getExercises();
  }

  getExercises() {
    this.api.getExercises().subscribe((exercises) => {
      let filteredByCategory: Exercise[] = [];
      let filteredBySearch: Exercise[] = [];
      // Filtrar por categoría
      if (this.categorySelected && this.categorySelected != ExerciseCategory.All) {
        filteredByCategory = exercises.filter((exercise: Exercise) => {
          return exercise.category
            .toLowerCase()
            .includes(this.categorySelected.toLowerCase());
        });
      }
      if (filteredByCategory.length != 0) {
        // Filtrar por búsqueda y categoria
        filteredBySearch = filteredByCategory.filter((exercise: Exercise) => {
          return exercise.name
            .toLowerCase()
            .includes(this.search.toLowerCase());
        });
      } else {
        filteredBySearch = exercises.filter((exercise: Exercise) => {
          return exercise.name
            .toLowerCase()
            .includes(this.search.toLowerCase());
        });
      }
      // Mostrar los ejercicios filtrados
      this.exercises = filteredBySearch;
    });
  }

  getExerciseCategories(): string[] {
    return Object.values(ExerciseCategory) as string[];
  }

  addExerciseToRoutine(exercise: Exercise) {
    this.utilSvc.addExerciseToRoutine(exercise);
    this.utilSvc.presentToast({
      message: 'Exercise added to your routine',
      color: 'success',
      position: 'top',
      icon: 'checkmark-circle-outline',
      duration: 800,
    });
  }

  openModalExerciseDetail(exercise: Exercise) {
    this.utilSvc.presentModal({
      component: DetailExerciseComponent,
      componentProps: { exercise },
      cssClass: 'add-update-modal',
    });
  }

  onCategoryChange(event) {
    this.categorySelected = event.detail.value;
    this.getExercises();
  }

  searchExercise(event) {
    this.search = event.target.value;
    this.getExercises();
  }
}
