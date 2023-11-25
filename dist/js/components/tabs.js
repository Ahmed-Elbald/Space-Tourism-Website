var __awaiter=this&&this.__awaiter||function(e,t,n,a){return new(n||(n=Promise))((function(s,i){function r(e){try{c(a.next(e))}catch(e){i(e)}}function o(e){try{c(a.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,o)}c((a=a.apply(e,t||[])).next())}))};import{formatValue,keyPressed}from"./../base/helpers.js";let currentPage;const Tabs=[];class Tab{constructor(e){this.name=e.name,this.imgs=[],this.init(e)}init(e){this.createLink(),this.createPanel(e),this.createImgs(e),0===Tab.currentTab&&this.show(),Tab.currentTab++}}Tab.currentTab=0,Tab.prototype.createLink=function(){const e=formatValue(this.name),t=document.createElement("li");t.role="presentation";const n=document.createElement("a");n.className="c-tabs__link",n.role="tab",n.ariaSelected="false",n.setAttribute("aria-controls",`${e}-panel`),n.setAttribute("aria-expanded","false"),n.href=`#${e}-panel`,n.id=`${e}-tab`,n.innerHTML="destinations"===currentPage?this.name:`<span class="u-sr-only">${this.name}</span>`,t.append(n),null==tabList||tabList.append(t),this.link=n,addLinkInteractivity.call(this)},Tab.prototype.createPanel=function(e){let t;t="destinations"===currentPage?createDestinationPanel(e):"crew"===currentPage?createCrewMemberPanel(e):createTermPanel(e),addPanelProperties(t,this.name),null==panelsContainer||panelsContainer.append(t),this.panel=t},Tab.prototype.createImgs=function(e){var t,n,a;const s=document.createElement("img");s.alt="";const i=e.images;if("technology"===currentPage){const e=s.cloneNode(!0),n=s.cloneNode(!0);e.setAttribute("data-view","landscape"),e.src=i.landscape,n.setAttribute("data-view","portrait"),n.src=i.portrait,null===(t=this.imgs)||void 0===t||t.push(e,n)}else{const e=s.cloneNode(!0);e.src=i.webp,null===(n=this.imgs)||void 0===n||n.push(e)}null===(a=this.imgs)||void 0===a||a.forEach((e=>null==tabsImgsContainer?void 0:tabsImgsContainer.append(e)))},Tab.prototype.show=function(){Tabs.forEach((e=>{e.link.setAttribute("aria-selected","false"),e.link.setAttribute("aria-expanded","false"),e.panel.classList.remove("js-show-up"),e.imgs.forEach((e=>e.classList.remove("js-show-up")))})),this.link.setAttribute("aria-selected","true"),this.link.setAttribute("aria-expanded","true"),this.panel.classList.add("js-show-up"),this.panel.focus(),this.imgs.forEach((e=>e.classList.add("js-show-up")))};const tabsContainer=document.querySelector(".js-tabs");let panelsContainer,tabsImgsContainer,tabList;function handleTabsCreation(){return __awaiter(this,void 0,void 0,(function*(){(yield getTabsDate()).forEach((e=>Tabs.push(new Tab(e))))}))}function getTabsDate(){return __awaiter(this,void 0,void 0,(function*(){return fetch("./assets/data/data.json").then((e=>e.json())).then((e=>e[currentPage]))}))}function createDestinationPanel(e){const t=document.createElement("section"),n=e.name;return t.innerHTML=`\n            <h2 class="js-destination-name u-keyword u-py-300 u-fs-1000">${n}</h2>\n            <p class="js-destination-desc">${e.description}</p>\n            <dl class="c-tabs__panel__details">\n                <div>\n                    <dt class="u-text-uppercase u-fs-400 u-pb-200">avg. distance</dt>\n                    <dd class="u-keyword u-fs-700">${e.distance}</dd>\n                </div>\n                <div>\n                    <dt class="u-text-uppercase u-fs-400 u-pb-200">Est. travel time</dt>\n                    <dd class="u-keyword u-fs-700">${e.travel}</dd>\n                </div>\n            </dl>\n        `,t}function createCrewMemberPanel(e){const t=document.createElement("div");return t.innerHTML=`\n        <dl>\n            <dt class="u-text-uppercase u-text-neu-200 u-fs-700 u-ff-sec">${e.role}</dt>\n            <dd>\n                <b class="u-keyword u-fs-900 u-pt-200 u-pb-400">${e.name}</b>\n                ${e.bio}\n            </dd>\n        </dl>\n        `,t}function createTermPanel(e){const t=document.createElement("dl");return t.innerHTML=`\n        <dl>\n            <dt class="u-text-uppercase u-text-neu-100 u-fs-900 u-ff-sec">${e.name}</dt>\n            <dd>${e.description}</dd>\n        </dl>\n        `,t}function addLinkInteractivity(){this.link.addEventListener("click",(e=>{e.preventDefault(),this.show()})),this.link.addEventListener("keydown",(e=>{const t=Tabs.length,n=Tabs.indexOf(this);keyPressed(e,"ArrowRight")?n===t-1?Tabs[0].link.focus():Tabs[n+1].link.focus():keyPressed(e,"ArrowLeft")?0===n?Tabs[t-1].link.focus():Tabs[n-1].link.focus():keyPressed(e,"Home")?Tabs[0].link.focus():keyPressed(e,"End")?Tabs[t-1].link.focus():keyPressed(e,"Tab")&&(e.preventDefault(),this.show())}))}function addPanelProperties(e,t){e.className="c-tabs__panel js-tab-panel",e.role="tabpanel",e.tabIndex=0;const n=formatValue(t);e.id=n+"-panel",e.setAttribute("aria-describedby",n+"-tab")}tabsContainer&&(panelsContainer=tabsContainer.querySelector(".js-panels"),tabsImgsContainer=tabsContainer.querySelector(".js-tabs-imgs"),tabList=tabsContainer.querySelector(".js-tablist"),tabsContainer.setAttribute("data-js-enabled","true"),tabList.role="tablist",tabList.setAttribute("aria-describedby","tablist-usage-hint"),currentPage=tabsContainer.getAttribute("data-page"),panelsContainer.innerHTML="",tabList.innerHTML="",handleTabsCreation());