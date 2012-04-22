/*
Helper method called onKeyUp of the search by code box on the GOTO form.  This gets a list of airports that begin with
    the contents of the search code text box, up to the number of lines available in the select control
 */
airportData.searchcode = function(s, n){ //s is the search criterion, n is the number of lines in the box
    var rtn = []; //output array
    var cnt = 0; //counter int
    for(var a in airportData)
    {
        //loop through all airports alphabetically from top of list, if value is g/e add it to the output array
        if (a >= s)
        {
            rtn.push(a);
        }
        //break the loop after the array has enough codes to fill the box
        if (rtn.length >= n) { break; }
    }
    return rtn;
}