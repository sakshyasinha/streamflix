import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), jsconfigPaths()]
});
