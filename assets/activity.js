import { NativeModules } from 'react-native';

let requestCode = 0;

export async function startActivityForResult(intent, extraData) {
    const { StartActivity } = NativeModules;
    console.log(intent, extraData);
    const componentName = await StartActivity.resolveActivity(intent);
    if (!componentName) {
        // You could also display a dialog with the link to the app store.
        throw new Error(`Cannot resolve activity for intent ${intent}. Did you install the app?`);
    }

    const response = await StartActivity.startActivityForResult(
        ++requestCode,
        action,
        extraData);

    if (response.resultCode !== StartActivity.OK) {
        throw new Error('Invalid result from child activity.');
    }

    return response.data;
};

export default startActivityForResult;