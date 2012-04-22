/*
These are UI helpers for the two methods to list airports in the v1 app.  For those of you that haven't seen that
  bit yet, they are:
    - GOTO (brings up the dialog with the search box enabled and focused so you can start to enter an airport code)
    - NRST (brings up the dialog with the search box disabled and the list populated with the nearest airports)
 */

//This guy gets called on the onKeyUp event of the search text box.  He finds airports that you could possibly mean
// and puts just enough in your results box so you don't have to scroll
helpers.paintListCode = function(s) {
    var apts = airportData.searchcode(s, instance.ctrl.lstAirports.size);
    helpers.paintList(apts);
}
//This fella lists the nearest airports.  He goes 15x15.  Maybe that's what I should do for the variance method...
helpers.paintListNearest = function()
{
    var nrst = {};
    //To avoid immediate calls to the nearest method with a 1000-mile radius, we start at 15nm and go out by 15nm per loop until
    // we fill that airports list.  Woohoo!
    for(var i = 15; i < 1000; i += 15)
    {
        nrst = helpers.getNearestLatLon(instance.nav.lat, instance.nav.lon, i);
        //this is a call to my potentially evil extension method on the mighty Object.  Looking for commentary from
        // Mike L on this one...
        if (Object.size(nrst) >= instance.ctrl.lstAirports.size)
        { break; } //stop trying after you have at least a whole page fold in the results
    }

    //This is weird.  Why do I do this?  I'll tell you why.  I want an array, not an object.  Wrote the methods in the
    // wrong order and just went with it
    var apts = [];
    for(var n in nrst)
    {
        apts.push(nrst[n]);
    }

    helpers.paintList(apts);
}
helpers.paintList = function(apts)
{
    // loop through the arg, which is an array of airport codes sent to us in the order we are to paint them.
    for (var i = 0; i < apts.length; ++i) {
        var n = new Option();
        //What do we really want to know here?  I wanna know what the code is, what the name how far it is.  
        // Other than the bearing in degrees, which wouldn't really be all
        // that useful in a pinch (unless you're facing weather... hmm, think about that some more) that's all I care
        // about.  If I'm up north and I'm running low on gas maybe the ETE at current speed.
        n.text = apts[i] + " - " + airportData[apts[i]].Name + " (" + helpers.getDistance(instance.nav.lat, instance.nav.lon,
            airportData[apts[i]].Lat, airportData[apts[i]].Lon).toFixed(2) + " NM)";
        n.value = apts[i];
        instance.ctrl.lstAirports.options[i] = n;
    }
    //If there's something to select, select it man!!
    if(apts.length > 0)
    { instance.ctrl.lstAirports.selectedIndex = 0; }
}