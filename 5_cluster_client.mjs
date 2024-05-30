import http from "http";

var options = {
  host: "localhost",
  path: "/",
  port: "8000",
};

function runReq(response) {
  let str = "";

  response.on("data", (data) => {
    str += data;
  });

  response.on("end", () => console.log(str));
}

// send single request
http.request(options, runReq).end();

// send 100 requests
// Array.from({ length: 100 }).forEach(() => {
//   http.request(options, runReq).end();
// });
