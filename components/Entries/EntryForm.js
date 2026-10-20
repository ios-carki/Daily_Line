import { View, StyleSheet } from "react-native";
import { useState } from "react";

import DateStepper from "./DateStepper";
import { getToday } from "../../util/date";
import MoodPicker from "./MoodPicker";
import NoteInput from "./NoteInput";
import Button from "../UI/Button";
import ErrorBanner from "../UI/ErrorBanner";

function EntryForm({
  submitButtonLabel,
  onSubmit,
  onCancel,
  onChange,
  defaultValues,
  serverError,
}) {
  const [inputs, setInputs] = useState({
    date: {
      value: defaultValues ? defaultValues.date : getToday(),
      isValid: true,
    },
    mood: { 
      value: defaultValues ? defaultValues.mood : null, 
      isValid: true 
    },
    content: {
      value: defaultValues ? defaultValues.content : "",
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((current) => ({
      ...current,
      [inputIdentifier]: { value: enteredValue, isValid: true },
    }));
    onChange();
  }
  function cancelHandler() {
    onCancel();
  }

  function submitHandler() {
    const userData = {
      date: inputs.date.value,
      mood: inputs.mood.value,
      content: inputs.content.value.trim(),
    };

    const moodIsValid = userData.mood !== null;
    const contentIsValid = userData.content.length > 0;

    if (moodIsValid && contentIsValid) {
      onSubmit({
        date: userData.date,
        mood: userData.mood,
        content: userData.content,
      });
    } else {
      setInputs((curInputs) => {
        return {
          date: { value: curInputs.date.value, isValid: true },
          mood: { value: curInputs.mood.value, isValid: moodIsValid },
          content: { value: curInputs.content.value, isValid: contentIsValid },
        };
      });
    }
  }

  return (
    <View style={styles.container}>
      <DateStepper
        value={inputs.date.value}
        onChange={(date) => inputChangedHandler("date", date)}
      />
      <MoodPicker
        value={inputs.mood.value}
        invalid={!inputs.mood.isValid}
        onChange={(mood) => inputChangedHandler("mood", mood)}
      />
      <NoteInput
        placeholder="오늘을 한 줄로 남겨보세요"
        value={inputs.content.value}
        invalid={!inputs.content.isValid}
        onChangeText={(text) => inputChangedHandler("content", text)}
      />
      {serverError && <ErrorBanner>{serverError}</ErrorBanner>}
      <View style={styles.buttonsContainer}>
        <Button
          title="취소"
          onPress={cancelHandler}
          mode="ghost"
          style={styles.buttonStyle}
        />
        <Button
          title={submitButtonLabel}
          onPress={submitHandler}
          style={styles.buttonStyle}
        />
      </View>
    </View>
  );
}

export default EntryForm;

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  buttonStyle: {
    flex: 1,
  },
});
