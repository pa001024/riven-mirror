# Riven Mirror

<p align="center">
  <a href="https://riven.im"><img alt="Website" src="https://img.shields.io/website/https/riven.im"></a>
  <a href="https://circleci.com/gh/pa001024/riven-mirror/tree/dev"><img src="https://img.shields.io/circleci/project/github/pa001024/riven-mirror/dev.svg" alt="Build Status"></a>
  <br>
  <a href="https://www.npmjs.com/"><img src="https://img.shields.io/david/pa001024/riven-mirror" alt="Dependencies"></a>
  <a href="https://github.com/pa001024/riven-mirror"><img src="https://img.shields.io/github/license/pa001024/riven-mirror" alt="License"></a>
  <a href="https://discord.gg/m8pGvfP"><img src="https://img.shields.io/badge/chat-on%20discord-7289da.svg" alt="Chat"></a>
  <img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/pa001024/riven-mirror">
  <a href="https://greenkeeper.io/"><img src="https://badges.greenkeeper.io/pa001024/riven-mirror.svg" alt="Chat"></a>
</p>


> This project means to create a quick identification tool for warframe riven MOD

> This project is currently in the ALPHA stage. Many functions are not perfect. Please note

## Project Introduction

See WIKI for details: [RivenMirror](https://warframe.huijiwiki.com/wiki/%E5%8D%9A%E5%AE%A2:RivenMirror)

## Recent TODO-LIST

- [ ] account

## Features

- Input
  - [x] MOD screenshot recognition
    - [x] English recognition
  - [x] text input
  - [x] Manually select attributes
  - [x] Random Roll
  - ~~[x] QR code~~
- Edit
  - [x] Self-selection card
  - [x] Unified Bonus
- Output
  - [ ] Multi-build comparison
  - [x] faction damage simulation
  - [x] automatic building
  - [x] benchmark score
- [x] weapon fitting
  - [x] status calculation
  - [x] faction calculation
  - [x] simulacrum
  - [x] probability calculation

## Contribution

Clone with: `git clone --recurse-submodules https://github.com/alanlo323/riven-mirror.git`

Fork and send pull request!

## See also

- [riven-mirror-data](https://github.com/pa001024/riven-mirror-data)

## How to run

```
yarn
yarn dev
```

`yarn config set ELECTRON_MIRROR https://npm.taobao.org/mirrors/electron/`
