

module.exports = {
    "parser": "babel-eslint",
    "extends": "react-app",
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },

    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "globals": {
        "__dirname": false,
        "require": false,
        "document": false,
        "window": false,
        "console": false,
        "module": false,
        "R": true,
        "moment": true
    },
    "plugins": [
        "babel",
        "react",
        "import"
    ],
    "rules": {
        "no-debugger": process.env.NODE_ENV === 'production' ? 2 : 0,
        'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    }
}
