import { Component } from '@angular/core';
import {
  transition,
  trigger,
  query as q,
  animateChild,
  style,
  group,
  animate,
  sequence
} from '@angular/animations';

const query = (s, a, o = { optional: true }) => q(s, a, o);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routerTransition', [
      transition('* => *', [
        query(':enter, :leave', style({ position: 'fixed', width: '100%' })),
        query(':enter', style({ transform: 'translateX(100%)' })),
        sequence([
          group([
            query('@*, :leave', [animateChild()]),
            query(':leave', [
              style({ transform: 'translateX(0%)' }),
              animate('0.8s ease-in-out', style({ transform: 'translateX(-100%)' }))
            ]),
            query(':enter', [
              style({ transform: 'translateX(100%)' }),
              animate('0.8s ease-in-out', style({ transform: 'translateX(0%)' }))
            ]),
            query('@*, :enter', [animateChild()])
          ])
        ])
      ])
    ])
  ]
})
export class AppComponent {
  triggerAnimation(outlet) {
    return outlet.activatedRouteData.animation || null;
  }
}
