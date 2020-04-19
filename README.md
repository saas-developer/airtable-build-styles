
# SCSS integration to Airtable Custom Blocks

# Problem

Airtable Custom Blocks do not allow you to import "scss" or "css" files directly.

Instead you have to use their `loadCSSFromString` API to load stylesheets.


## Solution

1. Write SCSS
2. Compile it to CSS
3. Convert CSS to String
4. Load this String using `loadCSSFromString`


## How?

1. Clone this repo
2. `cd airtable-build-styles`
2. `npm install`
3. `node buildStyles "path_to_source_scss_file"`
Eg: `node buildStyles ../my_awesome_custom_block/frontend/styles/main.scss`

This will create `../my_awesome_custom_block/frontend/styles/main.css` and `../my_awesome_custom_block/frontend/styles/main.js`.

4. Import `main.js` in your Airtable Custom Block and pass it to `loadCSSFromString`
Example:

```
    import styles from `../styles/main.js`
    import { loadCSSFromString } from '@airtable/blocks/ui';
    loadCSSFromString(styles);

```

5. Thats it.

This will run `node-sass` in watch mode.
As soon your source file changes, the JS file will be created again.
Airtable Block will hot reload.


If you are using this, don't forget to STAR the repo.
