# Exercise 1: Project Management - User Guide

## Overview

Exercise 1: Project Management has been **automatically created** and added to the Assignments page. The assignment includes the complete content from the Project Management document.

## Automatic Creation

### How It Works

When you visit the **Assignments page**, the system automatically checks if "Exercise 1: Project Management" exists:

- ✅ **If it doesn't exist**: The system automatically creates it with all content embedded
- ✅ **If it already exists**: No duplicate is created (safe to reload page)

### What's Included

The auto-created assignment contains:

1. **Title**: Exercise 1: Project Management
2. **Full Description**: Complete website development guide including:
   - Preparation tools (GitHub, GitHub Desktop, TONGYI Lingma)
   - Step-by-step instructions for creating a repository
   - GitHub Pages configuration
   - Repository cloning process
   - AI-assisted website design
   - Upload instructions
3. **Attached File**: `Project_Management_Guide.txt` - Contains the full document content in text format
4. **Status**: Automatically set to "Submitted"
5. **Submitter**: All Members
6. **Deadline**: Current date

## Viewing the Assignment

### Method 1: Automatic Display

Simply visit the Assignments page:
- URL: http://localhost:8080/assignments.html
- Exercise 1 will appear at the top of the assignment list

### Method 2: Manual Creation (if needed)

If for some reason the assignment wasn't auto-created:

1. Click the "📄 Create Exercise 1" button
   - Location: Top action bar, between "⚙️ GitHub Config" and "+ New Assignment"
   - Style: Purple gradient background
2. The assignment will be created immediately

## File Preview Features

### Text File Preview

The attached `Project_Management_Guide.txt` file can be:

1. **Viewed Inline**: Click on the filename to see the content
2. **Downloaded**: Use the download button to save locally
3. **Copied**: Select and copy text directly from the preview

### Other Supported File Types

The system also supports previewing:
- ️ Images: JPG, PNG, GIF, WebP (thumbnail + fullscreen view)
-  Videos: MP4, WebM, MOV (with playback controls)
- 📄 PDF documents
- 📝 Word documents (DOC, DOCX) - via Microsoft Office Online Viewer
- 📊 Excel spreadsheets (XLS, XLSX)
- 📽️ PowerPoint presentations (PPT, PPTX)
-  Archive files (ZIP, RAR, 7Z)

## Content Structure

### Assignment Description

The description includes formatted markdown with:

```
We have created a webpage for storing daily and final assignments.

**Website Development Guide**

Prepare tool for website:
- Github: Our website will be placed here.
- GitHub Desktop: Used for cloning libraries and uploading local files.
- AI agent (TONGYI Lingma): Used to write website code.

**Step one:** Create a new repository on GitHub...
[Full step-by-step guide continues...]
```

### Attached File

The `Project_Management_Guide.txt` contains the raw text version of the document, ensuring:
- Easy copying and pasting
- Quick reference without opening external applications
- Full content preservation

## GitHub Synchronization

If GitHub is configured, the assignment will automatically sync:

1. **Configuration**: Click "⚙️ GitHub Config" to set up
   - Username
   - Repository name
   - Personal Access Token
2. **Automatic Sync**: Occurs when assignment is created or updated
3. **File Storage**: Files stored at `assignments/{assignmentId}/{filename}`
4. **Metadata**: JSON file at `assignments/{assignmentId}.json`

## Important Notes

1. **One-Time Creation**: Exercise 1 is only created once per browser
2. **Local Storage**: Data persists in browser's localStorage
3. **No Internet Required**: For viewing (only needed for GitHub sync)
4. **Browser Cache**: Clearing cache will remove the assignment
5. **File Format**: Original .docx converted to .txt for web compatibility

## Troubleshooting

### Issue: Exercise 1 not appearing
**Solution**: 
- Refresh the page (F5 or Ctrl+R)
- Check browser console for errors (F12)
- Try clicking "📄 Create Exercise 1" button manually

### Issue: Can't view attached file
**Solution**:
- Ensure JavaScript is enabled
- Try a different browser
- Download the file and open locally

### Issue: GitHub sync failed
**Solution**:
- Verify GitHub configuration
- Check Personal Access Token permissions (needs 'repo' scope)
- Ensure internet connection is stable

## Technical Details

### Implementation

```javascript
// Auto-creation function
function autoCreateExercise1() {
    // Check if already exists
    const existing = assignments.find(a => 
        a.title === 'Exercise 1: Project Management'
    );
    
    if (!existing) {
        // Create assignment with embedded content
        const exercise1 = {
            id: Date.now(),
            title: 'Exercise 1: Project Management',
            description: '...', // Full guide content
            files: [textFileData], // Embedded text file
            status: 'submitted',
            // ... other metadata
        };
        
        assignments.push(exercise1);
        localStorage.setItem('assignments', JSON.stringify(assignments));
    }
}
```

### Data Structure

```javascript
{
  id: 1234567890,
  title: "Exercise 1: Project Management",
  description: "Full markdown-formatted guide...",
  deadline: "2026-04-13",
  submitter: "All Members",
  status: "submitted",
  createdAt: "2026-04-13T10:30:00.000Z",
  submittedAt: "2026-04-13T10:30:00.000Z",
  files: [
    {
      name: "Project_Management_Guide.txt",
      type: "text/plain",
      size: 1290,
      data: "data:text/plain;base64,..."
    }
  ]
}
```

## Update History

### v2.0 (2026-04-13)
- ✅ **Auto-creation**: Exercise 1 now created automatically on page load
- ✅ **Embedded content**: Full document content included in assignment
- ✅ **Text file attachment**: Project_Management_Guide.txt attached
- ✅ **Duplicate prevention**: Checks for existing assignment before creating
- ✅ **Manual creation**: "Create Exercise 1" button available as fallback

### v1.0 (2026-04-13)
- Initial implementation with file upload button
- DOCX preview support
- GitHub synchronization

---

**Note**: The original .docx file has been converted to .txt format for web compatibility. All content is preserved and easily accessible.
