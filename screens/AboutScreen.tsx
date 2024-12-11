import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function AboutScreen() {
 return (
   <ScrollView style={styles.container}>
     <View style={styles.header}>
       <Text style={styles.appName}>Howyoudoin</Text>
       <Text style={styles.version}>Version 1.0.0</Text>
     </View>

     <View style={styles.section}>
       <Text style={styles.sectionTitle}>About</Text>
       <Text style={styles.description}>
         Howyoudoin is a messaging app that helps you stay connected with friends and groups. Chat, share, and connect with people who matter most to you.
       </Text>
     </View>

     <View style={styles.section}>
       <Text style={styles.sectionTitle}>Contact</Text>
       <TouchableOpacity 
         style={styles.linkItem}
         onPress={() => Linking.openURL('mailto:support@howyoudoin.com')}
       >
         <Icon name="mail" size={20} color="#007AFF" />
         <Text style={styles.linkText}>ege.yardimci@sabanciuniv.edu</Text>
       </TouchableOpacity>
       <TouchableOpacity 
         style={styles.linkItem}
         onPress={() => Linking.openURL('https://egeyardimci.github.io')}
       >
         <Icon name="globe" size={20} color="#007AFF" />
         <Text style={styles.linkText}>egeyardimci.github.io</Text>
       </TouchableOpacity>
     </View>

     <View style={styles.footer}>
       <Text style={styles.footerText}>© 2024 Howyoudoin. All rights reserved.</Text>
     </View>
   </ScrollView>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
 },
 header: {
   alignItems: 'center',
   padding: 20,
   marginTop: 20,
 },
 appName: {
   fontSize: 28,
   fontWeight: 'bold',
   color: '#007AFF',
 },
 version: {
   fontSize: 16,
   color: '#666',
   marginTop: 5,
 },
 section: {
   padding: 20,
   borderBottomWidth: 1,
   borderBottomColor: '#eee',
 },
 sectionTitle: {
   fontSize: 18,
   fontWeight: 'bold',
   marginBottom: 10,
   color: '#333',
 },
 description: {
   fontSize: 16,
   lineHeight: 24,
   color: '#666',
 },
 linkItem: {
   flexDirection: 'row',
   alignItems: 'center',
   paddingVertical: 10,
 },
 linkText: {
   fontSize: 16,
   color: '#007AFF',
   marginLeft: 10,
 },
 footer: {
   padding: 20,
   alignItems: 'center',
 },
 footerText: {
   fontSize: 14,
   color: '#999',
 },
});