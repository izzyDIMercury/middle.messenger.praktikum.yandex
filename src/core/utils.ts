

export function switchPage(event: MouseEvent | null, page: string) {
    if (event instanceof MouseEvent) {
        console.log("works");
        const targetElement = event.target as unknown as HTMLElement;
        const nextPage = page || targetElement.getAttribute("page");

        document.dispatchEvent(new CustomEvent("switchPage", {
            detail: {
                page: nextPage,
            },
        }));
    } else {
        document.dispatchEvent(new CustomEvent("switchPage", {
            detail: {
                page: page,
            },
        }));
    }
}
