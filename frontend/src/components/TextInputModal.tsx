import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import Modal from "react-native-modal";

interface TextInputModalProps {
	  isVisible: boolean;
	  onClose: () => void;
	  onSubmit: (text: string) => void;
}

const TextInputModal: React.FC<TextInputModalProps> = ({ isVisible, onClose, onSubmit }) => {
  const [text, setText] = useState("");

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContent}>
        <Text style={styles.label}>Enter Text:</Text>
        <TextInput
          style={styles.input}
          placeholder="Type something..."
          value={text}
          onChangeText={setText}
        />
        <View style={styles.buttonContainer}>
          <Button title="Submit" onPress={() => { onSubmit(text); setText(""); onClose(); }} />
          <Button title="Cancel" onPress={onClose} color="red" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default TextInputModal;