import { S } from "/modules/Delusoire/std/index.js";
import Status from "./Status.js";
export const useStatus = ({ status, error, logger }) => {
    switch (status) {
        case "pending": {
            return S.React.createElement(Status, { icon: "library", heading: "Loading", subheading: "This operation is taking longer than expected." });
        }
        case "error": {
            logger.error(error);
            return S.React.createElement(Status, { icon: "error", heading: "Problem occured", subheading: "Please make sure that all your settings are valid." });
        }
    }
};
