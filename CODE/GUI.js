"use strict";
var Rocket_Jam;
(function (Rocket_Jam) {
    window.addEventListener("load", init);
    function init() {
        //let returnVariable: string = "";
        let selector = document.querySelector("select#presetSelector");
        if (selector == null)
            return;
        console.log(selector);
        let option = document.createElement("option");
        option.setAttribute("name", "default");
        option.value = option.textContent = "Default rocket";
        selector.appendChild(option);
        for (let i = 0; i < 7; i++) {
            if (selector == null)
                return;
            option = document.createElement("option");
            option.setAttribute("name", "default");
            option.value = option.textContent = "Preset " + i;
            // TODO: Load preset into class
            selector.appendChild(option);
        }
        // document.getElementById("userInterface")?.addEventListener("change", userInterface);
    }
    // This function is used on clicking the save button
    function loadValues() {
        let colorStart = String(new FormData(document.forms[0]).get("startColor"));
        let colorEnd = String(new FormData(document.forms[0]).get("endColor"));
        let lifetime = Number(new FormData(document.forms[0]).get("particleAmount")); // stanadard  0.05 + 0.025
        console.log(new FormData(document.forms[0]).get("particleAmount"));
        console.log(lifetime);
        let radius = Number(new FormData(document.forms[0]).get("particleSize"));
        let size = Number(new FormData(document.forms[0]).get("particleSize"));
        let hierarchyMax = Number(new FormData(document.forms[0]).get("ExplosionTimes"));
        // Create a data object here for saving in the db
        let iValues;
        iValues.size = size;
    }
    /*
    export function userInterface(): interfaceValues | null {
        let formData: FormData = new FormData(document.forms[0]);
        let guiValues: interfaceValues | null;

        guiValues.colorStart = String(formData.get("startColor"));
        guiValues.colorEnd = String(formData.get("endColor"));
        guiValues.lifetime = Number(formData.get("particleAmount"));
        guiValues.radius = Number(formData.get("particleSize"));
        guiValues.size = Number(formData.get("particleSize"));
        guiValues.explosionNumber = Number(formData.get("ExplosionTimes"));

        if(guiValues != undefined) {
            return guiValues;
        }
        console.log(guiValues);
        return null;
    }
    */
    // TODO: Write save function;
    // TODO: Load presets
    // function setColor(): void {
    //     let colorStart: HTMLInputElement = <HTMLInputElement>document.querySelector("#startColor");
    //     startColor.value = colorStartDefault:
    //     startColor.addEventListener("input", updateFirst, false);
    //     startColor.addEventListener("change", updateAll, false);
    //     startColor.select();
    // }
    // function updateFirst(): void {
    //     let startColor: HTMLInputElement | null = document.querySelector("#startColor");
    //     if (startColor) {
    //         startColor.value = this.target.value;
    //     }
})(Rocket_Jam || (Rocket_Jam = {}));
//# sourceMappingURL=GUI.js.map