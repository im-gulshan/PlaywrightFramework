export class Locators {
    public ByAttribute(
        tag: string = "",
        attribute: string = "",
        inputString: string = "",
        elementStatus: string = ""

    ) {
        if (elementStatus === "disabled")
            return `//${tag}[@${attribute}='${inputString}'][@disabled]`;
        else return `//${tag}[@${attribute}='${inputString}']`;
    }

    public ByContains(
        tag: string = "",
        attribute: string = "",
        inputString: string = ""
    ){
        if(attribute === "text")
            return `//${tag}[contains(${attribute}(), '${inputString}')]`;
        else return `//${tag}[contains(@${attribute}, '${inputString}')]`;
    }


} // Locators
