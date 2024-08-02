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
