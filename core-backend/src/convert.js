const fs = require('fs');
const path = require('path');
const converter = require('openapi-to-postmanv2');

// Path to your OpenAPI spec (YAML or JSON)
const inputFile = path.join(__dirname, '../openapi.json');
const outputFile = path.join(__dirname, '../postman-collection.json');

const openApiSpec = fs.readFileSync(inputFile, 'utf8');

converter.convert({ type: 'string', data: openApiSpec }, {}, (err, result) => {
  if (err || !result.result) {
    console.error('❌ Conversion failed:', result.reason || err);
  } else {
    fs.writeFileSync(outputFile, JSON.stringify(result.output[0].data, null, 2));
    console.log('✅ Postman collection saved to postman-collection.json');
  }
});
