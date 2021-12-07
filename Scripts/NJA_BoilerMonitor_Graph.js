function drawGraph()
{
    if (localStorage.getItem("boilerData") === null)
    {
        alert("no data exists!");
        $(location).attr("href", "#pageMenu");
    }
    else
    {
        setupCanvas();
        var tempArray = new Array();
        var dateArray = new Array();
        var pressureArray = new Array();
        getHistory(tempArray, dateArray, pressureArray);

        drawLines(tempArray, dateArray, pressureArray)
        labelAxes();
    }
}

function setupCanvas()
{
    var gCanvas = document.getElementById("GraphCanvas");
    var ctx = gCanvas.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 500, 500);
}

function getHistory(tempArray, dateArray, pressureArray) {
  var boilerData = JSON.parse(localStorage.getItem(
    "boilerData"));

  boilerData.sort(compareDates);

  for (var i = 0; i < boilerData.length; i++) {
    var date = new Date(boilerData[i].Date);

    /*These methods start at 0, must increment
     * by one to compensate
     */
    var month = date.getMonth() + 1;
    var day = date.getDate() + 1;

    //The x-axis label
    dateArray[i] = (month + "/" + day);

    //The points to plot
    tempArray[i] = parseFloat(boilerData[i].Temp);
    pressureArray[i] = parseFloat(boilerData[i].Pressure);
  }
}

function drawLines(tempArray, dateArray, pressureArray) {
  var line = new RGraph.Line("GraphCanvas",
      tempArray, pressureArray)
    .Set("labels", dateArray)
    .Set("colors", ["blue", "green"])
    .Set("shadow", true)
    .Set("shadow.offsetx", 1)
    .Set("shadow.offsety", 1)
    .Set("linewidth", 1)
    .Set("numxticks", 6)
    .Set("scale.decimals", 2)
    .Set("xaxispos", "bottom")
    .Set("gutter.left", 55)
    .Set("tickmarks", "filledcircle")
    .Set("ticksize", 5)
    .Set("chart.title", "Temperature and Pressure vs. Date")
    .Draw();
}

function labelAxes() {
  var c = document.getElementById("GraphCanvas");
  var ctx = c.getContext("2d");
  ctx.font = "14px Georgia";
  ctx.fillStyle = "black";
  ctx.fillText("Date(MM/DD)", 380, 470);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = "center";
  ctx.fillText("Temp (blue) / Pressure (green)", -250, 10);
}