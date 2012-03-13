function simulatetravel(lat, lon, hdg, dist)
{
	var lat1 = rad(lat), lon1 = rad(lon), brng = rad(hdg), angularDistance = dist / instance.R;
	var lat2 = Math.asin(Math.sin(lat1) * Math.cos(angularDistance) + Math.cos(lat1) * Math.sin(angularDistance) * Math.cos(brng));
	var lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(angularDistance) * Math.cos(lat1), Math.cos(angularDistance) - Math.sin(lat1) * Math.sin(lat2));
	lon2 = (lon2 + 3 * Math.PI) % (2 * Math.PI) - Math.PI; // Normalise to -180..+180
	
	return new point(deg(lat2),deg(lon2));
}
