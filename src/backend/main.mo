import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";

actor {
  type WeatherCondition = {
    temperature : Float;
    feelsLike : Float;
    humidity : Nat;
    windSpeed : Float;
    uvIndex : Float;
    visibility : Float;
    pressure : Nat;
    condition : Text;
  };

  type DayForecast = {
    high : Float;
    low : Float;
    condition : Text;
  };

  type HourlyForecast = {
    hour : Nat;
    temperature : Float;
    condition : Text;
  };

  type AdditionalMetrics = {
    airQualityIndex : Nat;
    precipitation : Float;
    sunriseTime : Time.Time;
    sunsetTime : Time.Time;
  };

  type CityWeather = {
    current : WeatherCondition;
    dailyForecast : [DayForecast];
    hourlyForecast : [HourlyForecast];
    metrics : AdditionalMetrics;
  };

  module CityWeather {
    public func compare(weather1 : CityWeather, weather2 : CityWeather) : Order.Order {
      let cityName1 = weather1.current.condition;
      let cityName2 = weather2.current.condition;
      Text.compare(cityName1, cityName2);
    };
  };

  let cities = Map.empty<Text, CityWeather>();

  func getDefaultCity() : CityWeather {
    switch (cities.get("New York")) {
      case (null) { Runtime.trap("Default city not found") };
      case (?cityWeather) { cityWeather };
    };
  };

  public query ({ caller }) func getCurrentWeather(city : ?Text) : async WeatherCondition {
    let cityWeather = switch (city) {
      case (null) { getDefaultCity() };
      case (?cityName) {
        switch (cities.get(cityName)) {
          case (null) { getDefaultCity() };
          case (?cityWeather) { cityWeather };
        };
      };
    };
    cityWeather.current;
  };

  public query ({ caller }) func getDailyForecast(city : ?Text) : async [DayForecast] {
    let cityWeather = switch (city) {
      case (null) { getDefaultCity() };
      case (?cityName) {
        switch (cities.get(cityName)) {
          case (null) { getDefaultCity() };
          case (?cityWeather) { cityWeather };
        };
      };
    };
    cityWeather.dailyForecast;
  };

  public query ({ caller }) func getHourlyForecast(city : ?Text) : async [HourlyForecast] {
    let cityWeather = switch (city) {
      case (null) { getDefaultCity() };
      case (?cityName) {
        switch (cities.get(cityName)) {
          case (null) { getDefaultCity() };
          case (?cityWeather) { cityWeather };
        };
      };
    };
    cityWeather.hourlyForecast;
  };

  public query ({ caller }) func getAdditionalMetrics(city : ?Text) : async AdditionalMetrics {
    let cityWeather = switch (city) {
      case (null) { getDefaultCity() };
      case (?cityName) {
        switch (cities.get(cityName)) {
          case (null) { getDefaultCity() };
          case (?cityWeather) { cityWeather };
        };
      };
    };
    cityWeather.metrics;
  };

  public query ({ caller }) func searchCities(searchTerm : Text) : async [Text] {
    cities.keys().toArray().filter(func(cityName) { cityName.contains(#text searchTerm) }).sort();
  };

  public query ({ caller }) func getAllCities() : async [Text] {
    cities.keys().toArray().sort();
  };

  public shared ({ caller }) func addCity(name : Text, weather : CityWeather) : async () {
    cities.add(name, weather);
  };
};
