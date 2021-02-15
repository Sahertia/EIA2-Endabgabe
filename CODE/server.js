"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rocket_Jam = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Rocket_Jam;
(function (Rocket_Jam) {
    let rocketjam; // The server data structure
    let databaseUrl = "mongodb+srv://123456789:123456789abc@cluster0.qwwrz.mongodb.net/rocketDB?retryWrites=true&w=majority"; // "mongodb://localhost:27017";
    let port = process.env.PORT;
    if (port == undefined)
        port = 5001;
    startServer(port);
    connectToDatabase(databaseUrl);
    function startServer(_port) {
        let server = Http.createServer();
        console.log("Server startet auf Port " + _port);
        server.listen(_port);
        server.addListener("request", handleRequest);
    }
    async function connectToDatabase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true }; //mit diesen options eine Verbindung zur DB aufbauen
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        let rocketDB = mongoClient.db("rocketDB");
        console.log(rocketDB);
        rocketjam = mongoClient.db("rocketDB").collection("rocketjam");
        console.log(rocketjam);
        console.log("Database connection", rocketjam != undefined);
    }
    function handleRequest(_request, _response) {
        console.log("handleRequest");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true); // der Url.parser wandelt den UrlWithParsedQuery in ein anders Format um. Durch true wird daraus ein besser lesbares assoziatives Array. 
            console.log(url);
            console.log(url.query);
            let command = url.query["command"];
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
    async function getAllDatas(_request, _response) {
        let result = rocketjam.find();
        let arrayResult = await result.toArray();
        let jsonResult = JSON.stringify(arrayResult);
        // console.log(jsonResult);
        _response.write(jsonResult); //Übergabe der Daten an den client
        _response.end();
    }
    function storeRocket(_userRocket, _response) {
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
})(Rocket_Jam = exports.Rocket_Jam || (exports.Rocket_Jam = {}));
//# sourceMappingURL=server.js.map