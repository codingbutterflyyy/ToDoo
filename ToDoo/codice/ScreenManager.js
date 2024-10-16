const fontfam = "nerko"

class ScreenManager
{
    elements = new Array();
    forms = new Array();
    overlay;

    newElement(loc, element, z)
    {
        element.style.zIndex = z;
        document.getElementById(loc).appendChild(element);
        this.elements.push(element);
    }

    newImage(loc, id, src, z)
    {
        let img = document.createElement("img");
        img.src = src;
        img.id = id;
        this.newElement(loc, img, z)
    }

    newDiv(loc, id, className)
    {
        let div = document.createElement("div");
        div.id = id;
        div.classList.add(className);
        this.newElement(loc, div, 100);
    }

    newOverlayWindow(id, width, height, opacity, z)
    {
        if(this.overlay != id)
        {
            this.overlay = id
            let cover = document.createElement("div")
            cover.style.position = "absolute"
            cover.style.zIndex = z
            cover.style.backgroundColor = "#000000"
            cover.style.opacity = opacity/100
            cover.style.width = "100%"
            cover.style.height = "100%"
            cover.style.display = "flex"
            cover.style.flexDirection = "column"
            cover.style.justifyContent = "center"
            cover.style.alignItems = "center"
            let div = document.createElement("div")
            div.id = id
            div.style.width = width
            div.style.height = height
            div.style.backgroundColor = "white"
            div.style.zIndex = z + 1
            div.style.opacity = 100
            cover.appendChild(div)
            document.body.appendChild(cover)
        }
    }

    newCanvas(loc, id, width, height, z)
    {
        let canvas = document.createElement("canvas");
        canvas.id = id;
        canvas.clientWidth = width;
        canvas.clientHeight = height;
        this.newElement(loc, canvas, z);
    }

    newText(loc, id, txt, fontsize, z)
    {
        let text = document.createElement("p");
        text.id = id;
        text.style.marginTop = 10
        text.style.marginBottom = 10
        text.style.fontSize = fontsize;
        text.style.textAlign = "center"
        let txtElement = document.createTextNode(txt);
        text.appendChild(txtElement);
        this.newElement(loc, text, z);
    }

    newTextInput(loc, id, backTxt, size, z)
    {
        let input = document.createElement("input");
        input.id = id;
        input.type = "text";
        input.placeholder = backTxt;
        input.autocomplete = false;
        input.style.border = "2px solid black"
        input.style.borderRadius = "10px"
        input.style.height = size;
        input.style.fontSize = 0.9 * size;
        input.style.textAlign = "center";
        this.newElement(loc, input, z)
    }

    newLongTextInput(loc, id, backTxts, size, h, maxLength, z)
    {
        let div = document.createElement("div")
        div.style.display = "flex"
        div.style.flexDirection = "column"
        div.style.justifyContent = "center"
        div.style.alignItems = "center"
        div.style.width = 600
        let inspoText = document.createElement("p")
        inspoText.style.fontSize = size
        inspoText.style.marginTop = 10
        inspoText.style.marginBottom = 10
        inspoText.style.textAlign = "center"
        let area = document.createElement("textarea")
        area.id = id
        area.rows = h
        area.autocomplete = false
        area.maxLength = maxLength
        area.style.fontSize = size * 0.8
        area.style.border = "2px solid black"
        area.style.borderRadius = "10px"
        area.style.width = "100%"
        let i;
        setInterval(function()
        {
            i = Math.floor(Math.random()*backTxts.length)
            inspoText.innerText = backTxts[i]
        },2000)
        let lengthInfo = document.createElement("p")
        lengthInfo.innerText = "0/" + maxLength
        lengthInfo.style.fontSize = size
        lengthInfo.style.marginTop = 10
        lengthInfo.style.marginBottom = 10
        area.onchange = function()
        {
            lengthInfo.innerText = area.value.length + "/" + maxLength;
        }
        div.append(inspoText)
        div.append(area)
        div.append(lengthInfo)
        this.newElement(loc,div,z)
    }

    newChoiceInput(loc, id, choices, size, z)
    {
        let choiceHolder = document.createElement("div")
        choiceHolder.id = id
        choiceHolder.style.width = choices.length * 70 + (choices.length - 1) * 45;
        choiceHolder.classList.add("choiceFormHolder")
        choices.forEach(choice => {
            let div = document.createElement("div")
            div.id = "div" + choice;
            div.classList.add("choice")
            div.style.zIndex = z;
            let p = document.createElement("p")
            p.style.fontSize = size;
            let txt = document.createTextNode(choice)
            choiceHolder.appendChild(div)
            div.appendChild(p)
            p.appendChild(txt)
        });
        this.newElement(loc,choiceHolder,3)
    }

    newDateInput(loc,id,fields,size,z)
    {
        let selector = document.createElement("div")
        selector.id = id
        selector.classList.add("dateSelector")
        let data = ["day","month","year","hour","minute"]
        fields.forEach(field =>
        {
            if(data.includes(field))
            {
                data.filter((element) =>
                {
                    return element != field
                })
                let div = document.createElement("div")
                div.classList.add("selector")
                let upArrow = document.createElement("img")
                upArrow.src = "img/main/up_arrow.png"
                upArrow.classList.add("arrow")
                let display = document.createElement("p")
                display.id = field;
                display.classList.add("value")
                display.style.fontSize = size
                display.style.marginTop = 10
                display.style.marginBottom = 10
                let downArrow = document.createElement("img")
                downArrow.src = "img/main/down_arrow.png"
                downArrow.classList.add("arrow")
                if(field == "day")
                {
                    div.id = "selectorDay"
                    upArrow.id = "backDay"
                    downArrow.id = "nextDay"
                    let text = document.createTextNode("1")
                    display.appendChild(text)
                }
                else if(field == "month")
                {
                    div.id = "selectorMonth"
                    upArrow.id = "backMonth"
                    downArrow.id = "nextMonth"
                    let text = document.createTextNode("gennaio")
                    display.appendChild(text)
                }
                else if(field == "year")
                {
                    let year = new Date().getFullYear() - 1
                    div.id = "selectorYear"
                    upArrow.id = "backYear"
                    downArrow.id = "nextYear"
                    let text = document.createTextNode(year)
                    display.appendChild(text)
                }
                else if(field == "hour")
                {
                    let hour = new Date().getHours()
                    div.id = "selectorHour"
                    upArrow.id = "backHour"
                    downArrow.id = "nextHour"
                    let text = document.createTextNode(hour)
                    display.appendChild(text)
                }
                else if(field == "minute")
                {
                    let minute = new Date().getMinutes()
                    div.id = "selectorMinute"
                    upArrow.id = "backMinute"
                    downArrow.id = "nextMinute"
                    let text = document.createTextNode(minute)
                    display.appendChild(text)
                }
                div.appendChild(upArrow)
                div.appendChild(display)
                div.appendChild(downArrow)
                selector.appendChild(div)
            }
        }
        )
        this.newElement(loc,selector,z);
    }

    newImgInput(loc, id, background, color, edit, clear, z)
    {
        // <div class="pfpHolder">
        //     <img id="bg" style="width: 200px; height: 200px; z-index: 3" src="user.png">
        //     <div id="btnHolder" class="btnHolder invisible" style="background-color: blue; z-index: 4;">
        //         <img id="pfpFormEdit" src="edit.png" style="width: 70px; height: 70px;">
        //         <img id="pfpFormReset" src="clear.png" class="invisible" style="width: 70px; height: 70px;">
        //     </div>  
        // </div>
        let div = document.createElement("div")
        div.id = id
        div.classList.add("pfpHolder")
        div.classList.add("imgDisplay")
        let bg = document.createElement("img")
        bg.id = id + "Background"
        bg.src = background
        bg.style.zIndex = z
        bg.classList.add("pfpDisplay")
        let btnHolder = document.createElement("div")
        btnHolder.id = id + "Btn"
        btnHolder.style.width = 200
        btnHolder.style.height = 200
        btnHolder.style.backgroundColor = color
        btnHolder.style.zIndex = z + 1
        btnHolder.classList.add("invisible")
        btnHolder.classList.add("pfpDisplay")
        let editImg = document.createElement("img")
        editImg.id = id + "Edit"
        editImg.src = edit
        editImg.classList.add("stdBtn")
        let clearImg = document.createElement("img")
        clearImg.id = id + "Reset"
        clearImg.src = clear
        clearImg.classList.add("stdBtn")
        clearImg.classList.add("invisible")
        div.appendChild(bg)
        div.appendChild(btnHolder)
        btnHolder.appendChild(editImg)
        btnHolder.appendChild(clearImg)
        bg.onmouseover = function()
        {
            btnHolder.classList.remove("invisible")
            btnHolder.classList.add("btnHolder")
        }
        btnHolder.onmouseleave = function()
        {
            btnHolder.classList.add("invisible")
            btnHolder.classList.remove("btnHolder")
        }
        this.newElement(loc,div,z)
    }

    newImgSubmit(loc, id, img, size, z)
    {
        let mainDiv = document.createElement("div");
        mainDiv.id = id;
        mainDiv.style.backgroundColor = "#1b1b9c";
        mainDiv.style.height = size;
        mainDiv.style.width = size;
        mainDiv.classList.add("imageBtn")
        let image = document.createElement("img");
        image.src = img;
        image.style.height = 0.75 * size;
        mainDiv.appendChild(image)
        this.newElement(loc,mainDiv,z)
    }

    addClass(id, className)
    {
        document.getElementById(id).classList.add(className);
    }
    
    removeClass(id, className)
    {
        document.getElementById(id).classList.remove(className);
    }

    setAttribute(id, name, value)
    {
        document.getElementById(id).setAttribute(name, value);
    }

    deleteElement(id)
    {
        this.elements=this.elements.filter(check);
        document.getElementById(id).remove();

        function check(element)
        {
            return element.id!=id;
        }
    }
}