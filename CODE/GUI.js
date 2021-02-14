"use strict";
var Rocket_Jam;
(function (Rocket_Jam) {
    // window.addEventListener("load", generateContent);
    // The GUI values, that are both spawning values for the rocket as well as saved classes for the server
    function generateContent(_data) {
        for (let category in _data) {
            let items = _data[category];
            switch (category) {
                case "Rockets":
                    CreateOption(items);
                    break;
                default:
                    break;
            }
        }
    }
    Rocket_Jam.generateContent = generateContent;
    // Create a option in the selector for every saved rocket preset
    function CreateOption(_items) {
        let selector = document.querySelector("select#presetSelector");
        if (selector == null)
            return;
        console.log(selector);
        let selectValue = 0;
        for (let i = 0; i < _items.length; i++) {
            let option = document.createElement("option");
            option = document.createElement("option");
            option.setAttribute("name", "default");
            option.setAttribute("value", "" + selectValue);
            option.value = option.textContent = "Preset " + i;
            selector.appendChild(option);
            selectValue++;
        }
    }
    // This function is used on clicking the save button
    function getCurrentValues() {
        let colorStart = String(new FormData(document.forms[0]).get("startColor"));
        let colorEnd = String(new FormData(document.forms[0]).get("endColor"));
        let lifetime = Number(new FormData(document.forms[0]).get("particleAmount")); // stanadard  0.05 + 0.025
        // console.log(new FormData(document.forms[0]).get("particleAmount"));
        // console.log(lifetime);
        let size = Number(new FormData(document.forms[0]).get("particleSize"));
        let radius = Number(new FormData(document.forms[0]).get("particleRadius"));
        let particleAmount = Number(new FormData(document.forms[0]).get("particleAmount"));
        let hierarchyMax = Number(new FormData(document.forms[0]).get("ExplosionTimes"));
        // Create a data object here for saving in the db
        let iValues = {
            preset: "Default X",
            startColor: colorStart,
            endColor: colorEnd,
            lifetime: lifetime,
            particleSize: size,
            particleRadius: radius,
            spawnAmount: particleAmount,
            ExplosionTimes: hierarchyMax
        };
        return iValues;
    }
    Rocket_Jam.getCurrentValues = getCurrentValues;
    function loadCurrentSelectedPreset() {
        let presetIndex = Number(new FormData(document.forms[0]).get("presetSelector"));
        setCurrentValues(Rocket_Jam.result.iRocket[presetIndex]);
    }
    Rocket_Jam.loadCurrentSelectedPreset = loadCurrentSelectedPreset;
    function setCurrentValues(values) {
        let html;
        let htmlTarget;
        htmlTarget = "presetName";
        html = document.querySelector("input#" + htmlTarget);
        html.setAttribute("value", "" + values.preset);
        htmlTarget = "startColor";
        html = document.querySelector("input#" + htmlTarget);
        html.setAttribute("value", "" + values.startColor);
        htmlTarget = "endColor";
        html = document.querySelector("input#" + htmlTarget);
        html.setAttribute("value", "" + values.endColor);
        htmlTarget = "particleSize";
        html = document.querySelector("input#" + htmlTarget);
        html.setAttribute("value", "" + values.particleSize);
        htmlTarget = "particleRadius";
        html = document.querySelector("input#" + htmlTarget);
        html.setAttribute("value", "" + values.particleRadius);
        htmlTarget = "particleAmount";
        html = document.querySelector("input#" + htmlTarget);
        html.setAttribute("value", "" + values.spawnAmount);
        htmlTarget = "ExplosionTimes";
        html = document.querySelector("input#" + htmlTarget);
        console.log(html.getAttribute("value") + " |  " + values.ExplosionTimes);
        html.setAttribute("value", "" + values.ExplosionTimes);
    }
})(Rocket_Jam || (Rocket_Jam = {}));
//# sourceMappingURL=GUI.js.map