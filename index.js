

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
            rowcell.contentEditable = "true";
            rowcell.id = String.fromCharCode(64+i)+k;
            rowcell.addEventListener("focus",onfocusactive);

            rowelement.appendChild(rowcell);
           
        }

        maincon.appendChild(rowelement);
    }



    // for adding functionlity to google sheets
    const activeCellElement = document.getElementById("active-cell");
    const frm = document.getElementById("b-main");
    let activecellid = "";

    frm.addEventListener("change", optionchange);

    const defaultText = {
            Fontfamily : "open Sans",
            FontSize :  "14px",
            Bold :   false,
            Itellic : false,
            Underline : false,
            Align : "left",
            TextColor : "#000000",
            BgColor : "#ffffff"
    }



    
    function optionchange(){
        const options = {
            Fontfamily : frm["font-family"].value,
            FontSize : frm["font-size"].value,
            Bold : frm["isBold"].checked,
            Itellic : frm["isItellic"].checked,
            Underline : frm["isUnderline"].checked,
            Align : frm["align"].value,
            TextColor : frm["text-color"],
            BgColor : frm["bg-color"]
            


        }
        // console.log(options);
        
        applyChange(options);
        
    }
    
    let state = {};
    function applyChange(options){

        // console.log(options);
        

        if(activeCellElement.innerText === "null"){
            alert("Please Select a Cell");
            return;

        }
        //   console.log(activeCellElement);
          const activeC  = document.getElementById(activecellid);
        //   console.log(activeC);
          
            
        activeC.style.fontWeight = options.Bold ? "800" : "400";
        activeC.style.fontStyle = options.Itellic ? "italic" : "normal";
        activeC.style.textDecoration = options.Underline ? "underline" : "none";
        activeC.style.textAlign = options.Align;
        activeC.style.color = options.TextColor.value;
        activeC.style.backgroundColor = options.BgColor.value;
        activeC.style.fontFamily = options.Fontfamily;
        activeC.style.fontSize = options.FontSize;

        state[activecellid] = options;

    }

    function onfocusactive(event){
      
        activeCellElement.innerText = event.target.id;
          activecellid = event.target.id;

          if(state[activecellid]){
             resetForm(state[activecellid]);

          }else{
            resetForm(defaultText);
          }
        //   copyid(activecellid);
    }

    function resetForm(style){
        frm["font-size"].value = style.FontSize;
        frm["isBold"].checked = style.Bold;
        frm["isItellic"].checked = style.Itellic;
        frm["isUnderline"].checked = style.Underline;
        frm["align"].value = style.Align;
        frm["text-color"].value = style.TextColor;
        frm["bg-color"].value = style.BgColor;
        frm["font-family"].value = style.Fontfamily;

    }

    const dwnload = document.getElementById("download-icon");

    dwnload.addEventListener("click", exportData);

    function exportData(){
        const jsonData = JSON.stringify(state);
        const blob = new Blob([jsonData],{type: "text/plain"});

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "data.json";
        link.href = url;
        link.click();

        
    }

//This code copy text on cilpboard all time

    let cpyText = "";
    let cutid = "";
    let t = false;

      maincon.addEventListener("input",(e)=>{
        let val = e.target.innerText;

        if(val !== ""){
            cpyText =  navigator.clipboard.writeText(val)
            t = true;
            
        }
      
        cpyText = val;

        cutid = e.target.id;
    });

    //This code sends cell id 

    let cid = "";
    maincon.addEventListener("click",(e)=>{
        // console.log(cpyText);
        cid = e.target.id;  
        
    });



    function copyCell(){
        if(t === true){
            alert("Text Copied!")

        }else{
            alert("Cell is Empty!")

        }
        

    }

    //This code for paste copied element
    const pbtn = document.getElementById("paste");
    pbtn.addEventListener("click",()=>{
         let newcell = document.getElementById(`${cid}`);
        newcell.innerHTML = cpyText;

    })


    //This code for cut text 
    const  kut = document.getElementById("cutc");

    kut.addEventListener("click",()=>{
        // console.log(cutid);

         let cutcell = document.getElementById(`${cutid}`);
        cutcell.innerHTML = "";
    })

    
    // let oldid = "";

    // function copyid(id){
    //     oldid = id;
        
    // }

  
    
    // let copied = "";
    
    // function copyCell(oldid)
    // {
      
        
    //     const cdiv = document.getElementById(oldid);
    //     console.log(cdiv);

    //     copied = cdiv.innerText;
      
       
    // }

    // function pasteCell(id){
    //     const cdiv = document.getElementById(id); 
    //     console.log(cdiv);
    // }

    

    
    
