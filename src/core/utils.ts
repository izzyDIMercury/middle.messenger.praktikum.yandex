import SettingsController from "../controllers/settings.ts";
import Chat from "../controllers/chat.ts";

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
    const response = await controller.getUserInfo();
    const result = JSON.parse(response.response);
    if (page === "settings") {
        infoSettingsPage(result);
    } else if (page === "change-profile") {
        infoProfileDataPage(result);
    } else if (page === "change-password") {
        infoPasswordPage(result);
    }
}

function infoSettingsPage(result) {
    const title = document.querySelector(".profile-page__title") as HTMLTitleElement;
    title.textContent = Object.entries(result).filter((prop) => prop[0] === "first_name")[0][1] as string;
    Object.entries(result).forEach(([key, value]) => {
        const element = document.querySelector(`p[name=${key}]`) as HTMLTitleElement;
        if (element !== null) {
            element.textContent = value as string;
        }
    })
    const image = Object.entries(result).filter((prop) => prop[0] === "avatar")[0][1];
    const imageLink = "https://ya-praktikum.tech/api/v2/resources/" + image;
    window.store.setState({ imageLink })
}

function infoProfileDataPage(result) {
    Object.entries(result).forEach(([key, value]) => {
        const element = document.querySelector(`input[name=${key}]`) as HTMLTitleElement;
        if (element !== null && element.name !== "avatar") {
            // console.log(element, value);
            element.value = value as string;
        }
    })
    const image = Object.entries(result).filter((prop) => prop[0] === "avatar")[0][1];
    const imageLink = "https://ya-praktikum.tech/api/v2/resources/" + image;
    window.store.setState({ imageLink })
}

function infoPasswordPage(result) {
    const image = Object.entries(result).filter((prop) => prop[0] === "avatar")[0][1];
    const imageLink = "https://ya-praktikum.tech/api/v2/resources/" + image;
    window.store.setState({ imageLink })
}


export async function searchUsers(event: InputEvent): object[] {
    const inputElement = event.target as unknown as HTMLInputElement;
    const controller = new Chat();
    const response = await controller.searchUsers(inputElement.value);
    const users = JSON.parse(response.response);
    console.log(users);
    // window.store.setState({
    //     searchUsers: {
    //         searchInput: inputElement.value,
    //         usersList: users,
    //         usersFound: true
    //     }
    // });
    window.store.setState({ isLoading: true })
    setTimeout(() => {
        window.store.setState({ isLoading: false })
    }, 1000);
    // console.log(users);
}
