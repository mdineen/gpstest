function popDialog(ctrl)
{
    //center up the div
    ctrl.style.marginLeft = ctrl.offsetWidth/2*-1;
    ctrl.style.marginTop = ctrl.offsetHeight/2*-1;

    //show the div
    ctrl.style.visibility = "visible";
}

function hideDialog(ctrl)
{
    //hide the div
    ctrl.style.visibility = "hidden";
}