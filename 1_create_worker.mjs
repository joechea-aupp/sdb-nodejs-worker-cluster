import cluster from "cluster";
import http from "http";

const cpu = 4;

if (cluster.isPrimary) {
  Array.from({ length: cpu }).forEach(() => {
    cluster.fork();
  });
} else {
  http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end(`Process ${process.id} says hello!`);
    })
    .listen(8000, () =>
      console.log(`Server is running on port 8000 with process ${process.pid}`),
    );
}
