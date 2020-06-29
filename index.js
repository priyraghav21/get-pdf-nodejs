const path = require('path')

const express = require('express');
const pdfDoc = require('pdfkit');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const e = require('express');

const app = express();


app.use(bodyParser.urlencoded({extended:false}));

app.get('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});

app.post('/get-pdf',(req,res,next)=>{
   const {name,email,qual} = req.body;
   const document = new pdfDoc();
   const text = `
            This is your entered data:
            your name : ${name}
            your email : ${email}
            your qualifications : ${qual}

            Thanks for downloading this pdf!!
   `;
   document.fontSize(30);
   document.text(text)
   document.end();
   res.setHeader('Content-Dispostion','attachment');
   res.setHeader('Content-Type','application/pdf');
   document.pipe(res);
})




app.listen(3000,()=>{
    console.log("running on localhost://3000");
})