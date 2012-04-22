/*
Object definition for airportData.js data
 */
function airport(Code,Name,Lat,Lon,Elev,Decl){
	//Code is the 3 or 4 digit ICAO code for the aerodrome
    this.Code = Code;
    //The published name of the airport
	this.Name = Name;
    //latitude float
	this.Lat = Lat;
    //longitude float
	this.Lon = Lon;
    //elevation in ft msl int
	this.Elev = Elev;
    //magnetic variance (declination) at the airport
	this.Decl = Decl;
}