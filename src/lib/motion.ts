/**
 * Single shared feature bundle for every motion island — importing a second
 * feature set anywhere would ship a redundant copy alongside this one.
 *
 * Still domMax rather than domAnimation: the project card's artwork flies into
 * the expanded panel via `layoutId`, and only domMax carries the projection
 * feature that shared-layout animation needs.
 */
export {
  AnimatePresence,
  LayoutGroup,
  LazyMotion,
  m,
  domMax,
} from "framer-motion";
