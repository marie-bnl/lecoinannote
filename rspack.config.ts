import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";

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
				use: [
					{
						loader: "builtin:swc-loader",
						options: {
							jsc: {
								parser: {
									syntax: "typescript"
								}
							}
						}
					}
				]
			},
			{
				test: /\.html$/,
				type: "asset/source"
			}
		]
	},
	plugins: [
		new rspack.CopyRspackPlugin({
			patterns: [
				{ from: 'src/manifest.json' },
				{ from: 'src/stylesheet.css' }
			],
		})
	],
	optimization: {
		minimizer: []
	}
});
