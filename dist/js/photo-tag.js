"use strict";$(function(){function t(t){t.length>0&&($("#wait").show(),$("#thumbs").load(t.attr("href"),function(n,a){"error"===a&&($(this).empty(),t.removeClass(o),util.log.event(e,"Load Photos Error","Error"),alert('Sorry about that. Looking for "'+t.html()+'" photos caused an error.')),$("#wait").hide(),window.scrollTo(0,0)}))}var e="Photo Tag",o="selected",n=$("#photo-tag"),a="item-"+selectedTag.substr(0,1).toLowerCase(),l=n.find("#"+a),i=l.find("#link-"+selectedTag),s=n.find("li[data-for="+a+"]");l.show(),i.addClass(o),s.addClass(o),t(i),n.find("li").click(function(){s.removeClass(o),s=$(this),s.addClass(o),l.hide(),l=$("#"+s.data("for")),l.show(),util.log.event(e,"Click Index Letter")}),n.find("#tag-index a").click(function(n){n.stopPropagation(),n.preventDefault(),i.removeClass(o),i=$(this),i.addClass(o),t(i),util.log.event(e,"Click Name"),window.history.pushState(null,siteName+' photos tagged with "'+i.html()+'"',i.attr("href").replace("/search",""))})});var util={setting:{save:function(t,e){window.localStorage&&localStorage.setItem(t,e)},load:function(t){return window.localStorage?localStorage.getItem(t):null},set showMapLegend(t){util.setting.save("map-legend",t?"true":"false")},get showMapLegend(){var t=util.setting.load("map-legend");return!t||"true"==t},set menuCategory(t){"string"==typeof t&&(t=[t,null]),util.setting.save("menu",t.join())},get menuCategory(){var t=util.setting.load("menu");return null===t?null:t[1].split(",")}},html:{icon:function(t,e){var o=$("<i>").addClass("material-icons "+t).text(t);return void 0!==e&&o.click(e),o}},log:{event:function(t,e,o){ga("send","event",t,e,o)}}};
//# sourceMappingURL=/js/maps/photo-tag.js.map
