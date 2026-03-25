import { FC, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { Background } from "../components/Background"
import { Logo } from "../components/Logo"
import { TextInput } from "../components/TextInput"
import { Button } from "../components/Button"
import { ITextInput } from "../types/text-input"
import { atoms } from "../styles/atoms"
import { theme } from "../styles/theme"
import { YStack } from "../components/YStack"
import { XStack } from "../components/XStack"
import { LoginButton } from "../components/LoginButton"
import { CheckBox } from "../components/CheckBox"
import { useLogin } from "../features/auth/hooks/use-login"

interface ILogInScreen {
	navigation: any
}

export const LogInScreen: FC<ILogInScreen> = ({ navigation }: any) => {
	const [email, setEmail] = useState<ITextInput>({
		value: '',
		error: '',
	});
	const [password, setPassword] = useState<ITextInput>({
		value: '',
		error: '',
	});

	const { loading, login } = useLogin();

	function onPressSignIn() {
		login({ username: email.value, password: password.value });
	}

	return (
		<Background>
			<View style={[atoms.flex_1, atoms.flex_col, atoms.h_full, atoms.w_full, atoms.p_4]}>
				<View style={[
					atoms.h_full,
					atoms.rounded_xl,
					atoms.border_sm,
					atoms.shadow_md,
					{
						backgroundColor: theme.colors.white,
						borderColor: '#F3F4F6',
					}
				]}>
					<YStack p={8} gap={32}>
						<YStack gap={16} style={[atoms.items_center]}>
							<Logo />
							<YStack gap={8} style={[atoms.items_center]}>
								<Text style={[atoms.text_xl2, atoms.font_bold, { lineHeight: 32 }]}>
									Welcome back
								</Text>
								<Text style={[atoms.text_base, { color: "#6B7280", lineHeight: 24 }]}>
									Please enter your details
								</Text>
							</YStack>
						</YStack>

						<XStack p={1} style={[atoms.items_stretch, atoms.rounded_xl, atoms.h_11, { backgroundColor: "#F3F4F6" }]}>
							<LoginButton style={[atoms.flex_1]} isTouchable={false}>
								<Text>Login</Text>
							</LoginButton>
							<LoginButton bg={theme.colors.transparent} style={[atoms.flex_1]}>
								<Text>Sign Up</Text>
							</LoginButton>
						</XStack>

						<YStack gap={16}>
							<TextInput
								label="Username"
								placeholder={'Enter your username'}
								returnKeyType="next"
								onChangeText={(text: string) => setEmail({ value: text, error: '' })}
								errorText={email.error}
								autoCapitalize="none"
								autoComplete="username"
							/>
							<TextInput
								label="Password"
								placeholder={'Enter your password'}
								returnKeyType="done"
								onChangeText={(text: string) => setPassword({ value: text, error: '' })}
								errorText={password.error}
								autoComplete="password"
								secureTextEntry
							/>

							<YStack style={[atoms.items_end]}>
								<TouchableOpacity>
									<Text style={[atoms.text_sm, atoms.font_medium, { color: theme.colors.cyan }]}>
										Forgot password?
									</Text>
								</TouchableOpacity>
							</YStack>

							<XStack gap={8} style={[atoms.items_center]}>
								<CheckBox />
								<Text style={[atoms.text_sm, { color: "#4B5563" }]}>
									Use biometrics for faster login
								</Text>
							</XStack>

							<Button
								loading={loading}
								onPress={() => {
									onPressSignIn();
								}}
								style={[atoms.shadow_md]}
							>
								Sign In
							</Button>
						</YStack>

					</YStack>
				</View>
			</View>
		</Background>
	)
}
