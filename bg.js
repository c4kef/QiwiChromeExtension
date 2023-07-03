var token_tail_web_qw;
var oauth_token;

function getCookies(domain, name) {
    chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
        if (name === "token-tail-web-qw")
            token_tail_web_qw = cookie.value;
    });
}

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        sendResponse({status: 'ok'})
        console.log("-> " + request)

        if (request === "requestToken")
            chrome.runtime.sendMessage("requestToken|" + token_tail_web_qw, (response) => {});
        else if (request === "requestTokenHead")
            chrome.runtime.sendMessage("requestTokenHead|" + oauth_token, (response) => {});
        else if (request.split('|')[0] == "requestTokenHead")
            oauth_token = request.split('|')[1]
        else if (request.split('|').length > 1)
            chrome.runtime.sendMessage(request + token_tail_web_qw, (response) => {});
        else
            console.log("Oops :( " + request)
    }
);

getCookies("https://qiwi.com/main", "token-tail-web-qw");  