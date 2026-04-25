const SHEET_API_URL = "https://script.google.com/macros/s/AKfycbxT3dZAkmsxsLmzWkNSfG8lEu1cInpd0R8QgSiZvSqhuft04rM-KjVYcauwhxiQQc5n/exec";

export const submitAppointment = async (formData) => {
  await fetch(SHEET_API_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({ action: "addAppointment", ...formData }),
  });
  return { success: true };
};

export const fetchAppointments = async () => {
  const res = await fetch(`${SHEET_API_URL}?action=getAppointments`);
  return await res.json();
};

export const fetchPatientRecords = async (phone) => {
  const res = await fetch(`${SHEET_API_URL}?action=getPatientRecords&phone=${phone}`);
  return await res.json();
};

export const updatePatient = async (data) => {
  await fetch(SHEET_API_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({ action: "updatePatient", ...data }),
  });
  return { success: true };
};
