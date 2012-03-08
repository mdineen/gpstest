airportdata.searchcode = function(s, n){
    var rtn = [];
    var cnt = 0;
    for(var a in airportdata)
    {
        if (a >= s)
        {
            rtn.push(a);
        }
        if (rtn.length >= n) { break; }
    }
    return rtn;
}