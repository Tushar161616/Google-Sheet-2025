const header = document.getElementById("head-section");
const srno = document.getElementById("srN");
const maincon = document.getElementById("main-container");
   
   
    


    let cols = 26;
    let rows = 1000;
    for(let i = 1; i<=cols; i++){
        const hdiv = document.createElement("div");
        hdiv.className = "h-cell";
       
        hdiv.innerText = String.fromCharCode(64 + i);

        header.appendChild(hdiv);
    }


    for(let j = 1; j<=rows; j++){
        const  srcell = document.createElement("div");
        srcell.className = "sr-cell";
        srcell.innerText = j;

        srno.appendChild(srcell);

    }


    for(let k = 1; k<=rows; k++){
        const rowelement = document.createElement("div");
        rowelement.className = "main-rows";

        for(let i = 1; i <= cols; i++){
            const rowcell = document.createElement("div");
            rowcell.className = "main-cells";

            rowelement.appendChild(rowcell);
           
        }

        maincon.appendChild(rowelement);
    }
