import { View, StyleSheet } from "react-native";
import { useState } from "react";

import ShadowBox from "../UI/ShadowBox";
import { GlobalStyles } from "../../constants/styles";
import Input from "../UI/Input";
import Button from "../UI/Button";
import PasswordMeter from "./PasswordMeter";
import { emailValidator } from "../../util/validator";
import ErrorBanner from "../UI/ErrorBanner";
import { getStrength } from "../../util/password";

function AuthForm({ isLogin, onSubmit, serverError, onChange }) {
  const [inputs, setInputs] = useState({
    name: { value: "", isValid: true },
    email: { value: "", isValid: true },
    password: { value: "", isValid: true },
    confirm: { value: "", isValid: true },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((current) => ({
      ...current,
      [inputIdentifier]: { value: enteredValue, isValid: true },
    }));
    onChange();
  }

  function submitHandler() {
    const userData = {
      name: inputs.name.value.trim(),
      email: inputs.email.value.trim(),
      password: inputs.password.value,
      confirm: inputs.confirm.value,
    };
    const nameLength = userData.name.length;
    const passwordLength = userData.password.length;

    const emailIsValid = emailValidator(userData.email);
    const passwordIsValid = isLogin
      ? passwordLength >= 1
      : passwordLength >= 8 && passwordLength <= 32;

    const nameIsValid = isLogin ? true : nameLength >= 1 && nameLength <= 20;
    const confirmIsValid = isLogin
      ? true
      : userData.password === userData.confirm;

    if (nameIsValid && emailIsValid && passwordIsValid && confirmIsValid) {
      onSubmit({
        name: userData.name,
        email: userData.email.toLowerCase(),
        password: userData.password,
      });
    } else {
      setInputs((curInputs) => {
        return {
          name: { value: curInputs.name.value, isValid: nameIsValid },
          email: { value: curInputs.email.value, isValid: emailIsValid },
          password: {
            value: curInputs.password.value,
            isValid: passwordIsValid,
          },
          confirm: { value: curInputs.confirm.value, isValid: confirmIsValid },
        };
      });
    }
  }

  function emailPasswordForm() {
    return (
      <>
        <Input
          title="이메일"
          placeholder="demo@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={inputs.email.value}
          onChangeText={(text) => inputChangedHandler("email", text)}
          invalid={!inputs.email.isValid}
        />
        <Input
          title="비밀번호"
          placeholder={isLogin ? "비밀번호" : "8~32자"}
          secureTextEntry
          maxLength={32}
          value={inputs.password.value}
          onChangeText={(text) => inputChangedHandler("password", text)}
          invalid={!inputs.password.isValid}
        />
      </>
    );
  }

  function signInForm() {
    return emailPasswordForm();
  }

  function signUpForm() {
    return (
      <>
        <Input
          title="이름"
          placeholder="김데모"
          maxLength={20}
          value={inputs.name.value}
          onChangeText={(text) => inputChangedHandler("name", text)}
          invalid={!inputs.name.isValid}
        />
        {emailPasswordForm()}
        <PasswordMeter level={getStrength(inputs.password.value)} />
        <Input
          title="비밀번호 확인"
          placeholder="동일한 비밀번호를 입력하세요."
          secureTextEntry
          maxLength={32}
          value={inputs.confirm.value}
          onChangeText={(text) => inputChangedHandler("confirm", text)}
          invalid={!inputs.confirm.isValid}
        />
      </>
    );
  }
  return (
    <ShadowBox faceStyle={styles.faceContainer}>
      {isLogin ? signInForm() : signUpForm()}
      {serverError && <ErrorBanner>{serverError}</ErrorBanner>}
      <Button title={isLogin ? "로그인" : "가입하기"} onPress={submitHandler} />
    </ShadowBox>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  faceContainer: {
    padding: 20,
    gap: 16,
    backgroundColor: GlobalStyles.colors.white,
  },
});
