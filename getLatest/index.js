const axios = require("axios");
const cheerio = require("cheerio");

const body = {
  query:
    '{\n  repository(name: "node", owner: "nodejs") {\n    object(expression: "master:CHANGELOG.md") {\n      ... on Blob {\n        text\n      }\n    }\n  }\n}\n'
};

const options = {
  url: "https://api.github.com/graphql",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: process.env.github,
    "User-Agent": "btholt-node-version-app"
  },
  data: body
};

module.exports = function(context) {
  context.log();
  axios(options).then(res => {
    const $ = cheerio.load(res.data.data.repository.object.text);
    const versions = $("b a");

    const ans = {
      current: versions[0].children[0].data,
      lts1: versions[1].children[0].data,
      lts2: versions[2].children[0].data,
      id: "1"
    };

    context.log(ans);
    context.bindings.versions = [ans];
    context.done();
  });
};
