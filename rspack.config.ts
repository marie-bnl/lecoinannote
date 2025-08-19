import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";

export default defineConfig({
	entry: {
		map: "./src/map/index.ts",
		ad: "./src/ad/index.ts"
	},
	resolve: {
		extensions: ["...", ".ts"]
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
			}
		]
	},
	optimization: {
		minimizer: []
	}
});
