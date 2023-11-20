const express = require("express");
const app = express();
const  cors = require('cors')
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
require("dotenv").config()
var axios = require('axios');




app.post("/request",async (req,res) => {
console.log("🚀 ~ file: index.js:55 ~ app.post ~ req:", req.headers)

    var data = {
        "refrenceId":req.body.refrenceId,
        "appId": req.body.appId,
        "sourceId": req.body.sourceId,
        "currencyId": req.body.currencyId,
        "amount": req.body.amount,
        "naration": req.body.naration,
        "senderName":req.body.senderName,
        "beneficiaryId": req.body.beneficiaryId
    }
    
    var config = {
        // https://apidoc.transferrocket.co.uk//processwebpayoutclientrequest'
      method: 'post',
    maxBodyLength: Infinity,
      url: process.env.url,
      headers: { 
        'clientId': req.headers.clientid
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      if (!response.data.status) {
        return res.status(400).json({
          statusCode: 400,
          message:response.data.message || "An error occured please try later",
          data:response.data
        })
        
      }
      return res.status(200).json({
        statusCode: 200,
        message:"Successfully sent request to transfer rocket",
        data:response.data
      })
    })
    .catch(function (error) {
      console.log(error);
      if(error.code == "ECONNRESET"){
        return res.status(503).send({
            statusCode: 503,
            message: "Service Unavailable"
            });
            }else{
                return res.status(500).send({
                    statusCode: 500,
                    message: "Internal Server Error"
                    });
                    }
    });
})

app.listen(process.env.port,()=> console.log("server running on",process.env.port ))