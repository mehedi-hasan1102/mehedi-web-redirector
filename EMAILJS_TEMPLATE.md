# EmailJS Template for Contact Form

This template is designed for your booking/contact modal form which collects **email** and **message**.

## Template Variables Used:
- `{{email}}` - Sender's email address
- `{{message}}` - Message content
- `{{time}}` - Submission timestamp (sent automatically)

## HTML Template:

```html
<div style="font-family: system-ui, sans-serif, Arial; font-size: 12px">
  <div>A message from {{email}} has been received. Kindly respond at your earliest convenience.</div>
  <div
    style="
      margin-top: 20px;
      padding: 15px 0;
      border-width: 1px 0;
      border-style: dashed;
      border-color: lightgrey;
    "
  >
    <table role="presentation">
      <tr>
        <td style="vertical-align: top">
          <div
            style="
              padding: 6px 10px;
              margin: 0 10px;
              background-color: aliceblue;
              border-radius: 5px;
              font-size: 26px;
            "
            role="img"
          >
            ✉️
          </div>
        </td>
        <td style="vertical-align: top">
          <div style="color: #2c3e50; font-size: 16px">
            <strong>{{email}}</strong>
          </div>
          <div style="color: #cccccc; font-size: 13px">{{time}}</div>
          <p style="font-size: 16px; line-height: 1.6; color: #34495e">{{message}}</p>
        </td>
      </tr>
    </table>
  </div>
</div>
```

## Setup Instructions:

1. **Go to EmailJS Dashboard:** https://dashboard.emailjs.com
2. **Create/Edit Email Template:**
   - Click **Email Templates**
   - Create New Template or Edit existing one
   - Copy the HTML template above into the **Content** field
   - Make sure template variables match: `{{email}}`, `{{message}}`, `{{time}}`

3. **Copy your Template ID** from the template settings

4. **Update `.env.local`:**
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_o3qo36f
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_z368suy
   NEXT_PUBLIC_EMAILJS_USER_ID=UFLgRUB3KBnkwrw5_
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
   ```

## Form Fields Mapping:
- `<input name="email" />` → `{{email}}`
- `<textarea name="message" />` → `{{message}}`
- `<input name="time" />` → `{{time}}`

The hidden `time` input is automatically added in BookingModal.tsx:
```tsx
<input type="hidden" name="time" value={new Date().toLocaleString()} />
```

## Testing:
1. Fill the form with email and message
2. Submit the form
3. Check your email inbox for the formatted message
