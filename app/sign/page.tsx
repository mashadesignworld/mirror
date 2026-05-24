"use client";

import { useRef, useState, FormEvent, ChangeEvent } from "react";
import SignatureCanvas from "react-signature-canvas";

// Importing the JSON file located in the exact same directory
import geoData from "./counties-constituencies-wards.json";

// TypeScript strict contracts for regional datasets
interface Ward {
  name: string;
}
interface Constituency {
  name: string;
  wards: string[] | Ward[]; 
}
interface County {
  name: string;
  constituencies: Constituency[];
}

export default function SignPage() {
  const sigRef = useRef<SignatureCanvas | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  // Location Hierarchy Select States
  const [selectedCounty, setSelectedCounty] = useState("");
  const [selectedConstituency, setSelectedConstituency] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  // --- DERIVED STATE ---
  const currentCountyObj = (geoData as County[]).find((c) => c.name === selectedCounty);
  const constituenciesList = currentCountyObj ? currentCountyObj.constituencies : [];

  const currentConstituencyObj = constituenciesList.find((c) => c.name === selectedConstituency);
  
  const wardsList = currentConstituencyObj && currentConstituencyObj.wards
    ? currentConstituencyObj.wards.map((w: string | Ward) => typeof w === "object" ? w.name : w)
    : [];

  const handleCountyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCounty(e.target.value);
    setSelectedConstituency(""); 
    setSelectedWard("");
  };

  const handleConstituencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedConstituency(e.target.value);
    setSelectedWard(""); 
  };

  const clear = () => {
    sigRef.current?.clear();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });

    if (!sigRef.current || sigRef.current.isEmpty()) {
      setStatus({ type: "error", message: "Please provide your digital signature before submitting." });
      return;
    }

    setLoading(true);
    const signature = sigRef.current.getTrimmedCanvas().toDataURL("image/png");
    const formData = new FormData(e.currentTarget);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      mobile: formData.get("mobile"),
      idnumber: formData.get("idnumber"),
      county: selectedCounty,
      constituency: selectedConstituency,
      ward: selectedWard,
      signed: signature,
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/api/signatures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setStatus({ type: "success", message: "Thank you! Your endorsement signature has been securely verified and submitted." });
        (e.target as HTMLFormElement).reset();
        setSelectedCounty("");
        setSelectedConstituency("");
        setSelectedWard("");
        sigRef.current.clear();
      } else {
        setStatus({ type: "error", message: data.message || "An issue occurred. Please check details and try again." });
      }
    } catch (error) {
      setStatus({ type: "error", message: "Network connection breakdown. Check your connection parameters and try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8 text-gray-800">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-2xl overflow-hidden transform transition-all">
        
        {/* BRANDED INTERACTIVE HEADER CONTAINER */}
        <div className="bg-gradient-to-r from-neutral-900 to-stone-900 p-6 flex flex-col items-center justify-center text-center border-b-4 border-emerald-600">
          <img 
            src="/logo.png" 
            alt="FreeKenya Logo" 
            className="h-16 w-auto object-contain mb-2 drop-shadow-md"
          />
          <p className="text-gray-400 text-xs tracking-widest uppercase font-semibold">
            Official Signature Collection Portal
          </p>
        </div>

        <div className="p-6 md:p-8">
          {/* USER NOTIFICATION ALERTS */}
          {status.type && (
            <div className={`mb-6 p-4 rounded-xl text-sm font-medium border duration-300 animate-fadeIn ${
              status.type === "success" 
                ? "bg-emerald-50 text-emerald-800 border-emerald-200" 
                : "bg-rose-50 text-rose-800 border-rose-200"
            }`}>
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* CONTAINER SEGMENT 1: UNIQUE INDIVIDUAL PROFILE DATA */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Full Name</label>
                  <input name="name" type="text" required placeholder="e.g. John Kamau" 
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm bg-gray-50/50" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">National ID / Passport</label>
                  <input name="idnumber" type="text" required placeholder="e.g. 12345678" 
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm bg-gray-50/50" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Email Address</label>
                  <input name="email" type="email" required placeholder="name@example.com" 
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm bg-gray-50/50" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Phone Number</label>
                  <input name="mobile" type="tel" required placeholder="e.g. 0712345678" 
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm bg-gray-50/50" />
                </div>
              </div>
            </div>

            {/* CONTAINER SEGMENT 2: CASCADING REGIONAL FILTER DROPDOWNS */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                Location Details (Autofill Selection)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* INTERACTIVE SELECT: COUNTY */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">County</label>
                  <select 
                    value={selectedCounty}
                    onChange={handleCountyChange}
                    required
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm bg-gray-50/50 cursor-pointer"
                  >
                    <option value="">Select County</option>
                    {(geoData as County[]).map((county) => (
                      <option key={county.name} value={county.name}>{county.name}</option>
                    ))}
                  </select>
                </div>

                {/* INTERACTIVE SELECT: CONSTITUENCY */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Constituency</label>
                  <select 
                    value={selectedConstituency}
                    onChange={handleConstituencyChange}
                    disabled={!selectedCounty}
                    required
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm bg-gray-50/50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <option value="">Select Constituency</option>
                    {constituenciesList.map((constituency) => (
                      <option key={constituency.name} value={constituency.name}>{constituency.name}</option>
                    ))}
                  </select>
                </div>

                {/* INTERACTIVE SELECT: WARD */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Ward</label>
                  <select 
                    value={selectedWard}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedWard(e.target.value)}
                    disabled={!selectedConstituency}
                    required
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm bg-gray-50/50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <option value="">Select Ward</option>
                    {wardsList.map((wardName) => (
                      <option key={wardName} value={wardName}>{wardName}</option>
                    ))}
                  </select>
                </div>

              </div>
            </div>

            {/* CONTAINER SEGMENT 3: DIGITAL SIGNATURE CAPTURE INTERFACE */}
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Digital Signature
                </label>
                <button 
                  type="button" 
                  onClick={clear}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors focus:underline"
                >
                  Clear Pad
                </button>
              </div>
              
              <div className="relative border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 hover:border-emerald-300 transition-colors overflow-hidden h-44">
                <SignatureCanvas
                  ref={sigRef}
                  penColor="#0f172a"
                  canvasProps={{
                    className: "w-full h-full cursor-crosshair",
                  }}
                />
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 pointer-events-none text-[10px] text-gray-400 font-medium tracking-wide bg-white/80 px-2 py-0.5 rounded-full shadow-sm">
                  Sign inside this area
                </div>
              </div>
            </div>

            {/* THEMED SUBMIT ACTION INTERACTIVE BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 relative overflow-hidden bg-gradient-to-r from-red-700 via-neutral-900 to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-gray-200 hover:shadow-xl hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 text-base"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Securing Entry...</span>
                </>
              ) : (
                "Endorse & Submit"
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}