import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-emptiness',
  styleUrls: ['./emptiness.component.sass'],
  templateUrl: './emptiness.component.html',
})
export class EmptinessComponent {
  private caption = 'No data to display';

  @Input()
  set text(caption: string) {
    this.caption = caption;
  }

  get text(): string {
    return this.caption;
  }
}
