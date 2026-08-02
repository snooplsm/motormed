import{r as S,j as l}from"./jsx-runtime-Dquw9cxk.js";import{b as zt,c as vr,S as Er}from"./Nav-B-yJ6pxd.js";import{m as Mr}from"./mapbox-BP_diXpR.js";const Cr=.5,Ir=8,Rr=1e3;function _r(t){if(t.length<2)return[];const e=[];let n=0;for(let r=0;r<t.length-1;r++){const s=t[r],a=t[r+1],i=a.timeMs-s.timeMs;if(i<=0)continue;const f=((s.speed??0)+(a.speed??0))/2<Cr&&i>=Rr?Math.max(Math.round(i/Ir),100):i;e.push({compressedStartMs:n,compressedDurationMs:f,realStartTs:s.timeMs,realDurationMs:i}),n+=f}return e}function Yt(t,e,n){if(t.length===0)return n+e;if(e<=0)return t[0].realStartTs;const r=t[t.length-1],s=r.compressedStartMs+r.compressedDurationMs;if(e>=s)return r.realStartTs+r.realDurationMs;for(const a of t){const i=a.compressedStartMs+a.compressedDurationMs;if(e<=i){const c=(e-a.compressedStartMs)/a.compressedDurationMs;return a.realStartTs+c*a.realDurationMs}}return r.realStartTs+r.realDurationMs}function xr(t,e){if(t.length===0)return 0;const n=t[0];if(e<=n.realStartTs)return 0;const r=t[t.length-1];if(e>=r.realStartTs+r.realDurationMs)return r.compressedStartMs+r.compressedDurationMs;for(const s of t)if(e<=s.realStartTs+s.realDurationMs){const a=(e-s.realStartTs)/s.realDurationMs;return s.compressedStartMs+a*s.compressedDurationMs}return r.compressedStartMs+r.compressedDurationMs}function Ar(t){if(t.length===0)return 0;const e=t[t.length-1];return e.compressedStartMs+e.compressedDurationMs}function rt(t,e){if(t.length===0)throw new Error("No points");if(t.length===1||e<=t[0].timeMs)return{index:0,point:t[0]};if(e>=t[t.length-1].timeMs)return{index:t.length-1,point:t[t.length-1]};let n=0,r=t.length-1;for(;n<r-1;){const d=n+r>>1;t[d].timeMs<=e?n=d:r=d}const s=t[n],a=t[r],i=Math.max(a.timeMs-s.timeMs,1),c=Math.min(Math.max((e-s.timeMs)/i,0),1);return{index:n,point:{timeMs:e,lat:Gt(s.lat,a.lat,c),lng:Gt(s.lng,a.lng,c),speed:N(s.speed,a.speed,c),altitude:N(s.altitude,a.altitude,c),bearing:Xt(s.bearing,a.bearing,c),motorTemp:N(s.motorTemp,a.motorTemp,c),controllerTemp:N(s.controllerTemp,a.controllerTemp,c),batteryTemp:N(s.batteryTemp,a.batteryTemp,c),batteryCurrent:N(s.batteryCurrent,a.batteryCurrent,c),batteryVoltage:N(s.batteryVoltage,a.batteryVoltage,c),rpm:Fr(s.rpm,a.rpm,c),throttlePercent:N(s.throttlePercent,a.throttlePercent,c),phaseCurrent:N(s.phaseCurrent,a.phaseCurrent,c),sag:N(s.sag,a.sag,c),internalResistance:N(s.internalResistance,a.internalResistance,c),gyroX:N(s.gyroX,a.gyroX,c),gyroY:N(s.gyroY,a.gyroY,c),gyroZ:N(s.gyroZ,a.gyroZ,c),accelX:N(s.accelX,a.accelX,c),accelY:N(s.accelY,a.accelY,c),accelZ:N(s.accelZ,a.accelZ,c),gyroRateX:N(s.gyroRateX,a.gyroRateX,c),gyroRateY:N(s.gyroRateY,a.gyroRateY,c),gyroRateZ:N(s.gyroRateZ,a.gyroRateZ,c),magnetX:N(s.magnetX,a.magnetX,c),magnetY:N(s.magnetY,a.magnetY,c),magnetZ:N(s.magnetZ,a.magnetZ,c),attitudeRollDeg:N(s.attitudeRollDeg,a.attitudeRollDeg,c),attitudeYawDeg:Xt(s.attitudeYawDeg,a.attitudeYawDeg,c)}}}function Gt(t,e,n){return t+(e-t)*n}function Fr(t,e,n){const r=N(t,e,n);return r!=null?Math.round(r):void 0}function N(t,e,n){if(!(t==null&&e==null))return t==null?e:e==null?t:t+(e-t)*n}function Xt(t,e,n){if(t==null&&e==null)return;if(t==null)return e;if(e==null)return t;let r=e-t;return r>180&&(r-=360),r<-180&&(r+=360),(t+r*n+360)%360}function Nr(t,e){const n=e.lng-t.lng,r=e.lat-t.lat;return n===0&&r===0?0:(Math.atan2(n,r)*180/Math.PI+360)%360}function Wt(t,e){if(t.length<2)return 0;const n=Math.min(e,t.length-1);let r=0;for(let s=1;s<=n;s++){const a=t[s-1].altitude,i=t[s].altitude;a!=null&&i!=null&&i>a&&(r+=i-a)}return r}Mr.accessToken=void 0;function Dr({gx:t,gy:e,gz:n,size:r=44}){const s=S.useRef(null);return S.useEffect(()=>{const a=s.current;if(!a)return;const i=a.getContext("2d");if(!i)return;const c=Math.max(-45,Math.min(45,t*18)),d=Math.max(-12,Math.min(12,e*10)),f=window.devicePixelRatio||1;a.width=r*f,a.height=r*f,a.style.width=`${r}px`,a.style.height=`${r}px`,i.scale(f,f);const m=r/2,h=r/2,o=r*.42;i.clearRect(0,0,r,r),i.beginPath(),i.arc(m,h,o,0,Math.PI*2),i.fillStyle="rgba(255,255,255,0.12)",i.fill(),i.beginPath(),i.arc(m,h,o,0,Math.PI*2),i.strokeStyle="rgba(255,255,255,0.5)",i.lineWidth=1.6,i.stroke(),i.save(),i.translate(m,h+d),i.rotate(-c*Math.PI/180),i.beginPath(),i.moveTo(-o*.82,0),i.lineTo(o*.82,0),i.strokeStyle="#6CC6FF",i.lineWidth=2.8,i.stroke(),i.restore(),i.beginPath(),i.moveTo(m-o*.45,h),i.lineTo(m+o*.45,h),i.strokeStyle="#fff",i.lineWidth=2.4,i.stroke(),i.beginPath(),i.moveTo(m,h-o*.3),i.lineTo(m,h+o*.28),i.strokeStyle="#fff",i.lineWidth=2.2,i.stroke()},[t,e,n,r]),l.jsx("canvas",{ref:s,className:"gyro-canvas",width:r,height:r})}function Le(t){const e=Math.floor(t/1e3),n=Math.floor(e/60),r=e%60;return`${String(n).padStart(2,"0")}:${String(r).padStart(2,"0")}`}function pt(t,e){return t==null?"—":`${(e==="mph"?t*2.23694:t*3.6).toFixed(1)} ${e==="mph"?"mph":"km/h"}`}function ae(t,e){if(t==null)return"—";const n=e==="F"?t*9/5+32:t;return`${Math.round(n)}°${e}`}function kr(t){const e=(t%360+360)%360;return`${["N","NE","E","SE","S","SW","W","NW"][Math.round(e/45)%8]} ${Math.round(e)}°`}const Lr=["Brake Active","Foot Switch","Forward Switch","Reverse","Hall Sensor A","Hall Sensor B","Hall Sensor C","Setting Direction","Actual Direction","Brake Switch","Low Speed","Identify Error","Over Voltage","Low Voltage","Locking","V+ Error","Controller Hot","High Throttle","Reset Error","Throttle Fault","Hall Sensor Fault","Reverse Error","Motor Hot","Current Meter Error"],Pr=[{bit:0,label:"Overcurrent",isStatus:!1},{bit:1,label:"Overvoltage",isStatus:!1},{bit:2,label:"Undervoltage",isStatus:!1},{bit:3,label:"Controller Over Temp",isStatus:!1},{bit:4,label:"Motor Over Temp",isStatus:!1},{bit:5,label:"Hall Sensor Fault",isStatus:!1},{bit:6,label:"Throttle Fault",isStatus:!1},{bit:7,label:"Brake Fault",isStatus:!1},{bit:8,label:"Current Sensor Fault",isStatus:!1},{bit:9,label:"Comm Timeout",isStatus:!1},{bit:10,label:"Hardware Fault",isStatus:!1},{bit:11,label:"Speed Sensor Fault",isStatus:!1},{bit:12,label:"Parameter Fault",isStatus:!1},{bit:13,label:"Stall Fault",isStatus:!1},{bit:14,label:"Battery Temp Fault",isStatus:!1},{bit:15,label:"Reserved",isStatus:!1},{bit:32,label:"Over Temp Warn",isStatus:!0},{bit:33,label:"High Voltage Warn",isStatus:!0},{bit:34,label:"Low Voltage Warn",isStatus:!0},{bit:35,label:"Motor Temp Warn",isStatus:!0},{bit:36,label:"Current Limit",isStatus:!0},{bit:37,label:"Speed Limit",isStatus:!0},{bit:38,label:"Low Battery Warn",isStatus:!0},{bit:39,label:"Comm Warning",isStatus:!0}],Or=[{bit:0,label:"Motor hall",isStatus:!1},{bit:1,label:"Throttle",isStatus:!1},{bit:2,label:"Current protect restart",isStatus:!1},{bit:3,label:"Phase current surge",isStatus:!1},{bit:4,label:"Voltage protect",isStatus:!1},{bit:5,label:"Alarm protect",isStatus:!1},{bit:6,label:"Motor temp protect",isStatus:!1},{bit:7,label:"Controller temp protect",isStatus:!1},{bit:8,label:"Phase current overflow",isStatus:!1},{bit:9,label:"Phase zero",isStatus:!1},{bit:10,label:"Phase short/lost",isStatus:!1},{bit:11,label:"Line current zero",isStatus:!1},{bit:12,label:"MOSFET high side",isStatus:!1},{bit:13,label:"MOSFET low side",isStatus:!1},{bit:14,label:"MOE current protect",isStatus:!1},{bit:15,label:"Brake alarm",isStatus:!1},{bit:32,label:"Reverse",isStatus:!0},{bit:33,label:"Rolling",isStatus:!0},{bit:34,label:"Motor stopped",isStatus:!0},{bit:35,label:"Rolling forward",isStatus:!0},{bit:36,label:"Rolling reverse",isStatus:!0},{bit:37,label:"Weak mode",isStatus:!0},{bit:38,label:"EABS",isStatus:!0},{bit:39,label:"Auto learn",isStatus:!0},{bit:40,label:"Motor running",isStatus:!0},{bit:41,label:"Pass OK",isStatus:!0},{bit:42,label:"Phone OK",isStatus:!0},{bit:43,label:"Old BLE",isStatus:!0}],Br=[{bit:1,label:"Over voltage",isStatus:!1},{bit:2,label:"Under voltage",isStatus:!1},{bit:3,label:"DRV fault",isStatus:!1},{bit:4,label:"ABS over current",isStatus:!1},{bit:5,label:"Over temp FET",isStatus:!1},{bit:6,label:"Over temp motor",isStatus:!1},{bit:7,label:"Gate driver over voltage",isStatus:!1},{bit:8,label:"Gate driver under voltage",isStatus:!1},{bit:9,label:"MCU under voltage",isStatus:!1},{bit:10,label:"Booting from watchdog",isStatus:!1},{bit:11,label:"Encoder SPI",isStatus:!1},{bit:12,label:"Encoder SINCOS below min amp",isStatus:!1},{bit:13,label:"Encoder SINCOS above max amp",isStatus:!1},{bit:14,label:"Flash corruption",isStatus:!1},{bit:15,label:"High offset current sensor 1",isStatus:!1},{bit:16,label:"High offset current sensor 2",isStatus:!1},{bit:17,label:"High offset current sensor 3",isStatus:!1},{bit:18,label:"Unbalanced currents",isStatus:!1},{bit:19,label:"Brake resistor",isStatus:!1},{bit:20,label:"Resolver loss of tracking",isStatus:!1},{bit:21,label:"Resolver degradation of signal",isStatus:!1},{bit:22,label:"Resolver loss of signal",isStatus:!1},{bit:23,label:"App config flash corruption",isStatus:!1},{bit:24,label:"Motor config flash corruption",isStatus:!1},{bit:25,label:"Encoder no magnet",isStatus:!1},{bit:26,label:"Encoder magnet too strong",isStatus:!1},{bit:27,label:"Phase filter",isStatus:!1},{bit:28,label:"Encoder fault",isStatus:!1}];function $r(){var t,e,n,r;try{const s=globalThis["Onyx:rxd-kmp"],a=(r=(n=(e=(t=s==null?void 0:s.us)==null?void 0:t.wmwm)==null?void 0:e.onyx)==null?void 0:n.rxd)==null?void 0:r.RxdControllerFlagsBridge;if(!a)return null;const i=typeof a.kellyLabels=="function"?a.kellyLabels():null,c=i!=null?Array.from(i).map(f=>String(f)):null,d=typeof a.kellyStatusBitCount=="function"?Number(a.kellyStatusBitCount()):null;return!c||!c.length||!Number.isFinite(d)?null:{labels:c,statusBits:d}}catch{return null}}function Rt(t,e){var n,r,s,a;try{const i=globalThis["Onyx:rxd-kmp"],c=(a=(s=(r=(n=i==null?void 0:i.us)==null?void 0:n.wmwm)==null?void 0:r.onyx)==null?void 0:s.rxd)==null?void 0:a.RxdControllerFlagsBridge,d=c&&typeof c[t]=="function"?c[t]():null,f=d!=null?Array.from(d).map(m=>{const[h,o,...T]=String(m).split("|");return{bit:Number(h),isStatus:o==="1",label:T.join("|")}}).filter(m=>Number.isFinite(m.bit)&&m.label):[];return f.length?f:e}catch{return e}}const Re=$r(),jr=(Re==null?void 0:Re.labels)??Lr,Ur=(Re==null?void 0:Re.statusBits)??11,Vr={kind:"kelly",entries:jr.map((t,e)=>({bit:e,label:t,isStatus:e<Ur}))},Hr={kind:"bac",entries:Rt("bacLabelEntries",Pr)},zr={kind:"fardriver",entries:Rt("farDriverLabelEntries",Or)},Yr={kind:"vesc",entries:Rt("vescLabelEntries",Br)};function Gr({point:t,elapsedMs:e,headingDeg:n,allPoints:r,currentIndex:s,speedUnit:a,tempUnit:i,hasRouteData:c,headerMeta:d}){const f=qr(d);if(!c)return l.jsx(Xr,{point:t,elapsedMs:e,allPoints:r,currentIndex:s,speedUnit:a,tempUnit:i,flagSchema:f});const m=Wt(r,s),o=Wt(r,Math.max(0,r.length-1))>.5,T=r.some(g=>g.flagsBitmask!=null),M=Rn(t,r,s),u=g=>Math.max((g==null?void 0:g.phaseCurrent)??0,(g==null?void 0:g.batteryCurrent)??0),v=[{label:"Speed",hasData:g=>(g.speed??0)>1e-4,render:g=>pt(g==null?void 0:g.speed,a)},{label:"Motor",hasData:g=>(g.motorTemp??0)>1e-4,render:g=>ae((g==null?void 0:g.motorTemp)??0,i),valueColor:g=>ke(g==null?void 0:g.motorTemp,120,150)},{label:"Controller",hasData:g=>(g.controllerTemp??0)>1e-4,render:g=>ae((g==null?void 0:g.controllerTemp)??0,i),valueColor:g=>ke(g==null?void 0:g.controllerTemp,110,130)},{label:"Battery",hasData:g=>(g.batteryTemp??0)>1e-4,render:g=>ae((g==null?void 0:g.batteryTemp)??0,i),valueColor:g=>ke(g==null?void 0:g.batteryTemp,90,100)},{label:"Current",hasData:g=>u(g)>1e-4,render:g=>`${u(g).toFixed(1)} A`},{label:"Voltage",hasData:g=>(g.batteryVoltage??0)>1e-4,render:g=>`${((g==null?void 0:g.batteryVoltage)??0).toFixed(1)} V`},{label:"RPM",hasData:g=>(g.rpm??0)>0,render:g=>`${Math.round((g==null?void 0:g.rpm)??0)}`},{label:"Throttle",hasData:g=>(g.throttlePercent??0)>1e-4,render:g=>`${Math.round((g==null?void 0:g.throttlePercent)??0)}%`},{label:"Brake",hasData:g=>(g.brakePercent??0)>1e-4,render:g=>`${((g==null?void 0:g.brakePercent)??0).toFixed(1)}%`},{label:"Sag",hasData:g=>(g.sag??0)>1e-4,render:g=>`${(((g==null?void 0:g.sag)??0)*1e3).toFixed(0)} mV`},{label:"Status",hasData:g=>g.statusFlags!=null,render:g=>`0x${((g==null?void 0:g.statusFlags)??0).toString(16).toUpperCase()}`},{label:"Errors",hasData:g=>g.errorFlags!=null,render:g=>`0x${((g==null?void 0:g.errorFlags)??0).toString(16).toUpperCase()}`}].filter(g=>r.some(g.hasData)),C=(t==null?void 0:t.accelX)??(t==null?void 0:t.gyroX)??0,x=(t==null?void 0:t.accelY)??(t==null?void 0:t.gyroY)??0,_=(t==null?void 0:t.accelZ)??(t==null?void 0:t.gyroZ)??0,U=Math.round((t==null?void 0:t.attitudeRollDeg)??C*18),y=Math.round((t==null?void 0:t.attitudeYawDeg)??Jr(_*57.2958));return l.jsxs("div",{className:"hud",children:[l.jsx(ze,{label:"Timestamp",value:xn(t==null?void 0:t.timeMs)}),l.jsx(ze,{label:"Time",value:Le(e)}),v.map(g=>{var A;return l.jsx(ze,{label:g.label,value:g.render(t),valueColor:(A=g.valueColor)==null?void 0:A.call(g,t)},g.label)}),o&&l.jsx(ze,{label:"Climb",value:`${m.toFixed(0)} m`}),T&&M!=null&&l.jsx(Zr,{bitmask:M,schema:f}),l.jsxs("div",{className:"hud-gyro-row",children:[l.jsx("span",{className:"hud-heading",children:kr(n)}),l.jsx(Dr,{gx:C,gy:x,gz:_,size:44})]}),(Math.abs(U)>0||Math.abs(y)>0)&&l.jsxs("div",{className:"hud-angles",children:["R ",U,"°  Y ",y,"°"]}),l.jsx("div",{className:"hud-brand",children:"Motormed"})]})}function Xr({point:t,elapsedMs:e,allPoints:n,currentIndex:r,tempUnit:s,flagSchema:a}){const i=n.some(o=>o.flagsBitmask!=null),c=Rn(t,n,r),d=o=>{const T=$(o==null?void 0:o.phaseCurrent),M=$(o==null?void 0:o.batteryCurrent);return T==null&&M==null?null:Math.max(T??Number.NEGATIVE_INFINITY,M??Number.NEGATIVE_INFINITY)},f=[{field:"rpm",label:"RPM",unit:"",color:"#7C6FFF",fmt:o=>Math.round(o).toString()},{field:"batteryVoltage",label:"Voltage",unit:"V",color:"#58E28A"},{field:"batteryCurrent",label:"Current",unit:"A",color:"#FFC857"},{field:"throttlePercent",label:"Throttle",unit:"%",color:"#FF9F43",fmt:o=>Math.round(o).toString()},{field:"motorTemp",label:"Motor Temp",unit:"",color:"#FF5D78",fmt:o=>ae(o,s)},{field:"controllerTemp",label:"Controller Temp",unit:"",color:"#54A0FF",fmt:o=>ae(o,s)},{field:"batteryTemp",label:"Battery Temp",unit:"",color:"#A29BFE",fmt:o=>ae(o,s)}],h=[{label:"RPM",color:"#7C6FFF",hasAny:o=>$(o.rpm)!=null&&(o.rpm??0)>0,render:o=>`${Math.round($(o==null?void 0:o.rpm)??0)}`},{label:"Voltage",color:"#58E28A",hasAny:o=>$(o.batteryVoltage)!=null&&(o.batteryVoltage??0)>0,render:o=>`${($(o==null?void 0:o.batteryVoltage)??0).toFixed(1)} V`},{label:"Current",color:"#FFC857",hasAny:o=>d(o)!=null&&(d(o)??0)>0,render:o=>`${(d(o)??0).toFixed(1)} A`},{label:"Throttle",color:"#FF9F43",hasAny:o=>$(o.throttlePercent)!=null&&(o.throttlePercent??0)>0,render:o=>`${Math.round($(o==null?void 0:o.throttlePercent)??0)}%`},{label:"Motor",hasAny:o=>$(o.motorTemp)!=null&&(o.motorTemp??0)>0,render:o=>ae($(o==null?void 0:o.motorTemp)??0,s)},{label:"Controller",hasAny:o=>$(o.controllerTemp)!=null&&(o.controllerTemp??0)>0,render:o=>ae($(o==null?void 0:o.controllerTemp)??0,s)}].filter(o=>n.some(o.hasAny));return l.jsxs("div",{className:"hud-dashboard",children:[l.jsxs("div",{className:"hud-dash-metrics",children:[l.jsx(st,{label:"Timestamp",value:xn(t==null?void 0:t.timeMs)}),l.jsx(st,{label:"Time",value:Le(e)}),h.map(o=>{const T=o.render(t),M=o.label==="Motor"?ke($(t==null?void 0:t.motorTemp),120,150):o.label==="Controller"?ke($(t==null?void 0:t.controllerTemp),110,130):void 0;return l.jsx(st,{label:o.label,value:T,color:o.color??M??"#fff"},o.label)})]}),l.jsx("div",{className:"hud-dash-graphs",children:f.map(({field:o,label:T,unit:M,color:u,fmt:p})=>{let v=null;return o==="batteryCurrent"?v=d(t):v=$(t==null?void 0:t[o]),l.jsx(Wr,{points:n,field:o,label:T,unit:M,color:u,currentIndex:r,currentValue:v,fmtValue:p},o)})}),i&&c!=null&&l.jsx(Kr,{bitmask:c,schema:a}),l.jsx("div",{className:"hud-dash-brand",children:"Motormed"})]})}function Wr({points:t,field:e,label:n,unit:r,color:s,currentIndex:a,currentValue:i,fmtValue:c}){let d=null;const f=t.map(P=>{let G=$(P[e]);if(e==="batteryCurrent"){const H=$(P.phaseCurrent),X=$(P.batteryCurrent);G=H==null&&X==null?null:Math.max(H??Number.NEGATIVE_INFINITY,X??Number.NEGATIVE_INFINITY)}return G!=null&&(d=G),d}),m=f.filter(P=>Number.isFinite(P));if(m.length<2)return null;const h=Math.min(...m),o=Math.max(...m),T=o-h||1,M=400,u=64,p=2,v=4,C=P=>p+P/(t.length-1)*(M-2*p),x=P=>u-v-(P-h)/T*(u-2*v),_=[],U=[];let y=!0,g=p;for(let P=0;P<t.length;P++){const G=f[P];if(G==null||!Number.isFinite(G)){y=!0;continue}const H=C(P),X=x(G);y?(g=H,_.push(`M ${H} ${X}`),U.push(`M ${H} ${u} L ${H} ${X}`),y=!1):(_.push(`L ${H} ${X}`),U.push(`L ${H} ${X}`))}U.length>0&&U.push(`L ${C(t.length-1)} ${u} L ${g} ${u} Z`);const A=C(Math.min(a,t.length-1)),O=f[Math.min(a,f.length-1)],V=i??O,fe=V,q=V!=null?c?c(V):`${V>=100?V.toFixed(0):V.toFixed(1)}${r?" "+r:""}`:"—",Q=`tg-${e}`;return l.jsxs("div",{className:"telem-graph",children:[l.jsxs("div",{className:"telem-graph-header",children:[l.jsx("span",{className:"telem-graph-label",children:n}),l.jsx("span",{className:"telem-graph-current",style:{color:s},children:q})]}),l.jsxs("svg",{viewBox:`0 0 ${M} ${u}`,preserveAspectRatio:"none",className:"telem-graph-svg",children:[l.jsx("defs",{children:l.jsxs("linearGradient",{id:Q,x1:"0",y1:"0",x2:"0",y2:"1",children:[l.jsx("stop",{offset:"0%",stopColor:s,stopOpacity:"0.28"}),l.jsx("stop",{offset:"100%",stopColor:s,stopOpacity:"0.02"})]})}),l.jsx("path",{d:U.join(" "),fill:`url(#${Q})`}),l.jsx("path",{d:_.join(" "),fill:"none",stroke:s,strokeWidth:"1.5",strokeLinejoin:"round"}),l.jsx("line",{x1:A,y1:0,x2:A,y2:u,stroke:"rgba(255,255,255,0.5)",strokeWidth:"1"}),fe!=null&&l.jsx("circle",{cx:A,cy:x(fe),r:"3",fill:s,stroke:"rgba(255,255,255,0.7)",strokeWidth:"1"})]}),l.jsxs("div",{className:"telem-graph-range",children:[l.jsx("span",{children:c?c(h):`${h.toFixed(1)}${r?" "+r:""}`}),l.jsx("span",{children:c?c(o):`${o.toFixed(1)}${r?" "+r:""}`})]})]})}function Rn(t,e,n){var r;if((t==null?void 0:t.flagsBitmask)!=null)return t.flagsBitmask;for(let s=Math.min(n,e.length-1);s>=0;s--){const a=(r=e[s])==null?void 0:r.flagsBitmask;if(a!=null)return a}return null}function ke(t,e,n){const r=$(t);if(r==null||r<=0)return;const s=r*9/5+32;return s<=e?"#58E28A":s<=n?"#FFC857":"#FF5D78"}function $(t){return t==null||!Number.isFinite(t)||Math.abs(t+1)<1e-6?null:t}function st({label:t,value:e,color:n}){return l.jsxs("div",{className:"hud-dash-metric",children:[l.jsx("span",{className:"hud-dash-metric-value",style:n?{color:n}:void 0,children:e}),l.jsx("span",{className:"hud-dash-metric-label",children:t})]})}function Kr({bitmask:t,schema:e}){return l.jsx("div",{className:"hud-dash-flags",children:l.jsx("div",{className:"hud-dash-flags-grid",children:e.entries.map(n=>{const r=_n(t,n.bit),a=n.isStatus?r?"status-on":"status-off":r?"error-on":"error-off";return l.jsxs("div",{className:"hud-dash-flag-item",children:[l.jsx("span",{className:`hud-dash-flag-dot ${a}`}),l.jsx("span",{className:"hud-dash-flag-label",children:n.label})]},`${n.bit}-${n.label}`)})})})}function Zr({bitmask:t,schema:e}){return l.jsx("div",{className:"hud-bitflags",children:l.jsx("div",{className:"hud-bitflags-grid",children:e.entries.map(n=>{const r=_n(t,n.bit),a=n.isStatus?r?"status-on":"status-off":r?"error-on":"error-off";return l.jsxs("div",{className:"hud-bitflag-item",title:n.label,children:[l.jsx("span",{className:`hud-bitflag-dot ${a}`}),l.jsx("span",{className:"hud-bitflag-label",children:n.label})]},`${n.bit}-${n.label}`)})})})}function qr(t){const e=`${(t==null?void 0:t.device)??""} ${(t==null?void 0:t.modelName)??""} ${(t==null?void 0:t.firmwareVersion)??""}`.toUpperCase();return e.includes("VESC")||e.includes("FLIPSKY")||e.includes("TRAMPA")||e.includes("STORMCORE")||e.includes("MAKERX")||e.includes("UBOX")||e.includes("LFOC")?Yr:e.includes("FARDRIVER")||e.includes("FAR DRIVER")||e.includes("FLUX_CONTROL")||e.includes("FLUX CONTROL")?zr:e.includes("BAC")?Hr:Vr}function _n(t,e){return Number.isFinite(t)?(BigInt(Math.trunc(t))>>BigInt(e)&1n)===1n:!1}function ze({label:t,value:e,valueColor:n}){return l.jsxs("div",{className:"metric-row",children:[l.jsx("span",{className:"metric-label",children:t}),l.jsx("span",{className:"metric-value",style:n?{color:n}:void 0,children:e})]})}function xn(t){return!t||!Number.isFinite(t)?"—":new Date(t).toLocaleString([],{month:"numeric",day:"numeric",hour:"numeric",minute:"2-digit",second:"2-digit"})}function Jr(t){const e=t%360;return e<0?e+360:e}const Qr=[15,30,45,60],es=[1,1.5,2,3,4,8,16,32];function ts(t){if(t.type==="duration")return`${t.seconds}s`;const e=t.value;return e===Math.floor(e)?`${e}×`:`${e.toFixed(1)}×`}function bt(t,e){return t.type==="duration"?e>0?e/(t.seconds*1e3):1:t.value}function ns({mode:t,compressedDurationMs:e,onChange:n}){const[r,s]=S.useState(!1),a=S.useRef(),i=S.useCallback(()=>{a.current=setTimeout(()=>s(!1),160)},[]),c=S.useCallback(()=>{clearTimeout(a.current)},[]),d=S.useCallback(h=>{n(h),s(!1),c()},[n,c]),f=bt(t,e),m=f>=10?`${Math.round(f)}×`:`${f.toFixed(1)}×`;return l.jsxs("div",{className:"speed-control",onMouseEnter:()=>{c(),s(!0)},onMouseLeave:i,children:[r&&l.jsxs("div",{className:"speed-popover",onMouseEnter:c,onMouseLeave:i,children:[l.jsx("div",{className:"speed-popover-section-label",children:"Duration"}),l.jsx("div",{className:"speed-popover-row",children:Qr.map(h=>l.jsxs("button",{className:`speed-popover-btn${t.type==="duration"&&t.seconds===h?" active":""}`,onClick:()=>d({type:"duration",seconds:h}),children:[h,"s"]},h))}),l.jsx("div",{className:"speed-popover-divider"}),l.jsx("div",{className:"speed-popover-section-label",children:"Speed"}),l.jsx("div",{className:"speed-popover-row",children:es.map(h=>{const o=h===Math.floor(h)?`${h}×`:`${h.toFixed(1)}×`;return l.jsx("button",{className:`speed-popover-btn${t.type==="rate"&&t.value===h?" active":""}`,onClick:()=>d({type:"rate",value:h}),children:o},h)})})]}),l.jsxs("button",{className:"speed-control-trigger","aria-label":"Playback speed",children:[l.jsx("span",{className:"speed-control-mode",children:ts(t)}),l.jsx("span",{className:"speed-control-rate",children:m})]})]})}const Kt="https://mtr.rprtd.app",rs="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";async function ss(t){const e=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(t)),n=new Uint8Array(e);let r=BigInt(0);for(let a=0;a<6;a++)r=r<<8n|BigInt(n[a]);let s="";for(let a=0;a<7;a++)s=rs[Number(r%62n)]+s,r/=62n;return s}async function An(t){const e=`${Kt}?f=${encodeURIComponent(t)}`;try{const r=await fetch(e,{method:"GET",redirect:"manual",mode:"cors"}),s=r.headers.get("Location")??r.headers.get("location");if(s&&s.startsWith("http"))return s}catch{}try{const r=new Image;r.referrerPolicy="no-referrer",r.src=e}catch{}const n=await ss(t);return`${Kt}/${n}`}const as=()=>{};var Zt={};/**
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
 */const is={SDK_VERSION:"${JSCORE_VERSION}"};/**
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
 */const yt=function(t,e){if(!t)throw os(e)},os=function(t){return new Error("Firebase Database ("+is.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
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
 */const Fn=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},cs=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const a=t[n++];e[r++]=String.fromCharCode((s&31)<<6|a&63)}else if(s>239&&s<365){const a=t[n++],i=t[n++],c=t[n++],d=((s&7)<<18|(a&63)<<12|(i&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(d>>10)),e[r++]=String.fromCharCode(56320+(d&1023))}else{const a=t[n++],i=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(a&63)<<6|i&63)}}return e.join("")},Nn={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const a=t[s],i=s+1<t.length,c=i?t[s+1]:0,d=s+2<t.length,f=d?t[s+2]:0,m=a>>2,h=(a&3)<<4|c>>4;let o=(c&15)<<2|f>>6,T=f&63;d||(T=64,i||(o=64)),r.push(n[m],n[h],n[o],n[T])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Fn(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):cs(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const a=n[t.charAt(s++)],c=s<t.length?n[t.charAt(s)]:0;++s;const f=s<t.length?n[t.charAt(s)]:64;++s;const h=s<t.length?n[t.charAt(s)]:64;if(++s,a==null||c==null||f==null||h==null)throw new ls;const o=a<<2|c>>4;if(r.push(o),f!==64){const T=c<<4&240|f>>2;if(r.push(T),h!==64){const M=f<<6&192|h;r.push(M)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class ls extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const us=function(t){const e=Fn(t);return Nn.encodeByteArray(e,!0)},Dn=function(t){return us(t).replace(/\./g,"")},ds=function(t){try{return Nn.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function hs(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const fs=()=>hs().__FIREBASE_DEFAULTS__,ms=()=>{if(typeof process>"u"||typeof Zt>"u")return;const t=Zt.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},gs=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&ds(t[1]);return e&&JSON.parse(e)},ps=()=>{try{return as()||fs()||ms()||gs()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},kn=()=>{var t;return(t=ps())==null?void 0:t.config};/**
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
 */class bs{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}function _t(){try{return typeof indexedDB=="object"}catch{return!1}}function Ln(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var a;e(((a=s.error)==null?void 0:a.message)||"")}}catch(n){e(n)}})}/**
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
 */const ys="FirebaseError";class he extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=ys,Object.setPrototypeOf(this,he.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ke.prototype.create)}}class Ke{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,a=this.errors[e],i=a?Ss(a,r):"Error",c=`${this.serviceName}: ${i} (${s}).`;return new he(s,c,r)}}function Ss(t,e){return t.replace(Ts,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Ts=/\{\$([^}]+)}/g;function Xe(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const a=t[s],i=e[s];if(qt(a)&&qt(i)){if(!Xe(a,i))return!1}else if(a!==i)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function qt(t){return t!==null&&typeof t=="object"}/**
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
 */const ws=1e3,vs=2,Es=4*60*60*1e3,Ms=.5;function Pn(t,e=ws,n=vs){const r=e*Math.pow(n,t),s=Math.round(Ms*r*(Math.random()-.5)*2);return Math.min(Es,r+s)}/**
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
 */function xe(t){return t&&t._delegate?t._delegate:t}class Te{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const ye="[DEFAULT]";/**
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
 */class Cs{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new bs;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Rs(e))try{this.getOrInitializeService({instanceIdentifier:ye})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const a=this.getOrInitializeService({instanceIdentifier:s});r.resolve(a)}catch{}}}}clearInstance(e=ye){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=ye){return this.instances.has(e)}getOptions(e=ye){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[a,i]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(a);r===c&&i.resolve(s)}return s}onInit(e,n){const r=this.normalizeInstanceIdentifier(n),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const a=this.instances.get(r);return a&&e(a,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Is(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=ye){return this.component?this.component.multipleInstances?e:ye:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Is(t){return t===ye?void 0:t}function Rs(t){return t.instantiationMode==="EAGER"}/**
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
 */class _s{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Cs(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var F;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(F||(F={}));const xs={debug:F.DEBUG,verbose:F.VERBOSE,info:F.INFO,warn:F.WARN,error:F.ERROR,silent:F.SILENT},As=F.INFO,Fs={[F.DEBUG]:"log",[F.VERBOSE]:"log",[F.INFO]:"info",[F.WARN]:"warn",[F.ERROR]:"error"},Ns=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=Fs[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class On{constructor(e){this.name=e,this._logLevel=As,this._logHandler=Ns,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in F))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?xs[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,F.DEBUG,...e),this._logHandler(this,F.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,F.VERBOSE,...e),this._logHandler(this,F.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,F.INFO,...e),this._logHandler(this,F.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,F.WARN,...e),this._logHandler(this,F.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,F.ERROR,...e),this._logHandler(this,F.ERROR,...e)}}const Ds=(t,e)=>e.some(n=>t instanceof n);let Jt,Qt;function ks(){return Jt||(Jt=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Ls(){return Qt||(Qt=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Bn=new WeakMap,St=new WeakMap,$n=new WeakMap,at=new WeakMap,xt=new WeakMap;function Ps(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",a),t.removeEventListener("error",i)},a=()=>{n(le(t.result)),s()},i=()=>{r(t.error),s()};t.addEventListener("success",a),t.addEventListener("error",i)});return e.then(n=>{n instanceof IDBCursor&&Bn.set(n,t)}).catch(()=>{}),xt.set(e,t),e}function Os(t){if(St.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",a),t.removeEventListener("error",i),t.removeEventListener("abort",i)},a=()=>{n(),s()},i=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",a),t.addEventListener("error",i),t.addEventListener("abort",i)});St.set(t,e)}let Tt={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return St.get(t);if(e==="objectStoreNames")return t.objectStoreNames||$n.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return le(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Bs(t){Tt=t(Tt)}function $s(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(it(this),e,...n);return $n.set(r,e.sort?e.sort():[e]),le(r)}:Ls().includes(t)?function(...e){return t.apply(it(this),e),le(Bn.get(this))}:function(...e){return le(t.apply(it(this),e))}}function js(t){return typeof t=="function"?$s(t):(t instanceof IDBTransaction&&Os(t),Ds(t,ks())?new Proxy(t,Tt):t)}function le(t){if(t instanceof IDBRequest)return Ps(t);if(at.has(t))return at.get(t);const e=js(t);return e!==t&&(at.set(t,e),xt.set(e,t)),e}const it=t=>xt.get(t);function jn(t,e,{blocked:n,upgrade:r,blocking:s,terminated:a}={}){const i=indexedDB.open(t,e),c=le(i);return r&&i.addEventListener("upgradeneeded",d=>{r(le(i.result),d.oldVersion,d.newVersion,le(i.transaction),d)}),n&&i.addEventListener("blocked",d=>n(d.oldVersion,d.newVersion,d)),c.then(d=>{a&&d.addEventListener("close",()=>a()),s&&d.addEventListener("versionchange",f=>s(f.oldVersion,f.newVersion,f))}).catch(()=>{}),c}const Us=["get","getKey","getAll","getAllKeys","count"],Vs=["put","add","delete","clear"],ot=new Map;function en(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(ot.get(e))return ot.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=Vs.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Us.includes(n)))return;const a=async function(i,...c){const d=this.transaction(i,s?"readwrite":"readonly");let f=d.store;return r&&(f=f.index(c.shift())),(await Promise.all([f[n](...c),s&&d.done]))[0]};return ot.set(e,a),a}Bs(t=>({...t,get:(e,n,r)=>en(e,n)||t.get(e,n,r),has:(e,n)=>!!en(e,n)||t.has(e,n)}));/**
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
 */class Hs{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(zs(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function zs(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const wt="@firebase/app",tn="0.14.12";/**
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
 */const ie=new On("@firebase/app"),Ys="@firebase/app-compat",Gs="@firebase/analytics-compat",Xs="@firebase/analytics",Ws="@firebase/app-check-compat",Ks="@firebase/app-check",Zs="@firebase/auth",qs="@firebase/auth-compat",Js="@firebase/database",Qs="@firebase/data-connect",ea="@firebase/database-compat",ta="@firebase/functions",na="@firebase/functions-compat",ra="@firebase/installations",sa="@firebase/installations-compat",aa="@firebase/messaging",ia="@firebase/messaging-compat",oa="@firebase/performance",ca="@firebase/performance-compat",la="@firebase/remote-config",ua="@firebase/remote-config-compat",da="@firebase/storage",ha="@firebase/storage-compat",fa="@firebase/firestore",ma="@firebase/ai",ga="@firebase/firestore-compat",pa="firebase",ba="12.13.0";/**
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
 */const vt="[DEFAULT]",ya={[wt]:"fire-core",[Ys]:"fire-core-compat",[Xs]:"fire-analytics",[Gs]:"fire-analytics-compat",[Ks]:"fire-app-check",[Ws]:"fire-app-check-compat",[Zs]:"fire-auth",[qs]:"fire-auth-compat",[Js]:"fire-rtdb",[Qs]:"fire-data-connect",[ea]:"fire-rtdb-compat",[ta]:"fire-fn",[na]:"fire-fn-compat",[ra]:"fire-iid",[sa]:"fire-iid-compat",[aa]:"fire-fcm",[ia]:"fire-fcm-compat",[oa]:"fire-perf",[ca]:"fire-perf-compat",[la]:"fire-rc",[ua]:"fire-rc-compat",[da]:"fire-gcs",[ha]:"fire-gcs-compat",[fa]:"fire-fst",[ga]:"fire-fst-compat",[ma]:"fire-vertex","fire-js":"fire-js",[pa]:"fire-js-all"};/**
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
 */const Pe=new Map,Sa=new Map,Et=new Map;function nn(t,e){try{t.container.addComponent(e)}catch(n){ie.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function _e(t){const e=t.name;if(Et.has(e))return ie.debug(`There were multiple attempts to register component ${e}.`),!1;Et.set(e,t);for(const n of Pe.values())nn(n,t);for(const n of Sa.values())nn(n,t);return!0}function At(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}/**
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
 */const Ta={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ue=new Ke("app","Firebase",Ta);/**
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
 */class wa{constructor(e,n,r){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Te("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ue.create("app-deleted",{appName:this._name})}}/**
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
 */const rn=ba;function Un(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r={name:vt,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw ue.create("bad-app-name",{appName:String(s)});if(n||(n=kn()),!n)throw ue.create("no-options");const a=Pe.get(s);if(a){if(Xe(n,a.options)&&Xe(r,a.config))return a;throw ue.create("duplicate-app",{appName:s})}const i=new _s(s);for(const d of Et.values())i.addComponent(d);const c=new wa(n,r,i);return Pe.set(s,c),c}function va(t=vt){const e=Pe.get(t);if(!e&&t===vt&&kn())return Un();if(!e)throw ue.create("no-app",{appName:t});return e}function Ea(){return Array.from(Pe.values())}function de(t,e,n){let r=ya[t]??t;n&&(r+=`-${n}`);const s=r.match(/\s|\//),a=e.match(/\s|\//);if(s||a){const i=[`Unable to register library "${r}" with version "${e}":`];s&&i.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&a&&i.push("and"),a&&i.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ie.warn(i.join(" "));return}_e(new Te(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
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
 */const Ma="firebase-heartbeat-database",Ca=1,Oe="firebase-heartbeat-store";let ct=null;function Vn(){return ct||(ct=jn(Ma,Ca,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Oe)}catch(n){console.warn(n)}}}}).catch(t=>{throw ue.create("idb-open",{originalErrorMessage:t.message})})),ct}async function Ia(t){try{const n=(await Vn()).transaction(Oe),r=await n.objectStore(Oe).get(Hn(t));return await n.done,r}catch(e){if(e instanceof he)ie.warn(e.message);else{const n=ue.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});ie.warn(n.message)}}}async function sn(t,e){try{const r=(await Vn()).transaction(Oe,"readwrite");await r.objectStore(Oe).put(e,Hn(t)),await r.done}catch(n){if(n instanceof he)ie.warn(n.message);else{const r=ue.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});ie.warn(r.message)}}}function Hn(t){return`${t.name}!${t.options.appId}`}/**
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
 */const Ra=1024,_a=30;class xa{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Fa(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),a=an();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===a||this._heartbeatsCache.heartbeats.some(i=>i.date===a))return;if(this._heartbeatsCache.heartbeats.push({date:a,agent:s}),this._heartbeatsCache.heartbeats.length>_a){const i=Na(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(i,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){ie.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=an(),{heartbeatsToSend:r,unsentEntries:s}=Aa(this._heartbeatsCache.heartbeats),a=Dn(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),a}catch(n){return ie.warn(n),""}}}function an(){return new Date().toISOString().substring(0,10)}function Aa(t,e=Ra){const n=[];let r=t.slice();for(const s of t){const a=n.find(i=>i.agent===s.agent);if(a){if(a.dates.push(s.date),on(n)>e){a.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),on(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class Fa{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return _t()?Ln().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Ia(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return sn(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return sn(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function on(t){return Dn(JSON.stringify({version:2,heartbeats:t})).length}function Na(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}/**
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
 */function Da(t){_e(new Te("platform-logger",e=>new Hs(e),"PRIVATE")),_e(new Te("heartbeat",e=>new xa(e),"PRIVATE")),de(wt,tn,t),de(wt,tn,"esm2020"),de("fire-js","")}Da("");var ka="firebase",La="12.13.0";/**
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
 */de(ka,La,"app");const zn="@firebase/installations",Ft="0.6.22";/**
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
 */const Yn=1e4,Gn=`w:${Ft}`,Xn="FIS_v2",Pa="https://firebaseinstallations.googleapis.com/v1",Oa=60*60*1e3,Ba="installations",$a="Installations";/**
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
 */const ja={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},we=new Ke(Ba,$a,ja);function Wn(t){return t instanceof he&&t.code.includes("request-failed")}/**
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
 */function Kn({projectId:t}){return`${Pa}/projects/${t}/installations`}function Zn(t){return{token:t.token,requestStatus:2,expiresIn:Va(t.expiresIn),creationTime:Date.now()}}async function qn(t,e){const r=(await e.json()).error;return we.create("request-failed",{requestName:t,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function Jn({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function Ua(t,{refreshToken:e}){const n=Jn(t);return n.append("Authorization",Ha(e)),n}async function Qn(t){const e=await t();return e.status>=500&&e.status<600?t():e}function Va(t){return Number(t.replace("s","000"))}function Ha(t){return`${Xn} ${t}`}/**
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
 */async function za({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const r=Kn(t),s=Jn(t),a=e.getImmediate({optional:!0});if(a){const f=await a.getHeartbeatsHeader();f&&s.append("x-firebase-client",f)}const i={fid:n,authVersion:Xn,appId:t.appId,sdkVersion:Gn},c={method:"POST",headers:s,body:JSON.stringify(i)},d=await Qn(()=>fetch(r,c));if(d.ok){const f=await d.json();return{fid:f.fid||n,registrationStatus:2,refreshToken:f.refreshToken,authToken:Zn(f.authToken)}}else throw await qn("Create Installation",d)}/**
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
 */function er(t){return new Promise(e=>{setTimeout(e,t)})}/**
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
 */function Ya(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const Ga=/^[cdef][\w-]{21}$/,Mt="";function Xa(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=Wa(t);return Ga.test(n)?n:Mt}catch{return Mt}}function Wa(t){return Ya(t).substr(0,22)}/**
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
 */function Ze(t){return`${t.appName}!${t.appId}`}/**
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
 */const tr=new Map;function nr(t,e){const n=Ze(t);rr(n,e),Ka(n,e)}function rr(t,e){const n=tr.get(t);if(n)for(const r of n)r(e)}function Ka(t,e){const n=Za();n&&n.postMessage({key:t,fid:e}),qa()}let Se=null;function Za(){return!Se&&"BroadcastChannel"in self&&(Se=new BroadcastChannel("[Firebase] FID Change"),Se.onmessage=t=>{rr(t.data.key,t.data.fid)}),Se}function qa(){tr.size===0&&Se&&(Se.close(),Se=null)}/**
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
 */const Ja="firebase-installations-database",Qa=1,ve="firebase-installations-store";let lt=null;function Nt(){return lt||(lt=jn(Ja,Qa,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(ve)}}})),lt}async function We(t,e){const n=Ze(t),s=(await Nt()).transaction(ve,"readwrite"),a=s.objectStore(ve),i=await a.get(n);return await a.put(e,n),await s.done,(!i||i.fid!==e.fid)&&nr(t,e.fid),e}async function sr(t){const e=Ze(t),r=(await Nt()).transaction(ve,"readwrite");await r.objectStore(ve).delete(e),await r.done}async function qe(t,e){const n=Ze(t),s=(await Nt()).transaction(ve,"readwrite"),a=s.objectStore(ve),i=await a.get(n),c=e(i);return c===void 0?await a.delete(n):await a.put(c,n),await s.done,c&&(!i||i.fid!==c.fid)&&nr(t,c.fid),c}/**
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
 */async function Dt(t){let e;const n=await qe(t.appConfig,r=>{const s=ei(r),a=ti(t,s);return e=a.registrationPromise,a.installationEntry});return n.fid===Mt?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function ei(t){const e=t||{fid:Xa(),registrationStatus:0};return ar(e)}function ti(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(we.create("app-offline"));return{installationEntry:e,registrationPromise:s}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=ni(t,n);return{installationEntry:n,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:ri(t)}:{installationEntry:e}}async function ni(t,e){try{const n=await za(t,e);return We(t.appConfig,n)}catch(n){throw Wn(n)&&n.customData.serverCode===409?await sr(t.appConfig):await We(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function ri(t){let e=await cn(t.appConfig);for(;e.registrationStatus===1;)await er(100),e=await cn(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await Dt(t);return r||n}return e}function cn(t){return qe(t,e=>{if(!e)throw we.create("installation-not-found");return ar(e)})}function ar(t){return si(t)?{fid:t.fid,registrationStatus:0}:t}function si(t){return t.registrationStatus===1&&t.registrationTime+Yn<Date.now()}/**
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
 */async function ai({appConfig:t,heartbeatServiceProvider:e},n){const r=ii(t,n),s=Ua(t,n),a=e.getImmediate({optional:!0});if(a){const f=await a.getHeartbeatsHeader();f&&s.append("x-firebase-client",f)}const i={installation:{sdkVersion:Gn,appId:t.appId}},c={method:"POST",headers:s,body:JSON.stringify(i)},d=await Qn(()=>fetch(r,c));if(d.ok){const f=await d.json();return Zn(f)}else throw await qn("Generate Auth Token",d)}function ii(t,{fid:e}){return`${Kn(t)}/${e}/authTokens:generate`}/**
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
 */async function kt(t,e=!1){let n;const r=await qe(t.appConfig,a=>{if(!ir(a))throw we.create("not-registered");const i=a.authToken;if(!e&&li(i))return a;if(i.requestStatus===1)return n=oi(t,e),a;{if(!navigator.onLine)throw we.create("app-offline");const c=di(a);return n=ci(t,c),c}});return n?await n:r.authToken}async function oi(t,e){let n=await ln(t.appConfig);for(;n.authToken.requestStatus===1;)await er(100),n=await ln(t.appConfig);const r=n.authToken;return r.requestStatus===0?kt(t,e):r}function ln(t){return qe(t,e=>{if(!ir(e))throw we.create("not-registered");const n=e.authToken;return hi(n)?{...e,authToken:{requestStatus:0}}:e})}async function ci(t,e){try{const n=await ai(t,e),r={...e,authToken:n};return await We(t.appConfig,r),n}catch(n){if(Wn(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await sr(t.appConfig);else{const r={...e,authToken:{requestStatus:0}};await We(t.appConfig,r)}throw n}}function ir(t){return t!==void 0&&t.registrationStatus===2}function li(t){return t.requestStatus===2&&!ui(t)}function ui(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+Oa}function di(t){const e={requestStatus:1,requestTime:Date.now()};return{...t,authToken:e}}function hi(t){return t.requestStatus===1&&t.requestTime+Yn<Date.now()}/**
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
 */async function fi(t){const e=t,{installationEntry:n,registrationPromise:r}=await Dt(e);return r?r.catch(console.error):kt(e).catch(console.error),n.fid}/**
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
 */async function mi(t,e=!1){const n=t;return await gi(n),(await kt(n,e)).token}async function gi(t){const{registrationPromise:e}=await Dt(t);e&&await e}/**
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
 */function pi(t){if(!t||!t.options)throw ut("App Configuration");if(!t.name)throw ut("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw ut(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function ut(t){return we.create("missing-app-config-values",{valueName:t})}/**
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
 */const or="installations",bi="installations-internal",yi=t=>{const e=t.getProvider("app").getImmediate(),n=pi(e),r=At(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},Si=t=>{const e=t.getProvider("app").getImmediate(),n=At(e,or).getImmediate();return{getId:()=>fi(n),getToken:s=>mi(n,s)}};function Ti(){_e(new Te(or,yi,"PUBLIC")),_e(new Te(bi,Si,"PRIVATE"))}Ti();de(zn,Ft);de(zn,Ft,"esm2020");const dt="@firebase/remote-config",un="0.8.3";/**
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
 */class cr{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}/**
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
 */const lr="remote-config",dn=100;/**
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
 */const wi={"already-initialized":"Remote Config already initialized","registration-window":"Undefined window object. This SDK only supports usage in a browser environment.","registration-project-id":"Undefined project identifier. Check Firebase app initialization.","registration-api-key":"Undefined API key. Check Firebase app initialization.","registration-app-id":"Undefined app identifier. Check Firebase app initialization.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","storage-delete":"Error thrown when deleting from storage. Original error: {$originalErrorMessage}.","fetch-client-network":"Fetch client failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-timeout":'The config fetch request timed out.  Configure timeout using "fetchTimeoutMillis" SDK setting.',"fetch-throttle":'The config fetch request timed out while in an exponential backoff state. Configure timeout using "fetchTimeoutMillis" SDK setting. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.',"fetch-client-parse":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","indexed-db-unavailable":"Indexed DB is not supported by current browser","custom-signal-max-allowed-signals":"Setting more than {$maxSignals} custom signals is not supported.","stream-error":"The stream was not able to connect to the backend: {$originalErrorMessage}.","realtime-unavailable":"The Realtime service is unavailable: {$originalErrorMessage}","update-message-invalid":"The stream invalidation message was unparsable: {$originalErrorMessage}","update-not-fetched":"Unable to fetch the latest config: {$originalErrorMessage}","analytics-unavailable":"Connection to Firebase Analytics failed: {$originalErrorMessage}"},L=new Ke("remoteconfig","Remote Config",wi);function vi(t,e){return t instanceof he&&t.code.indexOf(e)!==-1}/**
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
 */const Ei=!1,Mi="",hn=0,Ci=["1","true","t","yes","y","on"];class ht{constructor(e,n=Mi){this._source=e,this._value=n}asString(){return this._value}asBoolean(){return this._source==="static"?Ei:Ci.indexOf(this._value.toLowerCase())>=0}asNumber(){if(this._source==="static")return hn;let e=Number(this._value);return isNaN(e)&&(e=hn),e}getSource(){return this._source}}class Ii{constructor(e){this.storage=e._storage,this.logger=e._logger,this.analyticsProvider=e._analyticsProvider}async updateActiveExperiments(e){const n=await this.storage.getActiveExperiments()||new Set,r=this.createExperimentInfoMap(e);return this.addActiveExperiments(r),this.removeInactiveExperiments(n,r),this.storage.setActiveExperiments(new Set(r.keys()))}createExperimentInfoMap(e){const n=new Map;for(const r of e)n.set(r.experimentId,r);return n}addActiveExperiments(e){const n={};for(const[r,s]of e.entries())n[`firebase${r}`]=s.variantId;this.addExperimentToAnalytics(n)}removeInactiveExperiments(e,n){const r={};for(const s of e)n.has(s)||(r[`firebase${s}`]=null);this.addExperimentToAnalytics(r)}addExperimentToAnalytics(e){if(Object.keys(e).length!==0)try{const n=this.analyticsProvider.getImmediate({optional:!0});n?(n.setUserProperties(e),n.logEvent("set_firebase_experiment_state")):this.logger.warn("Analytics import failed. Verify if you have imported Firebase Analytics in your app code.")}catch(n){throw L.create("analytics-unavailable",{originalErrorMessage:n==null?void 0:n.message})}}}/**
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
 */function Ri(t=va(),e={}){var s,a;t=xe(t);const n=At(t,lr);if(n.isInitialized()){const i=n.getOptions();if(Xe(i,e))return n.getImmediate();throw L.create("already-initialized")}n.initialize({options:e});const r=n.getImmediate();return e.initialFetchResponse&&(r._initializePromise=Promise.all([r._storage.setLastSuccessfulFetchResponse(e.initialFetchResponse),r._storage.setActiveConfigEtag(((s=e.initialFetchResponse)==null?void 0:s.eTag)||""),r._storage.setActiveConfigTemplateVersion(e.initialFetchResponse.templateVersion||0),r._storageCache.setLastSuccessfulFetchTimestampMillis(Date.now()),r._storageCache.setLastFetchStatus("success"),r._storageCache.setActiveConfig(((a=e.initialFetchResponse)==null?void 0:a.config)||{})]).then(),r._isInitializationComplete=!0),r}async function _i(t){const e=xe(t),[n,r]=await Promise.all([e._storage.getLastSuccessfulFetchResponse(),e._storage.getActiveConfigEtag()]);if(!n||!n.config||!n.eTag||!n.templateVersion||n.eTag===r)return!1;const s=new Ii(e),a=n.experiments?s.updateActiveExperiments(n.experiments):Promise.resolve();return await Promise.all([e._storageCache.setActiveConfig(n.config),e._storage.setActiveConfigEtag(n.eTag),e._storage.setActiveConfigTemplateVersion(n.templateVersion),a]),!0}function xi(t){const e=xe(t);return e._initializePromise||(e._initializePromise=e._storageCache.loadFromStorage().then(()=>{e._isInitializationComplete=!0})),e._initializePromise}async function Ai(t){const e=xe(t),n=new cr;setTimeout(async()=>{n.abort()},e.settings.fetchTimeoutMillis);const r=e._storageCache.getCustomSignals();r&&e._logger.debug(`Fetching config with custom signals: ${JSON.stringify(r)}`);try{await e._client.fetch({cacheMaxAgeMillis:e.settings.minimumFetchIntervalMillis,signal:n,customSignals:r}),await e._storageCache.setLastFetchStatus("success")}catch(s){const a=vi(s,"fetch-throttle")?"throttle":"failure";throw await e._storageCache.setLastFetchStatus(a),s}}function Lt(t,e){const n=xe(t);n._isInitializationComplete||n._logger.debug(`A value was requested for key "${e}" before SDK initialization completed. Await on ensureInitialized if the intent was to get a previously activated value.`);const r=n._storageCache.getActiveConfig();return r&&r[e]!==void 0?new ht("remote",r[e]):n.defaultConfig&&n.defaultConfig[e]!==void 0?new ht("default",String(n.defaultConfig[e])):(n._logger.debug(`Returning static value for key "${e}". Define a default or remote value if this is unintentional.`),new ht("static"))}/**
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
 */class Fi{constructor(e,n,r,s){this.client=e,this.storage=n,this.storageCache=r,this.logger=s}isCachedDataFresh(e,n){if(!n)return this.logger.debug("Config fetch cache check. Cache unpopulated."),!1;const r=Date.now()-n,s=r<=e;return this.logger.debug(`Config fetch cache check. Cache age millis: ${r}. Cache max age millis (minimumFetchIntervalMillis setting): ${e}. Is cache hit: ${s}.`),s}async fetch(e){const[n,r]=await Promise.all([this.storage.getLastSuccessfulFetchTimestampMillis(),this.storage.getLastSuccessfulFetchResponse()]);if(r&&this.isCachedDataFresh(e.cacheMaxAgeMillis,n))return r;e.eTag=r&&r.eTag;const s=await this.client.fetch(e),a=[this.storageCache.setLastSuccessfulFetchTimestampMillis(Date.now())];return s.status===200&&a.push(this.storage.setLastSuccessfulFetchResponse(s)),await Promise.all(a),s}}/**
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
 */function Ni(t=navigator){return t.languages&&t.languages[0]||t.language}/**
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
 */class Di{constructor(e,n,r,s,a,i){this.firebaseInstallations=e,this.sdkVersion=n,this.namespace=r,this.projectId=s,this.apiKey=a,this.appId=i}async fetch(e){const[n,r]=await Promise.all([this.firebaseInstallations.getId(),this.firebaseInstallations.getToken()]),a=`${window.FIREBASE_REMOTE_CONFIG_URL_BASE||"https://firebaseremoteconfig.googleapis.com"}/v1/projects/${this.projectId}/namespaces/${this.namespace}:fetch?key=${this.apiKey}`,i={"Content-Type":"application/json","Content-Encoding":"gzip","If-None-Match":e.eTag||"*"},c={sdk_version:this.sdkVersion,app_instance_id:n,app_instance_id_token:r,app_id:this.appId,language_code:Ni(),custom_signals:e.customSignals},d={method:"POST",headers:i,body:JSON.stringify(c)},f=fetch(a,d),m=new Promise((C,x)=>{e.signal.addEventListener(()=>{const _=new Error("The operation was aborted.");_.name="AbortError",x(_)})});let h;try{await Promise.race([f,m]),h=await f}catch(C){let x="fetch-client-network";throw(C==null?void 0:C.name)==="AbortError"&&(x="fetch-timeout"),L.create(x,{originalErrorMessage:C==null?void 0:C.message})}let o=h.status;const T=h.headers.get("ETag")||void 0;let M,u,p,v;if(h.status===200){let C;try{C=await h.json()}catch(x){throw L.create("fetch-client-parse",{originalErrorMessage:x==null?void 0:x.message})}M=C.entries,u=C.state,p=C.templateVersion,v=C.experimentDescriptions}if(u==="INSTANCE_STATE_UNSPECIFIED"?o=500:u==="NO_CHANGE"?o=304:(u==="NO_TEMPLATE"||u==="EMPTY_CONFIG")&&(M={},v=[]),o!==304&&o!==200)throw L.create("fetch-status",{httpStatus:o});return{status:o,eTag:T,config:M,templateVersion:p,experiments:v}}}/**
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
 */function ki(t,e){return new Promise((n,r)=>{const s=Math.max(e-Date.now(),0),a=setTimeout(n,s);t.addEventListener(()=>{clearTimeout(a),r(L.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function Li(t){if(!(t instanceof he)||!t.customData)return!1;const e=Number(t.customData.httpStatus);return e===429||e===500||e===503||e===504}class Pi{constructor(e,n){this.client=e,this.storage=n}async fetch(e){const n=await this.storage.getThrottleMetadata()||{backoffCount:0,throttleEndTimeMillis:Date.now()};return this.attemptFetch(e,n)}async attemptFetch(e,{throttleEndTimeMillis:n,backoffCount:r}){await ki(e.signal,n);try{const s=await this.client.fetch(e);return await this.storage.deleteThrottleMetadata(),s}catch(s){if(!Li(s))throw s;const a={throttleEndTimeMillis:Date.now()+Pn(r),backoffCount:r+1};return await this.storage.setThrottleMetadata(a),this.attemptFetch(e,a)}}}/**
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
 */const Oi=60*1e3,Bi=12*60*60*1e3;class $i{get fetchTimeMillis(){return this._storageCache.getLastSuccessfulFetchTimestampMillis()||-1}get lastFetchStatus(){return this._storageCache.getLastFetchStatus()||"no-fetch-yet"}constructor(e,n,r,s,a,i,c){this.app=e,this._client=n,this._storageCache=r,this._storage=s,this._logger=a,this._realtimeHandler=i,this._analyticsProvider=c,this._isInitializationComplete=!1,this.settings={fetchTimeoutMillis:Oi,minimumFetchIntervalMillis:Bi},this.defaultConfig={}}}/**
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
 */function Ge(t,e){const n=t.target.error||void 0;return L.create(e,{originalErrorMessage:n&&(n==null?void 0:n.message)})}const oe="app_namespace_store",ji="firebase_remote_config",Ui=1;function Vi(){return new Promise((t,e)=>{try{const n=indexedDB.open(ji,Ui);n.onerror=r=>{e(Ge(r,"storage-open"))},n.onsuccess=r=>{t(r.target.result)},n.onupgradeneeded=r=>{const s=r.target.result;switch(r.oldVersion){case 0:s.createObjectStore(oe,{keyPath:"compositeKey"})}}}catch(n){e(L.create("storage-open",{originalErrorMessage:n==null?void 0:n.message}))}})}class ur{getLastFetchStatus(){return this.get("last_fetch_status")}setLastFetchStatus(e){return this.set("last_fetch_status",e)}getLastSuccessfulFetchTimestampMillis(){return this.get("last_successful_fetch_timestamp_millis")}setLastSuccessfulFetchTimestampMillis(e){return this.set("last_successful_fetch_timestamp_millis",e)}getLastSuccessfulFetchResponse(){return this.get("last_successful_fetch_response")}setLastSuccessfulFetchResponse(e){return this.set("last_successful_fetch_response",e)}getActiveConfig(){return this.get("active_config")}setActiveConfig(e){return this.set("active_config",e)}getActiveConfigEtag(){return this.get("active_config_etag")}setActiveConfigEtag(e){return this.set("active_config_etag",e)}getActiveExperiments(){return this.get("active_experiments")}setActiveExperiments(e){return this.set("active_experiments",e)}getThrottleMetadata(){return this.get("throttle_metadata")}setThrottleMetadata(e){return this.set("throttle_metadata",e)}deleteThrottleMetadata(){return this.delete("throttle_metadata")}getCustomSignals(){return this.get("custom_signals")}getRealtimeBackoffMetadata(){return this.get("realtime_backoff_metadata")}setRealtimeBackoffMetadata(e){return this.set("realtime_backoff_metadata",e)}getActiveConfigTemplateVersion(){return this.get("last_known_template_version")}setActiveConfigTemplateVersion(e){return this.set("last_known_template_version",e)}}class Hi extends ur{constructor(e,n,r,s=Vi()){super(),this.appId=e,this.appName=n,this.namespace=r,this.openDbPromise=s}async setCustomSignals(e){const r=(await this.openDbPromise).transaction([oe],"readwrite"),s=await this.getWithTransaction("custom_signals",r),a=dr(e,s||{});return await this.setWithTransaction("custom_signals",a,r),a}async getWithTransaction(e,n){return new Promise((r,s)=>{const a=n.objectStore(oe),i=this.createCompositeKey(e);try{const c=a.get(i);c.onerror=d=>{s(Ge(d,"storage-get"))},c.onsuccess=d=>{const f=d.target.result;r(f?f.value:void 0)}}catch(c){s(L.create("storage-get",{originalErrorMessage:c==null?void 0:c.message}))}})}async setWithTransaction(e,n,r){return new Promise((s,a)=>{const i=r.objectStore(oe),c=this.createCompositeKey(e);try{const d=i.put({compositeKey:c,value:n});d.onerror=f=>{a(Ge(f,"storage-set"))},d.onsuccess=()=>{s()}}catch(d){a(L.create("storage-set",{originalErrorMessage:d==null?void 0:d.message}))}})}async get(e){const r=(await this.openDbPromise).transaction([oe],"readonly");return this.getWithTransaction(e,r)}async set(e,n){const s=(await this.openDbPromise).transaction([oe],"readwrite");return this.setWithTransaction(e,n,s)}async delete(e){const n=await this.openDbPromise;return new Promise((r,s)=>{const i=n.transaction([oe],"readwrite").objectStore(oe),c=this.createCompositeKey(e);try{const d=i.delete(c);d.onerror=f=>{s(Ge(f,"storage-delete"))},d.onsuccess=()=>{r()}}catch(d){s(L.create("storage-delete",{originalErrorMessage:d==null?void 0:d.message}))}})}createCompositeKey(e){return[this.appId,this.appName,this.namespace,e].join()}}class zi extends ur{constructor(){super(...arguments),this.storage={}}async get(e){return Promise.resolve(this.storage[e])}async set(e,n){return this.storage[e]=n,Promise.resolve(void 0)}async delete(e){return this.storage[e]=void 0,Promise.resolve()}async setCustomSignals(e){const n=this.storage.custom_signals||{};return this.storage.custom_signals=dr(e,n),Promise.resolve(this.storage.custom_signals)}}function dr(t,e){const n={...e,...t},r=Object.fromEntries(Object.entries(n).filter(([s,a])=>a!==null).map(([s,a])=>typeof a=="number"?[s,a.toString()]:[s,a]));if(Object.keys(r).length>dn)throw L.create("custom-signal-max-allowed-signals",{maxSignals:dn});return r}/**
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
 */class Yi{constructor(e){this.storage=e}getLastFetchStatus(){return this.lastFetchStatus}getLastSuccessfulFetchTimestampMillis(){return this.lastSuccessfulFetchTimestampMillis}getActiveConfig(){return this.activeConfig}getCustomSignals(){return this.customSignals}async loadFromStorage(){const e=this.storage.getLastFetchStatus(),n=this.storage.getLastSuccessfulFetchTimestampMillis(),r=this.storage.getActiveConfig(),s=this.storage.getCustomSignals(),a=await e;a&&(this.lastFetchStatus=a);const i=await n;i&&(this.lastSuccessfulFetchTimestampMillis=i);const c=await r;c&&(this.activeConfig=c);const d=await s;d&&(this.customSignals=d)}setLastFetchStatus(e){return this.lastFetchStatus=e,this.storage.setLastFetchStatus(e)}setLastSuccessfulFetchTimestampMillis(e){return this.lastSuccessfulFetchTimestampMillis=e,this.storage.setLastSuccessfulFetchTimestampMillis(e)}setActiveConfig(e){return this.activeConfig=e,this.storage.setActiveConfig(e)}async setCustomSignals(e){this.customSignals=await this.storage.setCustomSignals(e)}}/**
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
 */class Gi{constructor(e){this.allowedEvents_=e,this.listeners_={},yt(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const r=[...this.listeners_[e]];for(let s=0;s<r.length;s++)r[s].callback.apply(r[s].context,n)}}on(e,n,r){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:r});const s=this.getInitialEvent(e);s&&n.apply(r,s)}off(e,n,r){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let a=0;a<s.length;a++)if(s[a].callback===n&&(!r||r===s[a].context)){s.splice(a,1);return}}validateEventType_(e){yt(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
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
 */class Pt extends Gi{static getInstance(){return new Pt}constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const r=!document[e];r!==this.visible_&&(this.visible_=r,this.trigger("visible",r))},!1)}getInitialEvent(e){return yt(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
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
 */const Xi="X-Goog-Api-Key",Wi="X-Goog-Firebase-Installations-Auth",ft=8,fn=3,mn=-1,gn=0,pn="featureDisabled",bn="retryIntervalSeconds",yn="latestTemplateVersionNumber";class Ki{constructor(e,n,r,s,a,i,c,d,f,m){this.firebaseInstallations=e,this.storage=n,this.sdkVersion=r,this.namespace=s,this.projectId=a,this.apiKey=i,this.appId=c,this.logger=d,this.storageCache=f,this.cachingClient=m,this.observers=new Set,this.isConnectionActive=!1,this.isRealtimeDisabled=!1,this.httpRetriesRemaining=ft,this.isInBackground=!1,this.decoder=new TextDecoder("utf-8"),this.isClosingConnection=!1,this.propagateError=h=>this.observers.forEach(o=>{var T;return(T=o.error)==null?void 0:T.call(o,h)}),this.isStatusCodeRetryable=h=>!h||[408,429,502,503,504].includes(h),this.setRetriesRemaining(),Pt.getInstance().on("visible",this.onVisibilityChange,this)}async setRetriesRemaining(){const e=await this.storage.getRealtimeBackoffMetadata(),n=(e==null?void 0:e.numFailedStreams)||0;this.httpRetriesRemaining=Math.max(ft-n,1)}async updateBackoffMetadataWithLastFailedStreamConnectionTime(e){var s;const n=(((s=await this.storage.getRealtimeBackoffMetadata())==null?void 0:s.numFailedStreams)||0)+1,r=Pn(n,6e4,2);await this.storage.setRealtimeBackoffMetadata({backoffEndTimeMillis:new Date(e.getTime()+r),numFailedStreams:n})}async updateBackoffMetadataWithRetryInterval(e){const n=Date.now(),r=e*1e3,s=new Date(n+r);await this.storage.setRealtimeBackoffMetadata({backoffEndTimeMillis:s,numFailedStreams:0}),await this.retryHttpConnectionWhenBackoffEnds()}async closeRealtimeHttpConnection(){if(!this.isClosingConnection){this.isClosingConnection=!0;try{this.reader&&await this.reader.cancel()}catch{this.logger.debug("Failed to cancel the reader, connection was lost.")}finally{this.reader=void 0}this.controller&&(await this.controller.abort(),this.controller=void 0),this.isClosingConnection=!1}}async resetRealtimeBackoff(){await this.storage.setRealtimeBackoffMetadata({backoffEndTimeMillis:new Date(-1),numFailedStreams:0})}resetRetryCount(){this.httpRetriesRemaining=ft}async establishRealtimeConnection(e,n,r,s){const a=await this.storage.getActiveConfigEtag(),i=await this.storage.getActiveConfigTemplateVersion(),c={[Xi]:this.apiKey,[Wi]:r,"Content-Type":"application/json",Accept:"application/json","If-None-Match":a||"*","Content-Encoding":"gzip"},d={project:this.projectId,namespace:this.namespace,lastKnownVersionNumber:i,appId:this.appId,sdkVersion:this.sdkVersion,appInstanceId:n};return await fetch(e,{method:"POST",headers:c,body:JSON.stringify(d),signal:s})}getRealtimeUrl(){const n=`${window.FIREBASE_REMOTE_CONFIG_URL_BASE||"https://firebaseremoteconfigrealtime.googleapis.com"}/v1/projects/${this.projectId}/namespaces/${this.namespace}:streamFetchInvalidations?key=${this.apiKey}`;return new URL(n)}async createRealtimeConnection(){const[e,n]=await Promise.all([this.firebaseInstallations.getId(),this.firebaseInstallations.getToken(!1)]);this.controller=new AbortController;const r=this.getRealtimeUrl();return await this.establishRealtimeConnection(r,e,n,this.controller.signal)}async retryHttpConnectionWhenBackoffEnds(){let e=await this.storage.getRealtimeBackoffMetadata();e||(e={backoffEndTimeMillis:new Date(mn),numFailedStreams:gn});const n=new Date(e.backoffEndTimeMillis).getTime(),r=Date.now(),s=Math.max(0,n-r);await this.makeRealtimeHttpConnection(s)}setIsHttpConnectionRunning(e){this.isConnectionActive=e}checkAndSetHttpConnectionFlagIfNotRunning(){const e=this.canEstablishStreamConnection();return e&&this.setIsHttpConnectionRunning(!0),e}fetchResponseIsUpToDate(e,n){return e.config!=null&&e.templateVersion?e.templateVersion>=n:this.storageCache.getLastFetchStatus()==="success"}parseAndValidateConfigUpdateMessage(e){const n=e.indexOf("{"),r=e.indexOf("}",n);return n<0||r<0||n>=r?"":e.substring(n,r+1)}isEventListenersEmpty(){return this.observers.size===0}getRandomInt(e){return Math.floor(Math.random()*e)}executeAllListenerCallbacks(e){this.observers.forEach(n=>n.next(e))}getChangedParams(e,n){const r=new Set,s=new Set(Object.keys(e||{})),a=new Set(Object.keys(n||{}));for(const i of s)(!a.has(i)||e[i]!==n[i])&&r.add(i);for(const i of a)s.has(i)||r.add(i);return r}async fetchLatestConfig(e,n){const r=e-1,s=fn-r,a=this.storageCache.getCustomSignals();a&&this.logger.debug(`Fetching config with custom signals: ${JSON.stringify(a)}`);const i=new cr;try{const c={cacheMaxAgeMillis:0,signal:i,customSignals:a,fetchType:"REALTIME",fetchAttempt:s},d=await this.cachingClient.fetch(c);let f=await this.storage.getActiveConfig();if(!this.fetchResponseIsUpToDate(d,n)){this.logger.debug("Fetched template version is the same as SDK's current version. Retrying fetch."),await this.autoFetch(r,n);return}if(d.config==null){this.logger.debug("The fetch succeeded, but the backend had no updates.");return}f==null&&(f={});const m=this.getChangedParams(d.config,f);if(m.size===0){this.logger.debug("Config was fetched, but no params changed.");return}const h={getUpdatedKeys(){return new Set(m)}};this.executeAllListenerCallbacks(h)}catch(c){const d=c instanceof Error?c.message:String(c),f=L.create("update-not-fetched",{originalErrorMessage:`Failed to auto-fetch config update: ${d}`});this.propagateError(f)}}async autoFetch(e,n){if(e===0){const a=L.create("update-not-fetched",{originalErrorMessage:"Unable to fetch the latest version of the template."});this.propagateError(a);return}const s=this.getRandomInt(4)*1e3;await new Promise(a=>setTimeout(a,s)),await this.fetchLatestConfig(e,n)}async handleNotifications(e){let n,r="";for(;;){const{done:s,value:a}=await e.read();if(s)break;if(n=this.decoder.decode(a,{stream:!0}),r+=n,n.includes("}")){if(r=this.parseAndValidateConfigUpdateMessage(r),r.length===0)continue;try{const i=JSON.parse(r);if(this.isEventListenersEmpty())break;if(pn in i&&i[pn]===!0){const c=L.create("realtime-unavailable",{originalErrorMessage:"The server is temporarily unavailable. Try again in a few minutes."});this.propagateError(c);break}if(yn in i){const c=await this.storage.getActiveConfigTemplateVersion(),d=Number(i[yn]);c&&d>c&&await this.autoFetch(fn,d)}if(bn in i){const c=Number(i[bn]);await this.updateBackoffMetadataWithRetryInterval(c)}}catch(i){this.logger.debug("Unable to parse latest config update message.",i);const c=i instanceof Error?i.message:String(i);this.propagateError(L.create("update-message-invalid",{originalErrorMessage:c}))}r=""}}}async listenForNotifications(e){try{await this.handleNotifications(e)}catch{this.isInBackground||this.logger.debug("Real-time connection was closed due to an exception.")}}async prepareAndBeginRealtimeHttpStream(){if(!this.checkAndSetHttpConnectionFlagIfNotRunning())return;let e=await this.storage.getRealtimeBackoffMetadata();e||(e={backoffEndTimeMillis:new Date(mn),numFailedStreams:gn});const n=e.backoffEndTimeMillis.getTime();if(Date.now()<n){await this.retryHttpConnectionWhenBackoffEnds();return}let r,s;try{if(r=await this.createRealtimeConnection(),s=r.status,r.ok&&r.body){this.resetRetryCount(),await this.resetRealtimeBackoff();const a=r.body.getReader();this.reader=a,await this.listenForNotifications(a)}}catch(a){this.isInBackground?this.resetRetryCount():this.logger.debug("Exception connecting to real-time RC backend. Retrying the connection...:",a)}finally{await this.closeRealtimeHttpConnection(),this.setIsHttpConnectionRunning(!1);const a=!this.isInBackground&&(s===void 0||this.isStatusCodeRetryable(s));if(a&&await this.updateBackoffMetadataWithLastFailedStreamConnectionTime(new Date),a||r!=null&&r.ok)await this.retryHttpConnectionWhenBackoffEnds();else{const i=`Unable to connect to the server. HTTP status code: ${s}`,c=L.create("stream-error",{originalErrorMessage:i});this.propagateError(c)}}}canEstablishStreamConnection(){const e=this.observers.size>0,n=!this.isRealtimeDisabled,r=!this.isConnectionActive,s=!this.isInBackground;return e&&n&&r&&s}async makeRealtimeHttpConnection(e){if(this.canEstablishStreamConnection()){if(this.httpRetriesRemaining>0)this.httpRetriesRemaining--,await new Promise(n=>setTimeout(n,e)),this.prepareAndBeginRealtimeHttpStream();else if(!this.isInBackground){const n=L.create("stream-error",{originalErrorMessage:"Unable to connect to the server. Check your connection and try again."});this.propagateError(n)}}}async beginRealtime(){this.observers.size>0&&await this.makeRealtimeHttpConnection(0)}addObserver(e){this.observers.add(e),this.beginRealtime()}removeObserver(e){this.observers.has(e)&&this.observers.delete(e)}async onVisibilityChange(e){this.isInBackground=!e,e?e&&await this.beginRealtime():await this.closeRealtimeHttpConnection()}}/**
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
 */function Zi(){_e(new Te(lr,t,"PUBLIC").setMultipleInstances(!0)),de(dt,un),de(dt,un,"esm2020");function t(e,{options:n}){const r=e.getProvider("app").getImmediate(),s=e.getProvider("installations-internal").getImmediate(),a=e.getProvider("analytics-internal"),{projectId:i,apiKey:c,appId:d}=r.options;if(!i)throw L.create("registration-project-id");if(!c)throw L.create("registration-api-key");if(!d)throw L.create("registration-app-id");const f=(n==null?void 0:n.templateId)||"firebase",m=_t()?new Hi(d,r.name,f):new zi,h=new Yi(m),o=new On(dt);o.logLevel=F.ERROR;const T=new Di(s,rn,f,i,c,d),M=new Pi(T,m),u=new Fi(M,m,h,o),p=new Ki(s,m,rn,f,i,c,d,o,h,u),v=new $i(r,u,h,m,o,p,a);return xi(v),v}}/**
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
 */async function qi(t){return t=xe(t),await Ai(t),_i(t)}async function Ji(){if(!_t())return!1;try{return await Ln()}catch{return!1}}Zi();const Y={enabled:!0,code:"ADVERSE",discountAmountUsd:400,url:"https://onyxmotors.com/10389151",productName:"Onyx RCR"},te={enabled:"onyx_promo_enabled",code:"onyx_promo_code",discountAmountUsd:"onyx_promo_discount_amount_usd",url:"onyx_promo_url",productName:"onyx_promo_product_name"},Qi={apiKey:"AIzaSyC53hOkevIGn-kk6ER5OAGqK3wX2DBJtyc",authDomain:"motormed.firebaseapp.com",projectId:"motormed",storageBucket:"motormed.firebasestorage.app",messagingSenderId:"251406379412",appId:"1:251406379412:web:3d821f722910728a5f8781",measurementId:"G-9CB73HX238"};let Ye=null;function eo(){const[t,e]=S.useState(Y);return S.useEffect(()=>{let n=!1;return to().then(r=>{n||e(r)}),()=>{n=!0}},[]),t}function Ct({offer:t=Y,className:e,codeClassName:n}){return t.enabled?l.jsxs("a",{className:e,href:t.url,target:"_blank",rel:"noopener noreferrer",children:["Use code ",l.jsx("span",{className:n,children:t.code})," to save ",ao(t.discountAmountUsd)," on your next"," ",t.productName," purchase"]}):null}async function to(){return Ye||(Ye=(async()=>{try{if(!await Ji())return Y;const t=Ea()[0]??Un(Qi),e=Ri(t);return e.defaultConfig={[te.enabled]:Y.enabled,[te.code]:Y.code,[te.discountAmountUsd]:Y.discountAmountUsd,[te.url]:Y.url,[te.productName]:Y.productName},e.settings.minimumFetchIntervalMillis=36e5,await qi(e),no(e)}catch(t){return console.warn("[promo-config] Failed to fetch promo remote config",t),Y}})(),Ye)}function no(t){return{enabled:so(t,te.enabled,Y.enabled),code:mt(t,te.code,Y.code),discountAmountUsd:ro(t,te.discountAmountUsd,Y.discountAmountUsd),url:mt(t,te.url,Y.url),productName:mt(t,te.productName,Y.productName)}}function mt(t,e,n){const r=Lt(t,e);return r.getSource()==="static"?n:r.asString().trim()||n}function ro(t,e,n){const r=Lt(t,e);if(r.getSource()==="static")return n;const s=r.asNumber();return Number.isFinite(s)&&s>0?s:n}function so(t,e,n){const r=Lt(t,e);return r.getSource()==="static"?n:r.asBoolean()}function ao(t){return`$${Math.round(t)}`}function io({stats:t,isEnd:e,autoHide:n=!e,shareUrl:r,promoOffer:s,onDismiss:a,onAutoHide:i}){const[c,d]=S.useState(!1),[f,m]=S.useState(5),h=S.useRef(null),o=S.useRef(null),T=()=>{if(h.current&&clearTimeout(h.current),o.current&&clearInterval(o.current),!e&&n){m(5);const p=Date.now();o.current=setInterval(()=>{const v=Date.now()-p,C=Math.max(0,Math.ceil((5e3-v)/1e3));m(C)},150)}n&&(h.current=setTimeout(()=>{o.current&&clearInterval(o.current),i==null||i()},5e3))};S.useEffect(()=>(T(),()=>{h.current&&clearTimeout(h.current),o.current&&clearInterval(o.current)}),[e,n]);const M=()=>{T()},u=async()=>{const p=r??await An(window.location.href);try{navigator.share?await navigator.share({title:"Motormed Ride Replay",text:"Check out this ride replay",url:p}):await navigator.clipboard.writeText(p),d(!0),setTimeout(()=>d(!1),2e3)}catch{}};return l.jsx("div",{className:"ride-summary-overlay",onMouseMove:M,onClick:()=>a==null?void 0:a(),children:l.jsxs("div",{className:"ride-summary-card",onClick:p=>p.stopPropagation(),children:[l.jsx("div",{className:"ride-summary-title",children:e?"Ride Complete":"Ride Summary"}),!e&&n&&l.jsxs("div",{className:"ride-summary-countdown",children:["Replay starts in ",f,"s"]}),l.jsxs("div",{className:"ride-summary-hero",children:[l.jsxs("div",{className:"ride-summary-hero-stat",children:[l.jsx("span",{className:"ride-summary-hero-value",children:t.distanceLabel}),l.jsx("span",{className:"ride-summary-hero-label",children:"Distance"})]}),l.jsx("div",{className:"ride-summary-hero-divider"}),l.jsxs("div",{className:"ride-summary-hero-stat",children:[l.jsx("span",{className:"ride-summary-hero-value",children:Le(t.durationMs)}),l.jsx("span",{className:"ride-summary-hero-label",children:"Duration"})]})]}),l.jsx("div",{className:"ride-summary-rows",children:t.hasRouteData?l.jsxs(l.Fragment,{children:[l.jsx(k,{label:"Avg Speed",value:t.avgSpeed}),l.jsx(k,{label:"Top Speed",value:t.fastestSpeed}),l.jsx(k,{label:"0-20 MPH",value:t.zeroTo20Mph}),l.jsx(k,{label:"0-30 MPH",value:t.zeroTo30Mph}),l.jsx(k,{label:"0-45 MPH",value:t.zeroTo45Mph}),l.jsx(k,{label:"0-60 MPH",value:t.zeroTo60Mph}),l.jsx(k,{label:"0-Top Speed",value:t.zeroToTopSpeed}),l.jsx(k,{label:"Dead Stop",value:t.deadStopTime}),l.jsx(k,{label:"Total Climb",value:t.totalClimb}),l.jsx(k,{label:"Battery Drain",value:t.batteryDrain}),l.jsx(k,{label:"Avg Temps",value:t.avgTemps}),l.jsx(k,{label:"Max Temps",value:t.maxTemps}),l.jsx(k,{label:"Min Temps",value:t.minTemps})]}):l.jsxs(l.Fragment,{children:[l.jsx(k,{label:"Voltage",value:t.voltageDropLabel}),l.jsx(k,{label:"Max RPM",value:t.maxRpm}),l.jsx(k,{label:"Avg RPM",value:t.avgRpm}),l.jsx(k,{label:"Peak Battery A",value:t.peakCurrent}),l.jsx(k,{label:"Avg Battery A",value:t.avgCurrent}),l.jsx(k,{label:"Peak Phase A",value:t.peakPhaseCurrent}),l.jsx(k,{label:"Max Throttle",value:t.maxThrottle}),l.jsx(k,{label:"Avg Temps",value:t.avgTemps}),l.jsx(k,{label:"Max Temps",value:t.maxTemps}),l.jsx(k,{label:"Min Temps",value:t.minTemps})]})}),l.jsx(Ct,{offer:s,className:"ride-summary-promo",codeClassName:"ride-summary-promo-code"}),l.jsxs("div",{className:"ride-summary-actions",children:[e&&l.jsx("button",{className:"ride-summary-btn ride-summary-btn-share",onClick:u,children:c?"✓ Copied!":"Share Ride"}),a&&l.jsx("button",{className:"ride-summary-btn ride-summary-btn-dismiss",onClick:a,children:e?"Replay":"Watch"}),l.jsx("a",{className:"ride-summary-btn ride-summary-btn-getapp",href:"/",children:"Get Motormed"})]})]})})}function k({label:t,value:e}){return l.jsxs("div",{className:"ride-summary-row",children:[l.jsx("span",{className:"ride-summary-row-label",children:t}),l.jsx("span",{className:"ride-summary-row-value",children:e})]})}const oo=[79,78,89,88],co=1,lo=2,uo=4,ho=8,fo=16,mo=32,go=64,po=128,bo=1,yo=2,So=4,To=8,wo=16,vo=32,Eo=1,Mo=2,Co=4,Io=8,Ro=16,_o=1,xo=2,Ao=4,Fo=8,ce="[rxd-parser]";class No{constructor(e){this.pos=0,this.view=new DataView(e)}get remaining(){return this.view.byteLength-this.pos}readUint8(){return this.view.getUint8(this.pos++)}readInt16(){const e=this.view.getInt16(this.pos,!1);return this.pos+=2,e}readUint16(){const e=this.view.getUint16(this.pos,!1);return this.pos+=2,e}readInt32(){const e=this.view.getInt32(this.pos,!1);return this.pos+=4,e}readUint32(){const e=this.view.getUint32(this.pos,!1);return this.pos+=4,e}readInt64(){const e=this.view.getBigInt64(this.pos,!1);return this.pos+=8,e}readBytes(e){const n=new Uint8Array(this.view.buffer,this.pos,e);return this.pos+=e,new Uint8Array(n)}readUtf8StringWithU8Length(){const e=this.readUint8();if(e<=0)return;const n=this.readBytes(e);return new TextDecoder("utf-8").decode(n)}}function Do(t){var e,n,r,s,a,i,c,d,f,m,h;try{const o=globalThis["Onyx:rxd-kmp"],T=(s=(r=(n=(e=o==null?void 0:o.us)==null?void 0:e.wmwm)==null?void 0:n.onyx)==null?void 0:r.rxd)==null?void 0:s.RxdJsBridge,M=((d=(c=(i=(a=globalThis==null?void 0:globalThis.document)==null?void 0:a.querySelector)==null?void 0:i.call(a,'script[src*="Onyx-rxd-kmp.js"]'))==null?void 0:c.getAttribute)==null?void 0:d.call(c,"src"))??null;if(!T||typeof T.decode!="function")return console.warn(`${ce} kmp bridge unavailable; using legacy parser`,{hasModule:!!o,hasBridge:!!T,hasDecode:typeof(T==null?void 0:T.decode)=="function",kmpScriptSrc:M}),null;const u=Object.keys(((h=(m=(f=o==null?void 0:o.us)==null?void 0:f.wmwm)==null?void 0:m.onyx)==null?void 0:h.rxd)??{});console.info(`${ce} using kmp decoder`,{bridgeKeys:u,kmpScriptSrc:M,apiVersion:T.apiVersion??null,libVersion:T.version??null});const p=new Uint8Array(t),v=Int32Array.from(p,y=>y&255),C=T.decode(v);if(!C||!C.header||!C.records)return console.error(`${ce} kmp decode returned invalid payload`),null;const x={version:C.header.version,contentFlags:C.header.contentFlags,recordingId:BigInt(Math.trunc(C.header.recordingId)),startTimeMs:C.header.startTimeMs,endTimeMs:C.header.endTimeMs,controllerId:BigInt(Math.trunc(C.header.controllerId)),bmsId:BigInt(Math.trunc(C.header.bmsId)),device:C.header.device??void 0,modelName:C.header.modelName??void 0,firmwareVersion:C.header.firmwareVersion??void 0},_=C.records.map(y=>y.type==="TELEMETRY"?{type:"telemetry",timeMs:y.timeMs,motorTemp:y.motorTemp??void 0,controllerTemp:y.controllerTemp??void 0,batteryCurrent:y.batteryCurrent??void 0,batteryVoltage:y.batteryVoltage??void 0,rpm:y.rpm??void 0,throttlePercent:y.throttlePercent??void 0,batteryTemp:y.batteryTemp??void 0,flagsBitmask:y.flagsBitmask??void 0,sag:y.sag??void 0,internalResistance:y.internalResistance??void 0,phaseCurrent:y.phaseCurrent??void 0,statusFlags:y.statusFlags??void 0,brakePercent:y.brakePercent??void 0,errorFlags:y.errorFlags??void 0}:y.type==="GPS"?{type:"gps",timeMs:y.timeMs,lat:y.lat??void 0,lng:y.lng??void 0,speed:y.speed??void 0,altitude:y.altitude??void 0,bearing:y.bearing??void 0,accuracy:y.accuracy??void 0}:y.type==="GYRO"?{type:"gyro",timeMs:y.timeMs,x:y.gyroX??void 0,y:y.gyroY??void 0,z:y.gyroZ??void 0,accuracy:y.gyroAccuracy??void 0,sensorType:y.gyroType??void 0,orientation:y.gyroOrientation??void 0}:{type:"event",timeMs:y.timeMs,eventType:y.eventType??0}),U=_.filter(y=>y.type==="gps"&&y.lat!=null&&y.lng!=null).length;return console.info(`${ce} kmp parse ok`,{fileVersion:x.version,contentFlags:x.contentFlags,totalRecords:_.length,gpsWithLatLng:U,telemetryRecords:_.filter(y=>y.type==="telemetry").length,gyroRecords:_.filter(y=>y.type==="gyro").length,eventRecords:_.filter(y=>y.type==="event").length}),{header:x,records:_}}catch(o){return console.error(`${ce} kmp decode threw`,o),null}}function ko(t){const e=new No(t),n=e.readBytes(4);for(let o=0;o<4;o++)if(n[o]!==oo[o])throw new Error("Not a .motormed file (invalid magic bytes)");const r=e.readUint8(),s=e.readUint8();e.readUint16();const a=e.readInt64(),i=Number(e.readInt64()),c=Number(e.readInt64()),d=e.readInt64(),f=e.readInt64();if(e.remaining<0)throw new Error("File too short to contain records");const m={version:r,contentFlags:s,recordingId:a,startTimeMs:i,endTimeMs:c,controllerId:d,bmsId:f};r>=4&&e.remaining>0&&(m.device=e.readUtf8StringWithU8Length(),m.modelName=e.readUtf8StringWithU8Length(),m.firmwareVersion=e.readUtf8StringWithU8Length());const h=[];for(;e.remaining>0;){const o=e.readUint8();if(o===255||e.remaining<4)break;const T=e.readUint32(),M=i+T;if(o===1){const u=e.readUint8(),p=e.readUint8(),v={type:"telemetry",timeMs:M};u&co&&(v.motorTemp=e.readInt16()/10),u&lo&&(v.controllerTemp=e.readInt16()/10),u&uo&&(v.batteryCurrent=e.readInt16()/10),u&ho&&(v.batteryVoltage=e.readUint16()/100),u&fo&&(v.rpm=e.readUint16()),u&mo&&(v.throttlePercent=e.readUint8()),u&go&&(v.batteryTemp=e.readInt16()/10),u&po&&(v.flagsBitmask=e.readInt32()),p&bo&&(v.sag=e.readUint16()/1e3),p&yo&&(v.internalResistance=e.readUint16()/1e3),p&So&&(v.phaseCurrent=e.readInt16()/10),p&To&&(v.statusFlags=e.readUint16()),p&wo&&(v.brakePercent=e.readUint16()/10),p&vo&&(v.errorFlags=e.readUint16()),h.push(v)}else if(o===2){const u=e.readUint8(),p={type:"gps",timeMs:M};u&Eo&&(p.lat=e.readInt32()/1e7,p.lng=e.readInt32()/1e7),u&Mo&&(p.speed=e.readUint16()/100),u&Co&&(p.altitude=e.readInt16()/10),u&Io&&(p.bearing=e.readUint16()/100),u&Ro&&(p.accuracy=e.readUint8()),h.push(p)}else if(o===3){const u=e.readUint8(),p={type:"gyro",timeMs:M};u&_o&&(p.x=e.readInt16()/1e3,p.y=e.readInt16()/1e3,p.z=e.readInt16()/1e3),u&xo&&(p.accuracy=e.readUint8()),u&Ao&&(p.sensorType=e.readUint8()),u&Fo&&(p.orientation=e.readUint8()),h.push(p)}else if(o===4){const u=e.readUint8();h.push({type:"event",timeMs:M,eventType:u})}else{console.warn(`Unknown RXD record type 0x${o.toString(16)} at offset, stopping parse`);break}}return{header:m,records:h}}function Lo(t){const e=Do(t);if(e)return e;console.warn(`${ce} falling back to legacy parser`);try{const n=ko(t),r=n.records.filter(s=>s.type==="gps"&&s.lat!=null&&s.lng!=null).length;return console.info(`${ce} legacy parse ok`,{fileVersion:n.header.version,contentFlags:n.header.contentFlags,totalRecords:n.records.length,gpsWithLatLng:r,telemetryRecords:n.records.filter(s=>s.type==="telemetry").length,gyroRecords:n.records.filter(s=>s.type==="gyro").length,eventRecords:n.records.filter(s=>s.type==="event").length}),n}catch(n){throw console.error(`${ce} legacy parse failed`,n),n}}const Po=1,Oo=2,Bo=4;function $o(t){const e=t.records.filter(m=>m.type==="telemetry").sort((m,h)=>m.timeMs-h.timeMs),n=t.records.filter(m=>m.type==="gyro"&&(m.sensorType===Po||m.sensorType==null)).sort((m,h)=>m.timeMs-h.timeMs),r=t.records.filter(m=>m.type==="gyro"&&m.sensorType===Bo).sort((m,h)=>m.timeMs-h.timeMs),s=t.records.filter(m=>m.type==="gyro"&&m.sensorType===Oo).sort((m,h)=>m.timeMs-h.timeMs),a=t.records.filter(m=>m.type==="gps"&&m.lat!=null&&m.lng!=null).sort((m,h)=>m.timeMs-h.timeMs),i=Array.from(new Set([...e.map(m=>m.timeMs),...a.map(m=>m.timeMs),...n.map(m=>m.timeMs),...r.map(m=>m.timeMs),...s.map(m=>m.timeMs)])).sort((m,h)=>m-h);if(i.length===0)return[];const c=i.map(m=>{const h=jo(a,m,2500),o=De(e,m),T=De(n,m),M=De(r,m),u=De(s,m),p={timeMs:m,lat:(h==null?void 0:h.lat)??0,lng:(h==null?void 0:h.lng)??0,speed:h==null?void 0:h.speed,altitude:h==null?void 0:h.altitude,bearing:h==null?void 0:h.bearing};return o&&(p.motorTemp=o.motorTemp,p.controllerTemp=o.controllerTemp,p.batteryTemp=o.batteryTemp,p.batteryCurrent=o.batteryCurrent,p.batteryVoltage=o.batteryVoltage,p.rpm=o.rpm,p.throttlePercent=o.throttlePercent,p.phaseCurrent=o.phaseCurrent,p.sag=o.sag,p.internalResistance=o.internalResistance,p.flagsBitmask=o.flagsBitmask,p.statusFlags=o.statusFlags,p.brakePercent=o.brakePercent,p.errorFlags=o.errorFlags),T&&(p.accelX=T.x,p.accelY=T.y,p.accelZ=T.z,p.gyroX=T.x,p.gyroY=T.y,p.gyroZ=T.z),M&&(p.gyroRateX=M.x,p.gyroRateY=M.y,p.gyroRateZ=M.z),u&&(p.magnetX=u.x,p.magnetY=u.y,p.magnetZ=u.z),p}),d=Uo(c),f=Vo(d);return zo(f)}function De(t,e){if(t.length===0)return;let n=0,r=t.length-1;for(;n<r;){const i=n+r>>1;t[i].timeMs<e?n=i+1:r=i}if(n===0)return t[0];const s=t[n-1],a=t[n];return Math.abs(a.timeMs-e)<Math.abs(s.timeMs-e)?a:s}function jo(t,e,n){const r=De(t,e);if(r)return Math.abs(r.timeMs-e)<=n?r:void 0}function Uo(t){if(t.length<4)return t;const e=t.filter(u=>Number.isFinite(u.speed)&&(Number.isFinite(u.accelX)&&Number.isFinite(u.accelY)&&Number.isFinite(u.accelZ)||Number.isFinite(u.gyroX)&&Number.isFinite(u.gyroY)&&Number.isFinite(u.gyroZ)||Number.isFinite(u.gyroRateX)&&Number.isFinite(u.gyroRateY)&&Number.isFinite(u.gyroRateZ)));if(e.length<8)return t;const n=e.map(u=>u.speed).filter(u=>Number.isFinite(u)).sort((u,p)=>u-p);if(n.length<8)return t;const r=Ho(n,.85),s=Math.max(2.5,r);let a=e.filter(u=>u.speed>=s);if(a.length<8){const u=[...e].sort((p,v)=>v.speed-p.speed);a=u.slice(0,Math.min(24,u.length))}if(a.length<4)return t;const i=se(a.map(u=>u.accelX).filter(u=>Number.isFinite(u))),c=se(a.map(u=>u.accelY).filter(u=>Number.isFinite(u))),d=se(a.map(u=>u.accelZ).filter(u=>Number.isFinite(u))),f=se(a.map(u=>u.gyroX).filter(u=>Number.isFinite(u))),m=se(a.map(u=>u.gyroY).filter(u=>Number.isFinite(u))),h=se(a.map(u=>u.gyroZ).filter(u=>Number.isFinite(u))),o=se(a.map(u=>u.gyroRateX).filter(u=>Number.isFinite(u))),T=se(a.map(u=>u.gyroRateY).filter(u=>Number.isFinite(u))),M=se(a.map(u=>u.gyroRateZ).filter(u=>Number.isFinite(u)));return t.map(u=>{const p=Number.isFinite(u.accelX)||Number.isFinite(u.accelY)||Number.isFinite(u.accelZ),v=Number.isFinite(u.gyroX)||Number.isFinite(u.gyroY)||Number.isFinite(u.gyroZ),C=Number.isFinite(u.gyroRateX)||Number.isFinite(u.gyroRateY)||Number.isFinite(u.gyroRateZ);return!p&&!v&&!C?u:{...u,accelX:Number.isFinite(u.accelX)?u.accelX-i:u.accelX,accelY:Number.isFinite(u.accelY)?u.accelY-c:u.accelY,accelZ:Number.isFinite(u.accelZ)?u.accelZ-d:u.accelZ,gyroX:Number.isFinite(u.gyroX)?u.gyroX-f:u.gyroX,gyroY:Number.isFinite(u.gyroY)?u.gyroY-m:u.gyroY,gyroZ:Number.isFinite(u.gyroZ)?u.gyroZ-h:u.gyroZ,gyroRateX:Number.isFinite(u.gyroRateX)?u.gyroRateX-o:u.gyroRateX,gyroRateY:Number.isFinite(u.gyroRateY)?u.gyroRateY-T:u.gyroRateY,gyroRateZ:Number.isFinite(u.gyroRateZ)?u.gyroRateZ-M:u.gyroRateZ}})}function Vo(t){if(t.length<4)return t;const e=[...t];let n,r,s;for(let a=0;a<e.length;a++){const i=e[a],c=i.gyroX,d=i.gyroY,f=i.gyroZ;if(!Number.isFinite(c)&&!Number.isFinite(d)&&!Number.isFinite(f))continue;const m=Number.isFinite(i.speed)?i.speed:0,h=m>=8?.32:m>=4?.24:.16,o=Number.isFinite(c)?c:n,T=Number.isFinite(d)?d:r,M=Number.isFinite(f)?f:s;n==null&&(n=o??0),r==null&&(r=T??0),s==null&&(s=M??0),o!=null&&(n=n+(o-n)*h),T!=null&&(r=r+(T-r)*h),M!=null&&(s=s+(M-s)*h),e[a]={...i,gyroX:Number.isFinite(c)?n:i.gyroX,gyroY:Number.isFinite(d)?r:i.gyroY,gyroZ:Number.isFinite(f)?s:i.gyroZ}}return e}function Ho(t,e){if(t.length===0)return 0;if(t.length===1)return t[0];const n=Math.max(0,Math.min(1,e)),r=(t.length-1)*n,s=Math.floor(r),a=Math.ceil(r);if(s===a)return t[s];const i=r-s;return t[s]*(1-i)+t[a]*i}function se(t){if(t.length===0)return 0;const e=[...t].sort((r,s)=>r-s),n=Math.floor(e.length/2);return e.length%2===1?e[n]:(e[n-1]+e[n])/2}function zo(t){if(t.length===0)return t;const e=[...t];let n=0,r=0,s=!1,a=t[0].timeMs;for(let i=0;i<e.length;i++){const c=e[i],d=Math.max(0,(c.timeMs-a)/1e3);a=c.timeMs;const f=c.accelX,m=c.accelY,h=c.accelZ,o=c.gyroRateX,T=c.gyroRateY,M=c.gyroRateZ,u=c.magnetX,p=c.magnetY,v=c.magnetZ,C=Number.isFinite(f)&&Number.isFinite(m)&&Number.isFinite(h),x=Number.isFinite(o)&&Number.isFinite(T)&&Number.isFinite(M),_=Number.isFinite(u)&&Number.isFinite(p)&&Number.isFinite(v);if(!(Number(C)+Number(x)+Number(_)<2)){if(s||(C&&(n=It(f,m,h).roll),_&&C?r=Sn(f,m,h,u,p,v):_?r=Math.atan2(-p,u):r=0,s=!0),x&&d>0&&(n+=o*d,r+=M*d),C){const y=It(f,m,h);x?n=.98*n+.02*y.roll:n=y.roll}if(_){const y=C?Sn(f,m,h,u,p,v):Math.atan2(-p,u);r=x?Yo(r,y,.02):y}e[i]={...c,attitudeRollDeg:Tn(n),attitudeYawDeg:Go(Tn(r))}}}return e}function It(t,e,n){const r=Math.atan2(e,n),s=Math.atan2(-t,Math.sqrt(e*e+n*n));return{roll:r,pitch:s}}function Sn(t,e,n,r,s,a){const{roll:i,pitch:c}=It(t,e,n),d=Math.cos(i),f=Math.sin(i),m=Math.cos(c),h=Math.sin(c),o=r*m+a*h,T=r*f*h+s*d-a*f*m;return Math.atan2(-T,o)}function Yo(t,e,n){let r=e-t;for(;r>Math.PI;)r-=Math.PI*2;for(;r<-Math.PI;)r+=Math.PI*2;return t+r*n}function Tn(t){return t*180/Math.PI}function Go(t){const e=t%360;return e<0?e+360:e}function hr(t,e){const r=t.lat*Math.PI/180,s=e.lat*Math.PI/180,a=(e.lat-t.lat)*Math.PI/180,i=(e.lng-t.lng)*Math.PI/180,c=Math.sin(a/2)**2+Math.cos(r)*Math.cos(s)*Math.sin(i/2)**2;return 6371e3*2*Math.atan2(Math.sqrt(c),Math.sqrt(1-c))}function Xo(t){return!Number.isFinite(t.lat)||!Number.isFinite(t.lng)||t.lat===0&&t.lng===0?!1:t.lat>=-90&&t.lat<=90&&t.lng>=-180&&t.lng<=180}function Wo(t){const e=t.filter(Xo);if(e.length<2)return e;const n=[e[0]],r=120;for(let s=1;s<e.length;s++){const a=n[n.length-1],i=e[s],c=Math.max(0,(i.timeMs-a.timeMs)/1e3);if(c<=0)continue;const d=hr(a,i);if(!Number.isFinite(d)||d<0)continue;const f=d/c;!Number.isFinite(f)||f>r||n.push(i)}return n}function Ko(t){const e=Math.floor(t/1e3),n=Math.floor(e/60),r=e%60;return`${String(n).padStart(2,"0")}:${String(r).padStart(2,"0")}`}function Zo(t){const e=Math.floor(t/1e3),n=Math.floor(e/60),r=e%60,s=Math.floor(t%1e3/10);return n>0?`${String(n).padStart(2,"0")}:${String(r).padStart(2,"0")}.${String(s).padStart(2,"0")}`:`${String(r).padStart(2,"0")}.${String(s).padStart(2,"0")}`}function qo(t){let e=0;for(let n=1;n<t.length;n++){const r=t[n].altitude,s=t[n-1].altitude;r!=null&&s!=null&&r>s&&(e+=r-s)}return e}function gt(t,e,n,r){if(t==null&&e==null&&n==null)return"—";const s=i=>i!=null?ae(i,r).replace(/°[CF]$/,""):"—",a=`°${r}`;return`M/C/B ${s(t)}/${s(e)}/${s(n)} ${a}`}function wn(t,e,n){const r=t.speed??0,s=e.speed??0;if(r===s)return r>=n?t.timeMs:null;const a=r<=n&&s>=n,i=r>=n&&s<=n;if(!a&&!i)return null;const c=Math.min(1,Math.max(0,(n-r)/(s-r)));return t.timeMs+(e.timeMs-t.timeMs)*c}function Jo(t,e,n=.5){if(t.length<2||e<=n)return null;const r=e/2.2369362921,s=n/2.2369362921;let a=null;for(let i=0;i<t.length-1;i+=1){const c=t[i];if(!((c.speed??0)>s))for(let f=i+1;f<t.length;f+=1){const m=t[f-1],h=t[f];if((h.speed??0)<r)continue;const T=wn(c,t[i+1],s)??c.timeMs,u=(wn(m,h,r)??h.timeMs)-T;u>=0&&(a=a==null?u:Math.min(a,u));break}}return a!=null&&a>0?a:null}function Qo(t,e,n){const r=Wo(t),s=r.length>=2,a={totalDistanceMeters:0,distanceLabel:"0",durationMs:0,avgSpeed:"—",fastestSpeed:"—",zeroTo20Mph:"—",zeroTo30Mph:"—",zeroTo45Mph:"—",zeroTo60Mph:"—",zeroToTopSpeed:"—",deadStopTime:"00:00",totalClimb:"—",batteryDrain:"—",avgTemps:"—",maxTemps:"—",minTemps:"—",hasRouteData:s,maxRpm:"—",avgRpm:"—",peakCurrent:"—",avgCurrent:"—",startVoltage:"—",endVoltage:"—",voltageDropLabel:"—",maxThrottle:"—",peakPhaseCurrent:"—"};if(t.length<2)return a;let i=0;for(let b=1;b<r.length;b++)i+=hr(r[b-1],r[b]);const c=e==="mph"?i>=1609?`${(i/1609.344).toFixed(2)} mi`:`${Math.round(i*3.28084)} ft`:i>=1e3?`${(i/1e3).toFixed(2)} km`:`${Math.round(i)} m`,d=t[t.length-1].timeMs-t[0].timeMs,f=t.map(b=>b.speed??0),m=f.reduce((b,B)=>b+B,0)/f.length,h=Math.max(...f),o=h*2.2369362921,T=b=>{const B=Jo(t,b);return B!=null?Zo(B):"—"},M=.35;let u=0;for(let b=1;b<t.length;b++){const B=Math.min(t[b].timeMs-t[b-1].timeMs,1e4);((t[b].speed??0)+(t[b-1].speed??0))*.5<=M&&(u+=B)}const p=qo(t),v=t.map(b=>b.batteryVoltage).filter(b=>b!=null&&b>0),C=v.length>=2?Math.max(0,v[0]-v[v.length-1]):0,x=t.map(b=>b.motorTemp).filter(b=>b!=null&&b>0),_=t.map(b=>b.controllerTemp).filter(b=>b!=null&&b>0),U=t.map(b=>b.batteryTemp).filter(b=>b!=null&&b>0),y=b=>b.length?b.reduce((B,me)=>B+me,0)/b.length:null,g=b=>b.length?Math.max(...b):null,A=b=>b.length?Math.min(...b):null,O=t.map(b=>b.rpm).filter(b=>b!=null&&b>0),V=O.length?Math.max(...O):null,fe=O.length?O.reduce((b,B)=>b+B,0)/O.length:null,q=t.map(b=>b.batteryCurrent).filter(b=>b!=null),Q=q.length?Math.max(...q):null,P=q.length?q.reduce((b,B)=>b+B,0)/q.length:null,G=t.map(b=>b.phaseCurrent).filter(b=>b!=null),H=G.length?Math.max(...G):null,X=t.map(b=>b.throttlePercent).filter(b=>b!=null&&b>0),Ae=X.length?Math.max(...X):null,ne=v.length>0?v[0]:null,z=v.length>0?v[v.length-1]:null,W=ne!=null&&z!=null?Math.max(0,ne-z):null;return{totalDistanceMeters:i,distanceLabel:c,durationMs:d,avgSpeed:pt(m,e),fastestSpeed:pt(h,e),zeroTo20Mph:T(20),zeroTo30Mph:T(30),zeroTo45Mph:T(45),zeroTo60Mph:T(60),zeroToTopSpeed:o>=1?T(o):"—",deadStopTime:Ko(u),totalClimb:p>0?`${Math.round(p)} m`:"—",batteryDrain:C>0?`${C.toFixed(1)} V`:"—",avgTemps:gt(y(x),y(_),y(U),n),maxTemps:gt(g(x),g(_),g(U),n),minTemps:gt(A(x),A(_),A(U),n),hasRouteData:s,maxRpm:V!=null?`${Math.round(V)} RPM`:"—",avgRpm:fe!=null?`${Math.round(fe)} RPM`:"—",peakCurrent:Q!=null?`${Q.toFixed(1)} A`:"—",avgCurrent:P!=null?`${P.toFixed(1)} A`:"—",startVoltage:ne!=null?`${ne.toFixed(1)} V`:"—",endVoltage:z!=null?`${z.toFixed(1)} V`:"—",voltageDropLabel:W!=null&&W>0?`${ne.toFixed(1)} → ${z.toFixed(1)} V (−${W.toFixed(2)} V)`:"—",maxThrottle:Ae!=null?`${Math.round(Ae)}%`:"—",peakPhaseCurrent:H!=null?`${H.toFixed(1)} A`:"—"}}const ec=new Set(["US","BS","BZ","KY","PW","FM","MH"]),tc=new Set(["US","GB","MM","LR"]);function fr(){try{return new Intl.Locale(navigator.language).region??null}catch{return null}}function vn(){const t=fr();return t&&ec.has(t)?"F":"C"}function En(){const t=fr();return t&&tc.has(t)?"mph":"kmh"}const Mn="/rxds/1.motormed",Cn=3e4,nc=3*1609.344;function In(t){const e=t.match(/^(https:\/\/firebasestorage\.googleapis\.com(?::\d+)?\/v0\/b\/[^/?#]+\/o\/)([^?#]*)(.*)$/);if(!e)return t;const n=e[2].replace(/\//g,"%2F");return e[1]+n+e[3]}function rc(){const[t,e]=S.useState("idle"),[n,r]=S.useState(""),[s,a]=S.useState(Mn),[i,c]=S.useState(null),[d,f]=S.useState(null),[m,h]=S.useState(!1),[o,T]=S.useState([]),[M,u]=S.useState(null),[p,v]=S.useState(0),[C,x]=S.useState(0),[_,U]=S.useState([]),[y,g]=S.useState(null),[A,O]=S.useState("hidden"),[V,fe]=S.useState(!0),[q,Q]=S.useState(!1),[P,G]=S.useState(!1),[H,X]=S.useState(!0),Ae=!1,ne=o.filter(w=>Number.isFinite(w.lat)&&Number.isFinite(w.lng)&&(w.lat!==0||w.lng!==0));S.useEffect(()=>{t==="ready"&&console.info("[replay-map] gate",{hasRouteData:V,hasMapboxToken:Ae,points:o.length,gpsPoints:o.filter(w=>Number.isFinite(w.lat)&&Number.isFinite(w.lng)&&(w.lat!==0||w.lng!==0)).length})},[t,V,Ae,o]);const[z,W]=S.useState(!1),[b,B]=S.useState(0),[me,Ot]=S.useState({type:"duration",seconds:15}),mr=En(),gr=vn(),Be=S.useRef(0),Ee=S.useRef(0),re=S.useRef(0),$e=S.useRef(!1),Bt=S.useRef(1),je=S.useRef(0),Je=S.useRef(0),ge=S.useRef(null),Qe=S.useRef(null),Fe=S.useRef(null),et=eo(),K=_.length>0?Ar(_):0;S.useEffect(()=>{$e.current=z},[z]),S.useEffect(()=>{Bt.current=bt(me,K)},[me,K]),S.useEffect(()=>{re.current=b},[b]),je.current=K;const $t=K>0?Math.min(b/K,1):0;bt(me,K);const pr=S.useCallback((w,E)=>{if(w<=0)return"";const I=new Date(w),D=E>0?new Date(E):null;if(!D)return I.toLocaleTimeString([],{hour:"numeric",minute:"2-digit",second:"2-digit"});const j=I.toDateString()===D.toDateString(),R=I.toLocaleTimeString([],{hour:"numeric",minute:"2-digit",second:"2-digit"}),ee=D.toLocaleTimeString([],{hour:"numeric",minute:"2-digit",second:"2-digit"});if(j)return`${R} - ${ee}`;const Z=I.toLocaleString([],{month:"numeric",day:"numeric",year:"numeric",hour:"numeric",minute:"2-digit",second:"2-digit"}),Ie=D.toLocaleString([],{month:"numeric",day:"numeric",year:"numeric",hour:"numeric",minute:"2-digit",second:"2-digit"});return`${Z} - ${Ie}`},[]),Ue=S.useCallback(w=>{const E=Lo(w),I=$o(E);if(I.length<2)throw new Error("Not enough replay samples in this recording");const D=E.records.filter(R=>R.type==="gps"&&R.lat!=null&&R.lng!=null).length;fe(D>=2),T(I),u({version:E.header.version,contentFlags:E.header.contentFlags,recordingId:E.header.recordingId.toString(),startTimeMs:E.header.startTimeMs,endTimeMs:E.header.endTimeMs,controllerId:E.header.controllerId.toString(),bmsId:E.header.bmsId.toString(),device:E.header.device,modelName:E.header.modelName,firmwareVersion:E.header.firmwareVersion}),U(_r(I)),v(E.header.startTimeMs),x(E.header.endTimeMs);const j=Qo(I,En(),vn());g(j),Ot(j.totalDistanceMeters>nc?{type:"duration",seconds:45}:{type:"duration",seconds:15}),O("intro"),B(0),re.current=0,W(!1),e("ready")},[]),jt=S.useCallback(w=>{const E=new URL(window.location.href);return E.searchParams.set("f",w),E.toString()},[]),Ut=S.useCallback(async w=>{try{const E=jt(w),I=await An(E);f(I)}catch{f(null)}},[jt]),Ve=S.useCallback(async(w,E)=>{const I=w.trim();let D=I;try{D=decodeURIComponent(I)}catch{}const j=In(D);if(!j){r("Enter a valid .motormed URL."),e("error");return}if(e("loading"),r(""),h(!1),c(j),E){const R=new URL(window.location.href);R.searchParams.set("f",j),window.history.replaceState({},"",R.toString())}try{const R=new AbortController,ee=window.setTimeout(()=>R.abort(),Cn),Z=await fetch(j,{signal:R.signal,cache:"no-store"});if(window.clearTimeout(ee),!Z.ok)throw new Error(`HTTP ${Z.status}: ${Z.statusText}`);const Ie=await Z.arrayBuffer();Ue(Ie),Ut(j)}catch(R){R instanceof DOMException&&R.name==="AbortError"?r(`Timed out loading ride file after ${Math.round(Cn/1e3)}s.`):r(R instanceof Error?R.message:String(R)),e("error")}},[Ue,Ut]),Me=o.length>0?rt(o,Yt(_,b,o[0].timeMs)):null,pe=(Me==null?void 0:Me.point)??null,tt=(Me==null?void 0:Me.index)??0,Ce=ne.length>0&&pe?rt(ne,pe.timeMs):null;Ce==null||Ce.point,Ce==null||Ce.index;const br=pe?pe.bearing!=null?pe.bearing:tt>0?Nr(o[tt],pe):0:0,nt=S.useCallback(w=>{if(!$e.current)return;Ee.current===0&&(Ee.current=w);const E=w-Ee.current;Ee.current=w;const I=E*Bt.current,D=Math.min(re.current+I,je.current);if(re.current=D,(w-Je.current>=33||D>=je.current)&&(B(D),Je.current=w),D>=je.current){W(!1),$e.current=!1,O("end");return}Be.current=requestAnimationFrame(nt)},[]);S.useEffect(()=>(z?(Ee.current=0,Je.current=0,Be.current=requestAnimationFrame(nt)):(cancelAnimationFrame(Be.current),Ee.current=0),()=>cancelAnimationFrame(Be.current)),[z,nt]);const yr=()=>{A==="intro"?(O("hidden"),W(!0)):O("hidden")};S.useEffect(()=>{const E=new URLSearchParams(window.location.search).get("f"),I=E?In(E):null;if(!I){e("idle");return}a(I),Ve(I,!1)},[Ve]),S.useEffect(()=>{const w=R=>{var Z;const ee=(Z=R.dataTransfer)==null?void 0:Z.types;return!!ee&&Array.from(ee).includes("Files")},E=R=>{w(R)&&(R.preventDefault(),Q(!0))},I=R=>{w(R)&&(R.preventDefault(),R.dataTransfer&&(R.dataTransfer.dropEffect="copy"),q||Q(!0))},D=R=>{w(R)&&(R.preventDefault(),R.relatedTarget==null&&Q(!1))},j=async R=>{var Ie;if(!w(R))return;R.preventDefault(),Q(!1);const Z=Array.from(((Ie=R.dataTransfer)==null?void 0:Ie.files)??[]).find(be=>be.name.toLowerCase().endsWith(".motormed"));if(!Z){r("Drop a .motormed file to load a ride."),e("error");return}e("loading");try{const be=await Z.arrayBuffer();c(null),f(null),Ue(be)}catch(be){r(be instanceof Error?be.message:String(be)),e("error")}};return window.addEventListener("dragenter",E),window.addEventListener("dragover",I),window.addEventListener("dragleave",D),window.addEventListener("drop",j),()=>{window.removeEventListener("dragenter",E),window.removeEventListener("dragover",I),window.removeEventListener("dragleave",D),window.removeEventListener("drop",j)}},[q,Ue]);const Ne=S.useCallback(()=>{o.length<2||(!z&&b>=K&&(B(0),re.current=0,O("hidden")),W(w=>!w))},[z,b,K,o.length]),J=S.useCallback(()=>{X(!0),Fe.current&&clearTimeout(Fe.current),A==="hidden"&&(Fe.current=setTimeout(()=>{X(!1)},3e3))},[A]);S.useEffect(()=>(J(),()=>{Fe.current&&clearTimeout(Fe.current)}),[J]);const Sr=S.useCallback(w=>{if(J(),w.button!==0||A!=="hidden")return;const E=w.target;E!=null&&E.closest(".controls,button,a,input,textarea,select,label,.progress-track,.speed-control,.speed-popover,.ride-summary-overlay,.ride-summary-card,.url-load-row")||Ne()},[Ne,J,A]);S.useEffect(()=>{const w=E=>{const I=E.target;if(!(I&&(I.isContentEditable||/^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test(I.tagName)))){if(E.key==="ArrowRight"||E.key==="ArrowLeft"){if(o.length<2)return;E.preventDefault(),J(),W(!1),$e.current=!1;const D=E.key==="ArrowRight"?1:-1,j=rt(o,Yt(_,re.current,o[0].timeMs)),R=Math.max(0,Math.min(o.length-1,j.index+D)),ee=xr(_,o[R].timeMs);re.current=ee,B(ee);return}if(!(E.key!==" "&&E.code!=="Space")){if(E.preventDefault(),J(),A==="intro"){O("hidden"),W(!0);return}if(A!=="hidden"){O("hidden");return}Ne()}}};return window.addEventListener("keydown",w),()=>window.removeEventListener("keydown",w)},[Ne,J,A,o,_]);const He=S.useCallback((w,E)=>{const I=E.getBoundingClientRect(),j=Math.max(0,Math.min(1,(w-I.left)/I.width))*K;B(j),re.current=j,W(!1)},[K]),Tr=S.useCallback(w=>{var E,I;J(),w.preventDefault(),G(!0),ge.current=w.pointerId,Qe.current=w.currentTarget,(I=(E=w.currentTarget).setPointerCapture)==null||I.call(E,w.pointerId),He(w.clientX,w.currentTarget)},[J,He]);S.useEffect(()=>{if(!P)return;const w=I=>{if(ge.current!=null&&I.pointerId!==ge.current)return;const D=Qe.current;D&&He(I.clientX,D)},E=I=>{I&&ge.current!=null&&I.pointerId!==ge.current||(ge.current=null,G(!1))};return window.addEventListener("pointermove",w),window.addEventListener("pointerup",E),window.addEventListener("pointercancel",E),()=>{window.removeEventListener("pointermove",w),window.removeEventListener("pointerup",E),window.removeEventListener("pointercancel",E),ge.current=null}},[P,He]);const Vt=S.useCallback(async()=>{await Ve(s,!0)},[Ve,s]),wr=S.useCallback(async()=>{if(d)try{await navigator.clipboard.writeText(d),h(!0),setTimeout(()=>h(!1),2e3)}catch{}},[d]),Ht=S.useCallback(()=>{s===Mn&&a("")},[s]);return t==="idle"?l.jsxs("div",{className:"splash",children:[l.jsx("img",{src:"/logo.svg",style:{width:80,height:80},alt:"Motormed"}),l.jsx("h1",{children:"Motormed Replay"}),l.jsxs("p",{children:["Add a ",l.jsx("code",{style:{color:"#6C63FF"},children:"?f="})," query parameter with a URL to a"," ",l.jsx("code",{style:{color:"#EB3D70"},children:".motormed"})," file to load a ride."]}),l.jsxs("p",{style:{fontSize:"0.75rem",marginTop:4},children:["Example: ",l.jsx("code",{children:"?f=https://example.com/ride.motormed"})]}),l.jsxs("p",{style:{fontSize:"0.75rem",marginTop:4},children:["Or drag and drop a ",l.jsx("code",{children:".motormed"})," file anywhere on this page."]}),l.jsxs("div",{className:"url-load-row",children:[l.jsx("input",{className:"url-load-input",placeholder:"Paste .motormed URL",value:s,onChange:w=>a(w.target.value),onFocus:Ht}),l.jsx("button",{className:"url-load-btn",onClick:Vt,disabled:!s.trim(),children:"Load URL"})]}),l.jsx("a",{className:"install-inline-cta",href:zt,children:"Install Motormed to record and share your own rides"}),l.jsx(Ct,{offer:et,className:"splash-promo",codeClassName:"splash-promo-code"})]}):t==="loading"?l.jsxs("div",{className:"splash",children:[l.jsx("img",{src:"/logo.svg",style:{width:60,height:60,opacity:.6},alt:"Motormed"}),l.jsx("div",{className:"spinner"}),l.jsx("h1",{children:"Loading ride…"})]}):t==="error"?l.jsxs("div",{className:"splash",children:[l.jsx("h1",{children:"Failed to load ride"}),l.jsx("p",{children:n}),l.jsxs("div",{className:"url-load-row",children:[l.jsx("input",{className:"url-load-input",placeholder:"Paste .motormed URL",value:s,onChange:w=>a(w.target.value),onFocus:Ht}),l.jsx("button",{className:"url-load-btn",onClick:Vt,disabled:!s.trim(),children:"Load URL"})]}),l.jsx("a",{className:"install-inline-cta",href:zt,children:"Install Motormed to record and share rides from the app"}),l.jsx(Ct,{offer:et,className:"splash-promo",codeClassName:"splash-promo-code"})]}):l.jsxs("div",{className:"map-root",onMouseDown:Sr,onMouseMove:J,onTouchStart:J,children:[q&&l.jsx("div",{style:{position:"fixed",inset:0,zIndex:9999,background:"rgba(13, 18, 30, 0.72)",border:"2px dashed rgba(255,255,255,0.55)",display:"grid",placeItems:"center",color:"#fff",fontWeight:700,letterSpacing:.3,pointerEvents:"none"},children:"Drop .motormed file to load ride"}),l.jsx("div",{className:"map-fallback",children:l.jsx("div",{className:"map-fallback-label",children:V?"Map token missing (VITE_MAPBOX_TOKEN) • telemetry playback":"No route data • telemetry playback"})}),l.jsx(Gr,{point:pe,elapsedMs:b,headingDeg:br,allPoints:o,currentIndex:tt,speedUnit:mr,tempUnit:gr,hasRouteData:V,headerMeta:M}),y&&A!=="hidden"&&l.jsx(io,{stats:y,isEnd:A==="end",autoHide:A==="intro",shareUrl:d??void 0,promoOffer:et,onAutoHide:yr,onDismiss:()=>{A==="end"?(B(0),re.current=0,O("hidden")):A==="intro"?(O("hidden"),W(!0)):O("hidden")}}),l.jsxs("div",{className:`controls${H?"":" controls-hidden"}`,children:[l.jsxs("div",{className:"controls-row",children:[l.jsx("button",{className:"play-btn",onClick:Ne,disabled:o.length<2,"aria-label":z?"Pause":"Play",children:z?l.jsx(ac,{}):l.jsx(sc,{})}),l.jsx("span",{className:"time-label",children:Le(b)}),l.jsxs("div",{ref:Qe,className:"progress-track",onPointerDown:Tr,children:[l.jsx("div",{className:"progress-fill",style:{width:`${$t*100}%`}}),l.jsx("div",{className:"progress-thumb",style:{left:`${$t*100}%`}})]}),l.jsx("span",{className:"time-label",style:{textAlign:"right"},children:Le(K)}),l.jsx(ns,{mode:me,compressedDurationMs:K,onChange:Ot})]}),o.length>0&&l.jsxs("div",{style:{fontSize:11,color:"rgba(255,255,255,0.4)",paddingLeft:4},children:[V?ne.length:o.length," ",V?"GPS":"telemetry"," points · ",pr(p,C)]}),i&&d||y&&A==="hidden"?l.jsxs("div",{style:{fontSize:11,color:"rgba(255,255,255,0.7)",paddingLeft:4,display:"flex",gap:8,alignItems:"center"},children:[i&&d&&l.jsxs(l.Fragment,{children:[l.jsx("span",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:d}),l.jsx("button",{className:"url-load-btn",onClick:wr,children:m?"Copied":"Copy Link"})]}),y&&A==="hidden"&&l.jsx("button",{className:"url-load-btn",onClick:()=>O("manual"),children:"Ride Summary"})]}):null]})]})}function sc(){return l.jsx("svg",{viewBox:"0 0 24 24","aria-hidden":!0,children:l.jsx("path",{d:"M8 5v14l11-7z"})})}function ac(){return l.jsx("svg",{viewBox:"0 0 24 24","aria-hidden":!0,children:l.jsx("path",{d:"M6 19h4V5H6v14zm8-14v14h4V5h-4z"})})}vr(document.getElementById("root")).render(l.jsx(S.StrictMode,{children:l.jsxs("div",{className:"page-shell replay-shell",children:[l.jsx(Er,{}),l.jsx(rc,{})]})}));
