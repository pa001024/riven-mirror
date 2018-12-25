local json = require("json")
local data = require(".weaponsData")


local file = io.open("data.json","w")
local j = json.encode(data)
-- file:write("let po = ")
file:write(j)
-- file:write(";\nexport default po")
file:close()
