"use client";

import { useEffect, useState } from "react";
import { UPILinks, columns } from "./columns";
import { DataTable } from "./data-table";
import { useSession } from "next-auth/react";

function Dashboard() {
  const { data: session } = useSession();
  const [data, setData] = useState<UPILinks[]>([]);

  useEffect(() => {
    
    if (session) {
      console.log("session = ", session);
      fetch('/api/getlinks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ session })
      })
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
    }
  }, [session]);

  return (
    <div className="container mx-auto py-10 justify-center items-center">
      <h1 className="text-4xl text-center">Manage Links</h1>
    {/* // <div className="flex min-h-screen flex-col items-center justify-between p-24"> */}
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default Dashboard;