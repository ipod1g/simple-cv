# Simple minimal CV

<aside>
💡 GitHub Dev Source https://github.com/ipod1g/simple-cv
Live https://cvbono.netlify.app/

</aside>

# Summary

---

### Skills used

-  HTML
-  CSS
-  React
   -  Libraries: React Hooks
-  npm
-  Netlify
-  LambdaTest (UI test framework)
-  Framer motion & Fontawesome

### Notable functions

-  Responsive UI
-  Glass-morphism designs and animated background
-  Framer-motion based interactions
-  Scroll progress tracking on element containers
-  Blur-up loading technique for heavy file sizes (WIP)

# Process

---

### Initial

-  Goal is to make a CV that is as simple as possible to focus mainly on legibility with lightweight interactibility

### Problems

-  Faced difficulties when making a scroll directed progress bar for components
   -  Initially I made it with recognizing the window’s scroll and subtracted the origin points to separate + limiting and providing the height of the component
   -  Fixed by properly using forwardRef on child components and framer-motion's useScroll
-  Floating elements - with height as fit-content
   -  Properly fitting the background images without hard values was confusing
      -  Fixed using parent element as position relative!
-  Initially animated the appearance of boxes by using aos library
   -  There was issue with overscroll appearing on mobile
   -  Solved by introducing framer-motion intersection observer

### Lessons

-  Fortified React skills
   -  Particularly on ref management in components
-  Utilized Framer motion to enhance user experience
-  Learnt about intersection observer through aos and framer motion
-  Focused in producing responsive, modifiable and lightweight website

# Version check

---

-  v1.0.0
   -  Deployed on 7 Oct 2022
   -  Responsiveness on mobile checked
   -  Glass-morphism design and animated background
   -  Framer-motion based interactions
   -  Scroll progress tracking on element containers
   -  CSS bug on kakaotalk browser

# Future implementation

---

-  [x] Bug fix on iOS mobile devices
-  [x] Download CV button top right
-  [x] Nav bar to click to navigate to section
-  [x] Use ref to properly scroll progress
-  [ ] Animated background → optimize using blur-up technique
