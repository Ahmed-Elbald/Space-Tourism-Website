// Imports
import { formatValue, keyPressed } from "./../base/helpers.js";

import { ITab, ITabData, IDestinationTabData, ICrewTabData } from "../ts/_interfaces.js";

// Global Variables
let currentPage: string;
const Tabs: Tab[] = [];

// Classes
class Tab implements ITab {

    // A counter for the tabs
    static currentTab = 0;

    // Public propertis
    public name: string;
    public link!: HTMLAnchorElement;
    public panel!: HTMLElement;
    public imgs!: HTMLImageElement[];

    // Public Methods
    public createLink!: () => void;
    public createPanel!: (tabData: ITabData) => void;
    public createImgs!: (tabData: ITabData) => void;
    public show!: () => void;

    constructor(tabData: ITabData) {

        // Set object properties
        this.name = tabData["name"];
        this.imgs = [];

        // Initialize the object
        this.init(tabData);

    };

    init(tabData: ITabData) {

        // Create the tab's associated elements
        this.createLink();
        this.createPanel(tabData);
        this.createImgs(tabData);

        // If it's the first tab, select it
        if (Tab.currentTab === 0)
            this.show();

        Tab.currentTab++;

    }

}

Tab.prototype.createLink = function () {

    const foramttedName = formatValue(this.name);

    // Create the "li" that will contain the link
    const tablistItem = document.createElement("li");
    tablistItem.role = "presentation";

    // Create the link
    const tabLink = document.createElement("a");

    // Add link attributes
    tabLink.className = "c-tabs__link";

    tabLink.role = "tab";
    tabLink.tabIndex = -1;
    tabLink.ariaSelected = "false";
    tabLink.setAttribute("aria-controls", `${foramttedName}-panel`);
    tabLink.setAttribute("aria-expanded", "false");

    tabLink.href = `#${foramttedName}-panel`;
    tabLink.id = `${foramttedName}-tab`;

    // Insert link markup
    tabLink.innerHTML =
        currentPage === "destinations"
            ? this.name
            : `<span class="u-sr-only">${this.name}</span>`;

    // Append the link to the tablist
    tablistItem.append(tabLink);
    tabList?.append(tablistItem);

    // Associate the link with its Tab object
    this.link = tabLink;

    // When the link is clicked, show the corresponding tab
    addLinkInteractivity.call(this)

}

Tab.prototype.createPanel = function (tabData: ITabData | IDestinationTabData | ICrewTabData) {

    let panel: any;

    if (currentPage === "destinations")
        panel = createDestinationPanel(tabData as IDestinationTabData);
    else if (currentPage === "crew")
        panel = createCrewMemberPanel(tabData as ICrewTabData)
    else
        panel = createTermPanel(tabData)

    addPanelProperties(panel, this.name);
    panelsContainer?.append(panel);

    this.panel = panel;

}

Tab.prototype.createImgs = function (tabData: ITabData) {

    const img = document.createElement("img");
    img.alt = "";

    const tabImgs = tabData["images"]

    if (currentPage === "technology") {

        const landscapeImg = img.cloneNode(true) as HTMLImageElement;
        const portraitImg = img.cloneNode(true) as HTMLImageElement;

        landscapeImg.setAttribute("data-view", "landscape");
        landscapeImg.src = tabImgs["landscape"]!;

        portraitImg.setAttribute("data-view", "portrait");
        portraitImg.src = tabImgs["portrait"]!;

        this.imgs?.push(landscapeImg, portraitImg);

    } else {

        const webpImg = img.cloneNode(true) as HTMLImageElement;
        webpImg.src = tabImgs["webp"]!;

        this.imgs?.push(webpImg)

    }

    this.imgs?.forEach(img => tabsImgsContainer?.append(img));

}

Tab.prototype.show = function () {

    Tabs.forEach(tab => {

        tab.link!.setAttribute("aria-selected", "false");
        tab.link!.setAttribute("aria-expanded", "false");

        tab.panel!.classList.remove("js-show-up");

        tab.imgs!.forEach(img => img.classList.remove("js-show-up"));

    });

    this.link!.setAttribute("aria-selected", "true");
    this.link!.setAttribute("aria-expanded", "true");

    this.panel!.classList.add("js-show-up");
    this.panel!.focus({ preventScroll: true });

    this.imgs!.forEach(img => img.classList.add("js-show-up"));

}

// Elements
const tabsContainer = document.querySelector(".js-tabs");
let panelsContainer: HTMLElement | null;
let tabsImgsContainer: HTMLElement | null
let tabList: HTMLElement | null;

// Functions
(function init() {

    if (tabsContainer) {

        panelsContainer = tabsContainer.querySelector(".js-panels");
        tabsImgsContainer = tabsContainer.querySelector(".js-tabs-imgs")
        tabList = tabsContainer.querySelector(".js-tablist");

        // Set the "data-js-enabled" attribute to true => Change styles (Progressive Enhancement)
        tabsContainer!.setAttribute("data-js-enabled", "true");

        tabList!.role = "tablist"
        tabList!.tabIndex = 0;
        tabList!.setAttribute("aria-describedby", "tablist-usage-hint");
        tabList?.addEventListener("focus", () => Tabs[0].link.focus({ preventScroll: true }))

        // Get the name of the current page
        currentPage = tabsContainer!.getAttribute("data-page") as string;

        // Empty Elements
        panelsContainer!.innerHTML = "";
        tabList!.innerHTML = "";

        // Create Tabs
        handleTabsCreation();

    }

})();

async function handleTabsCreation() {

    const tabsData: ITabData[] = await getTabsDate();
    tabsData.forEach(tabData => Tabs.push(new Tab(tabData)))

}

async function getTabsDate() {

    return fetch("./assets/data/data.json")
        .then(data => data.json())
        .then(tabs => tabs[currentPage]);

}

function createDestinationPanel(tabData: IDestinationTabData) {

    const destinationPanel = document.createElement("section");
    const tabName = tabData["name"];

    destinationPanel.innerHTML =
        `
            <h2 class="u-keyword u-py-300 u-fs-1000">${tabName}</h2>
            <p>${tabData["description"]}</p>
            <dl class="c-tabs__panel__details">
                <div>
                    <dt class="u-text-uppercase u-fs-400 u-pb-200">avg. distance</dt>
                    <dd class="u-keyword u-fs-700">${tabData["distance"]}</dd>
                </div>
                <div>
                    <dt class="u-text-uppercase u-fs-400 u-pb-200">Est. travel time</dt>
                    <dd class="u-keyword u-fs-700">${tabData["travel"]}</dd>
                </div>
            </dl>
        `

    return destinationPanel;


}

function createCrewMemberPanel(tabData: ICrewTabData) {

    const crewMemberPanel = document.createElement("div");

    crewMemberPanel.innerHTML =
        `
        <dl>
            <dt class="u-text-uppercase u-text-neu-200 u-fs-700 u-ff-sec">${tabData["role"]}</dt>
            <dd>
                <b class="u-keyword u-fs-900 u-pt-200 u-pb-400">${tabData["name"]}</b>
                ${tabData["bio"]}
            </dd>
        </dl>
        `

    return crewMemberPanel;

}

function createTermPanel(tabData: ITabData) {

    const crewMemberPanel = document.createElement("dl");

    crewMemberPanel.innerHTML =
        `
        <dl>
            <dt class="u-text-uppercase u-text-neu-100 u-fs-900 u-ff-sec">${tabData["name"]}</dt>
            <dd>${tabData["description"]}</dd>
        </dl>
        `

    return crewMemberPanel;

}

function addLinkInteractivity(this: Tab) {

    // If the link is clicked, show the corresponding tab panel
    this.link.addEventListener("click", (clickEvent: MouseEvent) => {

        clickEvent.preventDefault();
        this.show();

    });

    // If the link is focused, listen for the keydown event
    this.link.addEventListener("keydown", (keydownEvent: KeyboardEvent) => {

        const numberOfTabs = Tabs.length;
        const currentTabIndex = Tabs.indexOf(this);

        tabList!.tabIndex = -1;

        // If the arrow right key was pressed
        if (keyPressed(keydownEvent, "ArrowRight")) {

            // If it's the last link in the tablist,
            // Move focus to the first link
            if (currentTabIndex === numberOfTabs - 1)
                Tabs[0].link.focus({ preventScroll: true });

            // Otherwise, move focus to the next link
            else
                Tabs[currentTabIndex + 1].link.focus({ preventScroll: true });

            // If the arrow left key was pressed
        } else if (keyPressed(keydownEvent, "ArrowLeft")) {

            // If it's the first link in the tablist,
            // Move focus to the last link
            if (currentTabIndex === 0)
                Tabs[numberOfTabs - 1].link.focus({ preventScroll: true });

            // Otherwise, move focus to the previous link
            else
                Tabs[currentTabIndex - 1].link.focus({ preventScroll: true });

        }
        // If the Home key was pressed
        else if (keyPressed(keydownEvent, "Home"))
            Tabs[0].link.focus({ preventScroll: true });

        // If the End key was pressed
        else if (keyPressed(keydownEvent, "End"))
            Tabs[numberOfTabs - 1].link.focus({ preventScroll: true });

        // If the tab key was pressed
        else if (keyPressed(keydownEvent, "Tab")) {

            // Show the corresponding tab panel
            if (!keydownEvent.shiftKey) {
                keydownEvent.preventDefault();
                this.show();
            }

        }

        setTimeout(() => tabList!.tabIndex = 0, 0)

    });

}

function addPanelProperties(panel: HTMLElement, tabName: string) {

    panel.className = "c-tabs__panel";
    panel.role = "tabpanel";
    panel.tabIndex = 0;

    const foramttedName = formatValue(tabName);
    panel.id = foramttedName + "-panel";
    panel.setAttribute("aria-describedby", foramttedName + "-tab");

}