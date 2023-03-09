import { executeAsync } from "../db";

export async function getAllGroupsAsync() {
  const sql = "SELECT * FROM meetings.groups";
  return await executeAsync(sql, []);
}

export async function getMeetingsPerGroupAsync(groupId: number) {
  const sql = `SELECT m.*, g.groupName
                 FROM meetings AS m JOIN meetings.groups AS g
                 ON m.groupId = g.groupId
                 WHERE g.groupId = ${groupId}`;
  return executeAsync(sql, []);
}

export async function addMeetingAsync(meeting: any) {
  const sql = "INSERT INTO meetings VALUES(DEFAULT, ?, ?, ?, ?, ?)";
  const info: any = await executeAsync(sql, [
    meeting.groupId,
    meeting.startTime,
    meeting.endTime,
    meeting.description,
    meeting.meetingRoom,
  ]);
  meeting.meetingId = info.insertId;
  return meeting;
}
