// StAuth10244: I Sami Nachwati, 000879289 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import { StyleSheet, ImageBackground,TouchableOpacity, Text, Image, TextInput, Button, View, FlatList, ScrollView } from 'react-native';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient'; 



const fetchFonts = () => {
  return Font.loadAsync({
    'SpaceGrotesk-VariableFont_wght': require('./assets/fonts/SpaceGrotesk-VariableFont_wght.ttf'),
  });
};
export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [data, setData] = useState([]);
  const [dataResult, setDataResult] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [resultFound, setResultFound] = useState(false);
  const [inputText, setInputText] = useState('');
  const [searchByInput, setSearchByInput] = useState(false);
  const [displayedData, setDisplayedData] = useState([]);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }


  const getResult = async (search) => {
    try {
      setSearchItem(search);
      setLoading(true);
      const response = await fetch(`https://api.spacexdata.com/v4/${search}`);
      const jsonData = await response.json();
      setData(jsonData);
      setDisplayedData(jsonData); 
      setResultFound(true);
    } catch (error) {
      console.error(error);
      setResultFound(false); 
    } finally {
      setLoading(false); 
    }
  };
  
  
  

  const searchResult = () => {
    if (!searchItem) {
      alert('Please select a category first.');
      return;
    }

    if (!text) {
      alert('Please enter some text to search.');
      return;
    }

    const filteredData = data.filter((item) => {
      return item.name.toLowerCase().includes(text.toLowerCase());
    });

    setDisplayedData(filteredData); 
    setSearchByInput(true);
  };


  const getImageSource = (item) => {

    switch (searchItem) {
      case 'launches':
        return { uri: item.links?.patch?.small };
      case 'landpads':
        return { uri: item.images?.large?.[0] };
      case 'ships':
        return { uri: item.image };
      case 'crew': 
        return { uri: item.image };
      default:
        return null; 
    }
  };
  


  return (
    <View style={styles.view}>
      <View style={styles.navBar}>
        <ImageBackground
        source={require('./assets/rocket.png')}
        style={{ width: 50, height: 50, marginBottom: 10}}
        />
        
        <Text style={styles.navItem}>
          NebulaExpress
        </Text>

        <Text style={styles.navItem}>
          Sami.dev
        </Text>
        
      </View>
      <View style={styles.queryContainer}>
        <Text style={styles.text}>
          Select a Space Artifact to explore 
        </Text>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
          <Button title="Launches" color='#1d262f' onPress={() => getResult('launches')}/>
          </View>
          <View style={styles.button}>
          <Button title="Landpads" color='#1d262f' onPress={() => getResult('landpads')}/>
          </View>
          <View style={styles.button}>
          <Button title="Ships" color='#1d262f' onPress={() => getResult('ships')}/>
          </View>
          <View style={styles.button}>
          <Button title="Crew" color='#1d262f' onPress={() => getResult('crew')}/>
          </View>
        </View>
      </View>
      <View style={styles.contentContainer}>
      <Text style={styles.text}>Enter Your Space Query</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your query here"
        placeholderTextColor="white"
        onChangeText={newText => setText(newText)}
        value={text}
      />
      <View style={styles.searchButton}>
        <Button title="Search" color='#1d262f' onPress={searchResult}/>
      </View>
    </View>
      <View style={{marginTop: 30}}>
        {resultFound && (
          <FlatList
            data={displayedData}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Text style={styles.text}>{item.name}
                </Text>
                <Image 
                  source={getImageSource(item)}
                  style={styles.image}
                />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.resultsContainer}
          />
        )}
    </View>
    <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    borderColor: 'white',
    borderWidth: 1,
    width: 200,
    padding: 10,
    borderRadius: 5,
    fontFamily: 'SpaceGrotesk-VariableFont_wght',
    color: 'white' 
  },
  view: {
    flex: 1,   
    backgroundColor: '#1d262f'
  },

  searchButton: {
    backgroundColor: 'cyan',
    paddingHorizontal: 20,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#1d262f',
  },

  buttonText: {
    color: 'black', 
    fontFamily: 'SpaceGrotesk-VariableFont_wght',
    fontSize: 15,
  },

  resultsContainer: {
    display: 'flex',
    gap: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  itemContainer: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10, 
  },
  
  image: {
    width: 50,
    height: 50
  },

  queryContainer: {
    marginTop: 40,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },


  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    width: '40%', 
    backgroundColor: 'cyan',
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#1d262f',
    margin: 10, 
    alignItems: 'center',
  },
  buttonText: {
    color: '#1d262f',
    fontFamily: 'SpaceGrotesk-VariableFont_wght',
    textAlign: 'center',
  },
  

  text: {
    color: 'cyan', marginBottom: 10, fontFamily: 'SpaceGrotesk-VariableFont_wght'
  },

  navItem: {
    color: 'cyan',
    fontFamily: 'SpaceGrotesk-VariableFont_wght',
    fontSize: 15,
  },

  navBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    marginTop: 40,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: 'grey'
  },

  contentContainer: {
    flex: 0,
    marginTop: 20,
    alignItems: 'center'
  }
});


