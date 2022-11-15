import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-emptiness',
  styleUrls: ['./emptiness.component.sass'],
  templateUrl: './emptiness.component.html',
})
export class EmptinessComponent {
  public caption = 'No data to display';

  @Input()
  public get text(): string {
    return this.caption;
  }

  public set text(caption: string) {
    this.caption = caption;
  }
}
