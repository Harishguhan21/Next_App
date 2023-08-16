import Link from "next/link";
import React from "react";

export default function Loading() {
  return (
    <main>
      <div className="bg-slate-300 h-96 rounded p-3 shadow"></div>
      <div className="w-[70%] rounded p-3 shadow">
        <nav className="flex text-reg border-b pb-2">
          <p className="mr-7"> Overview </p>
          <p className="mr-7"> Menu </p>
        </nav>
      </div>
    </main>
  );
}
