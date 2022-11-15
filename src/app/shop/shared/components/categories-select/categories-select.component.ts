import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'

import { CategoriesService, Category } from 'src/app/shop/shared/services/categories.service'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-categories-select',
  styleUrls: ['./categories-select.component.sass'],
  templateUrl: './categories-select.component.html',
})
export class CategoriesSelectComponent implements OnInit {
  public items: Category[] = []
  public selectedID: number = null

  private subscriptionToCategories: Subscription

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  public get selected(): number {
    return this.selectedID
  }

  // region ## Lifecycle hooks
  public ngOnInit(): void {
    this.subscriptionToCategories = this.categoriesService.getAll()
      .subscribe(
        (data: Category[]): void => {
          this.items = data
          this.cdr.markForCheck()
        },
        error => {
          throw error
        },
      )
  }

  // endregion ## Lifecycle hooks
}
