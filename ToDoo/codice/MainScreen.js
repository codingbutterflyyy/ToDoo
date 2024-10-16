let state = false;
onmessage = function (event) {
    let data = event.data;
    console.log("from icon " + data);
    if (data == "loaded" && ready) {

    }
    else if (data == "account-null") { }
}
postMessage("start")
postMessage("loaded")