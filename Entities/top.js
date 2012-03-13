function main(ctrl, nav)
{
    this.ctrl = function (lbldest,lblhdg,lblbrg,lblspd,lbldist,lblete,lblalt,debugpanel,gotodialog,txtgoto,lstairports,
        lblxtk,txtalt,txthdg,txtspd)
    {
        this.lbldest = lbldest;
            this.lblhdg = lblhdg;
            this.lblbrg = lblbrg;
            this.lblspd = lblspd;
            this.lbldist = lbldist;
            this.lblete = lblete;
            this.lblalt = lblalt;
            this.debugpanel = debugpanel;
            this.gotodialog = gotodialog;
            this.txtgoto = txtgoto;
            this.lstairports = lstairports;
            this.lblxtk = lblxtk;
            this.txtalt = txtalt;
            this.txthdg = txthdg;
            this.txtspd = txtspd;

    };
    this.nav = function(alt,lat,lon,v,enroute,dest,destlat,destlon,originlat,originlon)
    {
        this.alt = alt;
        this.lat = lat;
        this.lon = lon;
        this.v = v;
        this.enroute = enroute;
        this.dest = dest;
        this.destlat = destlat;
        this.destlon = destlon;
        this.originlat = originlat;
        this.originlon = originlon;
    };
}

