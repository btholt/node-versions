module.exports = async function(context, req) {
  const { current, lts1, lts2 } = context.bindings.versions;
  context.res = {
    body: JSON.stringify({
      current,
      lts1,
      lts2
    }),
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  };
};
