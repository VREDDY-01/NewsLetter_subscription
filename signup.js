const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

app.get("/",function (req,res) {
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function (req,res) {
    const email = req.body.email;
    const firstname = req.body.Fname;
    const lastname = req.body.Lname;
    const data = {
        members: [
            {
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME:firstname,
                LNAME:lastname
            }
            }
        ]
    }
    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/cff616cc96"
    const options = {
        method:"POST",
        auth:"vishnu:24d826717a69d0bf99a64366a0fbb023-us21"
    }

    const request = https.request(url,options,function (response) {

        if(response.statusCode == 200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data",function (data) {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

})

app.post("/failure",function (req,res) {
    res.redirect("/");
})


app.listen(process.env.PORT || 3000,function () {
    console.log("server has started and running on port 3000");
})

//cff616cc96

//24d826717a69d0bf99a64366a0fbb023-us21