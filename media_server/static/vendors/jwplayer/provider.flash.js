webpackJsonpjwplayer([5],{137:function(e,t,n){"use strict";function r(e){return{bitrate:e.bitrate,label:e.label,width:e.width,height:e.height}}Object.defineProperty(t,"__esModule",{value:!0}),t.qualityLevel=r},138:function(e,t,n){"use strict";function r(e){if(this._currentTextTrackIndex=-1,e){if(this._textTracks?(this._textTracks=P.default.reject(this._textTracks,function(e){if(this.renderNatively&&"nativecaptions"===e._id)return delete this._tracksById[e._id],!0},this),delete this._tracksById.nativemetadata):this._initTextTracks(),e.length){var t=0,n=e.length;for(t;t<n;t++){var r=e[t];if(!r._id){if("captions"===r.kind||"metadata"===r.kind){if(r._id="native"+r.kind,!r.label&&"captions"===r.kind){var i=(0,S.createLabel)(r,this._unknownCount);r.name=i.label,this._unknownCount=i.unknownCount}}else r._id=(0,S.createId)(r,this._textTracks.length);if(this._tracksById[r._id])continue;r.inuse=!0}if(r.inuse&&!this._tracksById[r._id])if("metadata"===r.kind)r.mode="hidden",r.oncuechange=B.bind(this),this._tracksById[r._id]=r;else if(b(r.kind)){var a,s=r.mode;if(r.mode="hidden",!r.cues.length&&r.embedded)continue;if(r.mode=s,this._cuesByTrackId[r._id]&&!this._cuesByTrackId[r._id].loaded){for(var u=this._cuesByTrackId[r._id].cues;a=u.shift();)y(this.renderNatively,r,a);r.mode=s,this._cuesByTrackId[r._id].loaded=!0}w.call(this,r)}}}this.renderNatively&&(this.textTrackChangeHandler=this.textTrackChangeHandler||m.bind(this),this.addTracksListener(this.video.textTracks,"change",this.textTrackChangeHandler),(M.Browser.edge||M.Browser.firefox||M.Browser.safari)&&(this.addTrackHandler=this.addTrackHandler||g.bind(this),this.addTracksListener(this.video.textTracks,"addtrack",this.addTrackHandler))),this._textTracks.length&&this.trigger("subtitlesTracks",{tracks:this._textTracks})}}function i(e){if(this.renderNatively){var t=e===this._itemTracks;t||(0,O.cancelXhr)(this._itemTracks),this._itemTracks=e,e&&(t||(this.disableTextTrack(),E.call(this),this.addTextTracks(e)))}}function a(){return this._currentTextTrackIndex}function s(e){if(!this.renderNatively)return void(this.setCurrentSubtitleTrack&&this.setCurrentSubtitleTrack(e-1));this._textTracks&&(0===e&&P.default.each(this._textTracks,function(e){e.mode=e.embedded?"hidden":"disabled"}),this._currentTextTrackIndex!==e-1&&(this.disableTextTrack(),this._currentTextTrackIndex=e-1,this._textTracks[this._currentTextTrackIndex]&&(this._textTracks[this._currentTextTrackIndex].mode="showing"),this.trigger("subtitlesTrackChanged",{currentTrack:this._currentTextTrackIndex+1,tracks:this._textTracks})))}function u(e){if(e.text&&e.begin&&e.end){var t=e.trackid.toString(),n=this._tracksById&&this._tracksById[t];n||(n={kind:"captions",_id:t,data:[]},this.addTextTracks([n]),this.trigger("subtitlesTracks",{tracks:this._textTracks}));var r;e.useDTS&&(n.source||(n.source=e.source||"mpegts")),r=e.begin+"_"+e.text;var i=this._metaCuesByTextTime[r];if(!i){i={begin:e.begin,end:e.end,text:e.text},this._metaCuesByTextTime[r]=i;var a=(0,O.convertToVTTCues)([i])[0];n.data.push(a)}}}function o(e){this._tracksById||this._initTextTracks();var t=e.track?e.track:"native"+e.type,n=this._tracksById[t],r="captions"===e.type?"Unknown CC":"ID3 Metadata",i=e.cue;if(!n){var a={kind:e.type,_id:t,label:r,embedded:!0};n=C.call(this,a),this.renderNatively||"metadata"===n.kind?this.setTextTracks(this.video.textTracks):_.call(this,[n])}I.call(this,n,i)&&(this.renderNatively||"metadata"===n.kind?y(this.renderNatively,n,i):n.data.push(i))}function c(e){var t=this._tracksById[e.name];if(t){t.source=e.source;for(var n=e.captions||[],r=[],i=!1,a=0;a<n.length;a++){var s=n[a],u=e.name+"_"+s.begin+"_"+s.end;this._metaCuesByTextTime[u]||(this._metaCuesByTextTime[u]=s,r.push(s),i=!0)}i&&r.sort(function(e,t){return e.begin-t.begin});var o=(0,O.convertToVTTCues)(r);Array.prototype.push.apply(t.data,o)}}function l(e,t,n){e&&(d(e,t,n),this.instreamMode||(e.addEventListener?e.addEventListener(t,n):e["on"+t]=n))}function d(e,t,n){e&&(e.removeEventListener?e.removeEventListener(t,n):e["on"+t]=null)}function f(){(0,O.cancelXhr)(this._itemTracks);var e=this._tracksById&&this._tracksById.nativemetadata;(this.renderNatively||e)&&(p(this.renderNatively,this.video.textTracks),e&&(e.oncuechange=null)),this._itemTracks=null,this._textTracks=null,this._tracksById=null,this._cuesByTrackId=null,this._metaCuesByTextTime=null,this._unknownCount=0,this._activeCuePosition=null,this.renderNatively&&(this.removeTracksListener(this.video.textTracks,"change",this.textTrackChangeHandler),p(this.renderNatively,this.video.textTracks))}function h(e){this._cachedVTTCues[e]&&(this._cachedVTTCues[e]={},this._tracksById[e].data=[])}function T(){if(this._textTracks){var e=this._textTracks[this._currentTextTrackIndex];e&&(e.mode="disabled",(e.embedded||"nativecaptions"===e._id)&&(e.mode="hidden"))}}function v(){if(this._textTracks){var e=this._textTracks[this._currentTextTrackIndex];e&&(e.mode="showing")}}function m(){var e=this.video.textTracks,t=P.default.filter(e,function(e){return(e.inuse||!e._id)&&b(e.kind)});if(!this._textTracks||A.call(this,t))return void this.setTextTracks(e);for(var n=-1,r=0;r<this._textTracks.length;r++)if("showing"===this._textTracks[r].mode){n=r;break}n!==this._currentTextTrackIndex&&this.setSubtitlesTrack(n+1)}function g(){this.setTextTracks(this.video.textTracks)}function _(e){var t=this;if(e){this._textTracks||this._initTextTracks();for(var n=0;n<e.length;n++){var r=e[n];if(!r.kind||b(r.kind)){var i=C.call(this,r);w.call(this,i),r.file&&(r.data=[],(0,O.loadFile)(r,function(e){t.addVTTCuesToTrack(i,e)},function(e){t.trigger(j.ERROR,{message:"Captions failed to load",reason:e})}))}}this._textTracks&&this._textTracks.length&&this.trigger("subtitlesTracks",{tracks:this._textTracks})}}function k(e,t){if(this.renderNatively){var n=this._tracksById[e._id];if(!n)return this._cuesByTrackId||(this._cuesByTrackId={}),void(this._cuesByTrackId[e._id]={cues:t,loaded:!1});if(!this._cuesByTrackId[e._id]||!this._cuesByTrackId[e._id].loaded){var r;for(this._cuesByTrackId[e._id]={cues:t,loaded:!0};r=t.shift();)y(this.renderNatively,n,r)}}}function y(e,t,n){if(!M.Browser.ie||!e||!window.TextTrackCue)return void t.addCue(n);var r=new window.TextTrackCue(n.startTime,n.endTime,n.text);t.addCue(r)}function p(e,t){t&&t.length&&P.default.each(t,function(t){if(!(M.Browser.ie&&e&&/^(native|subtitle|cc)/.test(t._id))){t.mode="disabled",t.mode="hidden";for(var n=t.cues.length;n--;)t.removeCue(t.cues[n]);t.embedded||(t.mode="disabled"),t.inuse=!1}})}function b(e){return"subtitles"===e||"captions"===e}function x(){this._textTracks=[],this._tracksById={},this._metaCuesByTextTime={},this._cuesByTrackId={},this._cachedVTTCues={},this._unknownCount=0}function C(e){var t,n=(0,S.createLabel)(e,this._unknownCount),r=n.label;if(this._unknownCount=n.unknownCount,this.renderNatively||"metadata"===e.kind){var i=this.video.textTracks;t=P.default.findWhere(i,{label:r}),t||(t=this.video.addTextTrack(e.kind,r,e.language||"")),t.default=e.default,t.mode="disabled",t.inuse=!0}else t=e,t.data=t.data||[];return t._id||(t._id=(0,S.createId)(e,this._textTracks.length)),t}function w(e){this._textTracks.push(e),this._tracksById[e._id]=e}function E(){if(this._textTracks){var e=P.default.filter(this._textTracks,function(e){return e.embedded||"subs"===e.groupid});this._initTextTracks(),P.default.each(e,function(e){this._tracksById[e._id]=e}),this._textTracks=e}}function B(e){var t=e.currentTarget.activeCues;if(t&&t.length){var n=t[t.length-1].startTime;if(this._activeCuePosition!==n){var r=[];if(P.default.each(t,function(e){e.startTime<n||(e.data||e.value?r.push(e):e.text&&this.trigger("meta",{metadataTime:n,metadata:JSON.parse(e.text)}))},this),r.length){var i=(0,N.parseID3)(r);this.trigger("meta",{metadataTime:n,metadata:i})}this._activeCuePosition=n}}}function I(e,t){var n=e.kind;this._cachedVTTCues[e._id]||(this._cachedVTTCues[e._id]={});var r,i=this._cachedVTTCues[e._id];switch(n){case"captions":case"subtitles":r=Math.floor(20*t.startTime);var a="_"+t.line,s=Math.floor(20*t.endTime),u=i[r+a]||i[r+1+a]||i[r-1+a];return!(u&&Math.abs(u-s)<=1)&&(i[r+a]=s,!0);case"metadata":var o=t.data?new Uint8Array(t.data).join(""):t.text;return r=t.startTime+o,i[r]?!1:(i[r]=t.endTime,!0);default:return!1}}function A(e){if(e.length>this._textTracks.length)return!0;for(var t=0;t<e.length;t++){var n=e[t];if(!n._id||!this._tracksById[n._id])return!0}return!1}Object.defineProperty(t,"__esModule",{value:!0});var O=n(67),S=n(68),N=n(139),M=n(12),j=n(8),L=n(0),P=function(e){return e&&e.__esModule?e:{default:e}}(L),R={_itemTracks:null,_textTracks:null,_tracksById:null,_cuesByTrackId:null,_cachedVTTCues:null,_metaCuesByTextTime:null,_currentTextTrackIndex:-1,_unknownCount:0,_activeCuePosition:null,_initTextTracks:x,addTracksListener:l,clearTracks:f,clearCueData:h,disableTextTrack:T,enableTextTrack:v,getSubtitlesTrack:a,removeTracksListener:d,addTextTracks:_,setTextTracks:r,setupSideloadedTracks:i,setSubtitlesTrack:s,textTrackChangeHandler:null,addTrackHandler:null,addCuesToTrack:c,addCaptionsCue:u,addVTTCue:o,addVTTCuesToTrack:k,renderNatively:!1};t.default=R},139:function(e,t,n){"use strict";function r(e,t){for(var n=e.length,r=void 0,i=void 0,a=void 0,s="",u=t||0;u<n;)if(0!==(r=e[u++])&&3!==r)switch(r>>4){case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:s+=String.fromCharCode(r);break;case 12:case 13:i=e[u++],s+=String.fromCharCode((31&r)<<6|63&i);break;case 14:i=e[u++],a=e[u++],s+=String.fromCharCode((15&r)<<12|(63&i)<<6|(63&a)<<0)}return s}function i(e,t){for(var n=e.length-1,r="",i=t||0;i<n;)254===e[i]&&255===e[i+1]||(r+=String.fromCharCode((e[i]<<8)+e[i+1])),i+=2;return r}function a(e){var t=s(e);return 127&t|(32512&t)>>1|(8323072&t)>>2|(2130706432&t)>>3}function s(e){for(var t="0x",n=0;n<e.length;n++)e[n]<16&&(t+="0"),t+=e[n].toString(16);return parseInt(t)}function u(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]).reduce(function(e,t){if(!("value"in t)&&"data"in t&&t.data instanceof ArrayBuffer){var n=t,s=new Uint8Array(n.data),u=s.length;t={value:{key:"",data:""}};for(var c=10;c<14&&c<s.length&&0!==s[c];)t.value.key+=String.fromCharCode(s[c]),c++;var l=19,d=s[l];3!==d&&0!==d||(d=s[++l],u--);var f=0;if(1!==d&&2!==d)for(var h=l+1;h<u;h++)if(0===s[h]){f=h-l;break}if(f>0){var T=r(s.subarray(l,l+=f),0);if("PRIV"===t.value.key){if("com.apple.streaming.transportStreamTimestamp"===T){var v=1&a(s.subarray(l,l+=4)),m=a(s.subarray(l,l+=4))+(v?4294967296:0);t.value.data=m}else t.value.data=r(s,l+1);t.value.info=T}else t.value.info=T,t.value.data=r(s,l+1)}else{var g=s[l];t.value.data=1===g||2===g?i(s,l+1):r(s,l+1)}}if(o.hasOwnProperty(t.value.key)&&(e[o[t.value.key]]=t.value.data),t.value.info){var _=e[t.value.key];_!==Object(_)&&(_={},e[t.value.key]=_),_[t.value.info]=t.value.data}else e[t.value.key]=t.value.data;return e},{})}Object.defineProperty(t,"__esModule",{value:!0}),t.utf8ArrayToStr=r,t.syncSafeInt=a,t.parseID3=u;var o={TIT2:"title",TT2:"title",WXXX:"url",TPE1:"artist",TP1:"artist",TALB:"album",TAL:"album"}},141:function(e,t,n){"use strict";function r(e,t,n){if(!e)return"";var r=e.bitrate||e.bandwidth;return a(t,r)||e.label||i(e.height,r,n)}function i(e,t,n){if(!e&&!t)return"";var r=u(t)+" kbps",i=r;return e&&(i=e+"p",t&&n&&(i+=" ("+r+")")),i}function a(e,t){var n=null,r=l.default.keys(e);if(t&&e&&r.length){var i=parseFloat(t);isNaN(i)||(n=e[s(r,u(i))])}return n}function s(e,t){var n=null,r=1/0,i=void 0;return l.default.isArray(e)&&l.default.forEach(e,function(e){(i=Math.abs(e-t))<r&&(n=e,r=i)}),n}function u(e){return Math.floor(e/1e3)}function o(e){return!!l.default.isArray(e)&&l.default.some(e,function(e){var t=e.height||e.bitrate||e.bandwidth,n=this[t];return this[t]=1,n},{})}Object.defineProperty(t,"__esModule",{value:!0}),t.generateLabel=r,t.createLabel=i,t.getCustomLabel=a,t.findClosestBandwidth=s,t.toKbps=u,t.hasRedundantLevels=o;var c=n(0),l=function(e){return e&&e.__esModule?e:{default:e}}(c)},142:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t,n){var r=document.createElement("param");r.setAttribute("name",t),r.setAttribute("value",n),e.appendChild(r)}function a(e,t,n){Object.defineProperty(e,t,{get:function(){return n}})}function s(e,t,n,r){var s=void 0,u=!0;if(r=r||"opaque",l.Browser.msie){var d=document.createElement("div");t.appendChild(d),d.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%" id="'+n+'" name="'+n+'" tabindex="0"><param name="movie" value="'+e+'"><param name="allowfullscreen" value="true"><param name="allowscriptaccess" value="always"><param name="wmode" value="'+r+'"><param name="bgcolor" value="'+v+'"><param name="menu" value="false"></object>';for(var h=t.getElementsByTagName("object"),m=h.length;m--;)h[m].id===n&&(s=h[m])}else s=document.createElement("object"),s.setAttribute("type","application/x-shockwave-flash"),s.setAttribute("data",e),s.setAttribute("width","100%"),s.setAttribute("height","100%"),s.setAttribute("bgcolor",v),s.setAttribute("id",n),s.setAttribute("name",n),i(s,"allowfullscreen","true"),i(s,"allowscriptaccess","always"),i(s,"wmode",r),i(s,"menu","false"),t.appendChild(s,t);s.className="jw-swf jw-reset",s.style.display="block",s.style.position="absolute",s.style.left=0,s.style.right=0,s.style.top=0,s.style.bottom=0,l.Browser.ie&&"PointerEvent"in window&&(s.style.pointerEvents="none");var g=-1;a(s,"on",f.default.on),a(s,"once",f.default.once),a(s,"_eventQueue",[]),a(s,"off",function(){var e=Array.prototype.slice.call(arguments);return e.length||(s._eventQueue.length=0,clearTimeout(g)),f.default.off.apply(s,e)}),a(s,"trigger",function(e,t){var n=s._eventQueue;n.push({type:e,json:t}),g>-1||(g=setTimeout(function(){var e=n.length;for(g=-1;e--;){var t=n.shift();if(t.json){var r=JSON.parse(decodeURIComponent(t.json));f.default.trigger.call(s,t.type,r)}else f.default.trigger.call(s,t.type)}}))});var _={};return Object.defineProperty(s,"_events",{get:function(){return _},set:function(e){_=e}}),a(s,"triggerFlash",function(e){if("setupCommandQueue"===e&&(u=!1),"setup"!==e&&u||!s.__externalCall){for(var t=s.__commandQueue,n=t.length;n--;)t[n][0]===e&&t.splice(n,1);return t.push(Array.prototype.slice.call(arguments)),s}var r=Array.prototype.slice.call(arguments,1);try{if(r.length){for(var i=r.length;i--;)"object"===c(r[i])&&T.default.each(r[i],o);var a=JSON.stringify(r);s.__externalCall(e,a)}else s.__externalCall(e)}catch(t){if(console.error(e,t),"setup"===e)return t.name="Failed to setup flash",t}return s}),a(s,"__commandQueue",[]),s}function u(e){e&&e.parentNode&&(e.style.display="none",e.parentNode.removeChild(e),e=null)}function o(e,t,n){e instanceof window.HTMLElement&&delete n[t]}Object.defineProperty(t,"__esModule",{value:!0});var c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.embed=s,t.remove=u;var l=n(12),d=n(7),f=r(d),h=n(0),T=r(h),v="#000000"},40:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e){return e+"_swf_"+p++}function a(e){var t=document.createElement("a");t.href=e.flashplayer;var n=t.host===window.location.host;return l.Browser.chrome&&!n}function s(e,t){function n(){x=setTimeout(function(){_.default.trigger.call(A,"flashBlocked")},4e3),k.once("embedded",function(){s(),_.default.trigger.call(A,"flashUnblocked")},A)}function r(){s(),n()}function s(){clearTimeout(x),window.removeEventListener("focus",r)}function l(e){for(var n=e.levels,r=0;r<n.length;r++){var i=n[r];i.index=r,"Auto"!==i.label&&(i.label=(0,c.generateLabel)(i,t.qualityLabels))}e.levels=w=f(e.levels),e.currentQuality=C=v(w,e.currentQuality)}function f(e){return e.sort(function(e,t){return e.height&&t.height?t.height-e.height:t.bitrate-e.bitrate})}function v(e,t){for(var n=0;n<e.length;n++)if(e[n].index===t)return n}var g,k,p,b=null,x=-1,C=-1,w=null,E=-1,B=null,I=!1,A=this,O=function(){return k&&k.__ready},S=function(){k&&k.triggerFlash.apply(k,arguments)};u(this,_.default,y.default,{preload:function(e){e.preload&&"none"!==e.preload&&!t.autostart&&(b=e)},load:function(e){b=e,this.setState(d.STATE_LOADING),S("load",e),e.sources.length&&"hls"!==e.sources[0].type&&this.sendMediaType(e.sources)},play:function(){S("play")},pause:function(){S("pause"),this.setState(d.STATE_PAUSED)},stop:function(){S("stop"),C=-1,b=null,this.clearTracks(),this.setState(d.STATE_IDLE)},seek:function(e){S("seek",e)},volume:function(e){if(h.default.isNumber(e)){var t=Math.min(Math.max(0,e),100);O()&&S("volume",t)}},mute:function(e){O()&&S("mute",e)},setState:function(){return m.default.setState.apply(this,arguments)},getSwfObject:function(n){var r=n.querySelector("object");return r?(r.off(null,null,this),r):(0,T.embed)(t.flashplayer,n,i(e),t.wmode)},getContainer:function(){return g},setContainer:function(e){if(g!==e){g=e,k=this.getSwfObject(e),document.hasFocus()?n():window.addEventListener("focus",r),k.once("ready",function(){s(),k.once("pluginsLoaded",function(){S("setupCommandQueue",k.__commandQueue),k.__commandQueue.length=0});var e=u({},t),n=k.triggerFlash("setup",e);n===k?k.__ready=!0:this.trigger(d.MEDIA_ERROR,n),b&&S("init",b)},this);var i=[d.MEDIA_ERROR,d.MEDIA_SEEK,d.MEDIA_SEEKED,"subtitlesTrackChanged","mediaType"],o=[d.MEDIA_BUFFER,d.MEDIA_TIME],c=[d.MEDIA_BUFFER_FULL];k.on([d.MEDIA_LEVELS,d.MEDIA_LEVEL_CHANGED].join(" "),function(e){l(e),this.trigger(e.type,e)},this),k.on(d.AUDIO_TRACKS,function(e){E=e.currentTrack,B=e.tracks,this.trigger(e.type,e)},this),k.on(d.AUDIO_TRACK_CHANGED,function(e){E=e.currentTrack,B=e.tracks,this.trigger(e.type,e)},this),k.on(d.PLAYER_STATE,function(e){var t=e.newstate;t!==d.STATE_IDLE&&this.setState(t)},this),k.on(o.join(" "),function(e){"Infinity"===e.duration&&(e.duration=1/0),this.trigger(e.type,e)},this),k.on(i.join(" "),function(e){this.trigger(e.type,e)},this),k.on(c.join(" "),function(e){this.trigger(e.type)},this),k.on(d.MEDIA_BEFORECOMPLETE,function(){this.trigger(d.MEDIA_COMPLETE)},this),k.on("visualQuality",function(e){var t=0;w.length>1&&(t=v(w,e.level.index+1)),e.level=u(e.level,{index:t}),e.reason=e.reason||"api",this.trigger("visualQuality",e),this.trigger("providerFirstFrame",{})},this),k.on(d.PROVIDER_CHANGED,function(e){p=e.message,this.trigger(d.PROVIDER_CHANGED,e)},this),k.on(d.ERROR,function(e){this.trigger(d.MEDIA_ERROR,e)},this),k.on("subtitlesTracks",function(e){this.addTextTracks(e.tracks)},this),k.on("subtitlesTrackData",function(e){this.addCuesToTrack(e)},this),k.on(d.MEDIA_META,function(e){e&&(e.metadata&&"textdata"===e.metadata.type?this.addCaptionsCue(e.metadata):this.trigger(e.type,e))},this),a(t)&&k.on("throttle",function(e){s(),"resume"===e.state?_.default.trigger.call(A,"flashThrottle",e):x=setTimeout(function(){_.default.trigger.call(A,"flashThrottle",e)},250)},this)}},remove:function(){C=-1,w=null,(0,T.remove)(k)},setVisibility:function(e){e=!!e,g.style.opacity=e?1:0},resize:function(e,t,n){n&&S("stretch",n)},setControls:function(e){S("setControls",e)},setFullscreen:function(e){I=e,S("fullscreen",e)},getFullScreen:function(){return I},setCurrentQuality:function(e){S("setCurrentQuality",w[e].index)},getCurrentQuality:function(){return C},setSubtitlesTrack:function(e){S("setSubtitlesTrack",e)},getName:function(){return p?{name:"flash_"+p}:{name:"flash"}},getQualityLevels:function(){return h.default.map(w||b&&b.sources,function(e){return(0,o.qualityLevel)(e)})},getAudioTracks:function(){return B},getCurrentAudioTrack:function(){return E},setCurrentAudioTrack:function(e){S("setCurrentAudioTrack",e)},destroy:function(){s(),this.remove(),k&&(k.off(),k=null),g=null,b=null,this.off()}})}Object.defineProperty(t,"__esModule",{value:!0});var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=n(137),c=n(141),l=n(12),d=n(8),f=n(0),h=r(f),T=n(142),v=n(32),m=r(v),g=n(7),_=r(g),k=n(138),y=r(k),p=0,b=function(){};b.prototype=m.default,s.prototype=new b,s.getName=function(){return{name:"flash"}},t.default=s},58:function(e,t,n){"use strict";function r(e){var t="";return e&&(e.localName?t=e.localName:e.baseName&&(t=e.baseName)),t}function i(e){var t="";return e&&(e.textContent?t=(0,u.trim)(e.textContent):e.text&&(t=(0,u.trim)(e.text))),t}function a(e,t){return e.childNodes[t]}function s(e){return e.childNodes?e.childNodes.length:0}Object.defineProperty(t,"__esModule",{value:!0}),t.localName=r,t.textContent=i,t.getChildNode=a,t.numChildren=s;var u=n(3)},59:function(e,t,n){"use strict";function r(e){var t=[];e=(0,a.trim)(e);var n=e.split("\r\n\r\n");1===n.length&&(n=e.split("\n\n"));for(var r=0;r<n.length;r++)if("WEBVTT"!==n[r]){var s=i(n[r]);s.text&&t.push(s)}return t}function i(e){var t={},n=e.split("\r\n");1===n.length&&(n=e.split("\n"));var r=1;if(n[0].indexOf(" --\x3e ")>0&&(r=0),n.length>r+1&&n[r+1]){var i=n[r],s=i.indexOf(" --\x3e ");s>0&&(t.begin=(0,a.seconds)(i.substr(0,s)),t.end=(0,a.seconds)(i.substr(s+5)),t.text=n.slice(r+1).join("\r\n"))}return t}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var a=n(3)},67:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t,n){e.xhr=v.default.ajax(e.file,function(r){u(r,e,t,n)},n)}function a(e){h.default.each(e,function(e){var t=e.xhr;t&&(t.onload=null,t.onreadystatechange=null,t.onerror=null,"abort"in t&&t.abort()),delete e.xhr})}function s(e){return e.map(function(e){return new l.default(e.begin,e.end,e.text)})}function u(e,t,n,r){var i,a,u=e.responseXML?e.responseXML.firstChild:null;if(u)for("xml"===(0,m.localName)(u)&&(u=u.nextSibling);u.nodeType===u.COMMENT_NODE;)u=u.nextSibling;try{if(u&&"tt"===(0,m.localName)(u))i=(0,y.default)(e.responseXML),a=s(i),delete t.xhr,n(a);else{var c=e.responseText;c.indexOf("WEBVTT")>=0?o().then(function(e){var r=new e(window);a=[],r.oncue=function(e){a.push(e)},r.onflush=function(){delete t.xhr,n(a)},r.parse(c)}).catch(function(e){delete t.xhr,r(e)}):(i=(0,_.default)(c),a=s(i),delete t.xhr,n(a))}}catch(e){delete t.xhr,r(e)}}function o(){return n.e(10).then(function(require){return n(72).default}.bind(null,n)).catch(d.chunkLoadErrorHandler)}Object.defineProperty(t,"__esModule",{value:!0}),t.loadFile=i,t.cancelXhr=a,t.convertToVTTCues=s;var c=n(71),l=r(c),d=n(21),f=n(0),h=r(f),T=n(18),v=r(T),m=n(58),g=n(59),_=r(g),k=n(79),y=r(k)},68:function(e,t,n){"use strict";function r(e,t){var n=e.kind||"cc";return e.default||e.defaulttrack?"default":e._id||e.file||n+t}function i(e,t){var n=e.label||e.name||e.language;return n||(n="Unknown CC",(t+=1)>1&&(n+=" ["+t+"]")),{label:n,unknownCount:t}}Object.defineProperty(t,"__esModule",{value:!0}),t.createId=r,t.createLabel=i},71:function(e,t,n){"use strict";function r(e){return"string"==typeof e&&(!!{"":!0,lr:!0,rl:!0}[e.toLowerCase()]&&e.toLowerCase())}function i(e){return"string"==typeof e&&(!!{start:!0,middle:!0,end:!0,left:!0,right:!0}[e.toLowerCase()]&&e.toLowerCase())}Object.defineProperty(t,"__esModule",{value:!0});var a=window.VTTCue;if(!a){a=function(e,t,n){var a=this;a.hasBeenReset=!1;var s="",u=!1,o=e,c=t,l=n,d=null,f="",h=!0,T="auto",v="start",m=50,g="middle",_=50,k="middle";Object.defineProperty(a,"id",{enumerable:!0,get:function(){return s},set:function(e){s=""+e}}),Object.defineProperty(a,"pauseOnExit",{enumerable:!0,get:function(){return u},set:function(e){u=!!e}}),Object.defineProperty(a,"startTime",{enumerable:!0,get:function(){return o},set:function(e){if("number"!=typeof e)throw new TypeError("Start time must be set to a number.");o=e,this.hasBeenReset=!0}}),Object.defineProperty(a,"endTime",{enumerable:!0,get:function(){return c},set:function(e){if("number"!=typeof e)throw new TypeError("End time must be set to a number.");c=e,this.hasBeenReset=!0}}),Object.defineProperty(a,"text",{enumerable:!0,get:function(){return l},set:function(e){l=""+e,this.hasBeenReset=!0}}),Object.defineProperty(a,"region",{enumerable:!0,get:function(){return d},set:function(e){d=e,this.hasBeenReset=!0}}),Object.defineProperty(a,"vertical",{enumerable:!0,get:function(){return f},set:function(e){var t=r(e);if(!1===t)throw new SyntaxError("An invalid or illegal string was specified.");f=t,this.hasBeenReset=!0}}),Object.defineProperty(a,"snapToLines",{enumerable:!0,get:function(){return h},set:function(e){h=!!e,this.hasBeenReset=!0}}),Object.defineProperty(a,"line",{enumerable:!0,get:function(){return T},set:function(e){if("number"!=typeof e&&"auto"!==e)throw new SyntaxError("An invalid number or illegal string was specified.");T=e,this.hasBeenReset=!0}}),Object.defineProperty(a,"lineAlign",{enumerable:!0,get:function(){return v},set:function(e){var t=i(e);if(!t)throw new SyntaxError("An invalid or illegal string was specified.");v=t,this.hasBeenReset=!0}}),Object.defineProperty(a,"position",{enumerable:!0,get:function(){return m},set:function(e){if(e<0||e>100)throw new Error("Position must be between 0 and 100.");m=e,this.hasBeenReset=!0}}),Object.defineProperty(a,"positionAlign",{enumerable:!0,get:function(){return g},set:function(e){var t=i(e);if(!t)throw new SyntaxError("An invalid or illegal string was specified.");g=t,this.hasBeenReset=!0}}),Object.defineProperty(a,"size",{enumerable:!0,get:function(){return _},set:function(e){if(e<0||e>100)throw new Error("Size must be between 0 and 100.");_=e,this.hasBeenReset=!0}}),Object.defineProperty(a,"align",{enumerable:!0,get:function(){return k},set:function(e){var t=i(e);if(!t)throw new SyntaxError("An invalid or illegal string was specified.");k=t,this.hasBeenReset=!0}}),a.displayState=void 0},a.prototype.getCueAsHTML=function(){return window.WebVTT.convertCueToDOMTree(window,this.text)}}t.default=a},79:function(e,t,n){"use strict";function r(e){i(e);var t=[],n=e.getElementsByTagName("p"),r=30,u=e.getElementsByTagName("tt");if(u&&u[0]){var o=parseFloat(u[0].getAttribute("ttp:frameRate"));isNaN(o)||(r=o)}i(n),n.length||(n=e.getElementsByTagName("tt:p"),n.length||(n=e.getElementsByTagName("tts:p")));for(var c=0;c<n.length;c++){for(var l=n[c],d=l.getElementsByTagName("br"),f=0;f<d.length;f++){var h=d[f];h.parentNode.replaceChild(e.createTextNode("\r\n"),h)}var T=l.innerHTML||l.textContent||l.text||"",v=(0,s.trim)(T).replace(/>\s+</g,"><").replace(/(<\/?)tts?:/g,"$1").replace(/<br.*?\/>/g,"\r\n");if(v){var m=l.getAttribute("begin"),g=l.getAttribute("dur"),_=l.getAttribute("end"),k={begin:(0,s.seconds)(m,r),text:v};_?k.end=(0,s.seconds)(_,r):g&&(k.end=k.begin+(0,s.seconds)(g,r)),t.push(k)}}return t.length||a(),t}function i(e){e||a()}function a(){throw new Error("Invalid DFXP file")}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var s=n(3)}});