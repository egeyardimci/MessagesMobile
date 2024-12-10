import React from 'react';
import { ActivityIndicator, StyleSheet, View, ViewStyle, Modal } from 'react-native';

interface LoadingSpinnerProps {
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
    >
      <View style={[styles.container]}>
        <View style={styles.spinnerBox}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  spinnerBox: {
    padding: 30,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});