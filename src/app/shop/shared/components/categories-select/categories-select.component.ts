import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import { APIService } from 'src/app/shared/services/api.service'
import { CategoriesService, Category } from 'src/app/shop/shared/services/categories.service'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    APIService,
    CategoriesService,
  ],
  selector: 'app-categories-select',
  styleUrls: ['./categories-select.component.sass'],
  templateUrl: './categories-select.component.html',
})
export class CategoriesSelectComponent implements OnDestroy, OnInit {
  public items: Category[] = []
  public selectedID: number = null

  private readonly destroy$ = new Subject<void>()

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  public get selected(): number {
    return this.selectedID
  }

  // region ## Lifecycle hooks
  public ngOnInit(): void {
    this.categoriesService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: Category[]): void => {
          this.items = data
          this.cdr.markForCheck()
        },
        (error): never => {
          throw error
        },
      )
  }

  public ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  // endregion ## Lifecycle hooks
}
