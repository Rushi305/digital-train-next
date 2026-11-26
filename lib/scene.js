import * as THREE from 'three';
export function createHero(canvas){const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var hc=canvas,HR=new THREE.WebGLRenderer({canvas:hc,antialias:true,alpha:true}),HS=new THREE.Scene(),HC=new THREE.PerspectiveCamera(62,1,.1,300);
HR.setPixelRatio(Math.min(devicePixelRatio,2));
var N=16000,pos=new Float32Array(N*3),as=new Float32Array(N*4);for(var i=0;i<N;i++){as[i*4]=Math.random();as[i*4+1]=Math.random();as[i*4+2]=Math.random();as[i*4+3]=Math.random()}
var hg=new THREE.BufferGeometry();hg.setAttribute('position',new THREE.BufferAttribute(pos,3));hg.setAttribute('aS',new THREE.BufferAttribute(as,4));
var hu={uT:{value:0},uPx:{value:1}};
var hm=new THREE.ShaderMaterial({uniforms:hu,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
vertexShader:'attribute vec4 aS;uniform float uT,uPx;varying float vD;varying float vL;void main(){float lane=floor(aS.x*9.);float z=-(160.-mod(aS.y*160.+uT*(7.+aS.z*4.),160.));float x=(lane-4.)*3.4+sin(z*.05+lane*.7+uT*.25)*5.+(aS.w-.5)*.5;float y=-4.5+lane*.35+sin(z*.04+lane*1.3+uT*.2)*2.4+cos(z*.11+lane)*.7+(aS.z-.5)*.25;vec4 mv=modelViewMatrix*vec4(x,y,z,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(uPx*(1.+aS.z*2.2)*(46./(-mv.z+3.)),1.,9.);vD=-z/160.;vL=lane/8.;}',
fragmentShader:'varying float vD;varying float vL;void main(){float d=length(gl_PointCoord-.5);float a=smoothstep(.5,0.,d)*smoothstep(0.,.1,vD)*(1.-vD);vec3 c=mix(vec3(1.,.42,.29),vec3(1.,.82,.55),vL);c=mix(c,vec3(1.,.95,.88),smoothstep(.6,1.,1.-vD)*.6);gl_FragColor=vec4(c,a*.85);}'});
var pts=new THREE.Points(hg,hm);pts.frustumCulled=false;HS.add(pts);
var mx=0,my=0;addEventListener('pointermove',function(e){mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
function hsize(){var w=hc.clientWidth,h=hc.clientHeight;HR.setSize(w,h,false);HC.aspect=w/h;HC.updateProjectionMatrix();hu.uPx.value=Math.min(devicePixelRatio,2)*(w<700?.8:1.1)}
hsize();let hT=0;return{resize:hsize,render(dt,hp){hT+=dt*(reduce?.2:1+hp*5);hu.uT.value=hT;HC.position.x+=(mx*3-HC.position.x)*.04;HC.position.y+=(-my*1.6-HC.position.y)*.04;HC.lookAt(0,-1,-40);HR.render(HS,HC)},dispose(){HR.dispose();hg.dispose();hm.dispose()}}}
export function createTrain(canvas){var L=6;
var gl=canvas,R=new THREE.WebGLRenderer({canvas:gl,antialias:true,alpha:true}),S=new THREE.Scene(),cam=new THREE.PerspectiveCamera(36,1,1,120),stage=canvas.parentElement;
R.setPixelRatio(Math.min(devicePixelRatio,2));R.shadowMap.enabled=true;R.shadowMap.type=THREE.PCFSoftShadowMap;R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=1.15;R.outputEncoding=THREE.sRGBEncoding;
var es=new THREE.Scene(),ec=document.createElement('canvas');ec.width=4;ec.height=256;var ex=ec.getContext('2d'),eg=ex.createLinearGradient(0,0,0,256);
[[0,'#1b2350'],[.45,'#7b4a7a'],[.7,'#ff8c5a'],[.85,'#ffd29a'],[1,'#2a2030']].forEach(function(a){eg.addColorStop(a[0],a[1])});ex.fillStyle=eg;ex.fillRect(0,0,4,256);
es.add(new THREE.Mesh(new THREE.SphereGeometry(50,32,16),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(ec),side:THREE.BackSide})));
var sb=new THREE.Mesh(new THREE.PlaneGeometry(30,8),new THREE.MeshBasicMaterial({color:new THREE.Color(5,4,3)}));sb.position.set(22,22,12);sb.lookAt(0,0,0);es.add(sb);
S.environment=new THREE.PMREMGenerator(R).fromScene(es,.02).texture;
S.add(new THREE.HemisphereLight(0xffc89a,0x241a38,.35));
var sun=new THREE.DirectionalLight(0xffb27a,1.6);sun.position.set(14,9,8);sun.castShadow=true;sun.shadow.mapSize.set(2048,1024);var sc=sun.shadow.camera;sc.left=-18;sc.right=18;sc.top=8;sc.bottom=-4;sc.far=60;sun.shadow.bias=-.0004;sun.shadow.normalBias=.04;S.add(sun);
function PM(c,m,r,o){return new THREE.MeshPhysicalMaterial(Object.assign({color:c,metalness:m,roughness:r},o||{}))}
var paint=PM(0x182246,.6,.26,{clearcoat:1,clearcoatRoughness:.1}),coral=PM(0xff6a4a,.4,.3,{clearcoat:1}),iron=PM(0x9aa1b0,1,.3),dark=PM(0x141722,.5,.55),silver=PM(0xcfd3dc,1,.18),roofM=PM(0xaeb4c2,.8,.4);
function tex(c){var t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;t.anisotropy=4;return t}
function winTex(){var c=document.createElement('canvas');c.width=512;c.height=64;var x=c.getContext('2d'),g=x.createLinearGradient(0,0,0,64);g.addColorStop(0,'#ffe1ae');g.addColorStop(1,'#e69a58');x.fillStyle=g;x.fillRect(0,0,512,64);x.fillStyle='rgba(60,35,35,.8)';for(var i=0;i<12;i++){x.beginPath();x.arc(22+i*42,50,10,0,6.3);x.fill();x.fillRect(12+i*42,50,20,16)}x.fillStyle='#0a0f1e';for(i=0;i<=12;i++)x.fillRect(i*42-2,0,5,64);return tex(c)}
var wt=winTex(),glass=new THREE.MeshStandardMaterial({color:0x111418,emissive:0xffffff,emissiveMap:wt,emissiveIntensity:.95,metalness:.2,roughness:.15});
function label(txt,w,h,fs,col,bg){var c=document.createElement('canvas');c.width=w;c.height=h;var x=c.getContext('2d');if(bg){x.fillStyle=bg;x.fillRect(0,0,w,h)}x.fillStyle=col;x.font='500 '+fs+'px Manrope,sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText(txt,w/2,h/2+2);return new THREE.MeshBasicMaterial({map:tex(c),transparent:!bg})}
function rr(w,h,r){var s=new THREE.Shape(),x=-w/2;s.moveTo(x+r,0);s.lineTo(x+w-r,0);s.quadraticCurveTo(x+w,0,x+w,r);s.lineTo(x+w,h-r);s.quadraticCurveTo(x+w,h,x+w-r,h);s.lineTo(x+r,h);s.quadraticCurveTo(x,h,x,h-r);s.lineTo(x,r);s.quadraticCurveTo(x,0,x+r,0);return s}
function ext(s,d){var g=new THREE.ExtrudeGeometry(s,{depth:d,bevelEnabled:true,bevelSize:.07,bevelThickness:.07,bevelSegments:4,curveSegments:10});g.translate(0,0,-d/2);return g}
function mesh(g,m,x,y,z,p,sh){var o=new THREE.Mesh(g,m);o.position.set(x,y,z);if(sh){o.castShadow=o.receiveShadow=true}p.add(o);return o}
var BX=function(w,h,d){return new THREE.BoxGeometry(w,h,d)},CY=function(a,h,s){return new THREE.CylinderGeometry(a,a,h,s||24)};
var gT=CY(.36,.16,32),gF=CY(.43,.035,32),gH=CY(.12,.2,12),gS=BX(.62,.07,.05),gA=CY(.07,1.6,12),gSp=CY(.09,.3,10),W=[],RODS=[],PAN=[];
function wheel(p,x,z){var g=new THREE.Group();g.position.set(x,.46,z);var a=new THREE.Mesh(gT,iron);a.rotation.x=Math.PI/2;g.add(a);var f=new THREE.Mesh(gF,iron);f.rotation.x=Math.PI/2;f.position.z=z>0?-.08:.08;g.add(f);
for(var i=0;i<3;i++){var s=new THREE.Mesh(gS,dark);s.rotation.z=i*Math.PI/3;s.position.z=z>0?.085:-.085;g.add(s)}
var h=new THREE.Mesh(gH,silver);h.rotation.x=Math.PI/2;g.add(h);p.add(g);W.push(g)}
function bogie(p,x,rods){mesh(BX(2.1,.16,1.2),dark,x,.62,0,p,1);[-.6,.6].forEach(function(a){var ax=mesh(gA,iron,x+a,.46,0,p);ax.rotation.x=Math.PI/2;wheel(p,x+a,.72);wheel(p,x+a,-.72);[-.5,.5].forEach(function(z){mesh(gSp,silver,x+a,.78,z,p)})});
if(rods)[.86,-.86].forEach(function(z){RODS.push({m:mesh(BX(1.32,.08,.05),silver,x,.46,z,p),x:x})})}
var train=new THREE.Group();S.add(train);var loco=new THREE.Group();train.add(loco);
var ls=new THREE.Shape();[[-3,0],[2.6,0],[3.15,.55],[3.05,1.25],[2.3,1.9],[-3,1.9]].forEach(function(q,i){i?ls.lineTo(q[0],q[1]):ls.moveTo(q[0],q[1])});
mesh(ext(ls,1.62),paint,0,.75,0,loco,1);
[.88,-.88].forEach(function(z){mesh(BX(5.4,.1,.03),coral,-.2,1.25,z,loco);mesh(BX(.9,.5,.03),glass,-2.3,2.1,z,loco);mesh(BX(.8,.5,.03),glass,-.6,2.1,z,loco)});
mesh(BX(.1,.6,1.3),glass,3.0,1.95,0,loco).rotation.z=-.7;
mesh(BX(.12,.22,.4),new THREE.MeshBasicMaterial({color:new THREE.Color(4,3.6,2.8)}),3.2,1.35,.45,loco);mesh(BX(.12,.22,.4),new THREE.MeshBasicMaterial({color:new THREE.Color(4,3.6,2.8)}),3.2,1.35,-.45,loco);
var hl=new THREE.SpotLight(0xffe2b0,2.2,22,.5,.6);hl.position.set(3.2,1.5,0);hl.target.position.set(9,.5,0);loco.add(hl,hl.target);
mesh(BX(4.6,.14,1.3),roofM,-.5,2.7,0,loco,1);mesh(BX(.8,.18,.1),coral,.6,1.7,.86,loco);
bogie(loco,-1.7,1);bogie(loco,1.5,1);
var pa=new THREE.Group();pa.position.set(-.5,2.75,0);loco.add(pa);var pl=mesh(BX(.05,1.0,.05),silver,0,.45,.3,pa),pr=mesh(BX(.05,1.0,.05),silver,0,.45,-.3,pa);pl.rotation.z=pr.rotation.z=.45;mesh(BX(.05,.7,.05),silver,.2,1.0,.3,pa).rotation.z=-.5;mesh(BX(.05,.7,.05),silver,.2,1.0,-.3,pa).rotation.z=-.5;mesh(BX(.6,.05,1.2),dark,.3,1.3,0,pa);
var cars=[];
for(var k=0;k<10;k++){var g=new THREE.Group();g.position.x=-(k+1)*L;train.add(g);
mesh(ext(rr(5.45,1.9,.35),1.62),paint,0,.75,0,g,1);mesh(BX(5.4,.14,1.5),roofM,0,2.75,0,g,1);mesh(BX(1.2,.2,.8),silver,-1.3,2.86,0,g);mesh(BX(1.2,.2,.8),silver,1.3,2.86,0,g);
var lb=label('DT-'+String(k+1).padStart(2,'0'),256,48,28,'#f3ece1');
[.88,-.88].forEach(function(z){mesh(new THREE.PlaneGeometry(5.0,.62),glass,0,1.95,z*1.017,g).rotation.y=z>0?0:Math.PI;mesh(BX(5.4,.1,.03),coral,0,1.25,z,g);var pl=mesh(new THREE.PlaneGeometry(1.3,.24),lb,-1.9,1.5,z*1.04,g);if(z<0)pl.rotation.y=Math.PI});
mesh(BX(.5,1.6,1.5),dark,2.95,1.6,0,g);mesh(CY(.08,.5,8),silver,3.2,.95,0,g).rotation.z=Math.PI/2;
bogie(g,-1.8);bogie(g,1.8)}
var gt=document.createElement('canvas');gt.width=gt.height=256;var gx=gt.getContext('2d');gx.fillStyle='#3a3238';gx.fillRect(0,0,256,256);for(var i=0;i<3500;i++){var v=60+Math.random()*90|0;gx.fillStyle='rgb('+v+','+(v-6)+','+(v-4)+')';gx.fillRect(Math.random()*256,Math.random()*256,2+Math.random()*3,2+Math.random()*3)}
var gtex=tex(gt);gtex.wrapS=gtex.wrapT=THREE.RepeatWrapping;gtex.repeat.set(30,5);
var gr=mesh(new THREE.PlaneGeometry(200,24),new THREE.MeshStandardMaterial({map:gtex,roughness:1}),0,0,-4,S);gr.rotation.x=-Math.PI/2;gr.receiveShadow=true;
var tk=new THREE.Group();S.add(tk);
for(var i=-20;i<=20;i+=.75)mesh(BX(.28,.12,2.4),PM(0x4a3830,0,.9),i,.1,0,tk,1);
[.72,-.72].forEach(function(z){mesh(BX(120,.08,.09),iron,0,.2,z,tk);mesh(BX(120,.14,.05),iron,0,.28,z,tk);mesh(BX(120,.05,.14),iron,0,.35,z,tk)});
for(var i=-40;i<=40;i+=9){mesh(BX(.14,5.4,.14),dark,i,2.7,-5.2,tk,1);mesh(BX(.1,.1,5.2),dark,i,4.9,-2.6,tk)}
mesh(BX(120,.03,.03),silver,0,3.98,0,tk);mesh(BX(120,.03,.03),dark,0,4.5,0,tk);
var plat=new THREE.Group();S.add(plat);mesh(BX(34,.8,2.6),PM(0x5a4a58,0,.8),0,.4,-2.9,plat,1);mesh(BX(34,.02,.18),PM(0xe8b66f,0,.5),0,.81,-1.7,plat);
mesh(BX(34,.16,3.4),dark,0,3.6,-3.1,plat,1);[-12,-4,4,12].forEach(function(x){mesh(BX(.2,2.8,.2),silver,x,2.2,-2.1,plat,1);mesh(BX(.5,.1,.4),new THREE.MeshBasicMaterial({color:new THREE.Color(4,3.4,2.4)}),x+2,3.5,-2.6,plat)});
mesh(new THREE.PlaneGeometry(6,.8),label('DIGITAL TRAIN',512,64,40,'#f3ece1','#0a0f1e'),0,2.6,-1.95,plat);
function size(){var w=stage.clientWidth,h=stage.clientHeight,n=w/h<.9;R.setSize(w,h,false);cam.aspect=w/h;cam.userData.z=n?27:14;cam.userData.ly=n?5.2:3.7;cam.updateProjectionMatrix()}
size();
const cl=v=>Math.max(0,Math.min(1,v));
function update(t,now,mx,my){const tx=t<=10?L*t:L*(10+.35*(1-Math.pow(1-cl((t-10)/1.4),2)));train.position.x=tx;const a=-tx/.36;
W.forEach(w=>{w.rotation.z=a});RODS.forEach(r=>{r.m.position.x=r.x+.2*Math.cos(a);r.m.position.y=.46+.2*Math.sin(a)});
const sp=t>.02&&t<10.2?1:0;pa.rotation.z=Math.sin(now*.003)*.015*sp;const tp=t>10.6||t<.8?0:-1.8;plat.position.y+=(tp-plat.position.y)*.06;
cam.position.set(Math.sin(t*.4)*.7+mx*.6,2.5+Math.sin(t*.3)*.25-my*.3,cam.userData.z-Math.cos(t*.25)*.8);cam.lookAt(0,cam.userData.ly,0);R.render(S,cam)}
return{update,resize:size,dispose(){R.dispose()}}}
