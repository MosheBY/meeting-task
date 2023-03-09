import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AddMeeting } from "../AddMeeting/AddMeeting";
import { MeetingsList } from "../MeetingsList/meetingsList";

export const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path="/meetings" element={<MeetingsList />} />
      <Route path="/add-meeting" element={<AddMeeting />} />
      <Route path="*" element={<Navigate to="/meetings" replace />} />
    </Routes>
  );
};
