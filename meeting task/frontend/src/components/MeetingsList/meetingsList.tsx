import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Meeting } from "../../interfaces/meeting";
import { Group } from "../../interfaces/group";
import "./meetingsList.css";

export const MeetingsList: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  const getGroupsList = async () => {
    try {
      const res = await axios.get<Group[]>("http://localhost:3001/api/groups");
      setGroups(res.data);
    } catch (err: any) {
      alert(err.message);
    }
  };

  useEffect(() => {
    getGroupsList();
  }, []);

  const groupSelected = async (args: SyntheticEvent) => {
    try {
      const groupId = (args.target as HTMLSelectElement).value;
      const response = await axios.get<Meeting[]>(
        "http://localhost:3001/api/meetings-per-group/" + groupId
      );
      setMeetings(response.data);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="MeetingsList">
      <select onChange={groupSelected}>
        <option disabled value="0">
          Select Group...
        </option>
        {groups.map((t) => (
          <option key={t.groupId} value={t.groupId}>
            {t.groupName}
          </option>
        ))}
      </select>

      {meetings.length > 0 && (
        <>
          <h1>{meetings[0].groupName}</h1>
          <hr />
          <table>
            <thead>
              <tr>
                <th>Group Name</th>
                <th>Start Date & Time</th>
                <th>End Date & Time</th>
                <th>Description</th>
                <th>Meeting Room</th>
              </tr>
            </thead>
            <tbody>
              {meetings.map((m) => (
                <tr key={m.meetingId}>
                  <td>{m.groupName}</td>
                  <td>{m.startTime}</td>
                  <td>{m.endTime}</td>
                  <td>{m.description}</td>
                  <td>{m.meetingRoom}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {meetings.length === 0 && <p>There is no meetings</p>}
    </div>
  );
};
