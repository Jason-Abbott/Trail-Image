"use strict";$(function(){function t(t){var e=t.point.x,o=t.point.y,n={x:e+z.width-b.width,y:o+z.height-b.height};return n.x=n.x<0?0:n.x+10,n.y=n.y<0?0:n.y+10,e-=n.x,o-=n.y,n.x+n.y>0&&y.panBy([n.x,n.y],{duration:100},{type:null,point:null,target:null,reason:"fit",lngLat:null,originalEvent:null}),{top:o+15,left:e}}function e(t,e,o){t?(_.keyNav=function(t){switch(t.keyCode){case 27:_.mapInteraction();break;case 37:o();break;case 39:e()}},document.addEventListener("keydown",_.keyNav)):document.removeEventListener("keydown",_.keyNav)}function o(t,e){var o=y.getZoom(),i=3*o/Math.pow(2,o),a=[t.lng-i,t.lat-i],l=[t.lng+i,t.lat+i],r=M.features.filter(function(t){var e=t.geometry.coordinates;return e[0]>=a[0]&&e[1]>=a[1]&&e[0]<=l[0]&&e[1]<=l[1]}).map(function(e){return e.properties.distance=n(t,e.geometry.coordinates),e});return r.sort(function(t,e){return t.properties.distance-e.properties.distance}),r.slice(0,e)}function n(t,e){var o=t.lng,n=t.lat,i=e[0],a=e[1];return Math.sqrt(Math.pow(i-o,2)+Math.pow(a-n,2))}function i(){if(S){var t=y.getCenter(),e=v+"/map?lat="+t.lat+"&lon="+t.lng+"&zoom="+y.getZoom();window.history.replaceState(null,null,e)}}function a(){y.getZoom()>u.zoom&&!x?(x=!0,g.click(function(){y.easeTo(u),util.log.event(d,"Zoom Out")}).removeClass("disabled")):y.getZoom()<=u.zoom&&x&&(x=!1,g.off("click").addClass("disabled"))}function l(t){var e=t.split("/"),o=e[e.length-1].split("_");window.location.href="/"+o[0]}function r(t){t.features.length>0&&(y.addSource("track",{type:"geojson",data:t}).addLayer({id:"track",type:"line",source:"track",layout:{"line-join":"round","line-cap":"butt"},paint:{"line-color":"#f22","line-width":5,"line-opacity":.7,"line-dasharray":[1,.8]}},"photo"),$("nav button.link").click(_.buttonClick),$("#legend .track").removeClass("hidden")),y.once("zoomend",function(){window.setTimeout(function(){S=!0},500)}),y.fitBounds([post.bounds.sw,post.bounds.ne])}function c(){y.addSource("photos",{type:"geojson",data:M,cluster:!0,clusterMaxZoom:18,clusterRadius:30}),y.addLayer({id:"cluster",type:"circle",source:"photos",filter:["has","point_count"],paint:{"circle-color":"#422","circle-radius":{property:"point_count",type:"interval",stops:[[0,10],[10,12],[100,15]]},"circle-opacity":C,"circle-stroke-width":3,"circle-stroke-color":"#ccc"}}),y.addLayer({id:"cluster-count",type:"symbol",source:"photos",filter:["has","point_count"],layout:{"text-field":"{point_count_abbreviated}","text-font":["Open Sans Bold","Arial Unicode MS Bold"],"text-size":14},paint:{"text-color":"#fff"}}),y.addLayer({id:"photo",type:"circle",source:"photos",filter:["!has","point_count"],paint:{"circle-color":"#f00","circle-radius":7,"circle-stroke-width":4,"circle-stroke-color":"#fdd","circle-opacity":C}})}function s(){y.on("mouseenter","cluster",j("pointer")).on("mouseleave","cluster",j()).on("mouseenter","photo",j("pointer")).on("mouseleave","photo",j()).on("zoomend",_.zoomEnd).on("moveend",i).on("click","cluster",_.clusterClick).on("click","photo",_.photoClick)}var u={zoom:6.5,center:[-116.0987,44.7]},d="Map",p=$("#photo-count"),h=$("#photo-preview"),g=$("nav .zoom-out"),f=$("#legend .toggle"),v=post?"/"+post.key:"",m=function(){for(var t=window.location.search.split(/[&\?]/g),e={},o=0;o<t.length;o++){var n=t[o].split("=");2==n.length&&(e[n[0]]=parseFloat(n[1]))}return e.hasOwnProperty("lat")&&e.hasOwnProperty("lon")&&(e.center=[e.lon,e.lat]),e}(),w=new mapboxgl.NavigationControl,y=new mapboxgl.Map({container:"map-canvas",style:"mapbox://styles/"+mapStyle,center:m.center||u.center,zoom:m.zoom||u.zoom,maxZoom:18,dragRotate:!1,keyboard:!1}),k=y.getCanvasContainer(),C=.6,b={width:0,height:0},z={width:322,height:350},x=!1,L=!0,S=!1,M=null,P={coordinate:function(t){var e=Math.pow(10,5),o=function(t){return Math.round(t*e)/e};return o(t[1])+", "+o(t[0])},photo:function(t){var e=t.properties,o="Click or tap to enlarge";return $("<figure>").append($("<img>").attr("src",e.url).attr("title",o).attr("alt",o).click(function(){l(e.url)})).append($("<figcaption>").html(this.coordinate(t.geometry.coordinates)))},photoPreview:function(e,o,n,i){h.empty().removeClass().css(t(e)),void 0!==i&&h.append(i),h.addClass(o).append(n).append(util.html.icon("close",_.closePreview)).show({complete:_.previewShown})}},_={zoomEnd:function(){i(),a()},keyNav:null,mapInteraction:function(t){void 0!==t&&"fit"!=t.reason&&_.closePreview()},windowResize:function(){var t=$("canvas");b.width=t.width(),b.height=t.height()},buttonClick:function(t){window.location.href=$(this).data("link")},mapLink:function(t){var e=y.getCenter(),o=y.getZoom(),n=1/Math.pow(2.3,o)*375e6;window.location.href=$(this).data("link").replace("{lat}",e.lat).replace("{lon}",e.lng).replace("{zoom}",o).replace("{altitude}",n)},photoClick:function(t){P.photoPreview(t,"single",P.photo(t.features[0])),util.log.event(d,"Click Photo Pin")},previewShown:function(){y.on("move",_.mapInteraction)},closePreview:function(){h.hide(),e(!1),y.off("move",_.mapInteraction)},legendToggle:function(){$(this).parents("ul").toggleClass("collapsed"),L=!L,util.setting.showMapLegend=L,util.log.event(d,"Toggle Legend")},clusterClick:function(t){var n=t.features[0].properties,i=y.getZoom(),a=function(){y.easeTo({center:t.lngLat,zoom:18-i<2?18:i+2})};if(n.point_count>20&&i<16)a();else{var l=o(t.lngLat,n.point_count);if(0==l.length)a();else{var r=1,c=$("<div>").addClass("photo-list"),s=$("<div>").addClass("markers"),u=function(t){r+=t,r>l.length?r=1:r<1&&(r=l.length),$("figure",c).hide(),$("i",s).removeClass("selected"),$("figure:nth-child("+r+")",c).show(),$("i:nth-child("+r+")",s).addClass("selected"),util.log.event(d,"Navigate Photo Cluster")},p=function(){u(-1)},h=function(){u(1)};e(!0,h,p);for(var g=0;g<l.length;g++)c.append(P.photo(l[g])),s.append(util.html.icon("place"));$("i:first-child",s).addClass("selected"),P.photoPreview(t,"list",c,$("<nav>").append(util.html.icon("arrow_back",p)).append(s).append(util.html.icon("arrow_forward",h)))}}util.log.event(d,"Click Cluster")}};m.center&&a(),f.click(_.legendToggle),$("nav button.map-link").click(_.mapLink),window.addEventListener("resize",_.windowResize),util.setting.showMapLegend||f.click(),y.addControl(w,"top-right").on("load",function(){$.getJSON("/geo.json",function(t){M=t,p.find("div").html(M.features.length.toString()),c(),s(),_.windowResize()}),post?(post.bounds.sw[0]-=.01,post.bounds.sw[1]-=.01,post.bounds.ne[0]+=.01,post.bounds.ne[1]+=.01,$.getJSON("/"+post.key+"/geo.json",r)):S=!0});var j=function(t){return void 0===t&&(t=""),function(){k.style.cursor=t}}});var util={setting:{save:function(t,e){window.localStorage&&localStorage.setItem(t,e)},load:function(t){return window.localStorage?localStorage.getItem(t):null},set showMapLegend(t){util.setting.save("map-legend",t?"true":"false")},get showMapLegend(){var t=util.setting.load("map-legend");return!t||"true"==t}},html:{icon:function(t,e){var o=$("<i>").addClass("material-icons "+t).text(t);return void 0!==e&&o.click(e),o}},log:{event:function(t,e,o){ga("send","event",t,e,o)}}};
//# sourceMappingURL=/js/maps/mapbox.js.map
