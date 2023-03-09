import express from "express";
import {
  addMeetingAsync,
  getAllGroupsAsync,
  getMeetingsPerGroupAsync,
} from "../business-logic-layer/meetings-logic";

export const router = express.Router();

// GET all groups:
router.get("/api/groups", async (req, res) => {
  try {
    const groups = await getAllGroupsAsync();
    return res.status(200).json(groups);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// GET meetings per group:
router.get("/api/meetings-per-group/:groupId", async (req, res) => {
  try {
    const groupId = +req.params.groupId;
    const meetings = await getMeetingsPerGroupAsync(groupId);
    return res.status(200).json(meetings);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});

// POST new meeting:
router.post("/api/meetings", async (req, res) => {
  try {
    const meeting = req.body;
    const addedMeeting = await addMeetingAsync(meeting);
    return res.status(201).json(addedMeeting);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
});
