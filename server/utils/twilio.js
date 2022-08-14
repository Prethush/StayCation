const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

function sendOtp(num) {
  console.log(num);
  num = `+91${num}`;
  return client.verify.v2
    .services(process.env.TWILIO_SERVICE_ID)
    .verifications.create({ to: num, channel: "sms" });
}

function verifyOtp(num, val) {
  num = `+91${num}`;
  return client.verify.v2
    .services(process.env.TWILIO_SERVICE_ID)
    .verificationChecks.create({ to: num, code: val });
}

module.exports = { sendOtp, verifyOtp };

// 7559928741
//sreeshilck777@gmail.com
