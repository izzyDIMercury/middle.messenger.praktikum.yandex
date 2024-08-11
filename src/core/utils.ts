import SettingsController from "../controllers/settings.ts";
import Chat from "../controllers/chat.ts";
// import { GlobalStore } from "../store.ts";

export function switchPage(event: MouseEvent | null, page: string) {
    if (event instanceof MouseEvent) {
        const targetElement = event.target as unknown as HTMLElement;
        const nextPage = page || targetElement.getAttribute("page");

        document.dispatchEvent(new CustomEvent("switchPage", {
            detail: {
                page: nextPage
            }
        }));
    } else {

        document.dispatchEvent(new CustomEvent("switchPage", {
            detail: {
                page: page
            }
        }));
    }
}

export function isEqual(object1: any, object2: any): boolean {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
        const val1 = object1[key];
        const val2 = object2[key];
        const areObjects = isObject(val1) && isObject(val2);
        if (areObjects && !isEqual(val1, val2) || !areObjects && val1 !== val2) {
            return false;
        }
    }

    return true;
}

function isObject(object: any): boolean {
    return object != null && typeof object === "object";
}

export async function fillUserInfo(page: string) {
    const controller = new SettingsController();
    const response = await controller.getUserInfo() as { response: string };
    const result = JSON.parse(response.response);
    //@ts-expect-error can't properly type window.store
    window.store.setState({ userInfo: result });
    setImageLink(result);
    if (page === "settings") {
        infoSettingsPage(result);
    } else if (page === "change-profile") {
        infoProfileDataPage(result);
    }
}

function setImageLink(result: object) {
    const image = Object.entries(result).filter((prop) => prop[0] === "avatar")[0][1];
    const imageLink = "https://ya-praktikum.tech/api/v2/resources/" + image;
    //@ts-expect-error can't properly type window.store
    window.store.setState({ imageLink })
}

function infoSettingsPage(result: object) {
    const title = document.querySelector(".profile-page__title") as HTMLTitleElement;
    if (title) {
        title.textContent = Object.entries(result).filter((prop) => prop[0] === "first_name")[0][1] as string;
    }
    Object.entries(result).forEach(([key, value]) => {
        const element = document.querySelector(`p[name=${key}]`) as HTMLTitleElement;
        if (element !== null) {
            element.textContent = value as string;
        }
    })
}

function infoProfileDataPage(result: object) {
    Object.entries(result).forEach(([key, value]) => {
        const element = document.querySelector(`input[name=${key}]`) as HTMLInputElement;
        if (element !== null) {
            if (element.name !== "avatar") {
                element.value = value as string;
            }
        }
    })
}



export async function searchUsers(event: InputEvent): Promise<void> {
    event.preventDefault();
    const inputElement = event.target as unknown as HTMLInputElement;
    const controller = new Chat();
    const response = await controller.searchUsers(inputElement.value);
    const result = JSON.parse(response.response);
    //@ts-expect-error can't properly type window.store
    window.store.setState({ 
        usersFound: result
    })
}
