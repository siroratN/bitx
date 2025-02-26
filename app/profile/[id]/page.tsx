"use client";

import { getProfile } from "@/actions/";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const getData = async () => {
      try {
        const data = await getProfile(id as string);
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (!profile) return <p className="text-red-500">Profile not found</p>;

  return (
    <div>
      <h1>Profile: {profile.firstName} {profile.lastName}</h1>
      <p>Email: {profile.email}</p>

      {/* <h2>Assets</h2>
      <ul>
        {profile.assets.map((asset: any) => (
          <li key={asset.id}>{asset.crypto}: ${asset.totalSpent}</li>
        ))}
      </ul> */}
    </div>
  );
}
