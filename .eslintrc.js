module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        "plugin:vue/essential",
        "eslint:recommended",
        "@vue/typescript/recommended"
        // "plugin:prettier/recommended",
        // "prettier",
    ],
    // plugins: ["prettier"],
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/ban-ts-ignore': 'off',
        semi: ["warn", "never"],
        indent: ['warn', 4]
        // "prettier/prettier": ["warn"],
    },
    overrides: [
        {
            files: [
                "**/__tests__/*.{j,t}s?(x)",
                "**/tests/unit/**/*.spec.{j,t}s?(x)"
            ],
            env: {
                jest: true
            }
        }
    ]
}
