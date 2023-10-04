import { URLs, requests } from "../../api";
import { Response } from "../../models";
import { getNotificationMessage, isValidUrl } from "../../utils";
import { Constants } from "../../constants";

// ANCHOR - APIs
const attachmentUrl = URLs.MAIN.ATTACHMENT;
const { MESSAGES: messages } = Constants;

const attachmentApis = {
    downloadFile: async (fileUUID: string) =>
        await requests.get<string>(`${attachmentUrl}/download/${fileUUID}`),
};

// ANCHOR - Utility functions
export const downloadAttachment = async (fileUUID: string): Promise<Response> => {
    const result = new Response();
    const errorMessage = getNotificationMessage("error", "Unable to download file.");
    if (!fileUUID) {
        result.message = errorMessage;
        return result;
    }
    const S3uRL: string = await attachmentApis.downloadFile(fileUUID);
    if (S3uRL && isValidUrl(S3uRL)) {
        // Check if file can be downloaded
        if (S3uRL.includes("http:")) {
            // Open File in Browser incase of Http
            window.open(S3uRL, "_blank");
            result.message = getNotificationMessage("info", messages.FILE_OPENED);
            return result;
        }
        try {
            const fetchResponse = await fetch(S3uRL, { method: "GET", redirect: "follow" });
            if (fetchResponse.ok) {
                result.data = fetchResponse.url;
                window.open(S3uRL, "_blank");
            } else if (fetchResponse.status === 403) {
                result.message = getNotificationMessage("error", messages.ACCESS_DENIED);
            } else {
                result.message = errorMessage;
            }
        } catch (e) {
            result.message = errorMessage;
        }
    } else {
        result.message = errorMessage;
    }
    return result;
};
