(this["webpackJsonppile-placer"]=this["webpackJsonppile-placer"]||[]).push([[0],{118:function(e,t){},221:function(e,t,c){},222:function(e,t,c){},279:function(e,t){},297:function(e,t,c){"use strict";c.r(t);var n=c(1),a=c.n(n),s=c(109),i=c.n(s),l=c(90),r=(c(221),c(222),c(36)),o=c(26),u=c(3),d=c(15),j={nextPiles:[{distance:null,pile_id:null},{distance:null,pile_id:null}],setNextPiles:Object(o.b)((function(e,t){e.nextPiles=Object(d.a)(t)})),clearPile:Object(o.b)((function(e,t){var c=Object(d.a)(e.nextPiles);c[t]={},e.nextPiles=c})),waypoints:[],setWaypoints:Object(o.b)((function(e,t){e.waypoints=Object(d.a)(t)})),placeWaypoint:Object(o.b)((function(e,t){e.waypoints=e.waypoints.map((function(e){return e.pile_id==t?Object(u.a)(Object(u.a)({},e),{},{placed:!0}):e}))})),unplaceWaypoint:Object(o.b)((function(e,t){e.waypoints=e.waypoints.map((function(e){return e.pile_id==t?Object(u.a)(Object(u.a)({},e),{},{placed:!1}):e}))})),selectedColor:"",setSelectedColor:Object(o.b)((function(e,t){e.selectedColor=t})),center:{heading:0,lat:0,lng:0,truck:[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],distY:[0,0],distX:[0,0]},setCenter:Object(o.b)((function(e,t){e.center=t})),beep:!1,setBeep:Object(o.b)((function(e,t){e.beep=t}))},b=c(8),p=c(37),m=c(45),h=c(10),O=c.n(h),f=c(17),x=c(49),g=c.n(x),v=c(196),N=c.n(v),w="http://".concat(window.location.hostname,":9999"),y=N.a.connect("".concat(w)),k=function(){var e=Object(f.a)(O.a.mark((function e(t){var c,n;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("... setting lat lng"),c="".concat(w,"/api/location"),e.next=4,g.a.post(c,t);case 4:return n=e.sent,e.abrupt("return",n.data);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),S=function(){var e=Object(f.a)(O.a.mark((function e(t){var c,n;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("... setting heading"),c="".concat(w,"/api/heading"),e.next=4,g.a.post(c,t);case 4:return n=e.sent,e.abrupt("return",n.data);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),C=function(){var e=Object(f.a)(O.a.mark((function e(t){var c,n;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("... setting config"),c="".concat(w,"/api/config"),e.next=4,g.a.post(c,t);case 4:return n=e.sent,e.abrupt("return",n.data);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),A=function(){var e=Object(f.a)(O.a.mark((function e(t){var c,n;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("... setting waypoint"),c="".concat(w,"/api/waypoint"),e.next=4,g.a.post(c,t);case 4:return n=e.sent,e.abrupt("return",n.data);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),E=function(){var e=Object(f.a)(O.a.mark((function e(){var t,c;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("... getting laser serial"),t="".concat(w,"/api/laser/serial"),e.next=4,g.a.get(t);case 4:return c=e.sent,e.abrupt("return",c.data);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),F=function(){var e=Object(f.a)(O.a.mark((function e(){var t,c;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("... getting laser serial"),t="".concat(w,"/api/gps/serial"),e.next=4,g.a.get(t);case 4:return c=e.sent,e.abrupt("return",c.data);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),P=function(){var e=Object(f.a)(O.a.mark((function e(t){var c,n;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("... setting laser config"),c="".concat(w,"/api/laser/config"),e.next=4,g.a.post(c,t);case 4:return n=e.sent,e.abrupt("return",n.data);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),H=function(){var e=Object(f.a)(O.a.mark((function e(t){var c,n;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("... setting laser on"),c="".concat(w,"/api/laser/on"),e.next=4,g.a.post(c,t);case 4:return n=e.sent,e.abrupt("return",n.data);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),L=function(){var e=Object(f.a)(O.a.mark((function e(t){var c,n;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("... setting laser blink"),c="".concat(w,"/api/laser/blink"),e.next=4,g.a.post(c,t);case 4:return n=e.sent,e.abrupt("return",n.data);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),M=function(){var e=Object(f.a)(O.a.mark((function e(){var t,c;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("... getting waypoints"),t="".concat(w,"/api/waypoints"),e.next=4,g.a.get(t);case 4:return c=e.sent,e.abrupt("return",c.data);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),T=function(){var e=Object(f.a)(O.a.mark((function e(t,c){var n,a,s;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("... uploading file"),n="".concat(w,"/api/file"),(a=new FormData).append("file",t),a.append("code",c),e.next=7,g.a.post(n,a,{headers:{"Content-Type":"multipart/form-data"}});case 7:return s=e.sent,e.abrupt("return",s.data);case 9:case"end":return e.stop()}}),e)})));return function(t,c){return e.apply(this,arguments)}}(),W=c(2),B=function(){var e=Object(n.useState)(""),t=Object(b.a)(e,2),c=t[0],a=t[1],s=Object(n.useState)("Nothing selected yet"),i=Object(b.a)(s,2),l=i[0],o=i[1],u=Object(n.useState)({}),d=Object(b.a)(u,2),j=d[0],h=d[1],O=Object(r.g)();Object(n.useEffect)((function(){document.querySelector(".file-input").addEventListener("change",(function(e){var t=e.target.files[0],c=e.target.files[0].name;a(t),o(c)}),!1)}),[]);return Object(W.jsxs)("div",{className:"columns",children:[Object(W.jsx)("div",{className:"column file has-name",children:Object(W.jsxs)("label",{className:"file-label",children:[Object(W.jsx)("input",{className:"file-input",type:"file",accept:".csv, .xlsx"}),Object(W.jsxs)("span",{className:"file-cta",children:[Object(W.jsx)("span",{className:"file-icon",children:Object(W.jsx)(m.a,{icon:p.l})}),Object(W.jsx)("span",{className:"file-label",children:"Choose a file ..."})]}),Object(W.jsx)("span",{className:"file-name",children:l})]})}),Object(W.jsx)("div",{className:"column",children:c?Object(W.jsx)("div",{className:"is-flex is-justify-content-center",children:Object(W.jsx)("button",{className:"button is-outlined is-success",onClick:function(){T(c).then((function(e){h(e),setTimeout((function(){O.push("/map")}),1e3)})).catch((function(){return h({message:!1})}))},children:"Upload"})}):""}),Object(W.jsx)("div",{className:"column",children:j.message?Object(W.jsxs)("div",{className:"is-flex is-align-content-center is-flex-direction-column",children:[Object(W.jsx)("p",{className:j.message?"has-text-success":"has-text-fail",children:j.message?"Success":"Fail"}),Object(W.jsxs)("p",{children:["Waypoints: ",j.rows]})]}):""})]})},_=function(e){var t=e.label,c=e.value,n=e.placeholder,a=e.changeHandler,s=e.size,i=void 0===s?"is-normal":s;return Object(W.jsxs)("div",{className:"field column",children:[Object(W.jsx)("label",{className:"label",children:t}),Object(W.jsx)("p",{className:"control",children:Object(W.jsx)("input",{className:"input ".concat(i),type:"number",step:.1,placeholder:n,onChange:function(e){return a(e.target.value)},value:c})})]})},z=function(e,t){var c=Object(n.useState)((function(){try{var c=window.localStorage.getItem(e);return c?JSON.parse(c):t}catch(n){return console.log(n),t}})),a=Object(b.a)(c,2),s=a[0],i=a[1];return[s,function(t){try{var c=t instanceof Function?t(s):t;i(c),window.localStorage.setItem(e,JSON.stringify(c))}catch(n){console.log(n)}}]},Y=function(e){var t={};return e.forEach((function(e){var c,n,a;t[null===(c=e.color)||void 0===c?void 0:c.trim()]?t[null===(n=e.color)||void 0===n?void 0:n.trim()]+=1:t[null===(a=e.color)||void 0===a?void 0:a.trim()]=1})),t},G=function(e){var t={};return e.forEach((function(e){var c,n,a;e.placed&&(t[null===(c=e.color)||void 0===c?void 0:c.trim()]?t[null===(n=e.color)||void 0===n?void 0:n.trim()]+=1:t[null===(a=e.color)||void 0===a?void 0:a.trim()]=1)})),t},I={black:[0,0,0],blue:[0,0,255],brown:[165,42,42],darkblue:[0,0,139],green:[0,255,0],lightblue:[135,206,235],lightgreen:[144,238,144],orange:[255,165,0],pink:[255,105,180],purple:[128,0,128],red:[255,0,0],white:[255,255,255],yellow:[255,255,0]},J={black:[0,0,0,128],blue:[0,0,255,128],brown:[165,42,42,128],darkblue:[0,0,139,128],green:[0,255,0,128],lightblue:[135,206,235,128],lightgreen:[144,238,144,128],orange:[255,165,0,128],pink:[255,105,180,128],purple:[128,0,128,128],red:[255,0,0,128],white:[255,255,255,128],yellow:[255,255,0,128]},X=c.p+"static/media/epsg_codes.c38b8103.pdf",R=c.p+"static/media/marooka-size.51b49781.png",Z=c.p+"static/media/marooka-side.6ce15895.png",D=function(){var e=z("config",{}),t=Object(b.a)(e,2),c=t[0],a=t[1],s=Object(n.useState)(c.truckLen),i=Object(b.a)(s,2),l=i[0],r=i[1],o=Object(n.useState)(c.truckWid),u=Object(b.a)(o,2),d=u[0],j=u[1],h=Object(n.useState)(c.truckHei),O=Object(b.a)(h,2),f=O[0],x=O[1],g=Object(n.useState)(c.antennaX),v=Object(b.a)(g,2),N=v[0],w=v[1],y=Object(n.useState)(c.antennaY),k=Object(b.a)(y,2),S=k[0],A=k[1],E=Object(n.useState)(c.bay1),F=Object(b.a)(E,2),P=F[0],H=F[1],L=Object(n.useState)(c.bay2),M=Object(b.a)(L,2),T=M[0],Y=M[1],G=Object(n.useState)(c.laserX),I=Object(b.a)(G,2),J=I[0],D=I[1],U=Object(n.useState)(c.laserY),V=Object(b.a)(U,2),q=V[0],Q=V[1],K=Object(n.useState)(c.laserZ),$=Object(b.a)(K,2),ee=$[0],te=$[1],ce=Object(n.useState)(c.laserScale),ne=Object(b.a)(ce,2),ae=ne[0],se=ne[1],ie=Object(n.useState)(c.reference),le=Object(b.a)(ie,2),re=le[0],oe=le[1],ue=Object(n.useState)(c.epsg),de=Object(b.a)(ue,2),je=de[0],be=de[1],pe=Object(n.useState)(""),me=Object(b.a)(pe,2),he=me[0],Oe=me[1];return Object(W.jsx)("div",{className:"container",children:Object(W.jsxs)("div",{className:"columns",children:[Object(W.jsxs)("div",{className:"column",children:[Object(W.jsxs)("div",{className:"columns",children:[Object(W.jsx)(_,{label:"Truck length",value:l,placeholder:"E.g: 5",changeHandler:r}),Object(W.jsx)(_,{label:"Truck width",value:d,placeholder:"E.g: 5",changeHandler:j}),Object(W.jsx)(_,{label:"Truck height",value:f,placeholder:"E.g: 5",changeHandler:x})]}),Object(W.jsxs)("div",{className:"columns",children:[Object(W.jsx)(_,{label:"Antenna from left",value:N,placeholder:"E.g: 5",changeHandler:w}),Object(W.jsx)(_,{label:"Antenna from truck head",value:S,placeholder:"E.g: 5",changeHandler:A})]}),Object(W.jsxs)("div",{className:"columns",children:[Object(W.jsx)(_,{label:"Bay 1 from truck head",value:P,placeholder:"E.g: 5",changeHandler:H}),Object(W.jsx)(_,{label:"Bay 2 from truck head",value:T,placeholder:"E.g: 5",changeHandler:Y})]}),Object(W.jsx)("hr",{style:{margin:".25em"}}),Object(W.jsxs)("div",{className:"",children:[Object(W.jsx)("h2",{className:"has-text-centered",children:"Laser distances (ft)"}),Object(W.jsxs)("div",{className:"columns",children:[Object(W.jsx)(_,{label:"From left",value:J,placeholder:"E.g: 5",changeHandler:D}),Object(W.jsx)(_,{label:"From head",value:q,placeholder:"E.g: 5",changeHandler:Q}),Object(W.jsx)(_,{label:"From ground",value:ee,placeholder:"E.g: 5",changeHandler:te}),Object(W.jsxs)("div",{className:"field column",children:[Object(W.jsx)("label",{className:"label",children:"Reference"}),Object(W.jsx)("div",{className:"control",children:Object(W.jsx)("div",{className:"select",children:Object(W.jsxs)("select",{onChange:function(e){return oe(e.target.value)},children:[Object(W.jsx)("option",{value:"bay1",children:"Bay 1"}),Object(W.jsx)("option",{value:"bay2",children:"Bay 2"})]})})})]}),Object(W.jsx)(_,{label:"Scale",value:ae,placeholder:"E.g: 1",changeHandler:se})]})]}),Object(W.jsxs)("div",{className:"columns",children:[Object(W.jsx)(_,{label:"EPSG code",value:je,placeholder:"E.g: 6588",changeHandler:be}),Object(W.jsxs)("div",{className:"column is-flex-direction-column is-flex is-flex-centered",children:[Object(W.jsx)("p",{className:"heading has-text-link",children:"EPSG Reference"}),Object(W.jsx)("a",{href:X,target:"blank",className:"has-text-white title is-2",children:Object(W.jsx)(m.a,{icon:p.b})})]}),Object(W.jsxs)("div",{className:"column is-flex-direction-column is-flex is-flex-centered",children:[Object(W.jsx)("p",{className:"heading has-text-link",children:"EPSG Browser"}),Object(W.jsx)("a",{href:"https://epsg.io/",target:"blank",className:"has-text-white title is-2",children:Object(W.jsx)(m.a,{icon:p.i})})]}),Object(W.jsxs)("div",{className:"column is-flex is-justify-content-center is-align-content-center",children:[Object(W.jsx)("button",{className:"button ml-2",onClick:function(){var e={truckLen:l,truckWid:d,truckHei:f,antennaX:N,antennaY:S,bay1:P,bay2:T,epsg:je,laserX:J,laserY:q,laserZ:ee,laserScale:ae,reference:re};a(e),C(e).then((function(){return Oe("Success")})).catch((function(){return Oe("Fail")}))},children:"Save"}),Object(W.jsx)("p",{className:"success ml-2 ".concat("Success"==he?"has-text-success":"has-text-danger"),children:he})]})]}),Object(W.jsx)("hr",{style:{margin:".5em"}}),Object(W.jsx)(B,{})]}),Object(W.jsxs)("div",{className:"column is-centered has-text-centered",children:[Object(W.jsx)("img",{src:R}),Object(W.jsx)("img",{src:Z})]})]})})},U=c(309),V=c(207),q=c(315),Q=c(313),K=c(311),$=c(316),ee=c(203),te=c.p+"static/media/1.2999e734.mp3",ce=c.p+"static/media/2.c90484f3.mp3",ne=c.p+"static/media/3.451a053d.mp3",ae=c.p+"static/media/4.3d33a969.mp3",se=c.p+"static/media/5.0b9156e3.mp3",ie=c.p+"static/media/6.52edbbb5.mp3",le=c.p+"static/media/7.b473eb3a.mp3",re=c.p+"static/media/8.55fb2017.mp3",oe=c.p+"static/media/9.308dc1bf.mp3",ue=c.p+"static/media/10.1fbcf1e7.mp3",de=c.p+"static/media/black.67345e6d.mp3",je=c.p+"static/media/blue.603a17d2.mp3",be=c.p+"static/media/brown.aa74bbbb.mp3",pe=c.p+"static/media/darkblue.587d78fd.mp3",me=c.p+"static/media/lightblue.9a9ee83a.mp3",he=c.p+"static/media/lightgreen.d7c408fe.mp3",Oe=c.p+"static/media/orange.42e333b5.mp3",fe=c.p+"static/media/pink.f914d206.mp3",xe=c.p+"static/media/purple.8e39b00d.mp3",ge=c.p+"static/media/red.d598f0dc.mp3",ve=c.p+"static/media/white.a09c2726.mp3",Ne=c.p+"static/media/yellow.1d5be675.mp3",we=c.p+"static/media/green.8c2c03a6.mp3",ye=c.p+"static/media/purplewhite.08127fb1.mp3",ke=c.p+"static/media/brownwhite.f5c411c7.mp3",Se=c.p+"static/media/left_bay.ba74ee7d.mp3",Ce=c.p+"static/media/right_bay.0fce9298.mp3",Ae=c.p+"static/media/next_pile.aa5d59d6.mp3",Ee=c.p+"static/media/1beep.02416d27.mp3",Fe=c.p+"static/media/2beep.44a9a09a.mp3",Pe=c.p+"static/media/4beep.511984ec.mp3",He=c.p+"static/media/8beep.4d330e41.mp3",Le=c.p+"static/media/ibeep.98e6c448.mp3",Me=(new Audio(te),new Audio(ce),new Audio(ne),new Audio(ae),new Audio(se),new Audio(ie),new Audio(le),new Audio(re),new Audio(oe),new Audio(ue),{leftBay:new Audio(Se),rightBay:new Audio(Ce),nextPile:new Audio(Ae)}),Te={black:new Audio(de),blue:new Audio(je),brown:new Audio(be),darkblue:new Audio(pe),lightblue:new Audio(me),lightgreen:new Audio(he),orange:new Audio(Oe),pink:new Audio(fe),purple:new Audio(xe),red:new Audio(ge),white:new Audio(ve),yellow:new Audio(Ne),green:new Audio(we),purplewhite:new Audio(ye),brownwhite:new Audio(ke)},We={far:new Audio(Ee),close:new Audio(Fe),closer:new Audio(Pe),closest:new Audio(He),target:new Audio(Le)},Be=function(e){Me[e]&&Me[e].play()},_e=function(e){Te[e]&&Te[e].play()},ze=c(125),Ye=c.n(ze),Ge=c.p+"static/media/marooka-top.0316a837.bmp";Ye.a.workerClass=c(278).default;var Ie={longitude:-122.123801,latitude:37.893394,zoom:21,maxZoom:21,pitch:60,bearing:0},Je=function(){var e=Object(o.e)((function(e){return e.center})),t=Object(o.d)((function(e){return e.setCenter})),c=Object(o.e)((function(e){return e.beep})),a=Object(o.d)((function(e){return e.setBeep})),s=Object(n.useState)(Ie),i=Object(b.a)(s,2),l=i[0],r=i[1],j=Object(n.useState)(!0),p=Object(b.a)(j,2),m=p[0],h=p[1],O=Object(n.useState)(),f=Object(b.a)(O,2),x=f[0],g=f[1],v=Object(n.useState)([{lat:0,lng:0},{lat:0,lng:0},{lat:0,lng:0},{lat:0,lng:0}]),N=Object(b.a)(v,2),w=N[0],k=N[1],S=Object(n.useState)({}),C=Object(b.a)(S,2),E=C[0],F=C[1],P=Object(n.useState)([{lat:0,lng:0},{lat:0,lng:0}]),H=Object(b.a)(P,2),L=H[0],T=H[1],B=Object(o.e)((function(e){return e.nextPiles})),_=Object(o.d)((function(e){return e.setNextPiles})),Y=Object(o.e)((function(e){return e.waypoints})),G=Object(o.d)((function(e){return e.setWaypoints})),X=Object(o.d)((function(e){return e.placeWaypoint})),R=Object(o.d)((function(e){return e.unplaceWaypoint})),Z=z("debugCenter",{lat:0,lng:0}),D=Object(b.a)(Z,2),te=(D[0],D[1],Object(o.e)((function(e){return e.selectedColor}))),ce=function(){y.on("message",(function(e){var c=JSON.parse(e);t(c),r(Object(u.a)(Object(u.a)({},l),{},{longitude:parseFloat(c.lng),latitude:parseFloat(c.lat),bearing:parseFloat(c.heading)})),k([{lat:c.truck[0][0],lng:c.truck[0][1]},{lat:c.truck[1][0],lng:c.truck[1][1]},{lat:c.truck[2][0],lng:c.truck[2][1]},{lat:c.truck[3][0],lng:c.truck[3][1]},{lat:c.truck[0][0],lng:c.truck[0][1]}]),T([{lat:c.bays[0][0],lng:c.bays[0][1]},{lat:c.bays[1][0],lng:c.bays[1][1]}]),F([{from:[c.truck[4][1],c.truck[4][0]],to:[c.truck[5][1],c.truck[5][0]]}])}))};Object(n.useEffect)((function(){return M().then((function(c){G(c.waypoints.map((function(e){return Object(u.a)(Object(u.a)({},e),{},{selected:!0})}))),g(c.guides),console.log(c.guides),c.waypoints.length>0&&(t(Object(u.a)(Object(u.a)({},e),c.waypoints[0])),r(Object(u.a)(Object(u.a)({},l),{},{latitude:c.waypoints[0].lat,longitude:c.waypoints[0].lng})))})),ce(),function(){y.off("message")}}),[]);var ne=function(e,t){if(e.length>0){var c=function(e,t){var c,n,a,s,i=1e4,l=1e4;return e.forEach((function(e){e.placed||te!=e.color&&""!=te||(c=Math.pow(e.lat-t[0].lat,2)+Math.pow(e.lng-t[0].lng,2),n=Math.pow(e.lat-t[1].lat,2)+Math.pow(e.lng-t[1].lng,2),c<i&&(i=c,a=e),n<l&&(l=n,s=e))})),a==s&&(i<l?s={lat:0,lng:0}:a={lat:0,lng:0}),[a,s]}(e,t);_(c),A(c),console.log("... getting colors");var n=0;try{var a=e.filter((function(e){return e.pile_id==c[0].pile_id}))[0].color.trim();Be("leftBay"),setTimeout((function(){return _e(a)}),1e3),n=2e3}catch(i){console.log("error left color")}try{var s=e.filter((function(e){return e.pile_id==c[1].pile_id}))[0].color.trim();setTimeout((function(){return Be("rightBay")}),0+n),setTimeout((function(){return _e(s)}),1e3+n)}catch(l){console.log("error right color")}}};Object(n.useEffect)((function(){if(Object.keys(e).includes("distance")){var t=Object(d.a)(B);t[0].distance=e.distance[0],t[1].distance=e.distance[1],_(t)}}),[e]),Object(n.useEffect)((function(){m?(y.off("message"),ce()):y.off("message")}),[m]),Object(n.useEffect)((function(){G(Y.map((function(e){return Object(u.a)(Object(u.a)({},e),{},{selected:e.color==te||""==te})})))}),[te]);return Object(W.jsxs)(W.Fragment,{children:[Object(W.jsx)("div",{className:"container map",children:Object(W.jsxs)(U.a,{initialViewState:l,controller:!0,getTooltip:function(e){var t=e.object;return t&&"Code: ".concat(t.pile_id,"\nColor: ").concat(t.color,"\n").concat(t.placed?"Placed":"Not Placed")},children:[Object(W.jsx)(ee.a,{mapboxApiAccessToken:"pk.eyJ1Ijoia20xMTVmcmFuY28iLCJhIjoiY2t0eXQ3cHBhMGI3aTMxcG14dnN0OHJveSJ9.LWxkBiVPF9UfGWMI4sWakQ"}),Object(W.jsx)(V.a,{x:"80%",y:"80%",height:"15%",width:"15%",clear:!0,controller:!0}),Object(W.jsx)(q.a,{lineWidthMaxPixels:3,lineWidthMinPixels:2,getRadius:function(e){return e.selected?e.placed?.3:1:.01},data:Y,getPosition:function(e){return[e.lng,e.lat]},getColor:function(e){return I[e.color]},getFillColor:function(e){return J[e.color]},getLineColor:function(e){return I[e.color]},filled:!0,stroked:!0,pickable:!0,opacity:.8,onClick:function(e){var t=e.object.pile_id;e.object.placed?R(t):X(t)}}),Object(W.jsx)(Q.a,{bounds:[[w[3].lng,w[3].lat,0],[w[0].lng,w[0].lat,0],[w[1].lng,w[1].lat,0],[w[2].lng,w[2].lat,0]],image:Ge}),Object(W.jsx)(q.a,{lineWidthMaxPixels:2,lineWidthMinPixels:1,getRadius:.3,data:[{coordinates:[parseFloat(e.lng),parseFloat(e.lat)],color:I.black,height:10},{coordinates:[e.truck[14][1],e.truck[14][0]],color:I.green,height:10},{coordinates:[L[0].lng,L[0].lat],color:I.red,height:0},{coordinates:[L[1].lng,L[1].lat],color:I.red,height:0}],getPosition:function(e){return e.coordinates},getColor:function(e){return e.color},filled:!1,stroked:!0}),Object(W.jsx)(K.a,{data:[{contour:[[w[0].lng,w[0].lat],[w[1].lng,w[1].lat],[w[2].lng,w[2].lat],[w[3].lng,w[3].lat]]}],stroked:!0,filled:!0,wireframe:!0,extruded:!0,lineWidthMinPixels:1,getPolygon:function(e){return e.contour},getFillColor:J.lightgreen,getLineColor:I.lightgreen,getLineWidth:.1,getElevation:.5}),Object(W.jsx)($.a,{data:E,widthUnits:"meters",getWidth:.3,getSourcePosition:function(e){return e.from},getTargetPosition:function(e){return e.to},getColor:[20,140,0]}),Object(W.jsx)($.a,{data:x,widthUnits:"meters",getWidth:.1,getSourcePosition:function(e){return e.from},getTargetPosition:function(e){return e.to},getColor:[20,140,0,100]})]})}),Object(W.jsxs)("div",{className:"columns mt-3 has-text-link ",children:[Object(W.jsx)("div",{className:"column is-flex is-flex-centered m-0 p-0",children:Object(W.jsxs)("p",{className:"heading has-text-centered m-0 p-0 f-3",children:["Lat: ",parseFloat(e.lat).toFixed(7)]})}),Object(W.jsx)("div",{className:"column is-flex is-flex-centered m-0 p-0",children:Object(W.jsxs)("p",{className:"heading has-text-centered m-0 p-0 f-3",children:["Lng: ",parseFloat(e.lng).toFixed(7)]})}),Object(W.jsx)("div",{className:"column is-flex is-flex-centered m-0 p-0",children:Object(W.jsxs)("p",{className:"heading has-text-centered m-0 p-0 f-3",children:["Hdg: ",parseFloat(e.heading).toFixed(1),"\u0970"]})}),Object(W.jsxs)("div",{className:"column is-flex is-flex-centered m-0 p-0",children:[Object(W.jsx)("button",{className:"button is-outlined ml-2 mr-2 ".concat(m?"is-success":"is-warning"),onClick:function(){return h(!m)},children:m?"Auto center enabled":"Auto center not enabled"}),Object(W.jsx)("button",{className:"button is-outlined is-success ml-2 mr-2",onClick:function(){return ne(Y,L)},disabled:L[0].lat==L[1].lat&&L[0].lng==L[1].lng,children:"Get nearest piles"}),Object(W.jsx)("button",{className:"button is-outlined ".concat(c?"is-success":"is-danger"),onClick:function(){return a(!c)},children:"Beep"})]})]})]})},Xe=function(e){var t,c,a=e.index,s=Object(o.e)((function(e){return e.nextPiles})),i=Object(o.e)((function(e){return e.center})),l=Object(o.e)((function(e){return e.beep})),r=Object(o.d)((function(e){return e.placeWaypoint})),u=Object(o.d)((function(e){return e.clearPile})),d=Object(n.useState)(0),j=Object(b.a)(d,2),h=j[0],O=j[1],f=Object(n.useState)("red"),x=Object(b.a)(f,2),g=x[0],v=x[1],N=s[a];return Object(n.useEffect)((function(){if(void 0!==i.distY){var e=Math.abs(i.distY[a]);e>25&&(v("is-danger"),O(1)),e<15&&(v("is-warning"),O(2)),e<6&&(v("is-success"),O(3)),l&&function(e){console.log("PLay sound",e);var t=25,c=17,n=10,a=3;e>=t&&We.far.play(),e<t&&e>=c&&We.close.play(),e<c&&e>=n&&We.closer.play(),e<n&&e>=a&&We.closest.play(),e<a&&We.target.play()}(e)}}),[N.distance]),Object(W.jsx)("div",{className:"column",children:N.pile_id&&Object(W.jsxs)(W.Fragment,{children:[Object(W.jsxs)("div",{className:"is-flex has-text-centered is-flex-direction-column is-align-content-center mb-4",children:[Object(W.jsxs)("p",{className:"heading title is-5",children:["Id: ",N.pile_id]}),Object(W.jsxs)("p",{className:"heading f-4",children:["Lat ",null===(t=N.lat)||void 0===t?void 0:t.toFixed(8)]}),Object(W.jsxs)("p",{className:"heading f-4",children:["Lng ",null===(c=N.lng)||void 0===c?void 0:c.toFixed(8)]}),Object(W.jsxs)("p",{className:"heading f-4",children:["N ",N.x]}),Object(W.jsxs)("p",{className:"heading f-4",children:["E ",N.y]})]}),Object(W.jsx)("div",{className:"flag-icon color_red",onClick:function(){Be(0==a?"leftBay":"rightBay"),setTimeout((function(){var e;_e(null===(e=N.color)||void 0===e?void 0:e.trim())}),1e3)},children:Object(W.jsx)(m.a,{icon:p.c,color:N.color})}),Object(W.jsx)("p",{className:"heading has-text-centered",children:N.color}),Object(W.jsxs)("p",{className:"title is-3 has-text-centered mt-3 mb-4",children:[void 0!==i.distY&&Math.abs(i.distY[a]).toFixed(1)," ","ft"]}),Object(W.jsx)("progress",{className:"progress rotate ".concat(g),max:"3",value:h}),Object(W.jsx)("div",{className:"is-flex is-flex-centered",children:Object(W.jsx)("button",{onClick:function(){r(N.pile_id),u(a)},className:"button is-outlined is-success",children:"Place"})})]})})},Re=function(){var e=Object(o.e)((function(e){return e.waypoints})),t=Object(o.e)((function(e){return e.center})),c=Object(o.e)((function(e){return e.selectedColor})),a=Object(o.d)((function(e){return e.setSelectedColor})),s=Object(n.useState)(Y(e)),i=Object(b.a)(s,2),l=i[0],r=i[1],u=Object(n.useState)(G(e)),d=Object(b.a)(u,2),j=d[0],h=d[1];return Object(n.useEffect)((function(){r(Y(e)),h(G(e))}),[e]),Object(W.jsxs)(W.Fragment,{children:[Object(W.jsx)("hr",{className:"m-0 p-0 mb-4"}),Object(W.jsxs)("div",{className:"columns",children:[Object(W.jsxs)("div",{className:"column is-flex is-flex-direction-column is-flex-centered",children:[Object(W.jsx)(m.a,{onClick:function(){return a("")},icon:p.d,className:"is-size-3",color:c}),Object(W.jsx)("p",{className:"heading has-text-centered has-text-link is-size-5 m-0 p-0",children:"Placed"}),Object(W.jsxs)("p",{className:"heading has-text-centered has-text-success is-size-5 m-0 p-0",children:[e.filter((function(e){return e.placed})).length," / ",e.length]})]}),Object(W.jsxs)("div",{className:"column is-four-fifths",children:[Object(W.jsx)("div",{className:"columns",children:Object.keys(l).map((function(e){return Object(W.jsxs)("div",{className:"column has-text-centered m-0 p-0","aria-label":e,children:[Object(W.jsxs)("p",{className:"is-size-7 m-0 p-0",children:[j[e]?j[e]:0," / ",l[e]]}),Object(W.jsx)(m.a,{icon:p.c,onClick:function(){return a(e)},color:e,className:"is-size-3"}),Object(W.jsxs)("p",{children:[(100*(j[e]?j[e]:0)/l[e]).toFixed()," %"]})]})}))}),Object(W.jsx)("hr",{className:"m-0 p-0"}),Object(W.jsx)("p",{className:"has-text-centered",style:{color:c},children:""==c?"No layer selected":c})]}),Object(W.jsxs)("div",{className:"column is-centered has-text-centered",children:[Object(W.jsx)(m.a,{icon:p.e,transform:{rotate:t.heading-45},className:"has-text-white is-size-1"}),Object(W.jsx)("p",{className:"is-size-4",children:t.heading})]})]})]})},Ze=function(){return Object(W.jsxs)("div",{className:"container is-fullwidth",children:[Object(W.jsxs)("div",{className:"columns p-0 m-0",children:[Object(W.jsx)(Xe,{index:0}),Object(W.jsx)("div",{className:"column is-three-fifths p-0 m-0",children:Object(W.jsx)(Je,{})}),Object(W.jsx)(Xe,{index:1})]}),Object(W.jsx)(Re,{})]})},De=function(e){var t=e.name,c=e.icon,n=Object(r.h)().pathname.includes(t.toLowerCase());return Object(W.jsx)("li",{className:n?"is-active":"",children:Object(W.jsxs)(l.b,{to:"/".concat(t.toLowerCase()),className:"mr-4 ml-4",children:[Object(W.jsx)("span",{className:"icon is-small",children:Object(W.jsx)(m.a,{icon:c})}),Object(W.jsx)("span",{children:t})]})})},Ue=function(){return Object(W.jsx)("div",{className:"tabs is-centered m-0",children:Object(W.jsxs)("ul",{children:[Object(W.jsx)(De,{name:"Map",icon:p.f}),Object(W.jsx)(De,{name:"Config",icon:p.k}),Object(W.jsx)(De,{name:"Debug",icon:p.a}),Object(W.jsx)(De,{name:"Laser",icon:p.j}),Object(W.jsx)(De,{name:"GPS",icon:p.h})]})})},Ve=c(119),qe=Object(Ve.GoogleApiWrapper)({apiKey:"AIzaSyBsgd5A9q-23gHy8tL6e5O0lct6JoD97xo"})((function(e){var t=e.google,c=Object(n.useState)(0),a=Object(b.a)(c,2),s=a[0],i=a[1],l=z("debugCenter",{lat:0,lng:0}),r=Object(b.a)(l,2),o=r[0],d=r[1],j=Object(n.useState)([]),p=Object(b.a)(j,2),m=p[0],h=p[1];Object(n.useEffect)((function(){M().then((function(e){h(e.waypoints),e.waypoints.length>0&&d(Object(u.a)({},e.waypoints[0]))}))}),[]);return Object(W.jsxs)(W.Fragment,{children:[Object(W.jsx)("div",{className:"container map",children:Object(W.jsxs)(Ve.Map,{google:t,zoom:14,onClick:function(e,t,c){var n={lat:c.latLng.lat().toFixed(5),lng:c.latLng.lng().toFixed(5)};d(n),k(n),console.log(n)},initialCenter:o,children:[Object(W.jsx)(Ve.Marker,{name:"target",position:o}),m.map((function(e){return Object(W.jsx)(Ve.Circle,{center:e,radius:.5,strokeColor:e.color,strokeOpacity:.5,strokeWeight:2,fillColor:e.color,fillOpacity:.5})}))]})}),Object(W.jsx)("div",{className:"container mt-4 pt-4",children:Object(W.jsxs)("div",{className:"columns",children:[Object(W.jsxs)("div",{className:"column",children:[Object(W.jsxs)("p",{className:"ml-4",children:["Coordinates: ",o.lat,", ",o.lng]}),Object(W.jsxs)("p",{className:"ml-4",children:["Heading: ",s,"\xb0 "]})]}),Object(W.jsxs)("div",{className:"column",children:[Object(W.jsx)("p",{className:"ml-4",children:"Set heading:"}),Object(W.jsx)("input",{className:"slider m-4",step:1,min:0,max:360,value:s,type:"range",onInput:function(e){var t=parseFloat(e.target.value).toFixed(1);S({heading:t}),i(t)}})]})]})})]})})),Qe=c.p+"static/media/laser.bacfbcc3.jpeg",Ke=function(){var e=Object(n.useState)(!1),t=Object(b.a)(e,2),c=t[0],a=t[1],s=Object(n.useState)(),i=Object(b.a)(s,2),l=i[0],r=i[1],o=z("laserAuto",!0),u=Object(b.a)(o,2),d=u[0],j=u[1],h=Object(n.useState)(!1),O=Object(b.a)(h,2),f=O[0],x=O[1],g=z("laserOn",!0),v=Object(b.a)(g,2),N=v[0],w=v[1],y=z("laserBlink",!0),k=Object(b.a)(y,2),S=k[0],C=k[1],A=z("laserRWidth",0),F=Object(b.a)(A,2),M=F[0],T=F[1],B=z("laserRHeight",0),Y=Object(b.a)(B,2),G=Y[0],I=Y[1],J=z("laserTargetX",0),X=Object(b.a)(J,2),R=X[0],Z=X[1],D=z("laserTargetY",0),U=Object(b.a)(D,2),V=U[0],q=U[1],Q=z("laserTargetZ",-2),K=Object(b.a)(Q,2),$=K[0],ee=K[1],te=z("laserTargetA",20),ce=Object(b.a)(te,2),ne=ce[0],ae=ce[1],se=Object(n.useState)(0),ie=Object(b.a)(se,2),le=ie[0],re=ie[1],oe=Object(n.useState)(0),ue=Object(b.a)(oe,2),de=ue[0],je=ue[1],be=Object(n.useState)(0),pe=Object(b.a)(be,2),me=pe[0],he=pe[1],Oe=function(){x(!0),E().then((function(e){a(e.connected),r(e.port),x(!1)}))};return Object(n.useEffect)((function(){!function(e,t){var c=function(e){return e*(Math.PI/180)};je(e/Math.tan(c(t-10))),re(e/Math.tan(c(t+10))),he(e/(Math.cos(c(t))+1))}(-V,ne)}),[V,ne]),Object(n.useEffect)((function(){Oe()}),[]),Object(W.jsx)("div",{className:"container",children:Object(W.jsxs)("div",{className:"columns",children:[Object(W.jsxs)("div",{className:"column",children:[Object(W.jsxs)("div",{children:[Object(W.jsxs)("h1",{className:"has-text-centered title is-size-4 ".concat(c?"has-text-success":"has-text-danger"),children:[c?"Laser connected at: ":"Laser disconnected",Object(W.jsx)("span",{children:c&&l})]}),Object(W.jsx)("div",{className:"is-flex is-flex-centered",children:Object(W.jsx)("button",{className:"button is-outlined ".concat(f&&"is-loading"),onClick:Oe,children:Object(W.jsx)(m.a,{icon:p.g})})})]}),Object(W.jsx)("hr",{}),Object(W.jsxs)("div",{className:"columns",children:[Object(W.jsx)(_,{label:"Rectangle width (ft)",value:M,placeholder:"E.g: 5",changeHandler:T}),Object(W.jsx)(_,{label:"Rectangle height (ft)",value:G,placeholder:"E.g: 5",changeHandler:I})]}),Object(W.jsx)("hr",{}),Object(W.jsxs)("div",{className:"columns",children:[Object(W.jsx)(_,{label:"Target X (ft)",value:R,placeholder:"E.g: 5",changeHandler:Z}),Object(W.jsx)(_,{label:"Target Y (ft)",value:V,placeholder:"E.g: 5",changeHandler:q}),Object(W.jsx)(_,{label:"Target Z (ft)",value:$,placeholder:"E.g: 5",changeHandler:ee}),Object(W.jsx)(_,{label:"Tilt Angle (deg)",value:ne,placeholder:"E.g: 20",changeHandler:ae})]}),Object(W.jsxs)("div",{className:"is-flex is-flex-centered",children:[Object(W.jsx)("button",{onClick:function(){w(!N),H({on:!N})},className:"button is-outlined m-4 ".concat(N?"is-success":"is-danger"),children:N?"Laser on":"Laser off"}),Object(W.jsx)("button",{onClick:function(){C(!S),L({blink:!S})},className:"button is-outlined m-4 ".concat(S?"is-success":"is-danger"),children:S?"Blink on":"Blink off"}),Object(W.jsx)("button",{onClick:function(){return j(!d)},className:"button is-outlined m-4 ".concat(d?"is-danger":"is-success"),children:d?"Manual mode":"Automatic mode"})]}),Object(W.jsx)("hr",{}),Object(W.jsx)("div",{className:"is-flex is-flex-centered",children:Object(W.jsx)("button",{onClick:function(){P({h:G,w:M,x:R,y:V,z:$,a:ne,manual:d}).then((function(e){return console.log(e)}))},className:"button is-outlined is-success m-4",children:"Save"})})]}),Object(W.jsxs)("div",{className:"column is-flex-centered is-flex-direction-column is-flex",children:[Object(W.jsx)("img",{src:Qe,alt:"laser instructions",className:"zoom_img"}),Object(W.jsx)("br",{}),Object(W.jsx)("h3",{className:"has-text-success",children:"Canvas range (ft)"}),Object(W.jsxs)("p",{children:["Zmax: ",de.toFixed(2)]}),Object(W.jsxs)("p",{children:["Zmin: ",le.toFixed(2)]}),Object(W.jsxs)("p",{children:["Xmax: ",me.toFixed(2)]})]})]})})},$e=function(){var e=Object(n.useState)(!1),t=Object(b.a)(e,2),c=t[0],a=t[1],s=Object(n.useState)(),i=Object(b.a)(s,2),l=i[0],r=i[1],o=Object(n.useState)([]),u=Object(b.a)(o,2),d=u[0],j=u[1],h=Object(n.useState)(!1),O=Object(b.a)(h,2),f=O[0],x=O[1],g=function(){x(!0),F().then((function(e){console.log(e),a(e.connected),r(e.port),j(e.logs),x(!1)}))};return Object(n.useEffect)((function(){g()}),[]),Object(W.jsx)("div",{className:"container",children:Object(W.jsx)("div",{className:"columns",children:Object(W.jsxs)("div",{className:"column",children:[Object(W.jsxs)("div",{children:[Object(W.jsxs)("h1",{className:"has-text-centered title is-size-4 ".concat(c?"has-text-success":"has-text-danger"),children:[c?"GPS connected at: ":"GPS disconnected",Object(W.jsx)("span",{children:c&&l})]}),Object(W.jsx)("div",{className:"is-flex is-flex-centered",children:Object(W.jsx)("button",{className:"button is-outlined ".concat(f&&"is-loading"),onClick:g,children:Object(W.jsx)(m.a,{icon:p.g})})})]}),Object(W.jsx)("hr",{}),Object(W.jsxs)("table",{className:"table is-fullwidth is-striped",children:[Object(W.jsx)("thead",{children:Object(W.jsxs)("tr",{children:[Object(W.jsx)("th",{children:" Timestamp "}),Object(W.jsx)("th",{children:" String "})]})}),Object(W.jsx)("tbody",{children:d.map((function(e,t){return Object(W.jsxs)("tr",{children:[Object(W.jsxs)("td",{children:[" ",(c=e[0],new Date(1e3*c).toLocaleString().split(", ")[1])," "]}),Object(W.jsxs)("td",{children:[" ",e[1]," "]})]},t);var c}))})]})]})})})},et=Object(o.c)(j),tt=function(){return Object(W.jsxs)("div",{className:"container is-fullwidth",children:[Object(W.jsx)(Ue,{}),Object(W.jsx)(o.a,{store:et,children:Object(W.jsxs)(r.d,{children:[Object(W.jsx)(r.a,{exact:!0,from:"/",to:"/map"}),Object(W.jsx)(r.b,{path:"/config",component:D}),Object(W.jsx)(r.b,{path:"/laser",component:Ke}),Object(W.jsx)(r.b,{path:"/gps",component:$e}),Object(W.jsx)(r.b,{path:"/debug",component:qe}),Object(W.jsx)(r.b,{path:"/map",component:Ze})]})})]})};i.a.render(Object(W.jsx)(a.a.StrictMode,{children:Object(W.jsx)(l.a,{children:Object(W.jsx)(tt,{})})}),document.getElementById("root"))}},[[297,1,2]]]);
//# sourceMappingURL=main.d5c96a40.chunk.js.map