/*
One minute of latitude is one nautical mile.  This is a constant on the surface of the Earth.  No matter where you are,
 latitude is always proportional.  This is how the nautical mile came to be in the first place.  Who knows where the 800-foot
 shorter statue mile came from.  From legislators, that's where.  When did they ever get anything right??

 Longitude on the other hand is a bitch.  At the equator, a minute of latitude (0.01666... degrees) is roughly a nautical mile.
  As you increase or decrease your latitude toward the poles, the meridians converge.  At +/- 90 degrees latitude (the geographic
  North and South poles respectively) a minute of longitude has a distance of zero.  I'm sure there's a nice way to curve-fit this,
  but that's for a later version.  This formula gives you an approximate value for degreeslongitudepermile, so that you can scribe
  the rectangle discussed in GetNearest().  I needed to put more and more breakpoints in to better express the curve at extreme latitudes
 */
function degreeslongitudepermile(latitude) {
    //Approximate number of degrees of longitude per nautical mile at given intervals of latitude
	var latdegpernm = {
		0 : 0.016666,
		15 : 0.017222,
		30 : 0.019193,
		45 : 0.023529,
		60 : 0.033189,
		75 : 0.064061,
		80 : 0.095510,
		85 : 0.190114,
		87.5 : 0.380228,
		90 : 1
		};
	var last = 0;
	var rtn = 0;
    //quick iteration to return the closest key's value
	for (var l in latdegpernm)
	{
		if(l > latitude)
		{
			if((l - latitude) < (latitude - last))
			{ rtn = latdegpernm[l]; }
			else
			{ rtn = latdegpernm[last]; }
			break;
		}
		last = l;
	}

	return rtn;
  }

