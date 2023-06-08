import {
  sequence,
  trigger,
  animate,
  style,
  query as q,
  transition,
  animateChild
} from "@angular/animations";
const query = (s, a, o = { optional: true }) => q(s, a, o);

export const routerTransition = trigger("routeAnimations", [
  transition("* => *", [
    query(":enter, :leave", style({ position: "fixed", width: "100%" })),
    query(":enter", style({ transform: "translateX(100%)" })),
    sequence([
      query(":leave", animateChild()),
      query(":leave", [
        style({ opacity: 1 }),
        animate(
          "200ms cubic-bezier(.75,-0.48,.26,1.52)",
          style({ opacity: 0 })
        )
      ]),
      query(":enter", [
        style({ transform: "translateX(0)", opacity: 0 }),
        animate(
          "200ms cubic-bezier(.75,-0.48,.26,1.52)",
          style({ opacity: 1 })
        )
      ]),
      query(":enter", animateChild())
    ])
  ])
]);
