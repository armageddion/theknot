import{u as h,S as v,g as k}from"./shared-CU7EoHB4.js";import{d as b,u as x,r as y,o as i,c as l,a as e,b as o,F as w,e as C,f as S,t as _,l as D,i as L,g as I,p as $,h as T,j as V,k as N,m as d}from"./app-Ct2HSC8A.js";import{_ as u}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./easing-BWWAKpO-.js";const f=s=>($("data-v-bfa3a34c"),s=s(),T(),s),B={fixed:"","right-0":"","top-0":"","z-1":"","min-w-0":"",flex:"","justify-between":"","gap-4":"","p-2":"","text-xl":"","backdrop-blur":"","sm:rounded-bl-2xl":"","sm:px-8":"","sm:py-4":"",left:"<sm:0"},j={key:0,"max-w-full":"",flex:"","items-center":"","overflow-auto":""},z={flex:""},E=["onClick"],F=["textContent"],H={flex:"","gap-2":""},O=["title"],R=f(()=>o("div",{i:"ph-moon dark:ph-sun"},null,-1)),A=[R],q=["title"],G=f(()=>o("div",{"i-ph:translate":"","transition-opacity":"","duration-200":"","parent-hover:opacity-50":""},null,-1)),J={absolute:"","left-0":"","top-0":"","w-full":"","text-center":"","opacity-0":"","transition-opacity":"","duration-200":"","parent-active:opacity-100":"","parent-hover:opacity-100":""},K=b({__name:"Header",setup(s){const{t:n,locale:c}=x(),p=h(),g=y(v.map(t=>({key:t,href:`#${t}`})));async function m(){const t=V,a=t[(t.indexOf(c.value)+1)%t.length];await D(a)}return(t,a)=>(i(),l("nav",B,[e(p)?S("",!0):(i(),l("nav",j,[o("ul",z,[(i(!0),l(w,null,C(e(g),r=>(i(),l("li",{key:r.href},[o("a",{relative:"",block:"","w-full":"","rounded-lg":"","py-1":"",onClick:U=>("goTo"in t?t.goTo:e(k))(r.href)},[o("h3",{"min-content":"",relative:"","z-1":"","px-3":"","text-nowrap":"","text-sm":"","opacity-75":"",textContent:_(e(n)(`${r.key}.toc`))},null,8,F)],8,E)]))),128))])])),o("div",H,[o("button",{"h-8":"","w-8":"","icon-btn":"",title:("isDark"in t?t.isDark:e(L))?e(n)("button.toggle_dark_off"):e(n)("button.toggle_dark_on"),onClick:a[0]||(a[0]=r=>("toggleDark"in t?t.toggleDark:e(I))())},A,8,O),o("button",{relative:"","h-8":"","w-8":"","icon-btn":"",class:"parent",title:e(n)("button.toggle_langs"),onClick:a[1]||(a[1]=r=>m())},[G,o("span",J,_(e(n)("lang")),1)],8,q)])]))}}),M=u(K,[["__scopeId","data-v-bfa3a34c"]]),P={};function Q(s,n){const c=M,p=N("RouterView");return i(),l("main",null,[d(c),d(p)])}const tt=u(P,[["render",Q]]);export{tt as default};
