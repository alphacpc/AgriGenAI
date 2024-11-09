import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


const Home = () => {
  return (
        <View style={styles.container}>
        {/* Header avec menu burger, nom et icône */}
        <View style={styles.header}>
          <TouchableOpacity>
            <FontAwesome name="bars" size={50} color="#218E54" />
          </TouchableOpacity>
          <View style={styles?.welcome}>
            <Image source={require('../assets/logo-green.png')} style={styles.appIcon} />
            <Text style={styles.headerText}>Bienvenue</Text>
          </View>
        </View>
  
        {/* Section météo */}
        <View style={styles.weatherSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.weatherCard}>
              <Image source={require('../assets/meteo-good.png')} style={styles.weatherIcon} />
              <Text style={styles.weatherText}>Diourbel, 12 Oct</Text>
              <Text style={styles.weatherText}>Couché du soleil: 18:46</Text>
              <Text style={styles.weatherValue}>25°C</Text>
            </View>
            <View style={styles.weatherCard}>
              <Image source={require('../assets/meteo-good.png')} style={styles.weatherIcon} />
              <Text style={styles.weatherText}>Diourbel, 12 Oct</Text>
              <Text style={styles.weatherText}>Couché du soleil: 18:46</Text>
              <Text style={styles.weatherValue}>25°C</Text>
            </View>
            <View style={styles.weatherCard}>
              <Image source={require('../assets/meteo-good.png')} style={styles.weatherIcon} />
              <Text style={styles.weatherText}>Diourbel, 12 Oct</Text>
              <Text style={styles.weatherText}>Couché du soleil: 18:46</Text>
              <Text style={styles.weatherValue}>25°C</Text>
            </View>
          </ScrollView>
        </View>
  
        {/* Section procédure de traitement */}
        <View style={styles.procedureSection}>
          <View style={styles.procedureItem}>
            <Text style={styles.procedureText}>Photo</Text>
            <Image source={require('../assets/picture.png')} style={styles.procedureImage} />
          </View>

          <Image source={require('../assets/arrow.png')} style={styles.procedureSeparate} />

          <View style={styles.procedureItem}>
            <Text style={styles.procedureText}>Diagnostique</Text>
            <Image source={require('../assets/process.png')} style={styles.procedureImage} />
          </View>

          <Image source={require('../assets/arrow.png')} style={styles.procedureSeparate} />

          <View style={styles.procedureItem}>
            <Text style={styles.procedureText}>Traitement</Text>
            <Image source={require('../assets/trouss.png')} style={styles.procedureImage} />
          </View>
        </View>
  
        {/* Section pour prendre une photo */}
        <View style={styles.photoSection}>
            <TouchableOpacity style={styles.photo}>
              <Image source={require('../assets/take.png')} style={styles.procedureImage} />
              <Text style={styles.photoButtonText}>Prendre le diagnostique</Text>
            </TouchableOpacity>
        </View>
  
      </View>
  );
};



const styles = StyleSheet.create({
        container: { flex: 1, paddingTop: 30, backgroundColor: '#fff' },
        header: { flexDirection: 'row', alignItems: 'start', padding: 10, backgroundColor: '#fff' },
        headerText: { fontSize: 20, fontWeight: 'bold', color:"#218E54" },
        appIcon: { width: 80, height: 20 },
        weatherSection: { padding: 10, marginTop: 10 },
        sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
        
        weatherCard: { padding: 10, backgroundColor: '#218E54', color: "#fff", borderRadius: 14, marginRight: 30, width: 300, position: "relative" },
        weatherIcon: { width: 150, height: 80, marginBottom: 10 },
        weatherText: { fontSize: 18, fontWeight: "bol", color: "#fff", marginBottom: 10 },
        weatherValue: { position: "absolute", right: "5%", top: "20%", fontSize: 55, fontWeight: "bold", color: "#fff", marginBottom: 10 },
        
        procedureSection: { flexDirection: "row",padding: 10, alignItems: 'center', justifyContent: "center", marginVertical: 30 },
        
        procedureItem: { flexDirection: 'column', alignItems: 'center', justifyContent:"center" },
        procedureImage: { width: 60, height: 60, marginBottom: 0 },
        procedureText: { fontSize: 18, fontWeight: "bold", color: "#218E54", marginBottom: 5 },
        
        procedureSeparate: { width: 30, height: 30, marginHorizontal: 10, marginTop:20 },

        
        photoSection: { alignItems: 'center', padding: 10 },
        photo: { backgroundColor: '#218E54', alignItems: 'center', justifyContent: "center" ,  padding: 20, borderRadius: 14, flexDirection: 'row', width: 300},
        photoButtonText: { color: 'white', marginHorizontal: 10, fontSize: 32, fontWeight: "bold", textAlign: "center" },
        
        bottomNav: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#ddd' },
        navItem: { alignItems: 'center' },
        welcome: { marginLeft: 10}
});

export default Home;
