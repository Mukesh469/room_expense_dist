import { sendMail } from "./sendMail.js";
import { inviteTemplate } from "./template.js";

export const sendInviteMail = async ({ to, roomName, token, ownerName }) => {
    await sendMail({
        to,
        subject: "Room invite ",
        html: inviteTemplate( roomName, token, ownerName )
    })
}