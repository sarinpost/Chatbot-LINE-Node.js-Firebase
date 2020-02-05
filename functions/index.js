const functions = require('firebase-functions');
const request = require('request-promise');

const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
const LINE_HEADER = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer o8U4N9PaMJ39LiZy7ogduJy/groeyLZulFhfSLBjFtlOe+ajx7bHdfA2Pf0/E7P6vmo5B8Oes4OweNVQvf3j7ADsdGYnVbFMDFJ7rmbFuddCjXNUndvzj1YcGPUCPFszY2AE6tpgmyJiXmnJuT0ocwdB04t89/1O/w1cDnyilFU=`
};

exports.LineBot = functions.https.onRequest((req, res) => {
    // res.send('Hello World');
    if (req.body.events[0].message.type !== 'text') {
        return;
    }
    console.log(req.body.events[0].message.text);
    reply(req.body);
});

const reply = (bodyResponse) => {
    return request({
        method: `POST`,
        uri: `${LINE_MESSAGING_API}/reply`,
        headers: LINE_HEADER,
        body: JSON.stringify({
            replyToken: bodyResponse.events[0].replyToken,
            messages: [
                {
                    type: `text`,
                    text: bodyResponse.events[0].message.text
                }
            ]
        })
    });
};



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
