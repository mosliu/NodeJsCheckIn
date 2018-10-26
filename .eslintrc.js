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
        "max-len": ["error", {
            "code":100,
            "ignoreComments": true,
            "ignoreTrailingComments": true,
            "ignoreUrls": true ,
            "ignoreStrings": true,
            "ignoreTemplateLiterals": true,
            "ignoreRegExpLiterals": true 
        }],
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