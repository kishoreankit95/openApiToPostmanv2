const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const converter = require('openapi-to-postmanv2');

//Defining CORS options
const corsOptions = {
    credentials: true,
    origin: ['http://localhost:3000'] //Whitelisting all the domains we want to allow
}

const app = express();
const upload = multer({dest: 'uploads/'});

app.use(cors(corsOptions)); //Enabling CORS

app.post('/convert', upload.single('file'), (req, res) => {
    const inputFile = path.join(__dirname, req.file.path);
    const openApiSpec = fs.readFileSync(inputFile, 'utf8');

    converter.convert({type: 'string', data: openApiSpec}, {}, (err, result) => {
        if(err || !result.result){
            res.status(500).send('Conversion failed: ' + (result.reason || err));
        }
        else{
            const outputFile = path.join(__dirname, 'postman-collection.json');
            fs.writeFileSync(outputFile, JSON.stringify(result.output[0].data, null, 2));
            res.download(outputFile, 'postman-collection.json');
        }
    });
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
})


