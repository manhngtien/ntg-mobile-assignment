import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import { atoms } from "../styles/atoms";
import { theme } from "../styles/theme";
import FontAwesomeFreeSolid from "@react-native-vector-icons/fontawesome-free-solid";
import { YStack } from "../components/YStack";
import { XStack } from "../components/XStack";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { Background } from "../components/Background";
import { useAuth } from "../features/auth/hooks/use-auth";
import { useLogin } from "../features/auth/hooks/use-login";

interface ProfileScreenProps {
	navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
	const { user } = useAuth();
	const { logout } = useLogin();

	return (
		<Background>
			<View style={[atoms.flex_1, { backgroundColor: theme.colors.gray_50 }]}>
				{/* Header */}
				<View style={[
					atoms.flex_row,
					atoms.justify_between,
					atoms.items_center,
					atoms.p_4,
					{
						position: 'relative',
						backgroundColor: theme.colors.white,
						borderBottomWidth: 1,
						borderBottomColor: theme.colors.gray_50,
					}
				]}>
					<TouchableOpacity
						style={[atoms.h_10, atoms.w_10, atoms.justify_center, atoms.items_center]} onPress={() => { }}
					>
						<Text>
							{/* <FontAwesomeFreeSolid name="chevron-left" size={20} color={theme.colors.dark_300} /> */}
						</Text>
					</TouchableOpacity>
					<Text
						style={[
							atoms.text_lg,
							atoms.font_semibold,
							{ color: theme.colors.dark_300, lineHeight: 28 }
						]}
					>
						Profile Settings
					</Text>
					<TouchableOpacity
						style={[atoms.h_10, atoms.w_10, atoms.justify_center, atoms.items_center]}
						onPress={() => { }}
					>
						<Text>
							<FontAwesomeFreeSolid name="gear" size={20} color={theme.colors.dark_300} />
						</Text>
					</TouchableOpacity>
				</View>

				<ScrollView
					showsVerticalScrollIndicator={false}
					style={[atoms.flex_1, atoms.p_4]}
				>
					<YStack gap={24}>
						{/* Profile Info */}
						<YStack
							gap={0}
							style={[
								atoms.items_center,
								atoms.py_6,
								atoms.rounded_xl,
								atoms.shadow_xs,
								{ backgroundColor: theme.colors.white }
							]}
						>
							<View
								style={{
									position: 'relative',
									width: 96,
									height: 96,
								}}
							>
								<View
									style={[
										atoms.justify_center,
										atoms.items_center,
										atoms.rounded_full,
										atoms.border_lg,
										{
											backgroundColor: theme.colors.cyan_50,
											borderColor: theme.colors.cyan_200_20,
											overflow: 'hidden',
										}
									]}
								>
									<Image source={require('../assets/images/avatar.jpg')} style={{
										width: '100%',
										height: '100%',
									}} />
								</View>
								<TouchableOpacity
									style={[
										atoms.h_8,
										atoms.w_8,
										atoms.rounded_full,
										atoms.justify_center,
										atoms.items_center,
										{
											position: 'absolute',
											bottom: 0,
											right: 0,
											backgroundColor: theme.colors.cyan,
											borderWidth: 2,
											borderColor: theme.colors.white,
										}
									]}
									onPress={() => { }}
								>
									<FontAwesomeFreeSolid name="pen" size={10} color={theme.colors.black} />
								</TouchableOpacity>
							</View>
							<Text style={[atoms.text_xl, atoms.font_semibold]}>
								{user?.firstName} {user?.lastName}
							</Text>
							<Text
								style={[atoms.text_sm, atoms.mb_2, { color: theme.colors.gray_500 }]}
							>
								@{user?.username}
							</Text>
							<View
								style={[
									atoms.px_3,
									atoms.py_1,
									atoms.rounded_full,
									{ backgroundColor: theme.colors.cyan_100 }]}
							>
								<Text style={[atoms.text_xs, atoms.font_bold, { color: theme.colors.cyan }]}>
									PREMIUM MEMBER
								</Text>
							</View>
						</YStack>

						{/* Account Details Section */}
						<YStack
							gap={24}
							style={
								[
									atoms.p_6,
									atoms.rounded_xl,
									atoms.shadow_xs,
									{ backgroundColor: theme.colors.white }
								]}
						>
							<View
								style={[
									atoms.flex_row,
									atoms.justify_between,
									atoms.items_center,
								]}>
								<Text style={[
									atoms.text_lg,
									atoms.font_semibold,
									{
										color: theme.colors.dark_300,
									}
								]}>
									Account Details
								</Text>
								<TouchableOpacity onPress={() => { }}>
									<Text
										style={[atoms.text_sm, atoms.font_semibold, { color: theme.colors.cyan }]}
									>
										Edit Details
									</Text>
								</TouchableOpacity>
							</View>

							<YStack gap={16}>
								<YStack gap={4}>
									<Text style={[atoms.text_xs, atoms.font_medium, { color: theme.colors.gray_400 }]}>
										EMAIL ADDRESS
									</Text>
									<View style={[
										atoms.border_sm,
										atoms.py_2,
										atoms.px_3,
										atoms.rounded_xl,
										{
											borderColor: theme.colors.gray_300,
											backgroundColor: theme.colors.gray_100
										}]}
									>
										<Text
											style={[atoms.text_sm, { color: theme.colors.gray_500 }]}>
											{user?.email}
										</Text>
									</View>
								</YStack>

								<YStack gap={4}>
									<Text style={[atoms.text_xs, atoms.font_medium, { color: theme.colors.gray_400 }]}>
										FIRST NAME
									</Text>
									<View style={[
										atoms.py_2,
										atoms.px_3,
										atoms.rounded_xl,
									]}>
										<Text style={[atoms.text_sm, { color: theme.colors.dark_300 }]}>
											{user?.firstName}
										</Text>
									</View>
								</YStack>

								<YStack gap={4}>
									<Text style={[atoms.text_xs, atoms.font_medium, { color: theme.colors.gray_400 }]}>
										LAST NAME
									</Text>
									<View style={[
										atoms.py_2,
										atoms.px_3,
										atoms.rounded_xl,
									]}>
										<Text style={[atoms.text_sm, { color: theme.colors.dark_300 }]}>
											{user?.lastName}
										</Text>
									</View>
								</YStack>

								<YStack gap={4}>
									<Text style={[atoms.text_xs, atoms.font_medium, { color: theme.colors.gray_400 }]}>
										AGE
									</Text>
									<View style={[
										atoms.py_2,
										atoms.px_3,
										atoms.rounded_xl,
									]}>
										<Text style={[atoms.text_sm, { color: theme.colors.dark_300 }]}>
											{user?.age || 'N/A'}
										</Text>
									</View>
								</YStack>
							</YStack>
						</YStack>

						<YStack gap={12} style={[atoms.mb_8]}>
							<View style={[
								atoms.rounded_xl,
								atoms.shadow_xs,
								atoms.p_4,
								{ backgroundColor: theme.colors.white }
							]}>
								<TouchableOpacity
									style={[atoms.flex_row, atoms.justify_between, atoms.items_center]}
									onPress={() => navigation.navigate('Orders')}
								>
									<XStack gap={12}>
										<View
											style={[atoms.h_8, atoms.w_8, atoms.justify_center, atoms.items_center, atoms.rounded_lg, { backgroundColor: theme.colors.slate_100 }]}
										>
											<Text>
												<FontAwesomeFreeSolid name="shopping-bag" size={16} color={theme.colors.gray_700} />
											</Text>
										</View>
										<Text style={[
											atoms.text_base,
											atoms.font_medium,
											{ color: theme.colors.gray_700 }
										]}
										>
											Order History
										</Text>
									</XStack>
									<Text>
										<FontAwesomeFreeSolid name="chevron-right" size={16} color={theme.colors.gray_200} />
									</Text>
								</TouchableOpacity>
							</View>

							<View style={[
								atoms.rounded_xl,
								atoms.shadow_xs,
								atoms.p_4,
								{ backgroundColor: theme.colors.white }
							]}>
								<TouchableOpacity
									style={[atoms.flex_row, atoms.justify_between, atoms.items_center]}
									onPress={() => logout()}
								>
									<XStack gap={12}>
										<View
											style={[atoms.h_8, atoms.w_8, atoms.justify_center, atoms.items_center, atoms.rounded_lg, { backgroundColor: theme.colors.red_50 }]}
										>
											<Text>
												<FontAwesomeFreeSolid name="arrow-right-from-bracket" size={16} color={theme.colors.red_500} />
											</Text>
										</View>
										<Text style={[
											atoms.text_base,
											atoms.font_medium,
											{ color: theme.colors.red_500 }
										]}
										>
											Logout
										</Text>
									</XStack>
								</TouchableOpacity>
							</View>
						</YStack>
					</YStack>
				</ScrollView>

			</View>
		</Background>
	);
};

export { ProfileScreen };