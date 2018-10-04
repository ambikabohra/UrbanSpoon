var expression=/\s+/g;

$(init);

function init()
{
    cloneDragMe();

    $(".dragMe").draggable();
    $("#target").droppable();

    $("#target").bind("drop",    highlightTarget);
    $("#target").bind("dropout", resetTarget);
}

function cloneDragMe()
{
    cuisines = ["Chinese", "Indian", "American"];
    for (i = 1; i <= 2; i++){
        zValue = 101 + i;
        xPos = 20*i;
        yPos = 100 + 20*i + "px";
        $("div:first").clone()
            .insertAfter("div:first")
            .css("left", xPos)
            .css("top", yPos)
            .css("zIndex", zValue)
            .text(cuisines[i-1])
            .append("<img height="+"100 "+" src="+"/static/images/cuisine"+i+".jpg" +" width="+"100"+" />");

    }
    $("div:first").append("<img height="+"100 "+" src="+"/static/images/cuisine"+i+".jpg" +" width="+"100"+" />");
}

function highlightTarget(event, ui)
{
    $("#target").addClass("ui-state-highlight")
        .html("Favourite dropped ")
        .append(ui.draggable.text());
}

function resetTarget(event, ui)
{
    $("#target").removeClass("ui-state-highlight")
        .html("Drop on me");
}

function validateUser() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    emailRE = /^.+@.+\..{2,4}$/;
    if (username!="" && !username.match(emailRE)){
        window.alert("Invalid email address. " + "Should be xxxxx@xxxxx.xxx\n");
        return false;
    } 


    if (expression.test(password) || expression.test(username)) {
        alert("Whitespaces are not allowed!");
    }

    if (username == "uiland@gmail.com" && password == "uiland") {
        alert("Login successful");
        window.location = "restaurants";
        return false;
    }

    if (username == "") {
        window.alert("Please enter your email id");
        username.focus();
        return false;
    }

    if (password == "") {
        window.alert("Please enter your password");
        password.focus();
        return false;
    }

    else {
        window.alert("Wrong Credentials");
    }
    return false;
}