import { useSQLiteContext } from "expo-sqlite";
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native"

const BookmarksScreen = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const db = useSQLiteContext();
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      fetchBookmarks();
    }, [])
  );

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    const allRows = await db.getAllAsync("SELECT * FROM bookmarks");
    const bookmark = [];
    for (const row of allRows) {
      bookmark.push(JSON.parse(row.job));
    }
    bookmark.reverse();
    setBookmarks(bookmark);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={bookmarks}
        keyExtractor={(item) => (item.id ? item.id.toString() : `job-${index}`)}
        renderItem={({ item }) => (
            <TouchableOpacity
            style={styles.card} 
            onPress={() => navigation.navigate("JobDetails", { job: item })} // ✅ Navigate to JobDetails
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.location}>{item.job_location_slug}</Text>
            <Text
              style={styles.salary}
            >{`${item.salary_min} - ${item.salary_max}`}</Text>
            <Text style={styles.phone}>{item.whatsapp_no}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  location: {
    fontSize: 14,
    color: "#666",
  },
  salary: {
    fontSize: 14,
    color: "#666",
  },
  phone: {
    fontSize: 14,
    color: "#666",
  },
});

export default BookmarksScreen;
