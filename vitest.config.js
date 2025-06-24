import {fileURLToPath} from "node:url";
import {defineConfig, mergeConfig} from "vite";
import {configDefaults} from "vitest/config";
import viteConfig from "./vite.config.mjs";
import {URL} from "url";

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            server: {
                deps: {
                    inline: ["vuetify"],
                },
            },
            environment: "jsdom",
            exclude: [...configDefaults.exclude, "e2e/*"],
            root: fileURLToPath(new URL("./", import.meta.url)),
            transformMode: {
                web: [/\.[jt]sx$/],
            },
            coverage: {
                provider: "v8", // or 'istanbul'
                ignoreEmptyLines: true,
                thresholds: {
                    autoUpdate: true,
                },
                css: true,
                exclude: [
                    "dist/*",
                    "documentation/*",
                    "src/main.js",
                    "src/documentation/process_doc.js",
                    "src/store/index.js",
                    "src/plugins/**",
                    "src/router/**",
                    "tests/*",
                    ".eslintrc.js",
                    "vite.config.mjs",
                    "vitest.config.js",
                    "vue.config.js",
                    "webpack.config.js",
                    "eslint.config.js",
                    "src/components/Navigation/PageHeader/Menu.vue",
                    "src/store/*",
                    "src/utils/d3Graph.js"
                ],
                reporter: ["html", "lcov", "text"],
                reportOnFailure: true,
            },
        },
    }),
);
