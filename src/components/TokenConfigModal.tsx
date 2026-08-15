import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MAPBOX_ACCESS_TOKEN } from '../constants/mapbox';

interface TokenConfigModalProps {
  visible: boolean;
  onClose: () => void;
  customToken: string;
  onSaveToken: (newToken: string) => void;
}

export default function TokenConfigModal({
  visible,
  onClose,
  customToken,
  onSaveToken,
}: TokenConfigModalProps) {
  const [inputVal, setInputVal] = useState(customToken || MAPBOX_ACCESS_TOKEN);

  const handleSave = () => {
    onSaveToken(inputVal);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Ionicons name="key" size={24} color="#60A5FA" />
            <Text style={styles.title}>Mapbox Access Token</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>
            Enter your Mapbox Public Access Token (`pk.eyJ...`) to enable Mapbox vector styles, satellite imagery, and 3D globe rendering.
          </Text>

          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              value={inputVal}
              onChangeText={setInputVal}
              placeholder="pk.eyJ1..."
              placeholderTextColor="#64748B"
              multiline
              numberOfLines={3}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveText}>Save Key</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 460,
    backgroundColor: '#0F172A',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    flex: 1,
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '700',
  },
  closeBtn: {
    padding: 4,
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 13,
    lineHeight: 18,
  },
  inputBox: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  input: {
    color: '#38BDF8',
    fontSize: 13,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    textAlignVertical: 'top',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 4,
  },
  cancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  cancelText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '600',
  },
  saveBtn: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  saveText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
