/*
Cross Track is the distance back to the nearest point on the trackline plotted between your point of initial "Navigate" and your
 destination point.
 */
helpers.getCrossTrack = function()
{
    //dxt is "distance cross track".  Function is a common spherical geometry calculation.
    var dxt = Math.asin(Math.sin(helpers.getDistance(instance.nav.originLat, instance.nav.originLon, instance.nav.lat, instance.nav.lon)/instance.R)*Math.sin(helpers.rad(helpers.getHeading(instance.nav.originLat, instance.nav.originLon, instance.nav.lat, instance.nav.lon))-helpers.rad(helpers.getHeading(instance.nav.originLat, instance.nav.originLon, instance.nav.destLat, instance.nav.destLon)))) * instance.R;
    //return the absolute value to drop the negative sign if present.  Negative values are inside the curve of the great circle arc
    //  segment, positive values are outside.  No one cares which way the great circle bends when flying.
    return Math.abs(dxt);
}
