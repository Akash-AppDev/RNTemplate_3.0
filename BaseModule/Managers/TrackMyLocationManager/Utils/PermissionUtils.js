import { PermissionsAndroid } from 'react-native';

export async function requestLocationPermission() {
    try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return PermissionsAndroid.RESULTS.GRANTED;
        } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            return PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN;
        } else {
            return PermissionsAndroid.RESULTS.DENIED;
        }
    } catch (err) {
        return false;
    }
}
