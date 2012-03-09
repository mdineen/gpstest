	function getdeclination(lat, lon){
        var nrst = {};
        var nrstdecl;
        for(var i = 2; i < 1000; i += 2)
        {
            nrst = getnearestlatlon(lat, lon, i);

            for(var n in nrst)
            {
                nrstdecl = airportdata[nrst[n]].Decl;
                break;
            }
            if(nrstdecl != undefined)
            { break; }
        }
        return nrstdecl;
    }
