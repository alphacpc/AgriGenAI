import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


const Home = () => {
  return (
        <View style={styles.container}>
        {/* Header avec menu burger, nom et icône */}
        <View style={styles.header}>
          <TouchableOpacity>
            <FontAwesome name="bars" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Mon Application</Text>
          <Image source={require('../assets/logo-agri.png')} style={styles.appIcon} />
        </View>
  
        {/* Section météo */}
        <View style={styles.weatherSection}>
          <Text style={styles.sectionTitle}>Météo du Jour</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.weatherCard}>
              <Image source={require('../assets/logo-agri.png')} style={styles.weatherIcon} />
              <Text style={styles.weatherText}>Température: 25°C</Text>
              <Text style={styles.weatherText}>Couché du soleil: 18:30</Text>
              <Text style={styles.weatherText}>Date: 09-11-2024</Text>
            </View>
            <View style={styles.weatherCard}>
              <Image source={require('../assets/logo-agri.png')} style={styles.weatherIcon} />
              <Text style={styles.weatherText}>Température: 22°C</Text>
              <Text style={styles.weatherText}>Couché du soleil: 18:45</Text>
              <Text style={styles.weatherText}>Date: 10-11-2024</Text>
            </View>
          </ScrollView>
        </View>
  
        {/* Section procédure de traitement */}
        <View style={styles.procedureSection}>
          <Text style={styles.sectionTitle}>Procédure de traitement</Text>
          <View style={styles.procedureIcons}>
            <FontAwesome name="user" size={30} color="black" />
            <FontAwesome name="arrow-right" size={24} color="black" />
            <FontAwesome name="wrench" size={30} color="black" />
            <FontAwesome name="arrow-right" size={24} color="black" />
            <FontAwesome name="check" size={30} color="black" />
          </View>
        </View>
  
        {/* Section pour prendre une photo */}
        <View style={styles.photoSection}>
          <Text style={styles.sectionTitle}>Prenez une photo pour le diagnostic</Text>
          <TouchableOpacity style={styles.photoButton}>
            <FontAwesome name="camera" size={24} color="white" />
            <Text style={styles.photoButtonText}>Prendre une photo</Text>
          </TouchableOpacity>
        </View>
  
        {/* Barre de navigation en bas */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <FontAwesome name="home" size={24} color="black" />
            <Text>Accueil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <FontAwesome name="cog" size={24} color="black" />
            <Text>Paramètre</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <FontAwesome name="shopping-cart" size={24} color="black" />
            <Text>Panier</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <FontAwesome name="users" size={24} color="black" />
            <Text>Communauté</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <FontAwesome name="user" size={24} color="black" />
            <Text>Profil</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

const styles = StyleSheet.create({
        container: { flex: 1, paddingTop: 40, backgroundColor: '#f5f5f5' },
        header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, backgroundColor: '#fff' },
        headerText: { fontSize: 20, fontWeight: 'bold' },
        appIcon: { width: 30, height: 30 },
        weatherSection: { padding: 10, marginTop: 10 },
        sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
        weatherCard: { padding: 10, backgroundColor: '#e0e0e0', borderRadius: 8, marginRight: 10, width: 150 },
        weatherIcon: { width: 50, height: 50, marginBottom: 5 },
        weatherText: { fontSize: 14 },
        procedureSection: { padding: 10, alignItems: 'center', marginVertical: 20 },
        procedureIcons: { flexDirection: 'row', alignItems: 'center' },
        photoSection: { alignItems: 'center', padding: 10, marginVertical: 20 },
        photoButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#007bff', padding: 10, borderRadius: 8 },
        photoButtonText: { color: 'white', marginLeft: 10, fontSize: 16 },
        bottomNav: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#ddd' },
        navItem: { alignItems: 'center' },
});

export default Home;
