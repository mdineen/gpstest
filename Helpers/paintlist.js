function paintlistcode(s) {
    var apts = airportdata.searchcode(s, lstairports.size);
    paintlist(apts);
}
function paintlistnearest()
{
    var nrst = {};
    for(var i = 15; i < 1000; i += 15)
    {
        nrst = getnearestlatlon(lat, lon, i);
        if (Object.size(nrst) >= lstairports.size)
        { break; }
    }

    var apts = [];
    for(var n in nrst)
    {
        apts.push(nrst[n]);
    }

    paintlist(apts);
}
function paintlist(apts)
{
    for (var i = 0; i < apts.length; ++i) {
        var n = new Option();
        n.text = apts[i] + " - " + airportdata[apts[i]].Name + " (" + getdistance(lat, lon, airportdata[apts[i]].Lat, airportdata[apts[i]].Lon).toFixed(2) + " NM)";
        n.value = apts[i];
        lstairports.options[i] = n;
    }
    if(apts.length > 0)
    { lstairports.selectedIndex = 0; }
}