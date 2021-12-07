// Adds the value of 'button' to the password element when the coresponding button is pressed
function addValToPass(button)
{
    var passVal = $("#passcode").val();
    if (button == "bksp")
    {
        $("#passcode").val(passVal.substring(0, passVal.length - 1));
    }
    else
    {
        $("#passcode").val(passVal.concat(button));
    }
}

// Gets the password from local storage if it has been reset, otherwise returns the default password
function getPassword()
{
    if (typeof(Storage) == "undefined")
    {
        alert("Your browser does not support HTML5 localStorage. Try upgrading.");
    }
    else if (localStorage.getItem("boiler") != null)
    {
        return JSON.parse(localStorage.getItem("boiler")).NewPassword;
    }
    else
    {
        return "0000";
    }
}

// Checks for a valid password, then directs user to either the boiler info page or the main menu
$("#btnEnter").click(function()
{
    var password = getPassword();
    if (document.getElementById("passcode").value == password)
    {
        if (localStorage.getItem("boiler") == null)
        {
            $("#btnEnter").attr("href", "#pageBoilerInfo").button();
        }
        else
        {
            $("#btnEnter").attr("href", "#pageMenu").button();
        }
    }
    else
    {
        alert("Incorrect password! Please try again.");
    }
});