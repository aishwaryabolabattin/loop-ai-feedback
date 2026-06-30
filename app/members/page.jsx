"use client";

import { useEffect, useState } from "react";

export default function MembersPage() {
  const [members, setMembers] = useState([]);

  const role = "ADMIN"; // Temporary

  useEffect(() => {
    if (role !== "ADMIN") return;

    fetch("/api/members")
      .then((res) => res.json())
      .then((data) => setMembers(data));
  }, [role]);

  if (role !== "ADMIN") {
    return (
      <div style={{ padding: "40px" }}>
        <h1>🚫 Access Denied</h1>
        <p>Only Admin can view workspace members.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Workspace Members</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
