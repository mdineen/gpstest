function paintlistcode(s) {
    var apts = airportdata.searchcode(s, instance.ctrl.lstairports.size);
    paintlist(apts);
}
function paintlistnearest()
{
    var nrst = {};
    for(var i = 15; i < 1000; i += 15)
    {
        nrst = getnearestlatlon(instance.nav.lat, instance.nav.lon, i);
        if (Object.size(nrst) >= instance.ctrl.lstairports.size)
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
        n.text = apts[i] + " - " + airportdata[apts[i]].Name + " (" + getdistance(instance.nav.lat, instance.nav.lon, airportdata[apts[i]].Lat, airportdata[apts[i]].Lon).toFixed(2) + " NM)";
        n.value = apts[i];
        instance.ctrl.lstairports.options[i] = n;
    }
    if(apts.length > 0)
    { instance.ctrl.lstairports.selectedIndex = 0; }
}