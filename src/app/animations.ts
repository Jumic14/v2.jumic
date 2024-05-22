import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';

export const animateHeader = trigger('animateHeader', [
  transition(':enter', [
    query('*', [
      style({ opacity: 0, transform: 'translateY(-50%)' }),
      stagger(50, [
        animate(
          '250ms cubic-bezier(0.35, 0, 0.25, 1)',
          style({ opacity: 1, transform: 'none' })
        ),
      ]),
    ]),
  ]),
]);
export const animateHome = trigger('animateHome', [
  transition(':enter', [
    query('*', [
      style({ opacity: 0, transform: 'translateY(-50px)' }),
      stagger(50, [
        animate(
          '250ms cubic-bezier(0.35, 0, 0.25, 1)',
          style({ opacity: 1, transform: 'none' })
        ),
      ]),
    ]),
  ]),
]);
export const zoomIn = trigger('zoomIn', [
  transition(':enter', [
    query('*', [
      style({ opacity: 0, transform: 'scale(0.5)' }),
      stagger(50, [
        animate(
          '500ms cubic-bezier(0.35, 0, 0.25, 1)',
          style({ opacity: 1, transform: 'none' })
        ),
      ]),
    ]),
  ]),
]);
export const crossfade = trigger('crossfade', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('500ms', style({ opacity: 1 })),
  ]),
]);
export const bounce = trigger('bounce', [
  transition('* => *', [
    style({ transform: 'scale(1)' }),
    animate('200ms ease-in-out', style({ transform: 'scale(1.2)' })),
    animate('200ms ease-in-out', style({ transform: 'scale(1)' })),
  ]),
]);
export const animateFooter = trigger('animateFooter', [
  transition(':enter', [
    query('*', [
      style({ opacity: 0, transform: 'translateY(100%)' }),
      stagger(50, [
        animate(
          '1000ms 500ms cubic-bezier(0.35, 0, 0.25, 1)',
          style({ opacity: 1, transform: 'none' })
        ),
      ]),
    ]),
  ]),
]);
