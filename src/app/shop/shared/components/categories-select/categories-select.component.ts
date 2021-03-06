// External modules.
import {
  Component,
  OnInit,
} from '@angular/core';
import {
  Subscription,
} from 'rxjs';

// Internal modules.
import {
  CategoryModels,
  CategoriesService,
} from 'src/app/shop/shared/services/categories.service';


@Component({
  selector: 'app-categories-select',
  templateUrl: './categories-select.component.html',
  styleUrls: ['./categories-select.component.sass'],
})
export class CategoriesSelectComponent implements OnInit {
  // region ## Properties
  private items: CategoryModels = [];
  private selectedID: number = null;
  private subscriptionToCategories: Subscription;

  // endregion ## Properties

  constructor(
    private categoriesService: CategoriesService,
  ) {
  }

  // region ## Lifecycle hooks
  public ngOnInit() {
    this.subscriptionToCategories = this.categoriesService.getAll()
      .subscribe(
        (data: CategoryModels) => {
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
