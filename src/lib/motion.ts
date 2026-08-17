/**
 * Single shared feature bundle for every motion island — importing a second
 * feature set anywhere would ship a redundant copy alongside this one.
 *
 * domAnimation, not domMax: the only thing that needed projection was the
 * project card flying into an expanded panel, and that panel is gone. What is
 * left — opacity, transform and presence — is what domAnimation covers, at
 * roughly half the weight. Adding a `layoutId` or a `drag` anywhere would
 * silently do nothing under `strict`, and would mean going back to domMax.
 */
export {
  AnimatePresence,
  LazyMotion,
  m,
  domAnimation,
  animate,
  cubicBezier,
} from "framer-motion";
export type { AnimationPlaybackControls } from "framer-motion";
