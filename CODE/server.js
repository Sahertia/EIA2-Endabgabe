"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Firework = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Firework;
(function (Firework) {
    let rocketCollection;
    let databaseUrl = "mongodb+srv://FrankeSa:Milou@sarahcluster-pelct.mongodb.net/Firework?retryWrites=true&w=majority"; // "mongodb://localhost:27017";
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
        rocketCollection = mongoClient.db("Firework").collection("Rockets");
        console.log("Database connection", rocketCollection != undefined);
    }
    function handleRequest(_request, _response) {
        console.log("handleRequest");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true); // der Url.parser wandelt den UrlWithParsedQuery in ein anders Format um. Durch true wird daraus ein besser lesbares assoziatives Array. 
            let command = url.query["command"];
            console.log("Der URL", _request.url);
            if (command === "getTitels") {
                getTitles(_request, _response);
                console.log("Titel geholt");
                return;
            }
            if (command === "getAllDatas") {
                getAllDatas(_request, _response);
                console.log("Titeldaten geholt");
                return;
            }
            else {
                storeRocket(url.query, _response);
                console.log("Daten gespeichert");
            }
            return;
        }
        _response.end();
    }
    async function getTitles(_request, _response) {
        let result = rocketCollection.find({}, { projection: { _id: 0, rocketTitel: 1 } });
        let arrayResult = await result.toArray();
        let listOfTitles = JSON.stringify(arrayResult);
        console.log(listOfTitles);
        _response.write(listOfTitles); //Übergabe der Daten an den client
        _response.end();
    }
    async function getAllDatas(_request, _response) {
        let result = rocketCollection.find();
        let arrayResult = await result.toArray();
        let jsonResult = JSON.stringify(arrayResult);
        // console.log(jsonResult);
        _response.write(jsonResult); //Übergabe der Daten an den client
        _response.end();
    }
    function storeRocket(_userRocket, _response) {
        rocketCollection.insertOne(_userRocket);
        _response.end();
    }
})(Firework = exports.Firework || (exports.Firework = {}));
//# sourceMappingURL=server.js.map