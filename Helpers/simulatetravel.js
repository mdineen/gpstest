/*
It's worth noting that this was the only file that had comments in it that weren't qualifying one little statment.
 Not bad, 1 out of like 20.  So, Dan said he would consider adding this feature to Ripple.  I might do that in a little
 bit myself actually, and the ability to replay a GPX file.  Until then, this little method will allow us to make believe.
 This guy is invoked by the "FIRE" button and simulates travel at the settings found in the sim box for 5 minutes.  This
 also works a treat on the actual devices.
 */
//simulates travel for 5 minutes at the values specified in the sim box
function simulatetravel(lat, lon, hdg, dist)
{
	var lat1 = rad(lat), lon1 = rad(lon), brng = rad(hdg), angularDistance = dist / instance.R;
	var lat2 = Math.asin(Math.sin(lat1) * Math.cos(angularDistance) + Math.cos(lat1) * Math.sin(angularDistance) * Math.cos(brng));
	var lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(angularDistance) * Math.cos(lat1), Math.cos(angularDistance) - Math.sin(lat1) * Math.sin(lat2));
	lon2 = (lon2 + 3 * Math.PI) % (2 * Math.PI) - Math.PI; // Normalise to -180..+180
	
	return new point(deg(lat2),deg(lon2));
}
