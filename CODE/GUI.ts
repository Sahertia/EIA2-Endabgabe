namespace Rocket_Jam {

    window.addEventListener("load", userInterface);

    /* ----------------------------------PUT THIS INTO GUI-------------------------------------------- */

    // TODO: Save button event listener; 
    // TODO: Write save function;
    // TODO: Load presets

    // TODO: Fix color changer
    // document.getElementById("startColor")?.addEventListener("change", watchColorPickerStart, false);
    /*
    document.getElementById("startColor")?.addEventListener('change', (e) => {

        colorStart = "" + e.target.value;
        }));
        */
    // document.getElementById("endColor")?.addEventListener("change", watchColorPickerEnd, false);


    function userInterface(): string {
        let returnVariable: string = "";

        let selector: HTMLSelectElement | null = document.querySelector("presetSelector");

        let option: HTMLOptionElement = document.createElement("option");
        option.setAttribute("name", "default");
        option.value = option.textContent = "Default rocket";
        if (selector == null)
            return;

        selector.appendChild(option);

        for (let i: number = 0; i < 7; i++) {
            if (selector == null)
                return;

            option = document.createElement("option");
            option.setAttribute("name", "default");
            option.value = option.textContent = "Preset " + i;

            // TODO: Load preset into class

            selector.appendChild(option);

            
        }


        returnVariable += "Hallo";
        
        return returnVariable;

        // let formData: FormData = new FormData(document.forms[0]);
        // colorStart = String(formData.get("startColor"));
        // colorEnd = String(formData.get("endColor"));


        /*
        function watchColorPickerStart(_event: HashChangeEvent) {
            colorStart = document.getElementById("startColor;
            // colorStart = _event.target?.value;
            // document.appendChild();
        }
        
        function watchColorPickerEnd(_event: HashChangeEvent) {
            colorEnd = _event.target?.value;
        }
        */

        /* ------------------------------------/PUT THIS INTO GUI------------------------------------------ */

    }
}