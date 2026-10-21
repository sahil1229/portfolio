/* The pixel desk, ported from the Brix site. Mount with window.mountDesk(el). */
(function(){
'use strict';
const reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
const NS='http://www.w3.org/2000/svg';
const COL={ink:'#141210',paper:'#F2F0EB',side:'#6D6B68',sideN:'#9C9890',clay:'#8E3A24',clayN:'#C9714F'};
const $=(s,r)=>(r||document).querySelector(s),$$=(s,r)=>[...(r||document).querySelectorAll(s)];
function E(t,a,p){const e=document.createElementNS(NS,t);for(const k in (a||{}))e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e}
const pts=a=>a.map(p=>p[0].toFixed(2)+','+p[1].toFixed(2)).join(' ');
const C30=Math.cos(Math.PI/6);const P=(x,y,z,u)=>[(x-y)*C30*u,(x+y)*.5*u-z*u];
const pad=(n,l)=>String(n).padStart(l,'0');
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function seen(el,on,off,margin){if(!('IntersectionObserver' in window)){on();return}const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting?on(e):off&&off(e)),{rootMargin:margin||'100px'});io.observe(el);return io}
function drawBrick(g,fg){const u=26,L=2,W=1,H=.62,p=(a,b,c)=>P(a,b,c,u);const top=[p(0,0,H),p(L,0,H),p(L,W,H),p(0,W,H)],A=[p(0,W,0),p(L,W,0),p(L,W,H),p(0,W,H)],B=[p(L,0,0),p(L,W,0),p(L,W,H),p(L,0,H)];
  E('polygon',{points:pts(A),fill:fg==='paper'?COL.sideN:COL.side},g);E('polygon',{points:pts(B),fill:fg==='paper'?COL.clayN:COL.clay},g);E('polygon',{points:pts(top),fill:fg==='paper'?COL.paper:COL.ink},g)}
function fit(svg,g,pd){const b=g.getBBox();pd=pd||0;svg.setAttribute('viewBox',[b.x-pd,b.y-pd,b.width+pd*2,b.height+pd*2].join(' '))}
const BAYER=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5].map(v=>(v+.5)/16);
const LE=new Uint8Array(new Uint32Array([1]).buffer)[0]===1;
const pk32=(r,g,b,a)=>LE?((a<<24)|(b<<16)|(g<<8)|r)>>>0:((r<<24)|(g<<16)|(b<<8)|a)>>>0;
const A_MASK=LE?0x00FFFFFF:0xFFFFFF00;
const makers={brick(h,o){const s=E('svg',{'aria-hidden':'true'},h);const g=E('g',{},s);drawBrick(g,o.fg);fit(s,g,1)}};

/* ── 07 D extras: the coffee lab, paintings, terminal ── */
const COFFEES=`Cranberry iced coffee|Iced cacao salt latte|Dark chocolate cold brew|Orange espresso tonic|Rose cardamom latte|Coconut cold brew|Mango espresso|Pistachio iced latte|Salted caramel shakerato|Lavender honey latte|Hazelnut cold foam|Cinnamon horchata latte|Blueberry cold brew|Masala chai espresso|Jaggery iced latte|Filter kaapi on ice|Strawberry cream cold brew|Cherry cola cold brew|Black sesame latte|Ube iced latte|Maple pecan cold brew|Lemon espresso fizz|Passionfruit espresso tonic|Tiramisu iced latte|Mint mocha frappe|Vanilla bean shakerato|Banana bread latte|Brown butter iced latte|Pomegranate cold brew|Gulkand iced latte|Kokum espresso soda|Tender coconut cold brew|Smoked maple latte|Peanut butter mocha|Raspberry white mocha|Turmeric honey latte|Ginger espresso tonic|Saffron pista latte|Watermelon cold brew|Spiced plum latte|Toffee nut cold brew|Earl grey espresso|Sea salt mocha|Fig and honey latte|Cold brew affogato|Dulce de leche latte|Chilli chocolate cold brew|Apple pie cold brew|Biscoff iced latte|Nutella shakerato|Caramelised pineapple espresso|Cardamom rose cold foam|Malai cold brew|Hojicha espresso latte|Yuzu espresso tonic|Blackcurrant cold brew`.split('|');
const FLAV=[[/cranberr|pomegran|cherry|raspberr|blackcurrant|kokum/,['#9E2B3A','#C24A55'],'berry'],[/chocolate|cacao|mocha|nutella|tiramisu|chilli/,['#3B2116','#5A3324'],'drizzle'],[/orange|yuzu|lemon|passion|ginger|tonic|fizz|soda/,['#E9DDBF','#C8963E'],'citrus'],[/pistach|mint|hojicha/,['#8FB085','#B8CFA5'],'leaf'],[/rose|gulkand|strawberr|watermelon/,['#E3A88B','#D98A9A'],'petal'],[/lavender|ube|blueberr|plum|fig/,['#8C6E9E','#B49AC4'],'berry'],[/mango|turmeric|saffron|banana|pineapple|honey/,['#E2B04A','#F0CF7A'],'citrus'],[/coconut|malai|horchata|vanilla|cream|sesame/,['#EDE6D6','#D9CDB4'],'foam'],[/caramel|maple|toffee|dulce|butter|biscoff|jaggery|pecan|apple|peanut|hazelnut/,['#B07A3F','#D3A266'],'drizzle']];
function coffeeSVG(name,i){let c=['#7D5718','#C9A57A'],g='foam';for(const [re,cs,gg] of FLAV)if(re.test(name.toLowerCase())){c=cs;g=gg;break}
  const shape=i%6,top=[18,14,22,16,10,20][shape],bot=[110,112,108,110,112,108][shape],wt=[34,40,30,36,42,32][shape],wb=[30,32,26,34,30,22][shape];
  const L=x=>50-x,R=x=>50+x,fill=a=>top+(bot-top)*a,wAt=a=>wt+(wb-wt)*a;
  const glass=`M${L(wt)} ${top} L${L(wb)} ${bot} Q50 ${bot+6} ${R(wb)} ${bot} L${R(wt)} ${top}`;
  const band=(a,b,col)=>`<path d="M${L(wAt(a))} ${fill(a)} L${L(wAt(b))} ${fill(b)} L${R(wAt(b))} ${fill(b)} L${R(wAt(a))} ${fill(a)}Z" fill="${col}"/>`;
  const milk=g==='citrus'?'#F2EFE6':'#EFE6D8',coffee=['#3B2116','#5A3324','#7A4A2C'][i%3];
  let liq=g==='citrus'?band(.22,.6,c[0])+band(.6,1,coffee):band(.22,.45,milk)+band(.45,.75,c[1])+band(.75,1,i%2?coffee:c[0]);
  let ice='';for(let k=0;k<3;k++){const x=40+((k*13+i*7)%22),y=fill(.18)+k*9;ice+=`<rect x="${x}" y="${y}" width="13" height="12" rx="2" fill="#fff" fill-opacity=".55" stroke="#fff" stroke-opacity=".8" transform="rotate(${(k*23+i*11)%40-20} ${x+6} ${y+6})"/>`}
  let gar='';if(g==='berry')gar=`<circle cx="44" cy="${top-2}" r="5" fill="${c[0]}"/><circle cx="53" cy="${top-4}" r="5" fill="${c[1]}"/>`;
  else if(g==='citrus')gar=`<circle cx="${R(wt)-4}" cy="${top+2}" r="11" fill="#F0CF7A" stroke="#E2B04A" stroke-width="2"/><path d="M${R(wt)-4} ${top-9}V${top+13}M${R(wt)-15} ${top+2}H${R(wt)+7}" stroke="#E2B04A" stroke-width="1"/>`;
  else if(g==='leaf')gar=`<ellipse cx="50" cy="${top-3}" rx="9" ry="4" fill="#4F6B4A" transform="rotate(-25 50 ${top-3})"/>`;
  else if(g==='petal')gar=`<ellipse cx="46" cy="${top-2}" rx="5" ry="3" fill="#C9714F"/><ellipse cx="54" cy="${top-3}" rx="5" ry="3" fill="#E3A88B"/>`;
  else if(g==='drizzle')gar=`<path d="M${L(wt)+4} ${top+6} q8 10 16 0 t16 0 t16 0" fill="none" stroke="${c[0]}" stroke-width="3"/>`;
  else gar=`<ellipse cx="50" cy="${top+4}" rx="${wt-2}" ry="6" fill="#fff"/>`;
  const straw=i%4===3?'':`<path d="M${56+(i%3)*4} ${top-22} L${50+(i%3)*2} ${bot-12}" stroke="${['#C9714F','#8FB085','#141210'][i%3]}" stroke-width="4" stroke-linecap="round"/>`;
  return`<svg viewBox="0 0 100 124" aria-hidden="true"><ellipse cx="50" cy="${bot+5}" rx="${wb+6}" ry="4" fill="#141210" opacity=".12"/><clipPath id="cg${i}"><path d="${glass}Z"/></clipPath>${straw}<g clip-path="url(#cg${i})">${liq}${ice}</g>${gar}<path d="${glass}" fill="none" stroke="#141210" stroke-width="2"/><path d="M${L(wt)+5} ${top+8} L${L(wb)+5} ${bot-10}" stroke="#fff" stroke-width="2.5" opacity=".7"/></svg>`}
function paintingURL(seed){const W=48,H=36,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
  const sets=[['#E3A88B','#C9714F','#8E3A24','#3B3833','#F0CF7A'],['#B8CFA5','#8FB085','#4F6B4A','#141210','#F2F0EB'],['#B49AC4','#8C6E9E','#3B2116','#141210','#E3A88B'],['#F0CF7A','#E2B04A','#7D5718','#3B3833','#F2F0EB']][seed%4];
  for(let y=0;y<H;y++){x.fillStyle=sets[Math.min(2,Math.floor(y/H*3.2))];x.fillRect(0,y,W,1)}
  x.fillStyle=sets[4];x.beginPath();x.arc(W*(.3+seed*.13%.4),H*.32,5+seed%3,0,7);x.fill();
  for(let k=0;k<2;k++){x.fillStyle=sets[3-k];x.beginPath();x.moveTo(0,H);for(let i=0;i<=W;i++)x.lineTo(i,H*(.62+k*.12)+Math.sin(i*(.18+k*.07)+seed)*(4-k)+Math.sin(i*.5+seed*2));x.lineTo(W,H);x.fill()}
  return c.toDataURL()}

/* ── 07 D: the desk. Dithered against the brand palette; the decks run the room ── */
const PAL=[[20,18,16],[59,56,51],[109,107,104],[140,135,125],[207,203,194],[231,227,218],[242,240,235],[251,250,246],[142,58,36],[201,113,79],[227,168,139],[79,107,74],[143,176,133],[125,87,24],[176,138,90],[210,180,140],[240,207,122],[252,232,168],[70,120,190],[214,226,62],[150,160,40],[228,221,204],[212,202,180],[190,177,152],[164,150,124],[240,235,222],[200,189,166]];
// built when the browser is idle (or on the desk's first frame, whichever comes first), not during page load
let PLUT=null;const buildPLUT=()=>PLUT||(PLUT=(()=>{const L=new Uint8Array(32768*3);for(let i=0;i<32768;i++){const r=((i>>10)&31)*8+4,g=((i>>5)&31)*8+4,b=(i&31)*8+4;let a=0,da=1e9,c=0,dc=1e9;
  PAL.forEach((p,k)=>{const d=(p[0]-r)**2*.3+(p[1]-g)**2*.59+(p[2]-b)**2*.11;if(d<da){dc=da;c=a;da=d;a=k}else if(d<dc){dc=d;c=k}});
  L[i*3]=a;L[i*3+1]=c;L[i*3+2]=Math.round(255*Math.sqrt(da)/(Math.sqrt(da)+Math.sqrt(dc)+1e-6))}return L})());
addEventListener('load',()=>(window.requestIdleCallback||(f=>setTimeout(f,1200)))(buildPLUT,{timeout:4000}));
const PAL32=PAL.map(p=>pk32(p[0],p[1],p[2],255)),BAY255=BAYER.map(v=>v*255);
// dither one rectangle of src (absolute canvas coords, so the Bayer phase matches a full pass) into dst
function ditherPal(src,dst,x0,y0,rw,rh){if(rw<=0||rh<=0)return;const PLUT=buildPLUT();const im=src.getImageData(x0,y0,rw,rh),d=im.data,q=new Uint32Array(d.buffer,d.byteOffset,rw*rh);
  for(let y=0,i=0;y<rh;y++){const row=((y0+y)&3)*4;for(let x=0;x<rw;x++,i++){const o=i*4;if(d[o+3]<110){q[i]&=A_MASK;continue}
    const k3=(((d[o]>>3)<<10)|((d[o+1]>>3)<<5)|(d[o+2]>>3))*3;q[i]=PAL32[PLUT[k3+2]>BAY255[row+((x0+x)&3)]?PLUT[k3+1]:PLUT[k3]]}}
  dst.putImageData(im,x0,y0)}
function deskScene(box){
  const cv=$('canvas',box),vctx=cv.getContext('2d',{willReadFrequently:true}),sc=document.createElement('canvas'),ctx=sc.getContext('2d',{willReadFrequently:true}),hots=$('.hots',box),cam=$('.cam',box),np=document.getElementById('np');
  let w=0,h=0,u=1,ox=0,oy=0,t0=performance.now(),run=false,raf=0,hi=null,last=0;
  const S={hideBrick:false,hold:false,rk:0,smoke:[],lamp:false,screen:0,page:0,typing:0,hop:0,rustle:0,steam:1,dj:false,djT:0,stack:0,party:0};
  const C=k=>`rgb(${PAL[k]})`,rgb=(r,g,b)=>`rgb(${r},${g},${b})`;
  const pr=(x,y,z)=>{const p=P(x,y,z,u);return[p[0]+ox,p[1]+oy]};
  const path=a=>{ctx.beginPath();a.forEach((q,i)=>i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1]));ctx.closePath()};
  const poly=(a,c)=>{ctx.fillStyle=c;path(a);ctx.fill()};
  const lift=(c,l)=>{if(!l)return c;let m;if(c[0]==='#'){const n=parseInt(c.slice(1),16);m=[n>>16&255,n>>8&255,n&255]}else m=c.match(/\d+/g).map(Number);return rgb(...m.slice(0,3).map(v=>Math.min(255,v+l)))};
  const L=id=>id===hi?24:0;
  function box3(x,y,z,W,D,H,t,id){const l=L(id);
    poly([pr(x,y+D,z),pr(x+W,y+D,z),pr(x+W,y+D,z+H),pr(x,y+D,z+H)],lift(t[1],l));
    poly([pr(x+W,y,z),pr(x+W,y+D,z),pr(x+W,y+D,z+H),pr(x+W,y,z+H)],lift(t[2],l));
    poly([pr(x,y,z+H),pr(x+W,y,z+H),pr(x+W,y+D,z+H),pr(x,y+D,z+H)],lift(t[0],l))}
  const ell=(cx,cy,z,r)=>{const a=[];for(let i=0;i<28;i++){const t=i/28*Math.PI*2;a.push(pr(cx+Math.cos(t)*r,cy+Math.sin(t)*r,z))}return a};
  const vcirc=(cx,y,cz,r)=>{const a=[];for(let i=0;i<24;i++){const t=i/24*Math.PI*2;a.push(pr(cx+Math.cos(t)*r,y,cz+Math.sin(t)*r))}return a};
  function cyl(cx,cy,z,r,hh,c1,c2,top,id,r2){r2=r2??r;const l=L(id),N=24,A=[],B=[];
    for(let i=0;i<=N;i++){const t=-Math.PI/4+i/N*Math.PI;B.push(pr(cx+Math.cos(t)*r,cy+Math.sin(t)*r,z));A.push(pr(cx+Math.cos(t)*r2,cy+Math.sin(t)*r2,z+hh))}
    const g=ctx.createLinearGradient(B[N][0],0,B[0][0],0);g.addColorStop(0,lift(c1,l));g.addColorStop(1,lift(c2,l));ctx.fillStyle=g;path(A.concat(B.reverse()));ctx.fill();if(top)poly(ell(cx,cy,z+hh,r2),lift(top,l))}
  const faceY=(x0,y,z0,u0,v0,u1,v1,c)=>poly([pr(x0+u0,y,z0+v0),pr(x0+u1,y,z0+v0),pr(x0+u1,y,z0+v1),pr(x0+u0,y,z0+v1)],c);
  const faceX=(x,y0,z0,u0,v0,u1,v1,c)=>poly([pr(x,y0+u0,z0+v0),pr(x,y0+u1,z0+v0),pr(x,y0+u1,z0+v1),pr(x,y0+u0,z0+v1)],c);
  const topQ=(x0,y0,z,a,b,c2,d,col)=>poly([pr(x0+a,y0+b,z),pr(x0+c2,y0+b,z),pr(x0+c2,y0+d,z),pr(x0+a,y0+d,z)],col);
  const line=(a,b,wd,col)=>{ctx.strokeStyle=col;ctx.lineWidth=wd;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(...a);ctx.lineTo(...b);ctx.stroke()};
  const glow=(q,r,col,a)=>{const g=ctx.createRadialGradient(q[0],q[1],0,q[0],q[1],r);g.addColorStop(0,`rgba(${col},${a})`);g.addColorStop(1,`rgba(${col},0)`);ctx.fillStyle=g;ctx.beginPath();ctx.arc(q[0],q[1],r,0,7);ctx.fill()};
  const DZ=2.25,CODE=[6,9,4,11,7,3,10,8,5,12,6,9,2,7,10],BPM=112;
  const WOOD=[C(15),C(14),C(13)],INK3=[C(0),C(1),C(1)],GR3=[C(1),C(0),C(2)];
  function standing(which){if(S.party<=0)return;const e=p=>{p=Math.min(1,Math.max(0,p));const c=1.7;return 1+(c+1)*Math.pow(p-1,3)+c*Math.pow(p-1,2)};
    const LP=[[-1.0,-.7,0,'b','mushroom'],[13.0,1.3,.15,'f','flowerpot'],[-1.4,1.0,.3,'b','lava']];
    const dome=(cx,cy,z,R,c1,c2)=>{cyl(cx,cy,z,R,.22,c1,c2,null,null,R*.82);cyl(cx,cy,z+.22,R*.82,.24,c1,c2,null,null,R*.5);cyl(cx,cy,z+.46,R*.5,.16,c1,c2,c2,null,R*.18)};
    LP.forEach(([lx,ly,dl,side,kind])=>{if(side!==which)return;const g=e((S.party-dl)/(1-dl+.001));if(g<=0)return;const b=bt.beat,T=(performance.now()-t0)/1000;
      poly(ell(lx,ly,0,.7),'rgba(109,107,104,.3)');
      if(kind==='mushroom'){const H=4.6*g;cyl(lx,ly,0,.55,.12,C(13),C(14),C(15));line(pr(lx,ly,.12),pr(lx,ly,H),u*.09,C(13));
        glow(pr(lx,ly,H-.3),u*(2.4+b*.6),'252,232,168',.9);poly(ell(lx,ly,H,1.0),C(17));dome(lx,ly,H,1.0,C(8),C(9))}
      else if(kind==='flowerpot'){const H=4.2*g;cyl(lx,ly,0,.5,.1,C(1),C(0),C(1));line(pr(lx,ly,.1),pr(lx,ly,H-.6),u*.07,C(0));
        glow(pr(lx,ly,H-.2),u*(2.3+b*.6),'240,207,122',.9);cyl(lx,ly,H-.65,.22,.45,C(10),C(9),C(17),null,.62);dome(lx,ly,H-.05,.85,C(8),C(9))}
      else{const H=g;cyl(lx,ly,0,.6,.9*H,C(0),C(1),null,null,.28);
        const z1=.9*H,z2=z1+1.0*H,z3=z2+1.0*H;glow(pr(lx,ly,z2),u*(2+b*.5),'227,168,139',.8);
        cyl(lx,ly,z1,.28,z2-z1,C(9),C(16),null,null,.46);cyl(lx,ly,z2,.46,z3-z2,C(9),C(16),null,null,.24);
        for(let k=0;k<4;k++){const ph=(T*.12+k*.27)%1,zz=z1+.2+(z3-z1-.4)*(1-Math.abs(ph*2-1)),q=pr(lx+Math.sin(T*.7+k*2)*.08,ly+.3,zz);ctx.fillStyle=C(k%2?8:10);ctx.beginPath();ctx.ellipse(q[0],q[1],u*.15,u*.2,0,0,7);ctx.fill()}
        cyl(lx,ly,z3,.24,.4*H,C(0),C(1),C(1),null,.14)}})}
  // sundowner: a striped retro sun sinking behind the desk, long shadows, festoon lights, birds
  function sunset(now){if(S.party<=0)return;const p=Math.min(1,(now-S.djT)/120000),c=pr(6.2,-2.6,3.2);const R=u*3.4*S.party,cy=c[1]+p*u*3.2+(1-S.party)*u*3;
    ctx.save();ctx.beginPath();ctx.arc(c[0],cy,R,0,7);ctx.clip();const g=ctx.createLinearGradient(0,cy-R,0,cy+R);g.addColorStop(0,C(17));g.addColorStop(.5,C(16));g.addColorStop(1,C(9));ctx.fillStyle=g;ctx.fillRect(c[0]-R,cy-R,R*2,R*2);
    ctx.globalCompositeOperation='destination-out';for(let k=0;k<6;k++){const yy=cy+R*(.12+k*.15),hh=R*(.025+k*.018);ctx.fillRect(c[0]-R,yy,R*2,hh)}ctx.restore()}
  function longShadow(){if(S.party<=0)return;ctx.globalAlpha=.22*S.party;poly([pr(0,0,0),pr(10,0,0),pr(13,6.4,0),pr(3,6.4,0)],C(8));ctx.globalAlpha=1}
  const sectEl=box.closest('.desk')||box,hang=document.createElement('div');hang.className='hang';hang.setAttribute('aria-hidden','true');
  const ZS=7.2,STR=[[-.5,.7,10.5,.7],[-.5,3.9,10.5,3.9]],PD=[5.4,2.4];
  const anchors=()=>[[STR[0][0],STR[0][1]],[STR[0][2],STR[0][3]],[STR[1][0],STR[1][1]],[STR[1][2],STR[1][3]],PD];
  function buildHang(){if(!w)return;const sr=sectEl.getBoundingClientRect(),cr=cv.getBoundingClientRect(),k=cr.width/w,top=cr.top-sr.top;
    hang.innerHTML=anchors().map(([x,y])=>{const q=pr(x,y,ZS);return`<i class="cordD" style="left:${cr.left-sr.left+q[0]*k}px;height:${Math.max(0,top)}px"></i>`}).join('')}
  function hanging(t){if(S.party<=0)return;const drop=(1-Math.min(1,S.party*1.3))*4,b=bt.beat;
    ctx.globalAlpha=Math.min(1,S.party*2);
    // cords from each anchor straight up to the top of the drawing
    anchors().forEach(([x,y],i)=>{const zz=i<4?ZS+drop:ZS;const q=pr(x,y,zz);line([q[0],0],q,Math.max(1,u*.03),C(0))});
    // two festoon strands, running with the desk's long edge
    STR.forEach(([x0,y0,x1,y1],si)=>{const pts=[];for(let k=0;k<=24;k++){const f=k/24;pts.push([x0+(x1-x0)*f,y0+(y1-y0)*f,ZS+drop-Math.sin(f*Math.PI)*1.1])}
      ctx.strokeStyle=C(0);ctx.lineWidth=Math.max(1,u*.03);ctx.beginPath();pts.forEach((p,i)=>{const q=pr(...p);i?ctx.lineTo(...q):ctx.moveTo(...q)});ctx.stroke();
      pts.forEach((p,i)=>{if(i%2||i===0||i===24)return;const q=pr(p[0],p[1],p[2]-.18),tw=.6+.4*Math.sin(t*3+i*1.7+si);glow(q,u*.55,'252,232,168',.6*tw);line(pr(p[0],p[1],p[2]),pr(p[0],p[1],p[2]-.08),u*.06,C(0));ctx.fillStyle=i%3?C(17):C(10);ctx.beginPath();ctx.ellipse(q[0],q[1],u*.11,u*.14,0,0,7);ctx.fill()})});
    // the pendant: a dome shade on its cord, over the desk
    {const [x,y]=PD,zt=ZS,zs=5.75+drop*.6,sw=Math.sin(t*1.3)*.05;line(pr(x,y,zt),pr(x+sw,y+sw,zs+.62),Math.max(1,u*.035),C(0));
      glow(pr(x+sw,y+sw,zs-.4),u*(2.8+b*.6),'252,232,168',.85);poly(ell(x+sw,y+sw,zs,.95),C(17));
      cyl(x+sw,y+sw,zs,.95,.24,C(8),C(9),null,null,.78);cyl(x+sw,y+sw,zs+.24,.78,.26,C(8),C(9),null,null,.45);cyl(x+sw,y+sw,zs+.5,.45,.12,C(8),C(9),C(0),null,.14)}
    ctx.globalAlpha=1}
  const BIRDS=[0,1,2,3,4].map(k=>({o:k*.21,y:.12+(k%3)*.06,s:.6+(k%2)*.3}));
  function overlay(t){if(S.party<=0)return;
    // birds
    ctx.strokeStyle=C(1);ctx.lineWidth=Math.max(1,u*.035);BIRDS.forEach(bd=>{const f=((t*.03*bd.s)+bd.o)%1,x=f*w*1.2-w*.1,y=h*bd.y+Math.sin(f*12)*u*.3,fl=Math.sin(t*8*bd.s+bd.o*9)*u*.18,sz=u*.32;
      ctx.globalAlpha=S.party*Math.sin(f*Math.PI);ctx.beginPath();ctx.moveTo(x-sz,y-fl);ctx.quadraticCurveTo(x-sz*.4,y-sz*.3,x,y);ctx.quadraticCurveTo(x+sz*.4,y-sz*.3,x+sz,y-fl);ctx.stroke()});ctx.globalAlpha=1}
  const bt={beat:0};
  function frame(now){raf=0;if(!w)return;const t=(now-t0)/1000;ctx.clearRect(0,0,w,h);
    const beatT=S.dj?((now-S.djT)/1000)*BPM/60:0,beat=S.dj?Math.pow(1-(beatT%1),3):0;
    bt.beat=beat;{const dt=Math.min(.05,(now-(S.pT||now))/1000);S.pT=now;S.party=S.dj?Math.min(1,S.party+dt/1.6):Math.max(0,S.party-dt/1.0)}camera();const P=plan(t);
    if(P&&P.useBg){ctx.save();ctx.beginPath();P.rects.forEach(r=>ctx.rect(...r));ctx.clip();ctx.drawImage(bg,0,0)}else{
    // sahilshah.in: after Jaipur Rugs' "Far East" (CX-2495, ivory/ivory): faded cream ground a shade darker than the page,
    // an allover lattice of small taupe motifs, thin bordered bands of tiny repeats, lighter worn patches like an antique.
    {const X=-1.1,Y=-.7,W=12.4,D=6.3,Z=.002,R=(a,b2,c2,d,col)=>topQ(X,Y,Z,a,b2,c2,d,col),P2=(x,y)=>pr(X+x,Y+y,Z);
      const CR=C(21),BE=C(22),TP=C(23),DT=C(24),WS=C(25),MB=C(26);
      const dia=(cx,cy,rx,ry,col)=>poly([P2(cx,cy-ry),P2(cx+rx,cy),P2(cx,cy+ry),P2(cx-rx,cy)],col);
      const blob=(cx,cy,rx,ry,col)=>{const a2=[];for(let i=0;i<14;i++){const t=i/14*Math.PI*2;a2.push(P2(cx+Math.cos(t)*rx,cy+Math.sin(t)*ry))}poly(a2,col)};
      for(let i=0;i<=44;i++){const x=X+.12+i*(W-.24)/44;line(pr(x,Y+D,.002),pr(x,Y+D+.26,.002),u*.028,C(25));line(pr(x,Y,.002),pr(x,Y-.26,.002),u*.028,C(25))}
      // ground and bands: cream, a taupe line, a band of tiny diamonds, beige line, a band of dots, taupe line
      R(0,0,W,D,CR);R(.14,.14,W-.14,D-.14,TP);R(.18,.18,W-.18,D-.18,CR);
      const ringMotif=(inset,step,fn)=>{for(let x=inset+.1;x<W-inset-.05;x+=step){fn(x,inset);fn(x,D-inset)}for(let y=inset+.1;y<D-inset-.05;y+=step){fn(inset,y);fn(W-inset,y)}};
      ringMotif(.32,.24,(x,y)=>dia(x,y,.08,.08,MB));ringMotif(.32,.24,(x,y)=>dia(x,y,.03,.03,TP));
      R(.48,.48,W-.48,D-.48,BE);R(.52,.52,W-.52,D-.52,CR);
      ringMotif(.64,.16,(x,y)=>blob(x,y,.03,.03,TP));
      R(.76,.76,W-.76,D-.76,TP);R(.8,.8,W-.8,D-.8,CR);
      // a wider band: a running taupe vine of small leaves
      ringMotif(1.0,.36,(x,y)=>{dia(x,y,.13,.06,BE);dia(x,y,.05,.05,DT)});
      R(1.2,1.2,W-1.2,D-1.2,BE);R(1.24,1.24,W-1.24,D-1.24,CR);
      // field: an allover lattice of small motifs, offset rows
      for(let r2=0,y=1.5;y<D-1.35;y+=.32,r2++)for(let x=1.5+(r2%2)*.25;x<W-1.35;x+=.5){if(r2%2){dia(x,y,.09,.07,MB);dia(x,y,.03,.03,TP)}else{blob(x,y,.05,.04,TP)}}
      // worn, washed patches, as on an antique-finish rug
      [[2.6,2.2,1.1,.55],[5.4,4.3,1.6,.7],[8.9,1.9,1.3,.5],[10.4,4.6,.8,.45],[4.0,1.6,.7,.35],[7.6,3.6,.9,.4]].forEach(([cx,cy,rx,ry])=>{blob(cx,cy,rx,ry,'rgba(240,235,222,.55)');blob(cx+rx*.3,cy-ry*.2,rx*.55,ry*.5,'rgba(240,235,222,.5)')})}
    poly([pr(.2,.2,.007),pr(10.2,.2,.007),pr(10.2,4.6,.007),pr(.2,4.6,.007)],'rgba(20,18,16,.10)');
    // wastebasket of crumpled ideas, back right
    {const l=L('bin'),bx=10.75,by=-.35;cyl(bx,by,0,.36,.8,lift(C(2),l),lift(C(3),l),null,'bin',.42);poly(ell(bx,by,.8,.42),C(0));
      [[-.12,-.05,.82],[.1,.08,.86],[0,-.15,.9]].forEach(([dx,dy,z])=>{const q=pr(bx+dx,by+dy,z);ctx.fillStyle=C(7);ctx.beginPath();ctx.arc(q[0],q[1],u*.13,0,7);ctx.fill()});
      const q=pr(bx-.75,by+.6,.1);ctx.fillStyle=C(7);ctx.beginPath();ctx.arc(q[0],q[1],u*.12,0,7);ctx.fill()}
    // power strip and cables under the desk
    {box3(4.1,1.2,0,1.4,.32,.12,[C(7),C(4),C(5)]);for(let k=0;k<4;k++)topQ(4.1,1.2,.121,.15+k*.32,.1,.3+k*.32,.22,C(1));
      [[4.3,5.0],[4.65,5.2],[5.0,2.6],[5.3,8.1]].forEach(([fx,tx],i)=>{ctx.strokeStyle=C(0);ctx.lineWidth=u*.035;ctx.beginPath();for(let k=0;k<=12;k++){const f=k/12,q=pr(fx+(tx-fx)*f,1.3-f*.6,.12+Math.pow(f,1.6)*1.84);k?ctx.lineTo(...q):ctx.moveTo(...q)}ctx.stroke()})}
    longShadow();standing('b');
    // desk: oak top, hairpin legs
    [[.35,.35],[9.65,.35],[.35,4.05],[9.65,4.05]].forEach(([x,y])=>{line(pr(x,y,0),pr(x+.18,y+.12,2),u*.12,C(0));line(pr(x+.3,y,0),pr(x+.18,y+.12,2),u*.12,C(0))});
    // sahilshah.in: footrest bar and a hanging drawer unit
    line(pr(.39,4.08,.45),pr(9.69,4.08,.45),u*.1,C(0));
    {box3(.6,.55,1.25,3.0,3.55,.71,WOOD);const fy=4.101;
      [[.15,1.0],[1.55,2.85]].forEach(([a,b])=>{poly([pr(.6+a,fy,1.33),pr(.6+b,fy,1.33),pr(.6+b,fy,1.88),pr(.6+a,fy,1.88)],C(14));
        poly([pr(.6+(a+b)/2-.2,fy+.002,1.58),pr(.6+(a+b)/2+.2,fy+.002,1.58),pr(.6+(a+b)/2+.2,fy+.002,1.66),pr(.6+(a+b)/2-.2,fy+.002,1.66)],C(0))})}
    box3(0,0,1.96,10,4.4,.29,WOOD,'desk');
    for(let i=1;i<8;i++)line(pr(.2,i*.55,DZ+.001),pr(9.8,i*.55,DZ+.001),u*.02,'rgba(176,138,90,.6)');
    // sahilshah.in: felt desk mat
    topQ(3.55,1.85,DZ+.003,0,0,3.95,1.25,C(1));topQ(3.55,1.85,DZ+.004,.06,.06,3.89,.1,C(2));topQ(3.55,1.85,DZ+.004,.06,1.15,3.89,1.19,C(2));
    // lamp light on the desk
    if(S.lamp){const warm=S.dj?`240,207,122`:`252,232,168`;const c=pr(1.55,2.55,DZ);const g=ctx.createRadialGradient(c[0],c[1],0,c[0],c[1],u*(2.4+beat*.5));g.addColorStop(0,`rgba(${warm},.95)`);g.addColorStop(.6,`rgba(${warm},.45)`);g.addColorStop(1,`rgba(${warm},0)`);ctx.fillStyle=g;path(ell(1.55,2.55,DZ+.001,2.6));ctx.fill()}
    // books + succulent, pencil cup
    box3(.35,.35,DZ,1.7,1.0,.22,[C(0),C(1),C(2)]);box3(.42,.42,DZ+.22,1.55,.88,.18,[C(9),C(8),C(8)]);box3(.38,.38,DZ+.4,1.62,.95,.2,[C(12),C(11),C(11)]);
    cyl(1.15,.85,DZ+.6,.24,.3,C(9),C(10),C(8));[[0,.38],[.13,.32],[-.13,.3],[.07,.45],[-.06,.42]].forEach(([dx,hg],i)=>line(pr(1.15+dx,.85,DZ+.9),pr(1.15+dx*2.2,.85+dx,DZ+.9+hg+(S.dj?beat*.06:0)),u*.13,C(i%2?11:12)));
    // speakers
    const spk=(x)=>{const l=L('dj');box3(x,.5,DZ,.85,.8,1.45,[C(1),C(0),C(1)],'dj');const fy=1.301;const pz=DZ+.4,pr2=.3+beat*.04;poly(vcirc(x+.42,fy,pz,.33+beat*.03),lift(C(2),l));poly(vcirc(x+.42,fy+.001,pz,pr2*.75),C(0));poly(vcirc(x+.42,fy,DZ+1.1,.13),C(2));poly(vcirc(x+.42,fy+.001,DZ+1.1,.06),C(0));poly(vcirc(x+.72,fy+.002,DZ+1.32,.035),S.dj&&beat>.35?C(12):C(9))};
    spk(2.3);
    cyl(2.45,1.55,DZ,.24,.55,C(2),C(4),C(0));[[-.07,.32,0],[.06,.4,8],[0,.46,9]].forEach(([dx,hg,k])=>line(pr(2.45+dx,1.55,DZ+.55),pr(2.45+dx*2,1.55-dx,DZ+.55+hg),u*.06,C(k)));
    // monitor
    box3(4.6,.12,DZ,1.1,.72,.08,[C(1),C(0),C(1)]);box3(5.0,.26,DZ+.08,.3,.24,.82,[C(1),C(0),C(1)]);box3(4.85,.42,DZ+.9,.6,.09,.42,[C(1),C(0),C(1)]);
    {const x=3.3,y=.5,z=DZ+.75,W=4.25,D=.18,H=2.35,l=L('screen');box3(x,y,z,W,D,H,[C(1),C(0),C(1)]);const fy=y+D+.002,m=.12;const mode=S.dj?3:S.screen;
      if(mode===0){faceY(x,fy,z,m,m,W-m,H-m,lift(C(0),l));const off=(t*1.4+S.typing*3)%CODE.length;for(let r=0;r<9;r++){const len=CODE[Math.floor(r+off)%CODE.length]*.22;const zz=H-m-.2-r*.23;faceY(x,fy+.001,z,m+.2+(r%3==1?.28:0),zz-.08,Math.min(W-m-.1,m+.2+(r%3==1?.28:0)+len),zz,C(r%4==0?9:r%3==2?12:4))}if(Math.floor(t*2)%2)faceY(x,fy+.002,z,m+.22,m+.2,m+.34,m+.42,C(7))}
      else if(mode===1){faceY(x,fy,z,m,m,W-m,H-m,C(7));faceY(x,fy+.001,z,m,H-m-.28,W-m,H-m,C(5));faceY(x,fy+.001,z,m+.22,H-m-1,W*.6,H-m-.5,C(0));faceY(x,fy+.001,z,m+.22,H-m-1.3,m+1,H-m-1.12,C(8));[0,1,2].forEach(i=>faceY(x,fy+.001,z,m+.22+i*1.32,m+.2,m+1.3+i*1.32,m+.85,C(i==1?12:5)))}
      else if(mode===2){faceY(x,fy,z,m,m,W-m,H-m,C(0));for(let i=0;i<9;i++){const hg=(.35+.5*Math.abs(Math.sin(t*1.3+i*.8)))*1.55;faceY(x,fy+.001,z,m+.28+i*.42,m+.2,m+.56+i*.42,m+.2+hg,C(i==6?9:12))}}
      else{faceY(x,fy,z,m,m,W-m,H-m,C(0));for(let i=0;i<16;i++){const hg=.15+(.3+.7*Math.abs(Math.sin(beatT*Math.PI/2+i*.7)))*beat*1.6+.2*Math.abs(Math.sin(t*3+i));faceY(x,fy+.001,z,m+.15+i*.25,H/2-hg/2,m+.3+i*.25,H/2+hg/2,C(i%5==0?10:i%2?9:12))}}}
    spk(7.75);
    // sticky notes on the bezel
    faceY(3.3,.69,DZ+.75,3.7,1.5,4.1,1.9,C(10));faceY(3.3,.69,DZ+.75,.15,1.6,.5,1.95,C(12));
    // keyboard, mouse
    {const x=3.75,y=2.05,l=L('keyboard');box3(x,y,DZ,2.95,.9,.1,[C(5),C(4),C(4)]);for(let r=0;r<4;r++)for(let c=0;c<13;c++){const lit=(S.typing>0&&Math.sin(c*7.1+r*3.3+t*30)>.6)||(S.dj&&Math.sin(c*1.3+r+beatT*3)>.85);topQ(x,y,DZ+.101,.1+c*.218,.08+r*.2,.27+c*.218,.23+r*.2,lit?C(9):lift(C(7),l))}}
    box3(7.0,2.25,DZ,.3,.48,.1,[C(7),C(4),C(5)]);
    box3(3.85,2.98,DZ,2.8,.2,.07,[C(2),C(1),C(1)]);
    // notebook
    {const x=.55,y=2.0,l=L('notebook');box3(x,y,DZ,1.8,1.3,.06,[C(7),C(4),C(5)]);topQ(x,y,DZ+.061,.88,0,.92,1.3,C(3));
      for(let i=0;i<7;i++){const yy=.15+i*.15;if(S.page===0){topQ(x,y,DZ+.062,.1,yy,.8-(i%3)*.12,yy+.035,C(3));topQ(x,y,DZ+.062,1.0,yy,1.7-(i%2)*.2,yy+.035,C(3))}
        else if(S.page===1){topQ(x,y,DZ+.062,.1,yy-.03,.18,yy+.05,C(i<3?11:3));topQ(x,y,DZ+.062,.25,yy,.75,yy+.035,C(3));topQ(x,y,DZ+.062,1.0,yy,1.7,yy+.035,C(3))}
        else{for(let c=0;c<7;c++)topQ(x,y,DZ+.062,.1+c*.1,yy,.12+c*.1,yy+.02,C(4));topQ(x,y,DZ+.062,1.0+(i%2)*.1,yy,1.6,yy+.04,C(9))}}}
    // film camera
    {const l=L('camera'),cx=8.85,cy=.08;box3(cx,cy,DZ,.78,.42,.46,[lift(C(1),l),C(0),C(1)],'camera');box3(cx,cy,DZ+.46,.78,.42,.05,[C(4),C(3),C(3)]);
      faceY(cx,cy+.421,DZ,.06,.06,.72,.4,lift(C(3),l));poly(vcirc(cx+.4,cy+.43,DZ+.23,.17),C(0));poly(vcirc(cx+.4,cy+.44,DZ+.23,.11),C(2));poly(vcirc(cx+.4,cy+.45,DZ+.23,.05),C(18));
      box3(cx+.55,cy+.08,DZ+.51,.15,.12,.05,[C(8),C(8),C(9)])}
    // pen on the diary
    line(pr(1.15,2.35,DZ+.08),pr(2.05,2.75,DZ+.08),u*.07,C(8));line(pr(1.15,2.35,DZ+.08),pr(1.25,2.39,DZ+.08),u*.07,C(17));
    // DJ controller: two platters and a mixer
    {const x=6.55,y=3.0,W=3.2,D=1.25,l=L('dj');box3(x,y,DZ,W,D,.22,[C(1),C(0),C(2)],'dj');const zt=DZ+.221;
      [[x+.68],[x+W-.68]].forEach(([px],k)=>{const py=y+.62;poly(ell(px,py,zt,.52),lift(C(3),l));poly(ell(px,py,zt+.005,.44),C(4));poly(ell(px,py,zt+.01,.14),C(8));
        const ang=(S.dj?(now-S.djT)/1000*Math.PI*1.2*(k?1:-1):0)+k;line(pr(px,py,zt+.012),pr(px+Math.cos(ang)*.42,py+Math.sin(ang)*.42,zt+.012),u*.04,C(0))});
      const mx=x+W/2;topQ(mx-.42,y,zt+.004,0,.12,.84,1.13,C(0));
      [[-.2,0],[.2,0]].forEach(([dx],i)=>{topQ(mx+dx-.04,y,zt+.006,0,.3,.08,1.0,C(2));const fz=S.dj?.35+.3*Math.abs(Math.sin(beatT*Math.PI/4+i)):.6;topQ(mx+dx-.09,y,zt+.008,0,fz,.18,fz+.12,C(7))});
      for(let r=0;r<3;r++)for(let c=0;c<2;c++)poly(ell(mx-.3+c*.6,y+.25+r*.18,zt+.006,.06),C(S.dj&&((Math.floor(beatT)+r+c)%3==0)?10:4));
      for(let i=0;i<5;i++)topQ(mx-.3,y,zt+.007,i*.13,1.05,i*.13+.08,1.1,C(S.dj&&i<1+Math.round(beat*4)?12:2))}
    // phone, chai, the brick
    box3(.6,3.55,DZ,.45,.78,.05,[C(0),C(1),C(1)]);topQ(.6,3.55,DZ+.051,.05,.08,.4,.7,S.dj?C(9):C(2));
    poly(ell(9.2,2.15,DZ+.006,.46),C(14));poly(ell(9.2,2.15,DZ+.007,.4),C(15));
    {const l=L('mug'),gx=9.2,gy=2.15,R=.32,Hg=1.1;
      cyl(gx,gy,DZ,R*.9,.4,'#3B2116','#5A3324',null,'mug',R*.92);cyl(gx,gy,DZ+.4,R*.92,.42,'#9E2B3A','#C24A55',null,'mug',R*.94);cyl(gx,gy,DZ+.82,R*.94,.14,C(5),C(7),C(7),'mug',R*.95);
      [[-.1,.04,.88],[.08,-.05,.93],[0,.1,1.0]].forEach(([dx,dy,zz])=>box3(gx+dx-.08,gy+dy-.08,DZ+zz,.16,.16,.15,[C(7),C(5),C(4)]));
      [[-.04,-.02],[.06,.03]].forEach(([dx,dy])=>poly(ell(gx+dx,gy+dy,DZ+1.02,.07),'#9E2B3A'));
      ctx.globalAlpha=.28;cyl(gx,gy,DZ,R,Hg,lift(C(7),l),C(5),null,'mug',R*1.06);ctx.globalAlpha=1;
      ctx.strokeStyle=C(4);ctx.lineWidth=u*.03;path(ell(gx,gy,DZ+Hg,R*1.06));ctx.stroke();
      line(pr(gx+.05,gy,DZ+.5),pr(gx+.24,gy-.12,DZ+Hg+.55),u*.08,C(8));
      for(let k=0;k<5;k++){const q=pr(gx+Math.cos(k*1.3)*R*.98,gy+Math.sin(k*1.3)*R*.98,DZ+.3+k*.13);ctx.fillStyle=C(7);ctx.beginPath();ctx.arc(q[0],q[1],u*.03,0,7);ctx.fill()}}
    if(!S.hideBrick){const R=S.rk,bx=4.25,by=3.45;let z=0,jx=0,sq=1,flame=0;
      if(R>0){if(R<.18){jx=Math.sin(R*400)*.05;flame=R/.18*.5;sq=1-R/.18*.2}else if(R<.5){const p=(R-.18)/.32;z=p*p*18+Math.sin(p*Math.PI)*1.2;jx=Math.sin(p*Math.PI*3)*1.4*p;flame=1;sq=1+Math.sin(p*30)*.08}else if(R<.62){z=99}else if(R<.86){const p=(R-.62)/.24;z=(1-p*p)*16}else{const p=(R-.86)/.14;sq=1-Math.sin(p*Math.PI)*.35}
        if(R>.18&&R<.5&&Math.random()<.9)S.smoke.push({x:bx+.75+(Math.random()-.5)*.6,y:by+.36+(Math.random()-.5)*.3,z:DZ+z-.1,a:1,r:.15+Math.random()*.15})}
      S.smoke.forEach(p=>{p.a-=.03;p.r+=.025;p.z-=.02});S.smoke=S.smoke.filter(p=>p.a>0);
      S.smoke.forEach(p=>{const q=pr(p.x,p.y,p.z);ctx.fillStyle=`rgba(231,227,218,${p.a})`;ctx.beginPath();ctx.arc(q[0],q[1],u*p.r,0,7);ctx.fill()});
      if(R>.86){const p=(R-.86)/.14;ctx.strokeStyle=`rgba(176,138,90,${1-p})`;ctx.lineWidth=u*.06;path(ell(bx+.75,by+.36,DZ+.01,.8+p*1.4));ctx.stroke()}
      if(z<50){if(flame>0){for(let f=0;f<3;f++){const fl=(.35+Math.random()*.35)*flame;const c=pr(bx+.75+(f-1)*.4,by+.36,DZ+z);ctx.fillStyle=f==1?C(17):C(9);ctx.beginPath();ctx.moveTo(c[0]-u*.14,c[1]);ctx.lineTo(c[0]+u*.14,c[1]);ctx.lineTo(c[0],c[1]+u*(fl*2.2));ctx.closePath();ctx.fill()}}
        const hop=Math.max(0,Math.sin(Math.min(1,S.hop)*Math.PI))*.6+(S.dj?beat*.12:0);box3(bx+jx,by,DZ+z+hop,1.5,.72,.46*sq,[C(0),C(2),C(8)],'brick')}}
    // the ID badge on its lanyard
    {const l=L('badge'),bx=2.55,by=3.0,W=.82,D=1.3;
      box3(bx,by,DZ,W,D,.03,[lift('rgb(70,120,190)',l),'rgb(50,92,150)','rgb(60,104,166)'],'badge');
      topQ(bx,by,DZ+.031,.05,.05,W-.05,D-.05,C(0));topQ(bx,by,DZ+.032,.1,.14,W-.1,.86,lift(C(3),l));topQ(bx,by,DZ+.033,.28,.28,.54,.66,C(1));topQ(bx,by,DZ+.033,.2,.62,.62,.86,C(1));
      topQ(bx,by,DZ+.032,.1,.94,.56,1.04,C(7));topQ(bx,by,DZ+.032,.1,1.1,.4,1.15,C(3));topQ(bx,by,DZ+.032,W-.3,1.12,W-.1,1.2,C(7));topQ(bx,by,DZ+.031,.32,.03,.5,.07,C(5))}
    // lamp: base, two-part arm, shade, glow
    {const l=L('lamp'),bx=.75,by=1.75;cyl(bx,by,DZ,.42,.14,C(0),C(1),C(1),'lamp');
      const j0=pr(bx,by,DZ+.14),j1=pr(bx+.05,by,DZ+2.3),j2=pr(1.5,2.4,DZ+2.75);line(j0,j1,u*.1,lift(C(8),l));line(j1,j2,u*.1,lift(C(8),l));ctx.fillStyle=C(0);ctx.beginPath();ctx.arc(j1[0],j1[1],u*.1,0,7);ctx.fill();
      if(S.lamp)glow(pr(1.55,2.55,DZ+2.0),u*(1.5+beat*.4),S.dj?'240,207,122':'252,232,168',.95);
      poly(ell(1.55,2.55,DZ+2.05,.62),S.lamp?C(17):C(1));cyl(1.55,2.55,DZ+2.05,.62,.6,lift(C(8),l),lift(C(9),l),null,'lamp',.18);poly(ell(1.55,2.55,DZ+2.65,.18),C(0));
      if(S.lamp){ctx.globalAlpha=.18+beat*.12;poly([pr(1.0,2.0,DZ+2.05),pr(2.1,3.1,DZ+2.05),pr(3.6,3.9,DZ),pr(-.2,1.2,DZ)],C(16));ctx.globalAlpha=1}}
    // sahilshah.in: pickleball on the floor
    {const l=L('paddle'),px=-.7,T=(now-t0)/1000,lv=S.lev||0;
      // the act: rise on a flame (0-.38), wind back and smash (.38-.6), sink back down (.6-1)
      const ez=x=>x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2,lift2=lv<=0?0:lv<.25?ez(lv/.25)*2.0:lv<.72?2.0:2.0*(1-ez((lv-.72)/.28));
      // backswing (.25-.46, slow, all the way back), the shot (.46-.52, fast), follow-through (.52-.6), return (.6-.72)
      const ang=lv>0?(lv<.25?0:lv<.46?-1.55*ez((lv-.25)/.21):lv<.52?-1.55+2.65*Math.pow((lv-.46)/.06,.7):lv<.6?1.1+.25*Math.sin((lv-.52)/.08*Math.PI/2):lv<.72?1.35*(1-ez((lv-.6)/.12)):0)
        :Math.sin(T*1.6)*.05+(hi==='paddle'?Math.sin(T*18)*.12:0);
      const bob=lv>0&&lv<.72?Math.sin(T*4)*.05:0,P0=[4.0,0],Z0=lift2+bob;
      const rot=(y,z)=>{const dy=y-P0[0],dz=z-P0[1];return[P0[0]+dy*Math.cos(ang)-dz*Math.sin(ang),P0[1]+dy*Math.sin(ang)+dz*Math.cos(ang)]};
      const at=(dx,y,z)=>{const r=rot(y,z);return pr(px+dx,r[0],r[1]+Z0)};
      poly(ell(-.6,4.1,0,.75*(1-lift2*.25)),`rgba(109,107,104,${.22*(1-lift2*.3)})`);
      const rrect=(dx,hw,hh,k)=>{hw*=k;hh*=k;const rt=Math.min(hw,hh)*.42,rb=Math.min(hw,hh)*.26,cy0=4.0,cz0=1.25,a2=[];
        const arc=(cy,cz,r,t0,t1)=>{for(let i=0;i<=6;i++){const t=t0+(t1-t0)*i/6;a2.push(at(dx,cy+Math.cos(t)*r,cz+Math.sin(t)*r))}};
        arc(cy0+hw-rt,cz0+hh-rt,rt,0,Math.PI/2);arc(cy0-hw+rt,cz0+hh-rt,rt,Math.PI/2,Math.PI);arc(cy0-hw+rb,cz0-hh+rb,rb,Math.PI,Math.PI*1.5);arc(cy0+hw-rb,cz0-hh+rb,rb,Math.PI*1.5,Math.PI*2);return a2};
      const ring=(dx,ry,rz,k)=>{const a2=[];for(let i=0;i<=28;i++){const t=i/28*Math.PI*2;a2.push(at(dx,4.0+Math.cos(t)*ry*k,1.25+Math.sin(t)*rz*k))}return a2};
      // handle: grip wrap with stripes, butt cap
      line(at(0,4.0,.04),at(0,4.0,.6),u*.19,lift(C(0),l));for(let g=0;g<5;g++)line(at(.01,4.0,.08+g*.08),at(.01,4.0,.11+g*.08),u*.19,C(1));
      {const q=at(0,4.0,.03);ctx.fillStyle=C(8);ctx.beginPath();ctx.arc(q[0],q[1],u*.11,0,7);ctx.fill()}
      // face: thickness (back plate), edge guard, dark blue face, inner panel, honeycomb lines, logo stripe
      poly(rrect(-.07,.5,.72,1),C(0));poly(rrect(.0,.5,.72,1),lift(C(1),l));poly(rrect(.02,.47,.69,1),lift(C(0),l));
      poly(rrect(.03,.47,.69,.92),lift(C(9),l));poly(rrect(.035,.47,.69,.72),lift(C(10),l));
      for(let k=-3;k<=3;k++){line(at(.035,4.0+k*.12,.66),at(.035,4.0+k*.12,1.84),u*.012,'rgba(20,18,16,.35)')}
      for(let k=-5;k<=5;k++){line(at(.035,3.6,1.25+k*.12),at(.035,4.4,1.25+k*.12),u*.012,'rgba(20,18,16,.25)')}
      line(at(.04,3.6,1.05),at(.04,4.4,1.5),u*.06,lift(C(17),l));line(at(.04,3.6,1.17),at(.04,4.4,1.62),u*.025,C(7));
      poly(ring(.04,.12,.12,1).map((q,i)=>q),C(7));
      S.padTip=at(.05,4.0,1.9);
      [[-1.35,4.75,.2],[-.6,5.4,.2],[2.75,5.55,.2]].forEach(([bx,by,r])=>{poly(ell(bx+.08,by+.05,0,r*1.1),'rgba(109,107,104,.35)');const c=pr(bx,by,r);ctx.fillStyle=lift(C(19),l);ctx.beginPath();ctx.arc(c[0],c[1],u*r*1.15,0,7);ctx.fill();ctx.fillStyle=C(20);[[-.3,-.2],[.25,-.1],[0,.3],[-.1,0],[.3,.25]].forEach(([dx,dy])=>{ctx.beginPath();ctx.arc(c[0]+dx*u*r*2,c[1]+dy*u*r*2,u*.025,0,7);ctx.fill()})})}
    // record crate, front left on the rug
    {const l=L('crate'),x=1.0,y=4.95;box3(x,y,0,1.15,1.15,.8,[C(13),lift(C(14),l),lift(C(13),l)],'crate');
      for(let k=0;k<3;k++)faceY(x,y+1.151,0,.08,.12+k*.24,1.12,.2+k*.24,C(13));
      const cols=[C(8),C(0),C(12),C(10),C(18),C(16),C(1)];for(let k=0;k<7;k++)box3(x+.1+k*.14,y+.1,.55,.07,.95,.6+(k%3)*.08,[cols[k],cols[k],C(0)],'crate');}
    // sahilshah.in: a painting leaning against the desk, front right
    {const l=L('canvas'),x=10.15,y=4.85,W=1.5,H=1.15,z0=.05;line(pr(x+.2,y-.25,0),pr(x+.2,y,z0+H*.9),u*.06,C(13));line(pr(x+W-.2,y-.25,0),pr(x+W-.2,y,z0+H*.9),u*.06,C(13));
      faceY(x,y,z0,0,0,W,H,lift(C(14),l));const m=.08,bands=[C(17),C(16),C(10),C(9)];bands.forEach((c,i)=>faceY(x,y+.001,z0,m,m+(H-2*m)*(1-(i+1)/4),W-m,m+(H-2*m)*(1-i/4),lift(c,l)));
      poly(vcirc(x+W*.68,y+.002,z0+H*.66,.14),C(7));faceY(x,y+.002,z0,m,m,W-m,m+.22,lift(C(11),l));faceY(x,y+.002,z0,m+.3,m,W-m,m+.36,lift(C(12),l))}
    standing('f');}
    if(P&&!P.useBg){bgx.clearRect(0,0,w,h);bgx.drawImage(sc,0,0);bgOK=true}
    // floor plant
    {const l=L('plant'),px=11.4,py=2.4;cyl(px,py,0,.72,1.3,C(8),C(9),null,'plant',.84);poly(ell(px,py,1.3,.84),C(9));poly(ell(px,py,1.3,.74),C(1));
      const sway=Math.sin(t*1.1)*.05+S.rustle*Math.sin(t*14)*.18+(S.dj?beat*.14:0);
      [[-.9,.2,2.7,.6],[.85,-.2,3.0,.55],[-.3,-.9,3.45,.6],[.45,.85,3.2,.55],[-1.05,-.5,2.25,.5],[1.05,.6,2.35,.5],[0,.1,3.9,.55],[.6,-.85,2.55,.5],[-.6,.95,2.8,.5]].forEach(([dx,dy,dz,wd],i)=>{const b=pr(px+dx*.15,py+dy*.15,1.35),tp=pr(px+dx+sway*(i%2?1:-1),py+dy,dz+sway);line(b,pr(px+dx*.5,py+dy*.5,(1.35+dz)/2+.25),u*.05,C(11));
        const mx=(b[0]+tp[0])/2,my=(b[1]+tp[1])/2,ang=Math.atan2(tp[1]-b[1],tp[0]-b[0]),len=Math.hypot(tp[0]-b[0],tp[1]-b[1]);ctx.save();ctx.translate(mx+(tp[0]-mx)*.35,my+(tp[1]-my)*.35);ctx.rotate(ang);ctx.fillStyle=lift(C(i%3==0?12:11),l);ctx.beginPath();ctx.ellipse(0,0,len*.42,u*wd*.5,0,0,7);ctx.fill();ctx.restore()})}
    // notes floating up from the speakers
    if(S.dj)for(let i=0;i<6;i++){const ph=((now-S.djT)/1000*.4+i/6)%1,sx=i%2?8.17:2.72;const q=pr(sx+Math.sin(ph*5+i)*.3,.9,DZ+1.6+ph*2.6);ctx.globalAlpha=1-ph;ctx.fillStyle=C(i%3?9:12);ctx.beginPath();ctx.ellipse(q[0],q[1],u*.13,u*.1,-.4,0,7);ctx.fill();line([q[0]+u*.12,q[1]],[q[0]+u*.12,q[1]-u*.45],u*.04,C(i%3?9:12));ctx.globalAlpha=1}
    overlay(t);
    if(P){if(P.useBg)ctx.restore();P.rects.forEach(r=>ditherPal(ctx,vctx,...r))}else{bgOK=false;ditherPal(ctx,vctx,0,0,w,h)}
    if(S.rk>0&&!S.hold){const prev=S.rk;S.rk+=.011;if(prev<.18&&S.rk>=.18)toast('Wheee.');if(prev<.5&&S.rk>=.5){S.hold=true;smash(()=>{S.hold=false;S.rk=.62})}if(prev<.86&&S.rk>=.86)toast('Back on the desk. Like nothing happened.');if(S.rk>=1)S.rk=0}
    S.typing=Math.max(0,S.typing-.016);if(S.lev>0){const pv=S.lev;S.lev+=.014;if(pv<.5&&S.lev>=.5)launchBall();if(S.lev>=1)S.lev=0}S.hop=S.hop>0&&S.hop<1?S.hop+.04:0;S.rustle=Math.max(0,S.rustle-.012);S.steam=Math.max(1,S.steam-.02);
    if(run&&!reduce)raf=requestAnimationFrame(f30)}
  // the scene is drawn whole into an offscreen canvas; only what changed since the last frame is read back,
  // dithered and copied to the visible canvas. When the desk is at rest only the monitor's text (4x a second)
  // and the swaying plant move, so those are the only rectangles touched. Anything else changing = full frame.
  let prevSig='',prevScr='';
  const rectOf=(pts,m)=>{let a=1e9,b=-1e9,c=1e9,d=-1e9;for(const q of pts){const p=pr(q[0],q[1],q[2]);if(p[0]<a)a=p[0];if(p[0]>b)b=p[0];if(p[1]<c)c=p[1];if(p[1]>d)d=p[1]}
    const x0=Math.max(0,Math.floor(a-m)),y0=Math.max(0,Math.floor(c-m));return[x0,y0,Math.min(w,Math.ceil(b+m))-x0,Math.min(h,Math.ceil(d+m))-y0]};
  // returns null for a full frame, else {rects to re-dither, useBg}. useBg: everything under the plant comes from bg
  // (the static scene cached on the last frame that drew it), so only the plant is drawn
  const bg=document.createElement('canvas'),bgx=bg.getContext('2d');let bgOK=false;
  function plan(t){const quiet=!(S.lev>0)&&hi!=='paddle'&&!S.dj&&S.party<=0&&S.rk===0&&!S.smoke.length&&S.typing<=0&&S.hop<=0&&S.rustle<=0&&!reduce;
    const sig=quiet?[hi,S.lamp,S.screen,S.page,S.hideBrick,u,ox,oy,w,h].join('|'):'';
    if(!quiet||sig!==prevSig){prevSig=sig;prevScr='';return null}
    const rects=[];
    // monitor face: in mode 0 it only changes when a code row scrolls or the cursor blinks
    const m=S.screen,scr=m===0?Math.floor(t*1.4%CODE.length)+'/'+Math.floor(t*2)%2:m===1?'1':'';
    const scrNew=!scr||scr!==prevScr;
    if(scrNew){prevScr=scr;const x=3.3,y=.5+.18,z=DZ+.75,W=4.25,H=2.35;rects.push(rectOf([[x,y,z],[x+W,y,z],[x,y,z+H],[x+W,y,z+H]],2))}
    // the plant's leaves and stems
    const px=11.4,py=2.4,X=[px-1.4,px+1.4],Y=[py-1.3,py+1.3],Z=[1.25,4.5],c=[];X.forEach(x=>Y.forEach(y=>Z.forEach(z=>c.push([x,y,z]))));rects.push(rectOf(c,u*.6+2));
    return{rects:rects.filter(r=>r[2]>0&&r[3]>0),useBg:bgOK&&!scrNew}}
  const f30=now=>{const moving=S.party>0&&S.party<1;if(!moving&&now-last<(S.dj?41:33)){raf=requestAnimationFrame(f30);return}last=now;frame(now)};
  // the decks play the real set, on the monitor itself
  const VID='UDR8EI9j8PM';let ifr=null;const sect=box.closest('.desk')||box;
  function screenQuad(){const x=3.3,y=.5,z=DZ+.75,W=4.25,D=.18,H=2.35,m=.12,fy=y+D+.003,k=cv.getBoundingClientRect().width/w;
    const TL=pr(x+m,fy,z+H-m),TR=pr(x+W-m,fy,z+H-m),BL=pr(x+m,fy,z+m);return[TL,TR,BL].map(p=>[p[0]*k,p[1]*k])}
  const pixG=document.createElement('div');pixG.className='pixg';pixG.hidden=true;cam.appendChild(pixG);
  function placeVid(){if(!ifr){pixG.hidden=true;return}pixG.hidden=false;const [TL,TR,BL]=screenQuad(),EW=640,EH=360;pixG.style.transform=ifr.style.transform=`matrix(${(TR[0]-TL[0])/EW},${(TR[1]-TL[1])/EW},${(BL[0]-TL[0])/EH},${(BL[1]-TL[1])/EH},${TL[0]},${TL[1]})`}
  // YouTube's player API, so the set starts on the click itself; muted fallback if the browser blocks sound
  let ytReady=null,player=null;
  // blocked (ad blocker, offline) or too slow: give up after 10s, and let the next press try again
  const loadYT=()=>ytReady||(ytReady=new Promise((res,rej)=>{if(window.YT&&YT.Player)return res();const prev=window.onYouTubeIframeAPIReady;window.onYouTubeIframeAPIReady=()=>{prev&&prev();res()};const sc=document.createElement('script');sc.src='https://www.youtube.com/iframe_api';sc.onerror=()=>{sc.remove();rej()};setTimeout(()=>rej(),10000);document.head.appendChild(sc)}).catch(e=>{ytReady=null;throw e}));
  const unm=$('.npSound',np);let muted=false;
  const setMute=m=>{muted=m;if(player&&player.mute){m?player.mute():(player.unMute(),player.setVolume(80));if(!m)player.playVideo()}unm.textContent=m?'Unmute':'Mute';const mm=document.querySelector('.mini .mMute');if(mm)mm.textContent=unm.textContent;unm.setAttribute('aria-pressed',m);unm.classList.toggle('on',m)};
  unm.addEventListener('click',()=>setMute(!muted));
  // if the browser forced a muted start, the first click or key anywhere on the page turns the sound on
  const wake=e=>{if(e&&e.target&&e.target.closest&&e.target.closest('.npSound,.mMute'))return;if(S.dj&&muted&&!unm.dataset.user)setMute(false)};['pointerdown','keydown'].forEach(ev=>addEventListener(ev,wake,{passive:true}));
  ['pointerdown','keydown'].forEach(ev=>unm.addEventListener(ev,()=>unm.dataset.user=1));
  function dj(){S.dj=!S.dj;if(S.dj){S.djT=performance.now();S.lamp=true;np.classList.remove("off");sect.classList.add('party');document.body.classList.add('dj-on');unm.hidden=false;
      const host=document.createElement('div');cam.appendChild(host);
      loadYT().then(()=>{if(!S.dj){host.remove();return}
        player=new YT.Player(host,{width:640,height:360,videoId:VID,host:'https://www.youtube-nocookie.com',playerVars:{autoplay:1,playsinline:1,rel:0,modestbranding:1,controls:0,disablekb:1,iv_load_policy:3},
          events:{onReady:e=>{ifr=e.target.getIframe();ifr.className='vid';ifr.title='After Cape Town, Vol. II, a DJ set by Sahil Shah';placeVid();e.target.unMute();e.target.setVolume(80);e.target.playVideo();
            if(muted)e.target.mute();const stuck=()=>{const st=player&&player.getPlayerState();return st===-1||st===5};setTimeout(()=>{if(player&&S.dj&&stuck()){player.playVideo();setTimeout(()=>{if(player&&S.dj&&stuck()){setMute(true);player.playVideo()}},2500)}},2000)},onAutoplayBlocked:()=>{if(player&&S.dj){setMute(true);player.playVideo()}}}});
        ifr=player.getIframe&&player.getIframe();if(ifr){ifr.className='vid';placeVid()}}).catch(()=>{host.remove();if(S.dj){dj();kick()}toast("The set couldn't load. A blocker, maybe?")})}
    else{try{player&&player.destroy()}catch(e){}player=null;ifr&&ifr.remove();ifr=null;$$('.cam > div:not(.hots):not(.pixg)',box).forEach(x=>x.remove());pixG.hidden=true;np.classList.add("off");unm.hidden=true;sect.classList.remove('party');document.body.classList.remove('dj-on');const mi=document.querySelector('.mini');if(mi){mi.hidden=true;document.body.classList.remove('has-mini')}}}
  $('.npStop',np).addEventListener('click',()=>{if(S.dj){dj();kick()}});
  // drawers: click an object, the camera leans in, its drawer slides out
  const dr=document.createElement('div');dr.className='drawer';dr.hidden=true;dr.setAttribute('role','dialog');dr.setAttribute('aria-modal','true');dr.innerHTML='<div class="dh mono"><span class="dt"></span><button type="button" class="dx">Close ✕</button></div><div class="db"></div>';box.appendChild(dr);
  let opener=null;
  const closeD=()=>{const was=!dr.hidden;dr.hidden=true;cam.style.transform='';box.classList.remove('zoomed');if(was&&opener&&opener.isConnected)opener.focus({preventScroll:true});opener=null};
  dr.addEventListener('keydown',e=>{if(e.key!=='Tab')return;const f=$$('button,input,a[href],[tabindex]:not([tabindex="-1"])',dr).filter(x=>x.offsetParent!==null);if(!f.length)return;const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}});$('.dx',dr).addEventListener('click',closeD);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!dr.hidden)closeD()});
  function openD(title,at,html,after){if(dr.hidden)opener=document.activeElement;const want=document.body;if(dr.parentNode!==want)want.appendChild(dr);$('.dt',dr).textContent=title;dr.setAttribute('aria-label',title);$('.db',dr).innerHTML=html;dr.hidden=false;dr.scrollTop=0;
    const q=pr(...at);box.classList.add('zoomed');void q;after&&after($('.db',dr));$('.dx',dr).focus({preventScroll:true})}
  const RECIPES=[
   ['Cranberry iced coffee','The one that started the experiments.',['2 tbsp cranberry syrup (or 40 ml unsweetened juice + 1 tsp sugar)','A tall glass of ice','120 ml cold milk','Double shot of espresso','A few frozen cranberries'],['Syrup at the bottom, then ice.','Pour the milk slowly so it sits on the syrup.','Float the espresso on top.','Drop in the cranberries. Stir only when you drink.']],
   ['Iced cacao salt latte','Chocolate, but grown up.',['1 tbsp raw cacao powder','1 tsp maple syrup','2 tbsp hot water','150 ml oat milk','Double shot of espresso','A pinch of flaky sea salt'],['Whisk cacao, maple and hot water into a paste.','Ice, then the paste, then the oat milk.','Espresso on top.','Finish with the salt. Do not skip the salt.']],
   ['Orange espresso tonic','Fizzy, bitter, bright.',['150 ml tonic water, cold','30 ml fresh orange juice','Ice and an orange slice','Double shot of espresso'],['Ice and the orange slice into the glass.','Add the juice, then the tonic.','Pour the espresso very slowly over a spoon so it layers.']],
   ['Pistachio iced latte','Tastes like a kulfi went to a café.',['1 tbsp pistachio paste','1 tsp honey','150 ml milk','Double shot of espresso','Crushed pistachios'],['Blend the paste and honey with a splash of milk.','Ice, the pistachio milk, the rest of the milk.','Espresso on top, crushed pistachios over it.']],
   ['Jaggery iced latte','Monsoon in a glass.',['20 ml jaggery syrup (jaggery and water, 1:1, simmered)','A pinch of ground cardamom','150 ml milk','Double shot of espresso'],['Stir the cardamom into the syrup.','Syrup, ice, milk.','Espresso on top.']],
   ['Filter kaapi on ice','The South Indian classic, cold.',['60 ml strong filter decoction','120 ml whole milk','2 tsp sugar','Ice'],['Mix the decoction, milk and sugar.','Pour between two tumblers until it froths.','Pour over ice and drink immediately.']],
   ['Tender coconut cold brew','Beach-adjacent.',['100 ml cold brew concentrate','100 ml tender coconut water','A splash of coconut milk','Ice'],['Ice, then the coconut water.','Cold brew on top.','Finish with the coconut milk.']],
   ['Rose cardamom latte','Like a wedding, in a good way.',['15 ml rose syrup','2 crushed cardamom pods','150 ml milk','Double shot of espresso','Dried rose petals'],['Steep the cardamom in the milk for 10 minutes, then chill.','Syrup, ice, cardamom milk.','Espresso on top, petals to finish.']],
   ['Salted caramel shakerato','Shaken, never stirred.',['Double shot of espresso, hot','15 ml caramel sauce','A pinch of salt','A handful of ice'],['Everything into a shaker.','Shake hard for 15 seconds.','Strain into a chilled coupe. Admire the foam.']],
   ['Alphonso mango espresso','Only in season. Strictly.',['60 ml Alphonso mango pulp','60 ml cold milk','Ice','Double shot of espresso'],['Mango pulp at the bottom.','Ice and milk.','Float the espresso on top.']],
   ['Lemon espresso fizz','Sounds wrong, tastes right.',['120 ml soda water','15 ml lemon juice','10 ml honey syrup','Ice','Double shot of espresso','Lemon peel'],['Lemon, honey and soda over ice.','Espresso slowly on top.','Twist the peel over the glass.']],
   ['Chilli chocolate cold brew','The late-night one.',['120 ml cold brew','20 ml dark chocolate sauce','A pinch of chilli flakes','Ice','A splash of cream'],['Stir the chilli into the chocolate.','Chocolate, ice, cold brew.','Cream on top.']]];
  const coffee=()=>openD('The coffee lab · 12 iced recipes',[9.2,2.15,DZ+.6],`<p class="dlead">I'm always experimenting with iced coffee. Pick a glass for the recipe. <span class="mono" style="color:var(--clay)">Placeholder recipes · swap in yours</span></p><ul class="cups c12">${RECIPES.map((r,i)=>`<li style="--d:${i*45}ms"><button type="button" data-i="${i}">${coffeeSVG(r[0],i)}<span>${pad(i+1,2)} · ${r[0]}</span></button></li>`).join('')}</ul><article class="recipe" hidden></article>`,el=>{
    const list=$('.cups',el),card=$('.recipe',el);
    list.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const r=RECIPES[+b.dataset.i];
      card.innerHTML=`<button type="button" class="back mono">← All 12</button><div class="rTop">${coffeeSVG(r[0],+b.dataset.i)}<div><p class="mono" style="color:var(--clay)">Recipe ${pad(+b.dataset.i+1,2)}</p><h3>${r[0]}</h3><p class="mute">${r[1]}</p></div></div><h4 class="mono">You'll need</h4><ul>${r[2].map(x=>`<li>${x}</li>`).join('')}</ul><h4 class="mono">Method</h4><ol>${r[3].map(x=>`<li>${x}</li>`).join('')}</ol>`;
      list.hidden=true;card.hidden=false;$('.dlead',el).hidden=true;card.scrollIntoView({block:'nearest'});$('.back',card).addEventListener('click',()=>{card.hidden=true;list.hidden=false;$('.dlead',el).hidden=false})})});
  const paint=()=>openD('Paintings, in pixels',[1.45,2.65,DZ],`<p class="dlead">A few things I've painted, redrawn in pixels. <span class="mono" style="color:var(--clay)">Placeholders · the real paintings go here</span></p><div class="paints">${[0,1,2,3].map(i=>`<figure style="--r:${[-3,2,-1.5,3][i]}deg;--d:${i*120}ms"><img src="${paintingURL(i)}" alt="Placeholder pixel painting ${i+1}"><figcaption class="mono">No. ${pad(i+1,2)} · acrylic on paper</figcaption></figure>`).join('')}</div>`);
  const TERM={help:()=>'commands: whoami · now · coffee · lamps · play · paint · badge · launch · hire · clear · exit',
    whoami:()=>'Sahil. SDE 1 at Amazon by day; DJ, painter, pickleball player and iced-coffee experimenter by night. Lamps over overhead lights, always.',
    now:()=>'listening: After Cape Town, Vol. II (mine) · drinking: iced cacao salt latte · building: sahilshah.in',
    coffee:()=>{const r=RECIPES[Math.floor(Math.random()*RECIPES.length)];return`today: ${r[0].toLowerCase()}. ${r[1]} (click the iced coffee for the recipe)`},
    lamps:()=>{S.lamp=!S.lamp;kick();return S.lamp?'lamps on. better.':'lamps off. moody.'},
    play:()=>{if(!S.dj)dj();kick();return'playing After Cape Town, Vol. II on the monitor.'},
    paint:()=>{setTimeout(paint,250);return'opening the sketchbook…'},
    hire:()=>{setTimeout(()=>{closeD();document.getElementById('contact').scrollIntoView({behavior:'smooth'})},400);return'good choice. taking you to the form…'},
    'sudo make coffee':()=>'permission denied. make it yourself. (try "coffee")',
    badge:()=>{setTimeout(badge,250);return'day job, coming up…'},launch:()=>{launch();kick();return'brick away. watch the desk.'},ls:()=>'mixes/  paintings/  coffee-lab/  side-projects/  four-lamps.txt',
    'cat four-lamps.txt':()=>'four lamps, one room, zero overhead lights. photos coming soon.'};
  const term=()=>openD('~/sahil · terminal',[5.4,.6,4.3],`<div class="term2"><div class="tout" aria-live="polite"><p>Sahil's desk. Type <b>help</b>.</p></div><form class="tin"><label class="sr" for="tcmd">Command</label><span>sahil@desk ~ %</span><input id="tcmd" autocomplete="off" autocapitalize="off" spellcheck="false"></form></div>`,el=>{
    const out=$('.tout',el),f=$('.tin',el),inp=$('input',el);setTimeout(()=>inp.focus({preventScroll:true}),60);
    inp.addEventListener('keydown',()=>{S.typing=1;kick()});
    f.addEventListener('submit',e=>{e.preventDefault();const c=inp.value.trim().toLowerCase();inp.value='';if(!c)return;
      const p=document.createElement('p');p.innerHTML=`<span class="pr2">%</span> ${c.replace(/[<>&]/g,'')}`;out.appendChild(p);
      if(c==='clear'){out.innerHTML='';return}if(c==='exit'){closeD();return}
      const r=document.createElement('p');r.className='res';r.textContent=Object.prototype.hasOwnProperty.call(TERM,c)?TERM[c]():`command not found: ${c}. try "help".`;out.appendChild(r);out.scrollTop=out.scrollHeight})});
  const badge=()=>openD('Day job',[2.9,3.95,DZ],`<div class="badgeWrap"><div class="hb2" role="img" aria-label="Sahil's Amazon badge: a black-and-white photo on black, first name Sahil above his email handle, in a blue frame"><div class="hbIn"><span class="slot"></span><div class="hbPhoto"><svg viewBox="0 0 200 240" aria-hidden="true"><defs><radialGradient id="hbL" cx="45%" cy="30%" r="60%"><stop offset="0" stop-color="#8a8a8a"/><stop offset="1" stop-color="#2a2a2a"/></radialGradient></defs><ellipse cx="100" cy="98" rx="46" ry="56" fill="url(#hbL)"/><path d="M18 240 C 22 168, 178 168, 182 240Z" fill="#3a3a3a"/><path d="M70 150 Q100 175 130 150 L132 176 Q100 196 68 176Z" fill="#5c5c5c"/></svg><span class="hbPh mono">Your badge headshot</span></div><div class="hbText"><p class="hbName">Sahil</p><p class="hbAlias">your-alias@</p></div><div class="hbFoot"><span class="hbChip" aria-hidden="true"></span><span class="hbCo">amazon<svg viewBox="0 0 60 12" aria-hidden="true"><path d="M3 3 Q30 13 55 3" fill="none" stroke="#FF9900" stroke-width="2.6" stroke-linecap="round"/><path d="M50 1 L56 3 L52 8" fill="none" stroke="#FF9900" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/></svg></span></div></div></div><p class="dlead" style="margin-top:22px;text-align:center">My day job: Software Development Engineer at Amazon. Everything else on this site happens after hours.</p><p class="mono" style="text-align:center;color:var(--stone)">Blue frame · under 5 years · no badge number or barcode, on purpose</p></div>`);
  const tst=document.createElement('div');tst.className='toast mono';tst.hidden=true;box.appendChild(tst);let tt=0;
  const toast=m=>{tst.textContent=m;tst.hidden=false;clearTimeout(tt);tt=setTimeout(()=>tst.hidden=true,2200)};
  const brickRect=()=>{const r=cv.getBoundingClientRect(),k=r.width/w;let a=1e9,b=-1e9,c=1e9,d=-1e9;[[4.25,3.45,DZ],[5.75,3.45,DZ],[5.75,4.17,DZ],[4.25,4.17,DZ],[4.25,3.45,DZ+.46],[5.75,3.45,DZ+.46],[5.75,4.17,DZ+.46],[4.25,4.17,DZ+.46]].forEach(q=>{const p=pr(...q);a=Math.min(a,p[0]);b=Math.max(b,p[0]);c=Math.min(c,p[1]);d=Math.max(d,p[1])});return{x:r.left+a*k,y:r.top+c*k,w:(b-a)*k,h:(d-c)*k}};
  let flying=false;const launch=()=>{if(flying)return;flying=true;closeD&&closeD();smash(()=>{flying=false})};
  // the brick comes back from behind the page, zooms at you, and cracks the screen
  function crackSVG(cx,cy,W,H){const rnd=(a,b)=>a+Math.random()*(b-a),N=16,R=Math.hypot(W,H);let lines='',rings='';const rays=[];
    for(let i=0;i<N;i++){let a=i/N*Math.PI*2+rnd(-.15,.15),x=cx,y=cy,pts=[[x,y]];const len=rnd(.35,1)*R;let d=0;while(d<len){const st=rnd(30,90);a+=rnd(-.25,.25);x+=Math.cos(a)*st;y+=Math.sin(a)*st;d+=st;pts.push([x,y])}rays.push(pts);
      const dd='M'+pts.map(p=>p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' L');lines+=`<path d="${dd}" class="ck"/><path d="${dd}" class="cg" transform="translate(1.2 1.2)"/>`}
    [70,160,290].forEach((rr,k)=>{let d='';rays.forEach((pts,i)=>{const p=pts[Math.min(pts.length-1,1+k*2)],q=rays[(i+1)%N][Math.min(rays[(i+1)%N].length-1,1+k*2)];if(Math.random()<.75)d+=`M${p[0].toFixed(1)} ${p[1].toFixed(1)} L${((p[0]+q[0])/2+rnd(-12,12)).toFixed(1)} ${((p[1]+q[1])/2+rnd(-12,12)).toFixed(1)} L${q[0].toFixed(1)} ${q[1].toFixed(1)} `});rings+=`<path d="${d}" class="ck thin"/>`});
    let shards='';for(let i=0;i<7;i++){const a=rnd(0,7),r=rnd(10,40);shards+=`<polygon points="${cx+Math.cos(a)*r},${cy+Math.sin(a)*r} ${cx+Math.cos(a+.6)*(r+30)},${cy+Math.sin(a+.6)*(r+30)} ${cx+Math.cos(a+.3)*(r+55)},${cy+Math.sin(a+.3)*(r+55)}" class="sh"/>`}
    return`<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><circle cx="${cx}" cy="${cy}" r="26" class="hole"/>${shards}${lines}${rings}</svg>`}
  const glassA=new Audio('/desk/glass.m4a');glassA.preload='auto';glassA.volume=.85;
  function crackSound(){try{glassA.currentTime=0;glassA.play().catch(()=>{})}catch(e){}}
  function rocketSound(dur){try{const a=new (window.AudioContext||window.webkitAudioContext)(),t0=a.currentTime,len=dur+.3,b=a.createBuffer(1,Math.ceil(a.sampleRate*len),a.sampleRate),d=b.getChannelData(0);let l=0;for(let i=0;i<d.length;i++){l=l*.97+(Math.random()*2-1)*.03;d[i]=l*6}
    const s=a.createBufferSource(),lp=a.createBiquadFilter(),g=a.createGain(),lfo=a.createOscillator(),lg=a.createGain();s.buffer=b;lp.type='lowpass';lp.frequency.value=900;lfo.frequency.value=17;lg.gain.value=.25;lfo.connect(lg);lg.connect(g.gain);
    g.gain.setValueAtTime(0,t0);g.gain.linearRampToValueAtTime(.5,t0+.15);g.gain.setValueAtTime(.5,t0+dur-.2);g.gain.linearRampToValueAtTime(0,t0+dur);s.connect(lp);lp.connect(g);g.connect(a.destination);s.start(t0);lfo.start(t0);setTimeout(()=>a.close(),(len+.5)*1000)}catch(e){}}
  function smash(done){if(reduce||!window.gsap){toast('Nice try.');S.hop=.01;done();return}
    const W=innerWidth,H=innerHeight,b0=brickRect(),ov=document.createElement('div');ov.className='smash';ov.setAttribute('aria-hidden','true');
    ov.innerHTML=`<div class="trail"></div><div class="flyB" style="width:${b0.w}px"><span class="exh"><i></i><i></i></span></div><div class="crack"></div><div class="flash"></div>`;document.body.appendChild(ov);
    const fb=$('.flyB',ov),trail=$('.trail',ov);makers.brick(fb,{fg:'ink'});S.hideBrick=true;kick();
    const cx=b0.x+b0.w/2,cy=b0.y+b0.h/2;gsap.set(fb,{left:b0.x,top:b0.y,transformOrigin:'50% 50%'});
    const big=Math.min(W,H)*.9/b0.w,mx=W/2-cx,my=H/2-cy;let last=0;
    const puff=()=>{const now=performance.now();if(now-last<28)return;last=now;const r=fb.getBoundingClientRect(),d=document.createElement('i');d.style.left=(r.left+r.width/2)+'px';d.style.top=(r.top+r.height*.8)+'px';trail.appendChild(d);gsap.to(d,{scale:2.6,opacity:0,y:18,duration:.9,ease:'power1.out',onComplete:()=>d.remove()})};
    const clampX=v=>Math.max(-cx+b0.w,Math.min(W-cx-b0.w,v)),clampY=v=>Math.max(-cy+b0.h,Math.min(H-cy-b0.h,v));
    toast('3… 2… 1…');
    const tl=gsap.timeline({onComplete:()=>{gsap.set(document.querySelector('main'),{clearProps:'transform'});S.hideBrick=false;S.hop=.01;kick();ov.remove();toast('Back on the desk. Like nothing happened.');done()}});
    const R=(a,b)=>a+Math.random()*(b-a),ex=$('.exh',fb);gsap.set(ex,{opacity:0});
    tl.to(fb,{keyframes:[{rotation:-6,duration:.07},{rotation:6,duration:.07},{rotation:-8,duration:.07},{rotation:7,duration:.07},{rotation:0,y:6,scaleY:.85,duration:.15}]})
      .to(ex,{opacity:1,duration:.1})
      .add(()=>{toast('Uh oh.');rocketSound(3.4)})
      // ignition: a lurch straight up
      .to(fb,{y:clampY(-H*.3),rotation:R(-25,25),scaleY:1.15,duration:.28,ease:'power3.in',onUpdate:puff});
    // then it loses it: big, smooth, looping swoops across the screen, spinning as it goes
    {const o={p:0},A=Math.min(W*.36,cx-b0.w,W-cx-b0.w,W*.4),B=Math.min(H*.3,cy-b0.h*1.5),y0=clampY(-H*.3);let lastAng=0;
      tl.to(o,{p:1,duration:2.6,ease:'sine.inOut',onUpdate:()=>{const th=o.p*Math.PI*2.5,amp=Math.sin(o.p*Math.PI);
        const x=clampX(A*Math.sin(th)*amp+A*.15*Math.sin(th*3)),y=clampY(y0+(B*Math.sin(th*2)*.8)*amp+o.p*H*.05);
        const dx=Math.cos(th),dy=Math.cos(th*2)*1.6;lastAng=Math.atan2(dy,dx)*180/Math.PI;gsap.set(fb,{x,y,rotation:lastAng+o.p*540,scale:1.15+amp*.5});puff()}});
      tl.add(()=>toast('It’s not stopping.'),'-=1.6')}
      // straight at you
    tl.to(fb,{x:mx,y:my,scale:big,rotation:'+=372',duration:.55,ease:'power3.in',onUpdate:puff}).to(ex,{opacity:0,duration:.1},'<+.45')
      .add(()=>{$('.crack',ov).innerHTML=crackSVG(W/2,H/2,W,H);crackSound();toast('Oops.')})
      .fromTo($('.flash',ov),{opacity:.85},{opacity:0,duration:.35,immediateRender:false})
      .to(document.querySelector('main'),{keyframes:[{x:-14,y:6,duration:.04},{x:12,y:-5,duration:.04},{x:-8,y:3,duration:.04},{x:5,y:-2,duration:.04},{x:0,y:0,duration:.05}],onComplete:()=>gsap.set(document.querySelector('main'),{clearProps:'transform'})},'<')
      .to(fb,{scale:big*.93,duration:.12,ease:'power2.out'},'<')
      // sheepishly back to its spot on the desk
      .to(fb,{keyframes:[{x:mx*.4+W*.06,y:clampY(-H*.2),scale:1.6,rotation:'+=30',duration:.7,ease:'power2.out'},{x:0,y:-b0.h*1.6,scale:1,rotation:'+=0',duration:.6,ease:'sine.inOut',onComplete:()=>gsap.set(fb,{rotation:0})},{y:0,duration:.25,ease:'power2.in'},{y:-8,scaleY:.85,duration:.08},{y:0,scaleY:1,duration:.18,ease:'bounce.out'}],onUpdate:puff},'+=.35')
      .to($('.crack',ov),{opacity:0,duration:.9},'<+.6')}
  let whacking=false;
  function pock(){try{const a=new (window.AudioContext||window.webkitAudioContext)(),t=a.currentTime,sr=a.sampleRate;
      // the click: a 25 ms noise burst, band-passed where hard plastic rings
      const n=a.createBuffer(1,Math.ceil(sr*.025),sr),d=n.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,3);
      const src=a.createBufferSource(),bp=a.createBiquadFilter(),g1=a.createGain();src.buffer=n;bp.type='bandpass';bp.frequency.value=1800;bp.Q.value=1.4;g1.gain.value=1.4;src.connect(bp);bp.connect(g1);g1.connect(a.destination);
      // the hollow body: two quick, slightly detuned tones that die in ~60 ms
      [[1150,.35],[1720,.18]].forEach(([f,v])=>{const o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.setValueAtTime(f,t);o.frequency.exponentialRampToValueAtTime(f*.92,t+.06);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+.065);o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+.08)});
      src.start(t);setTimeout(()=>a.close(),300)}catch(e){}}
  function whack(){if(whacking)return;whacking=true;closeD();S.lev=.001;const pb=SPOTS.find(x=>x.id==='paddle');if(pb&&pb.btn){pb.btn.classList.add('flying');setTimeout(()=>pb.btn.classList.remove('flying'),3200)}run=true;kick();toast('Hold on…');if(reduce||!window.gsap){setTimeout(()=>{toast('Whack.');whacking=false},900)}}
  function launchBall(){if(reduce||!window.gsap){return}pock();const r=cv.getBoundingClientRect(),k=r.width/w,q=S.padTip||pr(-.7,4.0,1.9),sx=r.left+q[0]*k,sy=r.top+q[1]*k,W=innerWidth,H=innerHeight,d0=Math.max(18,u*k*.45);
      const ov=document.createElement('div');ov.className='smash';ov.setAttribute('aria-hidden','true');ov.innerHTML=`<div class="trail"></div><div class="pball fire" style="width:${d0}px;height:${d0}px"></div><div class="crack"></div><div class="flash"></div>`;document.body.appendChild(ov);
      const b=$('.pball',ov),tr=$('.trail',ov);gsap.set(b,{left:sx-d0/2,top:sy-d0/2});const big=Math.min(W,H)*.42/d0;let lastT=0;
      // fire trail: embers spawned where the ball is, fading behind it
      const ember=()=>{const n=performance.now();if(n-lastT<16)return;lastT=n;const r2=b.getBoundingClientRect(),e=document.createElement('i');e.className='ember';const sz=r2.width*(.5+Math.random()*.35);e.style.cssText=`left:${r2.left+r2.width/2}px;top:${r2.top+r2.height/2}px;width:${sz}px;height:${sz}px`;tr.appendChild(e);gsap.to(e,{scale:.15,opacity:0,x:(Math.random()-.5)*r2.width*.4,y:(Math.random()-.5)*r2.width*.4,duration:.45,ease:'power1.out',onComplete:()=>e.remove()})};
      toast('Whack.');
      gsap.timeline({onComplete:()=>{ov.remove();whacking=false}})
        .to(b,{x:W/2-sx,y:H/2-sy,scale:big,rotation:900,duration:.55,ease:'power2.in',onUpdate:ember})
        .add(()=>{$('.crack',ov).innerHTML=crackSVG(W/2,H/2,W,H);crackSound();toast('Sorry about your screen.');b.classList.remove('fire')})
        .fromTo($('.flash',ov),{opacity:.85},{opacity:0,duration:.3,immediateRender:false})
        .to(document.querySelector('main'),{keyframes:[{x:-14,y:6,duration:.04},{x:12,y:-5,duration:.04},{x:-6,y:2,duration:.04},{x:0,y:0,duration:.05}],onComplete:()=>gsap.set(document.querySelector('main'),{clearProps:'transform'})},'<')
        .to(b,{scale:big*.96,duration:.1},'<')
        .to(b,{y:H*1.2-sy,x:W/2-sx+W*.08,scale:big*.6,rotation:1080,duration:.9,ease:'power2.in'},'+=.35')
        .to($('.crack',ov),{opacity:0,duration:.8},'<+.5')}
  const notes=()=>openD('The diary · notes',[1.45,2.65,DZ],`<div class="notesPg"><p class="mono nDate">Placeholder notes · swap in yours</p><ul>${['mix vol. iii. more vocals, fewer drops.','iced coffee to try: jaggery and cardamom. again.','pickleball this weekend. bring two balls, one always gets lost.','ship the side project before starting a new one.','book idea: things i learnt shipping at 2 am.','never press the brick.'].map((t,i)=>`<li style="--d:${i*90}ms">${t}</li>`).join('')}</ul><p class="nSig">— s.</p></div>`);
  const SPOTS=[
   {id:'dj',at:[8.15,3.62,DZ+.22],lab:'The decks · play my set on the monitor',act:dj},
   {id:'screen',at:[5.4,.6,4.5],lab:'The screen · opens a terminal',act:()=>{if(!S.dj){S.typing=1.5;term()}}},
   {id:'badge',at:[2.95,3.65,DZ+.05],lab:'My Amazon badge · the day job',act:badge},
   {id:'notebook',at:[1.45,2.65,DZ+.06],lab:'The diary · notes to self',act:()=>{S.page=(S.page+1)%3;notes()}},
   {id:'lamp',at:[1.55,2.55,DZ+2.65],lab:'The lamp · click to switch it',act:()=>{S.lamp=!S.lamp}},
   {id:'mug',at:[9.2,2.15,DZ+1.15],lab:'Iced coffee · 12 recipes',act:coffee},
   {id:'paddle',at:[-.7,4.0,1.25],lab:'The paddle · go on, hit it',act:whack},
   {id:'camera',at:[9.25,.3,DZ+.5],lab:'The camera · my photos',act:()=>{const ph=document.getElementById('photos');ph&&ph.scrollIntoView({behavior:'smooth'})}},
   {id:'crate',at:[1.55,5.5,1.25],lab:'The crate · press play on the set',act:()=>{if(!S.dj)dj()}},
   {id:'bin',at:[10.75,-.35,.9],lab:'The bin · failed experiments',act:()=>toast('experiment-omega is in here somewhere. 2000 lines.')},
   {id:'canvas',at:[10.9,4.85,.7],lab:'A painting · more in the diary',act:()=>{S.page=(S.page+1)%3;paint()}},
   {id:'phone',at:[.82,3.94,DZ+.06],lab:'My phone · instagram',act:()=>window.open('https://www.instagram.com/sahil1229.__/','_blank','noopener')},
   {id:'brick',at:[5,3.8,DZ+.46],lab:'Brix · my tech agency. Still a secret, so it’s nowhere else on this site',act:launch}];
  function place(){hots.innerHTML='';SPOTS.forEach(o=>{const q=pr(...o.at);const b=document.createElement('button');o.btn=b;b.type='button';b.className='hot';b.style.left=(q[0]/w*100)+'%';b.style.top=(q[1]/h*100)+'%';b.innerHTML=`<span>${o.lab}</span>`;b.setAttribute('aria-label',o.lab);
    const on=()=>{hi=o.id;kick()},off=()=>{if(hi===o.id)hi=null;kick()};
    b.addEventListener('pointerenter',on);b.addEventListener('pointerleave',off);b.addEventListener('focus',on);b.addEventListener('blur',off);b.addEventListener('click',()=>{o.act();kick()});hots.appendChild(b)})}
  cv.addEventListener('click',e=>{if(cv.dataset.dragged){delete cv.dataset.dragged;return}const r=cv.getBoundingClientRect(),mx=(e.clientX-r.left)/r.width*w,my=(e.clientY-r.top)/r.height*h;let best=null,bd=1e9;SPOTS.forEach(o=>{const q=pr(...o.at),d=Math.hypot(q[0]-mx,q[1]-my);if(d<bd){bd=d;best=o}});if(best&&bd<u*2.4){best.act();kick()}});
  const BT=[[-1.8,-.7,0],[12.3,-.7,0],[12.3,6.2,0],[-1.8,6.2,0],[3.3,.5,5.45],[.75,1.75,5.0],[11.4,2.4,4.1]];
  const BW=[[-1.9,-1.2,0],[13.7,-1.2,0],[13.7,6.3,0],[-1.9,6.3,0],[-1.0,-.7,5.5],[13,1.3,4.9],[-1,3.9,3.6]];
  const bounds=B=>{let a=1e9,b=-1e9,c=1e9,d=-1e9;B.forEach(q=>{const p=P(q[0],q[1],q[2],1);a=Math.min(a,p[0]);b=Math.max(b,p[0]);c=Math.min(c,p[1]);d=Math.max(d,p[1])});return{a,b,c,d}};
  const FT=bounds(BT),FW=bounds(BW);let phone=false,pan=0,panT=0,camKey='';
  const fit=(F,m)=>Math.min(w*m/(F.b-F.a),h*m/(F.d-F.c));
  function camera(){const p=S.party,uT=phone?fit(FT,.98):fit(FW,.95),uW=uT;u=uT;
    pan+=(panT-pan)*.18;const cxT=(FT.a+FT.b)/2,cyT=(FT.c+FT.d)/2,cxW=(FW.a+FW.b)/2,cyW=(FW.c+FW.d)/2;
    const cx=phone?cxT:cxW,cy=phone?cyT:cyW,pm=panMax();pan=Math.max(-pm,Math.min(pm,pan));panT=Math.max(-pm,Math.min(pm,panT));ox=w/2-cx*u;oy=h/2-cy*u;
    const key=u.toFixed(3)+'|'+ox.toFixed(1)+'|'+oy.toFixed(1);if(key!==camKey){camKey=key;repos();placeVid()}}
  box.__fit=()=>{const pts=BT.map(q=>pr(...q));return{w,h,minX:Math.min(...pts.map(p=>p[0])),maxX:Math.max(...pts.map(p=>p[0])),minY:Math.min(...pts.map(p=>p[1])),maxY:Math.max(...pts.map(p=>p[1])),party:S.party}};
  const panMax=()=>Math.max(0,((S.party>.5?FW.b-FW.a:FT.b-FT.a)*u-w)/2+w*.04);
  const panTo=at=>{const q=P(...at,1),cx=(FT.a+FT.b)/2;panT=Math.max(-panMax(),Math.min(panMax(),-(q[0]-cx)*u))};
  function repos(){SPOTS.forEach(o=>{if(!o.btn)return;const q=pr(...o.at);o.btn.style.left=(q[0]/w*100)+'%';o.btn.style.top=(q[1]/h*100)+'%'})}
  // phones: drag sideways to look around the desk
  let drag=null;cv.addEventListener('pointerdown',e=>{if(phone)drag={x:e.clientX,p:panT,moved:false}});
  cv.addEventListener('pointermove',e=>{if(!drag)return;const k=cv.getBoundingClientRect().width/w,dx=(e.clientX-drag.x)/k;if(Math.abs(dx)>6)drag.moved=true;panT=Math.max(-panMax(),Math.min(panMax(),drag.p+dx))});
  addEventListener('pointerup',()=>{if(drag&&drag.moved)cv.dataset.dragged=1;drag=null});
  function size(){phone=box.getBoundingClientRect().width<760;if(phone){const bw=box.getBoundingClientRect().width;box.style.height=Math.round(bw*(FT.d-FT.c)/(FT.b-FT.a)*1.04)+'px'}else box.style.height='';const r=box.getBoundingClientRect();if(!r.width)return;const sk=r.width+'x'+r.height;if(w&&sk===size.k)return;size.k=sk;const k=phone?1.15:1.5;w=Math.round(r.width/k);h=Math.round(r.height/k);cv.width=sc.width=bg.width=w;cv.height=sc.height=bg.height=h;prevSig='';bgOK=false;
    camKey='';camera();place();repos();placeVid();kick()}
  function kick(){if(!raf)raf=requestAnimationFrame(frame)}
  addEventListener('resize',()=>{clearTimeout(size.t);size.t=setTimeout(size,150)});
  const dock=$('#deskDock');if(dock){const ORD=['dj','crate','screen','badge','notebook','canvas','lamp','mug','camera','phone','paddle','bin','brick'];dock.innerHTML=SPOTS.map((o,i)=>[o,i]).sort((x,y)=>ORD.indexOf(x[0].id)-ORD.indexOf(y[0].id)).map(([o,i])=>`<button type="button" data-i="${i}"><span class="di" aria-hidden="true">${({dj:'◉◉',screen:'▭',badge:'▯',notebook:'✎',lamp:'◠',mug:'◫',camera:'◘',paddle:'●',phone:'▮',crate:'▤',bin:'◌',canvas:'▨',brick:'▰'})[o.id]||''}</span>${({dj:'Decks',screen:'Screen',badge:'Badge',notebook:'Diary',lamp:'Lamp',mug:'Coffee',camera:'Camera',paddle:'Pickleball',phone:'Instagram',crate:'Records',bin:'Bin',canvas:'Painting',brick:'Brick'})[o.id]||o.id}</button>`).join('');
    dock.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const o=SPOTS[+b.dataset.i];$$('button',dock).forEach(x=>x.classList.toggle('on',x===b));panTo(o.at);setTimeout(()=>{o.act();kick()},420)})}
  let autoStarted=false;
  seen(box,()=>{if(!w)size();run=true;kick();void autoStarted},()=>{run=false},'-25% 0px -25% 0px');
  // a mini player follows you down the page while the set plays
  const mini=document.createElement('div');mini.className='mini mono';mini.hidden=true;mini.innerHTML='<span class="npDot"></span><span>After Cape Town, Vol. II</span><button type="button" class="mMute">Mute</button><button type="button" class="mStop">Stop</button>';document.body.appendChild(mini);
  $('.mMute',mini).addEventListener('click',()=>{unm.dataset.user=1;setMute(!muted)});$('.mStop',mini).addEventListener('click',()=>{if(S.dj){dj();kick()}});
  new IntersectionObserver(es=>es.forEach(e=>{mini.hidden=e.isIntersecting||!S.dj;document.body.classList.toggle('has-mini',!mini.hidden)}),{threshold:.15}).observe(box);
  
  return{size}}

window.mountDesk=function(fig){if(fig.__desk)return fig.__desk;const d=deskScene(fig);fig.__desk=d;seen(fig,()=>d.size());return d};
})();
