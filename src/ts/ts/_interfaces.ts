// Interfaces
export interface ITab {

    name: string,
    link: HTMLAnchorElement,
    panel: HTMLElement,
    imgs: HTMLImageElement[],

    init: (tabData: ITabData) => void;
    createLink: () => void;
    createPanel: (tabData: ITabData) => void;
    createImgs: (tabData: ITabData) => void;

    show: () => void;

}

export interface ITabData {

    name: string,
    description: string,
    images: {
        png?: string,
        webp?: string,
        landscape?: string,
        portrait?: string,
    },

}

export interface IDestinationTabData extends ITabData {
    distance: string,
    travel: string,
}

export interface ICrewTabData extends ITabData {
    role: string,
    bio: string,
}