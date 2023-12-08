import requests

#Function to handle GET requests for weather API
def get_weather(api_key, city):
    # Geocoding API to get coordinates of the city
    geo_response = requests.get(f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}")
    geo_data = geo_response.json()

    #If not successful
    if geo_response.status_code != 200:
        print(f"Error: Unable to get coordinates for {city}. Please check the city name.")
        return None

    # Weather API to get weather information of the city
    lat, lon = geo_data['coord']['lat'], geo_data['coord']['lon']
    weather_url = f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}"
    weather_response = requests.get(weather_url)
    weather_data = weather_response.json()

    # if not successful
    if weather_response.status_code != 200:
        print(f"Error: Unable to fetch weather information for {city}. Please try again later.")
        return None

    return weather_data


API_KEY = 'd9c12a64ad1b535fee24d20a9e6009e9'
city = input("Enter the name of the city: ")

# API Call and Output
weather_data = get_weather(API_KEY, city)
if weather_data:
    print(f"\nWeather in {weather_data['name']}:")
    print(f"- Temperature: {weather_data['main']['temp'] - 273.5 :.1f}°C") #-273.5 because api returns Kelvin
    print(f"- Humidity: {weather_data['main']['humidity']}%")
    print(f"- Wind Speed: {weather_data['wind']['speed']} m/s")
    print(f"- Description: {weather_data['weather'][0]['description']}")