// const sassResourcesLoader = require("craco-sass-resources-loader")
// module.exports = {
//     plugins: [
//         {
//             plugin: sassResourcesLoader,
//             options: {
//                 resources: "./src/styles/index.scss"
//             }
//         }
//     ]
// }

const { configure } = require("@testing-library/react")

module.exports = {
    stories: [
        // "../src/**/*.stories.@(js|jsx|ts|tsx|mdx)",
        "../src/stories/*.stories.@(js|jsx|ts|tsx|mdx)",
        "../src/packages/**/*.@(js|jsx|ts|tsx|mdx)",
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/preset-create-react-app",
    ],
    framework: "@storybook/react",
    core: {
        builder: "@storybook/builder-webpack5",
    },
    features: { storyStoreV7: true, postcss: true },
    webpackFinal: async config => {
        config.module.rules.push({
            test: /\.scss$/,
            use: [
                {
                    loader: "sass-resources-loader",
                    options: {
                        resources: "./src/styles/index.scss",
                    },
                },
            ],
        })
        return config
    },
}
