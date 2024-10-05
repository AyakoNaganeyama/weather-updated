import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { Link } from "expo-router";
import useCityStore from "../stores/cityStore";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import useHandleSearch from "../hooks/useHandleSearch";
import Searched from "../(modals)/Searched";
import useHandleCityList from "../hooks/useHandleCityList";
import useBooleanStore from "../stores/isSearched";

const Explore = () => {
  const { handleDelete, cities, fetchCityList } = useHandleCityList();
  const {
    initialSearch,

    currentCity,
    cityText,
    todayCast,
    errorMsg,
    handleSearch,
    setCityText, // So users can type the city name
    addSearchedCityToList,
    searchedCity,
    todayCast2,
    setSearchedCity,
  } = useHandleSearch();

  const { storedCity, setStoredCity, clearStoredCity } = useCityStore();
  const { isActive } = useBooleanStore();

  useEffect(() => {
    fetchCityList();
  }, [storedCity]);

  return (
    <View>
      {/* Search Bar */}
      <View style={styles.container2}>
        <View style={styles.searchContainer2}>
          <GooglePlacesAutocomplete
            placeholder="Search City"
            fetchDetails={true}
            onPress={(data) => {
              const cityName = data.description;
              setCityText(cityName);
            }}
            query={{
              key: "AIzaSyAMn-oW3pnCbuyRFnGmLX8a0NNEnWOPuhM",
              language: "en",
              types: "(cities)",
            }}
            textInputProps={{
              style: styles.input2,
            }}
          />
          <TouchableOpacity
            onPress={handleSearch} // Call the hook's search function
            disabled={cityText === ""}
            style={[styles.AddButton, cityText === "" && styles.buttonDisabled]}
          >
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* If searchedCity exists, show the searched city's details */}
      {!isActive && searchedCity ? (
        <Searched data={searchedCity} />
      ) : /* If searchedCity is null, show the list of cities */
      cities.length > 0 ? (
        cities
          .filter((city) => city.location)
          .map((city, index) => (
            <View key={index}>
              <Link href={`/Listings/${city.location.name}`}>
                <Text>
                  {city.location.name} - {city.location.country}
                </Text>
              </Link>
              <TouchableOpacity
                onPress={() =>
                  handleDelete(city.location.name, city.location.country)
                }
                style={{ marginLeft: 10 }}
              >
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          ))
      ) : (
        <Text>No cities found.</Text>
      )}
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: "100%",
    flex: 1,
  },
  container2: {
    padding: 10,
  },
  searchContainer2: {
    flexDirection: "row",
    alignItems: "center",
  },
  input2: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
  },
  AddButton: {
    backgroundColor: "#6c7cac",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    backgroundColor: "#8e979e",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
