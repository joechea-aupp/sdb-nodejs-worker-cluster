import cluster from "cluster";
import http from "http";
import os from "os";
import process from "process";

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  Array.from({ length: numCPUs }).forEach(() => {
    cluster.fork();
  });

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end(`sent from ${process.pid}`);
    })
    .listen(8000, () => {
      console.log(`Worker ${process.pid} started`);
    });
}
