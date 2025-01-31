import jQuery from 'jquery';
import {cajsconfig}from './map-config';


export function mapInteract() {

function isTouchEnabled() {
  return (("ontouchstart" in window)
    || (navigator.MaxTouchPoints > 0)
    || (navigator.msMaxTouchPoints > 0));
}
jQuery(function () {
  jQuery("path[id^=cajs]").each(function (i, e) {
    caaddEvent( jQuery(e).attr("id"));
  });
});
function caaddEvent(id,relationId) {
  var _obj = jQuery("#" + id);
  var arr = id.split("");
  var _Textobj = jQuery("#" + id + "," + "#cajsvn" + arr.slice(4).join(""));
  jQuery("#" + ["visnames"]).attr({"fill":cajsconfig.general.visibleNames});
  _obj.attr({"fill":cajsconfig[id].upColor, "stroke":cajsconfig.general.borderColor});
  _Textobj.attr({"cursor": "default"});
  if (cajsconfig[id].active === true) {
    _Textobj.attr({"cursor": "pointer"});
    _Textobj.hover(function () {
      jQuery("#cajstip").show().html(cajsconfig[id].hover);
      _obj.css({"fill":cajsconfig[id].overColor});
    }, function () {
      jQuery("#cajstip").hide();
      jQuery("#" + id).css({"fill":cajsconfig[id].upColor});
    });
    if (cajsconfig[id].target !== "none") {
      _Textobj.mousedown(function () {
        jQuery("#" + id).css({"fill":cajsconfig[id].downColor});
      });
    }
    _Textobj.mouseup(function () {
      jQuery("#" + id).css({"fill":cajsconfig[id].overColor});
      if (cajsconfig[id].target === "new_window") {
        window.open(cajsconfig[id].url);	
      } else if (cajsconfig[id].target === "same_window") {
        window.parent.location.href = cajsconfig[id].url;
      } else if (cajsconfig[id].target === "modal") {
        jQuery(cajsconfig[id].url).modal("show");
      }
    });
    _Textobj.mousemove(function (e) {
      var x = e.pageX + 10, y = e.pageY + 15;
      var tipw =jQuery("#cajstip").outerWidth(), tiph =jQuery("#cajstip").outerHeight(),
      x = (x + tipw >jQuery(document).scrollLeft() +jQuery(window).width())? x - tipw - (20 * 2) : x ;
      y = (y + tiph >jQuery(document).scrollTop() +jQuery(window).height())? jQuery(document).scrollTop() +jQuery(window).height() - tiph - 10 : y ;
      jQuery("#cajstip").css({left: x, top: y});
    });
    if (isTouchEnabled()) {
      _Textobj.on("touchstart", function (e) {
        var touch = e.originalEvent.touches[0];
        var x = touch.pageX + 10, y = touch.pageY + 15;
        var tipw =jQuery("#cajstip").outerWidth(), tiph =jQuery("#cajstip").outerHeight(),
        x = (x + tipw >jQuery(document).scrollLeft() +jQuery(window).width())? x - tipw -(20 * 2) : x ;
        y =(y + tiph >jQuery(document).scrollTop() +jQuery(window).height())? jQuery(document).scrollTop() +jQuery(window).height() -tiph - 10 : y ;
        jQuery("#" + id).css({"fill":cajsconfig[id].downColor});
        jQuery("#cajstip").show().html(cajsconfig[id].hover);
        jQuery("#cajstip").css({left: x, top: y});
      });
      _Textobj.on("touchend", function () {
        jQuery("#" + id).css({"fill":cajsconfig[id].upColor});
        if (cajsconfig[id].target === "new_window") {
          window.open(cajsconfig[id].url);
        } else if (cajsconfig[id].target === "same_window") {
          window.parent.location.href = cajsconfig[id].url;
        } else if (cajsconfig[id].target === "modal") {
          jQuery(cajsconfig[id].url).modal("show");
        }
      });
    }
	}
}
}