import{s as Z,b as Y,f as be,u as x,g as ee,d as te,C as Pe,D as me,E as Ne,F as ue,n as N,a as ce,o as We,e as Ce}from"../chunks/scheduler.BWDpjmD3.js";import{S as O,i as J,e as v,t as z,s as w,c as b,a as H,b as R,d as a,f as y,u as _,g as m,h as A,j as re,n as $,o as g,H as ze,r as Re,B as _e,y as he,k as B,l as P,m as L,p as M,q as X,v as ae,w as Le}from"../chunks/index.Cp4SeObe.js";import{s as q,e as fe}from"../chunks/icon.CBRZcYTv.js";import{P as Ue,g as Ge,a as De}from"../chunks/post_layout.BnlSLxll.js";import"../chunks/posts.BrsPxbte.js";function Ee(u){let e,i;return{c(){e=v("div"),i=z(u[2]),this.h()},l(n){e=b(n,"DIV",{class:!0});var t=H(e);i=R(t,u[2]),t.forEach(a),this.h()},h(){_(e,"class","opacity-50")},m(n,t){m(n,e,t),A(e,i)},p(n,t){t&4&&re(i,n[2])},d(n){n&&a(e)}}}function ke(u){let e,i,n=(u[3]??q.author.bio)+"";return{c(){e=v("div"),i=new ze(!1),this.h()},l(t){e=b(t,"DIV",{});var l=H(e);i=Re(l,!1),l.forEach(a),this.h()},h(){i.a=null},m(t,l){m(t,e,l),i.m(n,e)},p(t,l){l&8&&n!==(n=(t[3]??q.author.bio)+"")&&i.p(n)},d(t){t&&a(e)}}}function Ze(u){let e,i,n=(u[1]??q.author.name)+"",t,l,s,o,r,c,p,d,E,I,U=(u[1]??q.author.name)+"",S,K,V,j,T=u[2]&&Ee(u),k=(u[3]||q.author.bio)&&ke(u);const Q=u[5].default,F=Y(Q,u,u[4],null);return{c(){e=v("div"),i=v("div"),t=z(n),l=w(),s=v("div"),o=v("div"),r=v("img"),d=w(),T&&T.c(),E=w(),I=v("div"),S=z(U),K=w(),k&&k.c(),V=w(),F&&F.c(),this.h()},l(C){e=b(C,"DIV",{class:!0});var D=H(e);i=b(D,"DIV",{class:!0});var G=H(i);t=R(G,n),G.forEach(a),l=y(D),s=b(D,"DIV",{class:!0});var se=H(s);o=b(se,"DIV",{class:!0});var le=H(o);r=b(le,"IMG",{class:!0,src:!0,alt:!0,loading:!0,decoding:!0}),le.forEach(a),se.forEach(a),d=y(D),T&&T.l(D),E=y(D),I=b(D,"DIV",{class:!0});var W=H(I);S=R(W,U),W.forEach(a),K=y(D),k&&k.l(D),V=y(D),F&&F.l(D),D.forEach(a),this.h()},h(){_(i,"class","absolute -top-4 opacity-10 text-[12rem] text-neutral leading-tight rotate-[30deg]"),_(r,"class","hover:rotate-[360deg] transition-transform duration-1000 ease-in-out m-0"),be(r.src,c=u[0]??q.author.avatar)||_(r,"src",c),_(r,"alt",p=u[1]??q.author.name),_(r,"loading","lazy"),_(r,"decoding","async"),_(o,"class","rounded-full border-2 border-white shadow-xl w-16 h-16"),_(s,"class","avatar mb-4"),_(I,"class","text-2xl mb-2"),_(e,"class","relative w-auto min-h-48 rounded-box overflow-hidden bg-gradient-to-b from-primary to-secondary text-primary-content transition-shadow duration-200 shadow-xl hover:shadow-2xl p-4 md:p-8 my-4")},m(C,D){m(C,e,D),A(e,i),A(i,t),A(e,l),A(e,s),A(s,o),A(o,r),A(e,d),T&&T.m(e,null),A(e,E),A(e,I),A(I,S),A(e,K),k&&k.m(e,null),A(e,V),F&&F.m(e,null),j=!0},p(C,[D]){(!j||D&2)&&n!==(n=(C[1]??q.author.name)+"")&&re(t,n),(!j||D&1&&!be(r.src,c=C[0]??q.author.avatar))&&_(r,"src",c),(!j||D&2&&p!==(p=C[1]??q.author.name))&&_(r,"alt",p),C[2]?T?T.p(C,D):(T=Ee(C),T.c(),T.m(e,E)):T&&(T.d(1),T=null),(!j||D&2)&&U!==(U=(C[1]??q.author.name)+"")&&re(S,U),C[3]||q.author.bio?k?k.p(C,D):(k=ke(C),k.c(),k.m(e,V)):k&&(k.d(1),k=null),F&&F.p&&(!j||D&16)&&x(F,Q,C,C[4],j?te(Q,C[4],D,null):ee(C[4]),null)},i(C){j||($(F,C),j=!0)},o(C){g(F,C),j=!1},d(C){C&&a(e),T&&T.d(),k&&k.d(),F&&F.d(C)}}}function Oe(u,e,i){let{$$slots:n={},$$scope:t}=e,{avatar:l}=e,{name:s}=e,{subname:o}=e,{bio:r}=e;return u.$$set=c=>{"avatar"in c&&i(0,l=c.avatar),"name"in c&&i(1,s=c.name),"subname"in c&&i(2,o=c.subname),"bio"in c&&i(3,r=c.bio),"$$scope"in c&&i(4,t=c.$$scope)},[l,s,o,r,t,n]}class Je extends O{constructor(e){super(),J(this,e,Oe,Ze,Z,{avatar:0,name:1,subname:2,bio:3})}}function Ke(u){let e,i;const n=u[3].default,t=Y(n,u,u[2],null);return{c(){e=v("ul"),t&&t.c(),this.h()},l(l){e=b(l,"UL",{class:!0,style:!0});var s=H(e);t&&t.l(s),s.forEach(a),this.h()},h(){_(e,"class","timeline svelte-3j1e6h"),_(e,"style",u[0])},m(l,s){m(l,e,s),t&&t.m(e,null),i=!0},p(l,[s]){t&&t.p&&(!i||s&4)&&x(t,n,l,l[2],i?te(n,l[2],s,null):ee(l[2]),null),(!i||s&1)&&_(e,"style",l[0])},i(l){i||($(t,l),i=!0)},o(l){g(t,l),i=!1},d(l){l&&a(e),t&&t.d(l)}}}function Qe(u,e,i){let{$$slots:n={},$$scope:t}=e,{position:l="right"}=e,{style:s=null}=e;return Pe("TimelineConfig",{rootPosition:l}),u.$$set=o=>{"position"in o&&i(1,l=o.position),"style"in o&&i(0,s=o.style),"$$scope"in o&&i(2,t=o.$$scope)},[s,l,t,n]}class we extends O{constructor(e){super(),J(this,e,Qe,Ke,Z,{position:1,style:0})}}const Xe=u=>({}),ye=u=>({});function Ye(u){let e;const i=u[5]["opposite-content"],n=Y(i,u,u[4],ye);return{c(){n&&n.c()},l(t){n&&n.l(t)},m(t,l){n&&n.m(t,l),e=!0},p(t,l){n&&n.p&&(!e||l&16)&&x(n,i,t,t[4],e?te(i,t[4],l,Xe):ee(t[4]),ye)},i(t){e||($(n,t),e=!0)},o(t){g(n,t),e=!1},d(t){n&&n.d(t)}}}function xe(u){let e;return{c(){e=v("div"),this.h()},l(i){e=b(i,"DIV",{class:!0}),H(e).forEach(a),this.h()},h(){_(e,"class","opposite-block svelte-1eitw8k")},m(i,n){m(i,e,n)},p:N,i:N,o:N,d(i){i&&a(e)}}}function et(u){let e,i,n,t,l;const s=[xe,Ye],o=[];function r(d,E){return d[2]["opposite-content"]?1:0}i=r(u),n=o[i]=s[i](u);const c=u[5].default,p=Y(c,u,u[4],null);return{c(){e=v("li"),n.c(),t=w(),p&&p.c(),this.h()},l(d){e=b(d,"LI",{class:!0,style:!0});var E=H(e);n.l(E),t=y(E),p&&p.l(E),E.forEach(a),this.h()},h(){_(e,"class",me(`timeline-item ${u[1]}`)+" svelte-1eitw8k"),_(e,"style",u[0])},m(d,E){m(d,e,E),o[i].m(e,null),A(e,t),p&&p.m(e,null),l=!0},p(d,[E]){let I=i;i=r(d),i===I?o[i].p(d,E):(_e(),g(o[I],1,1,()=>{o[I]=null}),he(),n=o[i],n?n.p(d,E):(n=o[i]=s[i](d),n.c()),$(n,1),n.m(e,t)),p&&p.p&&(!l||E&16)&&x(p,c,d,d[4],l?te(c,d[4],E,null):ee(d[4]),null),(!l||E&1)&&_(e,"style",d[0])},i(d){l||($(n),$(p,d),l=!0)},o(d){g(n),g(p,d),l=!1},d(d){d&&a(e),o[i].d(),p&&p.d(d)}}}function tt(u,e,i){let{$$slots:n={},$$scope:t}=e;const l=Ne(n);let{position:s=null}=e,{style:o=null}=e;const r=ue("TimelineConfig"),c=s||r.rootPosition;return Pe("ParentPosition",c),u.$$set=p=>{"position"in p&&i(3,s=p.position),"style"in p&&i(0,o=p.style),"$$scope"in p&&i(4,t=p.$$scope)},[o,c,l,s,t,n]}class Me extends O{constructor(e){super(),J(this,e,tt,et,Z,{position:3,style:0})}}function lt(u){let e,i;const n=u[2].default,t=Y(n,u,u[1],null);return{c(){e=v("div"),t&&t.c(),this.h()},l(l){e=b(l,"DIV",{class:!0,style:!0});var s=H(e);t&&t.l(s),s.forEach(a),this.h()},h(){_(e,"class","timeline-separator svelte-1lqxdk9"),_(e,"style",u[0])},m(l,s){m(l,e,s),t&&t.m(e,null),i=!0},p(l,[s]){t&&t.p&&(!i||s&2)&&x(t,n,l,l[1],i?te(n,l[1],s,null):ee(l[1]),null),(!i||s&1)&&_(e,"style",l[0])},i(l){i||($(t,l),i=!0)},o(l){g(t,l),i=!1},d(l){l&&a(e),t&&t.d(l)}}}function nt(u,e,i){let{$$slots:n={},$$scope:t}=e,{style:l=null}=e;return u.$$set=s=>{"style"in s&&i(0,l=s.style),"$$scope"in s&&i(1,t=s.$$scope)},[l,t,n]}class Ie extends O{constructor(e){super(),J(this,e,nt,lt,Z,{style:0})}}function st(u){let e,i;const n=u[2].default,t=Y(n,u,u[1],null);return{c(){e=v("span"),t&&t.c(),this.h()},l(l){e=b(l,"SPAN",{class:!0,style:!0});var s=H(e);t&&t.l(s),s.forEach(a),this.h()},h(){_(e,"class","timeline-dot svelte-226qa6"),_(e,"style",u[0])},m(l,s){m(l,e,s),t&&t.m(e,null),i=!0},p(l,[s]){t&&t.p&&(!i||s&2)&&x(t,n,l,l[1],i?te(n,l[1],s,null):ee(l[1]),null),(!i||s&1)&&_(e,"style",l[0])},i(l){i||($(t,l),i=!0)},o(l){g(t,l),i=!1},d(l){l&&a(e),t&&t.d(l)}}}function it(u,e,i){let{$$slots:n={},$$scope:t}=e,{style:l=null}=e;return u.$$set=s=>{"style"in s&&i(0,l=s.style),"$$scope"in s&&i(1,t=s.$$scope)},[l,t,n]}class Se extends O{constructor(e){super(),J(this,e,it,st,Z,{style:0})}}function ut(u){let e;return{c(){e=v("span"),this.h()},l(i){e=b(i,"SPAN",{class:!0,style:!0}),H(e).forEach(a),this.h()},h(){_(e,"class","timeline-connector svelte-jbpjct"),_(e,"style",u[0])},m(i,n){m(i,e,n)},p(i,[n]){n&1&&_(e,"style",i[0])},i:N,o:N,d(i){i&&a(e)}}}function ot(u,e,i){let{style:n=null}=e;return u.$$set=t=>{"style"in t&&i(0,n=t.style)},[n]}class Ve extends O{constructor(e){super(),J(this,e,ot,ut,Z,{style:0})}}function rt(u){let e,i;const n=u[3].default,t=Y(n,u,u[2],null);return{c(){e=v("div"),t&&t.c(),this.h()},l(l){e=b(l,"DIV",{class:!0,style:!0});var s=H(e);t&&t.l(s),s.forEach(a),this.h()},h(){_(e,"class",me(`timeline-content ${u[1]}`)+" svelte-1mnas8e"),_(e,"style",u[0])},m(l,s){m(l,e,s),t&&t.m(e,null),i=!0},p(l,[s]){t&&t.p&&(!i||s&4)&&x(t,n,l,l[2],i?te(n,l[2],s,null):ee(l[2]),null),(!i||s&1)&&_(e,"style",l[0])},i(l){i||($(t,l),i=!0)},o(l){g(t,l),i=!1},d(l){l&&a(e),t&&t.d(l)}}}function at(u,e,i){let{$$slots:n={},$$scope:t}=e,{style:l=null}=e;const s=ue("TimelineConfig"),o=ue("ParentPosition"),r=o||s.rootPosition;return u.$$set=c=>{"style"in c&&i(0,l=c.style),"$$scope"in c&&i(2,t=c.$$scope)},[l,r,t,n]}class je extends O{constructor(e){super(),J(this,e,at,rt,Z,{style:0})}}function ft(u){let e,i;const n=u[3].default,t=Y(n,u,u[2],null);return{c(){e=v("div"),t&&t.c(),this.h()},l(l){e=b(l,"DIV",{class:!0,style:!0});var s=H(e);t&&t.l(s),s.forEach(a),this.h()},h(){_(e,"class",me(`timeline-opposite-content ${u[1]}`)+" svelte-1c9jp58"),_(e,"style",u[0])},m(l,s){m(l,e,s),t&&t.m(e,null),i=!0},p(l,[s]){t&&t.p&&(!i||s&4)&&x(t,n,l,l[2],i?te(n,l[2],s,null):ee(l[2]),null),(!i||s&1)&&_(e,"style",l[0])},i(l){i||($(t,l),i=!0)},o(l){g(t,l),i=!1},d(l){l&&a(e),t&&t.d(l)}}}function ct(u,e,i){let{$$slots:n={},$$scope:t}=e,{style:l=null}=e;const s=ue("TimelineConfig"),o=ue("ParentPosition"),r=o||s.rootPosition;return u.$$set=c=>{"style"in c&&i(0,l=c.style),"$$scope"in c&&i(2,t=c.$$scope)},[l,r,t,n]}class qe extends O{constructor(e){super(),J(this,e,ct,ft,Z,{style:0})}}function Fe(u,e,i){const n=u.slice();return n[6]=e[i],n}function Te(u,e,i){const n=u.slice();return n[6]=e[i],n}function mt(u){let e,i='<a href="https://bit.ly/shellkai" rel="noopener external" target="_blank" class="group flex-1 relative overflow-hidden btn btn-block normal-case border-none no-underline bg-[#5865f2] hover:bg-[#7983f5]"><span class="i-simple-icons-discord absolute w-16 h-16 right-10 opacity-20 fill-white transform-gpu transition-transform ease-in-out duration-500 group-hover:scale-125"></span> <span class="z-10 !text-white">My own server: i realized here&#39;s mod is shellkai</span></a>';return{c(){e=v("div"),e.innerHTML=i,this.h()},l(n){e=b(n,"DIV",{class:!0,"data-svelte-h":!0}),X(e)!=="svelte-17hinao"&&(e.innerHTML=i),this.h()},h(){_(e,"class","flex flex-col md:flex-row gap-4 mt-4")},m(n,t){m(n,e,t)},p:N,d(n){n&&a(e)}}}function _t(u){let e,i,n,t;return e=new Se({props:{style:"background-color: #7CD5E2;"}}),n=new Ve({}),{c(){B(e.$$.fragment),i=w(),B(n.$$.fragment)},l(l){P(e.$$.fragment,l),i=y(l),P(n.$$.fragment,l)},m(l,s){L(e,l,s),m(l,i,s),L(n,l,s),t=!0},p:N,i(l){t||($(e.$$.fragment,l),$(n.$$.fragment,l),t=!0)},o(l){g(e.$$.fragment,l),g(n.$$.fragment,l),t=!1},d(l){l&&a(i),M(e,l),M(n,l)}}}function ht(u){let e,i=u[6].title+"",n;return{c(){e=v("h3"),n=z(i)},l(t){e=b(t,"H3",{});var l=H(e);n=R(l,i),l.forEach(a)},m(t,l){m(t,e,l),A(e,n)},p:N,d(t){t&&a(e)}}}function $t(u){let e,i,n,t,l;return e=new Ie({props:{$$slots:{default:[_t]},$$scope:{ctx:u}}}),n=new je({props:{$$slots:{default:[ht]},$$scope:{ctx:u}}}),{c(){B(e.$$.fragment),i=w(),B(n.$$.fragment),t=w()},l(s){P(e.$$.fragment,s),i=y(s),P(n.$$.fragment,s),t=y(s)},m(s,o){L(e,s,o),m(s,i,o),L(n,s,o),m(s,t,o),l=!0},p(s,o){const r={};o&2048&&(r.$$scope={dirty:o,ctx:s}),e.$set(r);const c={};o&2048&&(c.$$scope={dirty:o,ctx:s}),n.$set(c)},i(s){l||($(e.$$.fragment,s),$(n.$$.fragment,s),l=!0)},o(s){g(e.$$.fragment,s),g(n.$$.fragment,s),l=!1},d(s){s&&(a(i),a(t)),M(e,s),M(n,s)}}}function pt(u){let e,i=u[6].time+"",n,t;return{c(){e=v("p"),n=z(i),t=w()},l(l){e=b(l,"P",{});var s=H(e);n=R(s,i),s.forEach(a),t=y(l)},m(l,s){m(l,e,s),A(e,n),m(l,t,s)},p:N,d(l){l&&(a(e),a(t))}}}function dt(u){let e,i;return e=new qe({props:{slot:"opposite-content",$$slots:{default:[pt]},$$scope:{ctx:u}}}),{c(){B(e.$$.fragment)},l(n){P(e.$$.fragment,n)},m(n,t){L(e,n,t),i=!0},p(n,t){const l={};t&2048&&(l.$$scope={dirty:t,ctx:n}),e.$set(l)},i(n){i||($(e.$$.fragment,n),i=!0)},o(n){g(e.$$.fragment,n),i=!1},d(n){M(e,n)}}}function Ae(u){let e,i;return e=new Me({props:{$$slots:{"opposite-content":[dt],default:[$t]},$$scope:{ctx:u}}}),{c(){B(e.$$.fragment)},l(n){P(e.$$.fragment,n)},m(n,t){L(e,n,t),i=!0},p(n,t){const l={};t&2048&&(l.$$scope={dirty:t,ctx:n}),e.$set(l)},i(n){i||($(e.$$.fragment,n),i=!0)},o(n){g(e.$$.fragment,n),i=!1},d(n){M(e,n)}}}function gt(u){let e,i,n=fe(u[1]),t=[];for(let s=0;s<n.length;s+=1)t[s]=Ae(Te(u,n,s));const l=s=>g(t[s],1,1,()=>{t[s]=null});return{c(){for(let s=0;s<t.length;s+=1)t[s].c();e=ae()},l(s){for(let o=0;o<t.length;o+=1)t[o].l(s);e=ae()},m(s,o){for(let r=0;r<t.length;r+=1)t[r]&&t[r].m(s,o);m(s,e,o),i=!0},p(s,o){if(o&2){n=fe(s[1]);let r;for(r=0;r<n.length;r+=1){const c=Te(s,n,r);t[r]?(t[r].p(c,o),$(t[r],1)):(t[r]=Ae(c),t[r].c(),$(t[r],1),t[r].m(e.parentNode,e))}for(_e(),r=n.length;r<t.length;r+=1)l(r);he()}},i(s){if(!i){for(let o=0;o<n.length;o+=1)$(t[o]);i=!0}},o(s){t=t.filter(Boolean);for(let o=0;o<t.length;o+=1)g(t[o]);i=!1},d(s){s&&a(e),Le(t,s)}}}function vt(u){let e,i,n,t;return e=new Se({props:{style:"background-color: #7CD5E2;"}}),n=new Ve({}),{c(){B(e.$$.fragment),i=w(),B(n.$$.fragment)},l(l){P(e.$$.fragment,l),i=y(l),P(n.$$.fragment,l)},m(l,s){L(e,l,s),m(l,i,s),L(n,l,s),t=!0},p:N,i(l){t||($(e.$$.fragment,l),$(n.$$.fragment,l),t=!0)},o(l){g(e.$$.fragment,l),g(n.$$.fragment,l),t=!1},d(l){l&&a(i),M(e,l),M(n,l)}}}function bt(u){let e,i=u[6].title+"",n;return{c(){e=v("h3"),n=z(i)},l(t){e=b(t,"H3",{});var l=H(e);n=R(l,i),l.forEach(a)},m(t,l){m(t,e,l),A(e,n)},p:N,d(t){t&&a(e)}}}function Ct(u){let e,i,n,t,l;return e=new Ie({props:{$$slots:{default:[vt]},$$scope:{ctx:u}}}),n=new je({props:{$$slots:{default:[bt]},$$scope:{ctx:u}}}),{c(){B(e.$$.fragment),i=w(),B(n.$$.fragment),t=w()},l(s){P(e.$$.fragment,s),i=y(s),P(n.$$.fragment,s),t=y(s)},m(s,o){L(e,s,o),m(s,i,o),L(n,s,o),m(s,t,o),l=!0},p(s,o){const r={};o&2048&&(r.$$scope={dirty:o,ctx:s}),e.$set(r);const c={};o&2048&&(c.$$scope={dirty:o,ctx:s}),n.$set(c)},i(s){l||($(e.$$.fragment,s),$(n.$$.fragment,s),l=!0)},o(s){g(e.$$.fragment,s),g(n.$$.fragment,s),l=!1},d(s){s&&(a(i),a(t)),M(e,s),M(n,s)}}}function Dt(u){let e,i=u[6].time+"",n,t;return{c(){e=v("p"),n=z(i),t=w()},l(l){e=b(l,"P",{});var s=H(e);n=R(s,i),s.forEach(a),t=y(l)},m(l,s){m(l,e,s),A(e,n),m(l,t,s)},p:N,d(l){l&&(a(e),a(t))}}}function Et(u){let e,i;return e=new qe({props:{slot:"opposite-content",$$slots:{default:[Dt]},$$scope:{ctx:u}}}),{c(){B(e.$$.fragment)},l(n){P(e.$$.fragment,n)},m(n,t){L(e,n,t),i=!0},p(n,t){const l={};t&2048&&(l.$$scope={dirty:t,ctx:n}),e.$set(l)},i(n){i||($(e.$$.fragment,n),i=!0)},o(n){g(e.$$.fragment,n),i=!1},d(n){M(e,n)}}}function He(u){let e,i;return e=new Me({props:{$$slots:{"opposite-content":[Et],default:[Ct]},$$scope:{ctx:u}}}),{c(){B(e.$$.fragment)},l(n){P(e.$$.fragment,n)},m(n,t){L(e,n,t),i=!0},p(n,t){const l={};t&2048&&(l.$$scope={dirty:t,ctx:n}),e.$set(l)},i(n){i||($(e.$$.fragment,n),i=!0)},o(n){g(e.$$.fragment,n),i=!1},d(n){M(e,n)}}}function kt(u){let e,i,n=fe(u[2]),t=[];for(let s=0;s<n.length;s+=1)t[s]=He(Fe(u,n,s));const l=s=>g(t[s],1,1,()=>{t[s]=null});return{c(){for(let s=0;s<t.length;s+=1)t[s].c();e=ae()},l(s){for(let o=0;o<t.length;o+=1)t[o].l(s);e=ae()},m(s,o){for(let r=0;r<t.length;r+=1)t[r]&&t[r].m(s,o);m(s,e,o),i=!0},p(s,o){if(o&4){n=fe(s[2]);let r;for(r=0;r<n.length;r+=1){const c=Fe(s,n,r);t[r]?(t[r].p(c,o),$(t[r],1)):(t[r]=He(c),t[r].c(),$(t[r],1),t[r].m(e.parentNode,e))}for(_e(),r=n.length;r<t.length;r+=1)l(r);he()}},i(s){if(!i){for(let o=0;o<n.length;o+=1)$(t[o]);i=!0}},o(s){t=t.filter(Boolean);for(let o=0;o<t.length;o+=1)g(t[o]);i=!1},d(s){s&&a(e),Le(t,s)}}}function wt(u){let e,i='<a href="#關於我">關於我</a>',n,t,l,s,o,r=u[0].toFixed(10)+"",c,p,d,E,I='<a href="#競賽">競賽</a>',U,S,K,V,j='<a href="#證照">證照</a>',T,k,Q,F,C='<a href="#待考取--希望考取證照">待考取 &amp; 希望考取證照</a>',D,G,se="<li>中華民國技術士證 電腦硬體裝修 乙級 (預計 2024-11 考取即測即評)</li> <li>iPAS 資訊安全工程師 初級</li> <li>CCNA 思科認證網路工程師</li> <li>RHCE (Red Hat Certified Engineer)</li>",le,W,$e='<a href="#授課--其他經驗">授課 / 其他經驗</a>',oe,ne,pe="<li>2023 松山工農黑客 IT 社 工作室網路架設課程講師 &amp; 活動</li> <li>2024 松山工農資訊技術中心@選手室 設備管理員</li>",ie;return t=new Je({props:{subname:"ShellkaiTW",bio:"「每一次新的嘗試，皆是在未知中探索著，且學習著。」",$$slots:{default:[mt]},$$scope:{ctx:u}}}),S=new we({props:{position:"alternate",$$slots:{default:[gt]},$$scope:{ctx:u}}}),k=new we({props:{position:"alternate",$$slots:{default:[kt]},$$scope:{ctx:u}}}),{c(){e=v("h2"),e.innerHTML=i,n=w(),B(t.$$.fragment),l=w(),s=v("p"),o=z("安安，我是 Shellkai，是個已經 "),c=z(r),p=z(" 歲的人類，就讀高職資訊科三年級，從一台 Android 手機開啟了我的資訊之旅，目前專攻於伺服器架設（Windows Server、Linux）、網管設備建置（Cisco Devices）、網路規劃及簡易的 Windows Server 及 Linux 的系統安全強化，希望未來能朝著資安的方向前進！"),d=w(),E=v("h2"),E.innerHTML=I,U=w(),B(S.$$.fragment),K=z(`
More Coming Soon...
`),V=v("h2"),V.innerHTML=j,T=w(),B(k.$$.fragment),Q=w(),F=v("h3"),F.innerHTML=C,D=w(),G=v("ul"),G.innerHTML=se,le=w(),W=v("h2"),W.innerHTML=$e,oe=w(),ne=v("ul"),ne.innerHTML=pe,this.h()},l(f){e=b(f,"H2",{id:!0,"data-svelte-h":!0}),X(e)!=="svelte-14p3kr3"&&(e.innerHTML=i),n=y(f),P(t.$$.fragment,f),l=y(f),s=b(f,"P",{});var h=H(s);o=R(h,"安安，我是 Shellkai，是個已經 "),c=R(h,r),p=R(h," 歲的人類，就讀高職資訊科三年級，從一台 Android 手機開啟了我的資訊之旅，目前專攻於伺服器架設（Windows Server、Linux）、網管設備建置（Cisco Devices）、網路規劃及簡易的 Windows Server 及 Linux 的系統安全強化，希望未來能朝著資安的方向前進！"),h.forEach(a),d=y(f),E=b(f,"H2",{id:!0,"data-svelte-h":!0}),X(E)!=="svelte-16obul"&&(E.innerHTML=I),U=y(f),P(S.$$.fragment,f),K=R(f,`
More Coming Soon...
`),V=b(f,"H2",{id:!0,"data-svelte-h":!0}),X(V)!=="svelte-kdx2j0"&&(V.innerHTML=j),T=y(f),P(k.$$.fragment,f),Q=y(f),F=b(f,"H3",{id:!0,"data-svelte-h":!0}),X(F)!=="svelte-3pqexi"&&(F.innerHTML=C),D=y(f),G=b(f,"UL",{"data-svelte-h":!0}),X(G)!=="svelte-159ixzf"&&(G.innerHTML=se),le=y(f),W=b(f,"H2",{id:!0,"data-svelte-h":!0}),X(W)!=="svelte-1hnmgg1"&&(W.innerHTML=$e),oe=y(f),ne=b(f,"UL",{"data-svelte-h":!0}),X(ne)!=="svelte-1klkckg"&&(ne.innerHTML=pe),this.h()},h(){_(e,"id","關於我"),_(E,"id","競賽"),_(V,"id","證照"),_(F,"id","待考取--希望考取證照"),_(W,"id","授課--其他經驗")},m(f,h){m(f,e,h),m(f,n,h),L(t,f,h),m(f,l,h),m(f,s,h),A(s,o),A(s,c),A(s,p),m(f,d,h),m(f,E,h),m(f,U,h),L(S,f,h),m(f,K,h),m(f,V,h),m(f,T,h),L(k,f,h),m(f,Q,h),m(f,F,h),m(f,D,h),m(f,G,h),m(f,le,h),m(f,W,h),m(f,oe,h),m(f,ne,h),ie=!0},p(f,h){const de={};h&2048&&(de.$$scope={dirty:h,ctx:f}),t.$set(de),(!ie||h&1)&&r!==(r=f[0].toFixed(10)+"")&&re(c,r);const ge={};h&2048&&(ge.$$scope={dirty:h,ctx:f}),S.$set(ge);const ve={};h&2048&&(ve.$$scope={dirty:h,ctx:f}),k.$set(ve)},i(f){ie||($(t.$$.fragment,f),$(S.$$.fragment,f),$(k.$$.fragment,f),ie=!0)},o(f){g(t.$$.fragment,f),g(S.$$.fragment,f),g(k.$$.fragment,f),ie=!1},d(f){f&&(a(e),a(n),a(l),a(s),a(d),a(E),a(U),a(K),a(V),a(T),a(Q),a(F),a(D),a(G),a(le),a(W),a(oe),a(ne)),M(t,f),M(S,f),M(k,f)}}}function yt(u){let e,i;const n=[u[3],Be];let t={$$slots:{default:[wt]},$$scope:{ctx:u}};for(let l=0;l<n.length;l+=1)t=ce(t,n[l]);return e=new Ue({props:t}),{c(){B(e.$$.fragment)},l(l){P(e.$$.fragment,l)},m(l,s){L(e,l,s),i=!0},p(l,[s]){const o=s&8?Ge(n,[s&8&&De(l[3]),s&0&&De(Be)]):{};s&2049&&(o.$$scope={dirty:s,ctx:l}),e.$set(o)},i(l){i||($(e.$$.fragment,l),i=!0)},o(l){g(e.$$.fragment,l),i=!1},d(l){M(e,l)}}}const Be={title:"About Me!",image:"/hello-world/kita-ikuyo.jpg",alt:"Shellkai Huang",created:"2022-11-25T00:00:00.000Z",updated:"2024-09-22T00:00:00.000Z",images:[],tags:[],slug:"/about_me/+page.svelte.md",path:"/about_me",toc:[{depth:2,slug:"關於我",title:"關於我"},{depth:2,slug:"競賽",title:"競賽"},{depth:2,slug:"證照",title:"證照"},{depth:3,slug:"待考取--希望考取證照",title:"待考取 & 希望考取證照"},{depth:2,slug:"授課--其他經驗",title:"授課 / 其他經驗"}]};function Ft(u,e,i){const n=[{title:"臺北市國中小學生 Scratch 貓咪盃「創意遊戲」國中組 入選",time:"2020"},{title:"第 53 屆全國技能競賽分區北區賽 39 資訊與網路技術 佳作 (rk.12)",time:"2023"},{title:"桃園國際新創機器人節 (TIRT) T1 智能賽車組 & 機器人划龍舟組",time:"2023"},{title:"112 年度資安技能金盾獎",time:"2023"},{title:"第 54 屆全國技能競賽分區北區賽 39 資訊與網路技術 金牌 (rk.1)",time:"2024"},{title:"第 54 屆全國技能競賽全國賽 ⠀39 資訊與網路技術 銅牌 (rk.3)",time:"2024"}],t=[{title:"GEPT 全民英檢 初級",time:"2020"},{title:"中華民國技術士證 電腦硬體裝修 丙級",time:"2023"}];let{birthday:l="2006-10-09"}=e,s=0;function o(){const r=new Date(l),p=new Date-r;i(0,s=p/(1e3*60*60*24*365.25))}return We(()=>{o();const r=setInterval(o,50);return()=>clearInterval(r)}),u.$$set=r=>{i(3,e=ce(ce({},e),Ce(r))),"birthday"in r&&i(4,l=r.birthday)},e=Ce(e),[s,n,t,e,l]}class Lt extends O{constructor(e){super(),J(this,e,Ft,yt,Z,{birthday:4})}}export{Lt as component};