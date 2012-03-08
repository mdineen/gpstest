	//controls
	var lbldest, lblhdg, lblbrg, lblspd, lbldist, lblete, txt1, debugpanel, gotodialog, txtgoto, lstairportslstairports, btnnrst, btnStop;

	//constant
	const R = 3960; //radius of the earth in nm

	//members
	var lat, lon, dest = "---", destlat, destlon, enroute = false;

	function success(position) {
		var alt = position.coords.altitude;
		lat = position.coords.latitude;
		lon = position.coords.longitude;
		var v = Math.round(getdeclination(lat, lon));

		var h = Math.round(position.coords.heading) + v;
		if(!isNaN(h))
		{ lblhdg.innerHTML = ((h < 10) ? "00" : ((h < 100) ? "0" : "")) + h.toString() + "&deg;"; }
		var s = Math.round(position.coords.speed * 1.94384449); // m/s to kt
		if(!isNaN(s))
		{ lblspd.innerHTML = s + " kt"; }

		if(enroute)
		{
			lbldest.innerHTML = dest.toUpperCase();
			var b = Math.round(GetHeading(lat, lon, destlat, destlon, v));
			if(!isNaN(b))
			{ lblbrg.innerHTML = ((b < 10) ? "00" : ((b < 100) ? "0" : "")) + b.toString() + "&deg;"; }
			var d = Math.round(getdistance(lat, lon, destlat, destlon))
			if(!isNaN(d))
			{ lbldist.innerHTML = d + " nm"; }
			var ete = new Date();
			ete.setTime(d/s*3600000);
			var eh = ete.getUTCHours();
			var em = ete.getUTCMinutes();
			var es = ete.getUTCSeconds();
			if(!isNaN(eh)&&!isNaN(em)&&!isNaN(es))
			{ lblete.innerHTML = (eh < 10 ? "0" : "") + eh + ":" + (em < 10 ? "0" : "") + em + ":" + (es < 10 ? "0" : "") + es; }
		}
        else
        {
            lbldest.innerHTML = "---";
            lblbrg.innerHTML = "---&deg;";
            lbldist.innerHTML = "0 nm";
            lblete.innerHTML = "00:00:00"
        }
	}

	function onReady() {
		//register for gps
		navigator.geolocation.watchPosition(success, null, {frequency: 500});
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
		gotodialog = document.getElementById("gotodialog");
		txtgoto = document.getElementById("txtgoto");
        lstairports = document.getElementById("lstairports");
        btnnrst = document.getElementById("btnnrst");
        btnStop = document.getElementById("btnStop");
		window.addEventListener("deviceready", onReady);
		initialize();
	});

	function initialize() {
		gotodialog.style.width = window.innerWidth *.85;
		gotodialog.style.height = window.innerHeight *.85;
		gotodialog.style.top = window.innerHeight *.07;
		gotodialog.style.left = window.innerWidth *.07;
		gotodialog.style.visibility = "hidden";


	}

	function btn1_click()
	{
        var position = {};
        position.coords = {};
        position.coords.altitude = 300;
        position.coords.latitude = 43.458028;
        position.coords.longitude = -80.384145;
        position.coords.heading = 320;
        position.coords.speed = 54;
        success(position);
    }

    function btnGoTo_click()
	{
        paintlistcode("");
        gotodialog.style.visibility = "visible";
		txtgoto.value = "";
        txtgoto.disabled = false;
		txtgoto.focus();
	}

    function btnNrst_click()
    {
        paintlistnearest();
        gotodialog.style.visibility = "visible";
        txtgoto.value = "";
        txtgoto.disabled = true;
    }

    function btnStop_click()
    {
        dest = "---";
        destlat = null;
        destlon = null;
        enroute = false;
    }

	function btnnavigate_click()
	{
        var d = lstairports.options[lstairports.options.selectedIndex].value;
		if(airportdata[d] != undefined)
		{
			dest = d; 
			destlat = airportdata[d].Lat;
			destlon = airportdata[d].Lon;
			enroute = true;
		}
		gotodialog.style.visibility = "hidden";
	}

	function btngotocancel_click()
	{
		gotodialog.style.visibility = "hidden";
	}

    function txtgoto_keyup()
    {
        paintlistcode(txtgoto.value.toUpperCase());
    }