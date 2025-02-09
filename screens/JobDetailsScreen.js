import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from "react-native";

const JobDetailsScreen = ({ route }) => {
  const { job } = route.params; // ✅ Get job data from navigation
  const {
    title,
    company_name,
    job_role,
    job_location_slug,
    salary_min,
    salary_max,
    whatsapp_no,
    other_details,
    custom_link,
    creatives,
    contact_preference,
  } = job;

  return (
    <ScrollView style={styles.container}>
      {/* Job Image */}
      {creatives?.length > 0 && (
        <Image source={{ uri: creatives[0].file }} style={styles.image} />
      )}

      {/* Job Title */}
      <Text style={styles.title}>{title || "No Title Available"}</Text>

      {/* Company & Role */}
      <Text style={styles.subtitle}>{company_name || "Unknown Company"}</Text>
      <Text style={styles.jobRole}>{job_role || "Job Role Not Specified"}</Text>

      {/* Location & Salary */}
      <Text style={styles.text}>📍 {job_location_slug || "Location Not Provided"}</Text>
      <Text style={styles.text}>
        💰 {salary_min ? `₹${salary_min}` : "N/A"} - {salary_max ? `₹${salary_max}` : "N/A"}
      </Text>

      {/* Other Details */}
      {other_details && (
        <Text style={styles.details}>{other_details}</Text>
      )}

      {/* Contact Options */}
      {whatsapp_no && (
        <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(`https://wa.me/${whatsapp_no}`)}>
          <Text style={styles.buttonText}>Chat on WhatsApp</Text>
        </TouchableOpacity>
      )}

      {custom_link && (
        <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(custom_link)}>
          <Text style={styles.buttonText}>📞 Call HR</Text>
        </TouchableOpacity>
      )}

      {/* Contact Preference */}
      {contact_preference && (
        <Text style={styles.text}>
          Preferred Call Time: {contact_preference.preferred_call_start_time || "N/A"} - {contact_preference.preferred_call_end_time || "N/A"}
        </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  jobRole: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    color: "#666",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default JobDetailsScreen;
