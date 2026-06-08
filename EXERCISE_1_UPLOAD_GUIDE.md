# Exercise 1: Project Management - Upload Original Document

## Overview

To view the **original Project Management.docx document** with full formatting, images, highlights, and fonts in the web browser, you need to upload the actual .docx file.

## Why Upload is Required

Web browsers cannot directly display .docx files with all their original formatting because:
- .docx is a proprietary Microsoft Word format
- It contains complex formatting, embedded images, styles, and fonts
- Browsers need special viewers to render these files properly

## Solution: Google Docs Viewer

We use **Google Docs Viewer** to display .docx files in the browser, which preserves:
- ✅ All text formatting (bold, italic, underline, colors)
- ✅ Images and graphics
- ✅ Tables and charts
- ✅ Fonts and styles
- ✅ Highlights and annotations
- ✅ Page layout

## Step-by-Step Instructions

### Step 1: Navigate to Assignments Page

Open your browser and go to:
```
http://localhost:8080/assignments.html
```

Or click "Assignments" in the navigation menu.

### Step 2: Click "Exercise 1: Project Management"

Find the assignment card titled **"Exercise 1: Project Management"** in the list.

### Step 3: Click on the File Name

In the assignment details, you'll see:
```
Attached File: Project Management.docx (Original document with full formatting, images, and highlights)
```

Click on the filename **"Project Management.docx"** or the file icon.

### Step 4: Upload the Original Document

A file selection dialog will appear. Navigate to where you saved `Project Management.docx` and select it.

**Supported formats:**
- `.docx` (recommended)
- `.doc` (older Word format)

### Step 5: Wait for Processing

The system will:
1. Convert the file to base64 encoding
2. Save it to localStorage
3. Update the assignment
4. Attempt to sync to GitHub (if configured)

You'll see a notification: **"✅ Exercise 1 updated with original document!"**

### Step 6: View the Document

After upload, click on the filename again to preview the document.

The document will open in an embedded viewer showing:
- Full formatting preserved
- All images displayed
- Original fonts and styles
- Complete page layout

## Preview Features

### Online Viewing
- **Viewer**: Google Docs Viewer (embedded iframe)
- **Size**: Full-width, 600px height
- **Features**: Zoom, scroll, navigate pages
- **Compatibility**: Works in all modern browsers

### Download Option
Below the preview, you'll see:
```
💡 Tip: If the preview doesn't load properly, you can download the file to view it locally with full formatting.

[📥 Download Original Document]
```

Click this button to:
- Save the .docx file to your computer
- Open it in Microsoft Word or compatible software
- View with 100% fidelity

## Troubleshooting

### Issue: Preview doesn't load
**Possible causes:**
1. No internet connection (Google Docs Viewer requires internet)
2. Browser blocks iframes
3. File is corrupted

**Solutions:**
- Check your internet connection
- Try a different browser (Chrome, Firefox, Edge)
- Download the file and open locally

### Issue: Images not showing in preview
**Solution:**
- Download the file and open in Microsoft Word
- Google Docs Viewer may have limitations with certain image formats

### Issue: Formatting looks different
**Explanation:**
- Some advanced Word features may not render perfectly in web viewers
- For 100% accurate viewing, download and open in Microsoft Word

### Issue: File too large
**Limitations:**
- Maximum file size: 50MB per file
- Large files with many images may take longer to process

## GitHub Synchronization

If you have GitHub configured, the uploaded .docx file will automatically sync to your repository:

1. **File location**: `assignments/{assignmentId}/Project Management.docx`
2. **Metadata**: `assignments/{assignmentId}.json`
3. **Sync status**: Shows in assignment card

To configure GitHub:
1. Click "⚙️ GitHub Config" button
2. Enter your GitHub username, repository name, and Personal Access Token
3. Save configuration

## Technical Details

### File Storage
- Files are stored as Base64-encoded data URLs in localStorage
- Format: `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,...`
- Size limit: Depends on browser's localStorage capacity (typically 5-10MB)

### Viewer Technology
- **Primary**: Google Docs Viewer (`https://docs.google.com/gview`)
- **Fallback**: Direct download for local viewing
- **Advantages**: Better image support than Microsoft Office Online Viewer

### Data Structure
```javascript
{
  id: 1234567890,
  title: "Exercise 1: Project Management",
  description: "...",
  files: [
    {
      name: "Project Management.docx",
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      size: 123456,
      data: "data:application/...;base64,UEsDBBQ..." // Full file content
    }
  ]
}
```

## Best Practices

1. **Upload once**: After uploading, the file is saved permanently (until cache is cleared)
2. **Use original file**: Always upload the original .docx, not a converted version
3. **Check preview**: Verify that images and formatting appear correctly
4. **Download backup**: Keep a local copy of the original file
5. **GitHub sync**: Enable GitHub sync for cloud backup

## Alternative Methods

If Google Docs Viewer doesn't work well for your document, you can:

### Method 1: Convert to PDF
1. Open .docx in Microsoft Word
2. Save as PDF
3. Upload the PDF instead
4. PDF viewers have better browser support

### Method 2: Export as HTML
1. Open .docx in Microsoft Word
2. Save as Web Page (.html)
3. This creates an HTML file with images in a folder
4. More complex but preserves formatting

### Method 3: Screenshots
1. Take screenshots of important pages
2. Upload as images
3. Good for reference but not editable

## Support

If you encounter issues:
1. Check browser console for errors (F12)
2. Try clearing browser cache
3. Test in a different browser
4. Ensure file is not corrupted
5. Contact support with error messages

---

**Note**: This feature requires the actual .docx file to be uploaded. The system cannot automatically extract it from attached documents without user action due to browser security restrictions.
