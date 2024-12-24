import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
} from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LeaderScreen() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentUserRank, setCurrentUserRank] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    id: 0,
    username: "",
    points: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch bearer token
        const bearer = await AsyncStorage.getItem('access_token');
        const options = {
          headers: {
            Authorization: `Bearer ${bearer}`,
          },
        };

        // Fetch current user data
        const userResponse = await axios.get(
          "https://test.nanodata.cloud/test",
          options
        );
        const userData = userResponse.data;
        setCurrentUser({
          id: userData.id,
          username: userData.username,
          points: userData.points || 0,
        });

        // Fetch leaderboard data
        const leaderboardResponse = await axios.get(
          "https://test.nanodata.cloud/test-users",
          options
        );
        const sortedUsers = leaderboardResponse.data.users
          .map((user) => ({
            username: user.username,
            points: user.points || 0,
          }))
          .sort((a, b) => b.points - a.points);

        setLeaderboard(sortedUsers);

        // Find current user's rank
        const rank =
          sortedUsers.findIndex(
            (user) => user.username === userData.username
          ) + 1;
        setCurrentUserRank(rank);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, []);

  const renderUser = ({ item, index }) => {
    const rendIndex = index + 4;
    return (
      <View style={styles.userItem}>
        <View style={styles.userInfo}>
          <Text style={styles.rankBadge}>{rendIndex}</Text>
          <Text style={styles.username}>{item.username}</Text>
        </View>
        <Text style={styles.points}>{item.points} pts</Text>
      </View>
    );
  };

  const renderTopUsers = ({ item, index }) => {
    const rendIndex = index + 1; 
    return (
      <View style={styles.userItem}>
        <View style={styles.userInfo}>
          <Text style={styles.rankBadge}>{rendIndex}</Text>
          <Text style={styles.username}>{item.username}</Text>
        </View>
        <Text style={styles.points}>{item.points} pts</Text>
      </View>
    );
  };

  const renderCurrentUser = ({ item, index }) => (
    <View style={styles.userItem}>
      <Text style={styles.rankBadge}>Your Rank: {currentUserRank}</Text>
      <Text style={styles.username}>{currentUser.username}</Text>
      <Text style={styles.points}>{currentUser.points} pts</Text>
    </View>
  );

  return (
    <ImageBackground
      source={require("../../assets/backgroundLead.png")}
      style={styles.background}
    >
      <View>
        <FlatList
          data={leaderboard.slice(0, 3)} 
          renderItem={renderTopUsers}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <View style={styles.leaderboard}>
        <FlatList
          data={leaderboard.slice(3, 10)} 
          renderItem={renderUser}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
        />
      </View>

      <View style={styles.currentUser}>
        <FlatList
          data={[currentUser]}
          renderItem={renderCurrentUser}
          keyExtractor={(item) => item.toString()}
          contentContainerStyle={styles.currentUserContainer}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  userStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  stat: {
    alignItems: "center",
  },
  statTitle: {
    color: "white",
    fontSize: 16,
  },
  statValue: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  leaderboard: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  topUsers: {
    marginTop: 20,
    paddingLeft: 10,
  },
  topUsersContainer: {
    paddingVertical: 10,
  },
  userItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  rankBadge: {
    backgroundColor: "#ffffff",
    color: "black",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    fontWeight: "bold",
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  points: {
    fontSize: 14,
    color: "#666",
  },
  currentUser: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  currentUserContainer: {
    paddingVertical: 10,
  },
});
