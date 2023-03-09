import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Group } from "../../interfaces/group";
import { Meeting } from "../../interfaces/meeting";
import "./AddMeeting.css";

export const AddMeeting: React.FC = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState<Group[]>([]);
  const { register, handleSubmit, formState } = useForm<Meeting>();

  useEffect(() => {
    axios
      .get<Group[]>("http://localhost:3001/api/groups")
      .then((res) => setGroups(res.data))
      .catch((err) => alert(err.message));
  }, []);

  async function send(meeting: Meeting) {
    try {
      const res = await axios.post<Meeting>(
        "http://localhost:3001/api/meetings",
        meeting
      );
      alert("Added Successfully");
      navigate("/meetings");
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <div className="AddMeeting">
      <form onSubmit={handleSubmit(send)}>
        <label>Group: </label>
        <select {...register("groupId", { required: true })}>
          <option disabled value="0">
            Select Group...
          </option>
          {groups.map((g) => (
            <option key={g.groupId} value={g.groupId}>
              {g.groupName}
            </option>
          ))}
        </select>
        {formState.errors.groupId && <span>Select a group.</span>}

        <label>Start Date & Time: </label>
        <input
          type="datetime-local"
          {...register("startTime", { required: true })}
        />
        {formState.errors.startTime && <span>Pick a valid Date & Time.</span>}

        <label>End Date & Time: </label>
        <input
          type="datetime-local"
          {...register("endTime", { required: true })}
        />
        {formState.errors.endTime && <span>Pick a valid Date & Time.</span>}

        <label>Description: </label>
        <input
          type="text"
          {...register("description", {
            required: true,
            minLength: 10,
            maxLength: 200,
          })}
        />
        {formState.errors.description?.type === "required" && (
          <span>Missing description.</span>
        )}
        {formState.errors.description?.type === "maxLength" && (
          <span>You should not add more than 200 chars.</span>
        )}
        {formState.errors.description?.type === "minLength" && (
          <span>description is to shoort.</span>
        )}

        <label>Meeting Room:</label>
        <input
          type="text"
          {...register("meetingRoom", {
            required: true,
            minLength: 3,
            maxLength: 50,
          })}
        />
        {formState.errors.meetingRoom?.type === "required" && (
          <span>Missing Room name.</span>
        )}
        {formState.errors.meetingRoom?.type === "maxLength" && (
          <span>You should not add more than 50 chars.</span>
        )}
        {formState.errors.meetingRoom?.type === "minLength" && (
          <span>Room name is to shoort.</span>
        )}

        <button>Add meeting</button>
      </form>
    </div>
  );
};
