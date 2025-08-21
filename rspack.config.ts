import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";

export default defineConfig({
	entry: {
		map: "./src/scripts/map.ts",
		ad: "./src/scripts/ad.ts",
		stylesheet: "./src/stylesheet.less"
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
