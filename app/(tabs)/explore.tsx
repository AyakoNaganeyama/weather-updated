import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import useCityStore from "../stores/cityStore";

const Explore = () => {
  const [cities, setCities] = useState([]);
  const { storedCity, setStoredCity, clearStoredCity } = useCityStore();

  useEffect(() => {
    (async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("cities2");

        let storedCities = [];

        if (jsonValue != null) {
          storedCities = JSON.parse(jsonValue);
        }

        setCities(storedCities); // Update state with stored cities
        console.log(storedCities);
      } catch (error) {
        console.error("Failed to load cities from AsyncStorage:", error);
      }
    })();
  }, [storedCity]);

  return (
    <View>
      {cities.length > 0 ? (
        cities
          .filter((city) => city !== null) // Filter out null values
          .map((city, index) => (
            <Link href={`/Listings/${city.location?.name}`} key={index}>
              <Text>
                {city.location?.name} - {city.location?.country}
              </Text>
            </Link>
          ))
      ) : (
        <Text>No cities found.</Text>
      )}
    </View>
  );
};

export default Explore;
