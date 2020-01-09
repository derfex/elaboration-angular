import {
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-emptiness',
  templateUrl: './emptiness.component.html',
  styleUrls: ['./emptiness.component.sass'],
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
