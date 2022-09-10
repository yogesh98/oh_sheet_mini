import express from 'express';
import http from 'http';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(`Starting oh sheet.`, __filename, __dirname);

const app = express();

//Loading in react app
app.use(express.static(join(__dirname, '../../', 'client', 'build')));
app.get('*', (req, res) => {
  res.sendFile(
    resolve(__dirname, '../../', 'client', 'build', 'index.html'),
  );
});

// Implement route for errors
app.use((err, req, res, next) => {
  res.status(500).send(err.stack);
});

//Create react app server
const server = http.createServer(app);

export const serveReactApp = async () => {
    const port = 4001;
    server.listen(port, '0.0.0.0');
    console.log("react app started");
    return true;
}

export const shutdownReactApp = async () => {
    console.log("shutdown react app");
    server.close();
}

process.once('SIGHUP', shutdownReactApp);
process.once('SIGINT', shutdownReactApp);
process.once('SIGTERM', shutdownReactApp);


export { app, server };