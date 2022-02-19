const GenerateIndex = (head: string, appHTML: string, importStatements: string | string[]) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    ${head}
  </head>
  <body>
    <div id="app">${appHTML}</div>
    ${typeof importStatements !== "string" ? importStatements.join("\n") : importStatements}
  </body>
</html>
`.trim()

export default GenerateIndex
