# retrieve-json-to-xml

## Installation

### npmrc file
```bash
registry=https://npm.pkg.github.com/ybribeiro14
//npm.pkg.github.com/:_authToken=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
```

```bash
npm install @ybribeiro14/retrieve-json-to-xml@1.0.0
```

## Simple usage

```js
var fs = require('fs');
const convertJsonToXml = require('@ybribeiro14/retrieve-json-to-xml')

fs.readFile('order.json', 'utf8', function read (err, data) {
  if (err) console.log(err);
  console.log(convertJsonToXml(data))
  fs.writeFile('result.xml', convertJsonToXml(data), (err) => {
    if (err)
      console.log(err);
    else {
      console.log("File written successfully\n");
    }
  });
});
```
