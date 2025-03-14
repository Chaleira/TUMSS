import React, { memo, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Slider from "@react-native-community/slider";

interface Props {
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  value: number;
  onValueChange: (value: number) => void;
}

export default function MusicSlider({
  minimumValue = 0,
  maximumValue = 100,
  step = 1,
  value,
  onValueChange,
}: Props) {

  return (
    <View style={styles.container}>
      <Text style={styles.valueText}>{value}</Text>
      <Slider
        style={styles.slider}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        value={value}
		onSlidingComplete={onValueChange}
        minimumTrackTintColor="#1EB1FC"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="#1EB1FC"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  slider: {
    width: "90%",
    height: 40,
  },
  valueText: {
    fontSize: 16,
    marginBottom: 10,
  },
});