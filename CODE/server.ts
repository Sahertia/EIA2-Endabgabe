import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace Rocket_Jam {

    export interface Rocket {
        [type: string]: string | string[] | undefined;
    }

    let rocketjam: Mongo.Collection; // The server data structure
    let databaseUrl: string = "mongodb+srv://123456789:123456789abc@cluster0.qwwrz.mongodb.net/rocketDB?retryWrites=true&w=majority"; // "mongodb://localhost:27017";

    let port: number | string | undefined = process.env.PORT;
    if (port == undefined)
        port = 5001;

    startServer(port);
    connectToDatabase(databaseUrl);

    function startServer(_port: number | string): void {

        let server: Http.Server = Http.createServer();
        console.log("Server startet auf Port " + _port);
        server.listen(_port);
        server.addListener("request", handleRequest);
    }

    async function connectToDatabase(_url: string): Promise<void> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true }; //mit diesen options eine Verbindung zur DB aufbauen
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        let rocketDB: Mongo.Db = mongoClient.db("rocketDB");
        console.log(rocketDB);
        rocketjam = mongoClient.db("rocketDB").collection("rocketjam");
        console.log(rocketjam);
        console.log("Database connection", rocketjam != undefined);
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("handleRequest");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true); // der Url.parser wandelt den UrlWithParsedQuery in ein anders Format um. Durch true wird daraus ein besser lesbares assoziatives Array. 
            console.log(url);
            console.log(url.query);
            let command: string | string[] | undefined = url.query["command"];
            
            console.log("URL", _request.url);

            /*
            if (command === "getTitles") {
                getTitles(_request, _response);
                console.log("Alle Titel geholt");
                return;
            }
            */
            if (command === "getAllDatas") {
                getAllDatas(_request, _response);
                console.log("Alle Data-Objekte geholt");
                return;
            }
            else {
                storeRocket(url.query, _response);
                console.log("Daten saved");
            }
            return;
        }

        _response.end();

    }

    /*
    // This function is called on start to get the titles of all saved rockets in the DB
    async function getTitles(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {

        let result: Mongo.Cursor<any> = rocketjam.find({}, { projection: { _id: 0, rocketTitel: 1 } });
        let arrayResult: string[] = await result.toArray();
        let listOfTitels: string = JSON.stringify(arrayResult);
        console.log(listOfTitels);
        _response.write(listOfTitels); //Übergabe der Daten an den client
        _response.end();
    }
    */

    // THis function is called to get the currently saved rockets in the DB
    async function getAllDatas(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        let result: Mongo.Cursor<any> = rocketjam.find();
      
        let arrayResult: string[] = await result.toArray();
        let jsonResult: string = JSON.stringify(arrayResult);
        // console.log(jsonResult);
        _response.write(jsonResult); //Übergabe der Daten an den client
        _response.end();
    }

    function storeRocket(_userRocket: Rocket, _response: Http.ServerResponse): void {
        rocketjam.insertOne(_userRocket);
        _response.end();
    }




    // async function getTitels(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
    //     let result: Mongo.Cursor<any> = fireworkCollection.find({}, { projection: { _id: 0, rocketTitel: 1 } });
    //     let arrayResult: string[] = await result.toArray();
    //     let jsonResult: string = JSON.stringify(arrayResult);
    //     console.log(jsonResult);

    //     _response.write(jsonResult); //Übergabe der Daten an den client

    //     _response.end();
    // }
}