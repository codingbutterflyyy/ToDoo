let loaded = false;
let count = 0;
onmessage = function(event)
{
    let data = event.data;
    console.log("from main to login " + data);
    if(data == "start")
    {
        this.postMessage("askName");
    }
    else if(data == "nameReady" || data == "animationDone")
    {
        count++
        if(count == 2)
        {
            this.postMessage("endAnimation")
            this.postMessage("askGender")
        }
    }
    else if(data[0] == "storeName")
    {
        this.postMessage(["name",data[1]])
        this.postMessage("nameDone")
    }
    else if(data == "genderReady" || data == "nameDone")
    {
        count++
        if(count == 4)
        {
            this.postMessage("askBirthday")
        }
    }
    else if(data[0] == "storeGender")
    {
        this.postMessage(["gender",data[1]])
        this.postMessage("genderDone")
    }
    else if(data == "birthdayReady" || data == "genderDone")
    {
        count++
        if(count == 6)
        {
            this.postMessage("askPfp")
        }
    }
    else if(data[0] == "storeBirthday")
    {
        this.postMessage(["birthday",data[1],data[2]])
        this.postMessage("birthdayDone")
    }
    else if(data == "pfpReady" || data == "birthdayDone")
    {
        count++
        if(count == 8)
        {
            this.postMessage("askBio")
        }
    }
    else if(data[0] == "storePfp")
    {
        this.postMessage(["pfp",data[1]])
        this.postMessage("pfpDone")
    }
    else if(data == "bioReady" || data == "pfpDone")
    {
        count++
        if(count == 10)
        {
            this.postMessage("askRecap")
        }
    }
    else if(data[0] == "storeBio")
    {
        this.postMessage(["bio",data[1]])
        this.postMessage("bioDone")
    }
}