	//controls
	var lbldest, lblhdg, lblbrg, lblspd, lbldist, lblete, txt1, debugpanel;

	//constant
	const R = 3960; //radius of the earth in nm

	//members
	var dest = "cnp4";
	var destlat = 44.157671;
	var destlon = -81.062622;

	function success(position) {
		var alt = position.coords.altitude;
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;
		var v = Math.round(GetDeclination(lat, lon))*-1;

		var h = Math.round(position.coords.heading) + v;
		lblhdg.innerHTML = ((h < 10) ? "00" : ((h < 100) ? "0" : "")) + h.toString() + "&deg;";
		var b = Math.round(GetHeading(lat, lon, destlat, destlon, v));
		lblbrg.innerHTML = ((b < 10) ? "00" : ((b < 100) ? "0" : "")) + b.toString() + "&deg;";
		var s = Math.round(position.coords.speed * 1.94384449); // m/s to kt
		lblspd.innerHTML = s + " kt";
		var d = Math.round(GetDistance(lat, lon, destlat, destlon))
		lbldist.innerHTML = d + " nm";
		var ete = new Date();
		ete.setTime(d/s*3600000);
		var eh = ete.getUTCHours();
		var em = ete.getUTCMinutes();
		var es = ete.getUTCSeconds();
		lblete.innerText = (eh < 10 ? "0" : "") + eh + ":" + (em < 10 ? "0" : "") + em + ":" + (es < 10 ? "0" : "") + es;
	}



	function onReady() {
		//register for gps
		navigator.geolocation.watchPosition(success, null, {frequency: 500});

		lbldest.innerText = dest.toUpperCase();
	}

	//register for ready
	window.addEventListener("load", function () {
		lbldest = document.getElementById("lbldest");
		lblhdg = document.getElementById("lblhdg");
		lblbrg = document.getElementById("lblbrg");
		lblspd = document.getElementById("lblspd");
		lbldist = document.getElementById("lbldist");
		lblete = document.getElementById("lblete");
		txt1 = document.getElementById("txt1");
		debugpanel = document.getElementById("debugpanel");
		window.addEventListener("deviceready", onReady);
	});

	function btn1_click()
	{
		var nll = simulatetravel(airportdata["CYKF"].Lat,airportdata["CYKF"].Lon, 320, 11)
debugpanel.innerText = nll.Lat + ',' + nll.Lon;
		/*
		var nearest = getnearest("CYKF",15);
		//alert(nearest.length);
		for (var n in nearest)
		{ debugpanel.innerText += nearest[n] + ": " + n + "\r\n"; }
		*/
	}

	//utility
	function GetDeclination(lat, lon){ return 0; } //fix this later
	function GetHeading(lat1, lon1, lat2, lon2, v)
	{
		var dLon = rads(lon2-lon1);
		var llat1 = rads(lat1);
		var llat2 = rads(lat2);
		var y = Math.sin(dLon) * Math.cos(llat2);
		var x = Math.cos(llat1) * Math.sin(llat2) - Math.sin(llat1) * Math.cos(llat2) * Math.cos(dLon)
		return (deg(Math.atan2(y,x)) + 360) % 360;
	}
	function GetDistance(lat1, lon1, lat2, lon2)
	{
		var dLat = rads(lat2 - lat1);
		var dLon = rads(lon2 - lon1);
		var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rads(lat1)) *
				Math.cos(rads(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
		var c = 2 * Math.asin(Math.sqrt(a));
		var d = R * c;
		return d * 0.868976242 ;
	}

	function deg(num){ return num*180/Math.PI; }
	function rads(num){ return num*Math.PI/180; }

	//data serialization
	var lat = {};
	var lon = {};

	//initialize


