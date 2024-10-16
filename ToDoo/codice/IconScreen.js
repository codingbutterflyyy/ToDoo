let screenHandler = new ScreenManager();
let login = new Worker("codice/LoginScreen.js");
let main = new Worker("codice/MainScreen.js");
let iconPath = "img/icon/";
let mainPath = "img/main/"
let accManager = new AccountManager();
let reader = new FileReader();
let pfpUrl = mainPath+"user.png";
let scope = "pfp";
let handler = "login";

reader.onload = function()
{
    pfpUrl = reader.result
    accManager.setPfp(pfpUrl)
    if(scope == "pfp")
    {
        screenHandler.setAttribute("pfpFormBackground","src",pfpUrl)
        screenHandler.removeClass("pfpFormReset","invisible")
        screenHandler.addClass("pfpFormBackground","borderedImg")
    }
    else if(scope == "recapPfp")
    {
        screenHandler.setAttribute("userPfpBackground","src",pfpUrl)
        screenHandler.removeClass("userPfpReset","invisible")
        screenHandler.addClass("userPfpBackground","borderedImg")
    }
}

if(accManager.isNull())
{
    accManager.setPfp(mainPath+"user.png")
    handler = "login"
    login.postMessage("start")
}

login.onmessage = function(event)
{
    localStorage.setItem("account",JSON.stringify({}))
    let data = event.data;
    console.log("from login " + data)
    if(data == "askName")
    {
        screenHandler.newDiv("body","nameHolder","mainHolder");
        screenHandler.addClass("nameHolder","invisible");
        screenHandler.newImage("nameHolder","pfp",mainPath+"user.png",3)
        screenHandler.addClass("pfp","userpfp")
        screenHandler.newText("nameHolder","nameLbl","Come ti chiami?",40,3)
        screenHandler.newDiv("nameHolder","nameForm","simpleFormHolder")
        screenHandler.newTextInput("nameForm","nameInput","il tuo nome...",30,3);
        screenHandler.newImgSubmit("nameForm","nameSubmit",mainPath+"submit.png",40,3)
        screenHandler.addClass("nameSubmit","imageBtn")
        document.getElementById("nameSubmit").onclick = 
        function()
        {
            let name = document.getElementById("nameInput").value;
            if(name.trim() != "")
            {
                login.postMessage(["storeName",name])
            }
        }
        ready = true;
        login.postMessage("nameReady")
    }
    else if(data == "endAnimation")
    {
        screenHandler.deleteElement("backHolder")
        screenHandler.removeClass("nameHolder","invisible")
    }
    else if(data[0] == "name")
    {
        accManager.setName(data[1])
    }
    else if(data == "nameDone")
    {
        screenHandler.deleteElement("nameHolder")
        screenHandler.removeClass("genderHolder","invisible")
        login.postMessage(data)
    }
    else if(data == "askGender")
    {
        screenHandler.newDiv("body","genderHolder","mainHolder");
        screenHandler.addClass("genderHolder","invisible");
        screenHandler.newImage("genderHolder","pfp",mainPath+"user.png",3);
        screenHandler.newText("genderHolder","genderLbl","Come ti identifichi?",40,3)
        screenHandler.newDiv("genderHolder","genderForm","simpleFormHolder")
        screenHandler.newChoiceInput("genderForm","genderInput",accManager.genders,40,3);
        screenHandler.newImgSubmit("genderForm","genderSubmit",mainPath+"submit.png",40,3)
        screenHandler.addClass("genderSubmit","imageBtn")
        let buttons = document.querySelectorAll(".choice")
        let currentSelection = "";
        buttons.forEach(btn => 
        {
            btn.onclick = function()
            {
                let gender = btn.id.substring(3);
                if(currentSelection != "")
                {
                    let prevGender = currentSelection.substring(3)
                    document.getElementById(currentSelection).classList.remove("selected" + prevGender)
                    btn.classList.add("selected" + gender)
                }
                else
                {
                    btn.classList.add("selected" + gender)                    
                }
                currentSelection = btn.id
            }
        }
        )
        document.getElementById("genderSubmit").onclick =
        function()
        {
            if(currentSelection != "")
            {
                let gender = currentSelection.substring(3);
                login.postMessage(["storeGender",gender])
            }
        }
        login.postMessage("genderReady")
    }
    else if(data[0] == "gender")
    {
        accManager.setGender(data[1])
    }
    else if(data == "genderDone")
    {
        screenHandler.deleteElement("genderHolder")
        screenHandler.removeClass("birthdayHolder","invisible")
        login.postMessage(data)
    }
    else if(data == "askBirthday")
    {
        screenHandler.newDiv("body","birthdayHolder","mainHolder")
        screenHandler.addClass("birthdayHolder","invisible")
        screenHandler.newImage("birthdayHolder","pfp",mainPath+"user.png",3);
        screenHandler.newText("birthdayHolder","birthdayLbl","Quand'è il tuo compleanno?",40,3)
        screenHandler.newDiv("birthdayHolder","birthdayForm","simpleFormHolder")
        screenHandler.newDateInput("birthdayForm","birthdayInput",["day","month"],40,3)
        screenHandler.newImgSubmit("birthdayForm","birthdaySubmit",mainPath+"submit.png",40,3)
        screenHandler.addClass("birthdaySubmit","imageBtn")
        let monthDays = [31,29,31,30,31,30,31,31,30,31,30,31]
        let monthNames = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno",
            "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"]      
        let dayDisplay = document.getElementById("day")
        let day = dayDisplay.innerText
        let monthDisplay = document.getElementById("month")
        let month = monthNames.indexOf(monthDisplay.innerText)
        document.getElementById("backDay").onclick = function()
        {
            if(day == 1)
            {
                day = monthDays[month]
            }
            else
            {
                day--;
            }
            dayDisplay.innerText = day
        }
        document.getElementById("nextDay").onclick = function()
        {
            if(day == monthDays[month])
            {
                day = 1
            }
            else
            {
                day++
            }
            dayDisplay.innerText = day
        }
        document.getElementById("backMonth").onclick = function()
        {
            if(month == 0)
            {
                month = 11
            }
            else
            {
                month--
            }
            if(day > monthDays[month])
            {
                day = monthDays[month]
                dayDisplay.innerText = day
            }
            monthDisplay.innerText = monthNames[month]
        }
        document.getElementById("nextMonth").onclick = function()
        {
            if(month == 11)
            {
                month = 0
            }
            else
            {
                month++
            }
            if(day > monthDays[month])
            {
                dayDisplay.classList.add("invalidValue")
                day = monthDays[month]
                dayDisplay.innerText = day
            }
            monthDisplay.innerText = monthNames[month]
        }
        document.getElementById("birthdaySubmit").onclick =
        function()
        {
            login.postMessage(["storeBirthday",day,month+1])
        }
        login.postMessage("birthdayReady")
    }
    else if(data[0] == "birthday")
    {
        accManager.setBirthday(data[1],data[2])
    }
    else if(data == "birthdayDone")
    {
        screenHandler.deleteElement("birthdayHolder")
        screenHandler.removeClass("pfpHolder","invisible")
        login.postMessage(data)
    }
    else if(data == "askPfp")
    {
        scope = "pfp"
        screenHandler.newDiv("body","pfpHolder","mainHolder")
        screenHandler.addClass("pfpHolder","invisible")
        screenHandler.newImgInput("pfpHolder","pfpForm",mainPath+"user.png","#357FC7",
            mainPath+"edit.png",mainPath+"clear.png",3)
        screenHandler.newText("pfpHolder","pfpLbl","Inserisci una foto profilo",40,3)
        screenHandler.newText("pfpHolder","description","meglio se quadrata e più piccola di 200x200",20,3)
        screenHandler.newDiv("pfpHolder","actionForm","simpleFormHolder")
        screenHandler.newImgSubmit("pfpHolder","pfpSubmit",mainPath+"submit.png",90,3)
        document.getElementById("pfpFormEdit").onclick = async function()
        {
            let [img] = await window.showOpenFilePicker(
                {
                    "types": 
                    [
                        {
                            "accept": 
                            {
                                "image/*": [".png",".gif",".jpeg",".jpg",".jfif"]
                            }
                        }
                    ]
                }
            )
            let fileData = await img.getFile()
            reader.readAsDataURL(fileData)
        }
        document.getElementById("pfpFormReset").onclick = function()
        {
            pfpUrl = mainPath + "user.png"
            accManager.setPfp(pfpUrl)
            screenHandler.setAttribute("pfpFormBackground","src",pfpUrl)
            screenHandler.removeClass("pfpFormBackground","borderedImg")
            screenHandler.addClass("pfpFormReset","invisible")
        }
        document.getElementById("pfpSubmit").onclick = function()
        {
            login.postMessage(["storePfp",pfpUrl])
        }
        login.postMessage("pfpReady")
    }
    else if(data[0] == "pfp")
    {
        accManager.setPfp(data[1])
    }
    else if(data == "pfpDone")
    {
        screenHandler.deleteElement("pfpHolder")
        screenHandler.removeClass("bioHolder","invisible")
        screenHandler.setAttribute("userPfp","src",accManager.getPfp())
        login.postMessage(data)
    }
    else if(data == "askBio")
    {
        screenHandler.newDiv("body","bioHolder","mainHolder")
        screenHandler.addClass("bioHolder","invisible")
        screenHandler.newImage("bioHolder","userPfp",accManager.getPfp( ),3)
        screenHandler.addClass("userPfp","pfpDisplay")
        screenHandler.newText("bioHolder","bioLbl","Dicci qualcosa di più...",40,3)
        screenHandler.newDiv("bioHolder","bio","simpleFormHolder")
        screenHandler.newLongTextInput("bio","bioInput",
            ["Quanti anni hai?","Qual è il tuo colore preferito?","Quand'è il tuo compleanno?","Che tipo di musica ascolti?",
                "Qual è il tuo hobby?","Di dove sei?","Che lavoro fai?","Cosa studi?","Qual è la tua canzone preferita?",
                "Qual è il tuo film preferito?","Qual è la tua serie TV preferita?"],30,7,300,3)
        screenHandler.newImgSubmit("bio","bioSubmit",mainPath+"submit.png",60,3)
        document.getElementById("bioSubmit").onclick = function()
        {
            let bio = document.getElementById("bioInput").value
            login.postMessage(["storeBio",bio])
            accManager.createAccount()
        }
        login.postMessage("bioReady")
    }
    else if(data[0] == "bio")
    {
        accManager.setBio(data[1])
    }
    else if(data == "bioDone")
    {
        screenHandler.deleteElement("bioHolder")
        screenHandler.removeClass("recapHolder","invisible")
        login.postMessage(data)
    }
    else if(data == "askRecap")
    {
        let arr = ["name","gender","birthday","pfp","bio"]
        screenHandler.newDiv("body","recapHolder","mainHolder")
        screenHandler.addClass("recapHolder","invisible")
        screenHandler.newImgInput("recapHolder","userPfp",accManager.getPfp(),
            "#357FC7",mainPath+"edit.png",mainPath+"clear.png",200,3)
        screenHandler.newDiv("recapHolder","recapOptions","recapOptions")
        // <div id="name">
        //     <!-- nome -->
        //     <div class="innerBlue"></div>
        //     <!-- editor nome -->
        //     <div class="innerGreen"></div>
        // </div>
        // <div id="gender">
        //     <div class="innerBlue"></div>
        //     <div class="innerGreen"></div>
        // </div>
        // <div id="bday">
        //     <div class="innerBlue"></div>
        //     <div class="innerGreen"></div>
        // </div>
        // <div id="pfp">
        //     <div class="innerBlue"></div>
        //     <div class="innerGreen"></div>
        // </div>
        // <div id="bio">
        //     <div class="innerBlue"></div>
        //     <div class="innerGreen"></div>
        // </div>
        accManager.formatStrings()
        console.log(accManager.getPfp())
        if(accManager.getPfp() != mainPath + "user.png")
        {
            console.log("diocan")
            document.getElementById("userPfpReset").classList.remove("invisible")
        }
        document.getElementById("userPfpEdit").onclick = async function()
        {
            scope = "recapPfp"
            let [img] = await window.showOpenFilePicker(
                {
                    "types": 
                    [
                        {
                            "accept": 
                            {
                                "image/*": [".png",".gif",".jpeg",".jpg",".jfif"]
                            }
                        }
                    ]
                }
            )
            let fileData = await img.getFile()
            reader.readAsDataURL(fileData)
        }
        document.getElementById("userPfpReset").onclick = function()
        {
            pfpUrl = mainPath + "user.png"
            screenHandler.setAttribute("pfpFormBackground","src",pfpUrl)
            screenHandler.removeClass("pfpFormBackground","borderedImg")
            screenHandler.addClass("pfpFormReset","invisible")
        }
    }
}

screenHandler.newDiv("body","backHolder","backHolder");
// screenHandler.newImage("backHolder","innerCircle",iconPath+"back.png",1);
// screenHandler.addClass("innerCircle","innerCircle");
// screenHandler.addClass("innerCircle","innerCircleAnimated1");

// setTimeout(function()
// {
//     screenHandler.newImage("backHolder","backCover",iconPath+"backcover.png",2);
//     screenHandler.addClass("backCover","backCover");
// },1000)

// screenHandler.newImage("backHolder","outerCircle",iconPath+"fore.png",3);
// screenHandler.addClass("outerCircle","outerCircle");
// screenHandler.addClass("outerCircle", "outerCircleAnimated1");

// setTimeout(function()
// {
//     screenHandler.newImage("backHolder","taskList",iconPath+"icon.png",1);
//     screenHandler.addClass("taskList","taskList");
//     screenHandler.addClass("taskList","taskListAnimated1");
//     setTimeout(function()
//     {
//         screenHandler.newImage("backHolder","checkmark",iconPath+"checkmark.png",3);
//         screenHandler.addClass("checkmark","checkmark");
//         screenHandler.addClass("checkmark","checkmarkAnimated1")
//         screenHandler.newImage("backHolder","pencil",iconPath+"pencil.png",4);
//         screenHandler.addClass("pencil","pencil");
//         screenHandler.addClass("pencil","pencilAnimated1");
//         setTimeout(function()
//         {
//             screenHandler.addClass("pencil","pencilAnimated2");
//             setTimeout(function()
//             {
//                 screenHandler.deleteElement("pencil");
//                 screenHandler.newImage("backHolder","redFlag",iconPath+"redflag.png",3);
//                 screenHandler.addClass("redFlag","redFlag");
//                 screenHandler.addClass("redFlag","redFlagAnimated1");
//                 setTimeout(function()
//                 {
//                     screenHandler.newImage("backHolder","exclamationMark",iconPath+"mark.png",3);
//                     screenHandler.addClass("exclamationMark","exclamationMark");
//                     screenHandler.addClass("exclamationMark","exclamationMarkAnimated1");
//                     setTimeout(function()
//                     {
//                         screenHandler.addClass("checkmark","checkmarkAnimated2");
//                         setTimeout(function()
//                         {
//                             screenHandler.deleteElement("checkmark");
//                             screenHandler.addClass("redFlag","redFlagAnimated2");
//                             setTimeout(function()
//                             {
//                                 screenHandler.deleteElement("redFlag");
//                                 screenHandler.addClass("exclamationMark","exclamationMarkAnimated2");
//                                 setTimeout(function()
//                                 {
//                                     screenHandler.deleteElement("exclamationMark");
//                                     screenHandler.addClass("taskList","taskListAnimated2");
//                                     setTimeout(function()
//                                     {
//                                         screenHandler.deleteElement("taskList");
//                                         screenHandler.addClass("innerCircle","innerCircleAnimated2");
//                                         setTimeout(function()
//                                         {
//                                             screenHandler.deleteElement("innerCircle");
//                                             screenHandler.addClass("outerCircle","outerCircleAnimated2");
//                                             setTimeout(function()
//                                             {
//                                             },2000)
//                                         },1500)
//                                     },1500)
//                                 },1000)
//                             },1000)
//                         },1000)
//                     },1200)
//                 },1000)
//             },500)
//         },1000)
//     },2000);
// },1000)
if(handler == "login")
{
    login.postMessage("animationDone");
}
else
{
    main.postMessage("animationDone");
}