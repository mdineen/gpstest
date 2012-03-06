/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/* Vincenty Direct Solution of Geodesics on the Ellipsoid (c) Chris Veness 2005-2011              */
/*                                                                                                */
/* from: Vincenty direct formula - T Vincenty, "Direct and Inverse Solutions of Geodesics on the  */
/*       Ellipsoid with application of nested equations", Survey Review, vol XXII no 176, 1975    */
/*       http://www.ngs.noaa.gov/PUBS_LIB/inverse.pdf                                             */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

/**
 * Calculates destination point given start point lat/long, bearing & distance, 
 * using Vincenty inverse formula for ellipsoids
 *
 * @param   {Number} lat1, lon1: first point in decimal degrees
 * @param   {Number} brng: initial bearing in decimal degrees
 * @param   {Number} dist: distance along bearing in metres
 * @returns (LatLon} destination point
 */
function destVincenty(lat1, lon1, brng, dist) {
  var a = 6378137, b = 6356752.3142,  f = 1/298.257223563;  // WGS-84 ellipsiod
  var s = dist;
  var alpha1 = brng.toRad();
  var sinAlpha1 = Math.sin(alpha1);
  var cosAlpha1 = Math.cos(alpha1);
  
  var tanU1 = (1-f) * Math.tan(lat1.toRad());
  var cosU1 = 1 / Math.sqrt((1 + tanU1*tanU1)), sinU1 = tanU1*cosU1;
  var sigma1 = Math.atan2(tanU1, cosAlpha1);
  var sinAlpha = cosU1 * sinAlpha1;
  var cosSqAlpha = 1 - sinAlpha*sinAlpha;
  var uSq = cosSqAlpha * (a*a - b*b) / (b*b);
  var A = 1 + uSq/16384*(4096+uSq*(-768+uSq*(320-175*uSq)));
  var B = uSq/1024 * (256+uSq*(-128+uSq*(74-47*uSq)));
  
  var sigma = s / (b*A), sigmaP = 2*Math.PI;
  while (Math.abs(sigma-sigmaP) > 1e-12) {
    var cos2SigmaM = Math.cos(2*sigma1 + sigma);
    var sinSigma = Math.sin(sigma);
    var cosSigma = Math.cos(sigma);
    var deltaSigma = B*sinSigma*(cos2SigmaM+B/4*(cosSigma*(-1+2*cos2SigmaM*cos2SigmaM)-
      B/6*cos2SigmaM*(-3+4*sinSigma*sinSigma)*(-3+4*cos2SigmaM*cos2SigmaM)));
    sigmaP = sigma;
    sigma = s / (b*A) + deltaSigma;
  }

  var tmp = sinU1*sinSigma - cosU1*cosSigma*cosAlpha1;
  var lat2 = Math.atan2(sinU1*cosSigma + cosU1*sinSigma*cosAlpha1, 
      (1-f)*Math.sqrt(sinAlpha*sinAlpha + tmp*tmp));
  var lambda = Math.atan2(sinSigma*sinAlpha1, cosU1*cosSigma - sinU1*sinSigma*cosAlpha1);
  var C = f/16*cosSqAlpha*(4+f*(4-3*cosSqAlpha));
  var L = lambda - (1-C) * f * sinAlpha *
      (sigma + C*sinSigma*(cos2SigmaM+C*cosSigma*(-1+2*cos2SigmaM*cos2SigmaM)));
  var lon2 = (lon1.toRad()+L+3*Math.PI)%(2*Math.PI) - Math.PI;  // normalise to -180...+180

  var revAz = Math.atan2(sinAlpha, -tmp);  // final bearing, if required

  return { lat: lat2.toDeg(), lon: lon2.toDeg(), finalBearing: revAz.toDeg() };
}

// ---- extend Number object with methods for converting degrees/radians

Number.prototype.toRad = function() {
  return this * Math.PI / 180;
}

Number.prototype.toDeg = function() {
  return this * 180 / Math.PI;
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */