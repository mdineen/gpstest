	//controls
	var lbldest, lblhdg, lblbrg, lblspd, lbldist, lblete, txt1, debugpanel;

	//constant
	const R = 3960; //radius of the earth in nm

	//members
	var dest, destlat, destlon;

	function success(position) {
		var alt = position.coords.altitude;
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;
		var v = Math.round(getdeclination(lat, lon))*-1;

		var h = Math.round(position.coords.heading) + v;
		lblhdg.innerHTML = ((h < 10) ? "00" : ((h < 100) ? "0" : "")) + h.toString() + "&deg;";
		var b = Math.round(GetHeading(lat, lon, destlat, destlon, v));
		lblbrg.innerHTML = ((b < 10) ? "00" : ((b < 100) ? "0" : "")) + b.toString() + "&deg;";
		var s = Math.round(position.coords.speed * 1.94384449); // m/s to kt
		lblspd.innerHTML = s + " kt";
		var d = Math.round(getdistance(lat, lon, destlat, destlon))
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
	}

