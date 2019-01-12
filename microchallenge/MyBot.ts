import * as express from 'express';
import { Request, Response } from 'express';
import * as yargs from 'yargs';
import { Dijkstra } from './dijkstra/dijkstra';

const app = express();
var argv = yargs
    .number('p')
    .number('port')
    .argv;
const PORT = argv.port || argv.p || 8010;

app.get('/microchallenge', (req: Request, res: Response) => {
    console.log('\n\n\n-------------------------- REQUEST LOGS STARTING HERE --------------------------');
    console.log('You can log stuff and download the logs from the UI in the replay section.');
    console.log("Here is the current problem:");
    console.log(req.query.problem); // problem is in json format
    console.log('---------------------------------------------------------------------------------');

    const problem = JSON.parse(req.query.problem);
    const dijkstra = new Dijkstra(problem);
    const result = dijkstra.findPath();

    res.send((result).toString());
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
});
