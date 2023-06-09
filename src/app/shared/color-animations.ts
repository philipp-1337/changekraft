import {
  state,
  trigger,
  animate,
  style,
  transition,
} from "@angular/animations";

export const primaryToAccent = trigger("primaryToAccent", [
  state("true", style({ transform: "rotate(0deg)", background: "#00897b" })),
  state("false", style({ transform: "rotate(-225deg)", background: "#b71c1c" })
  ),
  transition("0 <=> 1", animate("200ms ease")),
]);

export const accentToPrimary = trigger("accentToPrimary", [
  state("true", style({ transform: "rotate(-225deg)", background: "#b71c1c" })),
  state("false", style({ transform: "rotate(0deg)", background: "#00897b" })),
  transition("0 <=> 1", animate("200ms ease")),
]);
