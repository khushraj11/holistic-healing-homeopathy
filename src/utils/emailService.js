import emailjs from '@emailjs/browser';

const SERVICE_ID = "service_ob12knk";
const TEMPLATE_ID = "template_x60go5j";
const PUBLIC_KEY = "J95HOtcaJOAt0rzmp";

export const sendConfirmationEmail = async (formData) => {
  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      patient_name: formData.name,
      patient_email: formData.email,
      date: formData.date,
      time: formData.time,
      symptoms: formData.symptoms,
    }, PUBLIC_KEY);
    return { success: true };
  } catch (err) {
    console.error('Email error:', err);
    return { success: false };
  }
};
