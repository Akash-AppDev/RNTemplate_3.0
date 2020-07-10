import React, { Component } from "react";
import { connect } from "react-redux";
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import styles from "../Styles/RegistrationScreenStyle";
import {LoginValidations, RegisterConstants} from "../Utils/Constants";
import OfflineNoticeManager from "../../../BaseModule/Managers/OfflineNoticeManager/OfflineNoticeManager";
import AppStyles from "../../../BaseModule/Themes/AppStyles";
import RNMaterialTextInput from "../../../BaseModule/UI/CommonUI/RNMaterialTextInput";
import SafeAreaViewUI from "../../../BaseModule/UI/CustomUI/SafeAreaViewUI";
import RNTouchableOpacity from "../../../BaseModule/UI/CommonUI/RNTouchableOpacity";
import AuthManager from "../../../BaseModule/Managers/AuthManager/AuthManager";
import { showErrorMessage } from "../../../BaseModule/Network/NetworkHelpers";
import { isValidEmail, isValidString, validateFields, isValidPhoneNumber } from "../../../BaseModule/Utils/FormFieldValidators";

class RegistrationScreen extends Component {
    componentDidMount() { }

    state = {
        formFields: {
            userEmail: { value: "", hasError: false, errorMsg: "" },
            password: { value: "", hasError: false, errorMsg: "" },
            userName: { value: "", hasError: false, errorMsg: "" },
            address: { value: "", hasError: false, errorMsg: "" },
            contactNumber: { value: "", hasError: false, errorMsg: "" }
        },
        hasError: false,
        loading: false
    };

    validators = {
        userEmail: [
            (v, m) => isValidString(v, LoginValidations.EMAIL_CANNOT_BE_EMPTY),
            isValidEmail
        ],
        contactNumber: [
            (v, m) => isValidString(v, LoginValidations.CONTACT_NUMBER_CANNOT_BE_EMPTY),
            isValidPhoneNumber
        ],
        password: [(v, m) => isValidString(v, LoginValidations.PASSWORD_CANNOT_BE_EMPTY)],
        userName: [(v, m) => isValidString(v, LoginValidations.NAME_CANNOT_BE_EMPTY)],
        address: [(v, m) => isValidString(v, LoginValidations.ADDRESS_CANNOT_BE_EMPTY)],
    }

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

    handleRegisterSubmit() {
        Keyboard.dismiss();

        // Early return if the fields are not valid
        if (this.validateFormFields()) { return }

        const email = this.state.formFields.userEmail.value;
        const password = this.state.formFields.password.value;

        this.setState({ loading: true });
        AuthManager.createAccount(email, password)
            .then(() => {
                this.props.navigation.navigate('appStack')
            })
            .catch(error => {
                showErrorMessage(error.message);
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
                        {RegisterConstants.REGISTER_LABEL}
                    </Text>
                    <Text style={styles.loginSecondTitleTextStyle}>
                        {RegisterConstants.REGISTER_IN_LABEL}
                    </Text>

                    <View style={styles.inputViewStyle}>

                        <RNMaterialTextInput
                            required={true}
                            label={RegisterConstants.EMAIL_ID}
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
                            label={RegisterConstants.PASSWORD}
                            secureTextEntry={true}
                            onChangeText={text => this.updateState("password", text)}
                            value={this.state.formFields.password.value}
                            error={this.state.formFields.password.errorMsg}
                            autoCorrect={false}
                        />

                        <RNMaterialTextInput
                            required={true}
                            label={RegisterConstants.USER_NAME}
                            onChangeText={text => this.updateState("userName", text)}
                            value={this.state.formFields.userName.value}
                            error={this.state.formFields.userName.errorMsg}
                            autoCorrect={false}
                        />

                        <RNMaterialTextInput
                            required={true}
                            label={RegisterConstants.CONTACT_NUMBER}
                            maxLength={14}
                            keyboardType={"numeric"}
                            onChangeText={text => this.updateState("contactNumber", text)}
                            value={this.state.formFields.contactNumber.value}
                            error={this.state.formFields.contactNumber.errorMsg}
                            autoCorrect={false}
                        />

                        <RNMaterialTextInput
                            required={true}
                            label={RegisterConstants.ADDRESS}
                            onChangeText={text => this.updateState("address", text)}
                            value={this.state.formFields.address.value}
                            error={this.state.formFields.address.errorMsg}
                            autoCorrect={false}
                        />
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
                    {this.renderMainView()}
                </ScrollView>
                <View animation="slideInUp" style={styles.bottomMainVewStyle}>
                    <RNTouchableOpacity
                        onPress={() => this.handleRegisterSubmit()}
                        style={styles.loginButtonStyle}
                    >
                        <Text style={styles.loginTextStyle}>
                            {RegisterConstants.REGISTER_LABEL}
                        </Text>
                    </RNTouchableOpacity>

                    <RNTouchableOpacity
                        style={styles.newUserButtonStyle}
                        activeOpacity={1}
                        onPress={() => this.props.navigation.navigate("loginScreen")}
                    >
                        <Text style={styles.newUserText1Style}>
                            {RegisterConstants.USER_LABEL}
                        </Text>
                        <Text style={styles.newUserText2Style}>
                            {RegisterConstants.LOGIN_NOW}
                        </Text>
                    </RNTouchableOpacity>

                    <View style={styles.dashViewStyle} />
                </View>
            </SafeAreaViewUI>
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

    renderLoading() {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
}

RegistrationScreen.navigationOptions = {
    header: null
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen);
