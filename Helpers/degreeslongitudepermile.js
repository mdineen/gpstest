function degreeslongitudepermile(latitude) {
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