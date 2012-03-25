/*
Magnetic declination or magnetic variance is the correction one must apply to convert one's compass heading to true heading (or vice
 versa).  You can think of it as the number of degrees between true north and magnetic north at your position.  Unfortunately, you
 need to know the exact position of the magnetic pole on the true graticule to calculate this on the fly, which I don't.  Luckily,
 FAA and NavCanada have us covered.  Just get the variance at the nearest airport.
 */
	function getdeclination(lat, lon){
        var nrst = {};
        var nrstdecl;
        //starting with a 2-mile radius and going up in increments of 2 miles if you don't find any airports, get me the magnetic
        // variation at the nearest airport.  I do this because doing a getnearestlatlon with a 1000-mile radius is a costly
        // exercise and I don't want to start with that.  Having said that, I'm planning on doing most of my flying in the golden
        // horseshoe and possibly the border states, so I will usually have an airport within a couple dozen fruitless calls to
        // getnearestlatlon.  If you're doing this over the tundra, you may find this method takes a while.  May want to rethink
        // 2x2 into maybe 15x15...
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
