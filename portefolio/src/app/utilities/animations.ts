import { animate, query, style, transition, trigger } from "@angular/animations";

var time_md = '1250ms cubic-bezier(0.62,0.05,0.01,0.99)';

export const translateDown = trigger('translateDown', [
  transition('void => *',[
    style({transform: 'translateY(-100%)'}),
    animate(time_md, style({ transform: 'translateY(0%)' })),
  ])
])

export const translateUp = trigger('translateUp', [
  transition('void => *',[
    style({transform: 'translateY(100%)'}),
    animate(time_md, style({ transform: 'translateY(0%)' })),
  ])
])

export const fadeInOut = trigger("fadeInOut", [
  transition("* => *", [
    query(":enter", [style({ opacity: 0 })], { optional: true }),
    query(
      ":leave",
      [style({ opacity: 1 }), animate("2s", style({ opacity: 0 }))],
      { optional: true }
    ),
    query(
      ":enter",
      [style({ opacity: 0 }), animate("2s", style({ opacity: 1 }))],
      { optional: true }
    )
  ])
])
