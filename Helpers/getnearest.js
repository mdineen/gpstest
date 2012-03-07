function getnearest(code, radiusnm)
{
	var a = airportdata[code];
	return getnearestlatlon(a.Lat, a.Lon, radiusnm);
}

function getnearestlatlon(lat, lon, radiusnm)
{
	var degpernmlat = 0.016666;
	var degpernmlon = degreeslongitudepermile(lat);

	if(radiusnm > 999){radiusnm = 999;}

	var withinlat = [];
	for (var l in latcode)
	{
		if(Math.abs(lat - l) < (degpernmlat * (radiusnm * 1.5))) //wider rectangle ensures that when we scribe the circle we get everything within
		{ withinlat.push(latcode[l]); }
		else
		{ if(withinlat.length > 0){break;} }
	}

	var withinrect = [];
	for (var l in loncode)
	{
		if(Math.abs(lon - l) < (degpernmlon * (radiusnm * 1.5))) //wider rectangle
		{ 
			if(withinlat.indexOf(loncode[l]) > -1)
			{ withinrect.push(loncode[l]); }
		}
		else
		{ if(withinrect.length > 0){break;} }
	}

	var nearestunsorted = {};
	var distsorted = [];
	for (var i = 0; i < withinrect.length; ++i)
	{
		var dist = getdistance(lat, lon, airportdata[withinrect[i]].Lat, airportdata[withinrect[i]].Lon).toFixed(1);
		if(dist > 0 && dist < radiusnm)
		{
			var d = ((dist < 10) ? "00" : ((dist < 100) ? "0" : "")) + dist.toString();
			nearestunsorted[d] = withinrect[i];
			distsorted.push(d);
		}
	}

	distsorted.sort();

	var nearest = {};
	for (var i = 0; i < distsorted.length; ++i)
	{
		nearest[distsorted[i]] = nearestunsorted[distsorted[i]];
	}

	return nearest;
}