// U97XJKAH3FEC8CKZUN648CE6

const express = require("express");
const app = express();
const twilio = require("twilio");

const accountSid = "";
const authToken = "";
const verifySid = "";

const client = twilio(accountSid, authToken);
client.verify.v2
  .services(verifySid)
  .verifications.create({ to: "+919900655212", channel: "sms" })
  .then((verification) => console.log(verification.status))
  .then(() => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question("Please enter the OTP:", (otpCode) => {
      client.verify.v2
        .services(verifySid)
        .verificationChecks.create({ to: "+919900655212", code: otpCode })
        .then((verification_check) => console.log(verification_check.status))
        .then(() => readline.close());
    });
  });
app.listen(3000, () => {
  console.log("server running on port 3000");
});
