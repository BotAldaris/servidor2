import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { TanStackRouterRspack } from "@tanstack/router-plugin/rspack";
import path from 'node:path';

export default defineConfig({
	plugins: [pluginReact()],
	html:{
		title:"Aldaris Server",
		favicon: path.resolve(__dirname, './src/assets/icon.png'),
	},
	tools: {
		rspack: {
			plugins: [TanStackRouterRspack({ autoCodeSplitting: true })],
		},
	},
});
	