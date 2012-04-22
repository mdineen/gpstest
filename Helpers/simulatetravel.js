/*
This little method will allow us to make believe that we are flying.
 This guy is invoked by the "FIRE" button and simulates travel at the settings found in the sim box for 5 minutes.  This
 also works a treat on the actual devices.
 */
//simulates travel for 5 minutes at the values specified in the sim box
helpers.simulateTravel = function(lat, lon, hdg, dist)
{
	var lat1 = helpers.rad(lat), lon1 = helpers.rad(lon), brng = helpers.rad(hdg), angularDistance = dist / instance.R;
	var lat2 = Math.asin(Math.sin(lat1) * Math.cos(angularDistance) + Math.cos(lat1) * Math.sin(angularDistance) * Math.cos(brng));
	var lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(angularDistance) * Math.cos(lat1), Math.cos(angularDistance) - Math.sin(lat1) * Math.sin(lat2));
	lon2 = (lon2 + 3 * Math.PI) % (2 * Math.PI) - Math.PI; // Normalise to -180..+180
	
	return new point(helpers.deg(lat2),helpers.deg(lon2));
}
