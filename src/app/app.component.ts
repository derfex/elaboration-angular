import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  styleUrls: ['./app.component.sass'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'elaboration-angular'
}
