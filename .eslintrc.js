module.exports = {
    "extends": "airbnb-base",
    "env": {
        "es6": true,
        "node": true,
        "mocha": true,
    },
    "plugins": [
        "import",
        "mocha"
    ],
    "rules": {
        "class-methods-use-this": "off",
        "no-console": "off",
        "no-param-reassign": "off",
        "import/no-extraneous-dependencies": ["error", {
            "devDependencies": ["**/*.test.js", "**/*.spec.js"]
        }],
        "prefer-destructuring": ["error", {
            "array": false,
            "object": false
        }, {
            "enforceForRenamedProperties": false
        }]

    }
};