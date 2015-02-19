
var getViewport = function(){
  var viewport = false;

  function calcViewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window )) {
      a = 'client';
      e = document.documentElement || document.body;
    }
    viewport = { width : e[ a+'Width' ] , height : e[ a+'Height' ] };

  }

  $(window).resize(function(){ viewport = false; })

  return function(){
    if (!viewport) calcViewport();
    return viewport;
  }
}();


// basic detects
function isIpad() {   return navigator.userAgent.match(/iPad/i) != null; }
function isIphone() { return navigator.platform.indexOf("iPhone") != -1 }
function isIpod() {   return navigator.platform.indexOf("iPod") != -1 }
function isAndroid() {   return /Android/i.test(navigator.userAgent); }
function isIEMobile() {   return /IEMobile/i.test(navigator.userAgent); }
function isMac(){ return navigator.platform.indexOf('Mac') > -1; }
function isTouch() {
  return 'ontouchstart' in window // works on most browsers
    || 'onmsgesturechange' in window; // works on ie10
}

function runDetects() {
  var html = $('html');
  var w = window;

  w._isTouch = isTouch();
  w._isIpad = isIpad();
  w._isIphone = isIphone();
  w._isIpod = isIpod();
  w._isAndroid = isAndroid();
  w._isIEMobile = isIEMobile();
  w.scrollBarWidth = scrollSize();
  w.isAppleMobile = w._isIpad ||w._isIphone || w._isIpod || false;

  w._isTouch  ? html.addClass('touch'):html.addClass('notouch');
  w._isIpad   ? html.addClass('ipad'):0;
  w._isIphone ? html.addClass('iphone'):0;
  w._isIpod   ? html.addClass('ipod'):0;
  w._isAndroid   ? html.addClass('android'):0;

  w._isMobile = _isAndroid || _isIEMobile || isAppleMobile || false;
}

// detect scrollSize
function scrollSize() {
  var scrollDiv = $('<div><div>').css({
    width: 100,
    height: 100,
    overflow: 'scroll',
    position: 'absolute',
    top: -9999
  }).appendTo($('body'));
  var scrollbarWidth = scrollDiv[0].offsetWidth - scrollDiv[0].clientWidth;
  scrollDiv.remove();
  return scrollbarWidth;
}


function getIEversion() {
  var rv = 0; // Return value assumes failure.
  if (navigator.appName === 'Microsoft Internet Explorer') {
    var ua = navigator.userAgent;
    var re = new RegExp( 'MSIE ([0-9]{1,}[.0-9]{0,})' );
    if (re.exec( ua ) !== null) {
      rv = parseFloat( RegExp.$1 );
    }
  }
    return rv;
}

// http://stackoverflow.com/questions/8921783/cross-browser-solution-for-a-callback-when-loading-multiple-images
function createImages(srcs, fn) {
   var imgs = [], img;
   var remaining = srcs.length;
   for (var i = 0; i < srcs.length; i++) {
       img = new Image();
       imgs.push(img);
       img.onload = function() {
           --remaining;
           if (remaining == 0) {
               fn(imgs);
           }
       };
       img.src = srcs[i];
   }
   return(imgs);
}

function initModules() {
  $('[data-module]:not(.moduleinited)').each(function(){

      var name = $(this).addClass('moduleinited').attr('data-module');
      console.log('init', name)
      if (!__modules[name]) throw "Data module "+name+" is not EXISTS!!";
      __modules[name].call(this, $(this));
  })
}

function module(path, fn) {
  if (!window.__modules) window.__modules = {};
  window.__modules[path] = fn;
}
