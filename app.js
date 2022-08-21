const express = require("express");
const app = express();

// importing axios library to make http requests
const axios = require("axios");

const clientID = "<client_ID>";
const secret = "<client_secret>";

// declaring the redirect route
app.get("/callback", (req, res) => {
  const requestToken = req.query.code; // object req.query has the query parameters that were sent to this route

  axios({
    method: "POST",
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${secret}&code=${requestToken}`,

    // Setting up the content type header, so that we get the response in JSON
    headers: {
      accept: "application/json",
    },
  }).then((response) => {
    const accessToken = response.data.access_token;
    console.log(response.data);

    //redirecting the user to main or home page of the app, using access token
    res.redirect(`/callback.html?access_token=${accessToken}`);
  });
});

app.use(express.static(__dirname));
app.listen(3000, () => {
  console.log("listening on port 3000");
});
