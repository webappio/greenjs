// vite.config.js
const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'Head.js'),
            name: 'Head',
            fileName: (format) => `greenjs-head.${format}.js`
        },
    }
})
