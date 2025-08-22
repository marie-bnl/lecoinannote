import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";

import less from "less";

export default defineConfig({
	entry: {
		map: "./src/scripts/map.ts",
		ad: "./src/scripts/ad.ts"
	},
	resolve: {
		extensions: ["...", ".ts", ".html"]
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [ {
					loader: "builtin:swc-loader",
					options: { jsc: { parser: { syntax: "typescript" } } }
				} ]
			},
			{
				test: /\.html$/,
				type: "asset/source"
			},
			{
				test: /\.less$/,
				use: 'less-loader',
				type: 'css'
			}
		]
	},
	plugins: [
		new rspack.CopyRspackPlugin({
			patterns: [
				{ from: 'src/manifest.json' },
				{ from: 'icons' },
				{ from: 'src/loading.svg' },
				{
					from: 'src/stylesheet.less',
					to: 'stylesheet.css',
					transform: (x) => less.render(x.toString()).then<string>(o => o.css)
				}
			],
		})
	],
	optimization: {
		minimizer: []
	},
	experiments: {
		css: true,
	},
});
