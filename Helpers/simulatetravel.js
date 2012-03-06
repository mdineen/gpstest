function simulatetravel(lat, lon, hdg, dist)
{
	var lat1 = lat;
	var lon1 = lon;
	var brng = rads(hdg);
	var d = dist;
	var lat2 = Math.asin((Math.sin(lat1)*Math.cos(d/R)) + (Math.cos(lat1)*Math.sin(d/R)*Math.cos(brng)));
	var lon2 = lon1 + Math.atan2(Math.sin(brng)*Math.sin(d/R)*Math.cos(lat1), Math.cos(d/R)-Math.sin(lat1)*Math.sin(lat2));
debugpanel.innerText = lat2 + "\r\n" + lon2 + "\r\n" + brng;
	return new point(lat2,lon2);
}