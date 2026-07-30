import{r as y,j as l}from"./jsx-runtime-Dquw9cxk.js";import{a as Wt,c as Nr,S as Dr}from"./Nav-8Qaz9nQq.js";import{m as Tt}from"./mapbox-BP_diXpR.js";const kr=.5,Lr=8,Pr=1e3;function Br(t){if(t.length<2)return[];const e=[];let n=0;for(let r=0;r<t.length-1;r++){const s=t[r],a=t[r+1],i=a.timeMs-s.timeMs;if(i<=0)continue;const f=((s.speed??0)+(a.speed??0))/2<kr&&i>=Pr?Math.max(Math.round(i/Lr),100):i;e.push({compressedStartMs:n,compressedDurationMs:f,realStartTs:s.timeMs,realDurationMs:i}),n+=f}return e}function Kt(t,e,n){if(t.length===0)return n+e;if(e<=0)return t[0].realStartTs;const r=t[t.length-1],s=r.compressedStartMs+r.compressedDurationMs;if(e>=s)return r.realStartTs+r.realDurationMs;for(const a of t){const i=a.compressedStartMs+a.compressedDurationMs;if(e<=i){const c=(e-a.compressedStartMs)/a.compressedDurationMs;return a.realStartTs+c*a.realDurationMs}}return r.realStartTs+r.realDurationMs}function Or(t,e){if(t.length===0)return 0;const n=t[0];if(e<=n.realStartTs)return 0;const r=t[t.length-1];if(e>=r.realStartTs+r.realDurationMs)return r.compressedStartMs+r.compressedDurationMs;for(const s of t)if(e<=s.realStartTs+s.realDurationMs){const a=(e-s.realStartTs)/s.realDurationMs;return s.compressedStartMs+a*s.compressedDurationMs}return r.compressedStartMs+r.compressedDurationMs}function jr(t){if(t.length===0)return 0;const e=t[t.length-1];return e.compressedStartMs+e.compressedDurationMs}function at(t,e){if(t.length===0)throw new Error("No points");if(t.length===1||e<=t[0].timeMs)return{index:0,point:t[0]};if(e>=t[t.length-1].timeMs)return{index:t.length-1,point:t[t.length-1]};let n=0,r=t.length-1;for(;n<r-1;){const d=n+r>>1;t[d].timeMs<=e?n=d:r=d}const s=t[n],a=t[r],i=Math.max(a.timeMs-s.timeMs,1),c=Math.min(Math.max((e-s.timeMs)/i,0),1);return{index:n,point:{timeMs:e,lat:Zt(s.lat,a.lat,c),lng:Zt(s.lng,a.lng,c),speed:N(s.speed,a.speed,c),altitude:N(s.altitude,a.altitude,c),bearing:qt(s.bearing,a.bearing,c),motorTemp:N(s.motorTemp,a.motorTemp,c),controllerTemp:N(s.controllerTemp,a.controllerTemp,c),batteryTemp:N(s.batteryTemp,a.batteryTemp,c),batteryCurrent:N(s.batteryCurrent,a.batteryCurrent,c),batteryVoltage:N(s.batteryVoltage,a.batteryVoltage,c),rpm:$r(s.rpm,a.rpm,c),throttlePercent:N(s.throttlePercent,a.throttlePercent,c),phaseCurrent:N(s.phaseCurrent,a.phaseCurrent,c),sag:N(s.sag,a.sag,c),internalResistance:N(s.internalResistance,a.internalResistance,c),gyroX:N(s.gyroX,a.gyroX,c),gyroY:N(s.gyroY,a.gyroY,c),gyroZ:N(s.gyroZ,a.gyroZ,c),accelX:N(s.accelX,a.accelX,c),accelY:N(s.accelY,a.accelY,c),accelZ:N(s.accelZ,a.accelZ,c),gyroRateX:N(s.gyroRateX,a.gyroRateX,c),gyroRateY:N(s.gyroRateY,a.gyroRateY,c),gyroRateZ:N(s.gyroRateZ,a.gyroRateZ,c),magnetX:N(s.magnetX,a.magnetX,c),magnetY:N(s.magnetY,a.magnetY,c),magnetZ:N(s.magnetZ,a.magnetZ,c),attitudeRollDeg:N(s.attitudeRollDeg,a.attitudeRollDeg,c),attitudeYawDeg:qt(s.attitudeYawDeg,a.attitudeYawDeg,c)}}}function Zt(t,e,n){return t+(e-t)*n}function $r(t,e,n){const r=N(t,e,n);return r!=null?Math.round(r):void 0}function N(t,e,n){if(!(t==null&&e==null))return t==null?e:e==null?t:t+(e-t)*n}function qt(t,e,n){if(t==null&&e==null)return;if(t==null)return e;if(e==null)return t;let r=e-t;return r>180&&(r-=360),r<-180&&(r+=360),(t+r*n+360)%360}function Dn(t,e){const n=e.lng-t.lng,r=e.lat-t.lat;return n===0&&r===0?0:(Math.atan2(n,r)*180/Math.PI+360)%360}function Jt(t,e){if(t.length<2)return 0;const n=Math.min(e,t.length-1);let r=0;for(let s=1;s<=n;s++){const a=t[s-1].altitude,i=t[s].altitude;a!=null&&i!=null&&i>a&&(r+=i-a)}return r}Tt.accessToken="pk.eyJ1Ijoic25vb3Bsc20iLCJhIjoiY21td21ocHFtMHpkZzJ4cTcwbzE5bGMyYyJ9.zoK1ZxN2141ao2DmjOCadg";const Qt="route-full",ze="route-traveled",Ur="route-full-layer",Vr="route-traveled-glow",Hr="route-traveled-layer";function it(t){return{type:"Feature",properties:{},geometry:{type:"LineString",coordinates:t.map(e=>[e.lng,e.lat])}}}function en(t){let e=t%360;return e<0&&(e+=360),e}function zr(t,e){return(e-t+540)%360-180}function ot(t,e,n){const r=Math.min(1,Math.max(0,n));return t+(e-t)*r}function Yr({points:t,currentPoint:e,currentIndex:n,progress:r,playbackRate:s,onMapReady:a}){const[i,c]=y.useState(null),d=y.useRef(null),f=y.useRef(null),m=y.useRef(null),h=y.useRef(!1),o=y.useRef(null),E=y.useRef(null),C=y.useRef(null);y.useEffect(()=>{if(!d.current||f.current||t.length===0)return;if(!"pk.eyJ1Ijoic25vb3Bsc20iLCJhIjoiY21td21ocHFtMHpkZzJ4cTcwbzE5bGMyYyJ9.zoK1ZxN2141ao2DmjOCadg".trim()){c("Map token missing (VITE_MAPBOX_TOKEN) • telemetry playback");return}d.current.childElementCount>0&&(d.current.innerHTML="");const p=t[0];let T;try{T=new Tt.Map({container:d.current,style:"mapbox://styles/mapbox/satellite-v9",center:[p.lng,p.lat],zoom:16.2,pitch:65,bearing:0,antialias:!0})}catch(v){console.error("[replay-map] map constructor failed",v),c("Map init failed • telemetry playback");return}return f.current=T,T.on("error",v=>{console.error("[replay-map] map error event",(v==null?void 0:v.error)??v),h.current||c("Map style/auth error • telemetry playback")}),T.on("style.load",()=>{T.addSource("mapbox-dem",{type:"raster-dem",url:"mapbox://mapbox.mapbox-terrain-dem-v1",tileSize:512,maxzoom:14}),T.setTerrain({source:"mapbox-dem",exaggeration:1.5}),T.addSource(Qt,{type:"geojson",data:it(t),lineMetrics:!0}),T.addSource(ze,{type:"geojson",data:it(t.slice(0,1)),lineMetrics:!0}),T.addLayer({id:Ur,type:"line",source:Qt,layout:{"line-cap":"round","line-join":"round"},paint:{"line-color":"#ffffff","line-opacity":.35,"line-width":5}}),T.addLayer({id:Vr,type:"line",source:ze,layout:{"line-cap":"round","line-join":"round"},paint:{"line-width":18,"line-opacity":.45,"line-gradient":["interpolate",["linear"],["line-progress"],0,"#6C63FF",1,"#EB3D70"]}}),T.addLayer({id:Hr,type:"line",source:ze,layout:{"line-cap":"round","line-join":"round"},paint:{"line-width":10,"line-gradient":["interpolate",["linear"],["line-progress"],0,"#6C63FF",1,"#EB3D70"]}});const v=document.createElement("div");v.style.cssText=`
        width: 20px; height: 20px; border-radius: 50%;
        background: #111; border: 3px solid rgba(255,255,255,0.3);
        box-shadow: 0 0 0 8px rgba(255,255,255,0.15), 0 2px 8px rgba(0,0,0,0.5);
        display: flex; align-items: center; justify-content: center;
      `;const x=document.createElement("div");x.style.cssText="width: 5px; height: 5px; border-radius: 50%; background: white;",v.appendChild(x),m.current=new Tt.Marker({element:v,anchor:"center"}).setLngLat([p.lng,p.lat]).addTo(T),o.current={lat:p.lat,lng:p.lng},E.current=0,C.current=65,h.current=!0,a(T)}),()=>{var v;(v=m.current)==null||v.remove(),T.remove(),f.current=null,h.current=!1}},[t.length>0]);const u=y.useCallback(()=>{var H;const p=f.current;if(!p||!h.current||!e)return;const T=[...t.slice(0,n+1),e],v=p.getSource(ze);v==null||v.setData(it(T)),(H=m.current)==null||H.setLngLat([e.lng,e.lat]);let x=e.bearing??0;e.bearing==null&&n>0&&(x=Dn(t[n],e));const _=en(x),j=16.2+r*1.4,b=Math.max(1,s||1),g=b>=16?.07:b>=8?.1:b>=4?.14:.24,A=b>=16?.06:b>=8?.09:b>=4?.12:.2,P=b>=16?.06:b>=8?.09:b>=4?.12:.2,O=b>=16?4:b>=8?6:b>=4?9:14,te=65,X=o.current??{lat:e.lat,lng:e.lng},K=ot(X.lat,e.lat,g),D=ot(X.lng,e.lng,g);o.current={lat:K,lng:D};const z=E.current??_,Y=Math.max(-O,Math.min(O,zr(z,_))),G=en(z+Y*A);E.current=G;const se=C.current??te,Z=ot(se,te,P);C.current=Z,p.jumpTo({center:[D,K],zoom:Math.min(18.8,j),pitch:Z,bearing:G})},[t,e,n,r,s]);return y.useEffect(()=>{u()},[u]),i?l.jsx("div",{className:"map-fallback",children:l.jsx("div",{className:"map-fallback-label",children:i})}):l.jsx("div",{ref:d,style:{position:"absolute",inset:0}})}function Gr({gx:t,gy:e,gz:n,size:r=44}){const s=y.useRef(null);return y.useEffect(()=>{const a=s.current;if(!a)return;const i=a.getContext("2d");if(!i)return;const c=Math.max(-45,Math.min(45,t*18)),d=Math.max(-12,Math.min(12,e*10)),f=window.devicePixelRatio||1;a.width=r*f,a.height=r*f,a.style.width=`${r}px`,a.style.height=`${r}px`,i.scale(f,f);const m=r/2,h=r/2,o=r*.42;i.clearRect(0,0,r,r),i.beginPath(),i.arc(m,h,o,0,Math.PI*2),i.fillStyle="rgba(255,255,255,0.12)",i.fill(),i.beginPath(),i.arc(m,h,o,0,Math.PI*2),i.strokeStyle="rgba(255,255,255,0.5)",i.lineWidth=1.6,i.stroke(),i.save(),i.translate(m,h+d),i.rotate(-c*Math.PI/180),i.beginPath(),i.moveTo(-o*.82,0),i.lineTo(o*.82,0),i.strokeStyle="#6CC6FF",i.lineWidth=2.8,i.stroke(),i.restore(),i.beginPath(),i.moveTo(m-o*.45,h),i.lineTo(m+o*.45,h),i.strokeStyle="#fff",i.lineWidth=2.4,i.stroke(),i.beginPath(),i.moveTo(m,h-o*.3),i.lineTo(m,h+o*.28),i.strokeStyle="#fff",i.lineWidth=2.2,i.stroke()},[t,e,n,r]),l.jsx("canvas",{ref:s,className:"gyro-canvas",width:r,height:r})}function Le(t){const e=Math.floor(t/1e3),n=Math.floor(e/60),r=e%60;return`${String(n).padStart(2,"0")}:${String(r).padStart(2,"0")}`}function Et(t,e){return t==null?"—":`${(e==="mph"?t*2.23694:t*3.6).toFixed(1)} ${e==="mph"?"mph":"km/h"}`}function oe(t,e){if(t==null)return"—";const n=e==="F"?t*9/5+32:t;return`${Math.round(n)}°${e}`}function Xr(t){const e=(t%360+360)%360;return`${["N","NE","E","SE","S","SW","W","NW"][Math.round(e/45)%8]} ${Math.round(e)}°`}const Wr=["Brake Active","Foot Switch","Forward Switch","Reverse","Hall Sensor A","Hall Sensor B","Hall Sensor C","Setting Direction","Actual Direction","Brake Switch","Low Speed","Identify Error","Over Voltage","Low Voltage","Locking","V+ Error","Controller Hot","High Throttle","Reset Error","Throttle Fault","Hall Sensor Fault","Reverse Error","Motor Hot","Current Meter Error"],Kr=[{bit:0,label:"Overcurrent",isStatus:!1},{bit:1,label:"Overvoltage",isStatus:!1},{bit:2,label:"Undervoltage",isStatus:!1},{bit:3,label:"Controller Over Temp",isStatus:!1},{bit:4,label:"Motor Over Temp",isStatus:!1},{bit:5,label:"Hall Sensor Fault",isStatus:!1},{bit:6,label:"Throttle Fault",isStatus:!1},{bit:7,label:"Brake Fault",isStatus:!1},{bit:8,label:"Current Sensor Fault",isStatus:!1},{bit:9,label:"Comm Timeout",isStatus:!1},{bit:10,label:"Hardware Fault",isStatus:!1},{bit:11,label:"Speed Sensor Fault",isStatus:!1},{bit:12,label:"Parameter Fault",isStatus:!1},{bit:13,label:"Stall Fault",isStatus:!1},{bit:14,label:"Battery Temp Fault",isStatus:!1},{bit:15,label:"Reserved",isStatus:!1},{bit:32,label:"Over Temp Warn",isStatus:!0},{bit:33,label:"High Voltage Warn",isStatus:!0},{bit:34,label:"Low Voltage Warn",isStatus:!0},{bit:35,label:"Motor Temp Warn",isStatus:!0},{bit:36,label:"Current Limit",isStatus:!0},{bit:37,label:"Speed Limit",isStatus:!0},{bit:38,label:"Low Battery Warn",isStatus:!0},{bit:39,label:"Comm Warning",isStatus:!0}],Zr=[{bit:0,label:"Motor hall",isStatus:!1},{bit:1,label:"Throttle",isStatus:!1},{bit:2,label:"Current protect restart",isStatus:!1},{bit:3,label:"Phase current surge",isStatus:!1},{bit:4,label:"Voltage protect",isStatus:!1},{bit:5,label:"Alarm protect",isStatus:!1},{bit:6,label:"Motor temp protect",isStatus:!1},{bit:7,label:"Controller temp protect",isStatus:!1},{bit:8,label:"Phase current overflow",isStatus:!1},{bit:9,label:"Phase zero",isStatus:!1},{bit:10,label:"Phase short/lost",isStatus:!1},{bit:11,label:"Line current zero",isStatus:!1},{bit:12,label:"MOSFET high side",isStatus:!1},{bit:13,label:"MOSFET low side",isStatus:!1},{bit:14,label:"MOE current protect",isStatus:!1},{bit:15,label:"Brake alarm",isStatus:!1},{bit:32,label:"Reverse",isStatus:!0},{bit:33,label:"Rolling",isStatus:!0},{bit:34,label:"Motor stopped",isStatus:!0},{bit:35,label:"Rolling forward",isStatus:!0},{bit:36,label:"Rolling reverse",isStatus:!0},{bit:37,label:"Weak mode",isStatus:!0},{bit:38,label:"EABS",isStatus:!0},{bit:39,label:"Auto learn",isStatus:!0},{bit:40,label:"Motor running",isStatus:!0},{bit:41,label:"Pass OK",isStatus:!0},{bit:42,label:"Phone OK",isStatus:!0},{bit:43,label:"Old BLE",isStatus:!0}],qr=[{bit:1,label:"Over voltage",isStatus:!1},{bit:2,label:"Under voltage",isStatus:!1},{bit:3,label:"DRV fault",isStatus:!1},{bit:4,label:"ABS over current",isStatus:!1},{bit:5,label:"Over temp FET",isStatus:!1},{bit:6,label:"Over temp motor",isStatus:!1},{bit:7,label:"Gate driver over voltage",isStatus:!1},{bit:8,label:"Gate driver under voltage",isStatus:!1},{bit:9,label:"MCU under voltage",isStatus:!1},{bit:10,label:"Booting from watchdog",isStatus:!1},{bit:11,label:"Encoder SPI",isStatus:!1},{bit:12,label:"Encoder SINCOS below min amp",isStatus:!1},{bit:13,label:"Encoder SINCOS above max amp",isStatus:!1},{bit:14,label:"Flash corruption",isStatus:!1},{bit:15,label:"High offset current sensor 1",isStatus:!1},{bit:16,label:"High offset current sensor 2",isStatus:!1},{bit:17,label:"High offset current sensor 3",isStatus:!1},{bit:18,label:"Unbalanced currents",isStatus:!1},{bit:19,label:"Brake resistor",isStatus:!1},{bit:20,label:"Resolver loss of tracking",isStatus:!1},{bit:21,label:"Resolver degradation of signal",isStatus:!1},{bit:22,label:"Resolver loss of signal",isStatus:!1},{bit:23,label:"App config flash corruption",isStatus:!1},{bit:24,label:"Motor config flash corruption",isStatus:!1},{bit:25,label:"Encoder no magnet",isStatus:!1},{bit:26,label:"Encoder magnet too strong",isStatus:!1},{bit:27,label:"Phase filter",isStatus:!1},{bit:28,label:"Encoder fault",isStatus:!1}];function Jr(){var t,e,n,r;try{const s=globalThis["Onyx:rxd-kmp"],a=(r=(n=(e=(t=s==null?void 0:s.us)==null?void 0:t.wmwm)==null?void 0:e.onyx)==null?void 0:n.rxd)==null?void 0:r.RxdControllerFlagsBridge;if(!a)return null;const i=typeof a.kellyLabels=="function"?a.kellyLabels():null,c=i!=null?Array.from(i).map(f=>String(f)):null,d=typeof a.kellyStatusBitCount=="function"?Number(a.kellyStatusBitCount()):null;return!c||!c.length||!Number.isFinite(d)?null:{labels:c,statusBits:d}}catch{return null}}function Nt(t,e){var n,r,s,a;try{const i=globalThis["Onyx:rxd-kmp"],c=(a=(s=(r=(n=i==null?void 0:i.us)==null?void 0:n.wmwm)==null?void 0:r.onyx)==null?void 0:s.rxd)==null?void 0:a.RxdControllerFlagsBridge,d=c&&typeof c[t]=="function"?c[t]():null,f=d!=null?Array.from(d).map(m=>{const[h,o,...E]=String(m).split("|");return{bit:Number(h),isStatus:o==="1",label:E.join("|")}}).filter(m=>Number.isFinite(m.bit)&&m.label):[];return f.length?f:e}catch{return e}}const _e=Jr(),Qr=(_e==null?void 0:_e.labels)??Wr,es=(_e==null?void 0:_e.statusBits)??11,ts={kind:"kelly",entries:Qr.map((t,e)=>({bit:e,label:t,isStatus:e<es}))},ns={kind:"bac",entries:Nt("bacLabelEntries",Kr)},rs={kind:"fardriver",entries:Nt("farDriverLabelEntries",Zr)},ss={kind:"vesc",entries:Nt("vescLabelEntries",qr)};function as({point:t,elapsedMs:e,headingDeg:n,allPoints:r,currentIndex:s,speedUnit:a,tempUnit:i,hasRouteData:c,headerMeta:d}){const f=us(d);if(!c)return l.jsx(is,{point:t,elapsedMs:e,allPoints:r,currentIndex:s,speedUnit:a,tempUnit:i,flagSchema:f});const m=Jt(r,s),o=Jt(r,Math.max(0,r.length-1))>.5,E=r.some(g=>g.flagsBitmask!=null),C=kn(t,r,s),u=g=>Math.max((g==null?void 0:g.phaseCurrent)??0,(g==null?void 0:g.batteryCurrent)??0),T=[{label:"Speed",hasData:g=>(g.speed??0)>1e-4,render:g=>Et(g==null?void 0:g.speed,a)},{label:"Motor",hasData:g=>(g.motorTemp??0)>1e-4,render:g=>oe((g==null?void 0:g.motorTemp)??0,i),valueColor:g=>ke(g==null?void 0:g.motorTemp,120,150)},{label:"Controller",hasData:g=>(g.controllerTemp??0)>1e-4,render:g=>oe((g==null?void 0:g.controllerTemp)??0,i),valueColor:g=>ke(g==null?void 0:g.controllerTemp,110,130)},{label:"Battery",hasData:g=>(g.batteryTemp??0)>1e-4,render:g=>oe((g==null?void 0:g.batteryTemp)??0,i),valueColor:g=>ke(g==null?void 0:g.batteryTemp,90,100)},{label:"Current",hasData:g=>u(g)>1e-4,render:g=>`${u(g).toFixed(1)} A`},{label:"Voltage",hasData:g=>(g.batteryVoltage??0)>1e-4,render:g=>`${((g==null?void 0:g.batteryVoltage)??0).toFixed(1)} V`},{label:"RPM",hasData:g=>(g.rpm??0)>0,render:g=>`${Math.round((g==null?void 0:g.rpm)??0)}`},{label:"Throttle",hasData:g=>(g.throttlePercent??0)>1e-4,render:g=>`${Math.round((g==null?void 0:g.throttlePercent)??0)}%`},{label:"Brake",hasData:g=>(g.brakePercent??0)>1e-4,render:g=>`${((g==null?void 0:g.brakePercent)??0).toFixed(1)}%`},{label:"Sag",hasData:g=>(g.sag??0)>1e-4,render:g=>`${(((g==null?void 0:g.sag)??0)*1e3).toFixed(0)} mV`},{label:"Status",hasData:g=>g.statusFlags!=null,render:g=>`0x${((g==null?void 0:g.statusFlags)??0).toString(16).toUpperCase()}`},{label:"Errors",hasData:g=>g.errorFlags!=null,render:g=>`0x${((g==null?void 0:g.errorFlags)??0).toString(16).toUpperCase()}`}].filter(g=>r.some(g.hasData)),v=(t==null?void 0:t.accelX)??(t==null?void 0:t.gyroX)??0,x=(t==null?void 0:t.accelY)??(t==null?void 0:t.gyroY)??0,_=(t==null?void 0:t.accelZ)??(t==null?void 0:t.gyroZ)??0,j=Math.round((t==null?void 0:t.attitudeRollDeg)??v*18),b=Math.round((t==null?void 0:t.attitudeYawDeg)??ds(_*57.2958));return l.jsxs("div",{className:"hud",children:[l.jsx(Ye,{label:"Timestamp",value:Pn(t==null?void 0:t.timeMs)}),l.jsx(Ye,{label:"Time",value:Le(e)}),T.map(g=>{var A;return l.jsx(Ye,{label:g.label,value:g.render(t),valueColor:(A=g.valueColor)==null?void 0:A.call(g,t)},g.label)}),o&&l.jsx(Ye,{label:"Climb",value:`${m.toFixed(0)} m`}),E&&C!=null&&l.jsx(ls,{bitmask:C,schema:f}),l.jsxs("div",{className:"hud-gyro-row",children:[l.jsx("span",{className:"hud-heading",children:Xr(n)}),l.jsx(Gr,{gx:v,gy:x,gz:_,size:44})]}),(Math.abs(j)>0||Math.abs(b)>0)&&l.jsxs("div",{className:"hud-angles",children:["R ",j,"°  Y ",b,"°"]}),l.jsx("div",{className:"hud-brand",children:"Motormed"})]})}function is({point:t,elapsedMs:e,allPoints:n,currentIndex:r,tempUnit:s,flagSchema:a}){const i=n.some(o=>o.flagsBitmask!=null),c=kn(t,n,r),d=o=>{const E=U(o==null?void 0:o.phaseCurrent),C=U(o==null?void 0:o.batteryCurrent);return E==null&&C==null?null:Math.max(E??Number.NEGATIVE_INFINITY,C??Number.NEGATIVE_INFINITY)},f=[{field:"rpm",label:"RPM",unit:"",color:"#7C6FFF",fmt:o=>Math.round(o).toString()},{field:"batteryVoltage",label:"Voltage",unit:"V",color:"#58E28A"},{field:"batteryCurrent",label:"Current",unit:"A",color:"#FFC857"},{field:"throttlePercent",label:"Throttle",unit:"%",color:"#FF9F43",fmt:o=>Math.round(o).toString()},{field:"motorTemp",label:"Motor Temp",unit:"",color:"#FF5D78",fmt:o=>oe(o,s)},{field:"controllerTemp",label:"Controller Temp",unit:"",color:"#54A0FF",fmt:o=>oe(o,s)},{field:"batteryTemp",label:"Battery Temp",unit:"",color:"#A29BFE",fmt:o=>oe(o,s)}],h=[{label:"RPM",color:"#7C6FFF",hasAny:o=>U(o.rpm)!=null&&(o.rpm??0)>0,render:o=>`${Math.round(U(o==null?void 0:o.rpm)??0)}`},{label:"Voltage",color:"#58E28A",hasAny:o=>U(o.batteryVoltage)!=null&&(o.batteryVoltage??0)>0,render:o=>`${(U(o==null?void 0:o.batteryVoltage)??0).toFixed(1)} V`},{label:"Current",color:"#FFC857",hasAny:o=>d(o)!=null&&(d(o)??0)>0,render:o=>`${(d(o)??0).toFixed(1)} A`},{label:"Throttle",color:"#FF9F43",hasAny:o=>U(o.throttlePercent)!=null&&(o.throttlePercent??0)>0,render:o=>`${Math.round(U(o==null?void 0:o.throttlePercent)??0)}%`},{label:"Motor",hasAny:o=>U(o.motorTemp)!=null&&(o.motorTemp??0)>0,render:o=>oe(U(o==null?void 0:o.motorTemp)??0,s)},{label:"Controller",hasAny:o=>U(o.controllerTemp)!=null&&(o.controllerTemp??0)>0,render:o=>oe(U(o==null?void 0:o.controllerTemp)??0,s)}].filter(o=>n.some(o.hasAny));return l.jsxs("div",{className:"hud-dashboard",children:[l.jsxs("div",{className:"hud-dash-metrics",children:[l.jsx(ct,{label:"Timestamp",value:Pn(t==null?void 0:t.timeMs)}),l.jsx(ct,{label:"Time",value:Le(e)}),h.map(o=>{const E=o.render(t),C=o.label==="Motor"?ke(U(t==null?void 0:t.motorTemp),120,150):o.label==="Controller"?ke(U(t==null?void 0:t.controllerTemp),110,130):void 0;return l.jsx(ct,{label:o.label,value:E,color:o.color??C??"#fff"},o.label)})]}),l.jsx("div",{className:"hud-dash-graphs",children:f.map(({field:o,label:E,unit:C,color:u,fmt:p})=>{let T=null;return o==="batteryCurrent"?T=d(t):T=U(t==null?void 0:t[o]),l.jsx(os,{points:n,field:o,label:E,unit:C,color:u,currentIndex:r,currentValue:T,fmtValue:p},o)})}),i&&c!=null&&l.jsx(cs,{bitmask:c,schema:a}),l.jsx("div",{className:"hud-dash-brand",children:"Motormed"})]})}function os({points:t,field:e,label:n,unit:r,color:s,currentIndex:a,currentValue:i,fmtValue:c}){let d=null;const f=t.map(D=>{let z=U(D[e]);if(e==="batteryCurrent"){const Y=U(D.phaseCurrent),G=U(D.batteryCurrent);z=Y==null&&G==null?null:Math.max(Y??Number.NEGATIVE_INFINITY,G??Number.NEGATIVE_INFINITY)}return z!=null&&(d=z),d}),m=f.filter(D=>Number.isFinite(D));if(m.length<2)return null;const h=Math.min(...m),o=Math.max(...m),E=o-h||1,C=400,u=64,p=2,T=4,v=D=>p+D/(t.length-1)*(C-2*p),x=D=>u-T-(D-h)/E*(u-2*T),_=[],j=[];let b=!0,g=p;for(let D=0;D<t.length;D++){const z=f[D];if(z==null||!Number.isFinite(z)){b=!0;continue}const Y=v(D),G=x(z);b?(g=Y,_.push(`M ${Y} ${G}`),j.push(`M ${Y} ${u} L ${Y} ${G}`),b=!1):(_.push(`L ${Y} ${G}`),j.push(`L ${Y} ${G}`))}j.length>0&&j.push(`L ${v(t.length-1)} ${u} L ${g} ${u} Z`);const A=v(Math.min(a,t.length-1)),P=f[Math.min(a,f.length-1)],O=i??P,te=O,X=O!=null?c?c(O):`${O>=100?O.toFixed(0):O.toFixed(1)}${r?" "+r:""}`:"—",K=`tg-${e}`;return l.jsxs("div",{className:"telem-graph",children:[l.jsxs("div",{className:"telem-graph-header",children:[l.jsx("span",{className:"telem-graph-label",children:n}),l.jsx("span",{className:"telem-graph-current",style:{color:s},children:X})]}),l.jsxs("svg",{viewBox:`0 0 ${C} ${u}`,preserveAspectRatio:"none",className:"telem-graph-svg",children:[l.jsx("defs",{children:l.jsxs("linearGradient",{id:K,x1:"0",y1:"0",x2:"0",y2:"1",children:[l.jsx("stop",{offset:"0%",stopColor:s,stopOpacity:"0.28"}),l.jsx("stop",{offset:"100%",stopColor:s,stopOpacity:"0.02"})]})}),l.jsx("path",{d:j.join(" "),fill:`url(#${K})`}),l.jsx("path",{d:_.join(" "),fill:"none",stroke:s,strokeWidth:"1.5",strokeLinejoin:"round"}),l.jsx("line",{x1:A,y1:0,x2:A,y2:u,stroke:"rgba(255,255,255,0.5)",strokeWidth:"1"}),te!=null&&l.jsx("circle",{cx:A,cy:x(te),r:"3",fill:s,stroke:"rgba(255,255,255,0.7)",strokeWidth:"1"})]}),l.jsxs("div",{className:"telem-graph-range",children:[l.jsx("span",{children:c?c(h):`${h.toFixed(1)}${r?" "+r:""}`}),l.jsx("span",{children:c?c(o):`${o.toFixed(1)}${r?" "+r:""}`})]})]})}function kn(t,e,n){var r;if((t==null?void 0:t.flagsBitmask)!=null)return t.flagsBitmask;for(let s=Math.min(n,e.length-1);s>=0;s--){const a=(r=e[s])==null?void 0:r.flagsBitmask;if(a!=null)return a}return null}function ke(t,e,n){const r=U(t);if(r==null||r<=0)return;const s=r*9/5+32;return s<=e?"#58E28A":s<=n?"#FFC857":"#FF5D78"}function U(t){return t==null||!Number.isFinite(t)||Math.abs(t+1)<1e-6?null:t}function ct({label:t,value:e,color:n}){return l.jsxs("div",{className:"hud-dash-metric",children:[l.jsx("span",{className:"hud-dash-metric-value",style:n?{color:n}:void 0,children:e}),l.jsx("span",{className:"hud-dash-metric-label",children:t})]})}function cs({bitmask:t,schema:e}){return l.jsx("div",{className:"hud-dash-flags",children:l.jsx("div",{className:"hud-dash-flags-grid",children:e.entries.map(n=>{const r=Ln(t,n.bit),a=n.isStatus?r?"status-on":"status-off":r?"error-on":"error-off";return l.jsxs("div",{className:"hud-dash-flag-item",children:[l.jsx("span",{className:`hud-dash-flag-dot ${a}`}),l.jsx("span",{className:"hud-dash-flag-label",children:n.label})]},`${n.bit}-${n.label}`)})})})}function ls({bitmask:t,schema:e}){return l.jsx("div",{className:"hud-bitflags",children:l.jsx("div",{className:"hud-bitflags-grid",children:e.entries.map(n=>{const r=Ln(t,n.bit),a=n.isStatus?r?"status-on":"status-off":r?"error-on":"error-off";return l.jsxs("div",{className:"hud-bitflag-item",title:n.label,children:[l.jsx("span",{className:`hud-bitflag-dot ${a}`}),l.jsx("span",{className:"hud-bitflag-label",children:n.label})]},`${n.bit}-${n.label}`)})})})}function us(t){const e=`${(t==null?void 0:t.device)??""} ${(t==null?void 0:t.modelName)??""} ${(t==null?void 0:t.firmwareVersion)??""}`.toUpperCase();return e.includes("VESC")||e.includes("FLIPSKY")||e.includes("TRAMPA")||e.includes("STORMCORE")||e.includes("MAKERX")||e.includes("UBOX")||e.includes("LFOC")?ss:e.includes("FARDRIVER")||e.includes("FAR DRIVER")||e.includes("FLUX_CONTROL")||e.includes("FLUX CONTROL")?rs:e.includes("BAC")?ns:ts}function Ln(t,e){return Number.isFinite(t)?(BigInt(Math.trunc(t))>>BigInt(e)&1n)===1n:!1}function Ye({label:t,value:e,valueColor:n}){return l.jsxs("div",{className:"metric-row",children:[l.jsx("span",{className:"metric-label",children:t}),l.jsx("span",{className:"metric-value",style:n?{color:n}:void 0,children:e})]})}function Pn(t){return!t||!Number.isFinite(t)?"—":new Date(t).toLocaleString([],{month:"numeric",day:"numeric",hour:"numeric",minute:"2-digit",second:"2-digit"})}function ds(t){const e=t%360;return e<0?e+360:e}const hs=[15,30,45,60],fs=[1,1.5,2,3,4,8,16,32];function ms(t){if(t.type==="duration")return`${t.seconds}s`;const e=t.value;return e===Math.floor(e)?`${e}×`:`${e.toFixed(1)}×`}function vt(t,e){return t.type==="duration"?e>0?e/(t.seconds*1e3):1:t.value}function gs({mode:t,compressedDurationMs:e,onChange:n}){const[r,s]=y.useState(!1),a=y.useRef(),i=y.useCallback(()=>{a.current=setTimeout(()=>s(!1),160)},[]),c=y.useCallback(()=>{clearTimeout(a.current)},[]),d=y.useCallback(h=>{n(h),s(!1),c()},[n,c]),f=vt(t,e),m=f>=10?`${Math.round(f)}×`:`${f.toFixed(1)}×`;return l.jsxs("div",{className:"speed-control",onMouseEnter:()=>{c(),s(!0)},onMouseLeave:i,children:[r&&l.jsxs("div",{className:"speed-popover",onMouseEnter:c,onMouseLeave:i,children:[l.jsx("div",{className:"speed-popover-section-label",children:"Duration"}),l.jsx("div",{className:"speed-popover-row",children:hs.map(h=>l.jsxs("button",{className:`speed-popover-btn${t.type==="duration"&&t.seconds===h?" active":""}`,onClick:()=>d({type:"duration",seconds:h}),children:[h,"s"]},h))}),l.jsx("div",{className:"speed-popover-divider"}),l.jsx("div",{className:"speed-popover-section-label",children:"Speed"}),l.jsx("div",{className:"speed-popover-row",children:fs.map(h=>{const o=h===Math.floor(h)?`${h}×`:`${h.toFixed(1)}×`;return l.jsx("button",{className:`speed-popover-btn${t.type==="rate"&&t.value===h?" active":""}`,onClick:()=>d({type:"rate",value:h}),children:o},h)})})]}),l.jsxs("button",{className:"speed-control-trigger","aria-label":"Playback speed",children:[l.jsx("span",{className:"speed-control-mode",children:ms(t)}),l.jsx("span",{className:"speed-control-rate",children:m})]})]})}const tn="https://mtr.rprtd.app",ps="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";async function bs(t){const e=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(t)),n=new Uint8Array(e);let r=BigInt(0);for(let a=0;a<6;a++)r=r<<8n|BigInt(n[a]);let s="";for(let a=0;a<7;a++)s=ps[Number(r%62n)]+s,r/=62n;return s}async function Bn(t){const e=`${tn}?f=${encodeURIComponent(t)}`;try{const r=await fetch(e,{method:"GET",redirect:"manual",mode:"cors"}),s=r.headers.get("Location")??r.headers.get("location");if(s&&s.startsWith("http"))return s}catch{}try{const r=new Image;r.referrerPolicy="no-referrer",r.src=e}catch{}const n=await bs(t);return`${tn}/${n}`}const ys=()=>{};var nn={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ss={SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wt=function(t,e){if(!t)throw Ts(e)},Ts=function(t){return new Error("Firebase Database ("+Ss.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const On=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},Es=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const a=t[n++];e[r++]=String.fromCharCode((s&31)<<6|a&63)}else if(s>239&&s<365){const a=t[n++],i=t[n++],c=t[n++],d=((s&7)<<18|(a&63)<<12|(i&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(d>>10)),e[r++]=String.fromCharCode(56320+(d&1023))}else{const a=t[n++],i=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(a&63)<<6|i&63)}}return e.join("")},jn={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const a=t[s],i=s+1<t.length,c=i?t[s+1]:0,d=s+2<t.length,f=d?t[s+2]:0,m=a>>2,h=(a&3)<<4|c>>4;let o=(c&15)<<2|f>>6,E=f&63;d||(E=64,i||(o=64)),r.push(n[m],n[h],n[o],n[E])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(On(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Es(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const a=n[t.charAt(s++)],c=s<t.length?n[t.charAt(s)]:0;++s;const f=s<t.length?n[t.charAt(s)]:64;++s;const h=s<t.length?n[t.charAt(s)]:64;if(++s,a==null||c==null||f==null||h==null)throw new vs;const o=a<<2|c>>4;if(r.push(o),f!==64){const E=c<<4&240|f>>2;if(r.push(E),h!==64){const C=f<<6&192|h;r.push(C)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class vs extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ws=function(t){const e=On(t);return jn.encodeByteArray(e,!0)},$n=function(t){return ws(t).replace(/\./g,"")},Ms=function(t){try{return jn.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cs(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rs=()=>Cs().__FIREBASE_DEFAULTS__,Is=()=>{if(typeof process>"u"||typeof nn>"u")return;const t=nn.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},_s=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Ms(t[1]);return e&&JSON.parse(e)},xs=()=>{try{return ys()||Rs()||Is()||_s()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Un=()=>{var t;return(t=xs())==null?void 0:t.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class As{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}function Dt(){try{return typeof indexedDB=="object"}catch{return!1}}function Vn(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var a;e(((a=s.error)==null?void 0:a.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fs="FirebaseError";class me extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=Fs,Object.setPrototypeOf(this,me.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ze.prototype.create)}}class Ze{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,a=this.errors[e],i=a?Ns(a,r):"Error",c=`${this.serviceName}: ${i} (${s}).`;return new me(s,c,r)}}function Ns(t,e){return t.replace(Ds,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Ds=/\{\$([^}]+)}/g;function We(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const a=t[s],i=e[s];if(rn(a)&&rn(i)){if(!We(a,i))return!1}else if(a!==i)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function rn(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ks=1e3,Ls=2,Ps=4*60*60*1e3,Bs=.5;function Hn(t,e=ks,n=Ls){const r=e*Math.pow(n,t),s=Math.round(Bs*r*(Math.random()-.5)*2);return Math.min(Ps,r+s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ae(t){return t&&t._delegate?t._delegate:t}class Ee{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Se="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Os{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new As;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if($s(e))try{this.getOrInitializeService({instanceIdentifier:Se})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const a=this.getOrInitializeService({instanceIdentifier:s});r.resolve(a)}catch{}}}}clearInstance(e=Se){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Se){return this.instances.has(e)}getOptions(e=Se){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[a,i]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(a);r===c&&i.resolve(s)}return s}onInit(e,n){const r=this.normalizeInstanceIdentifier(n),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const a=this.instances.get(r);return a&&e(a,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:js(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Se){return this.component?this.component.multipleInstances?e:Se:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function js(t){return t===Se?void 0:t}function $s(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Us{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Os(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var F;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(F||(F={}));const Vs={debug:F.DEBUG,verbose:F.VERBOSE,info:F.INFO,warn:F.WARN,error:F.ERROR,silent:F.SILENT},Hs=F.INFO,zs={[F.DEBUG]:"log",[F.VERBOSE]:"log",[F.INFO]:"info",[F.WARN]:"warn",[F.ERROR]:"error"},Ys=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=zs[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class zn{constructor(e){this.name=e,this._logLevel=Hs,this._logHandler=Ys,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in F))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Vs[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,F.DEBUG,...e),this._logHandler(this,F.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,F.VERBOSE,...e),this._logHandler(this,F.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,F.INFO,...e),this._logHandler(this,F.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,F.WARN,...e),this._logHandler(this,F.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,F.ERROR,...e),this._logHandler(this,F.ERROR,...e)}}const Gs=(t,e)=>e.some(n=>t instanceof n);let sn,an;function Xs(){return sn||(sn=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Ws(){return an||(an=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Yn=new WeakMap,Mt=new WeakMap,Gn=new WeakMap,lt=new WeakMap,kt=new WeakMap;function Ks(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",a),t.removeEventListener("error",i)},a=()=>{n(de(t.result)),s()},i=()=>{r(t.error),s()};t.addEventListener("success",a),t.addEventListener("error",i)});return e.then(n=>{n instanceof IDBCursor&&Yn.set(n,t)}).catch(()=>{}),kt.set(e,t),e}function Zs(t){if(Mt.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",a),t.removeEventListener("error",i),t.removeEventListener("abort",i)},a=()=>{n(),s()},i=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",a),t.addEventListener("error",i),t.addEventListener("abort",i)});Mt.set(t,e)}let Ct={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Mt.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Gn.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return de(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function qs(t){Ct=t(Ct)}function Js(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(ut(this),e,...n);return Gn.set(r,e.sort?e.sort():[e]),de(r)}:Ws().includes(t)?function(...e){return t.apply(ut(this),e),de(Yn.get(this))}:function(...e){return de(t.apply(ut(this),e))}}function Qs(t){return typeof t=="function"?Js(t):(t instanceof IDBTransaction&&Zs(t),Gs(t,Xs())?new Proxy(t,Ct):t)}function de(t){if(t instanceof IDBRequest)return Ks(t);if(lt.has(t))return lt.get(t);const e=Qs(t);return e!==t&&(lt.set(t,e),kt.set(e,t)),e}const ut=t=>kt.get(t);function Xn(t,e,{blocked:n,upgrade:r,blocking:s,terminated:a}={}){const i=indexedDB.open(t,e),c=de(i);return r&&i.addEventListener("upgradeneeded",d=>{r(de(i.result),d.oldVersion,d.newVersion,de(i.transaction),d)}),n&&i.addEventListener("blocked",d=>n(d.oldVersion,d.newVersion,d)),c.then(d=>{a&&d.addEventListener("close",()=>a()),s&&d.addEventListener("versionchange",f=>s(f.oldVersion,f.newVersion,f))}).catch(()=>{}),c}const ea=["get","getKey","getAll","getAllKeys","count"],ta=["put","add","delete","clear"],dt=new Map;function on(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(dt.get(e))return dt.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=ta.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||ea.includes(n)))return;const a=async function(i,...c){const d=this.transaction(i,s?"readwrite":"readonly");let f=d.store;return r&&(f=f.index(c.shift())),(await Promise.all([f[n](...c),s&&d.done]))[0]};return dt.set(e,a),a}qs(t=>({...t,get:(e,n,r)=>on(e,n)||t.get(e,n,r),has:(e,n)=>!!on(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class na{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(ra(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function ra(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Rt="@firebase/app",cn="0.14.12";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ce=new zn("@firebase/app"),sa="@firebase/app-compat",aa="@firebase/analytics-compat",ia="@firebase/analytics",oa="@firebase/app-check-compat",ca="@firebase/app-check",la="@firebase/auth",ua="@firebase/auth-compat",da="@firebase/database",ha="@firebase/data-connect",fa="@firebase/database-compat",ma="@firebase/functions",ga="@firebase/functions-compat",pa="@firebase/installations",ba="@firebase/installations-compat",ya="@firebase/messaging",Sa="@firebase/messaging-compat",Ta="@firebase/performance",Ea="@firebase/performance-compat",va="@firebase/remote-config",wa="@firebase/remote-config-compat",Ma="@firebase/storage",Ca="@firebase/storage-compat",Ra="@firebase/firestore",Ia="@firebase/ai",_a="@firebase/firestore-compat",xa="firebase",Aa="12.13.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const It="[DEFAULT]",Fa={[Rt]:"fire-core",[sa]:"fire-core-compat",[ia]:"fire-analytics",[aa]:"fire-analytics-compat",[ca]:"fire-app-check",[oa]:"fire-app-check-compat",[la]:"fire-auth",[ua]:"fire-auth-compat",[da]:"fire-rtdb",[ha]:"fire-data-connect",[fa]:"fire-rtdb-compat",[ma]:"fire-fn",[ga]:"fire-fn-compat",[pa]:"fire-iid",[ba]:"fire-iid-compat",[ya]:"fire-fcm",[Sa]:"fire-fcm-compat",[Ta]:"fire-perf",[Ea]:"fire-perf-compat",[va]:"fire-rc",[wa]:"fire-rc-compat",[Ma]:"fire-gcs",[Ca]:"fire-gcs-compat",[Ra]:"fire-fst",[_a]:"fire-fst-compat",[Ia]:"fire-vertex","fire-js":"fire-js",[xa]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pe=new Map,Na=new Map,_t=new Map;function ln(t,e){try{t.container.addComponent(e)}catch(n){ce.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function xe(t){const e=t.name;if(_t.has(e))return ce.debug(`There were multiple attempts to register component ${e}.`),!1;_t.set(e,t);for(const n of Pe.values())ln(n,t);for(const n of Na.values())ln(n,t);return!0}function Lt(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Da={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},he=new Ze("app","Firebase",Da);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ka{constructor(e,n,r){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Ee("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw he.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const un=Aa;function Wn(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r={name:It,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw he.create("bad-app-name",{appName:String(s)});if(n||(n=Un()),!n)throw he.create("no-options");const a=Pe.get(s);if(a){if(We(n,a.options)&&We(r,a.config))return a;throw he.create("duplicate-app",{appName:s})}const i=new Us(s);for(const d of _t.values())i.addComponent(d);const c=new ka(n,r,i);return Pe.set(s,c),c}function La(t=It){const e=Pe.get(t);if(!e&&t===It&&Un())return Wn();if(!e)throw he.create("no-app",{appName:t});return e}function Pa(){return Array.from(Pe.values())}function fe(t,e,n){let r=Fa[t]??t;n&&(r+=`-${n}`);const s=r.match(/\s|\//),a=e.match(/\s|\//);if(s||a){const i=[`Unable to register library "${r}" with version "${e}":`];s&&i.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&a&&i.push("and"),a&&i.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ce.warn(i.join(" "));return}xe(new Ee(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ba="firebase-heartbeat-database",Oa=1,Be="firebase-heartbeat-store";let ht=null;function Kn(){return ht||(ht=Xn(Ba,Oa,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Be)}catch(n){console.warn(n)}}}}).catch(t=>{throw he.create("idb-open",{originalErrorMessage:t.message})})),ht}async function ja(t){try{const n=(await Kn()).transaction(Be),r=await n.objectStore(Be).get(Zn(t));return await n.done,r}catch(e){if(e instanceof me)ce.warn(e.message);else{const n=he.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});ce.warn(n.message)}}}async function dn(t,e){try{const r=(await Kn()).transaction(Be,"readwrite");await r.objectStore(Be).put(e,Zn(t)),await r.done}catch(n){if(n instanceof me)ce.warn(n.message);else{const r=he.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});ce.warn(r.message)}}}function Zn(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $a=1024,Ua=30;class Va{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new za(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),a=hn();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===a||this._heartbeatsCache.heartbeats.some(i=>i.date===a))return;if(this._heartbeatsCache.heartbeats.push({date:a,agent:s}),this._heartbeatsCache.heartbeats.length>Ua){const i=Ya(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(i,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){ce.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=hn(),{heartbeatsToSend:r,unsentEntries:s}=Ha(this._heartbeatsCache.heartbeats),a=$n(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),a}catch(n){return ce.warn(n),""}}}function hn(){return new Date().toISOString().substring(0,10)}function Ha(t,e=$a){const n=[];let r=t.slice();for(const s of t){const a=n.find(i=>i.agent===s.agent);if(a){if(a.dates.push(s.date),fn(n)>e){a.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),fn(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class za{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Dt()?Vn().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await ja(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return dn(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return dn(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function fn(t){return $n(JSON.stringify({version:2,heartbeats:t})).length}function Ya(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ga(t){xe(new Ee("platform-logger",e=>new na(e),"PRIVATE")),xe(new Ee("heartbeat",e=>new Va(e),"PRIVATE")),fe(Rt,cn,t),fe(Rt,cn,"esm2020"),fe("fire-js","")}Ga("");var Xa="firebase",Wa="12.13.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */fe(Xa,Wa,"app");const qn="@firebase/installations",Pt="0.6.22";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jn=1e4,Qn=`w:${Pt}`,er="FIS_v2",Ka="https://firebaseinstallations.googleapis.com/v1",Za=60*60*1e3,qa="installations",Ja="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qa={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},ve=new Ze(qa,Ja,Qa);function tr(t){return t instanceof me&&t.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nr({projectId:t}){return`${Ka}/projects/${t}/installations`}function rr(t){return{token:t.token,requestStatus:2,expiresIn:ti(t.expiresIn),creationTime:Date.now()}}async function sr(t,e){const r=(await e.json()).error;return ve.create("request-failed",{requestName:t,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function ar({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function ei(t,{refreshToken:e}){const n=ar(t);return n.append("Authorization",ni(e)),n}async function ir(t){const e=await t();return e.status>=500&&e.status<600?t():e}function ti(t){return Number(t.replace("s","000"))}function ni(t){return`${er} ${t}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ri({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const r=nr(t),s=ar(t),a=e.getImmediate({optional:!0});if(a){const f=await a.getHeartbeatsHeader();f&&s.append("x-firebase-client",f)}const i={fid:n,authVersion:er,appId:t.appId,sdkVersion:Qn},c={method:"POST",headers:s,body:JSON.stringify(i)},d=await ir(()=>fetch(r,c));if(d.ok){const f=await d.json();return{fid:f.fid||n,registrationStatus:2,refreshToken:f.refreshToken,authToken:rr(f.authToken)}}else throw await sr("Create Installation",d)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function or(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function si(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ai=/^[cdef][\w-]{21}$/,xt="";function ii(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=oi(t);return ai.test(n)?n:xt}catch{return xt}}function oi(t){return si(t).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qe(t){return`${t.appName}!${t.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cr=new Map;function lr(t,e){const n=qe(t);ur(n,e),ci(n,e)}function ur(t,e){const n=cr.get(t);if(n)for(const r of n)r(e)}function ci(t,e){const n=li();n&&n.postMessage({key:t,fid:e}),ui()}let Te=null;function li(){return!Te&&"BroadcastChannel"in self&&(Te=new BroadcastChannel("[Firebase] FID Change"),Te.onmessage=t=>{ur(t.data.key,t.data.fid)}),Te}function ui(){cr.size===0&&Te&&(Te.close(),Te=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const di="firebase-installations-database",hi=1,we="firebase-installations-store";let ft=null;function Bt(){return ft||(ft=Xn(di,hi,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(we)}}})),ft}async function Ke(t,e){const n=qe(t),s=(await Bt()).transaction(we,"readwrite"),a=s.objectStore(we),i=await a.get(n);return await a.put(e,n),await s.done,(!i||i.fid!==e.fid)&&lr(t,e.fid),e}async function dr(t){const e=qe(t),r=(await Bt()).transaction(we,"readwrite");await r.objectStore(we).delete(e),await r.done}async function Je(t,e){const n=qe(t),s=(await Bt()).transaction(we,"readwrite"),a=s.objectStore(we),i=await a.get(n),c=e(i);return c===void 0?await a.delete(n):await a.put(c,n),await s.done,c&&(!i||i.fid!==c.fid)&&lr(t,c.fid),c}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ot(t){let e;const n=await Je(t.appConfig,r=>{const s=fi(r),a=mi(t,s);return e=a.registrationPromise,a.installationEntry});return n.fid===xt?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function fi(t){const e=t||{fid:ii(),registrationStatus:0};return hr(e)}function mi(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(ve.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=gi(t,n);return{installationEntry:n,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:pi(t)}:{installationEntry:e}}async function gi(t,e){try{const n=await ri(t,e);return Ke(t.appConfig,n)}catch(n){throw tr(n)&&n.customData.serverCode===409?await dr(t.appConfig):await Ke(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function pi(t){let e=await mn(t.appConfig);for(;e.registrationStatus===1;)await or(100),e=await mn(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await Ot(t);return r||n}return e}function mn(t){return Je(t,e=>{if(!e)throw ve.create("installation-not-found");return hr(e)})}function hr(t){return bi(t)?{fid:t.fid,registrationStatus:0}:t}function bi(t){return t.registrationStatus===1&&t.registrationTime+Jn<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yi({appConfig:t,heartbeatServiceProvider:e},n){const r=Si(t,n),s=ei(t,n),a=e.getImmediate({optional:!0});if(a){const f=await a.getHeartbeatsHeader();f&&s.append("x-firebase-client",f)}const i={installation:{sdkVersion:Qn,appId:t.appId}},c={method:"POST",headers:s,body:JSON.stringify(i)},d=await ir(()=>fetch(r,c));if(d.ok){const f=await d.json();return rr(f)}else throw await sr("Generate Auth Token",d)}function Si(t,{fid:e}){return`${nr(t)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jt(t,e=!1){let n;const r=await Je(t.appConfig,a=>{if(!fr(a))throw ve.create("not-registered");const i=a.authToken;if(!e&&vi(i))return a;if(i.requestStatus===1)return n=Ti(t,e),a;{if(!navigator.onLine)throw ve.create("app-offline");const c=Mi(a);return n=Ei(t,c),c}});return n?await n:r.authToken}async function Ti(t,e){let n=await gn(t.appConfig);for(;n.authToken.requestStatus===1;)await or(100),n=await gn(t.appConfig);const r=n.authToken;return r.requestStatus===0?jt(t,e):r}function gn(t){return Je(t,e=>{if(!fr(e))throw ve.create("not-registered");const n=e.authToken;return Ci(n)?{...e,authToken:{requestStatus:0}}:e})}async function Ei(t,e){try{const n=await yi(t,e),r={...e,authToken:n};return await Ke(t.appConfig,r),n}catch(n){if(tr(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await dr(t.appConfig);else{const r={...e,authToken:{requestStatus:0}};await Ke(t.appConfig,r)}throw n}}function fr(t){return t!==void 0&&t.registrationStatus===2}function vi(t){return t.requestStatus===2&&!wi(t)}function wi(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+Za}function Mi(t){const e={requestStatus:1,requestTime:Date.now()};return{...t,authToken:e}}function Ci(t){return t.requestStatus===1&&t.requestTime+Jn<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ri(t){const e=t,{installationEntry:n,registrationPromise:r}=await Ot(e);return r?r.catch(console.error):jt(e).catch(console.error),n.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ii(t,e=!1){const n=t;return await _i(n),(await jt(n,e)).token}async function _i(t){const{registrationPromise:e}=await Ot(t);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xi(t){if(!t||!t.options)throw mt("App Configuration");if(!t.name)throw mt("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw mt(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function mt(t){return ve.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mr="installations",Ai="installations-internal",Fi=t=>{const e=t.getProvider("app").getImmediate(),n=xi(e),r=Lt(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},Ni=t=>{const e=t.getProvider("app").getImmediate(),n=Lt(e,mr).getImmediate();return{getId:()=>Ri(n),getToken:s=>Ii(n,s)}};function Di(){xe(new Ee(mr,Fi,"PUBLIC")),xe(new Ee(Ai,Ni,"PRIVATE"))}Di();fe(qn,Pt);fe(qn,Pt,"esm2020");const gt="@firebase/remote-config",pn="0.8.3";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gr{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pr="remote-config",bn=100;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ki={"already-initialized":"Remote Config already initialized","registration-window":"Undefined window object. This SDK only supports usage in a browser environment.","registration-project-id":"Undefined project identifier. Check Firebase app initialization.","registration-api-key":"Undefined API key. Check Firebase app initialization.","registration-app-id":"Undefined app identifier. Check Firebase app initialization.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","storage-delete":"Error thrown when deleting from storage. Original error: {$originalErrorMessage}.","fetch-client-network":"Fetch client failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-timeout":'The config fetch request timed out.  Configure timeout using "fetchTimeoutMillis" SDK setting.',"fetch-throttle":'The config fetch request timed out while in an exponential backoff state. Configure timeout using "fetchTimeoutMillis" SDK setting. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.',"fetch-client-parse":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","indexed-db-unavailable":"Indexed DB is not supported by current browser","custom-signal-max-allowed-signals":"Setting more than {$maxSignals} custom signals is not supported.","stream-error":"The stream was not able to connect to the backend: {$originalErrorMessage}.","realtime-unavailable":"The Realtime service is unavailable: {$originalErrorMessage}","update-message-invalid":"The stream invalidation message was unparsable: {$originalErrorMessage}","update-not-fetched":"Unable to fetch the latest config: {$originalErrorMessage}","analytics-unavailable":"Connection to Firebase Analytics failed: {$originalErrorMessage}"},B=new Ze("remoteconfig","Remote Config",ki);function Li(t,e){return t instanceof me&&t.code.indexOf(e)!==-1}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pi=!1,Bi="",yn=0,Oi=["1","true","t","yes","y","on"];class pt{constructor(e,n=Bi){this._source=e,this._value=n}asString(){return this._value}asBoolean(){return this._source==="static"?Pi:Oi.indexOf(this._value.toLowerCase())>=0}asNumber(){if(this._source==="static")return yn;let e=Number(this._value);return isNaN(e)&&(e=yn),e}getSource(){return this._source}}class ji{constructor(e){this.storage=e._storage,this.logger=e._logger,this.analyticsProvider=e._analyticsProvider}async updateActiveExperiments(e){const n=await this.storage.getActiveExperiments()||new Set,r=this.createExperimentInfoMap(e);return this.addActiveExperiments(r),this.removeInactiveExperiments(n,r),this.storage.setActiveExperiments(new Set(r.keys()))}createExperimentInfoMap(e){const n=new Map;for(const r of e)n.set(r.experimentId,r);return n}addActiveExperiments(e){const n={};for(const[r,s]of e.entries())n[`firebase${r}`]=s.variantId;this.addExperimentToAnalytics(n)}removeInactiveExperiments(e,n){const r={};for(const s of e)n.has(s)||(r[`firebase${s}`]=null);this.addExperimentToAnalytics(r)}addExperimentToAnalytics(e){if(Object.keys(e).length!==0)try{const n=this.analyticsProvider.getImmediate({optional:!0});n?(n.setUserProperties(e),n.logEvent("set_firebase_experiment_state")):this.logger.warn("Analytics import failed. Verify if you have imported Firebase Analytics in your app code.")}catch(n){throw B.create("analytics-unavailable",{originalErrorMessage:n==null?void 0:n.message})}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $i(t=La(),e={}){var s,a;t=Ae(t);const n=Lt(t,pr);if(n.isInitialized()){const i=n.getOptions();if(We(i,e))return n.getImmediate();throw B.create("already-initialized")}n.initialize({options:e});const r=n.getImmediate();return e.initialFetchResponse&&(r._initializePromise=Promise.all([r._storage.setLastSuccessfulFetchResponse(e.initialFetchResponse),r._storage.setActiveConfigEtag(((s=e.initialFetchResponse)==null?void 0:s.eTag)||""),r._storage.setActiveConfigTemplateVersion(e.initialFetchResponse.templateVersion||0),r._storageCache.setLastSuccessfulFetchTimestampMillis(Date.now()),r._storageCache.setLastFetchStatus("success"),r._storageCache.setActiveConfig(((a=e.initialFetchResponse)==null?void 0:a.config)||{})]).then(),r._isInitializationComplete=!0),r}async function Ui(t){const e=Ae(t),[n,r]=await Promise.all([e._storage.getLastSuccessfulFetchResponse(),e._storage.getActiveConfigEtag()]);if(!n||!n.config||!n.eTag||!n.templateVersion||n.eTag===r)return!1;const s=new ji(e),a=n.experiments?s.updateActiveExperiments(n.experiments):Promise.resolve();return await Promise.all([e._storageCache.setActiveConfig(n.config),e._storage.setActiveConfigEtag(n.eTag),e._storage.setActiveConfigTemplateVersion(n.templateVersion),a]),!0}function Vi(t){const e=Ae(t);return e._initializePromise||(e._initializePromise=e._storageCache.loadFromStorage().then(()=>{e._isInitializationComplete=!0})),e._initializePromise}async function Hi(t){const e=Ae(t),n=new gr;setTimeout(async()=>{n.abort()},e.settings.fetchTimeoutMillis);const r=e._storageCache.getCustomSignals();r&&e._logger.debug(`Fetching config with custom signals: ${JSON.stringify(r)}`);try{await e._client.fetch({cacheMaxAgeMillis:e.settings.minimumFetchIntervalMillis,signal:n,customSignals:r}),await e._storageCache.setLastFetchStatus("success")}catch(s){const a=Li(s,"fetch-throttle")?"throttle":"failure";throw await e._storageCache.setLastFetchStatus(a),s}}function $t(t,e){const n=Ae(t);n._isInitializationComplete||n._logger.debug(`A value was requested for key "${e}" before SDK initialization completed. Await on ensureInitialized if the intent was to get a previously activated value.`);const r=n._storageCache.getActiveConfig();return r&&r[e]!==void 0?new pt("remote",r[e]):n.defaultConfig&&n.defaultConfig[e]!==void 0?new pt("default",String(n.defaultConfig[e])):(n._logger.debug(`Returning static value for key "${e}". Define a default or remote value if this is unintentional.`),new pt("static"))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zi{constructor(e,n,r,s){this.client=e,this.storage=n,this.storageCache=r,this.logger=s}isCachedDataFresh(e,n){if(!n)return this.logger.debug("Config fetch cache check. Cache unpopulated."),!1;const r=Date.now()-n,s=r<=e;return this.logger.debug(`Config fetch cache check. Cache age millis: ${r}. Cache max age millis (minimumFetchIntervalMillis setting): ${e}. Is cache hit: ${s}.`),s}async fetch(e){const[n,r]=await Promise.all([this.storage.getLastSuccessfulFetchTimestampMillis(),this.storage.getLastSuccessfulFetchResponse()]);if(r&&this.isCachedDataFresh(e.cacheMaxAgeMillis,n))return r;e.eTag=r&&r.eTag;const s=await this.client.fetch(e),a=[this.storageCache.setLastSuccessfulFetchTimestampMillis(Date.now())];return s.status===200&&a.push(this.storage.setLastSuccessfulFetchResponse(s)),await Promise.all(a),s}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yi(t=navigator){return t.languages&&t.languages[0]||t.language}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gi{constructor(e,n,r,s,a,i){this.firebaseInstallations=e,this.sdkVersion=n,this.namespace=r,this.projectId=s,this.apiKey=a,this.appId=i}async fetch(e){const[n,r]=await Promise.all([this.firebaseInstallations.getId(),this.firebaseInstallations.getToken()]),a=`${window.FIREBASE_REMOTE_CONFIG_URL_BASE||"https://firebaseremoteconfig.googleapis.com"}/v1/projects/${this.projectId}/namespaces/${this.namespace}:fetch?key=${this.apiKey}`,i={"Content-Type":"application/json","Content-Encoding":"gzip","If-None-Match":e.eTag||"*"},c={sdk_version:this.sdkVersion,app_instance_id:n,app_instance_id_token:r,app_id:this.appId,language_code:Yi(),custom_signals:e.customSignals},d={method:"POST",headers:i,body:JSON.stringify(c)},f=fetch(a,d),m=new Promise((v,x)=>{e.signal.addEventListener(()=>{const _=new Error("The operation was aborted.");_.name="AbortError",x(_)})});let h;try{await Promise.race([f,m]),h=await f}catch(v){let x="fetch-client-network";throw(v==null?void 0:v.name)==="AbortError"&&(x="fetch-timeout"),B.create(x,{originalErrorMessage:v==null?void 0:v.message})}let o=h.status;const E=h.headers.get("ETag")||void 0;let C,u,p,T;if(h.status===200){let v;try{v=await h.json()}catch(x){throw B.create("fetch-client-parse",{originalErrorMessage:x==null?void 0:x.message})}C=v.entries,u=v.state,p=v.templateVersion,T=v.experimentDescriptions}if(u==="INSTANCE_STATE_UNSPECIFIED"?o=500:u==="NO_CHANGE"?o=304:(u==="NO_TEMPLATE"||u==="EMPTY_CONFIG")&&(C={},T=[]),o!==304&&o!==200)throw B.create("fetch-status",{httpStatus:o});return{status:o,eTag:E,config:C,templateVersion:p,experiments:T}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xi(t,e){return new Promise((n,r)=>{const s=Math.max(e-Date.now(),0),a=setTimeout(n,s);t.addEventListener(()=>{clearTimeout(a),r(B.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function Wi(t){if(!(t instanceof me)||!t.customData)return!1;const e=Number(t.customData.httpStatus);return e===429||e===500||e===503||e===504}class Ki{constructor(e,n){this.client=e,this.storage=n}async fetch(e){const n=await this.storage.getThrottleMetadata()||{backoffCount:0,throttleEndTimeMillis:Date.now()};return this.attemptFetch(e,n)}async attemptFetch(e,{throttleEndTimeMillis:n,backoffCount:r}){await Xi(e.signal,n);try{const s=await this.client.fetch(e);return await this.storage.deleteThrottleMetadata(),s}catch(s){if(!Wi(s))throw s;const a={throttleEndTimeMillis:Date.now()+Hn(r),backoffCount:r+1};return await this.storage.setThrottleMetadata(a),this.attemptFetch(e,a)}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zi=60*1e3,qi=12*60*60*1e3;class Ji{get fetchTimeMillis(){return this._storageCache.getLastSuccessfulFetchTimestampMillis()||-1}get lastFetchStatus(){return this._storageCache.getLastFetchStatus()||"no-fetch-yet"}constructor(e,n,r,s,a,i,c){this.app=e,this._client=n,this._storageCache=r,this._storage=s,this._logger=a,this._realtimeHandler=i,this._analyticsProvider=c,this._isInitializationComplete=!1,this.settings={fetchTimeoutMillis:Zi,minimumFetchIntervalMillis:qi},this.defaultConfig={}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xe(t,e){const n=t.target.error||void 0;return B.create(e,{originalErrorMessage:n&&(n==null?void 0:n.message)})}const le="app_namespace_store",Qi="firebase_remote_config",eo=1;function to(){return new Promise((t,e)=>{try{const n=indexedDB.open(Qi,eo);n.onerror=r=>{e(Xe(r,"storage-open"))},n.onsuccess=r=>{t(r.target.result)},n.onupgradeneeded=r=>{const s=r.target.result;switch(r.oldVersion){case 0:s.createObjectStore(le,{keyPath:"compositeKey"})}}}catch(n){e(B.create("storage-open",{originalErrorMessage:n==null?void 0:n.message}))}})}class br{getLastFetchStatus(){return this.get("last_fetch_status")}setLastFetchStatus(e){return this.set("last_fetch_status",e)}getLastSuccessfulFetchTimestampMillis(){return this.get("last_successful_fetch_timestamp_millis")}setLastSuccessfulFetchTimestampMillis(e){return this.set("last_successful_fetch_timestamp_millis",e)}getLastSuccessfulFetchResponse(){return this.get("last_successful_fetch_response")}setLastSuccessfulFetchResponse(e){return this.set("last_successful_fetch_response",e)}getActiveConfig(){return this.get("active_config")}setActiveConfig(e){return this.set("active_config",e)}getActiveConfigEtag(){return this.get("active_config_etag")}setActiveConfigEtag(e){return this.set("active_config_etag",e)}getActiveExperiments(){return this.get("active_experiments")}setActiveExperiments(e){return this.set("active_experiments",e)}getThrottleMetadata(){return this.get("throttle_metadata")}setThrottleMetadata(e){return this.set("throttle_metadata",e)}deleteThrottleMetadata(){return this.delete("throttle_metadata")}getCustomSignals(){return this.get("custom_signals")}getRealtimeBackoffMetadata(){return this.get("realtime_backoff_metadata")}setRealtimeBackoffMetadata(e){return this.set("realtime_backoff_metadata",e)}getActiveConfigTemplateVersion(){return this.get("last_known_template_version")}setActiveConfigTemplateVersion(e){return this.set("last_known_template_version",e)}}class no extends br{constructor(e,n,r,s=to()){super(),this.appId=e,this.appName=n,this.namespace=r,this.openDbPromise=s}async setCustomSignals(e){const r=(await this.openDbPromise).transaction([le],"readwrite"),s=await this.getWithTransaction("custom_signals",r),a=yr(e,s||{});return await this.setWithTransaction("custom_signals",a,r),a}async getWithTransaction(e,n){return new Promise((r,s)=>{const a=n.objectStore(le),i=this.createCompositeKey(e);try{const c=a.get(i);c.onerror=d=>{s(Xe(d,"storage-get"))},c.onsuccess=d=>{const f=d.target.result;r(f?f.value:void 0)}}catch(c){s(B.create("storage-get",{originalErrorMessage:c==null?void 0:c.message}))}})}async setWithTransaction(e,n,r){return new Promise((s,a)=>{const i=r.objectStore(le),c=this.createCompositeKey(e);try{const d=i.put({compositeKey:c,value:n});d.onerror=f=>{a(Xe(f,"storage-set"))},d.onsuccess=()=>{s()}}catch(d){a(B.create("storage-set",{originalErrorMessage:d==null?void 0:d.message}))}})}async get(e){const r=(await this.openDbPromise).transaction([le],"readonly");return this.getWithTransaction(e,r)}async set(e,n){const s=(await this.openDbPromise).transaction([le],"readwrite");return this.setWithTransaction(e,n,s)}async delete(e){const n=await this.openDbPromise;return new Promise((r,s)=>{const i=n.transaction([le],"readwrite").objectStore(le),c=this.createCompositeKey(e);try{const d=i.delete(c);d.onerror=f=>{s(Xe(f,"storage-delete"))},d.onsuccess=()=>{r()}}catch(d){s(B.create("storage-delete",{originalErrorMessage:d==null?void 0:d.message}))}})}createCompositeKey(e){return[this.appId,this.appName,this.namespace,e].join()}}class ro extends br{constructor(){super(...arguments),this.storage={}}async get(e){return Promise.resolve(this.storage[e])}async set(e,n){return this.storage[e]=n,Promise.resolve(void 0)}async delete(e){return this.storage[e]=void 0,Promise.resolve()}async setCustomSignals(e){const n=this.storage.custom_signals||{};return this.storage.custom_signals=yr(e,n),Promise.resolve(this.storage.custom_signals)}}function yr(t,e){const n={...e,...t},r=Object.fromEntries(Object.entries(n).filter(([s,a])=>a!==null).map(([s,a])=>typeof a=="number"?[s,a.toString()]:[s,a]));if(Object.keys(r).length>bn)throw B.create("custom-signal-max-allowed-signals",{maxSignals:bn});return r}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class so{constructor(e){this.storage=e}getLastFetchStatus(){return this.lastFetchStatus}getLastSuccessfulFetchTimestampMillis(){return this.lastSuccessfulFetchTimestampMillis}getActiveConfig(){return this.activeConfig}getCustomSignals(){return this.customSignals}async loadFromStorage(){const e=this.storage.getLastFetchStatus(),n=this.storage.getLastSuccessfulFetchTimestampMillis(),r=this.storage.getActiveConfig(),s=this.storage.getCustomSignals(),a=await e;a&&(this.lastFetchStatus=a);const i=await n;i&&(this.lastSuccessfulFetchTimestampMillis=i);const c=await r;c&&(this.activeConfig=c);const d=await s;d&&(this.customSignals=d)}setLastFetchStatus(e){return this.lastFetchStatus=e,this.storage.setLastFetchStatus(e)}setLastSuccessfulFetchTimestampMillis(e){return this.lastSuccessfulFetchTimestampMillis=e,this.storage.setLastSuccessfulFetchTimestampMillis(e)}setActiveConfig(e){return this.activeConfig=e,this.storage.setActiveConfig(e)}async setCustomSignals(e){this.customSignals=await this.storage.setCustomSignals(e)}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ao{constructor(e){this.allowedEvents_=e,this.listeners_={},wt(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const r=[...this.listeners_[e]];for(let s=0;s<r.length;s++)r[s].callback.apply(r[s].context,n)}}on(e,n,r){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:r});const s=this.getInitialEvent(e);s&&n.apply(r,s)}off(e,n,r){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let a=0;a<s.length;a++)if(s[a].callback===n&&(!r||r===s[a].context)){s.splice(a,1);return}}validateEventType_(e){wt(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut extends ao{static getInstance(){return new Ut}constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const r=!document[e];r!==this.visible_&&(this.visible_=r,this.trigger("visible",r))},!1)}getInitialEvent(e){return wt(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const io="X-Goog-Api-Key",oo="X-Goog-Firebase-Installations-Auth",bt=8,Sn=3,Tn=-1,En=0,vn="featureDisabled",wn="retryIntervalSeconds",Mn="latestTemplateVersionNumber";class co{constructor(e,n,r,s,a,i,c,d,f,m){this.firebaseInstallations=e,this.storage=n,this.sdkVersion=r,this.namespace=s,this.projectId=a,this.apiKey=i,this.appId=c,this.logger=d,this.storageCache=f,this.cachingClient=m,this.observers=new Set,this.isConnectionActive=!1,this.isRealtimeDisabled=!1,this.httpRetriesRemaining=bt,this.isInBackground=!1,this.decoder=new TextDecoder("utf-8"),this.isClosingConnection=!1,this.propagateError=h=>this.observers.forEach(o=>{var E;return(E=o.error)==null?void 0:E.call(o,h)}),this.isStatusCodeRetryable=h=>!h||[408,429,502,503,504].includes(h),this.setRetriesRemaining(),Ut.getInstance().on("visible",this.onVisibilityChange,this)}async setRetriesRemaining(){const e=await this.storage.getRealtimeBackoffMetadata(),n=(e==null?void 0:e.numFailedStreams)||0;this.httpRetriesRemaining=Math.max(bt-n,1)}async updateBackoffMetadataWithLastFailedStreamConnectionTime(e){var s;const n=(((s=await this.storage.getRealtimeBackoffMetadata())==null?void 0:s.numFailedStreams)||0)+1,r=Hn(n,6e4,2);await this.storage.setRealtimeBackoffMetadata({backoffEndTimeMillis:new Date(e.getTime()+r),numFailedStreams:n})}async updateBackoffMetadataWithRetryInterval(e){const n=Date.now(),r=e*1e3,s=new Date(n+r);await this.storage.setRealtimeBackoffMetadata({backoffEndTimeMillis:s,numFailedStreams:0}),await this.retryHttpConnectionWhenBackoffEnds()}async closeRealtimeHttpConnection(){if(!this.isClosingConnection){this.isClosingConnection=!0;try{this.reader&&await this.reader.cancel()}catch{this.logger.debug("Failed to cancel the reader, connection was lost.")}finally{this.reader=void 0}this.controller&&(await this.controller.abort(),this.controller=void 0),this.isClosingConnection=!1}}async resetRealtimeBackoff(){await this.storage.setRealtimeBackoffMetadata({backoffEndTimeMillis:new Date(-1),numFailedStreams:0})}resetRetryCount(){this.httpRetriesRemaining=bt}async establishRealtimeConnection(e,n,r,s){const a=await this.storage.getActiveConfigEtag(),i=await this.storage.getActiveConfigTemplateVersion(),c={[io]:this.apiKey,[oo]:r,"Content-Type":"application/json",Accept:"application/json","If-None-Match":a||"*","Content-Encoding":"gzip"},d={project:this.projectId,namespace:this.namespace,lastKnownVersionNumber:i,appId:this.appId,sdkVersion:this.sdkVersion,appInstanceId:n};return await fetch(e,{method:"POST",headers:c,body:JSON.stringify(d),signal:s})}getRealtimeUrl(){const n=`${window.FIREBASE_REMOTE_CONFIG_URL_BASE||"https://firebaseremoteconfigrealtime.googleapis.com"}/v1/projects/${this.projectId}/namespaces/${this.namespace}:streamFetchInvalidations?key=${this.apiKey}`;return new URL(n)}async createRealtimeConnection(){const[e,n]=await Promise.all([this.firebaseInstallations.getId(),this.firebaseInstallations.getToken(!1)]);this.controller=new AbortController;const r=this.getRealtimeUrl();return await this.establishRealtimeConnection(r,e,n,this.controller.signal)}async retryHttpConnectionWhenBackoffEnds(){let e=await this.storage.getRealtimeBackoffMetadata();e||(e={backoffEndTimeMillis:new Date(Tn),numFailedStreams:En});const n=new Date(e.backoffEndTimeMillis).getTime(),r=Date.now(),s=Math.max(0,n-r);await this.makeRealtimeHttpConnection(s)}setIsHttpConnectionRunning(e){this.isConnectionActive=e}checkAndSetHttpConnectionFlagIfNotRunning(){const e=this.canEstablishStreamConnection();return e&&this.setIsHttpConnectionRunning(!0),e}fetchResponseIsUpToDate(e,n){return e.config!=null&&e.templateVersion?e.templateVersion>=n:this.storageCache.getLastFetchStatus()==="success"}parseAndValidateConfigUpdateMessage(e){const n=e.indexOf("{"),r=e.indexOf("}",n);return n<0||r<0||n>=r?"":e.substring(n,r+1)}isEventListenersEmpty(){return this.observers.size===0}getRandomInt(e){return Math.floor(Math.random()*e)}executeAllListenerCallbacks(e){this.observers.forEach(n=>n.next(e))}getChangedParams(e,n){const r=new Set,s=new Set(Object.keys(e||{})),a=new Set(Object.keys(n||{}));for(const i of s)(!a.has(i)||e[i]!==n[i])&&r.add(i);for(const i of a)s.has(i)||r.add(i);return r}async fetchLatestConfig(e,n){const r=e-1,s=Sn-r,a=this.storageCache.getCustomSignals();a&&this.logger.debug(`Fetching config with custom signals: ${JSON.stringify(a)}`);const i=new gr;try{const c={cacheMaxAgeMillis:0,signal:i,customSignals:a,fetchType:"REALTIME",fetchAttempt:s},d=await this.cachingClient.fetch(c);let f=await this.storage.getActiveConfig();if(!this.fetchResponseIsUpToDate(d,n)){this.logger.debug("Fetched template version is the same as SDK's current version. Retrying fetch."),await this.autoFetch(r,n);return}if(d.config==null){this.logger.debug("The fetch succeeded, but the backend had no updates.");return}f==null&&(f={});const m=this.getChangedParams(d.config,f);if(m.size===0){this.logger.debug("Config was fetched, but no params changed.");return}const h={getUpdatedKeys(){return new Set(m)}};this.executeAllListenerCallbacks(h)}catch(c){const d=c instanceof Error?c.message:String(c),f=B.create("update-not-fetched",{originalErrorMessage:`Failed to auto-fetch config update: ${d}`});this.propagateError(f)}}async autoFetch(e,n){if(e===0){const a=B.create("update-not-fetched",{originalErrorMessage:"Unable to fetch the latest version of the template."});this.propagateError(a);return}const s=this.getRandomInt(4)*1e3;await new Promise(a=>setTimeout(a,s)),await this.fetchLatestConfig(e,n)}async handleNotifications(e){let n,r="";for(;;){const{done:s,value:a}=await e.read();if(s)break;if(n=this.decoder.decode(a,{stream:!0}),r+=n,n.includes("}")){if(r=this.parseAndValidateConfigUpdateMessage(r),r.length===0)continue;try{const i=JSON.parse(r);if(this.isEventListenersEmpty())break;if(vn in i&&i[vn]===!0){const c=B.create("realtime-unavailable",{originalErrorMessage:"The server is temporarily unavailable. Try again in a few minutes."});this.propagateError(c);break}if(Mn in i){const c=await this.storage.getActiveConfigTemplateVersion(),d=Number(i[Mn]);c&&d>c&&await this.autoFetch(Sn,d)}if(wn in i){const c=Number(i[wn]);await this.updateBackoffMetadataWithRetryInterval(c)}}catch(i){this.logger.debug("Unable to parse latest config update message.",i);const c=i instanceof Error?i.message:String(i);this.propagateError(B.create("update-message-invalid",{originalErrorMessage:c}))}r=""}}}async listenForNotifications(e){try{await this.handleNotifications(e)}catch{this.isInBackground||this.logger.debug("Real-time connection was closed due to an exception.")}}async prepareAndBeginRealtimeHttpStream(){if(!this.checkAndSetHttpConnectionFlagIfNotRunning())return;let e=await this.storage.getRealtimeBackoffMetadata();e||(e={backoffEndTimeMillis:new Date(Tn),numFailedStreams:En});const n=e.backoffEndTimeMillis.getTime();if(Date.now()<n){await this.retryHttpConnectionWhenBackoffEnds();return}let r,s;try{if(r=await this.createRealtimeConnection(),s=r.status,r.ok&&r.body){this.resetRetryCount(),await this.resetRealtimeBackoff();const a=r.body.getReader();this.reader=a,await this.listenForNotifications(a)}}catch(a){this.isInBackground?this.resetRetryCount():this.logger.debug("Exception connecting to real-time RC backend. Retrying the connection...:",a)}finally{await this.closeRealtimeHttpConnection(),this.setIsHttpConnectionRunning(!1);const a=!this.isInBackground&&(s===void 0||this.isStatusCodeRetryable(s));if(a&&await this.updateBackoffMetadataWithLastFailedStreamConnectionTime(new Date),a||r!=null&&r.ok)await this.retryHttpConnectionWhenBackoffEnds();else{const i=`Unable to connect to the server. HTTP status code: ${s}`,c=B.create("stream-error",{originalErrorMessage:i});this.propagateError(c)}}}canEstablishStreamConnection(){const e=this.observers.size>0,n=!this.isRealtimeDisabled,r=!this.isConnectionActive,s=!this.isInBackground;return e&&n&&r&&s}async makeRealtimeHttpConnection(e){if(this.canEstablishStreamConnection()){if(this.httpRetriesRemaining>0)this.httpRetriesRemaining--,await new Promise(n=>setTimeout(n,e)),this.prepareAndBeginRealtimeHttpStream();else if(!this.isInBackground){const n=B.create("stream-error",{originalErrorMessage:"Unable to connect to the server. Check your connection and try again."});this.propagateError(n)}}}async beginRealtime(){this.observers.size>0&&await this.makeRealtimeHttpConnection(0)}addObserver(e){this.observers.add(e),this.beginRealtime()}removeObserver(e){this.observers.has(e)&&this.observers.delete(e)}async onVisibilityChange(e){this.isInBackground=!e,e?e&&await this.beginRealtime():await this.closeRealtimeHttpConnection()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lo(){xe(new Ee(pr,t,"PUBLIC").setMultipleInstances(!0)),fe(gt,pn),fe(gt,pn,"esm2020");function t(e,{options:n}){const r=e.getProvider("app").getImmediate(),s=e.getProvider("installations-internal").getImmediate(),a=e.getProvider("analytics-internal"),{projectId:i,apiKey:c,appId:d}=r.options;if(!i)throw B.create("registration-project-id");if(!c)throw B.create("registration-api-key");if(!d)throw B.create("registration-app-id");const f=(n==null?void 0:n.templateId)||"firebase",m=Dt()?new no(d,r.name,f):new ro,h=new so(m),o=new zn(gt);o.logLevel=F.ERROR;const E=new Gi(s,un,f,i,c,d),C=new Ki(E,m),u=new zi(C,m,h,o),p=new co(s,m,un,f,i,c,d,o,h,u),T=new Ji(r,u,h,m,o,p,a);return Vi(T),T}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function uo(t){return t=Ae(t),await Hi(t),Ui(t)}async function ho(){if(!Dt())return!1;try{return await Vn()}catch{return!1}}lo();const W={enabled:!0,code:"ADVERSE",discountAmountUsd:400,url:"https://onyxmotors.com/10389151",productName:"Onyx RCR"},re={enabled:"onyx_promo_enabled",code:"onyx_promo_code",discountAmountUsd:"onyx_promo_discount_amount_usd",url:"onyx_promo_url",productName:"onyx_promo_product_name"},fo={apiKey:"AIzaSyC53hOkevIGn-kk6ER5OAGqK3wX2DBJtyc",authDomain:"motormed.firebaseapp.com",projectId:"motormed",storageBucket:"motormed.firebasestorage.app",messagingSenderId:"251406379412",appId:"1:251406379412:web:3d821f722910728a5f8781",measurementId:"G-9CB73HX238"};let Ge=null;function mo(){const[t,e]=y.useState(W);return y.useEffect(()=>{let n=!1;return go().then(r=>{n||e(r)}),()=>{n=!0}},[]),t}function At({offer:t=W,className:e,codeClassName:n}){return t.enabled?l.jsxs("a",{className:e,href:t.url,target:"_blank",rel:"noopener noreferrer",children:["Use code ",l.jsx("span",{className:n,children:t.code})," to save ",So(t.discountAmountUsd)," on your next"," ",t.productName," purchase"]}):null}async function go(){return Ge||(Ge=(async()=>{try{if(!await ho())return W;const t=Pa()[0]??Wn(fo),e=$i(t);return e.defaultConfig={[re.enabled]:W.enabled,[re.code]:W.code,[re.discountAmountUsd]:W.discountAmountUsd,[re.url]:W.url,[re.productName]:W.productName},e.settings.minimumFetchIntervalMillis=36e5,await uo(e),po(e)}catch(t){return console.warn("[promo-config] Failed to fetch promo remote config",t),W}})(),Ge)}function po(t){return{enabled:yo(t,re.enabled,W.enabled),code:yt(t,re.code,W.code),discountAmountUsd:bo(t,re.discountAmountUsd,W.discountAmountUsd),url:yt(t,re.url,W.url),productName:yt(t,re.productName,W.productName)}}function yt(t,e,n){const r=$t(t,e);return r.getSource()==="static"?n:r.asString().trim()||n}function bo(t,e,n){const r=$t(t,e);if(r.getSource()==="static")return n;const s=r.asNumber();return Number.isFinite(s)&&s>0?s:n}function yo(t,e,n){const r=$t(t,e);return r.getSource()==="static"?n:r.asBoolean()}function So(t){return`$${Math.round(t)}`}function To({stats:t,isEnd:e,autoHide:n=!e,shareUrl:r,promoOffer:s,onDismiss:a,onAutoHide:i}){const[c,d]=y.useState(!1),[f,m]=y.useState(5),h=y.useRef(null),o=y.useRef(null),E=()=>{if(h.current&&clearTimeout(h.current),o.current&&clearInterval(o.current),!e&&n){m(5);const p=Date.now();o.current=setInterval(()=>{const T=Date.now()-p,v=Math.max(0,Math.ceil((5e3-T)/1e3));m(v)},150)}n&&(h.current=setTimeout(()=>{o.current&&clearInterval(o.current),i==null||i()},5e3))};y.useEffect(()=>(E(),()=>{h.current&&clearTimeout(h.current),o.current&&clearInterval(o.current)}),[e,n]);const C=()=>{E()},u=async()=>{const p=r??await Bn(window.location.href);try{navigator.share?await navigator.share({title:"Motormed Ride Replay",text:"Check out this ride replay",url:p}):await navigator.clipboard.writeText(p),d(!0),setTimeout(()=>d(!1),2e3)}catch{}};return l.jsx("div",{className:"ride-summary-overlay",onMouseMove:C,onClick:()=>a==null?void 0:a(),children:l.jsxs("div",{className:"ride-summary-card",onClick:p=>p.stopPropagation(),children:[l.jsx("div",{className:"ride-summary-title",children:e?"Ride Complete":"Ride Summary"}),!e&&n&&l.jsxs("div",{className:"ride-summary-countdown",children:["Replay starts in ",f,"s"]}),l.jsxs("div",{className:"ride-summary-hero",children:[l.jsxs("div",{className:"ride-summary-hero-stat",children:[l.jsx("span",{className:"ride-summary-hero-value",children:t.distanceLabel}),l.jsx("span",{className:"ride-summary-hero-label",children:"Distance"})]}),l.jsx("div",{className:"ride-summary-hero-divider"}),l.jsxs("div",{className:"ride-summary-hero-stat",children:[l.jsx("span",{className:"ride-summary-hero-value",children:Le(t.durationMs)}),l.jsx("span",{className:"ride-summary-hero-label",children:"Duration"})]})]}),l.jsx("div",{className:"ride-summary-rows",children:t.hasRouteData?l.jsxs(l.Fragment,{children:[l.jsx(L,{label:"Avg Speed",value:t.avgSpeed}),l.jsx(L,{label:"Top Speed",value:t.fastestSpeed}),l.jsx(L,{label:"0-20 MPH",value:t.zeroTo20Mph}),l.jsx(L,{label:"0-30 MPH",value:t.zeroTo30Mph}),l.jsx(L,{label:"0-45 MPH",value:t.zeroTo45Mph}),l.jsx(L,{label:"0-60 MPH",value:t.zeroTo60Mph}),l.jsx(L,{label:"0-Top Speed",value:t.zeroToTopSpeed}),l.jsx(L,{label:"Dead Stop",value:t.deadStopTime}),l.jsx(L,{label:"Total Climb",value:t.totalClimb}),l.jsx(L,{label:"Battery Drain",value:t.batteryDrain}),l.jsx(L,{label:"Avg Temps",value:t.avgTemps}),l.jsx(L,{label:"Max Temps",value:t.maxTemps}),l.jsx(L,{label:"Min Temps",value:t.minTemps})]}):l.jsxs(l.Fragment,{children:[l.jsx(L,{label:"Voltage",value:t.voltageDropLabel}),l.jsx(L,{label:"Max RPM",value:t.maxRpm}),l.jsx(L,{label:"Avg RPM",value:t.avgRpm}),l.jsx(L,{label:"Peak Battery A",value:t.peakCurrent}),l.jsx(L,{label:"Avg Battery A",value:t.avgCurrent}),l.jsx(L,{label:"Peak Phase A",value:t.peakPhaseCurrent}),l.jsx(L,{label:"Max Throttle",value:t.maxThrottle}),l.jsx(L,{label:"Avg Temps",value:t.avgTemps}),l.jsx(L,{label:"Max Temps",value:t.maxTemps}),l.jsx(L,{label:"Min Temps",value:t.minTemps})]})}),l.jsx(At,{offer:s,className:"ride-summary-promo",codeClassName:"ride-summary-promo-code"}),l.jsxs("div",{className:"ride-summary-actions",children:[e&&l.jsx("button",{className:"ride-summary-btn ride-summary-btn-share",onClick:u,children:c?"✓ Copied!":"Share Ride"}),a&&l.jsx("button",{className:"ride-summary-btn ride-summary-btn-dismiss",onClick:a,children:e?"Replay":"Watch"}),l.jsx("a",{className:"ride-summary-btn ride-summary-btn-getapp",href:"/",children:"Get Motormed"})]})]})})}function L({label:t,value:e}){return l.jsxs("div",{className:"ride-summary-row",children:[l.jsx("span",{className:"ride-summary-row-label",children:t}),l.jsx("span",{className:"ride-summary-row-value",children:e})]})}const Eo=[79,78,89,88],vo=1,wo=2,Mo=4,Co=8,Ro=16,Io=32,_o=64,xo=128,Ao=1,Fo=2,No=4,Do=8,ko=16,Lo=32,Po=1,Bo=2,Oo=4,jo=8,$o=16,Uo=1,Vo=2,Ho=4,zo=8,ue="[rxd-parser]";class Yo{constructor(e){this.pos=0,this.view=new DataView(e)}get remaining(){return this.view.byteLength-this.pos}readUint8(){return this.view.getUint8(this.pos++)}readInt16(){const e=this.view.getInt16(this.pos,!1);return this.pos+=2,e}readUint16(){const e=this.view.getUint16(this.pos,!1);return this.pos+=2,e}readInt32(){const e=this.view.getInt32(this.pos,!1);return this.pos+=4,e}readUint32(){const e=this.view.getUint32(this.pos,!1);return this.pos+=4,e}readInt64(){const e=this.view.getBigInt64(this.pos,!1);return this.pos+=8,e}readBytes(e){const n=new Uint8Array(this.view.buffer,this.pos,e);return this.pos+=e,new Uint8Array(n)}readUtf8StringWithU8Length(){const e=this.readUint8();if(e<=0)return;const n=this.readBytes(e);return new TextDecoder("utf-8").decode(n)}}function Go(t){var e,n,r,s,a,i,c,d,f,m,h;try{const o=globalThis["Onyx:rxd-kmp"],E=(s=(r=(n=(e=o==null?void 0:o.us)==null?void 0:e.wmwm)==null?void 0:n.onyx)==null?void 0:r.rxd)==null?void 0:s.RxdJsBridge,C=((d=(c=(i=(a=globalThis==null?void 0:globalThis.document)==null?void 0:a.querySelector)==null?void 0:i.call(a,'script[src*="Onyx-rxd-kmp.js"]'))==null?void 0:c.getAttribute)==null?void 0:d.call(c,"src"))??null;if(!E||typeof E.decode!="function")return console.warn(`${ue} kmp bridge unavailable; using legacy parser`,{hasModule:!!o,hasBridge:!!E,hasDecode:typeof(E==null?void 0:E.decode)=="function",kmpScriptSrc:C}),null;const u=Object.keys(((h=(m=(f=o==null?void 0:o.us)==null?void 0:f.wmwm)==null?void 0:m.onyx)==null?void 0:h.rxd)??{});console.info(`${ue} using kmp decoder`,{bridgeKeys:u,kmpScriptSrc:C,apiVersion:E.apiVersion??null,libVersion:E.version??null});const p=new Uint8Array(t),T=Int32Array.from(p,b=>b&255),v=E.decode(T);if(!v||!v.header||!v.records)return console.error(`${ue} kmp decode returned invalid payload`),null;const x={version:v.header.version,contentFlags:v.header.contentFlags,recordingId:BigInt(Math.trunc(v.header.recordingId)),startTimeMs:v.header.startTimeMs,endTimeMs:v.header.endTimeMs,controllerId:BigInt(Math.trunc(v.header.controllerId)),bmsId:BigInt(Math.trunc(v.header.bmsId)),device:v.header.device??void 0,modelName:v.header.modelName??void 0,firmwareVersion:v.header.firmwareVersion??void 0},_=v.records.map(b=>b.type==="TELEMETRY"?{type:"telemetry",timeMs:b.timeMs,motorTemp:b.motorTemp??void 0,controllerTemp:b.controllerTemp??void 0,batteryCurrent:b.batteryCurrent??void 0,batteryVoltage:b.batteryVoltage??void 0,rpm:b.rpm??void 0,throttlePercent:b.throttlePercent??void 0,batteryTemp:b.batteryTemp??void 0,flagsBitmask:b.flagsBitmask??void 0,sag:b.sag??void 0,internalResistance:b.internalResistance??void 0,phaseCurrent:b.phaseCurrent??void 0,statusFlags:b.statusFlags??void 0,brakePercent:b.brakePercent??void 0,errorFlags:b.errorFlags??void 0}:b.type==="GPS"?{type:"gps",timeMs:b.timeMs,lat:b.lat??void 0,lng:b.lng??void 0,speed:b.speed??void 0,altitude:b.altitude??void 0,bearing:b.bearing??void 0,accuracy:b.accuracy??void 0}:b.type==="GYRO"?{type:"gyro",timeMs:b.timeMs,x:b.gyroX??void 0,y:b.gyroY??void 0,z:b.gyroZ??void 0,accuracy:b.gyroAccuracy??void 0,sensorType:b.gyroType??void 0,orientation:b.gyroOrientation??void 0}:{type:"event",timeMs:b.timeMs,eventType:b.eventType??0}),j=_.filter(b=>b.type==="gps"&&b.lat!=null&&b.lng!=null).length;return console.info(`${ue} kmp parse ok`,{fileVersion:x.version,contentFlags:x.contentFlags,totalRecords:_.length,gpsWithLatLng:j,telemetryRecords:_.filter(b=>b.type==="telemetry").length,gyroRecords:_.filter(b=>b.type==="gyro").length,eventRecords:_.filter(b=>b.type==="event").length}),{header:x,records:_}}catch(o){return console.error(`${ue} kmp decode threw`,o),null}}function Xo(t){const e=new Yo(t),n=e.readBytes(4);for(let o=0;o<4;o++)if(n[o]!==Eo[o])throw new Error("Not a .motormed file (invalid magic bytes)");const r=e.readUint8(),s=e.readUint8();e.readUint16();const a=e.readInt64(),i=Number(e.readInt64()),c=Number(e.readInt64()),d=e.readInt64(),f=e.readInt64();if(e.remaining<0)throw new Error("File too short to contain records");const m={version:r,contentFlags:s,recordingId:a,startTimeMs:i,endTimeMs:c,controllerId:d,bmsId:f};r>=4&&e.remaining>0&&(m.device=e.readUtf8StringWithU8Length(),m.modelName=e.readUtf8StringWithU8Length(),m.firmwareVersion=e.readUtf8StringWithU8Length());const h=[];for(;e.remaining>0;){const o=e.readUint8();if(o===255||e.remaining<4)break;const E=e.readUint32(),C=i+E;if(o===1){const u=e.readUint8(),p=e.readUint8(),T={type:"telemetry",timeMs:C};u&vo&&(T.motorTemp=e.readInt16()/10),u&wo&&(T.controllerTemp=e.readInt16()/10),u&Mo&&(T.batteryCurrent=e.readInt16()/10),u&Co&&(T.batteryVoltage=e.readUint16()/100),u&Ro&&(T.rpm=e.readUint16()),u&Io&&(T.throttlePercent=e.readUint8()),u&_o&&(T.batteryTemp=e.readInt16()/10),u&xo&&(T.flagsBitmask=e.readInt32()),p&Ao&&(T.sag=e.readUint16()/1e3),p&Fo&&(T.internalResistance=e.readUint16()/1e3),p&No&&(T.phaseCurrent=e.readInt16()/10),p&Do&&(T.statusFlags=e.readUint16()),p&ko&&(T.brakePercent=e.readUint16()/10),p&Lo&&(T.errorFlags=e.readUint16()),h.push(T)}else if(o===2){const u=e.readUint8(),p={type:"gps",timeMs:C};u&Po&&(p.lat=e.readInt32()/1e7,p.lng=e.readInt32()/1e7),u&Bo&&(p.speed=e.readUint16()/100),u&Oo&&(p.altitude=e.readInt16()/10),u&jo&&(p.bearing=e.readUint16()/100),u&$o&&(p.accuracy=e.readUint8()),h.push(p)}else if(o===3){const u=e.readUint8(),p={type:"gyro",timeMs:C};u&Uo&&(p.x=e.readInt16()/1e3,p.y=e.readInt16()/1e3,p.z=e.readInt16()/1e3),u&Vo&&(p.accuracy=e.readUint8()),u&Ho&&(p.sensorType=e.readUint8()),u&zo&&(p.orientation=e.readUint8()),h.push(p)}else if(o===4){const u=e.readUint8();h.push({type:"event",timeMs:C,eventType:u})}else{console.warn(`Unknown RXD record type 0x${o.toString(16)} at offset, stopping parse`);break}}return{header:m,records:h}}function Wo(t){const e=Go(t);if(e)return e;console.warn(`${ue} falling back to legacy parser`);try{const n=Xo(t),r=n.records.filter(s=>s.type==="gps"&&s.lat!=null&&s.lng!=null).length;return console.info(`${ue} legacy parse ok`,{fileVersion:n.header.version,contentFlags:n.header.contentFlags,totalRecords:n.records.length,gpsWithLatLng:r,telemetryRecords:n.records.filter(s=>s.type==="telemetry").length,gyroRecords:n.records.filter(s=>s.type==="gyro").length,eventRecords:n.records.filter(s=>s.type==="event").length}),n}catch(n){throw console.error(`${ue} legacy parse failed`,n),n}}const Ko=1,Zo=2,qo=4;function Jo(t){const e=t.records.filter(m=>m.type==="telemetry").sort((m,h)=>m.timeMs-h.timeMs),n=t.records.filter(m=>m.type==="gyro"&&(m.sensorType===Ko||m.sensorType==null)).sort((m,h)=>m.timeMs-h.timeMs),r=t.records.filter(m=>m.type==="gyro"&&m.sensorType===qo).sort((m,h)=>m.timeMs-h.timeMs),s=t.records.filter(m=>m.type==="gyro"&&m.sensorType===Zo).sort((m,h)=>m.timeMs-h.timeMs),a=t.records.filter(m=>m.type==="gps"&&m.lat!=null&&m.lng!=null).sort((m,h)=>m.timeMs-h.timeMs),i=Array.from(new Set([...e.map(m=>m.timeMs),...a.map(m=>m.timeMs),...n.map(m=>m.timeMs),...r.map(m=>m.timeMs),...s.map(m=>m.timeMs)])).sort((m,h)=>m-h);if(i.length===0)return[];const c=i.map(m=>{const h=Qo(a,m,2500),o=De(e,m),E=De(n,m),C=De(r,m),u=De(s,m),p={timeMs:m,lat:(h==null?void 0:h.lat)??0,lng:(h==null?void 0:h.lng)??0,speed:h==null?void 0:h.speed,altitude:h==null?void 0:h.altitude,bearing:h==null?void 0:h.bearing};return o&&(p.motorTemp=o.motorTemp,p.controllerTemp=o.controllerTemp,p.batteryTemp=o.batteryTemp,p.batteryCurrent=o.batteryCurrent,p.batteryVoltage=o.batteryVoltage,p.rpm=o.rpm,p.throttlePercent=o.throttlePercent,p.phaseCurrent=o.phaseCurrent,p.sag=o.sag,p.internalResistance=o.internalResistance,p.flagsBitmask=o.flagsBitmask,p.statusFlags=o.statusFlags,p.brakePercent=o.brakePercent,p.errorFlags=o.errorFlags),E&&(p.accelX=E.x,p.accelY=E.y,p.accelZ=E.z,p.gyroX=E.x,p.gyroY=E.y,p.gyroZ=E.z),C&&(p.gyroRateX=C.x,p.gyroRateY=C.y,p.gyroRateZ=C.z),u&&(p.magnetX=u.x,p.magnetY=u.y,p.magnetZ=u.z),p}),d=ec(c),f=tc(d);return rc(f)}function De(t,e){if(t.length===0)return;let n=0,r=t.length-1;for(;n<r;){const i=n+r>>1;t[i].timeMs<e?n=i+1:r=i}if(n===0)return t[0];const s=t[n-1],a=t[n];return Math.abs(a.timeMs-e)<Math.abs(s.timeMs-e)?a:s}function Qo(t,e,n){const r=De(t,e);if(r)return Math.abs(r.timeMs-e)<=n?r:void 0}function ec(t){if(t.length<4)return t;const e=t.filter(u=>Number.isFinite(u.speed)&&(Number.isFinite(u.accelX)&&Number.isFinite(u.accelY)&&Number.isFinite(u.accelZ)||Number.isFinite(u.gyroX)&&Number.isFinite(u.gyroY)&&Number.isFinite(u.gyroZ)||Number.isFinite(u.gyroRateX)&&Number.isFinite(u.gyroRateY)&&Number.isFinite(u.gyroRateZ)));if(e.length<8)return t;const n=e.map(u=>u.speed).filter(u=>Number.isFinite(u)).sort((u,p)=>u-p);if(n.length<8)return t;const r=nc(n,.85),s=Math.max(2.5,r);let a=e.filter(u=>u.speed>=s);if(a.length<8){const u=[...e].sort((p,T)=>T.speed-p.speed);a=u.slice(0,Math.min(24,u.length))}if(a.length<4)return t;const i=ie(a.map(u=>u.accelX).filter(u=>Number.isFinite(u))),c=ie(a.map(u=>u.accelY).filter(u=>Number.isFinite(u))),d=ie(a.map(u=>u.accelZ).filter(u=>Number.isFinite(u))),f=ie(a.map(u=>u.gyroX).filter(u=>Number.isFinite(u))),m=ie(a.map(u=>u.gyroY).filter(u=>Number.isFinite(u))),h=ie(a.map(u=>u.gyroZ).filter(u=>Number.isFinite(u))),o=ie(a.map(u=>u.gyroRateX).filter(u=>Number.isFinite(u))),E=ie(a.map(u=>u.gyroRateY).filter(u=>Number.isFinite(u))),C=ie(a.map(u=>u.gyroRateZ).filter(u=>Number.isFinite(u)));return t.map(u=>{const p=Number.isFinite(u.accelX)||Number.isFinite(u.accelY)||Number.isFinite(u.accelZ),T=Number.isFinite(u.gyroX)||Number.isFinite(u.gyroY)||Number.isFinite(u.gyroZ),v=Number.isFinite(u.gyroRateX)||Number.isFinite(u.gyroRateY)||Number.isFinite(u.gyroRateZ);return!p&&!T&&!v?u:{...u,accelX:Number.isFinite(u.accelX)?u.accelX-i:u.accelX,accelY:Number.isFinite(u.accelY)?u.accelY-c:u.accelY,accelZ:Number.isFinite(u.accelZ)?u.accelZ-d:u.accelZ,gyroX:Number.isFinite(u.gyroX)?u.gyroX-f:u.gyroX,gyroY:Number.isFinite(u.gyroY)?u.gyroY-m:u.gyroY,gyroZ:Number.isFinite(u.gyroZ)?u.gyroZ-h:u.gyroZ,gyroRateX:Number.isFinite(u.gyroRateX)?u.gyroRateX-o:u.gyroRateX,gyroRateY:Number.isFinite(u.gyroRateY)?u.gyroRateY-E:u.gyroRateY,gyroRateZ:Number.isFinite(u.gyroRateZ)?u.gyroRateZ-C:u.gyroRateZ}})}function tc(t){if(t.length<4)return t;const e=[...t];let n,r,s;for(let a=0;a<e.length;a++){const i=e[a],c=i.gyroX,d=i.gyroY,f=i.gyroZ;if(!Number.isFinite(c)&&!Number.isFinite(d)&&!Number.isFinite(f))continue;const m=Number.isFinite(i.speed)?i.speed:0,h=m>=8?.32:m>=4?.24:.16,o=Number.isFinite(c)?c:n,E=Number.isFinite(d)?d:r,C=Number.isFinite(f)?f:s;n==null&&(n=o??0),r==null&&(r=E??0),s==null&&(s=C??0),o!=null&&(n=n+(o-n)*h),E!=null&&(r=r+(E-r)*h),C!=null&&(s=s+(C-s)*h),e[a]={...i,gyroX:Number.isFinite(c)?n:i.gyroX,gyroY:Number.isFinite(d)?r:i.gyroY,gyroZ:Number.isFinite(f)?s:i.gyroZ}}return e}function nc(t,e){if(t.length===0)return 0;if(t.length===1)return t[0];const n=Math.max(0,Math.min(1,e)),r=(t.length-1)*n,s=Math.floor(r),a=Math.ceil(r);if(s===a)return t[s];const i=r-s;return t[s]*(1-i)+t[a]*i}function ie(t){if(t.length===0)return 0;const e=[...t].sort((r,s)=>r-s),n=Math.floor(e.length/2);return e.length%2===1?e[n]:(e[n-1]+e[n])/2}function rc(t){if(t.length===0)return t;const e=[...t];let n=0,r=0,s=!1,a=t[0].timeMs;for(let i=0;i<e.length;i++){const c=e[i],d=Math.max(0,(c.timeMs-a)/1e3);a=c.timeMs;const f=c.accelX,m=c.accelY,h=c.accelZ,o=c.gyroRateX,E=c.gyroRateY,C=c.gyroRateZ,u=c.magnetX,p=c.magnetY,T=c.magnetZ,v=Number.isFinite(f)&&Number.isFinite(m)&&Number.isFinite(h),x=Number.isFinite(o)&&Number.isFinite(E)&&Number.isFinite(C),_=Number.isFinite(u)&&Number.isFinite(p)&&Number.isFinite(T);if(!(Number(v)+Number(x)+Number(_)<2)){if(s||(v&&(n=Ft(f,m,h).roll),_&&v?r=Cn(f,m,h,u,p,T):_?r=Math.atan2(-p,u):r=0,s=!0),x&&d>0&&(n+=o*d,r+=C*d),v){const b=Ft(f,m,h);x?n=.98*n+.02*b.roll:n=b.roll}if(_){const b=v?Cn(f,m,h,u,p,T):Math.atan2(-p,u);r=x?sc(r,b,.02):b}e[i]={...c,attitudeRollDeg:Rn(n),attitudeYawDeg:ac(Rn(r))}}}return e}function Ft(t,e,n){const r=Math.atan2(e,n),s=Math.atan2(-t,Math.sqrt(e*e+n*n));return{roll:r,pitch:s}}function Cn(t,e,n,r,s,a){const{roll:i,pitch:c}=Ft(t,e,n),d=Math.cos(i),f=Math.sin(i),m=Math.cos(c),h=Math.sin(c),o=r*m+a*h,E=r*f*h+s*d-a*f*m;return Math.atan2(-E,o)}function sc(t,e,n){let r=e-t;for(;r>Math.PI;)r-=Math.PI*2;for(;r<-Math.PI;)r+=Math.PI*2;return t+r*n}function Rn(t){return t*180/Math.PI}function ac(t){const e=t%360;return e<0?e+360:e}function Sr(t,e){const r=t.lat*Math.PI/180,s=e.lat*Math.PI/180,a=(e.lat-t.lat)*Math.PI/180,i=(e.lng-t.lng)*Math.PI/180,c=Math.sin(a/2)**2+Math.cos(r)*Math.cos(s)*Math.sin(i/2)**2;return 6371e3*2*Math.atan2(Math.sqrt(c),Math.sqrt(1-c))}function ic(t){return!Number.isFinite(t.lat)||!Number.isFinite(t.lng)||t.lat===0&&t.lng===0?!1:t.lat>=-90&&t.lat<=90&&t.lng>=-180&&t.lng<=180}function oc(t){const e=t.filter(ic);if(e.length<2)return e;const n=[e[0]],r=120;for(let s=1;s<e.length;s++){const a=n[n.length-1],i=e[s],c=Math.max(0,(i.timeMs-a.timeMs)/1e3);if(c<=0)continue;const d=Sr(a,i);if(!Number.isFinite(d)||d<0)continue;const f=d/c;!Number.isFinite(f)||f>r||n.push(i)}return n}function cc(t){const e=Math.floor(t/1e3),n=Math.floor(e/60),r=e%60;return`${String(n).padStart(2,"0")}:${String(r).padStart(2,"0")}`}function lc(t){const e=Math.floor(t/1e3),n=Math.floor(e/60),r=e%60,s=Math.floor(t%1e3/10);return n>0?`${String(n).padStart(2,"0")}:${String(r).padStart(2,"0")}.${String(s).padStart(2,"0")}`:`${String(r).padStart(2,"0")}.${String(s).padStart(2,"0")}`}function uc(t){let e=0;for(let n=1;n<t.length;n++){const r=t[n].altitude,s=t[n-1].altitude;r!=null&&s!=null&&r>s&&(e+=r-s)}return e}function St(t,e,n,r){if(t==null&&e==null&&n==null)return"—";const s=i=>i!=null?oe(i,r).replace(/°[CF]$/,""):"—",a=`°${r}`;return`M/C/B ${s(t)}/${s(e)}/${s(n)} ${a}`}function In(t,e,n){const r=t.speed??0,s=e.speed??0;if(r===s)return r>=n?t.timeMs:null;const a=r<=n&&s>=n,i=r>=n&&s<=n;if(!a&&!i)return null;const c=Math.min(1,Math.max(0,(n-r)/(s-r)));return t.timeMs+(e.timeMs-t.timeMs)*c}function dc(t,e,n=.5){if(t.length<2||e<=n)return null;const r=e/2.2369362921,s=n/2.2369362921;let a=null;for(let i=0;i<t.length-1;i+=1){const c=t[i];if(!((c.speed??0)>s))for(let f=i+1;f<t.length;f+=1){const m=t[f-1],h=t[f];if((h.speed??0)<r)continue;const E=In(c,t[i+1],s)??c.timeMs,u=(In(m,h,r)??h.timeMs)-E;u>=0&&(a=a==null?u:Math.min(a,u));break}}return a!=null&&a>0?a:null}function hc(t,e,n){const r=oc(t),s=r.length>=2,a={totalDistanceMeters:0,distanceLabel:"0",durationMs:0,avgSpeed:"—",fastestSpeed:"—",zeroTo20Mph:"—",zeroTo30Mph:"—",zeroTo45Mph:"—",zeroTo60Mph:"—",zeroToTopSpeed:"—",deadStopTime:"00:00",totalClimb:"—",batteryDrain:"—",avgTemps:"—",maxTemps:"—",minTemps:"—",hasRouteData:s,maxRpm:"—",avgRpm:"—",peakCurrent:"—",avgCurrent:"—",startVoltage:"—",endVoltage:"—",voltageDropLabel:"—",maxThrottle:"—",peakPhaseCurrent:"—"};if(t.length<2)return a;let i=0;for(let S=1;S<r.length;S++)i+=Sr(r[S-1],r[S]);const c=e==="mph"?i>=1609?`${(i/1609.344).toFixed(2)} mi`:`${Math.round(i*3.28084)} ft`:i>=1e3?`${(i/1e3).toFixed(2)} km`:`${Math.round(i)} m`,d=t[t.length-1].timeMs-t[0].timeMs,f=t.map(S=>S.speed??0),m=f.reduce((S,$)=>S+$,0)/f.length,h=Math.max(...f),o=h*2.2369362921,E=S=>{const $=dc(t,S);return $!=null?lc($):"—"},C=.35;let u=0;for(let S=1;S<t.length;S++){const $=Math.min(t[S].timeMs-t[S-1].timeMs,1e4);((t[S].speed??0)+(t[S-1].speed??0))*.5<=C&&(u+=$)}const p=uc(t),T=t.map(S=>S.batteryVoltage).filter(S=>S!=null&&S>0),v=T.length>=2?Math.max(0,T[0]-T[T.length-1]):0,x=t.map(S=>S.motorTemp).filter(S=>S!=null&&S>0),_=t.map(S=>S.controllerTemp).filter(S=>S!=null&&S>0),j=t.map(S=>S.batteryTemp).filter(S=>S!=null&&S>0),b=S=>S.length?S.reduce(($,ge)=>$+ge,0)/S.length:null,g=S=>S.length?Math.max(...S):null,A=S=>S.length?Math.min(...S):null,P=t.map(S=>S.rpm).filter(S=>S!=null&&S>0),O=P.length?Math.max(...P):null,te=P.length?P.reduce((S,$)=>S+$,0)/P.length:null,X=t.map(S=>S.batteryCurrent).filter(S=>S!=null),K=X.length?Math.max(...X):null,D=X.length?X.reduce((S,$)=>S+$,0)/X.length:null,z=t.map(S=>S.phaseCurrent).filter(S=>S!=null),Y=z.length?Math.max(...z):null,G=t.map(S=>S.throttlePercent).filter(S=>S!=null&&S>0),se=G.length?Math.max(...G):null,Z=T.length>0?T[0]:null,H=T.length>0?T[T.length-1]:null,q=Z!=null&&H!=null?Math.max(0,Z-H):null;return{totalDistanceMeters:i,distanceLabel:c,durationMs:d,avgSpeed:Et(m,e),fastestSpeed:Et(h,e),zeroTo20Mph:E(20),zeroTo30Mph:E(30),zeroTo45Mph:E(45),zeroTo60Mph:E(60),zeroToTopSpeed:o>=1?E(o):"—",deadStopTime:cc(u),totalClimb:p>0?`${Math.round(p)} m`:"—",batteryDrain:v>0?`${v.toFixed(1)} V`:"—",avgTemps:St(b(x),b(_),b(j),n),maxTemps:St(g(x),g(_),g(j),n),minTemps:St(A(x),A(_),A(j),n),hasRouteData:s,maxRpm:O!=null?`${Math.round(O)} RPM`:"—",avgRpm:te!=null?`${Math.round(te)} RPM`:"—",peakCurrent:K!=null?`${K.toFixed(1)} A`:"—",avgCurrent:D!=null?`${D.toFixed(1)} A`:"—",startVoltage:Z!=null?`${Z.toFixed(1)} V`:"—",endVoltage:H!=null?`${H.toFixed(1)} V`:"—",voltageDropLabel:q!=null&&q>0?`${Z.toFixed(1)} → ${H.toFixed(1)} V (−${q.toFixed(2)} V)`:"—",maxThrottle:se!=null?`${Math.round(se)}%`:"—",peakPhaseCurrent:Y!=null?`${Y.toFixed(1)} A`:"—"}}const fc=new Set(["US","BS","BZ","KY","PW","FM","MH"]),mc=new Set(["US","GB","MM","LR"]);function Tr(){try{return new Intl.Locale(navigator.language).region??null}catch{return null}}function _n(){const t=Tr();return t&&fc.has(t)?"F":"C"}function xn(){const t=Tr();return t&&mc.has(t)?"mph":"kmh"}const An="/rxds/1.motormed",Fn=3e4,gc=3*1609.344;function Nn(t){const e=t.match(/^(https:\/\/firebasestorage\.googleapis\.com(?::\d+)?\/v0\/b\/[^/?#]+\/o\/)([^?#]*)(.*)$/);if(!e)return t;const n=e[2].replace(/\//g,"%2F");return e[1]+n+e[3]}function pc(){const[t,e]=y.useState("idle"),[n,r]=y.useState(""),[s,a]=y.useState(An),[i,c]=y.useState(null),[d,f]=y.useState(null),[m,h]=y.useState(!1),[o,E]=y.useState([]),[C,u]=y.useState(null),[p,T]=y.useState(0),[v,x]=y.useState(0),[_,j]=y.useState([]),[b,g]=y.useState(null),[A,P]=y.useState("hidden"),[O,te]=y.useState(!0),[X,K]=y.useState(!1),[D,z]=y.useState(!1),[Y,G]=y.useState(!0),se=!!"pk.eyJ1Ijoic25vb3Bsc20iLCJhIjoiY21td21ocHFtMHpkZzJ4cTcwbzE5bGMyYyJ9.zoK1ZxN2141ao2DmjOCadg".trim(),Z=o.filter(w=>Number.isFinite(w.lat)&&Number.isFinite(w.lng)&&(w.lat!==0||w.lng!==0));y.useEffect(()=>{t==="ready"&&console.info("[replay-map] gate",{hasRouteData:O,hasMapboxToken:se,points:o.length,gpsPoints:o.filter(w=>Number.isFinite(w.lat)&&Number.isFinite(w.lng)&&(w.lat!==0||w.lng!==0)).length})},[t,O,se,o]);const[H,q]=y.useState(!1),[S,$]=y.useState(0),[ge,Vt]=y.useState({type:"duration",seconds:15}),Er=xn(),vr=_n(),Oe=y.useRef(0),Me=y.useRef(0),ae=y.useRef(0),je=y.useRef(!1),Ht=y.useRef(1),$e=y.useRef(0),Qe=y.useRef(0),pe=y.useRef(null),et=y.useRef(null),Fe=y.useRef(null),tt=mo(),J=_.length>0?jr(_):0;y.useEffect(()=>{je.current=H},[H]),y.useEffect(()=>{Ht.current=vt(ge,J)},[ge,J]),y.useEffect(()=>{ae.current=S},[S]),$e.current=J;const nt=J>0?Math.min(S/J,1):0,wr=vt(ge,J),Mr=y.useCallback((w,M)=>{if(w<=0)return"";const R=new Date(w),k=M>0?new Date(M):null;if(!k)return R.toLocaleTimeString([],{hour:"numeric",minute:"2-digit",second:"2-digit"});const V=R.toDateString()===k.toDateString(),I=R.toLocaleTimeString([],{hour:"numeric",minute:"2-digit",second:"2-digit"}),ne=k.toLocaleTimeString([],{hour:"numeric",minute:"2-digit",second:"2-digit"});if(V)return`${I} - ${ne}`;const Q=R.toLocaleString([],{month:"numeric",day:"numeric",year:"numeric",hour:"numeric",minute:"2-digit",second:"2-digit"}),Ie=k.toLocaleString([],{month:"numeric",day:"numeric",year:"numeric",hour:"numeric",minute:"2-digit",second:"2-digit"});return`${Q} - ${Ie}`},[]),Ue=y.useCallback(w=>{const M=Wo(w),R=Jo(M);if(R.length<2)throw new Error("Not enough replay samples in this recording");const k=M.records.filter(I=>I.type==="gps"&&I.lat!=null&&I.lng!=null).length;te(k>=2),E(R),u({version:M.header.version,contentFlags:M.header.contentFlags,recordingId:M.header.recordingId.toString(),startTimeMs:M.header.startTimeMs,endTimeMs:M.header.endTimeMs,controllerId:M.header.controllerId.toString(),bmsId:M.header.bmsId.toString(),device:M.header.device,modelName:M.header.modelName,firmwareVersion:M.header.firmwareVersion}),j(Br(R)),T(M.header.startTimeMs),x(M.header.endTimeMs);const V=hc(R,xn(),_n());g(V),Vt(V.totalDistanceMeters>gc?{type:"duration",seconds:45}:{type:"duration",seconds:15}),P("intro"),$(0),ae.current=0,q(!1),e("ready")},[]),zt=y.useCallback(w=>{const M=new URL(window.location.href);return M.searchParams.set("f",w),M.toString()},[]),Yt=y.useCallback(async w=>{try{const M=zt(w),R=await Bn(M);f(R)}catch{f(null)}},[zt]),Ve=y.useCallback(async(w,M)=>{const R=w.trim();let k=R;try{k=decodeURIComponent(R)}catch{}const V=Nn(k);if(!V){r("Enter a valid .motormed URL."),e("error");return}if(e("loading"),r(""),h(!1),c(V),M){const I=new URL(window.location.href);I.searchParams.set("f",V),window.history.replaceState({},"",I.toString())}try{const I=new AbortController,ne=window.setTimeout(()=>I.abort(),Fn),Q=await fetch(V,{signal:I.signal,cache:"no-store"});if(window.clearTimeout(ne),!Q.ok)throw new Error(`HTTP ${Q.status}: ${Q.statusText}`);const Ie=await Q.arrayBuffer();Ue(Ie),Yt(V)}catch(I){I instanceof DOMException&&I.name==="AbortError"?r(`Timed out loading ride file after ${Math.round(Fn/1e3)}s.`):r(I instanceof Error?I.message:String(I)),e("error")}},[Ue,Yt]),Ce=o.length>0?at(o,Kt(_,S,o[0].timeMs)):null,be=(Ce==null?void 0:Ce.point)??null,rt=(Ce==null?void 0:Ce.index)??0,Re=Z.length>0&&be?at(Z,be.timeMs):null,Cr=(Re==null?void 0:Re.point)??null,Rr=(Re==null?void 0:Re.index)??0,Ir=be?be.bearing!=null?be.bearing:rt>0?Dn(o[rt],be):0:0,st=y.useCallback(w=>{if(!je.current)return;Me.current===0&&(Me.current=w);const M=w-Me.current;Me.current=w;const R=M*Ht.current,k=Math.min(ae.current+R,$e.current);if(ae.current=k,(w-Qe.current>=33||k>=$e.current)&&($(k),Qe.current=w),k>=$e.current){q(!1),je.current=!1,P("end");return}Oe.current=requestAnimationFrame(st)},[]);y.useEffect(()=>(H?(Me.current=0,Qe.current=0,Oe.current=requestAnimationFrame(st)):(cancelAnimationFrame(Oe.current),Me.current=0),()=>cancelAnimationFrame(Oe.current)),[H,st]);const _r=()=>{A==="intro"?(P("hidden"),q(!0)):P("hidden")};y.useEffect(()=>{const M=new URLSearchParams(window.location.search).get("f"),R=M?Nn(M):null;if(!R){e("idle");return}a(R),Ve(R,!1)},[Ve]),y.useEffect(()=>{const w=I=>{var Q;const ne=(Q=I.dataTransfer)==null?void 0:Q.types;return!!ne&&Array.from(ne).includes("Files")},M=I=>{w(I)&&(I.preventDefault(),K(!0))},R=I=>{w(I)&&(I.preventDefault(),I.dataTransfer&&(I.dataTransfer.dropEffect="copy"),X||K(!0))},k=I=>{w(I)&&(I.preventDefault(),I.relatedTarget==null&&K(!1))},V=async I=>{var Ie;if(!w(I))return;I.preventDefault(),K(!1);const Q=Array.from(((Ie=I.dataTransfer)==null?void 0:Ie.files)??[]).find(ye=>ye.name.toLowerCase().endsWith(".motormed"));if(!Q){r("Drop a .motormed file to load a ride."),e("error");return}e("loading");try{const ye=await Q.arrayBuffer();c(null),f(null),Ue(ye)}catch(ye){r(ye instanceof Error?ye.message:String(ye)),e("error")}};return window.addEventListener("dragenter",M),window.addEventListener("dragover",R),window.addEventListener("dragleave",k),window.addEventListener("drop",V),()=>{window.removeEventListener("dragenter",M),window.removeEventListener("dragover",R),window.removeEventListener("dragleave",k),window.removeEventListener("drop",V)}},[X,Ue]);const Ne=y.useCallback(()=>{o.length<2||(!H&&S>=J&&($(0),ae.current=0,P("hidden")),q(w=>!w))},[H,S,J,o.length]),ee=y.useCallback(()=>{G(!0),Fe.current&&clearTimeout(Fe.current),A==="hidden"&&(Fe.current=setTimeout(()=>{G(!1)},3e3))},[A]);y.useEffect(()=>(ee(),()=>{Fe.current&&clearTimeout(Fe.current)}),[ee]);const xr=y.useCallback(w=>{if(ee(),w.button!==0||A!=="hidden")return;const M=w.target;M!=null&&M.closest(".controls,button,a,input,textarea,select,label,.progress-track,.speed-control,.speed-popover,.ride-summary-overlay,.ride-summary-card,.url-load-row")||Ne()},[Ne,ee,A]);y.useEffect(()=>{const w=M=>{const R=M.target;if(!(R&&(R.isContentEditable||/^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test(R.tagName)))){if(M.key==="ArrowRight"||M.key==="ArrowLeft"){if(o.length<2)return;M.preventDefault(),ee(),q(!1),je.current=!1;const k=M.key==="ArrowRight"?1:-1,V=at(o,Kt(_,ae.current,o[0].timeMs)),I=Math.max(0,Math.min(o.length-1,V.index+k)),ne=Or(_,o[I].timeMs);ae.current=ne,$(ne);return}if(!(M.key!==" "&&M.code!=="Space")){if(M.preventDefault(),ee(),A==="intro"){P("hidden"),q(!0);return}if(A!=="hidden"){P("hidden");return}Ne()}}};return window.addEventListener("keydown",w),()=>window.removeEventListener("keydown",w)},[Ne,ee,A,o,_]);const He=y.useCallback((w,M)=>{const R=M.getBoundingClientRect(),V=Math.max(0,Math.min(1,(w-R.left)/R.width))*J;$(V),ae.current=V,q(!1)},[J]),Ar=y.useCallback(w=>{var M,R;ee(),w.preventDefault(),z(!0),pe.current=w.pointerId,et.current=w.currentTarget,(R=(M=w.currentTarget).setPointerCapture)==null||R.call(M,w.pointerId),He(w.clientX,w.currentTarget)},[ee,He]);y.useEffect(()=>{if(!D)return;const w=R=>{if(pe.current!=null&&R.pointerId!==pe.current)return;const k=et.current;k&&He(R.clientX,k)},M=R=>{R&&pe.current!=null&&R.pointerId!==pe.current||(pe.current=null,z(!1))};return window.addEventListener("pointermove",w),window.addEventListener("pointerup",M),window.addEventListener("pointercancel",M),()=>{window.removeEventListener("pointermove",w),window.removeEventListener("pointerup",M),window.removeEventListener("pointercancel",M),pe.current=null}},[D,He]);const Gt=y.useCallback(async()=>{await Ve(s,!0)},[Ve,s]),Fr=y.useCallback(async()=>{if(d)try{await navigator.clipboard.writeText(d),h(!0),setTimeout(()=>h(!1),2e3)}catch{}},[d]),Xt=y.useCallback(()=>{s===An&&a("")},[s]);return t==="idle"?l.jsxs("div",{className:"splash",children:[l.jsx("img",{src:"/logo.svg",style:{width:80,height:80},alt:"Motormed"}),l.jsx("h1",{children:"Motormed Replay"}),l.jsxs("p",{children:["Add a ",l.jsx("code",{style:{color:"#6C63FF"},children:"?f="})," query parameter with a URL to a"," ",l.jsx("code",{style:{color:"#EB3D70"},children:".motormed"})," file to load a ride."]}),l.jsxs("p",{style:{fontSize:"0.75rem",marginTop:4},children:["Example: ",l.jsx("code",{children:"?f=https://example.com/ride.motormed"})]}),l.jsxs("p",{style:{fontSize:"0.75rem",marginTop:4},children:["Or drag and drop a ",l.jsx("code",{children:".motormed"})," file anywhere on this page."]}),l.jsxs("div",{className:"url-load-row",children:[l.jsx("input",{className:"url-load-input",placeholder:"Paste .motormed URL",value:s,onChange:w=>a(w.target.value),onFocus:Xt}),l.jsx("button",{className:"url-load-btn",onClick:Gt,disabled:!s.trim(),children:"Load URL"})]}),l.jsx("a",{className:"install-inline-cta",href:Wt,children:"Install Motormed to record and share your own rides"}),l.jsx(At,{offer:tt,className:"splash-promo",codeClassName:"splash-promo-code"})]}):t==="loading"?l.jsxs("div",{className:"splash",children:[l.jsx("img",{src:"/logo.svg",style:{width:60,height:60,opacity:.6},alt:"Motormed"}),l.jsx("div",{className:"spinner"}),l.jsx("h1",{children:"Loading ride…"})]}):t==="error"?l.jsxs("div",{className:"splash",children:[l.jsx("h1",{children:"Failed to load ride"}),l.jsx("p",{children:n}),l.jsxs("div",{className:"url-load-row",children:[l.jsx("input",{className:"url-load-input",placeholder:"Paste .motormed URL",value:s,onChange:w=>a(w.target.value),onFocus:Xt}),l.jsx("button",{className:"url-load-btn",onClick:Gt,disabled:!s.trim(),children:"Load URL"})]}),l.jsx("a",{className:"install-inline-cta",href:Wt,children:"Install Motormed to record and share rides from the app"}),l.jsx(At,{offer:tt,className:"splash-promo",codeClassName:"splash-promo-code"})]}):l.jsxs("div",{className:"map-root",onMouseDown:xr,onMouseMove:ee,onTouchStart:ee,children:[X&&l.jsx("div",{style:{position:"fixed",inset:0,zIndex:9999,background:"rgba(13, 18, 30, 0.72)",border:"2px dashed rgba(255,255,255,0.55)",display:"grid",placeItems:"center",color:"#fff",fontWeight:700,letterSpacing:.3,pointerEvents:"none"},children:"Drop .motormed file to load ride"}),O&&se?l.jsx(Yr,{points:Z,currentPoint:Cr,currentIndex:Rr,progress:nt,playbackRate:wr,onMapReady:()=>{}}):l.jsx("div",{className:"map-fallback",children:l.jsx("div",{className:"map-fallback-label",children:O?se?"Map unavailable • telemetry playback":"Map token missing (VITE_MAPBOX_TOKEN) • telemetry playback":"No route data • telemetry playback"})}),l.jsx(as,{point:be,elapsedMs:S,headingDeg:Ir,allPoints:o,currentIndex:rt,speedUnit:Er,tempUnit:vr,hasRouteData:O,headerMeta:C}),b&&A!=="hidden"&&l.jsx(To,{stats:b,isEnd:A==="end",autoHide:A==="intro",shareUrl:d??void 0,promoOffer:tt,onAutoHide:_r,onDismiss:()=>{A==="end"?($(0),ae.current=0,P("hidden")):A==="intro"?(P("hidden"),q(!0)):P("hidden")}}),l.jsxs("div",{className:`controls${Y?"":" controls-hidden"}`,children:[l.jsxs("div",{className:"controls-row",children:[l.jsx("button",{className:"play-btn",onClick:Ne,disabled:o.length<2,"aria-label":H?"Pause":"Play",children:H?l.jsx(yc,{}):l.jsx(bc,{})}),l.jsx("span",{className:"time-label",children:Le(S)}),l.jsxs("div",{ref:et,className:"progress-track",onPointerDown:Ar,children:[l.jsx("div",{className:"progress-fill",style:{width:`${nt*100}%`}}),l.jsx("div",{className:"progress-thumb",style:{left:`${nt*100}%`}})]}),l.jsx("span",{className:"time-label",style:{textAlign:"right"},children:Le(J)}),l.jsx(gs,{mode:ge,compressedDurationMs:J,onChange:Vt})]}),o.length>0&&l.jsxs("div",{style:{fontSize:11,color:"rgba(255,255,255,0.4)",paddingLeft:4},children:[O?Z.length:o.length," ",O?"GPS":"telemetry"," points · ",Mr(p,v)]}),i&&d||b&&A==="hidden"?l.jsxs("div",{style:{fontSize:11,color:"rgba(255,255,255,0.7)",paddingLeft:4,display:"flex",gap:8,alignItems:"center"},children:[i&&d&&l.jsxs(l.Fragment,{children:[l.jsx("span",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:d}),l.jsx("button",{className:"url-load-btn",onClick:Fr,children:m?"Copied":"Copy Link"})]}),b&&A==="hidden"&&l.jsx("button",{className:"url-load-btn",onClick:()=>P("manual"),children:"Ride Summary"})]}):null]})]})}function bc(){return l.jsx("svg",{viewBox:"0 0 24 24","aria-hidden":!0,children:l.jsx("path",{d:"M8 5v14l11-7z"})})}function yc(){return l.jsx("svg",{viewBox:"0 0 24 24","aria-hidden":!0,children:l.jsx("path",{d:"M6 19h4V5H6v14zm8-14v14h4V5h-4z"})})}Nr(document.getElementById("root")).render(l.jsx(y.StrictMode,{children:l.jsxs("div",{className:"page-shell replay-shell",children:[l.jsx(Dr,{}),l.jsx(pc,{})]})}));
