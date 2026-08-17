---
title: Riot Games Client Login Screen Clone
accent: "#f43f3f"
subtitle: Personal
start: 2022-08-18
end: 2022-09-02
# url: https://testers4bono.netlify.app
github: https://github.com/ipod1g/riotlogin-clone-client
thumbnail: riot-client-clone.webp
points:
  - Developed a functional registration and login authorization system connected to RDBMS(MySQL) database using React and Node.js
  - Applied original responsive design and readily utilized React Hooks API
  - Optimized performance by using preloading methods and continuously refactored code for better efficiency
---

## Summary

### Skills used

- HTML
- CSS
- JavaScript
- React
- npm
- Netlify (Frontend) & Heroku (Backend)
- Node.js (express), axios, JWT
- RDBMS (MySQL) + sequelize
- Insomnia, LambdaTest (UI test framework)

### Notable functions

- Replica of Riot Games Client
- Registration on MySQL database
- Server login authorization with hashing and JWT
- Interactive and Responsive UI
- Optimizations for loading time

## Process

### Initial

- Started with importing necessary assets and building the login form
- Made various states to replicate the behavior of the interaction
- Added personal touch on maintaining the aspect ratio of the hero art upon responsive rescaling
- Refactor process with Sim Ho and Steve using Live-share for feedback
- Selected MySQL as the choice of DBMS instead of MongoDB following these info from IBM

### Problems

- Faced difficulties on constructing input handler + animation — tried to use components to simplify the code blocks but the life cycle was confusing
- Using `onChange` the inputs are recognized 1 input later than wanted, hence brought `useEffect` to play
- Overuse of `useState` and `useEffect` due to difficulties with child-parent communication
- Had bug after pressing button and using keyboard input causing a random border appearing on it → `:focus-visible` had inherent outline
- Faced troubles with deployment, but fixed with creating `netlify.toml` file locally
- Issues with non secured http font link — solved by using import/link to `@font-face`
- `setSelectionRange` was not working by function of `onClick` → `useEffect` resolved it without using it for cursor focus
- Passing object props and recognizing change of state was an issue due to the way React reads it
- React-select library — blur on selection
- To improve performance, minify was considered but realized that JSX format doesn't auto minify on React unlike JS
- Had this funny error with CSS on modal, turns out it was due to a misinputted `;` in between the classes that stopped it from reading the styles underneath

### Lessons

- Introduction to component based coding with React
- Utilized React Hooks and knowledge of React components for more manageable code
- Used React Portal for modal to maintain event delegation provided but render above all
- react-transition-group animation library → had trouble using translate 50% centered for uprising animation
- Utilize Lighthouse to check and optimize performance
- Setting up a light-weight backend with Node.js + MySQL
- On deployment, iOS device had input value not filling bug
- Implement hashing and JWT authentication using bcrypt and jwt-token

## Version check

- v1.0.0
- v1.1.0
- v1.2.0
- v2.1.0
- v2.1.1
- v2.2.0
- v3.1.0
