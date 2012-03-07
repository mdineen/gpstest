	function getdistance(lat1, lon1, lat2, lon2)
	{
		var dLat = rad(lat2 - lat1);
		var dLon = rad(lon2 - lon1);
		var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) *
				Math.cos(rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
		var c = 2 * Math.asin(Math.sqrt(a));
		var d = R * c;
		return d * 0.868976242 ;
	}
