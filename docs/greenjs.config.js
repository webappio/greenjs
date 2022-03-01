import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: "0.0.0.0",
    },
    plugins: [
        {
            resolveId(source, importer, options) {
                console.log("resolving " + source);
            }
        }
    ]
})

