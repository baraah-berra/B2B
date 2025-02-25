import { useCallback, useEffect, useRef } from "react";
import "./Popup.css";
import usePopups from "@hooks/usePopups";

export default function Popup() {
    const { currentPopup, removePopup } = usePopups();
    const popupRef = useRef();
    const hidePopup = useCallback(() => {
        popupRef.current?.classList.remove("show");
        removePopup();
    }, [removePopup]);

    useEffect(() => {
        if (currentPopup) {
            const interval = setInterval(hidePopup, 2500);
            setTimeout(() => popupRef.current?.classList.add("show"), 100);
            return () => clearInterval(interval);
        }
    }, [currentPopup, hidePopup]);

    return (
        <div
            onClick={hidePopup}
            className="popup"
            ref={popupRef}
            style={{ backgroundColor: currentPopup?.color }}
        >
            {currentPopup?.content}
        </div>
    );
}
