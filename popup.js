var token_tail_web_qw = "";
var oauth_token = ""

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        sendResponse({status: 'ok'})
        
        if (request.split('|')[0] === "requestToken")
            token_tail_web_qw = request.split('|')[1]
        else if (request.split('|')[0] === "requestTokenHead")
            oauth_token = request.split('|')[1]

        console.log("o: " + oauth_token + " qw: " + token_tail_web_qw)
        if (oauth_token !== "" && token_tail_web_qw !== "" && oauth_token !== "undefined" && token_tail_web_qw !== "undefined")
            document.getElementById("token").textContent = oauth_token + token_tail_web_qw
        else
            document.getElementById("token").textContent = "Не найден :(, попробуй перезагрузить страницу"
    }
);

chrome.runtime.sendMessage("requestToken", (response) => {});
chrome.runtime.sendMessage("requestTokenHead", (response) => {});