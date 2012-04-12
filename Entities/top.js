/*
Despite "top" and "main" being extemely poor choices for var names, this object lends some scope limitation to the
values I need throughout the app.  This way I'm not messing with local values in jquery and webgl when the time comes
 */
function main()
{
    this.ctrl = function ()
    {
        //Controls on the main nav form and sim box
        //Destination label
        this.lbldest = document.getElementById("lbldest");
        //Heading label
        this.lblhdg = document.getElementById("lblhdg");
        //Bearing to next label
        this.lblbrg = document.getElementById("lblbrg");
        //Groundspeed label
        this.lblspd = document.getElementById("lblspd");
        //Distance to next label
        this.lbldist = document.getElementById("lbldist");
        //ETE to next label
        this.lblete = document.getElementById("lblete");
        //Altitude label
        this.lblalt = document.getElementById("lblalt");
        //Dialog box for the "GOTO" feature
        this.gotodialog = document.getElementById("gotodialog");
        //Input box for alpha searching on the "GOTO" dialog form
        this.txtgoto = document.getElementById("txtgoto");
        //List of airports to display - multiline select html control - need to switch to jquery to stop BB browser behaviour
        this.lstairports = document.getElementById("lstairports");
        //Cross track distance label
        this.lblxtk = document.getElementById("lblxtk");
        //sim box
        this.simboxtile = document.getElementById("simboxtile");
        //Altitude text box from sim box
        this.txtalt = document.getElementById("txtalt");
        //Heading text box from sim box
        this.txthdg = document.getElementById("txthdg");
        //Groundspeed text box from sim box
        this.txtspd = document.getElementById("txtspd");
        //Accelerometer (g-meter) label
        this.lblacc = document.getElementById("lblacc");
        //Acceleration text box from sim box
        this.txtacc = document.getElementById("txtacc");
        //VSI (vertical speed indicator) label
        this.lblvsi = document.getElementById("lblvsi");
        //Local time label
        this.lbllcltime = document.getElementById("lbllcltime");
        //UTC time label
        this.lblutctime = document.getElementById("lblutctime");
        //logging button
        this.btnlog = document.getElementById("btnlog");
        //upload log button
        this.btnupload = document.getElementById("btnupload");
        //log size label
        this.lbllogsize = document.getElementById("lbllogsize");
        //toggle sim box button
        this.btnsimboxtoggle = document.getElementById("btnsimboxtoggle");
        //Dialog box for weak signal
        this.weaksignaldialog = document.getElementById("weaksignaldialog");
        //acknowledge button for weak signal dialog
        this.btnackweaksignal = document.getElementById("btnackweaksignal");
    };
    this.nav = function()
    {
        //current altitude
        this.alt = null;
        //current position
        this.lat = null;
        this.lon = null;
        //Variance (declination) at nearest airport
        this.v = null;
        //Current course over ground/track - GPS incorrectly calls this heading
        //  (BB6 and BB7 don't appear to support this, has to be calculated manually)
        this.hdg = null;
        //Current groundspeed (BB6 and BB7 don't appear to support this, has to be calculated manually)
        this.spd = null;
        //Current acceleration (g-force on Y axis)
        this.acc = null;
        //Current vertical speed (calculated manually)
        this.vs = null;
        //bool to indicate whether GPS system is currently navigating
        this.enroute = null;
        //destination airport code
        this.dest = null;
        //destination position (float)
        this.destlat = null;
        this.destlon = null;
        //position at time of navigation start
        this.originlat = null;
        this.originlon = null;
        //previous altitude (for vertical speed calculation, set from previous value for this.alt)
        this.lastalt = null;
        //current GPS timestamp
        this.timestamp = null;
        //previous GPS timestamp (for time-related calculations, time since last GPS position/altitude)
        this.lasttimestamp = null;
        //bool for logging
        this.logging = null;
        //object for current log
        this.tracklog = [];
        //was the last request successful
        this.lastsuccess = true;
    };
}

