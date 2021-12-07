// Displays the boiler info on the boiler data page
function displayBoilerInfo()
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
        $("#boilerSection").empty();
        $("#boilerSection").append(`Boiler Model: ${boiler.BoilerModel}
        <br>Boiler Serial #: ${boiler.BoilerSerial}
        <br>Purchase Date: ${boiler.PurchaseDate}
        <br>Temperature Units: ${boiler.TempUnits}
        <br>Max Temperature Rating: ${boiler.MaxTemp}
        <br>Max Pressure Rating: ${boiler.MaxPressure}
        <br>Password: ${boiler.NewPassword}`);

        $("#boilerSection").append("<br><a href='#pageBoilerInfo' data-mini='true' data-role='button' data-icon='edit' data-iconpos='left' data-inline='true' >Edit Profile</a>");
        $('#boilerSection [data-role = "button"]').button();
    }
}

// Submit data button determines which operation will be performed
$("#btnAddData").click(function()
{
    $("#btnSubmitData").val("Add").button("refresh");
});

// Function which facilitates displaying the new data page - if add, clear form; if edit, populate form with the appropriate data
$("#pageNewData").on("pageshow", function()
{
    var formOperation = $("btnSubmitData").val();
    if (formOperation == "Add")
    {
        clearDataForm();
    }
    else if (formOperation == "Edit")
    {
        showDataForm($("#btnSubmitData").attr("indexToEdit"));
    }
});

// Event triggered when the user htis the submit button after filling out the data form
$("#dataForm").submit(function()
{
    var formOperation = $("#btnSubmitData").val();
    if (formOperation == "Add")
    {
        addData();
        $.mobile.changePage("#pageBoilerData")
    }
    else if (formOperation == "Edit")
    {
        editData($("#btnSubmitData").attr("indexToEdit"));
        $.mobile.changePage("#pageBoilerData");
        $("#btnSubmitData").removeAttr("indexToEdit");
    }
    return false;
});

// Data validation for the data form
function verifyDataForm()
{
    // Finds current date for use in validation
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    var currentDate = year + '/' + (('' + month).length < 2 ? '0' : '') + month + '/' + (('' + day).length < 2 ? '0' : '') + day;

    if (
        ($("#dataDate").val() != "") &&
        ($("#dataDate").val() <= currentDate) &&
        ($("#temp").val() != "") &&
        ($("#pressure").val() != "")
    )
    {
        return true;
    }
    else
    {
        return false;
    }
}

// Creates a new data entry
function addData()
{
    if (verifyDataForm())
    {
        var dataEntry =
        {
            "Date": $('#dataDate').val(),
            "Temp": $('#temp').val(),
            "Pressure": $('#pressure').val()
        };

        try
        {
            var boilerData = JSON.parse(localStorage.getItem("boilerData"));
            if (boilerData == null)
            {
                boilerData = [];
            }
            boilerData.push(dataEntry);
            localStorage.setItem("boilerData", JSON.stringify(boilerData));
            alert("Data saved!");
            clearDataForm();
            listDataEntries();
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
    return true;
}

// Function for comparing dates in the array
function compareDates(a, b)
{
    var x = new Date(a.Date);
    var y = new Date(b.Date);
    if (x > y)
    {
        return 1;
    }
    else
    {
        return -1;
    }
}

// Lists the data entries on the boiler data page
function listDataEntries()
{
    try
    {
        var boilerData = JSON.parse(localStorage.getItem("boilerData"));
    }
    catch(e)
    {
        if (e == QUOTA_EXCEEDED_ERR)
        {
            alert("Error: Local storage limit exceeded");
            console.log(e);
        }
    }

    // Load previous data entries, if they exist
  if (boilerData != null) {
    // Order the entries by date
    boilerData.sort(compareDates);

    // Creating the table
    $("#data").html(
      "<thead>" +
      "   <tr>" +
      "     <th>Date</th>" +
      "     <th>Temperature</th>" +
      "     <th>Pressure</th>" +
      "     <th>Edit / Delete</th>" +
      "   </tr>" +
      "</thead>" +
      "<tbody>" +
      "</tbody>"
    );

    // Loop to insert each data entry in the table
    for (var i = 0; i < boilerData.length; i++) {
      var rec = boilerData[i];
      $("#data tbody").append("<tr>" +
        "  <td>" + rec.Date + "</td>" +
        "  <td>" + rec.Temp + "</td>" +
        "  <td>" + rec.Pressure + "</td>" +
        "  <td><a data-inline='true'  data-mini='true' data-role='button' href='#pageNewData' onclick='callEdit(" +
        i +
        ")' data-icon='edit' data-iconpos='notext'></a>" +
        "  <a data-inline='true'  data-mini='true' data-role='button' href='#' onclick='callDelete(" +
        i +
        ")' data-icon='delete' data-iconpos='notext'></a></td>" +
        "</tr>");
    }

    $('#data [data-role="button"]').button(); // Without this the delete/edit buttons wont appear
  } else {
    boilerData = []; // If there is no data, create an empty array
    $("#data").html("");
  }
  return true;
}

// Function facilitates editing a data entry
function callEdit(index)
{
    $("#btnSubmitData").attr("indexToEdit", index);
    $("#btnSubmitData").val("Edit").button("refresh");
}

// Function updates a data entry
function editData(index)
{
    if (verifyDataForm())
    {
        try
        {
            var boilerData = JSON.parse(localStorage.getItem("boilerData"));
            boilerData[index] =
            {
                "Date": $('#dataDate').val(),
                "Temp": $('#temp').val(),
                "Pressure": $('#pressure').val()
            };
            localStorage.setItem("boilerData", JSON.stringify(boilerData));
            alert("Entry updated!");
            clearDataForm();
            listDataEntries();
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
        alert("Ensure the form is fully and acurately completed")
    }
}

// Clears the data form
function clearDataForm()
{
    $('#dataDate').val("");
    $('#temp').val("");
    $('#pressure').val("");
    return true;
}

// Populates the form with the correct index from the boiler data points
function showDataForm(index)
{
    try
    {
        var boilerData = JSON.parse(localStorage.getItem("boilerData"));
        var entry = boilerData[index];
        $('#dataDate').val(entry.Date);
        $('#temp').val(entry.Temp);
        $('#pressure').val(entry.Pressure);
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

// Facilitates deleting a data entry
function deleteData(index)
{
    try
    {
        var boilerData = JSON.parse(localStorage.getItem("boilerData"));
        boilerData.splice(index, 1);
        if (boilerData.length == 0)
        {
            localStorage.removeItem("boilerData");
        }
        else
        {
        localStorage.setItem("boilerData", JSON.stringify(boilerData));
        }
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

// Deletes a data entry then displays the set of data entries left
function callDelete(index)
{
    deleteData(index);
    listDataEntries();
}

// Removes all data from localStorage 
$("#btnClearData").click(function () {
    localStorage.removeItem("boilerData");
    listDataEntries();
    alert("All data has been deleted!");
  });