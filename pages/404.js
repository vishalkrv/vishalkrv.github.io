import React from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found · Vishal Verma</title>
        <meta name="description" content="The requested waypoint was not found." />
      </Head>
      <div className="min-h-screen bg-paper text-ink flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-24 flex flex-col items-center justify-center text-center">
          <span className="text-xs text-accent num mb-2 block">
            Error 404 · Coordinate not found
          </span>
          <h1 className="text-4xl sm:text-6xl font-light text-ink mb-4">
            Waypoint missing
          </h1>
          <p className="text-muted text-sm sm:text-base max-w-md mb-8">
            The telemetry coordinate or route you are navigating to does not exist in this expedition map.
          </p>
          <Link href="/" className="btn">
            Return to base camp
          </Link>
        </main>
      </div>
    </>
  );
}
