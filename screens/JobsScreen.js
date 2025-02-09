import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import JobCard from "../components/JobCard";



const categories = ["All", "IT", "Healthcare", "Sales", "Marketing", "Finance"];



const JobsScreen = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");



  const fetchJobs = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://testapi.getlokalapp.com/common/jobs?page=${page}`
      );
      const newJobs = response.data?.results || [];
    //   console.log(response.data.results[0])
      if (newJobs.length === 0) {
        setHasMore(false);
        return;
      }

      setJobs((prevJobs) => {
        const allJobs = [...prevJobs, ...newJobs];
        const uniqueJobs = allJobs.filter(
          (job, index, self) => self.findIndex((j) => j.id === job.id) === index
        );
        return uniqueJobs;
      });

      setPage((prevPage) => prevPage + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };


  const handleSearch = (text) => {
    setSearchText(text);
    console.log('search module')
    // setFilteredJobs(filtered);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredJobs(jobs);
    } else {
      setFilteredJobs(jobs.filter((job) => job.job_category === category));
    }
    console.log('category module')
  };

  return (
    <View style={styles.container}>
        <Text style={styles.header}>👋 Welcome to Job Finder</Text>
        <TextInput
        style={styles.searchBar}
        placeholder="Search for jobs..."
        value={searchText}
        onChangeText={handleSearch}
      />
      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory,
            ]}
            onPress={() => handleCategorySelect(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={jobs}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : `job-${index}`
        }
        renderItem={({ item }) => (
          <JobCard
            job = {item}
          />
        )}
        onEndReached={() => {
          if (hasMore) {
            fetchJobs();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  searchBar: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  categoryButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 5,
  },
  selectedCategory: {
    backgroundColor: "#007AFF",
  },
  categoryText: {
    fontSize: 14,
    color: "#333",
  },
  selectedCategoryText: {
    color: "#fff",
    fontWeight: "bold",
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#CED0CE",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
});

export default JobsScreen;