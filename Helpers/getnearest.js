/*
GetNearest.  The hallmark of any halfass decent Aviation GPS.  The ability to quickly cough up all relavent (sp??) data about a list
 of the closest airports to my current position.  This function is going to save a pilot's life one day.  The little yellow Garmin
 E-Trex I carry as a backup can't handle this.  It's waypoint database is quite limited, so I just have codes to go by.  It does
 GetNearest, but if I'm in a bad situation I may end up at a helipad on top of a building flying a Cherokee 140.  Bad day.  This will
 give me all there is to know about the airports by being near the airports database.
 */
//Why doesn't js do overloads?  This is just an overload.  Airport code because the caller is too lazy to look up the lat/lon himself
helpers.getNearest = function(code, radiusNm)
{
	var a = airportData[code];
	return helpers.getNearestLatLon(a.Lat, a.Lon, radiusNm);
}

//Function basically draws a band around the world over a small swath of latitude and grabs all the airport codes it has for the
// whole band.  (there may be a better way to do this...).  It then scribes a curvy little parallelogram vertically for a
// certain distance longitude-wise to give you a rectangle of earth and adds only those airports from the band around the world
// whose longitude lies within it.  That virturectangle is about 50% wider than it needs to be just to be sure that the next step
// doesn't miss anything.  We then scribe a circle with a radius of [radiusNm] and return an array of the airports within the
// circle in ascending order of distance.
helpers.getNearestLatLon = function(lat, lon, radiusNm)
{
    //There are 0.0166... (1/60) degrees per nautical mile of latitude everywhere on our planet
	var degPerNmLat = 0.016666;
    //See the helper method for an explanation of why this is necessary
	var degPerNmLon = helpers.degreesLongitudePerMile(lat);

    //never search more than 999 nm, that's too much.  A couple of those would be a DOS on your device
	if(radiusNm > 999){radiusNm = 999;}

	var withinLat = [];
	for (var l in latCode)
	{
		if(Math.abs(lat - l) < (degPerNmLat * (radiusNm * 1.5))) //wider rectangle ensures that when we scribe the circle we get everything within
		{ withinLat.push(latCode[l]); } //stick it in the array
		else
		{ if(withinLat.length > 0){break;} } //if you get here and there are airports in the array, you're at the far end of the range so quit
	}

	var withinRect = [];
	for (var l in lonCode)
	{
		if(Math.abs(lon - l) < (degPerNmLon * (radiusNm * 1.5))) //wider rectangle
		{ 
			if(withinLat.indexOf(lonCode[l]) > -1)  //if you find it in the band made above...
			{ withinRect.push(lonCode[l]); }  //stick it in the array
		}
		else
		{ if(withinRect.length > 0){break;} } //if you get here and the rectangle has stuff, you're at the far end of the range so quit
	}

    //This is sort of silly, but this is the fastest way I could think of to get a list with all the deets I need and get it
    // sorted ascending by distance.  Get the distance and put that in an int array and then sort it.  Then put that stuff in
    // an object keyed by the distance.  Brilliant?  Hey man, this is my first js app.  You tell me :)  I'm used to having a
    // very tiny but incredibly underpowered iseries backing my shit.  I digest.  I found that some JS runtimes will
    // automatically sort the object based on the actual value in the key, while others just keep the enumerator in the order
    // the nodes were added.  I hate that.  So, this works for both, and the second step is unnecessary if the particular
    // runtime automatically sorts the list, but it's like ten or 12 things, so no biggie.
	var nearestUnsorted = {};
	var distSorted = [];
	for (var i = 0; i < withinRect.length; ++i)
	{
        //Get the distance of each airport
		var dist = helpers.getDistance(lat, lon, airportData[withinRect[i]].Lat, airportData[withinRect[i]].Lon).toFixed(1);
		if(dist > 0 && dist < radiusNm)
		{
			var d = ((dist < 10) ? "00" : ((dist < 100) ? "0" : "")) + dist.toString();
			nearestUnsorted[d] = withinRect[i];  //gotta put it in an object keyed by the distance
			distSorted.push(d); //also into an array of int
		}
	}

	distSorted.sort();  //gotta sort the array

	var nearest = {};
	for (var i = 0; i < distSorted.length; ++i)
	{
		nearest[distSorted[i]] = nearestUnsorted[distSorted[i]]; //push them into the object in the order you want them out.
	}

    //push that badboy out
	return nearest;
}