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
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const inputFile = path.join(__dirname, req.file.path);
    const outputFile = path.join(__dirname, 'postman-collection.json');
    try{
        const openApiSpec = fs.readFileSync(inputFile, 'utf8');   

        converter.convert({type: 'string', data: openApiSpec}, {}, (err, result) => {
            // Clean up uploaded file
            if (fs.existsSync(inputFile)) {
                fs.unlinkSync(inputFile);
            }

            if(err || !result.result){
            return res.status(500).send('Conversion failed: ' + (result.reason || err));
            }
            
            fs.writeFileSync(outputFile, JSON.stringify(result.output[0].data, null, 2));
            res.download(outputFile, 'postman-collection.json', (downloadErr) => {
                // Clean up generated output file
                fs.unlink(outputFile, (unlinkErr) => {
                    if (unlinkErr) console.error('Error deleting output file:', unlinkErr);
                });

                if (downloadErr) {
                    console.error('Download error:', downloadErr);
                }
            });
            
        });
    }
    catch(error){
        // Clean up uploaded file if error occurred
        if (fs.existsSync(inputFile)) {
            fs.unlinkSync(inputFile);
        }
        console.error('Error processing file:', error);
        res.status(500).send('Server error');
    }
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
})


