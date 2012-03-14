function main()
{
    this.ctrl = function ()
    {
        this.lbldest = document.getElementById("lbldest");
        this.lblhdg = document.getElementById("lblhdg");
        this.lblbrg = document.getElementById("lblbrg");
        this.lblspd = document.getElementById("lblspd");
        this.lbldist = document.getElementById("lbldist");
        this.lblete = document.getElementById("lblete");
        this.lblalt = document.getElementById("lblalt");
        this.debugpanel = document.getElementById("debugpanel");
        this.gotodialog = document.getElementById("gotodialog");
        this.txtgoto = document.getElementById("txtgoto");
        this.lstairports = document.getElementById("lstairports");
        this.lblxtk = document.getElementById("lblxtk");
        this.txtalt = document.getElementById("txtalt");
        this.txthdg = document.getElementById("txthdg");
        this.txtspd = document.getElementById("txtspd");
        this.lblacc = document.getElementById("lblacc");
        this.txtacc = document.getElementById("txtacc");
    };
    this.nav = function()
    {
        this.alt = null;
        this.lat = null;
        this.lon = null;
        this.v = null;
        this.hdg = null;
        this.spd = null;
        this.acc = null;
        this.enroute = null;
        this.dest = null;
        this.destlat = null;
        this.destlon = null;
        this.originlat = null;
        this.originlon = null;
    };
}

