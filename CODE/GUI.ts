namespace Rocket_Jam {
    // window.addEventListener("load", generateContent);

    // The GUI values, that are both spawning values for the rocket as well as saved classes for the server

    export function generateContent(_data: iData): void {
        for (let category in _data) {
            let items: iRocket[] = _data[category];
            switch (category) {
                case "Rockets":
                    CreateOption(items);
                    break;
                default:
                    break;
            }
        }
    }

    // Create a option in the selector for every saved rocket preset
    function CreateOption(_items: iRocket[]): void {
        let selector: HTMLSelectElement | null = document.querySelector("select#presetSelector");
        if (selector == null)
            return;

        console.log(selector);

        let selectValue: number = 0;
        for(let i = 0; i < _items.length; i++) {
            let option: HTMLOptionElement = document.createElement("option");
            option = document.createElement("option");
            option.setAttribute("name", "default");
            option.setAttribute("value", "" + selectValue);
            option.value = option.textContent = "Preset " + i;
            selector.appendChild(option);

            selectValue++;
        }
    }


    // This function is used on clicking the save button
    export function getCurrentValues(): iRocket {
        let colorStart: string  = String(new FormData(document.forms[0]).get("startColor"));
        let colorEnd: string  = String(new FormData(document.forms[0]).get("endColor"));
        let lifetime: number = Number(new FormData(document.forms[0]).get("particleAmount")); // stanadard  0.05 + 0.025
        // console.log(new FormData(document.forms[0]).get("particleAmount"));
        // console.log(lifetime);
        let size: number = Number(new FormData(document.forms[0]).get("particleSize"));
        let radius: number = Number(new FormData(document.forms[0]).get("particleRadius"));
        let particleAmount: number = Number(new FormData(document.forms[0]).get("particleAmount"));
        let hierarchyMax: number = Number(new FormData(document.forms[0]).get("ExplosionTimes"));

        // Create a data object here for saving in the db
        let iValues: iRocket = {
                preset : "Default X",
                startColor : colorStart,
                endColor : colorEnd,
                lifetime : lifetime,
                particleSize : size,
                particleRadius : radius,
                spawnAmount: particleAmount,
                ExplosionTimes : hierarchyMax      
        }

        return iValues;
    }

    export function loadCurrentSelectedPreset(): void {
        let presetIndex: number = Number(new FormData(document.forms[0]).get("presetSelector"));
        setCurrentValues(result.iRocket[presetIndex]);
    }

    function setCurrentValues(values: iRocket): void {
        let html: HTMLButtonElement;
        let htmlTarget: string;
        
        htmlTarget = "presetName";
        html = <HTMLButtonElement>document.querySelector("input#" + htmlTarget);
        html.setAttribute("value", "" + values.preset);

        htmlTarget = "startColor";
        html = <HTMLButtonElement>document.querySelector("input#" + htmlTarget);
        html.setAttribute("value", "" + values.startColor);

        htmlTarget = "endColor";
        html = <HTMLButtonElement>document.querySelector("input#" + htmlTarget);
        html.setAttribute("value", "" + values.endColor);

        htmlTarget = "particleSize";
        html = <HTMLButtonElement>document.querySelector("input#" + htmlTarget);
        html.setAttribute("value", "" + values.particleSize);

        htmlTarget = "particleRadius";
        html = <HTMLButtonElement>document.querySelector("input#" + htmlTarget);
        html.setAttribute("value", "" + values.particleRadius);

        htmlTarget = "particleAmount";
        html = <HTMLButtonElement>document.querySelector("input#" + htmlTarget);
        html.setAttribute("value", "" + values.spawnAmount);


        htmlTarget = "ExplosionTimes";
        html = <HTMLButtonElement>document.querySelector("input#" + htmlTarget);

        console.log(html.getAttribute("value") + " |  " + values.ExplosionTimes);

        html.setAttribute("value", "" + values.ExplosionTimes);
    }
}