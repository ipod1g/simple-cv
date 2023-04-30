/** Implement alongside next image
 *  blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
 *  where shimmer was a function that returned a string of a svg
 */

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

export default toBase64;
