@echo off
lua wiki2json.lua
npx ts-node data2user.ts
