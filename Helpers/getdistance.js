/*
Distance.  Sounds easy.  How many miles, feet, rods, furlongs, parsecs, whathaveyou between two points.  Here's the catch...
  Distance between two points on the Earth has a bend to it.  You are calculating the arc segment length on the surface of a sphere
  This function is taken from commonly available, public domain spherical geometry references all over the internet.  Euclid was a
  smart dude.
 */
	helpers.getDistance = function(lat1, lon1, lat2, lon2)
	{
		var dLat = helpers.rad(lat2 - lat1);
		var dLon = helpers.rad(lon2 - lon1);
		var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(helpers.rad(lat1)) *
				Math.cos(helpers.rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
		var c = 2 * Math.asin(Math.sqrt(a));
		//ooh ooh, Q: ...what's R? -- A: R is the instance constant that defines your distance units on the surface by defining the
		// radius of the Earth in whatever units.  
        var d = instance.R * c;
		return d * 0.868976242 ;
	}
