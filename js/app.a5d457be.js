(function(e){function t(t){for(var n,r,s=t[0],o=t[1],i=t[2],d=0,b=[];d<s.length;d++)r=s[d],Object.prototype.hasOwnProperty.call(c,r)&&c[r]&&b.push(c[r][0]),c[r]=0;for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n]);u&&u(t);while(b.length)b.shift()();return l.push.apply(l,i||[]),a()}function a(){for(var e,t=0;t<l.length;t++){for(var a=l[t],n=!0,s=1;s<a.length;s++){var o=a[s];0!==c[o]&&(n=!1)}n&&(l.splice(t--,1),e=r(r.s=a[0]))}return e}var n={},c={app:0},l=[];function r(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=n,r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(a,n,function(t){return e[t]}.bind(null,n));return a},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/weather-widget-vue3/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],o=s.push.bind(s);s.push=t,s=s.slice();for(var i=0;i<s.length;i++)t(s[i]);var u=o;l.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"01fe":function(e,t,a){},"0ea6":function(e,t,a){},"56d7":function(e,t,a){"use strict";a.r(t);var n=a("7a23");a("14d9");const c=e=>(Object(n["n"])("data-v-e81b88ba"),e=e(),Object(n["m"])(),e),l={class:"settings"},r=c(()=>Object(n["g"])("span",{class:"label"},"settings",-1)),s=["onDragstart","onDrop"],o={class:"item-wrapper"},i={class:"item-label"},u=["title"],d={class:"item-text"},b=["onClick"],v=c(()=>Object(n["g"])("span",{class:"material-icons delete-icon"},"delete",-1)),p=[v],O={class:"search-wrapper"},j=["onKeyup","placeholder","disabled"],f=["disabled"],g=c(()=>Object(n["g"])("span",{class:"material-icons search-icon"},"search",-1)),m=[g],h={name:"WeatherWidgetSettings"};var y=Object.assign(h,{props:{list:{type:Array,require:!0,default:()=>[]},currentDataIndex:{type:Number,default:0},loading:{type:Boolean,default:!1}},emits:["getSearch","removeLocation","moveItem"],setup(e,{emit:t}){const a=e,c=Object(n["o"])(""),v=()=>{t("getSearch",c.value),c.value=""},g=e=>{t("removeLocation",e)},h=(e,t)=>{e.dataTransfer.effectAllowed="move",e.dataTransfer.dropAllowed="move",e.dataTransfer.setData("from-index",t)},y=(e,a)=>{const n=e.dataTransfer.getData("from-index");t("moveItem",n,a)};return(t,w)=>(Object(n["l"])(),Object(n["f"])("div",l,[r,(Object(n["l"])(!0),Object(n["f"])(n["a"],null,Object(n["p"])(a.list,(e,t)=>(Object(n["l"])(),Object(n["f"])("div",{key:e.name,draggable:!0,onDragstart:e=>h(e,t),onDrop:Object(n["w"])(e=>y(e,t),["prevent"]),onDragover:w[0]||(w[0]=Object(n["w"])(()=>{},["prevent"])),onDragenter:w[1]||(w[1]=Object(n["w"])(()=>{},["prevent"]))},[Object(n["g"])("div",o,[Object(n["g"])("div",i,[Object(n["g"])("span",{class:"material-icons move-icon",title:0===t?"drag and drop this icon for change list order":""}," unfold_more ",8,u),Object(n["g"])("span",d,Object(n["q"])(`${e.name}, ${e.sys.country}`),1)]),Object(n["g"])("button",{class:"delete-button",onClick:e=>g(t)},p,8,b)])],40,s))),128)),Object(n["g"])("div",O,[Object(n["u"])(Object(n["g"])("input",{onKeyup:Object(n["v"])(v,["enter"]),"onUpdate:modelValue":w[2]||(w[2]=e=>c.value=e),type:"text",class:"search-input",placeholder:e.loading?"loading...":"add location",disabled:e.loading},null,40,j),[[n["s"],c.value]]),Object(n["g"])("button",{class:"search-button",onClick:v,disabled:e.loading},m,8,f)])]))}}),w=(a("7224"),a("6b0d")),D=a.n(w);const I=D()(y,[["__scopeId","data-v-e81b88ba"]]);var x=I;const k={key:0,class:"main-info-wrapper"},S={class:"location"},$={class:"time"},_={class:"temp"},C={class:"feels-like"},q=["src"],P={class:"indicators"},T={name:"MainInfo"};var M=Object.assign(T,{props:{weatherData:{type:Object,default:()=>({})},time:{type:String,default:""}},setup(e){return(t,a)=>Object.keys(e.weatherData).length?(Object(n["l"])(),Object(n["f"])("div",k,[Object(n["g"])("div",S,Object(n["q"])(`${e.weatherData.name}, ${e.weatherData.sys.country}`),1),Object(n["g"])("div",$,Object(n["q"])(e.time),1),Object(n["g"])("div",_,Object(n["q"])(e.weatherData.main.temp.toFixed(1)+"°С"),1),Object(n["g"])("div",C,Object(n["q"])(`feels like: ${e.weatherData.main.feels_like.toFixed(1)}°С`),1),Object(n["g"])("img",{class:"icon",src:`https://openweathermap.org/img/wn/${e.weatherData.weather[0].icon}@2x.png`},null,8,q),Object(n["g"])("div",P,Object(n["q"])(`${e.weatherData.weather[0].description}, humidity: ${e.weatherData.main.humidity}%, pressure: ${e.weatherData.main.pressure}hPa`),1)])):Object(n["e"])("",!0)}});a("7901");const N=D()(M,[["__scopeId","data-v-9f5954bc"]]);var A=N,J=a("cee4");const W={class:"nav-buttons-wrapper"},L=["onClick"],U={name:"navButtons"};var B=Object.assign(U,{props:{navChars:{type:Array,default:()=>[]},currentDataIndex:{type:Number,default:0}},emits:["changeDataIndex"],setup(e,{emit:t}){return(a,c)=>(Object(n["l"])(),Object(n["f"])("div",W,[(Object(n["l"])(!0),Object(n["f"])(n["a"],null,Object(n["p"])(e.navChars,(a,c)=>(Object(n["l"])(),Object(n["f"])("span",{onClick:e=>t("changeDataIndex",c),key:c,class:Object(n["i"])("nav-char "+(e.currentDataIndex===c?"active":""))},Object(n["q"])(a),11,L))),128))]))}});a("ecb0");const F=D()(B,[["__scopeId","data-v-1dd21776"]]);var H=F;const K=e=>(Object(n["n"])("data-v-04b42cac"),e=e(),Object(n["m"])(),e),R={class:"widget-wrapper"},z={key:0},E=K(()=>Object(n["g"])("br",null,null,-1)),G={key:1},V={class:"material-icons settings-icon"},Q={components:{MainInfo:A,NavButtons:H},name:"WeatherWidget"};var X=Object.assign(Q,{setup(e){const t="c8db109bab94f6320274de2ebafa76fb",a="https://api.openweathermap.org/data/2.5/weather",c="weatherList",l=Object(n["o"])(JSON.parse(localStorage.getItem(c))||[]),r=Object(n["o"])(!1),s=Object(n["o"])(!1),o=()=>{s.value=!s.value},i=Object(n["o"])(0),u=e=>{i.value=e,m()},d=Object(n["b"])(()=>w.value.map(e=>e.name.slice(0,3).toUpperCase())),b=Object(n["o"])(null),v=Object(n["o"])(null),p=()=>{navigator.geolocation.getCurrentPosition(e=>{b.value=e.coords.latitude,v.value=e.coords.longitude,D()})},O=async e=>{try{r.value=!0;const t=await j(e);r.value=!1,null!==t&&void 0!==t&&t.data&&(w.value.map(e=>e.name).includes(t.data.name)?alert("such location already in the list"):w.value.push(t.data),w.value.length>5&&(alert("maximum locations count: 5"),w.value.length=5))}catch{alert("location not found"),r.value=!1}},j=e=>Object(J["a"])(`${a}?q=${e}&appid=${t}&units=metric`),f=async()=>{let e=l.value.map(e=>j(e));r.value=!0;const t=await Promise.all(e);r.value=!1,t.forEach(e=>{const t=w.value.findIndex(t=>t.name===e.data.name);t>-1&&w.value.splice(t,1),w.value.push(e.data)})},g=Object(n["o"])(""),m=()=>{var e;if(null!==(e=w.value)&&void 0!==e&&e[i.value]){var t,a;let e=new Date;e.setHours(e.getUTCHours()+(null===(t=w.value)||void 0===t||null===(a=t[i.value])||void 0===a?void 0:a.timezone)/3600),g.value=new Intl.DateTimeFormat("ru-RU",{hour:"numeric",minute:"numeric",second:"numeric"}).format(e)}},h=setInterval(()=>{m()},1e3),y=setInterval(async()=>{f()},3e5);Object(n["k"])(async()=>{var e;null!==(e=l.value)&&void 0!==e&&e.length?f():p()}),Object(n["j"])(()=>{clearInterval(y),clearInterval(h)});const w=Object(n["o"])([]);Object(n["t"])(w,(e,t)=>{localStorage.setItem(c,JSON.stringify(e.map(e=>e.name)))},{deep:!0});const D=async()=>{r.value=!0;const e=await Object(J["a"])(`${a}?lat=${b.value}&lon=${v.value}&appid=${t}&units=metric`);r.value=!1,null!==e&&void 0!==e&&e.data&&w.value.push(e.data)},I=e=>{i.value=0,w.value.splice(e,1)},k=(e,t)=>{const a=JSON.parse(JSON.stringify(w.value)),n=a.splice(e,1);a.splice(t,0,...n),w.value=a,i.value=0};return(e,t)=>(Object(n["l"])(),Object(n["f"])("div",R,[w.value.length?(Object(n["l"])(),Object(n["d"])(A,{key:0,class:Object(n["i"])("main-info"+(s.value?" blur":"")),weatherData:w.value[i.value],time:g.value},null,8,["class","weatherData","time"])):(Object(n["l"])(),Object(n["f"])("div",{key:1,class:Object(n["i"])("loading"+(s.value?" blur":""))},[r.value?(Object(n["l"])(),Object(n["f"])("span",z," Loading... ")):Object(n["e"])("",!0),E,l.value.length&&(r.value||w.value.length)?Object(n["e"])("",!0):(Object(n["l"])(),Object(n["f"])("span",G," Add location in settings "))],2)),Object(n["g"])("button",{class:"setting-button",onClick:o},[Object(n["g"])("span",V,Object(n["q"])(""+(s.value?"close":"settings")),1)]),s.value?(Object(n["l"])(),Object(n["d"])(x,{key:2,class:"settings-menu",onGetSearch:O,onRemoveLocation:I,onMoveItem:k,list:w.value,currentDataIndex:i.value,loading:r.value},null,8,["list","currentDataIndex","loading"])):Object(n["e"])("",!0),Object(n["h"])(H,{class:Object(n["i"])("nav-buttons"+(s.value?" blur":"")),navChars:Object(n["r"])(d),currentDataIndex:i.value,onChangeDataIndex:t[0]||(t[0]=e=>u(e))},null,8,["class","navChars","currentDataIndex"])]))}});a("e5a4");const Y=D()(X,[["__scopeId","data-v-04b42cac"]]);var Z=Y;const ee={components:{WeatherWidget:Z},name:"App"};var te=Object.assign(ee,{setup(e){return(e,t)=>(Object(n["l"])(),Object(n["d"])(Z))}});a("7b43");const ae=te;var ne=ae;Object(n["c"])(ne).mount("#app")},7224:function(e,t,a){"use strict";a("f23d")},7901:function(e,t,a){"use strict";a("8ad6")},"7b43":function(e,t,a){"use strict";a("0ea6")},"8ad6":function(e,t,a){},"9e40":function(e,t,a){},e5a4:function(e,t,a){"use strict";a("9e40")},ecb0:function(e,t,a){"use strict";a("01fe")},f23d:function(e,t,a){}});
//# sourceMappingURL=app.a5d457be.js.map