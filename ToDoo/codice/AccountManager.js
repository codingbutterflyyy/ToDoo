class AccountManager 
{
    name;
    gender;
    bday = new Array(2);
    pfp = "";
    bio;
    template =
    {
        "name": "name",
        "gender": "gender",
        "bday": {
            "day": 1,
            "month": 1
        },
        "pfp": "pfpUrl",
        "bio": "bio"
    }

    genders = ["M", "F"];

    constructor()
    {
        let account = localStorage.getItem("account");
        if (account != null) {
            account = JSON.parse(account);
            this.name = account.name;
            this.gender = account.gender;
            this.bday = account.bday;
            this.pfp = account.pfp;
            this.bio = account.bio;
        }
    }

    setName(name) 
    {
        this.name = name;
    }

    setGender(gender) 
    {
        if(this.genders.includes(gender.toUpperCase()))
        {
            this.gender = gender;
        }
    }

    setBirthday(d, m) 
    {
        if(!isNaN(day) && !isNaN(month))
        {
            this.bday[0] = d;
            this.bday[1] = m;
        }
    }

    setPfp(url)
    {
        this.pfp = url;
    }

    setBio(data)
    {
        this.bio = data;
    }

    getName() 
    {
        return this.name;
    }

    getGender() 
    {
        return this.gender;
    }

    getBirthday() 
    {
        let bday = new Array(2);
        bday[0] = this.bday.day;
        bday[1] = this.bday.month;
        return bday;
    }

    getPfp()
    {
        return this.pfp;
    }

    getBio()
    {
        return this.bio;
    }

    createAccount()
    {
        if (this.name != null && this.gender != null && this.bday != null && 
            this.pfp != null && this.bio != null) 
        {
            let account = this.template;
            account.name = this.name;
            account.gender = this.gender;
            account.bday.day = this.bday[0];
            account.bday.month = this.bday[1];
            account.pfp = this.pfp;
            account.bio = this.bio;
            localStorage.setItem("account", JSON.stringify(account))
        }
    }

    getAccount() 
    {
        return JSON.parse(localStorage.getItem("account"))
    }

    isNull()
    {
        return localStorage.getItem("account") == null || localStorage.getItem("account") == "{}"
    }

    deleteAccount()
    {
        localStorage.removeItem("account");
    }

    formatStrings(dateFormat)
    {
        let result = []
        result.push(this.getName())
        result.push(this.getGender())
        let bdayString = "";
        console.log(new Date().toDateString())
        return result
    }
}