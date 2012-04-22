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
        this.lblDest = document.getElementById("lblDest");
        //Heading label
        this.lblHdg = document.getElementById("lblHdg");
        //Bearing to next label
        this.lblBrg = document.getElementById("lblBrg");
        //Groundspeed label
        this.lblSpd = document.getElementById("lblSpd");
        //Distance to next label
        this.lblDist = document.getElementById("lblDist");
        //ETE to next label
        this.lblEte = document.getElementById("lblEte");
        //Altitude label
        this.lblAlt = document.getElementById("lblAlt");
        //Dialog box for the "GOTO" feature
        this.gotoDialog = document.getElementById("gotoDialog");
        //Input box for alpha searching on the "GOTO" dialog form
        this.txtGoto = document.getElementById("txtGoto");
        //List of airports to display - multiline select html control - need to switch to jquery to stop BB browser behaviour
        this.lstAirports = document.getElementById("lstAirports");
        //Cross track distance label
        this.lblXtk = document.getElementById("lblXtk");
        //sim box
        this.simBoxTile = document.getElementById("simBoxTile");
        //Altitude text box from sim box
        this.txtAlt = document.getElementById("txtAlt");
        //Heading text box from sim box
        this.txtHdg = document.getElementById("txtHdg");
        //Groundspeed text box from sim box
        this.txtSpd = document.getElementById("txtSpd");
        //Accelerometer (g-meter) label
        this.lblAcc = document.getElementById("lblAcc");
        //Acceleration text box from sim box
        this.txtAcc = document.getElementById("txtAcc");
        //VSI (vertical speed indicator) label
        this.lblVsi = document.getElementById("lblVsi");
        //Local time label
        this.lblLclTime = document.getElementById("lblLclTime");
        //UTC time label
        this.lblUtcTime = document.getElementById("lblUtcTime");
        //logging button
        this.btnLog = document.getElementById("btnLog");
        //upload log button
        this.btnUpload = document.getElementById("btnUpload");
        //log size label
        this.lblLogSize = document.getElementById("lblLogSize");
        //toggle sim box button
        this.btnSimBoxToggle = document.getElementById("btnSimBoxToggle");
        //Dialog box for weak signal
        this.weakSignalDialog = document.getElementById("weakSignalDialog");
        //acknowledge button for weak signal dialog
        this.btnAckWeakSignal = document.getElementById("btnAckWeakSignal");
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
        this.destLat = null;
        this.destLon = null;
        //position at time of navigation start
        this.originLat = null;
        this.originLon = null;
        //previous altitude (for vertical speed calculation, set from previous value for this.alt)
        this.lastAlt = null;
        //current GPS timestamp
        this.timestamp = null;
        //previous GPS timestamp (for time-related calculations, time since last GPS position/altitude)
        this.lastTimestamp = null;
        //bool for logging
        this.logging = null;
        //object for current log
        this.tracklog = [];
        //was the last request successful
        this.lastSuccess = true;
    };
}

