import { google } from "googleapis";

const drive = google.drive("v3");

export async function deleteImageFromGoogleDrive(fileId: string, auth: any) {
  try {
    await drive.files.delete({
      fileId,
      auth,
    });
    console.log(
      `File with ID ${fileId} deleted successfully from Google Drive.`
    );
  } catch (error) {
    console.error(`Error deleting file from Google Drive:`, error);
    throw new Error("Failed to delete file from Google Drive.");
  }
}