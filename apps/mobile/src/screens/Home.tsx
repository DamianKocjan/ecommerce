import React from "react";

import { Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export const HomeScreen: React.FC = () => {
	return (
		<SafeAreaView className="bg-white">
			<View className="flex h-full w-full items-center justify-center p-4">
				<Text className="text-5xl font-bold text-black">Ecommerce - WIP</Text>
			</View>
		</SafeAreaView>
	);
};
