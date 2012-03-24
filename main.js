	function onSuccess(position) {
        instance.nav.lastalt = instance.nav.alt != null ? instance.nav.alt : (position.coords.altitude * 3.2808).toFixed(0);
        instance.nav.alt = (position.coords.altitude * 3.2808).toFixed(0);
        instance.nav.lasttimestamp = instance.nav.timestamp != null ? instance.nav.timestamp : new Date().setUTCMilliseconds(position.timestamp);
        instance.nav.timestamp = new Date().setUTCMilliseconds(position.timestamp);
        var ft = instance.nav.alt - instance.nav.lastalt;
        var min = (instance.nav.timestamp/60000) - (instance.nav.lasttimestamp/60000);
        instance.nav.vs = parseFloat(ft / (min == 0 ? 1 : min)).toFixed(0);
        instance.nav.lat = position.coords.latitude;
        instance.nav.lon = position.coords.longitude;
        instance.nav.v = Math.round(getdeclination(instance.nav.lat, instance.nav.lon));
		instance.nav.hdg = Math.round(position.coords.heading) + instance.nav.v;
        instance.nav.spd = Math.round(position.coords.speed * 1.94384449); // m/s to kt


		if(!isNaN(instance.nav.hdg))
		{ instance.ctrl.lblhdg.innerHTML = ((instance.nav.hdg < 10) ? "00" : ((instance.nav.hdg < 100) ? "0" : "")) + instance.nav.hdg.toString() + "&deg;"; }
		if(!isNaN(instance.nav.spd))
		{ instance.ctrl.lblspd.innerHTML = instance.nav.spd + " kt"; }
        if(!isNaN(instance.nav.alt))
        { instance.ctrl.lblalt.innerHTML = instance.nav.alt + " ft"; }
        if(!isNaN(instance.nav.vs))
        { instance.ctrl.lblvsi.innerHTML = instance.nav.vs + " ft/min" }

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
			ete.setTime(d/instance.nav.spd*3600000);

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
            instance.ctrl.lblete.innerHTML = "00:00:00";

            instance.nav.dest = "---";

        }
	}

    function accelerometerSuccess(g)
    {
        instance.nav.acc = parseFloat(g.y).toFixed(2); //((g.x > g.y && g.x > g.z) ? g.x : (g.y > g.x && g.y > g.z) ? g.y : g.z).toFixed(2);  //trying to work with this mess, not sure how the devices perform.  Looking for the axis with the force being applied to it...
        instance.ctrl.lblacc.innerHTML = instance.nav.acc + " g";
    }

	function onReady() {
        //register for accelerometer
        navigator.accelerometer.watchAcceleration(accelerometerSuccess,null,{frequency: 500});

		//register for gps
        navigator.geolocation.watchPosition(function(){ /* do nothing */ });
        onSuccessTimerLoop();
    }

    function onSuccessTimerLoop()
    {
        navigator.geolocation.getCurrentPosition(onSuccess, onError, {'enableHighAccuracy':true,'timeout':1000,'maximumAge':1000});
        var t=setTimeout('onSuccessTimerLoop()', 1000);
    }

    function onError(error)
    {
        var element = document.getElementById('geolocation');
        element.style.color = "Red";
    }

	//register for ready
	window.addEventListener("load", function () {
		window.addEventListener("deviceready", onReady);
		initialize();
	});

    var instance = null;
    function initialize() {
        instance = new main();
        instance.ctrl = new instance.ctrl();
        instance.nav = new instance.nav();

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
        position.timestamp = new Date().getUTCMilliseconds();
        onSuccess(position);

        var acceleration = {};
        acceleration.y = instance.ctrl.txtacc.value;
        accelerometerSuccess(acceleration);
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