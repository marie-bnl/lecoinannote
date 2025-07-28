import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";

export default defineConfig({
	entry: {
		map: "./src/map.ts",
		ad: "./src/ad.ts"
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
		minimizer: [
			new rspack.SwcJsMinimizerRspackPlugin()
		]
	}
});
