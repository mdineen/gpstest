/*
Main.js.  This all used to be in the index.html file (along with all the stuff in the helpers folder...).  We've come
 a long way, baby.  Main.js contains my onSuccess method, which is the callback where the magic happens.  What's a GPS
 other than a simple computer game that plays itself.  It's a flight simulator that is responding to actual radio data.
 This is what makes that happen.  Every time it fires, we redraw the nav screen.  We recalculate the distances between us
 and our destination, us and our trackline, we contemplate headings, VNAV profiles, blah blah blah.

 This also contains my registration code that sets up and then listens for the geocaching api, the accelerometer stuff,
 and finally I set up my instance and register for all my events.  Good fun.  Enjoy your read.
 */

/*
    I add this comment as this will be the first touch from VS11.  Hope it's awesome.
*/

    //The magic method.  This guy fires every time the GPS gives us new data.  We update the current and last values in
    // the instance instance (get it?), and paint our nav UI.
    function onSuccess(position) {
        //clear weak signal dialog
        if (instance.ctrl.weakSignalDialog.style.visibility == "visible")
        { hideDialog(instance.ctrl.weakSignalDialog); }
        //Update the instance
        instance.nav.lastalt = instance.nav.alt != null ? instance.nav.alt : (position.coords.altitude * 3.2808).toFixed(0); //3.2808 is meters to feet
        instance.nav.alt = (position.coords.altitude * 3.2808).toFixed(0);
        instance.nav.lastTimestamp = instance.nav.timestamp != null ? instance.nav.timestamp : new Date(position.timestamp);
        instance.nav.timestamp = new Date(position.timestamp);
        instance.nav.lat = position.coords.latitude;
        instance.nav.lon = position.coords.longitude;
        instance.nav.v = Math.round(helpers.getDeclination(instance.nav.lat, instance.nav.lon));
		instance.nav.hdg = Math.round(position.coords.heading) + instance.nav.v;
        instance.nav.spd = Math.round(position.coords.speed * 1.94384449); // m/s to kt factor.

        //Vertical Speed - This was a little trying until I remembered that we're basically talking the DST triangle.  I wans S, and I
        // need D and T.  S is in ft/min.  So, put ft over min
        var ft = instance.nav.alt - instance.nav.lastalt; //how many feet of altitude did I climb/descent since last time I got data?
        var min = (instance.nav.timestamp.getTime() / 60000) - (instance.nav.lastTimestamp.getTime() / 60000); //how long since I last got data?
        instance.nav.vs = parseFloat(ft / (min == 0 ? 1 : min)).toFixed(0); //ft over min

	    //blarg!!  My BB handhelds don't give heading (hehe) or speed.  Gotta figure it out by using this and last position
		if(!isNaN(instance.nav.hdg))
		{ instance.ctrl.lblHdg.innerHTML = ((instance.nav.hdg < 10) ? "00" : ((instance.nav.hdg < 100) ? "0" : "")) + instance.nav.hdg.toString() + "&deg;"; }
        if(!isNaN(instance.nav.spd))
		{ instance.ctrl.lblSpd.innerHTML = instance.nav.spd + " kt"; }
        //Pilots will just refer to the steam gauge if this is blank, don't hold up the show
        if(!isNaN(instance.nav.alt))
        { instance.ctrl.lblAlt.innerHTML = instance.nav.alt + " ft"; }
        //Same as above.
        if(!isNaN(instance.nav.vs))
        { instance.ctrl.lblVsi.innerHTML = instance.nav.vs + " ft/min" }
        //show local and UTC times
        if(instance.nav.timestamp != null)
        {
            // This pile of ternary statements is my terse-as-I-can-manage equivalent of ("HH:mm:ss"), if you get me.
            var hh = instance.nav.timestamp.getHours();
            var mm = instance.nav.timestamp.getMinutes();
            var ss = instance.nav.timestamp.getSeconds();
            instance.ctrl.lblLclTime.innerHTML = ((hh < 10) ? "0" : "") + hh.toString() +  ":" + ((mm < 10) ? "0" : "") + mm.toString() + ":" + ((ss < 10) ? "0" : "") + ss.toString();
            var uh = instance.nav.timestamp.getUTCHours();
            var um = instance.nav.timestamp.getUTCMinutes();
            var us = instance.nav.timestamp.getUTCSeconds();
            instance.ctrl.lblUtcTime.innerHTML = ((uh < 10) ? "0" : "") + uh.toString() +  ":" + ((um < 10) ? "0" : "") + um.toString() + ":" + ((us < 10) ? "0" : "") + us.toString();
        }

        //if enroute is set, it means we're on a nav leg.  Do the deed with that data too
		if(instance.nav.enroute)
		{
            //Destination airport code and name, nice and prominent
            instance.ctrl.lblDest.innerHTML = instance.nav.dest.toUpperCase() + " - " + airportData[instance.nav.dest.toUpperCase()].Name;
            //Show the bearing to the destination, if you can get one - don't forget about v - magnetic variance (google "true virgins make dull companions")
			var b = Math.round(helpers.getHeading(instance.nav.lat, instance.nav.lon, instance.nav.destLat, instance.nav.destLon, instance.nav.v));
			if(!isNaN(b))
			{ instance.ctrl.lblBrg.innerHTML = ((b < 10) ? "00" : ((b < 100) ? "0" : "")) + b.toString() + "&deg;"; }
            //how far to go?
			var d = helpers.getDistance(instance.nav.lat, instance.nav.lon, instance.nav.destLat, instance.nav.destLon);
			if(!isNaN(d))
			{ instance.ctrl.lblDist.innerHTML = d.toFixed(1) + " nm"; }
            //how long will it take??
			var ete = new Date();
			ete.setTime(d/instance.nav.spd*3600000);//that's milliseconds per hour.  Milliseconds since base date, baby
            //how many hours, minutes and seconds is that??
			var eh = ete.getUTCHours();
			var em = ete.getUTCMinutes();
			var es = ete.getUTCSeconds();
			if(!isNaN(eh)&&!isNaN(em)&&!isNaN(es))
			{ instance.ctrl.lblEte.innerHTML = (eh < 10 ? "0" : "") + eh + ":" + (em < 10 ? "0" : "") + em + ":" + (es < 10 ? "0" : "") + es; }
            //Show how far we need to go to get back on the track line.  This will even work if you are flying totally
            // the wrong way.  Pretty cool!
            var xtd = helpers.getCrossTrack();
            if(!isNaN(xtd))
            { instance.ctrl.lblXtk.innerHTML = xtd.toFixed(1) + " nm"; }
		}
        else
        {
            //We're just flying around aimlessly.  No course laid in captain.  Clear out the UI elements associated
            // with going someplace.
            instance.ctrl.lblDest.innerHTML = "---";
            instance.ctrl.lblBrg.innerHTML = "---&deg;";
            instance.ctrl.lblDist.innerHTML = "0 nm";
            instance.ctrl.lblEte.innerHTML = "00:00:00";

            instance.nav.dest = "---";

        }

	    //are we logging?  
		if (instance.nav.logging)
		{
            //push the current position to the log
		    instance.nav.tracklog.push(position);

		    //update the log size label
            instance.ctrl.lblLogSize.innerHTML = instance.nav.tracklog.length.toString() + " item(s)"
		}

        //set last success
		instance.nav.lastSuccess = true;
    }

    //Yeah baby.  This is the g load.  I can't wait to test this on the real me.  I told Rob he could learn to fly
    // aerobatics in the Lark and we could test this together.  Maybe it would be better to send him up with Rudy,
    // Rudy knows how to fly that shit.
    function accelerometerSuccess(g)
    {
        //Started trying to do some hokey ternary statements to return the axis with the most G, then remembered
        // negative Gs, then thought - I have never flown with a g meter at all, let along one with three axes.
        // Need to try this out in the cockpit.  Let's just show the Y axis for now.
        instance.nav.acc = parseFloat(g.y).toFixed(2); //((g.x > g.y && g.x > g.z) ? g.x : (g.y > g.x && g.y > g.z) ? g.y : g.z).toFixed(2);  //trying to work with this mess, not sure how the devices perform.  Looking for the axis with the force being applied to it...
        instance.ctrl.lblAcc.innerHTML = instance.nav.acc + " g";
    }

	function onReady() {
        //register for accelerometer
	    if (navigator.accelerometer != undefined)
	    { navigator.accelerometer.watchAcceleration(accelerometerSuccess, null, { frequency: 500 }); }

		//register for gps -- this will keep the radio hot but because the playbook doesn't respond to the timeout
		// argument the same as the handhelds this is the only way I can figure to get a GPS position update on a
		// usable timeline.  Enter the timerloop.
        navigator.geolocation.watchPosition(function(){ /* do nothing */ });
        onSuccessTimerLoop();
    }

    function onSuccessTimerLoop()
    {
        //TimerLoop gives us a setTimeout function.  I'm told this doesn't upset the apple cart by blocking the CPU
        // while the second passes by.  Hope the guy was right, or this is a baaaad way to do this...
        navigator.geolocation.getCurrentPosition(onSuccess, onError, {'enableHighAccuracy':true,'timeout':2000,'maximumAge':1000});
        var t=setTimeout('onSuccessTimerLoop()', 1000);
    }

    function onError(error)
    {
        //only show the div if the state has changed
        if (instance.nav.lastSuccess)
        { popDialog(instance.ctrl.weakSignalDialog); }

        //set lastSuccess false - it did not success last time
        instance.nav.lastSuccess = false;
    }

	//register for ready
	window.addEventListener("load", function () {
		window.addEventListener("deviceready", onReady);
		initialize();
	});

    //initialize the instance object.  This is my way of limiting the scope of my HTML5 controls and my nav data object
    var instance = null;
    function initialize() {
        instance = new main();
        instance.ctrl = new instance.ctrl();
        instance.nav = new instance.nav();

        instance.nav.dest = "---";
        instance.nav.enroute = false;

        instance.nav.logging = false;

        //radius of the earth in nm.  When we add the ability to switch units for sailors and other nancy-types we will
        // get this from a user preference as a key for an enum somewhere in the entities folder, no doubt.
        instance.R = 3960;

	}

    //scope limiter for my big helper objects
    var helpers = { };

    //calls simulateTravel for a five minute flight.  We always begin at Mark's home airport.
	function btnfire_click()
	{
        if(instance.nav.lat == null || isNaN(instance.nav.lat) || instance.nav.lon == null || isNaN(instance.nav.lon))
        {
            instance.nav.lat = airportData.CYKF.Lat;
            instance.nav.lon = airportData.CYKF.Lon;
            instance.nav.v = airportData.CYKF.Decl;
        }

        var position = {};
        position.coords = {};
        position.coords.altitude = instance.ctrl.txtAlt.value / 3.2808;
        var newpoint = helpers.simulateTravel(instance.nav.lat, instance.nav.lon, instance.ctrl.txtHdg.value, 5/60*instance.ctrl.txtSpd.value);
        position.coords.latitude = newpoint.Lat;
        position.coords.longitude = newpoint.Lon;
        position.coords.heading = instance.ctrl.txtHdg.value - instance.nav.v;
        position.coords.speed = instance.ctrl.txtSpd.value / 1.94384449;
        //if the instance timestamp is null, make it the current date.
        if(instance.nav.timestamp == null)
        { instance.nav.timestamp = new Date(); }
        position.timestamp = instance.nav.timestamp.getTime() + 300000;
        onSuccess(position);

        var acceleration = {};
        acceleration.y = instance.ctrl.txtAcc.value;
        accelerometerSuccess(acceleration);
    }

    function btnGoTo_click()
	{
        helpers.paintListCode("");
        popDialog(instance.ctrl.gotoDialog);
        instance.ctrl.txtGoto.value = "";
        instance.ctrl.txtGoto.disabled = false;
        instance.ctrl.txtGoto.focus();
	}

    function btnNrst_click()
    {
        helpers.paintListNearest();
        popDialog(instance.ctrl.gotoDialog);
        instance.ctrl.txtGoto.value = "";
        instance.ctrl.txtGoto.disabled = true;
    }

    function btnStop_click()
    {
        instance.nav.dest = "---";
        instance.nav.destLat = null;
        instance.nav.destLon = null;
        instance.nav.enroute = false;
    }

	function btnnavigate_click()
	{
        var d = instance.ctrl.lstAirports.options[instance.ctrl.lstAirports.options.selectedIndex].value;
		if(airportData[d] != undefined)
		{
            instance.nav.dest = d;
            instance.nav.destLat = airportData[d].Lat;
            instance.nav.destLon = airportData[d].Lon;
            instance.nav.enroute = true;
            instance.nav.originLat = instance.nav.lat;
            instance.nav.originLon = instance.nav.lon;
		}
        hideDialog(instance.ctrl.gotoDialog);
	}

	function btngotocancel_click()
	{
        hideDialog(instance.ctrl.gotoDialog);
	}

    function txtGoto_keyup()
    {
        helpers.paintListCode(instance.ctrl.txtGoto.value.toUpperCase());
    }

    function btnLog_click()
    {
        //if there's a log in memory and we're not currently logging, clear it out before starting again
        if (!instance.nav.logging) {
            instance.nav.tracklog = [];
        }

        //toggle the state
        instance.nav.logging = !instance.nav.logging;

        //update the button text
        if (instance.nav.logging)
        { instance.ctrl.btnLog.value = "STOP"; }
        else
        { instance.ctrl.btnLog.value = "START"; }
    }

    function btnUpload_click()
    {
        //make sure there's something to upload
        if (instance.nav.tracklog.length > 0)
        {
            instance.ctrl.btnUpload.disabled = true;
            instance.ctrl.btnUpload.value = "UPLOADING...";

            var toupload = jQuery.toJSON(instance.nav.tracklog);

            var cl = new XMLHttpRequest();
            cl.open("POST", "http://m.ykfhangar.com/gps/", false);
            cl.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            cl.setRequestHeader("Content-length", toupload.length);
            cl.setRequestHeader("Connection", "close");

            try {
                cl.send("trackdata=" + toupload);
            }
            catch (ex) {
                if (ex.toString().indexOf("101") > 0) {
                    //do nothing
                }
                else { alert(ex); }
            }
            finally {
                instance.ctrl.btnUpload.disabled = false;
                instance.ctrl.btnUpload.value = "UPLOAD";
            }
        }
    }

    function btnSimBoxToggle_click()
    {
        //toggle visibility
        instance.ctrl.simBoxTile.style.visibility = instance.ctrl.simBoxTile.style.visibility == "visible" ? "hidden" : "visible";

        //toggle text on button
        instance.ctrl.btnSimBoxToggle.value = instance.ctrl.btnSimBoxToggle.value == "SHOW SIM" ? "HIDE SIM" : "SHOW SIM";
    }

    function btnAckWeakSignal_click()
    {
        //hide the div
        hideDialog(instance.ctrl.weakSignalDialog);
    }