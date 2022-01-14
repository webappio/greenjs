## Docs Template Structure

This documentation template is structured in the following manner. After cloning or forking this template, you'll see the following:

- docs
- docs/pages
- docs/pages/docs
- docs/pages/common

The `docs/pages/docs` folder contains all the relevant documentation in markdown files, the `DocLink` class, and the function needed to search through the docs.

If you want to add to the existing docs do the following:

1. Create a Markdown file in one of the existing folders.
2. Import the Markdown file into the index.js file within the same folder.
3. Add a DocLink to the `CONTENT` array with the relevant information you need in the side navigation.

If you want to add a new section to the docs, do the following:

1. Create a folder for the new sectiion in the `docs/pages/docs` folder.
2. Create a Markdown file with the necessary information.
3. Create an `index.js` file.
4. Copy an existing `index.js` structure from another folder. This must include a CONTENT array, and a MAIN `DocLink` which is to be exported.
5. Import the CONTENT array and MAIN `DocLink` created into the `docs/pages/docs/index.js` file and add it in the following order [MAIN, CONTENT].
6. That's all!

<br />