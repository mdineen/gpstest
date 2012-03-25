//okay, these two are just wrappers for my laziness, and to compensate for the fact that as geeky as I pretend to be, I just
// can't memorize these formulae
function deg(num){ return num*180/Math.PI; }
function rad(num){ return num*Math.PI/180; }

//I don't know if this is a good idea, or if it's tantamount to abusing redim preserve in vb.net (are you reading this
// azga devs?), but I don't know any better yet :).  This is an extension method to Object itself that returns the length
// of the key array.  Looks a bit clunky to me.  But it runs fast enough on my new 9900, so :D
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};