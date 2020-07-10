import React, {Component, isValidElement} from "react";
import {connect} from "react-redux";
import {ActivityIndicator, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, View} from "react-native";
import styles from "../Styles/LoginStyles";
import {LoginConstants, LoginValidations} from "../Utils/Constants";
import OfflineNoticeManager from "../../../BaseModule/Managers/OfflineNoticeManager/OfflineNoticeManager";
import AppStyles from "../../../BaseModule/Themes/AppStyles";
import RNMaterialTextInput from "../../../BaseModule/UI/CommonUI/RNMaterialTextInput";
import SafeAreaViewUI from "../../../BaseModule/UI/CustomUI/SafeAreaViewUI";
import RNTouchableOpacity from "../../../BaseModule/UI/CommonUI/RNTouchableOpacity";
import {isValidString} from "../../../BaseModule/Utils/helpers";
import AuthManager from "../../../BaseModule/Managers/AuthManager/AuthManager";
import { showErrorMessage, showInfoMessage } from "../../../BaseModule/Network/NetworkHelpers";
import { isValidEmail, validateFields } from "../../../BaseModule/Utils/FormFieldValidators";

class Login extends Component {
    state = {
        formFields: {
            userEmail: { value: "", hasError: false, errorMsg: "" },
            password: { value: "", hasError: false, errorMsg: "" }
        },
        hasError: false,
        loading: false
    };

    validators = {
        userEmail: [
            (v, m) => isValidString(v, LoginValidations.EMAIL_CANNOT_BE_EMPTY),
            isValidEmail
        ],
        password: [
            (v, m) => isValidString(v, LoginValidations.PASSWORD_CANNOT_BE_EMPTY)
        ]
    };

    componentDidMount() {}

    updateState(key, value) {
        const valueObject = this.state.formFields[key];
        valueObject.value = value;
        this.setState({ formFields: { ...this.state.formFields, [key]: valueObject } });
    }

    validateFormFields() {
        let validationResults = validateFields({...this.state.formFields}, this.validators);
        this.setState({
            formFields: validationResults.results,
            hasError: validationResults.hasError
        });
        return validationResults.hasError;
    }

    handleLoginSubmit() {
        Keyboard.dismiss();

        // Early return if the fields are not valid
        if (this.validateFormFields()) { return }

        const email = this.state.formFields.userEmail.value;
        const password = this.state.formFields.password.value;

        this.setState({ loading: true });
        AuthManager.login(email, password)
            .then(user => {
                this.props.navigation.navigate("appStack");
            })
            .catch(error => {
                showErrorMessage(error.message);
            })
            .finally(() => {
                this.setState({ loading: false });
            });
    }

    handleForgotPassword() {
        const email = this.state.formFields.userEmail.value;

        // Early return if the email is not valid
        if (!isValidElement(email)) {
            showErrorMessage(LoginValidations.INVALID_EMAIL_PATTERN);
            return;
        }

        this.setState({ loading: true });
        AuthManager.resetPassword(email)
            .then(() => {
                showInfoMessage(LoginConstants.FORGOT_PASSWORD_SENT);
            })
            .catch((error) => {
                showInfoMessage(LoginConstants.FORGOT_PASSWORD_SENT_FAILED);
            })
            .finally(() => {
                this.setState({ loading: false });
            });
    }

    renderMainView() {
        return (
            <View style={styles.centerAlignedTextView}>
                <View style={styles.loginContainerStyle}>
                    <Text animation="zoomIn" style={styles.loginTitleTextStyle}>
                        {LoginConstants.LOGIN_LABEL}
                    </Text>
                    <Text style={styles.loginSecondTitleTextStyle}>
                        {LoginConstants.SIGN_IN_LABEL}
                    </Text>
                    <View style={styles.inputViewStyle}>
                        <RNMaterialTextInput
                            required={true}
                            label={LoginConstants.USER_EMAIL_LABEL}
                            keyboardType={"email-address"}
                            autoCapitalize={"none"}
                            onChangeText={text => this.updateState("userEmail", text)}
                            value={this.state.formFields.userEmail.value}
                            error={this.state.formFields.userEmail.errorMsg}
                            autoCorrect={false}
                            autoFocus
                        />
                        <RNMaterialTextInput
                            required={true}
                            label={LoginConstants.PASSWORD_LABEL}
                            secureTextEntry={true}
                            onChangeText={text => this.updateState("password", text)}
                            value={this.state.formFields.password.value}
                            error={this.state.formFields.password.errorMsg}
                            autoCorrect={false}
                        />
                        <RNTouchableOpacity
                            style={styles.forgotPasswordButtonStyle}
                            onPress={() => this.handleForgotPassword()}
                        >
                            <Text style={styles.forgotPasswordTextStyle}>
                                {LoginConstants.FORGOT_PASSWORD}
                            </Text>
                        </RNTouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    renderContentView() {
        return (
            <SafeAreaViewUI style={AppStyles.container}>
                <OfflineNoticeManager />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={"handled"}
                    style={styles.scrollViewStyle}
                >
                    <View style={styles.topIconAndHelpStyle}>
                        <Image
                            animation="slideInDown"
                            source={require("../../../BaseModule/Images/common/no_profile_icon.png")}
                            style={styles.imageStyle}
                            resizeMode={"contain"}
                        />
                    </View>
                    {this.renderMainView()}
                </ScrollView>
                <View animation="slideInUp" style={styles.bottomMainVewStyle}>
                    <RNTouchableOpacity
                        onPress={() => this.handleLoginSubmit()}
                        style={styles.loginButtonStyle}
                    >
                        <Text style={styles.loginTextStyle}>
                            {LoginConstants.LOGIN_LABEL}
                        </Text>
                    </RNTouchableOpacity>
                    <RNTouchableOpacity
                        style={styles.newUserButtonStyle}
                        activeOpacity={1}
                        onPress={() => this.props.navigation.navigate("registerScreen")}
                    >
                        <Text style={styles.newUserText1Style}>
                            {LoginConstants.NEW_USER_LABEL}
                        </Text>
                        <Text style={styles.newUserText2Style}>
                            {LoginConstants.REGISTER_NOW}
                        </Text>
                    </RNTouchableOpacity>
                    <View style={styles.dashViewStyle} />
                </View>
            </SafeAreaViewUI>
        );
    }

    renderLoading() {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : null}
                showsVerticalScrollIndicator={false}
                style={styles.mainContainerStyle}
            >
                {this.state.loading && this.renderLoading()}
                {this.renderContentView()}
            </KeyboardAvoidingView>
        );
    }
}

Login.navigationOptions = {
    header: null
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
