import React from 'react';

import { RNCamera } from 'react-native-camera';

import QRCodeScanner from 'react-native-qrcode-scanner';

import QRCode from 'react-native-qrcode-svg';

import { View, StyleSheet, Text } from 'react-native';

export default function ScanQR() {
	const [text, setText] = React.useState('text');

	const onRead = (e) => {
		console.log(e.data);
		setText(e.data);
	};

	return (
		<View style={styles.container}>
			<QRCodeScanner
				onRead={onRead}
				style={{ flex: 1 }}
				type={RNCamera.Constants.Type.back}
				flashMode={RNCamera.Constants.FlashMode.off}
				captureAudio={false}
			/>
			{text !== 'text' ? <QRCode value={text} style={{ marginLeft: 30 }} /> : null}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#fdfdfd',
	},
});
