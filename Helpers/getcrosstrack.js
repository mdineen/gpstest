function getcrosstrack()
{
    var dxt = Math.asin(Math.sin(getdistance(originlat, originlon, lat, lon)/R)*Math.sin(rad(GetHeading(originlat, originlon, lat, lon))-rad(GetHeading(originlat, originlon, destlat, destlon)))) * R;
    return dxt;
}
