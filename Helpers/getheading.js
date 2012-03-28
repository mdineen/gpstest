/*
Why would you need a function like this???  Doesn't the HTML5 GeoCaching API provide coords.heading for you?  It's even in degrees
 magnetic.  It's awesome.  Well, it turns out that Ripple, wicked as it is, did not predict that the BB6/BB7 browsers don't provide
 that info.  All nulls.  So, this guy gets the bearing from one point to the next which if you run it over the last GPS report and
 the current one gives you a heading.  Not stabilized though and if you caught a sheer cross wind you might get some funky results
 for a few seconds.  So then I went to implement a "getBearing()" function, and realized, it's already here :)  Sweet.

 Like the getDistance() function, I borrow this math from an ancient chap named Euclid.  Public domain smarts below.
 */
	helpers.getHeading = function(lat1, lon1, lat2, lon2, v)
	{
		var dLon = helpers.rad(lon2-lon1);
		var llat1 = helpers.rad(lat1);
		var llat2 = helpers.rad(lat2);
		var y = Math.sin(dLon) * Math.cos(llat2);
		var x = Math.cos(llat1) * Math.sin(llat2) - Math.sin(llat1) * Math.cos(llat2) * Math.cos(dLon)
		return (helpers.deg(Math.atan2(y,x)) + 360) % 360;
	}
