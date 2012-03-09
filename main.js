	function success(position) {
		alt = (position.coords.altitude * 3.2808).toFixed(0);
		lat = position.coords.latitude;
		lon = position.coords.longitude;
		v = Math.round(getdeclination(lat, lon));

		var h = Math.round(position.coords.heading) + v;
		if(!isNaN(h))
		{ lblhdg.innerHTML = ((h < 10) ? "00" : ((h < 100) ? "0" : "")) + h.toString() + "&deg;"; }
		var s = Math.round(position.coords.speed * 1.94384449); // m/s to kt
		if(!isNaN(s))
		{ lblspd.innerHTML = s + " kt"; }
        if(!isNaN(alt))
        { lblalt.innerHTML = alt + " ft"; }

		if(enroute)
		{
			lbldest.innerHTML = dest.toUpperCase() + " - " + airportdata[dest.toUpperCase()].Name;
			var b = Math.round(GetHeading(lat, lon, destlat, destlon, v));
			if(!isNaN(b))
			{ lblbrg.innerHTML = ((b < 10) ? "00" : ((b < 100) ? "0" : "")) + b.toString() + "&deg;"; }
			var d = getdistance(lat, lon, destlat, destlon);
			if(!isNaN(d))
			{ lbldist.innerHTML = d.toFixed(1) + " nm"; }
			var ete = new Date();
			ete.setTime(d/s*3600000);
			var eh = ete.getUTCHours();
			var em = ete.getUTCMinutes();
			var es = ete.getUTCSeconds();
			if(!isNaN(eh)&&!isNaN(em)&&!isNaN(es))
			{ lblete.innerHTML = (eh < 10 ? "0" : "") + eh + ":" + (em < 10 ? "0" : "") + em + ":" + (es < 10 ? "0" : "") + es; }
            var xtd = getcrosstrack();
            if(!isNaN(xtd))
            { lblxtk.innerHTML = xtd.toFixed(1) + " nm"; }
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
		navigator.geolocation.watchPosition(success, null, {frequency: 500, enableHighAccuracy: true});
	}

    //controls
    var lbldest, lblhdg, lblbrg, lblspd, lbldist, lblete, debugpanel, gotodialog, txtgoto,
        lstairports, lblalt, lblxtk, txtalt, txthdg, txtspd;

    //constant
    const R = 3960; //radius of the earth in nm

    //members
    var lat, lon, v, dest = "---", destlat, destlon, enroute = false, originlat, originlon, alt;

	//register for ready
	window.addEventListener("load", function () {
		lbldest = document.getElementById("lbldest");
		lblhdg = document.getElementById("lblhdg");
		lblbrg = document.getElementById("lblbrg");
		lblspd = document.getElementById("lblspd");
		lbldist = document.getElementById("lbldist");
        lblete = document.getElementById("lblete");
        lblalt = document.getElementById("lblalt");
		debugpanel = document.getElementById("debugpanel");
		gotodialog = document.getElementById("gotodialog");
		txtgoto = document.getElementById("txtgoto");
        lstairports = document.getElementById("lstairports");
        lblxtk = document.getElementById("lblxtk");
        txtalt = document.getElementById("txtalt");
        txthdg = document.getElementById("txthdg");
        txtspd = document.getElementById("txtspd");
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

	function btnfire_click()
	{
        if(isNaN(lat) || isNaN(lon))
        {
            lat = airportdata.CYKF.Lat;
            lon = airportdata.CYKF.Lon;
            v = airportdata.CYKF.Decl;
        }

        var position = {};
        position.coords = {};
        position.coords.altitude = txtalt.value / 3.2808;
        var newpoint = simulatetravel(lat, lon, txthdg.value - v, 5/60*txtspd.value);
        position.coords.latitude = newpoint.Lat;
        position.coords.longitude = newpoint.Lon;
        position.coords.heading = txthdg.value - v;
        position.coords.speed = txtspd.value / 1.94384449;
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
            originlat = lat;
            originlon = lon;
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