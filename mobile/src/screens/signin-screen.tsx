import { FC, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import Background from "../components/Background"
import { styles } from "./styles/signin-screen-styles"
import Logo from "../components/Logo"
import TextInput from "../components/TextInput"
import Button from "../components/Button"
import { ITextInput } from "../types/text-input"
import { atoms } from "../styles/atoms"
import { theme } from "../styles/theme"
import { YStack } from "../components/YStack"
import { XStack } from "../components/XStack"
import LoginButton from "../components/LoginButton"
import CheckBox from "../components/CheckBox"

interface ISignInScreen {
	navigation: any
}

export const SignInScreen: FC<ISignInScreen> = ({ navigation }: any) => {

	const [email, setEmail] = useState<ITextInput>({
		value: 'eve.holt@reqres.in',
		error: '',
	});
	const [password, setPassword] = useState<ITextInput>({
		value: 'cityslicka',
		error: '',
	});

	function onPressSignIn() {
		console.log('On Press Sign In Button')
		console.log(email)
		console.log(password)
		//TODO Handle calling api with email and password
		navigation.navigate('Home');
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

						<XStack p={1} style={[atoms.rounded_xl, atoms.h_11, { backgroundColor: "#F3F4F6" }]}>
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
								placeholder={'Enter your email'}
								returnKeyType="next"
								onChangeText={(text: string) => setEmail({ value: text, error: '' })}
								// error={!!email.error}
								errorText={email.error}
								autoCapitalize="none"
								autoComplete="email"
								textContentType="emailAddress"
								keyboardType="email-address"
							/>
							<TextInput
								label="Password"
								placeholder={'Enter your password'}
								returnKeyType="done"
								onChangeText={(text: string) => setPassword({ value: text, error: '' })}
								// error={!!password.error}
								errorText={password.error}
								secureTextEntry
							/>

							<YStack style={[atoms.items_end]}>
								<TouchableOpacity
									onPress={() => navigation.replace('ForgotPasswordScreen')}
								>
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
								onPress={() => {
									onPressSignIn();
								}}
								style={[atoms.shadow_md]}
							>
								<Text>Sign In</Text>
							</Button>
						</YStack>

					</YStack>
				</View>
			</View>
		</Background>
	)
}
