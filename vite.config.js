export default defineConfig({
  resolve: {
    alias: {
      "@": require("path").resolve(__dirname, "src"),
    },
  },
});
