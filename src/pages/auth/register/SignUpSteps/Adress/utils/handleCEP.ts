import { ViaCEP } from "../../../../../../utils/apis/viaCEP";
import { FocusEvent, SetStateAction } from "react";

export async function handleCEP(e: FocusEvent<HTMLInputElement, Element>, setAdress: any) {
    const CEP = e.currentTarget.value.replace(/\-/g, "");

    if (/^\d{8}$/.test(CEP)) {
        setAdress(await ViaCEP.getAdress(e.currentTarget.value));
        return;
    }

    setAdress(null);
}
