/**
 * Google Apps Script Example for Tech For Girls Registration
 * 
 * Instructions:
 * 1. Go to https://script.google.com/
 * 2. Create a new project
 * 3. Replace the default code with this script
 * 4. Create a Google Sheet and replace 'YOUR_SPREADSHEET_ID' with the actual ID
 * 5. Deploy as a Web App with execute permissions set to "Anyone"
 * 6. Copy the Web App URL and use it in your frontend
 */

// Replace with your actual Google Sheet ID
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';

/**
 * Handles POST requests from the registration form
 */
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Open the spreadsheet
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    
    // Set up headers if this is the first row
    const lastRow = sheet.getLastRow();
    if (lastRow === 0) {
      sheet.appendRow([
        'Timestamp',
        'Name',
        'Phone',
        'Email',
        'College/Department',
        'Screenshot File',
        'Share Count',
        'Status'
      ]);
    }
    
    // Add the registration data
    sheet.appendRow([
      new Date().toLocaleString(),
      data.name,
      data.phone,
      data.email,
      data.college,
      data.screenshotFileName || 'No file',
      data.shareCount,
      'Registered'
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Registration successful!'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing registration:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Registration failed: ' + error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handles GET requests (optional - for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      message: 'Tech For Girls Registration API is running!',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function to verify the script works
 */
function testRegistration() {
  const testData = {
    name: 'Test User',
    phone: '+1234567890',
    email: 'test@example.com',
    college: 'Computer Science',
    screenshotFileName: 'test-screenshot.jpg',
    shareCount: 5
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  console.log('Test result:', result.getContent());
}

/**
 * Setup function to initialize the spreadsheet
 */
function setupSpreadsheet() {
  try {
    // Create a new spreadsheet if needed
    const sheet = SpreadsheetApp.create('Tech For Girls Registrations');
    console.log('Created spreadsheet with ID:', sheet.getId());
    console.log('Update the SPREADSHEET_ID constant with this ID');
    
    // Set up the headers
    const activeSheet = sheet.getActiveSheet();
    activeSheet.appendRow([
      'Timestamp',
      'Name', 
      'Phone',
      'Email',
      'College/Department',
      'Screenshot File',
      'Share Count',
      'Status'
    ]);
    
    // Format the header row
    const headerRange = activeSheet.getRange(1, 1, 1, 8);
    headerRange.setBackground('#4a90e2');
    headerRange.setFontColor('#ffffff');
    headerRange.setFontWeight('bold');
    
    console.log('Spreadsheet setup complete!');
    
  } catch (error) {
    console.error('Error setting up spreadsheet:', error);
  }
}

/**
 * Get registration statistics (optional)
 */
function getRegistrationStats() {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    const data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return { totalRegistrations: 0 };
    }
    
    const registrations = data.slice(1); // Skip header row
    
    return {
      totalRegistrations: registrations.length,
      lastRegistration: registrations[registrations.length - 1][0],
      collegeBreakdown: getCollegeBreakdown(registrations)
    };
    
  } catch (error) {
    console.error('Error getting stats:', error);
    return { error: error.message };
  }
}

function getCollegeBreakdown(registrations) {
  const breakdown = {};
  registrations.forEach(row => {
    const college = row[4]; // College column
    breakdown[college] = (breakdown[college] || 0) + 1;
  });
  return breakdown;
}
