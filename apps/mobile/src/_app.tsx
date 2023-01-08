import React from "react";

import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { TRPCProvider } from "./utils/trpc";

import { HomeScreen } from "./screens/Home";

export const App: React.FC = () => {
	return (
		<TRPCProvider>
			<SafeAreaProvider>
				<HomeScreen />
				<StatusBar />
			</SafeAreaProvider>
		</TRPCProvider>
	);
};
