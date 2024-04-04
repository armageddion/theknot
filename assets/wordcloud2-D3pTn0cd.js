import{g as St,c as Et}from"./index-C4KJ_42Y.js";function Ft(X,Y){for(var A=0;A<Y.length;A++){const w=Y[A];if(typeof w!="string"&&!Array.isArray(w)){for(const W in w)if(W!=="default"&&!(W in X)){const D=Object.getOwnPropertyDescriptor(w,W);D&&Object.defineProperty(X,W,D.get?D:{enumerable:!0,get:()=>w[W]})}}}return Object.freeze(Object.defineProperty(X,Symbol.toStringTag,{value:"Module"}))}var vt={exports:{}};/*!
 * wordcloud2.js
 * http://timdream.org/wordcloud2.js/
 *
 * Copyright 2011 - 2019 Tim Guan-tin Chien and contributors.
 * Released under the MIT license
 */(function(X){window.setImmediate||(window.setImmediate=function(){return window.msSetImmediate||window.webkitSetImmediate||window.mozSetImmediate||window.oSetImmediate||function(){if(!window.postMessage||!window.addEventListener)return null;var w=[void 0],W="zero-timeout-message",D=function(k){var S=w.length;return w.push(k),window.postMessage(W+S.toString(36),"*"),S};return window.addEventListener("message",function(k){if(!(typeof k.data!="string"||k.data.substr(0,W.length)!==W)){k.stopImmediatePropagation();var S=parseInt(k.data.substr(W.length),36);w[S]&&(w[S](),w[S]=void 0)}},!0),window.clearImmediate=function(k){w[k]&&(w[k]=void 0)},D}()||function(w){window.setTimeout(w,0)}}()),window.clearImmediate||(window.clearImmediate=function(){return window.msClearImmediate||window.webkitClearImmediate||window.mozClearImmediate||window.oClearImmediate||function(w){window.clearTimeout(w)}}()),function(Y){var A=function(){var o=document.createElement("canvas");if(!o||!o.getContext)return!1;var x=o.getContext("2d");return!(!x||!x.getImageData||!x.fillText||!Array.prototype.some||!Array.prototype.push)}(),w=function(){if(A){for(var o=document.createElement("canvas").getContext("2d"),x=20,y,e;x;){if(o.font=x.toString(10)+"px sans-serif",o.measureText("Ｗ").width===y&&o.measureText("m").width===e)return x+1;y=o.measureText("Ｗ").width,e=o.measureText("m").width,x--}return 0}}(),W=function(S){if(Array.isArray(S)){var o=S.slice();return o.splice(0,2),o}else return[]},D=function(o){for(var x,y,e=o.length;e;)x=Math.floor(Math.random()*e),y=o[--e],o[e]=o[x],o[x]=y;return o},F={},k=function(o,x){if(!A)return;var y=Math.floor(Math.random()*Date.now());Array.isArray(o)||(o=[o]),o.forEach(function(f,t){if(typeof f=="string"){if(o[t]=document.getElementById(f),!o[t])throw new Error("The element id specified is not found.")}else if(!f.tagName&&!f.appendChild)throw new Error("You must pass valid HTML elements, or ID of the element.")});var e={list:[],fontFamily:'"Trebuchet MS", "Heiti TC", "微軟正黑體", "Arial Unicode MS", "Droid Fallback Sans", sans-serif',fontWeight:"normal",color:"random-dark",minSize:0,weightFactor:1,clearCanvas:!0,backgroundColor:"#fff",gridSize:8,drawOutOfBound:!1,shrinkToFit:!1,origin:null,drawMask:!1,maskColor:"rgba(255,0,0,0.3)",maskGapWidth:.3,wait:0,abortThreshold:0,abort:function(){},minRotation:-Math.PI/2,maxRotation:Math.PI/2,rotationSteps:0,shuffle:!0,rotateRatio:.1,shape:"circle",ellipticity:.65,classes:null,hover:null,click:null};if(x)for(var $ in x)$ in e&&(e[$]=x[$]);if(typeof e.weightFactor!="function"){var mt=e.weightFactor;e.weightFactor=function(t){return t*mt}}if(typeof e.shape!="function")switch(e.shape){case"circle":default:e.shape="circle";break;case"cardioid":e.shape=function(t){return 1-Math.sin(t)};break;case"diamond":e.shape=function(t){var r=t%(2*Math.PI/4);return 1/(Math.cos(r)+Math.sin(r))};break;case"square":e.shape=function(t){return Math.min(1/Math.abs(Math.cos(t)),1/Math.abs(Math.sin(t)))};break;case"triangle-forward":e.shape=function(t){var r=t%(2*Math.PI/3);return 1/(Math.cos(r)+Math.sqrt(3)*Math.sin(r))};break;case"triangle":case"triangle-upright":e.shape=function(t){var r=(t+Math.PI*3/2)%(2*Math.PI/3);return 1/(Math.cos(r)+Math.sqrt(3)*Math.sin(r))};break;case"pentagon":e.shape=function(t){var r=(t+.955)%(2*Math.PI/5);return 1/(Math.cos(r)+.726543*Math.sin(r))};break;case"star":e.shape=function(t){var r=(t+.955)%(2*Math.PI/10);return(t+.955)%(2*Math.PI/5)-2*Math.PI/10>=0?1/(Math.cos(2*Math.PI/10-r)+3.07768*Math.sin(2*Math.PI/10-r)):1/(Math.cos(r)+3.07768*Math.sin(r))};break}e.gridSize=Math.max(Math.floor(e.gridSize),4);var n=e.gridSize,st=n-e.maskGapWidth,U=Math.abs(e.maxRotation-e.minRotation),J=Math.abs(Math.floor(e.rotationSteps)),K=Math.min(e.maxRotation,e.minRotation),O,I,E,H,j,ft,q;function lt(f,t){return"hsl("+(Math.random()*360).toFixed()+","+(Math.random()*30+70).toFixed()+"%,"+(Math.random()*(t-f)+f).toFixed()+"%)"}switch(e.color){case"random-dark":q=function(){return lt(10,50)};break;case"random-light":q=function(){return lt(50,90)};break;default:typeof e.color=="function"&&(q=e.color);break}var Z;typeof e.fontWeight=="function"&&(Z=e.fontWeight);var Q=null;typeof e.classes=="function"&&(Q=e.classes);var V=!1,tt=[],et,dt=function(t){var r=t.currentTarget,a=r.getBoundingClientRect(),s,i;t.touches?(s=t.touches[0].clientX,i=t.touches[0].clientY):(s=t.clientX,i=t.clientY);var l=s-a.left,u=i-a.top,v=Math.floor(l*(r.width/a.width||1)/n),d=Math.floor(u*(r.height/a.height||1)/n);return tt[v][d]},ut=function(t){var r=dt(t);if(et!==r){if(et=r,!r){e.hover(void 0,void 0,t);return}e.hover(r.item,r.dimension,t)}},ct=function(t){var r=dt(t);r&&(e.click(r.item,r.dimension,t),t.preventDefault())},rt=[],wt=function(t){if(rt[t])return rt[t];var r=t*8,a=r,s=[];for(t===0&&s.push([H[0],H[1],0]);a--;){var i=1;e.shape!=="circle"&&(i=e.shape(a/r*2*Math.PI)),s.push([H[0]+t*i*Math.cos(-a/r*2*Math.PI),H[1]+t*i*Math.sin(-a/r*2*Math.PI)*e.ellipticity,a/r*2*Math.PI])}return rt[t]=s,s},at=function(){return e.abortThreshold>0&&new Date().getTime()-ft>e.abortThreshold},pt=function(){return e.rotateRatio===0||Math.random()>e.rotateRatio?0:U===0?K:J>0?K+Math.floor(Math.random()*J)*U/(J-1):K+Math.random()*U},Mt=function(t,r,a,s){var i=e.weightFactor(r);if(i<=e.minSize)return!1;var l=1;i<w&&(l=function(){for(var ot=2;ot*i<w;)ot+=2;return ot}());var u;Z?u=Z(t,r,i,s):u=e.fontWeight;var v=document.createElement("canvas"),d=v.getContext("2d",{willReadFrequently:!0});d.font=u+" "+(i*l).toString(10)+"px "+e.fontFamily;var b=d.measureText(t).width/l,c=Math.max(i*l,d.measureText("m").width,d.measureText("Ｗ").width)/l,m=b+c*2,p=c*3,M=Math.ceil(m/n),P=Math.ceil(p/n);m=M*n,p=P*n;var h=-b/2,g=-c*.4,T=Math.ceil((m*Math.abs(Math.sin(a))+p*Math.abs(Math.cos(a)))/n),C=Math.ceil((m*Math.abs(Math.cos(a))+p*Math.abs(Math.sin(a)))/n),z=C*n,B=T*n;v.setAttribute("width",z),v.setAttribute("height",B),d.scale(1/l,1/l),d.translate(z*l/2,B*l/2),d.rotate(-a),d.font=u+" "+(i*l).toString(10)+"px "+e.fontFamily,d.fillStyle="#000",d.textBaseline="middle",d.fillText(t,h*l,(g+i*.5)*l);var N=d.getImageData(0,0,z,B).data;if(at())return!1;for(var ht=[],G=C,L,it,nt,R=[T/2,C/2,T/2,C/2];G--;)for(L=T;L--;){nt=n;t:for(;nt--;)for(it=n;it--;)if(N[((L*n+nt)*z+(G*n+it))*4+3]){ht.push([G,L]),G<R[3]&&(R[3]=G),G>R[1]&&(R[1]=G),L<R[0]&&(R[0]=L),L>R[2]&&(R[2]=L);break t}}return{mu:l,occupied:ht,bounds:R,gw:C,gh:T,fillTextOffsetX:h,fillTextOffsetY:g,fillTextWidth:b,fillTextHeight:c,fontSize:i}},Tt=function(t,r,a,s,i){for(var l=i.length;l--;){var u=t+i[l][0],v=r+i[l][1];if(u>=I||v>=E||u<0||v<0){if(!e.drawOutOfBound)return!1;continue}if(!O[u][v])return!1}return!0},xt=function(t,r,a,s,i,l,u,v,d,b){var c=a.fontSize,m;q?m=q(s,i,c,l,u,b):m=e.color;var p;Z?p=Z(s,i,c,b):p=e.fontWeight;var M;Q?M=Q(s,i,c,b):M=e.classes,o.forEach(function(P){if(P.getContext){var h=P.getContext("2d"),g=a.mu;h.save(),h.scale(1/g,1/g),h.font=p+" "+(c*g).toString(10)+"px "+e.fontFamily,h.fillStyle=m,h.translate((t+a.gw/2)*n*g,(r+a.gh/2)*n*g),v!==0&&h.rotate(-v),h.textBaseline="middle",h.fillText(s,a.fillTextOffsetX*g,(a.fillTextOffsetY+c*.5)*g),h.restore()}else{var T=document.createElement("span"),C="";C="rotate("+-v/Math.PI*180+"deg) ",a.mu!==1&&(C+="translateX(-"+a.fillTextWidth/4+"px) scale("+1/a.mu+")");var z={position:"absolute",display:"block",font:p+" "+c*a.mu+"px "+e.fontFamily,left:(t+a.gw/2)*n+a.fillTextOffsetX+"px",top:(r+a.gh/2)*n+a.fillTextOffsetY+"px",width:a.fillTextWidth+"px",height:a.fillTextHeight+"px",lineHeight:c+"px",whiteSpace:"nowrap",transform:C,webkitTransform:C,msTransform:C,transformOrigin:"50% 40%",webkitTransformOrigin:"50% 40%",msTransformOrigin:"50% 40%"};m&&(z.color=m),T.textContent=s;for(var B in z)T.style[B]=z[B];if(d)for(var N in d)T.setAttribute(N,d[N]);M&&(T.className+=M),P.appendChild(T)}})},It=function(t,r,a,s,i){if(!(t>=I||r>=E||t<0||r<0)){if(O[t][r]=!1,a){var l=o[0].getContext("2d");l.fillRect(t*n,r*n,st,st)}V&&(tt[t][r]={item:i,dimension:s})}},bt=function(t,r,a,s,i,l){var u=i.occupied,v=e.drawMask,d;v&&(d=o[0].getContext("2d"),d.save(),d.fillStyle=e.maskColor);var b;if(V){var c=i.bounds;b={x:(t+c[3])*n,y:(r+c[0])*n,w:(c[1]-c[3]+1)*n,h:(c[2]-c[0]+1)*n}}for(var m=u.length;m--;){var p=t+u[m][0],M=r+u[m][1];p>=I||M>=E||p<0||M<0||It(p,M,v,b,l)}v&&d.restore()},kt=function f(t){var r,a,s;Array.isArray(t)?(r=t[0],a=t[1]):(r=t.word,a=t.weight,s=t.attributes);var i=pt(),l=W(t),u=Mt(r,a,i,l);if(!u||at())return!1;if(!e.drawOutOfBound&&!e.shrinkToFit){var v=u.bounds;if(v[1]-v[3]+1>I||v[2]-v[0]+1>E)return!1}for(var d=j+1,b=function(p){var M=Math.floor(p[0]-u.gw/2),P=Math.floor(p[1]-u.gh/2),h=u.gw,g=u.gh;return Tt(M,P,h,g,u.occupied)?(xt(M,P,u,r,a,j-d,p[2],i,s,l),bt(M,P,h,g,u,t),!0):!1};d--;){var c=wt(j-d);e.shuffle&&(c=[].concat(c),D(c));var m=c.some(b);if(m)return!0}return e.shrinkToFit?(Array.isArray(t)?t[1]=t[1]*3/4:t.weight=t.weight*3/4,f(t)):!1},_=function(t,r,a){if(r)return!o.some(function(s){var i=new CustomEvent(t,{detail:a||{}});return!s.dispatchEvent(i)},this);o.forEach(function(s){var i=new CustomEvent(t,{detail:a||{}});s.dispatchEvent(i)},this)},Ct=function(){var t=o[0];if(t.getContext)I=Math.ceil(t.width/n),E=Math.ceil(t.height/n);else{var r=t.getBoundingClientRect();I=Math.ceil(r.width/n),E=Math.ceil(r.height/n)}if(_("wordcloudstart",!0)){H=e.origin?[e.origin[0]/n,e.origin[1]/n]:[I/2,E/2],j=Math.floor(Math.sqrt(I*I+E*E)),O=[];var a,s,i;if(!t.getContext||e.clearCanvas)for(o.forEach(function(h){if(h.getContext){var g=h.getContext("2d");g.fillStyle=e.backgroundColor,g.clearRect(0,0,I*(n+1),E*(n+1)),g.fillRect(0,0,I*(n+1),E*(n+1))}else h.textContent="",h.style.backgroundColor=e.backgroundColor,h.style.position="relative"}),a=I;a--;)for(O[a]=[],s=E;s--;)O[a][s]=!0;else{var l=document.createElement("canvas").getContext("2d");l.fillStyle=e.backgroundColor,l.fillRect(0,0,1,1);var u=l.getImageData(0,0,1,1).data,v=t.getContext("2d").getImageData(0,0,I*n,E*n).data;a=I;for(var d,b;a--;)for(O[a]=[],s=E;s--;){b=n;t:for(;b--;)for(d=n;d--;)for(i=4;i--;)if(v[((s*n+b)*I*n+(a*n+d))*4+i]!==u[i]){O[a][s]=!1;break t}O[a][s]!==!1&&(O[a][s]=!0)}v=l=u=void 0}if(e.hover||e.click){for(V=!0,a=I+1;a--;)tt[a]=[];e.hover&&t.addEventListener("mousemove",ut),e.click&&(t.addEventListener("click",ct),t.style.webkitTapHighlightColor="rgba(0, 0, 0, 0)"),t.addEventListener("wordcloudstart",function h(){t.removeEventListener("wordcloudstart",h),t.removeEventListener("mousemove",ut),t.removeEventListener("click",ct),et=void 0})}i=0;var c,m;e.wait!==0?(c=window.setTimeout,m=window.clearTimeout):(c=window.setImmediate,m=window.clearImmediate);var p=function(g,T){o.forEach(function(C){C.addEventListener(g,T)},this)},M=function(g,T){o.forEach(function(C){C.removeEventListener(g,T)},this)},P=function h(){M("wordcloudstart",h),m(F[y])};p("wordcloudstart",P),F[y]=c(function h(){if(i>=e.list.length){m(F[y]),_("wordcloudstop",!1),M("wordcloudstart",P),delete F[y];return}ft=new Date().getTime();var g=kt(e.list[i]),T=!_("wordclouddrawn",!0,{item:e.list[i],drawn:g});if(at()||T){m(F[y]),e.abort(),_("wordcloudabort",!1),_("wordcloudstop",!1),M("wordcloudstart",P),delete F[y];return}i++,F[y]=c(h,e.wait)},e.wait)}};Ct()};k.isSupported=A,k.minFontSize=w,k.stop=function(){if(F)for(var o in F)window.clearImmediate(F[o])},X.exports?X.exports=k:Y.WordCloud=k}(Et)})(vt);var gt=vt.exports;const yt=St(gt),At=Ft({__proto__:null,default:yt},[gt]);export{At as w};