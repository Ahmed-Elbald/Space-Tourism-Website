// Interfaces
export interface tabInterface {

    name: string,
    link: HTMLAnchorElement,
    panel: HTMLElement,
    imgs: HTMLImageElement[],

    init: (tabData: tabData) => void;
    createLink: () => void;
    createPanel: (tabData: tabData) => void;
    createImgs: (tabData: tabData) => void;

    show: () => void;

}

export interface tabData {

    name: string,
    description: string,
    role?: string,
    bio?: string,
    distance?: string,
    travel?: string,
    images: {
        png?: string,
        webp?: string,
        landscape?: string,
        portrait?: string,
    },

}