function deg(num){ return num*180/Math.PI; }
function rad(num){ return num*Math.PI/180; }
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};