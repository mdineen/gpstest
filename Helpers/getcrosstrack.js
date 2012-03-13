function getcrosstrack()
{
    var dxt = Math.asin(Math.sin(getdistance(instance.nav.originlat, instance.nav.originlon, instance.nav.lat, instance.nav.lon)/instance.R)*Math.sin(rad(GetHeading(instance.nav.originlat, instance.nav.originlon, instance.nav.lat, instance.nav.lon))-rad(GetHeading(instance.nav.originlat, instance.nav.originlon, instance.nav.destlat, instance.nav.destlon)))) * instance.R;
    return dxt;
}
