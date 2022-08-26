const { Octokit } = require("octokit");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors({origin: '*'}));

const idArray = [];

app.post("/invite", async (req,res) => {
  const username = req.body.username;
  console.log(`Invitation Request received from ${username}`);
  const PAT = req.body.PAT;
  try {
    const octokit = new Octokit({
      auth: PAT
    })
    const idResponse = await octokit.request('GET /users/{username}', {
      username
    });
    const id = idResponse.data.id;
    if (idArray.includes(id)) {
      res.status(404).send('Invitation already sent out.');
      return;
    }
    const invitationResponse = await octokit.request('POST /orgs/{org}/invitations', {
      org: 'EtchReach',
      invitee_id: id,
      role: 'direct_member',
    })

    idArray.push(id);
    
    res.send(invitationResponse);
  } catch (error) {
    res.send(error);
  }
});

app.get("/members", async(req,res) => {
  const PAT = process.env.PAT;
  const octokit = new Octokit({
    auth: PAT
  })
  const queryResponse = await octokit.request('GET /orgs/{org}/members', {
    org: 'EtchReach'
  });
  const memberArray = [];
  for (member of queryResponse.data) {
    memberArray.push(member.login)
  }
  res.send(memberArray);
});

app.get("/", (req, res) => {
  // Health check
  console.log("Health check detected");
  res.send("Server up and running.");
});

app.listen(port, () => {
  console.log(`App Running on port ${port}.`);
});
