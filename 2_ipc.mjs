import cluster from "cluster";

if (cluster.isPrimary) {
  const worker = cluster.fork();
  worker.on("message", (message) =>
    console.log(`message: ${message} from worker ${worker.id}`),
  );
} else {
  process.send(`Hello from worker ${process.pid}`);
}
