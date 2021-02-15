namespace Rocket_Jam {
    // window.addEventListener("load", generateContent);

    // The GUI values, that are both spawning values for the rocket as well as saved classes for the server

    export function generateContent(_data: iData): void {
        console.log("category");

        for (let category in _data) {
            console.log("category");
            let items: iRocket[] = _data[category];
                CreateOption(items);
        }
    }

    // Create a option in the selector for every saved rocket preset
    function CreateOption(_items: iRocket[]): void {
        let selector: HTMLSelectElement | null = document.querySelector("select#presetSelector");
        if (selector == null)
            return;

        console.log(selector);
        console.log(_items);

        let selectValue: number = 0;
        for(let i = 0; i < _items.length; i++) {
            let option: HTMLOptionElement = document.createElement("option");
            option = document.createElement("option");
            // option.value = option.textContent = "Preset " + i;
            option.setAttribute("name", "default");
            option.setAttribute("value", "" + selectValue);
            option.innerHTML = _items[i].preset; // TODO: is invalid for some reason
            selector.appendChild(option);

            selectValue++;
        }
    }


    // This function is used on clicking the save button
    export function getCurrentValues(): iRocket {
        let presetName: string  = String(new FormData(document.forms[1]).get("presetName"));
        let colorStart: string  = String(new FormData(document.forms[1]).get("startColor"));
        let colorEnd: string  = String(new FormData(document.forms[1]).get("endColor"));
        let lifetime: number = Number(new FormData(document.forms[1]).get("lifetime")); // stanadard  0.05 + 0.025
        let size: number = Number(new FormData(document.forms[1]).get("particleSize"));
        let radius: number = Number(new FormData(document.forms[1]).get("particleRadius"));
        let particleAmount: number = Number(new FormData(document.forms[1]).get("spawnAmount"));
        let hierarchyMax: number = Number(new FormData(document.forms[1]).get("explosionTimes"));

        // Create a data object here for saving in the db
        let iValues: iRocket = {
                preset : presetName,
                startColor : colorStart,
                endColor : colorEnd,
                lifetime : lifetime,
                particleSize : size,
                particleRadius : radius,
                spawnAmount: particleAmount,
                explosionTimes : hierarchyMax      
        }

        console.log()
        console.log(iValues);

        return iValues;
    }

    export function loadCurrentSelectedPreset(): void {
        let selectElem: HTMLElement | null = document.getElementById('presetSelector');
        if(selectElem == null)
            return;
        let selectElemnt: HTMLSelectElement = <HTMLSelectElement>selectElem;
        let presetIndex: number = selectElemnt.selectedIndex; // Number(new FormData(document.forms[0]).get("presetSelector"));

        let _data: iData = result;
        
        for (let category in _data) {
            let items: iRocket[] = _data[category];
            console.log(items[presetIndex].preset);
            setCurrentValues(items[presetIndex]);
        }

        // (result.iRocket[presetIndex]);
    }

    function setCurrentValues(values: iRocket): void {
        let html: HTMLFormElement;
        let htmlTarget: string;
        
        htmlTarget = "presetName";
        html = <HTMLFormElement>document.querySelector("input#" + htmlTarget);
        console.log(values.preset);
        html.setAttribute("value", "" + values.preset);
        html.value = values.preset;

        htmlTarget = "startColor";
        html = <HTMLFormElement>document.querySelector("input#" + htmlTarget);
        html.setAttribute("value", "" + values.startColor);
        html.value = values.startColor;

        htmlTarget = "endColor";
        html = <HTMLFormElement>document.querySelector("input#" + htmlTarget);
        html.setAttribute("value", "" + values.endColor);
        html.value = values.endColor;

        htmlTarget = "particleSize";
        html = <HTMLFormElement>document.querySelector("input#" + htmlTarget);
        html.setAttribute("value", "" + values.particleSize);
        html.value = values.particleSize;

        htmlTarget = "particleRadius";
        html = <HTMLFormElement>document.querySelector("input#" + htmlTarget);
        html.setAttribute("value", "" + values.particleRadius);
        html.value = values.particleRadius;

        htmlTarget = "spawnAmount";
        html = <HTMLFormElement>document.querySelector("input#" + htmlTarget);
        html.setAttribute("value", "" + values.spawnAmount);
        html.value = values.spawnAmount;

        /*
        htmlTarget = "ExplosionTimes";
        html = <HTMLFormElement>document.querySelector("input#" + htmlTarget);
        // html.setAttribute("value", "" + values.ExplosionTimes);
        // html.value = values.ExplosionTimes;
        let elements: HTMLInputElement[] = <HTMLInputElement>document.getElementsByName('ExplosionTimes');
        elements.forEach(e => {
            if (<number>e.value == values.ExplosionTimes) {
                e.checked = true;
            } else {
                e.checked = false;
            }
        });
        */
    }
}