(function(){function n(){}function i(e){return t.retinaImageSuffix+e}function s(e,t){this.path=e||"";if(typeof t!=="undefined"&&t!==null){this.at_2x_path=t;this.perform_check=false}else{if(undefined!==document.createElement){var n=document.createElement("a");n.href=this.path;n.pathname=n.pathname.replace(r,i);this.at_2x_path=n.href}else{var s=this.path.split("?");s[0]=s[0].replace(r,i);this.at_2x_path=s.join("?")}this.perform_check=true}}function o(e){this.el=e;this.path=new s(this.el.getAttribute("src"),this.el.getAttribute("data-at2x"));var t=this;this.path.check_2x_variant(function(e){if(e){t.swap()}})}var e=typeof exports==="undefined"?window:exports;var t={retinaImageSuffix:"@2x",check_mime_type:true,force_original_dimensions:true};e.Retina=n;n.configure=function(e){if(e===null){e={}}for(var n in e){if(e.hasOwnProperty(n)){t[n]=e[n]}}};n.init=function(t){if(t===null){t=e}t.addEventListener("load",function(){var e=document.getElementsByTagName("img"),t=e.length,n=[],r,i;for(r=0;r<t;r+=1){i=e[r];if(!!!i.getAttributeNode("data-no-retina")){if(i.src){n.push(new o(i))}}}})};n.isRetina=function(){var t="(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)";if(e.devicePixelRatio>1){return true}if(e.matchMedia&&e.matchMedia(t).matches){return true}return false};var r=/\.[\w\?=]+$/;e.RetinaImagePath=s;s.confirmed_paths=[];s.prototype.is_external=function(){return!!(this.path.match(/^https?\:/i)&&!this.path.match("//"+document.domain))};s.prototype.check_2x_variant=function(e){var n,r=this;if(!this.perform_check&&typeof this.at_2x_path!=="undefined"&&this.at_2x_path!==null){return e(true)}else if(this.at_2x_path in s.confirmed_paths){return e(true)}else if(this.is_external()){return e(false)}else{n=new XMLHttpRequest;n.open("HEAD",this.at_2x_path);n.onreadystatechange=function(){if(n.readyState!==4){return e(false)}if(n.status>=200&&n.status<=399){if(t.check_mime_type){var i=n.getResponseHeader("Content-Type");if(i===null||!i.match(/^image/i)){return e(false)}}s.confirmed_paths.push(r.at_2x_path);return e(true)}else{return e(false)}};n.send()}};e.RetinaImage=o;o.prototype.swap=function(e){function r(){if(!n.el.complete){setTimeout(r,5)}else{if(t.force_original_dimensions){if(n.el.offsetWidth==0&&n.el.offsetHeight==0){n.el.setAttribute("width",n.el.naturalWidth);n.el.setAttribute("height",n.el.naturalHeight)}else{n.el.setAttribute("width",n.el.offsetWidth);n.el.setAttribute("height",n.el.offsetHeight)}}n.el.setAttribute("src",e)}}if(typeof e==="undefined"){e=this.path.at_2x_path}var n=this;r()};if(n.isRetina()){n.init(e)}})()