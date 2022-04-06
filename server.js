var express = require('express');
var app = express();
var path = require('path');
require('dotenv').config();


//app.use(express.static(__dirname)); // Current directory is root
app.use(express.static(path.join(__dirname, 'public'))); //  "public" off of current is root


app.get('/token',(request,response)=>{

    const twilioAccountSid = process.env.ACCOUNT_SID;
    const twilioApiKey = process.env.TWILIO_API_KEY;
    const twilioApiSecret = process.env.TWILIO_API_SECRET;
  
    const AccessToken = require('twilio').jwt.AccessToken;
    const VideoGrant = AccessToken.VideoGrant;
  
  
    const { identity, roomname } = request.query;
  
    // Create Video Grant
    const videoGrant = new VideoGrant({
      room: roomname,
    });
  
    // Create an access token which we will sign and return to the client,
    // containing the grant we just created
    const token = new AccessToken(
      twilioAccountSid,
      twilioApiKey,
      twilioApiSecret,
      {identity: identity}
    );
    token.addGrant(videoGrant);
  
    let responseJson = {"token":token.toJwt()};
    // Serialize the token to a JWT string
    console.log(token.toJwt());
    response.type('application/json');
      response.send(responseJson);
  
  });

app.listen(80);
console.log('Listening on port 80');