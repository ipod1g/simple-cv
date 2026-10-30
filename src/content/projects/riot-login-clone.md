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

A familiar login screen became my introduction to building with React—from the artwork and animations to the server behind the sign-in button.

> **A working login flow behind the replica.** Registration, password hashing, and JWT authorization connected to MySQL.

### Recreate the details

I rebuilt the Riot client’s login interface, including interactive form states and responsive hero artwork. Preloading and Lighthouse checks helped me work on loading performance.

### The tricky part was state

Inputs, animations, and parent–child communication exposed gaps in my understanding of React’s lifecycle. Refactoring with Sim Ho and Steve over Live Share helped me work through them.

A few details demanded extra attention:

- **Keyboard focus:** a border that seemed random turned out to be a focus outline.
- **Modals:** React Portals let them render above the page while preserving React’s event handling.
- **Deployment:** font loading, Netlify configuration, and an iOS input bug needed work beyond the local build.

### Take it all the way through

The project connected a React frontend to a lightweight Express backend and MySQL database. It gave me practice with **components, authentication, and deployment** in the same build.

### Built with

React · JavaScript · Node.js · Express · MySQL · Sequelize · bcrypt · JWT
