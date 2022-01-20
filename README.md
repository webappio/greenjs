[![Fast React pages for existing sites](https://pimp-my-readme.webapp.io/pimp-my-readme/sliding-text?emojis=1f3d7-fe0f&text=Fast%2520React%2520pages%2520for%2520existing%2520sites)](https://pimp-my-readme.webapp.io)

GreenJS combines esbuild, Go, and prerendering into a great developer experience for React users.

### Build faster with a familiar interface
Iterate without reading our docs, the GreenJS `<Router>` and `<Link>` elements are already familiar to most React developers.

### 'npm build' is 10x faster
GreenJS is written entirely in Go, and uses esbuild to finish builds in milliseconds instead of minutes.

### Add react components to existing sites
The GreenJS production webserver can act as a proxy to forward traffic to an existing site effortlessly.

# How to Get Started
<img src="https://greenjs.io/static/images/react-code.svg" width="250" alt="" align="left"/>

### 1. Write React code like you usually would

Instead of using complex file-based routing, use routes directly within React to define pages. GreenJS comes with drop-in replacements for react-helmet, react-router and react-dom.
<br><br><br><br><br><br><br><br>

<img src="https://greenjs.io/static/images/dist-folder-example.svg" width="250" alt="" align="left"/>

### 2. Run greenjs build to prerender your site

At build-time, we’ll discover all of your routes. We’ll use a headless browser to visit all of your pages and run your React code. The resulting pages will be saved as HTML.
<br><br><br>

<img src="https://greenjs.io/static/images/host-your-site.svg" width="250" alt="" align="left"/>

### 3. Host your site as you usually would

GreenJS automatically emits a high performance webserver in the dist folder to distribute the entire application with ease.
<br><br><br><br><br><br>

## Ready to get started?
- [Get started](https://greenjs.io/docs/getting-started)
- [Learn more](https://greenjs.io/docs/why)
- [See examples](https://greenjs.io/docs/examples)
- [Join the discord](https://discord.gg/zmbkhF8jnH)