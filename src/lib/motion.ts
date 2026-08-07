/**
 * Single shared feature bundle for every motion island. ShapeNav's layoutId
 * morph requires domMax (projection); loading domAnimation anywhere else
 * would ship a second, redundant feature set — always import from here.
 */
export { LazyMotion, LayoutGroup, m, domMax } from "framer-motion";
