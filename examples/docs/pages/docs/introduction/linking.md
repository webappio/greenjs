## Linking to a Section

The `markdown-to-jsx` module creates id's for all text headers that you add. For example if in your markdown you have the following:

```
    ## Some Header
```

Then an id will be inserted in the HTML as follows:

```
    <h2 id="some-header">Some Header</h2>
```

This way, you don't have to specify each id in your markdown when creating/adding a `DocLink` to the navigation.

<br />