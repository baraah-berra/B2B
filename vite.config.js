import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import jsconfigPaths from "vite-jsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), jsconfigPaths()],
    base: "/B2B/",
    server: {
        port: 5000,
    },
});
