// Main logic. Either displays there is no records or displays the correct condition
function recommendPage()
{
  if (localStorage.getItem("boilerData") === null)
  {
    alert("No data exist!");
    $(location).attr("href", "#pageMenu");
  }
  else
  {
    var boiler = JSON.parse(localStorage.getItem("boiler"));
    var maxTemp = boiler.MaxTemp;
    var maxPressure = boiler.MaxPressure;
    var boilerData = JSON.parse(localStorage.getItem("boilerData"));
    boilerData.sort(compareDates);
    var i = boilerData.length - 1;
    var temp = boilerData[i].Temp;
    var pressure = boilerData[i].Pressure;
    var rCanvas = document.getElementById("RecommendCanvas");
    var ctx = rCanvas.getContext("2d");
    ctx.fillStyle = "#c0c0c0";
    ctx.fillRect(0, 0, 550, 550);
    ctx.font = "15px Arial";
    ctx.fillStyle = "black";
    if ((temp > maxTemp) && (pressure > maxPressure))
    {
      drawDoubleOverCanvas(ctx, maxTemp, temp, maxPressure);
    }
    else if (temp > maxTemp)
    {
      drawTempCanvas(ctx, maxTemp, temp);
    }
    else if (pressure > maxPressure)
    {
      drawPressureCanvas(ctx, maxPressure, pressure);
    }
    else
    {
      ctx.fillText("Based on the most recent data points, the boiler is operating correctly.", 25, 320);
      ctx.fillText("Continue to take data and operate as normal. Recheck in 48 hours", 25, 350);
    }      
  }
}

/* Double overlimit functions */
// Main double overlimt recommendation function
function drawDoubleOverCanvas(ctx, maxTemp, temp, maxPressure)
{
  ctx.font = "22px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(`The temperature limit for the boiler is ${maxTemp} degrees.`, 25, 320);
  ctx.fillText(`The pressure limit for the boiler is ${maxPressure} psi.`, 25, 350);
  doubleWrite(ctx);
  tempMeter(ctx, temp, maxTemp);
}

// Function displays the recommendation text for double overlimit
function doubleWrite(ctx)
{
  ctx.fillStyle = "red";
  ctx.font = "16px Arial";
  ctx.fillText("The temperature and pressure of the boiler have exceeded their limits!", 25, 380);
  ctx.font = "22px Arial";
  ctx.fillText("Situation critical! Contact maintenance immediately!", 25, 410);
}

/* Temp functions */
// Main temp recommendation function
function drawTempCanvas(ctx, maxTemp, temp)
{
  ctx.font = "22px Arial";
  ctx.fillStyle = "red";
  ctx.fillText(`The current boiler temperature is ${temp} degrees!`, 25, 320);
  ctx.fillStyle = "black";
  ctx.fillText(`The temperature limit for the boiler is ${maxTemp} degrees.`, 25, 350);
  tempWrite(ctx);
  tempMeter(ctx, temp, maxTemp);
}

// Function displays the recommendation text for over temp
function tempWrite(ctx)
{
  ctx.font = "11px Arial";
  ctx.fillText("The temperature of the boiler is too high! Check the temp setting on the boiler and adjust as necessary.", 25, 380);
  ctx.fillText("Monitor for the next day. If temp does not come down, contact maintenance.", 25, 410);
}

// Creates the temp meter
function tempMeter(ctx, temp, maxTemp)
{
  var tg = new RGraph.CornerGauge("RecommendCanvas", 0, maxTemp*1.5, temp)
    .Set("chart.colors.ranges", [[maxTemp, maxTemp*1.5, "red"], [maxTemp*.5, maxTemp, "yellow"], [0, maxTemp*.5, "#0f0"]]);
  drawTempMeter(tg);
}

// Meter properties of the temp meter
function drawTempMeter(tg)
{
  tg.Set("chart.value.text.units.post", "degrees")
    .Set("chart.value.text.boxed", false)
    .Set("chart.value.text.size", 14)
    .Set("chart.value.text.font", "Verdana")
    .Set("chart.value.text.bold", true)
    .Set("chart.value.text.decimals", 2)
    .Set("chart.shadow.offsetx", 5)
    .Set("chart.shadow.offsety", 5)
    .Set("chart.scale.decimals", 2)
    .Set("chart.title", "Temperature")
    .Set("chart.radius", 250)
    .Set("chart.centerx", 50)
    .Set("chart.centery", 250)
    .Draw();
}

/* Pressure functions */
// Main pressure recommendation function
function drawPressureCanvas(ctx, maxPressure, pressure)
{
  ctx.font = "22px Arial";
  ctx.fillStyle = "red";
  ctx.fillText(`The current boiler pressure is ${pressure} psi!`, 25, 320);
  ctx.fillStyle = "black";
  ctx.fillText(`The pressure limit for the boiler is ${maxPressure} degrees.`, 25, 350);
  pressureWrite(ctx);
  pressureMeter(ctx, pressure, maxPressure);
}

// Function displays the recommendation text for over pressure
function pressureWrite(ctx)
{
  ctx.font = "11px Arial";
  ctx.fillText("The pressure of the boiler has exceeded the limt!", 25, 380);
  ctx.fillStyle = "red";
  ctx.fillText("Relief valves may be broken or improperly set. Contact maintenance immediately!", 25, 410);
}

// Creates the pressure meter
function pressureMeter(ctx, pressure, maxPressure)
{
  var pg = new RGraph.CornerGauge("RecommendCanvas", 0, maxPressure*1.5, pressure)
    .Set("chart.colors.ranges", [[maxPressure, maxPressure*1.5, "red"], [maxPressure*.5, maxPressure, "yellow"], [0, maxPressure*.5, "#0f0"]]);
  drawPressureMeter(pg);
}

// Meter properties of the pressure meter
function drawPressureMeter(pg)
{
  pg.Set("chart.value.text.units.post", "psi")
    .Set("chart.value.text.boxed", false)
    .Set("chart.value.text.size", 14)
    .Set("chart.value.text.font", "Verdana")
    .Set("chart.value.text.bold", true)
    .Set("chart.value.text.decimals", 2)
    .Set("chart.shadow.offsetx", 5)
    .Set("chart.shadow.offsety", 5)
    .Set("chart.scale.decimals", 2)
    .Set("chart.title", "Pressure")
    .Set("chart.radius", 250)
    .Set("chart.centerx", 50)
    .Set("chart.centery", 250)
    .Draw();
}