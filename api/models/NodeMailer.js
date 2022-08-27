const nodemailer = require("nodemailer");

const msg = {
    from: "yohannayanajith40@gmail.com",
    to:"yohannayanajith13@gmail.com",
    subject:"Nodemailer Testing",
    text: "Testing out first sender"
};

nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yohannayanajith40@gmail.com',
        pass:'xnlncmuyxayprrvj'
    },
    port: 465,
    host: 'smtp.gmail.com'
})
.sendMail(msg,(err) => {
    if(err){
        return console.log("Error"+err);
    }else{
        return console.log("Email sent");
    }
});