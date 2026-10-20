import { View, StyleSheet, Text } from "react-native";
import Avatar from "../Home/Avatar";
import { useState } from "react";
import { GlobalStyles } from "../../constants/styles";
import Input from "../UI/Input";
import Button from "../UI/Button";
import ErrorBanner from "../UI/ErrorBanner";

function ProfileForm({
  onSubmit,
  onCancel,
  onChange,
  defaultValues,
  serverError,
}) {
  const [inputs, setInputs] = useState({
    email: { value: defaultValues.email, isValid: true },
    name: { value: defaultValues.name, isValid: true },
    bio: { value: defaultValues.bio, isValid: true },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => ({
      ...curInputs,
      [inputIdentifier]: { value: enteredValue, isValid: true },
    }));
    onChange();
  }

  function submitHandler() {
    const profileData = {
      email: inputs.email.value,
      name: inputs.name.value.trim(),
      bio: inputs.bio.value.trim()
    }
    const nameLength = profileData.name.length
    const bioLength = profileData.bio.length

    const nameIsValid = nameLength > 0 && nameLength <= 20
    const bioIsValid = bioLength <= 60

    if (nameIsValid && bioIsValid) {
      onSubmit({
        name: profileData.name,
        bio: profileData.bio
      })
    } else {
      setInputs((curInputs) => {
        return {
          email: { value: curInputs.email.value, isValid: true},
          name: { value: curInputs.name.value, isValid: nameIsValid},
          bio: { value: curInputs.bio.value, isValid: bioIsValid}
        }
      })
    }
  }

  function cancelHandler() {
    onCancel();
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar name={inputs.name.value} size={88} />
        <Text style={styles.avatarCaptionTextStyle}>
          이니셜은 이름 첫 글자로 자동
        </Text>
      </View>
      <Input
        title="이메일"
        help="이메일을 바꿀 수 없어요."
        editable={false}
        value={inputs.email.value}
      />
      <Input
        title="이름"
        placeholder="이름"
        showCounter={true}
        maxLength={20}
        value={inputs.name.value}
        onChangeText={(name) => inputChangedHandler("name", name)}
        invalid={!inputs.name.isValid}
        errorText="이름을 1~20자로 입력해주세요."
      />
      <Input
        title="소개 (선택)"
        placeholder="나를 한 줄로 소개해보세요"
        multiline
        showCounter={true}
        maxLength={60}
        value={inputs.bio.value}
        onChangeText={(bio) => inputChangedHandler("bio", bio)}
        invalid={!inputs.bio.isValid}
        inputStyle={styles.bioInputStyle}
      />
      {serverError && (
        <ErrorBanner>{serverError}</ErrorBanner>
      )}
      <View style={styles.buttonsContainer}>
        <Button
          title="취소"
          onPress={cancelHandler}
          mode="ghost"
          style={styles.buttonStyle}
        />
        <Button
          title="저장"
          onPress={submitHandler}
          style={styles.buttonStyle}
        />
      </View>
    </View>
  );
}

export default ProfileForm;

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  avatarContainer: {
    gap: 10,
    alignItems: "center",
  },
  avatarCaptionTextStyle: {
    ...GlobalStyles.fonts.caption,
    color: GlobalStyles.colors.gray600,
  },
  bioInputStyle: {
    minHeight: 52,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  buttonStyle: {
    flex: 1,
  },
});
