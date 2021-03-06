const presets = [
    ["@babel/env", { "modules": false }],
    "@babel/preset-typescript",
    "@babel/react"
]

const plugins = [
    "@babel/plugin-transform-typescript",
    ["@babel/plugin-proposal-decorators",{"legacy": true}],
    ["@babel/plugin-proposal-class-properties",{"loose": true}],
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-nullish-coalescing-operator",
    "@babel/plugin-syntax-dynamic-import",
    // "@babel/plugin-proposal-export-default-from",
    process.env["ENV"] === "development" &&  "react-hot-loader/babel"
].filter(Boolean)


module.exports = {
    presets,
    plugins
}
