---
title: Battleship Online
accent: "#14477d"
subtitle: Personal
start: 2022-11-11
end: null
url: https://github.com/ipod1g/battleship
github: https://github.com/ipod1g/battleship
draft: true
points:
  - Developed an online version of battleship board game using modern frameworks - Next.js and TypeScript
  - Collaborated with a more experienced full-stack developer to gain constant insights and feedbacks for code improvements with GitHub features
  - Prevented exploits by managing game states and data with server-side authentication
---

## Summary

### Skills used

- HTML
- CSS
- TypeScript
- React
- npm / yarn
- Vercel

### Notable functions

- Online 1v1 Multiplayer (Relay)
- Video chat interaction

## Process

### Initial

- Started off by building a local game

### Problems

- When making main game logic, the way I rendered was incompatible and had to restructure a few times
- The board is rendered based on values of ship length
- Make a function that updates the board
- `checkHit` only checks for ship, make it for different states
- Random ship placement intersects…

### Lessons

- Reducer, arrays, types, interface management
- Communicating actively for collaboration with use of Miro, Notion and GitHub
- Avoiding mutations in array by returning new array
- Constantly changed code logics to optimize performance and readability
- Reduce effort of maintaining different repos for a small project. Since the codes all use the same data representation, why not store everything in the same repo and keep everything in sync?

## Version check

- v1.0.0
