const http = require("http");
const PORT = 4000;
const express = require('express');
const axios = require('axios');
const server = express();
require("dotenv").config();
const sharp = require('sharp');
const fs = require('fs');
const category = 'nature';
server.use(express.json());
API = process.env.API_KEY_VALUE

server.get('/random/image', async(request,response)=>{
    try{
        const result = await axios.get("https://api.api-ninjas.com/v1/randomimage?category="+category, {
            headers: {
                
                'X-Api-Key': API,
                'Accept': 'image/jpg'
            },
            responseType: 'arraybuffer'
        });

        const resizedImageBuffer = await sharp(result.data)
            .resize({ width: 350, height: 300 }) // Set the image width and height
            .toBuffer();
        
        response.setHeader('Content-Type', 'image/jpeg');
        response.send(resizedImageBuffer);
        // fs.writeFileSync('tmp.txt',result.data,{ encoding: 'utf-8'})
        // console.log('Image data saved to tmp.txt');
        console.log(typeof result.data);
    } catch(err){
        console.log(err);
        response.status(500).json(err);
    }
    
})

server.listen(PORT, (request, response)=>{
    console.log("server is running on port "+ PORT);
})