import {
  Component,
  OnInit,
} from '@angular/core';
import {
  Subscription,
} from 'rxjs';

import { CategoriesService } from 'src/app/shared/services/categories.service';

export interface Category {
  id: number;
  name: string;
}


@Component({
  selector: 'app-categories-select',
  templateUrl: './categories-select.component.html',
  styleUrls: ['./categories-select.component.sass'],
})
export class CategoriesSelectComponent implements OnInit {
  // region ## Properties
  private items: Category[] = [];
  private selectedID: number = null;
  private subscriptionToCategories: Subscription;

  // endregion ## Properties

  constructor(
    private categoriesService: CategoriesService,
  ) {
  }

  // region ## Lifecycle hooks
  ngOnInit() {
    this.subscriptionToCategories = this.categoriesService.getAll()
      .subscribe(
        (data: Category[]) => {
          this.items = data;
        },
        error => {
          throw error;
        },
      );
  }

  // endregion ## Lifecycle hooks

  // region ## Methods
  public get selected(): number {
    return this.selectedID;
  }

  // endregion ## Methods
}
