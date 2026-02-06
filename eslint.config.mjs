import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs}"],
        plugins: { js },
        extends: ["js/recommended"],
        languageOptions: { globals: { ...globals.browser, ...globals.node } },
        rules: {
            "no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "res|next|^err|mongoDB",
                    varsIgnorePattern: "dotenv"
                }
            ],

            "arrow-body-style": [2, "as-needed"],

            "no-param-reassign": [
                2,
                {
                    props: false
                }
            ],

            "no-console": 1,

            quotes: [
                "error",
                "double",
                {
                    allowTemplateLiterals: true
                }
            ],

            "func-names": 0,
            "space-unary-ops": 2,
            "space-in-parens": "error",
            "space-infix-ops": "error",
            "comma-dangle": 0,
            "max-len": 0,
            "import/extensions": 0,
            "no-underscore-dangle": 0,
            "consistent-return": 0,
            radix: 0,

            "no-shadow": [
                2,
                {
                    hoist: "all",
                    allow: ["resolve", "reject", "done", "next", "err", "error"]
                }
            ],

            "no-unused-expressions": "off"
        }
    },
    { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
    eslintPluginPrettierRecommended
]);
