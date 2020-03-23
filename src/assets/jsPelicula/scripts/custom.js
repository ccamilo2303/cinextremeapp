///////////
//VAR SETUP
///////////
var theBody = jQuery('body'),
    contentContainer = jQuery('#contentContainer'),
    headerImages = jQuery('#headerImages'),
    headerImage = headerImages.children(),
    audioControl = jQuery('#audioControl'),
    sidebar = jQuery('#sidebar'),
    loadingPage = jQuery('#loading-page'),
    headerinterval = '';



//////////////////
//VIDEO PAGE STUFF -- videoLink click, closeVideo
//////////////////
jQuery(document).on('click', '.videoLink', function() {

    Tawk_API.hideWidget();

    videoContainer = jQuery('.videoContainer');
    videoId = videoContainer.data('vidid');

    jQuery("html,body").stop().animate({ scrollTop: 0 }, 1500);

    //LOAD PLAYER
    if (videoContainer.hasClass('self-video')) {

        videoContainer.append('<div class="embed-container" id="embed-t"> <iframe  src="' + videoId + '" id="movie" width="640" height="480" frameborder="0" allowfullscreen></iframe> </div>');
        videoContainer.append('<style>.embed-container {position: relative;height: 100%;overflow: hidden;}.16by9 {padding-bottom: 56.25%;}.4by3 {padding-bottom: 75%;}.embed-container iframe {position: absolute;top:0;left: 0;width: 100%;height: 100%;}body{background:black;}</style>');
    }

    //FADE IN VIDEO
    videoContainer.stop(true, true).fadeIn(300, function() {});

    //ADD CLASS
    theBody.addClass('full-screen-video');


    return false;
});
//CLOSE VIDEO FUNCTION
function closeVideo() {



    Tawk_API.showWidget();

    var videoContainer = jQuery('.videoContainer');

    //FADE OUT VIDEO
    videoContainer.stop(true, true).fadeOut(300, function() {
        jQuery('.postVideo').remove();
    });


    theBody.removeClass('full-screen-video');
    document.getElementById('embed-t').remove();
}
//CLOSE VIDEO CLICK
jQuery(document).on('click', '.closeVideo', function() {
    closeVideo();
});



///////////////////////////
//CONTAINER HEIGHT FUNCTION -- containerHeight
///////////////////////////
function containerHeight() {

    var winHeight = jQuery(window).height();

    contentContainer.css({ height: winHeight + 'px' });
}
containerHeight();




//LOADING STUFF
loadingPage.stop(true, true).fadeOut(800, function() {

});