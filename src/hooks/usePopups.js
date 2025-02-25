import { useContext } from "react";
import { popupsContext } from "@context/context";
import { setData } from "@utils/localStorage";

export default function usePopups() {
    const { popups, setPopups } = useContext(popupsContext);
    const { on, allPopups } = popups;

    function setPopupState(value) {
        setPopups({ ...popups, on: value });
        setData("popups", value);
    }

    function addPopup(content, color) {
        if (on) {
            setPopups({
                ...popups,
                allPopups: [
                    ...allPopups,
                    { content: content, color: color || "var(--main-color)" },
                ],
            });
        }
    }

    function removePopup() {
        setTimeout(
            () => setPopups({ ...popups, allPopups: allPopups.slice(1) }),
            310
        );
    }

    return {
        currentPopup: allPopups[0],
        popupState: on,
        addPopup,
        removePopup,
        setPopupState,
    };
}
