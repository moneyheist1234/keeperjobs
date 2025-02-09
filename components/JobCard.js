import { useSQLiteContext } from "expo-sqlite";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; 



const colors = [
  "#FFD966",
  "#FF6961",
  "#77DD77",
  "#84B6F4",
  "#F49AC2",
  "#FFB347",
];

const JobCard = ({ job }) => {
    const navigation = useNavigation();
  const db = useSQLiteContext();
  const {
    title,
    job_location_slug: location,
    salary_min,
    salary_max,
    whatsapp_no,
  } = job;

  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const scaleValue = new Animated.Value(1);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    checkIfBookmarked();
  }, []);

  const checkIfBookmarked = async () => {
    var flag = false;
      
    for await (const row of db.getEachAsync("SELECT * FROM bookmarks")) {
      if (row.job === JSON.stringify(job)) {
        flag = true;
      }
    }
    if (flag) {
      setIsBookmarked(true);
    } else {
      setIsBookmarked(false);
    }
  };

  const addBookmark = async (job) => {
    console.log(job);
    try {
      await db.runAsync("INSERT INTO bookmarks (job) VALUES (?)", [
        JSON.stringify(job),
      ]);
      Alert.alert("Bookmarked!");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.message);
    }
  };

  const deleteBookmark = async (job) => {
    console.log("delete is triggered")
    try {
      await db.runAsync("DELETE FROM bookmarks WHERE job = ?;", [
        JSON.stringify(job),
      ]);
      Alert.alert("Bookmark deleted!");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const toggleBookmark = () => {
    console.log("toggle is triggered")
    if (isBookmarked) {
      deleteBookmark(job);
      setIsBookmarked(false);
    } else {
      addBookmark(job);
      setIsBookmarked(true);
    }
  };

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.card,
        { backgroundColor: randomColor, transform: [{ scale: scaleValue }] },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => navigation.navigate("JobDetails", { job })}
      >
        <TouchableOpacity
          style={styles.bookmarkButton}
          onPress={toggleBookmark}
        >
          <MaterialIcons
            name={isBookmarked ? "bookmark" : "bookmark-border"}
            size={24}
            color="black"
          />
        </TouchableOpacity>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.location}>{location}</Text>
        <Text style={styles.salary}>
          💰 {salary_min} - {salary_max}
        </Text>
        <Text style={styles.phone}>📞 {whatsapp_no}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    minHeight: 120,
    justifyContent: "center",
    position: "relative",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginRight: 40,
  },
  location: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  salary: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#222",
    marginTop: 6,
  },
  phone: {
    fontSize: 14,
    color: "#222",
    marginTop: 6,
  },
  bookmarkButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
  },
});

export default JobCard;