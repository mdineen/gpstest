	function GetHeading(lat1, lon1, lat2, lon2, v)
	{
		var dLon = rad(lon2-lon1);
		var llat1 = rad(lat1);
		var llat2 = rad(lat2);
		var y = Math.sin(dLon) * Math.cos(llat2);
		var x = Math.cos(llat1) * Math.sin(llat2) - Math.sin(llat1) * Math.cos(llat2) * Math.cos(dLon)
		return (deg(Math.atan2(y,x)) + 360) % 360;
	}
