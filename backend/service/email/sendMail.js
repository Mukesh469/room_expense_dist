import { transporter } from "./transporter.js"

export const sendMail = async ({ to, subject, html }) => {
    const mailOptions = {
        from: `"Room_expense_dist" <${process.env.EMAIL_APP_USER}`,
        to,
        subject,
        html
    }

    await transporter.sendMail(mailOptions)
}