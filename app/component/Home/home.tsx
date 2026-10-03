"use client";

import { useState } from "react";

export default function MarswalkMap() {
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
  const [destination, setDestination] = useState<{ x: number; y: number } | null>(null);
  const [mode, setMode] = useState<"start" | "destination" | null>(null);

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (mode === "start") {
      setStartPoint({ x, y });
      setMode(null);
    }

    if (mode === "destination") {
      setDestination({ x, y });
      setMode(null);
    }
  };

  const handleExamplePoints = () => {
    setStartPoint({ x: 250, y: 350 });
    setDestination({ x: 750, y: 220 });
    setMode(null);
  };

  const clearPoints = () => {
    setStartPoint(null);
    setDestination(null);
    setMode(null);
  };

  return (
    <div className="flex h-screen w-screen bg-[#0f172a] text-white font-sans">

      {/* CENTER MAP AREA */}
      <div className="flex-1 flex flex-col relative">

        {/* TOP BAR */}
        <div className="h-14 bg-[#1e293b] border-b border-slate-700 flex items-center justify-between px-4">

          {/* Mission Info */}
          <div className="flex items-center gap-6 text-sm">
            <span className="text-slate-400">
              MISSION:{" "}
              <span className="text-white font-medium">
                DEMO-001
              </span>
            </span>

            <span className="text-slate-400">
              REGION:{" "}
              <span className="text-white font-medium">
                Demo Region DR-01
              </span>
            </span>
          </div>

          {/* MAP CONTROLS */}
          <div className="flex items-center gap-2">

            {/* SET START */}
            <button
              onClick={() => setMode("start")}
              className={`px-3 py-1.5 rounded text-sm flex items-center gap-1.5 transition ${
                mode === "start"
                  ? "bg-green-600"
                  : "bg-slate-700 hover:bg-slate-600"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
              Set start
            </button>

            {/* SET DESTINATION */}
            <button
              onClick={() => setMode("destination")}
              className={`px-3 py-1.5 rounded text-sm flex items-center gap-1.5 transition ${
                mode === "destination"
                  ? "bg-red-600"
                  : "bg-slate-700 hover:bg-slate-600"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-400"></span>
              Set destination
            </button>

            {/* GENERATE MARSWALK */}
            <button
              className="px-3 py-1.5 rounded text-sm bg-orange-600 hover:bg-orange-500 flex items-center gap-1.5 transition"
            >
              GENERATE MARSWALK
            </button>

            {/* EXAMPLE POINTS */}
            <button
              onClick={handleExamplePoints}
              className="px-3 py-1.5 rounded text-sm bg-slate-700 hover:bg-slate-600 transition"
            >
              Example points
            </button>

            {/* CLEAR */}
            <button
              onClick={clearPoints}
              className="px-3 py-1.5 rounded text-sm bg-slate-700 hover:bg-slate-600 transition"
            >
              Clear
            </button>

          </div>
        </div>

        {/* MAP */}
        <div
          className="flex-1 relative overflow-hidden cursor-crosshair"
          onClick={handleMapClick}
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1614726365723-49cfaa609628?q=80&w=2000")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >

          {/* DARK MAP OVERLAY */}
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />

          {/* GRID */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, #94a3b8 1px, transparent 1px),
                linear-gradient(to bottom, #94a3b8 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />

          {/* COORDINATES */}
          <div className="absolute top-2 left-0 right-0 flex justify-between px-8 text-[10px] text-white/70 font-mono pointer-events-none">
            <span>77.40°E</span>
            <span>77.42°E</span>
            <span>77.44°E</span>
            <span>77.46°E</span>
            <span>77.48°E</span>
            <span>77.50°E</span>
          </div>

          {/* CRATER */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full border-4 border-orange-500/60 bg-orange-900/20 pointer-events-none" />

          {/* SMALL CRATERS */}
          <div className="absolute top-1/4 left-1/3 w-20 h-12 rounded-full bg-red-800/40 border border-red-500/40 pointer-events-none" />

          <div className="absolute bottom-1/3 left-1/3 w-24 h-14 rounded-full bg-red-800/40 border border-red-500/40 pointer-events-none" />

          {/* START POINT */}
          {startPoint && (
            <div
              className="absolute w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg z-10"
              style={{
                left: startPoint.x - 8,
                top: startPoint.y - 8,
              }}
            />
          )}

          {/* DESTINATION POINT */}
          {destination && (
            <div
              className="absolute w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg z-10"
              style={{
                left: destination.x - 8,
                top: destination.y - 8,
              }}
            />
          )}

          {/* ROUTE */}
          {startPoint && destination && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              <line
                x1={startPoint.x}
                y1={startPoint.y}
                x2={destination.x}
                y2={destination.y}
                stroke="#f97316"
                strokeWidth="3"
                strokeDasharray="8 4"
              />
            </svg>
          )}

          {/* SCALE */}
          <div className="absolute bottom-3 left-4 text-xs text-white/80 flex items-center gap-2">
            <div className="w-16 h-1 bg-white"></div>
            <span>1 km</span>
          </div>

          {/* MAP LABEL */}
          <div className="absolute bottom-3 right-4 text-xs bg-black/50 px-2 py-1 rounded">
            Prototype / Simulated Terrain Data
          </div>

        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="w-64 bg-[#1e293b] border-l border-slate-700 p-4 flex flex-col">

        <h2 className="text-sm font-semibold text-slate-300 mb-4">
          MISSION PLAN
        </h2>

        {/* START */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>

            <span className="text-sm font-medium">
              START
            </span>
          </div>

          <p className="text-xs text-slate-400 ml-4">
            {startPoint
              ? "Point selected"
              : "Choose Set start, then click the map."}
          </p>
        </div>

        {/* DESTINATION */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>

            <span className="text-sm font-medium">
              DESTINATION
            </span>
          </div>

          <p className="text-xs text-slate-400 ml-4">
            {destination
              ? "Point selected"
              : "Choose Set destination, then click the map."}
          </p>
        </div>

      </div>
    </div>
  );
}
