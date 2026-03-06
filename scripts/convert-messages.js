/**
 * Script to convert txt file messages to SQL INSERT statements
 * 
 * Usage:
 * 1. Put your messages in a file called 'messages.txt' in the same folder
 * 2. Run: node convert-messages.js
 * 3. Copy the output SQL to Supabase SQL Editor
 * 
 * Expected format of messages.txt:
 * 1. First message content here
 * 2. Second message content here
 * ...
 */

const fs = require('fs');
const path = require('path');

function convertMessagesToSQL(inputFile) {
  try {
    const content = fs.readFileSync(inputFile, 'utf-8');
    const lines = content.split('\n').filter(line => line.trim());
    
    const messages = [];
    
    for (const line of lines) {
      // Match pattern: number. message content
      const match = line.match(/^(\d+)\.\s*(.+)/);
      if (match) {
        const id = parseInt(match[1], 10);
        let content = match[2].trim();
        
        // Escape single quotes for SQL
        content = content.replace(/'/g, "''");
        
        messages.push({ id, content });
      }
    }
    
    if (messages.length === 0) {
      console.log('No messages found. Make sure your file follows the format:');
      console.log('1. First message');
      console.log('2. Second message');
      return;
    }
    
    // Generate SQL
    console.log('-- Generated SQL INSERT statements');
    console.log('-- Total messages:', messages.length);
    console.log('');
    console.log('INSERT INTO messages (id, content) VALUES');
    
    const valueLines = messages.map((msg, index) => {
      const comma = index < messages.length - 1 ? ',' : ';';
      return `(${msg.id}, '${msg.content}')${comma}`;
    });
    
    console.log(valueLines.join('\n'));
    
    console.log('');
    console.log('-- Copy the SQL above and paste into Supabase SQL Editor');
    
  } catch (error) {
    console.error('Error reading file:', error.message);
    console.log('');
    console.log('Make sure you have a messages.txt file in the scripts folder.');
  }
}

// Check for command line argument or use default
const inputFile = process.argv[2] || path.join(__dirname, 'messages.txt');
convertMessagesToSQL(inputFile);
