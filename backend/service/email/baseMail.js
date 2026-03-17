// services/email/baseMail.js
export const baseMail = (content, title = "Room Expense Distributor") => {
  return `
    <div style="margin:0; padding:0; background:#f4f6f8; width:100%; font-family: Arial, sans-serif;">
      <table width="100%" border="0" cellpadding="0" cellspacing="0" 
             style="max-width:650px; margin:auto; background:#ffffff; border-radius:10px; 
             box-shadow:0 4px 15px rgba(0,0,0,0.08); overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="background:#1a73e8; padding:20px 30px; text-align:center;">
            <h1 style="margin:0; color:#ffffff; font-size:24px; letter-spacing:0.5px;">
              ${title}
            </h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:30px; color:#333333; font-size:15px; line-height:1.6;">
            ${content}
          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td style="border-top:1px solid #e6e6e6;"></td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 30px; text-align:center; font-size:12px; color:#888888;">
            <div style="margin-bottom:8px;">
              Visit our website:
              <a href="https://roomexpensedist.com" target="_blank" style="color:#1a73e8; text-decoration:none;">
                roomexpensedist.com
              </a>
            </div>

            <div>
              Follow us:
              <a href="https://facebook.com/roomexpensedist" target="_blank" style="color:#3b5998; text-decoration:none; margin:0 6px;">Facebook</a> |
              <a href="https://twitter.com/roomexpensedist" target="_blank" style="color:#1da1f2; text-decoration:none; margin:0 6px;">Twitter</a> |
              <a href="https://instagram.com/roomexpensedist" target="_blank" style="color:#e4405f; text-decoration:none; margin:0 6px;">Instagram</a>
            </div>
          </td>
        </tr>

      </table>
    </div>
  `;
};
