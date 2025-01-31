

import { promisify } from 'util';
import { writeFile } from 'fs';

const writeFileAsync = promisify(writeFile);

export async function writeNasaResponseToFile(
  data: any, 
  filename: string = 'nasa_data.json'
): Promise<void> {
  try {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid NASA API response data');
    }

    const jsonString = JSON.stringify(data, null, 2);
    await writeFileAsync(filename, jsonString, 'utf8');
    console.log(`Successfully wrote NASA data to ${filename}`);
  } catch (error) {
    console.error('Error writing NASA response to file:', error);
    throw error; // Re-throw for error handling upstream
  }
}