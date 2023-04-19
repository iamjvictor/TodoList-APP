import { Image, Text, View, StyleSheet, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';



const Weather = () => {
    const [data, setData] = useState(null);
    
    const getWeatherData = (latitude, longitude) => {

        fetch(`https://api.weatherapi.com/v1/current.json?key=7e4e4341764c44a19fa133349231704&q=${latitude},${longitude}`)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error(error));
    };
    
    console.log(data)

    /* API CALL */
    useEffect( () => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                getWeatherData("40.7128", "-74.0060")
              return;
            }
        let location = await Location.getCurrentPositionAsync({});
        getWeatherData(location.coords.latitude, location.coords.longitude);
        })();


    }, []);
    
    

    if (!data || !data.location || !data.current) {
        return <Text>Carregando...</Text>;
      }
      const icon = "https:" + data.current.condition.icon;
console.log(icon)
    return (
        <SafeAreaView style={styles.container}>
            
          
        <View>
        <Text style={styles.weatherInfo}>{data.location.name}</Text>
        <Text style={styles.temperature}>{data.current.temp_c + 'º' }</Text>
        </View>
        <Image source={{uri: icon}} style={styles.logo} />
        
            

        </SafeAreaView>
      
    );
}
  
  export default Weather;





  const styles = StyleSheet.create({
    container: {      
      flexDirection: 'row',
      justifyContent:'space-between',    
      padding:"auto",
      marginBottom:10,
    },
    weatherInfo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        
    },
    temperature: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
      },
    logo: {
      width: 66,
      height: 58,
    },
  });