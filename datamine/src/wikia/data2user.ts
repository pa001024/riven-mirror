const fs = require("fs")
// import fs from "fs"

const data = require("./data.json")

let weapons = Object.keys(data.Weapons).map(v => data.Weapons[v])

fs.writeFileSync("userType.json", JSON.stringify(weapons))
