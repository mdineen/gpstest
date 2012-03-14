	function success(position) {
        instance.nav.alt = (position.coords.altitude * 3.2808).toFixed(0);
        instance.nav.lat = position.coords.latitude;
        instance.nav.lon = position.coords.longitude;
        instance.nav.v = Math.round(getdeclination(instance.nav.lat, instance.nav.lon));

		var h = Math.round(position.coords.heading) + instance.nav.v;
		if(!isNaN(h))
		{ instance.ctrl.lblhdg.innerHTML = ((h < 10) ? "00" : ((h < 100) ? "0" : "")) + h.toString() + "&deg;"; }
		var s = Math.round(position.coords.speed * 1.94384449); // m/s to kt
		if(!isNaN(s))
		{ instance.ctrl.lblspd.innerHTML = s + " kt"; }
        if(!isNaN(instance.nav.alt))
        { instance.ctrl.lblalt.innerHTML = instance.nav.alt + " ft"; }

		if(instance.nav.enroute)
		{
            instance.ctrl.lbldest.innerHTML = instance.nav.dest.toUpperCase() + " - " + airportdata[instance.nav.dest.toUpperCase()].Name;
			var b = Math.round(GetHeading(instance.nav.lat, instance.nav.lon, instance.nav.destlat, instance.nav.destlon, instance.nav.v));
			if(!isNaN(b))
			{ instance.ctrl.lblbrg.innerHTML = ((b < 10) ? "00" : ((b < 100) ? "0" : "")) + b.toString() + "&deg;"; }
			var d = getdistance(instance.nav.lat, instance.nav.lon, instance.nav.destlat, instance.nav.destlon);
			if(!isNaN(d))
			{ instance.ctrl.lbldist.innerHTML = d.toFixed(1) + " nm"; }
			var ete = new Date();
			ete.setTime(d/s*3600000);
			var eh = ete.getUTCHours();
			var em = ete.getUTCMinutes();
			var es = ete.getUTCSeconds();
			if(!isNaN(eh)&&!isNaN(em)&&!isNaN(es))
			{ instance.ctrl.lblete.innerHTML = (eh < 10 ? "0" : "") + eh + ":" + (em < 10 ? "0" : "") + em + ":" + (es < 10 ? "0" : "") + es; }
            var xtd = getcrosstrack();
            if(!isNaN(xtd))
            { instance.ctrl.lblxtk.innerHTML = xtd.toFixed(1) + " nm"; }
		}
        else
        {
            instance.ctrl.lbldest.innerHTML = "---";
            instance.ctrl.lblbrg.innerHTML = "---&deg;";
            instance.ctrl.lbldist.innerHTML = "0 nm";
            instance.ctrl.lblete.innerHTML = "00:00:00"
        }
	}

	function onReady() {
		//register for gps
		navigator.geolocation.watchPosition(success, null, {frequency: 500, enableHighAccuracy: true});
	}

	//register for ready
	window.addEventListener("load", function () {
		window.addEventListener("deviceready", onReady);
		initialize();
	});

    var instance
    function initialize() {
        instance = new main(null, null);
        instance.ctrl = new instance.ctrl(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
        instance.nav = new instance.nav(null,null,null,null,null,null,null,null,null,null);

        instance.ctrl.lbldest = document.getElementById("lbldest");
        instance.ctrl.lblhdg = document.getElementById("lblhdg");
        instance.ctrl.lblbrg = document.getElementById("lblbrg");
        instance.ctrl.lblspd = document.getElementById("lblspd");
        instance.ctrl.lbldist = document.getElementById("lbldist");
        instance.ctrl.lblete = document.getElementById("lblete");
        instance.ctrl.lblalt = document.getElementById("lblalt");
        instance.ctrl.debugpanel = document.getElementById("debugpanel");
        instance.ctrl.gotodialog = document.getElementById("gotodialog");
        instance.ctrl.txtgoto = document.getElementById("txtgoto");
        instance.ctrl.lstairports = document.getElementById("lstairports");
        instance.ctrl.lblxtk = document.getElementById("lblxtk");
        instance.ctrl.txtalt = document.getElementById("txtalt");
        instance.ctrl.txthdg = document.getElementById("txthdg");
        instance.ctrl.txtspd = document.getElementById("txtspd");

        instance.nav.dest = "---";
        instance.nav.enroute = false;

        instance.R = 3960; //radius of the earth in nm
        instance.ctrl.gotodialog.style.width = window.innerWidth *.85;
        instance.ctrl.gotodialog.style.height = window.innerHeight *.85;
        instance.ctrl.gotodialog.style.top = window.innerHeight *.07;
        instance.ctrl.gotodialog.style.left = window.innerWidth *.07;
        instance.ctrl.gotodialog.style.visibility = "hidden";

	}

	function btnfire_click()
	{
        if(instance.nav.lat == null || isNaN(instance.nav.lat) || instance.nav.lon == null || isNaN(instance.nav.lon))
        {
            instance.nav.lat = airportdata.CYKF.Lat;
            instance.nav.lon = airportdata.CYKF.Lon;
            instance.nav.v = airportdata.CYKF.Decl;
        }

        var position = {};
        position.coords = {};
        position.coords.altitude = instance.ctrl.txtalt.value / 3.2808;
        var newpoint = simulatetravel(instance.nav.lat, instance.nav.lon, instance.ctrl.txthdg.value, 5/60*instance.ctrl.txtspd.value);
        position.coords.latitude = newpoint.Lat;
        position.coords.longitude = newpoint.Lon;
        position.coords.heading = instance.ctrl.txthdg.value - instance.nav.v;
        position.coords.speed = instance.ctrl.txtspd.value / 1.94384449;
        success(position);
    }

    function btnGoTo_click()
	{
        paintlistcode("");
        instance.ctrl.gotodialog.style.visibility = "visible";
        instance.ctrl.txtgoto.value = "";
        instance.ctrl.txtgoto.disabled = false;
        instance.ctrl.txtgoto.focus();
	}

    function btnNrst_click()
    {
        paintlistnearest();
        instance.ctrl.gotodialog.style.visibility = "visible";
        instance.ctrl.txtgoto.value = "";
        instance.ctrl.txtgoto.disabled = true;
    }

    function btnStop_click()
    {
        instance.nav.dest = "---";
        instance.nav.destlat = null;
        instance.nav.destlon = null;
        instance.nav.enroute = false;
    }

	function btnnavigate_click()
	{
        var d = instance.ctrl.lstairports.options[instance.ctrl.lstairports.options.selectedIndex].value;
		if(airportdata[d] != undefined)
		{
            instance.nav.dest = d;
            instance.nav.destlat = airportdata[d].Lat;
            instance.nav.destlon = airportdata[d].Lon;
            instance.nav.enroute = true;
            instance.nav.originlat = instance.nav.lat;
            instance.nav.originlon = instance.nav.lon;
		}
        instance.ctrl.gotodialog.style.visibility = "hidden";
	}

	function btngotocancel_click()
	{
        instance.ctrl.gotodialog.style.visibility = "hidden";
	}

    function txtgoto_keyup()
    {
        paintlistcode(instance.ctrl.txtgoto.value.toUpperCase());
    }