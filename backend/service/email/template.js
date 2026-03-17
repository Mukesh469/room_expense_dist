import { baseMail } from "./baseMail.js";
export const inviteTemplate = (roomName, token, ownerName) => baseMail(
    `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9;">
            <h2 style="color: #333;">📩 Room Invitation</h2>

            <p style="font-size: 16px; color: #555;">
                You have been invited to join the room 
                <strong style="color:#222;">${roomName}</strong> by 
                <strong style="color:#007bff;">${ownerName}</strong>.
            </p>

            <p style="font-size: 15px; color: #555; margin: 20px 0;">
                Click the button below to accept or reject the invitation:
            </p>

            <a href="${process.env.FRONTEND_INVITE_URL}/invite?inviteToken=${token}" 
               style="display: inline-block; padding: 12px 20px; background: #007bff; color: #fff; text-decoration: none; border-radius: 6px; font-size: 16px;">
               View Invitation
            </a>

            <p style="margin-top: 20px; color: #888; font-size: 14px;">
                This invitation link will expire in 24 hours.
            </p>
        </div>
    `
)
