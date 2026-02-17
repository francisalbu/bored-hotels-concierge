# Google Sheets Integration Setup

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "BORED Demo Requests"
4. In the first row, add these headers:
   - Column A: `Name`
   - Column B: `Property Name`
   - Column C: `Email`
   - Column D: `Timestamp`
   - Column E: `ID`

## Step 2: Create Google Apps Script

1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Delete any code in the editor
3. Paste this code:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Add new row with data
    sheet.appendRow([
      data.name,
      data.propertyName,
      data.email,
      data.timestamp,
      data.id
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Data added successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Save** (💾 icon)
5. Name your project (e.g., "BORED Form Handler")

## Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon (⚙️) next to "Select type"
3. Choose **Web app**
4. Configure:
   - **Description**: "BORED Demo Form"
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click **Deploy**
6. **Copy the Web App URL** (it will look like: `https://script.google.com/macros/s/...`)
7. Click **Done**

## Step 4: Update Your React App

1. Open `App.tsx`
2. Find this line (around line 420):
   ```typescript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
   ```
3. Replace `'YOUR_GOOGLE_SCRIPT_URL_HERE'` with your actual Web App URL:
   ```typescript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_ACTUAL_URL/exec';
   ```

## Step 5: Test

1. Fill out the form on your website
2. Click "Book a Demo"
3. Check your Google Sheet - a new row should appear with the data!

## Important Notes

- **Data is also saved locally** in the browser's localStorage as a backup
- The form uses `mode: 'no-cors'` to avoid CORS issues
- If the Google Sheets integration fails, data is still saved locally
- You can view local data in the browser console: 
  ```javascript
  JSON.parse(localStorage.getItem('boredDemoRequests'))
  ```

## Optional: Add Email Notifications

To receive email notifications when someone submits the form, add this to your Google Apps Script:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Add new row with data
    sheet.appendRow([
      data.name,
      data.propertyName,
      data.email,
      data.timestamp,
      data.id
    ]);
    
    // Send email notification
    MailApp.sendEmail({
      to: 'your-email@example.com',  // Change this to your email
      subject: 'New BORED Demo Request',
      body: `
New demo request received:

Name: ${data.name}
Property: ${data.propertyName}
Email: ${data.email}
Time: ${new Date(data.timestamp).toLocaleString()}
      `
    });
    
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Data added successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Troubleshooting

If the form submission isn't working:

1. Make sure you deployed the script as a **Web app** (not just saved it)
2. Check that "Who has access" is set to **Anyone**
3. Verify the URL in `App.tsx` matches your Web App URL exactly
4. Look in the browser console (F12) for any error messages
5. Check your Google Sheet to see if data is being added

Need help? Check the data saved locally in localStorage to ensure the form is working on the frontend.
