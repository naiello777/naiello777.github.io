// Submits the boiler info form
$("#boilerForm").submit(function()
{
    saveBoilerForm();
    return true;
});

// Data validation for the boiler info form
function verifyBoilerForm()
{
    // Finds current date for use in validation
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    var currentDate = year + '/' + (('' + month).length < 2 ? '0' : '') + month + '/' + (('' + day).length < 2 ? '0' : '') + day;

    if (
        ($("#boilerModel").val() != "") &&
        ($("#boilerSerial").val() != "") &&
        ($("#purchaseDate").val() != "") &&
        ($("#purchaseDate").val() <= currentDate) &&
        ($("#tempUnits option:selected").val() != "Select Temperature Units") &&
        ($("#maxTemp").val() != "") &&
        ($("#maxPressure").val() != "")
    )
    {
        return true;
    }
    else
    {
        return false;
    }
}

// Saves the data from the boiler info form as an object called "boiler" in localStorage
function saveBoilerForm()
{
    if (verifyBoilerForm())
    {
        var boiler =
        {
            "BoilerModel": $("#boilerModel").val(),
            "BoilerSerial": $("#boilerSerial").val(),
            "PurchaseDate": $("#purchaseDate").val(),
            "TempUnits": $("#tempUnits option:selected").val(),
            "MaxTemp": $("#maxTemp").val(),
            "MaxPressure": $("#maxPressure").val(),
            "NewPassword": $("#changePassword").val(),
        };
        
        try
        {
            localStorage.setItem("boiler", JSON.stringify(boiler));
            alert("Information Saved");
            $.mobile.changePage("#pageMenu");
            window.location.reload();
        }
        catch(e)
        {
            if (e == QUOTA_EXCEEDED_ERR)
            {
                alert("Error: Local storage limit exceeded");
                console.log(e);
            }
        }
    }
    else
    {
        alert("Ensure the form is fully and acurately completed");
    }
}

// Load boiler info into the form when the user navigates to the "boiler info" page
function loadBoilerForm()
{
    try
    {
        var boiler = JSON.parse(localStorage.getItem("boiler"));
    }
    catch(e)
    {
        if (e == QUOTA_EXCEEDED_ERR)
        {
            alert("Error: Local storage limit exceeded");
            console.log(e);
        }
    }

    if (boiler != null)
    {
        $("#boilerModel").val(boiler.BoilerModel);
        $("#boilerSerial").val(boiler.BoilerSerial);
        $("#purchaseDate").val(boiler.PurchaseDate);
        $('#tempUnits option[value = ' + boiler.TempUnits +']').attr('selected', 'selected');
        $("#tempUnits option:selected").val(boiler.TempUnits);
        $('#tempUnits').selectmenu('refresh', true);
        $("#maxTemp").val(boiler.MaxTemp);
        $("#maxPressure").val(boiler.MaxPressure);
        $("#changePassword").val(boiler.NewPassword);
    }
}