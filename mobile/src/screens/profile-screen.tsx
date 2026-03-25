import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
import { atoms } from "../styles/atoms";
import { theme } from "../styles/theme";
import FontAwesomeFreeSolid from "@react-native-vector-icons/fontawesome-free-solid";
import { YStack } from "../components/YStack";
import { XStack } from "../components/XStack";
import { LoadingIndicator } from "../components/LoadingIndicator";
import useLogin from "../hooks/use-login";
import useAuth from "../hooks/use-auth";
import { useEffect } from "react";
import Background from "../components/Background";

interface ProfileScreenProps {
	navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
	const { loading, user, fetchAuthUser } = useAuth();
	const { logout } = useLogin();

	useEffect(() => {
		fetchAuthUser();
	}, [fetchAuthUser]);

	return (
		<Background>
			<View style={[atoms.flex_1, { backgroundColor: '#F3F4F6' }]}>
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
						borderBottomColor: '#F3F4F6',
					}
				]}>
					<TouchableOpacity
						style={[atoms.h_10, atoms.w_10, atoms.justify_center, atoms.items_center]} onPress={() => { }}
					>
						<Text>
							{/* <FontAwesomeFreeSolid name="chevron-left" size={20} color="#0F172A" /> */}
						</Text>
					</TouchableOpacity>
					<Text
						style={[
							atoms.text_lg,
							atoms.font_semibold,
							{ color: '#0F172A', lineHeight: 28 }
						]}
					>
						Profile Settings
					</Text>
					<TouchableOpacity
						style={[atoms.h_10, atoms.w_10, atoms.justify_center, atoms.items_center]}
						onPress={() => { }}
					>
						<Text>
							<FontAwesomeFreeSolid name="gear" size={20} color="#0F172A" />
						</Text>
					</TouchableOpacity>
				</View>

				{loading && <LoadingIndicator />}
				{!loading && <ScrollView
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
											backgroundColor: '#e8f4f8',
											borderColor: '#0DF2F233',
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
											backgroundColor: '#0DF2F2',
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
								style={[atoms.text_sm, atoms.mb_2, { color: "#6B7280" }]}
							>
								@{user?.username}
							</Text>
							<View
								style={[
									atoms.px_3,
									atoms.py_1,
									atoms.rounded_full,
									{ backgroundColor: '#0DF2F21A' }]}
							>
								<Text style={[atoms.text_xs, atoms.font_bold, { color: '#0DF2F2' }]}>
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
										color: '#0F172A',
									}
								]}>
									Account Details
								</Text>
								<TouchableOpacity onPress={() => { }}>
									<Text
										style={[atoms.text_sm, atoms.font_semibold, { color: '#0DF2F2' }]}
									>
										Edit Details
									</Text>
								</TouchableOpacity>
							</View>

							<YStack gap={16}>
								<YStack gap={4}>
									<Text style={[atoms.text_xs, atoms.font_medium, { color: "#9CA3AF" }]}>
										EMAIL ADDRESS
									</Text>
									<View style={[
										atoms.border_sm,
										atoms.py_2,
										atoms.px_3,
										atoms.rounded_xl,
										{
											borderColor: '#E5E7EB',
											backgroundColor: '#F9FAFB'
										}]}
									>
										<Text
											style={[atoms.text_sm, { color: '#6B7280' }]}>
											{user?.email}
										</Text>
									</View>
								</YStack>

								<YStack gap={4}>
									<Text style={[atoms.text_xs, atoms.font_medium, { color: "#9CA3AF" }]}>
										FIRST NAME
									</Text>
									<View style={[
										atoms.py_2,
										atoms.px_3,
										atoms.rounded_xl,
									]}>
										<Text style={[atoms.text_sm, { color: '#0F172A' }]}>
											{user?.firstName}
										</Text>
									</View>
								</YStack>

								<YStack gap={4}>
									<Text style={[atoms.text_xs, atoms.font_medium, { color: "#9CA3AF" }]}>
										LAST NAME
									</Text>
									<View style={[
										atoms.py_2,
										atoms.px_3,
										atoms.rounded_xl,
									]}>
										<Text style={[atoms.text_sm, { color: '#0F172A' }]}>
											{user?.lastName}
										</Text>
									</View>
								</YStack>

								<YStack gap={4}>
									<Text style={[atoms.text_xs, atoms.font_medium, { color: "#9CA3AF" }]}>
										AGE
									</Text>
									<View style={[
										atoms.py_2,
										atoms.px_3,
										atoms.rounded_xl,
									]}>
										<Text style={[atoms.text_sm, { color: '#0F172A' }]}>
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
											style={[atoms.h_8, atoms.w_8, atoms.justify_center, atoms.items_center, atoms.rounded_lg, { backgroundColor: '#F1F5F9' }]}
										>
											<Text>
												<FontAwesomeFreeSolid name="shopping-bag" size={16} color="#374151" />
											</Text>
										</View>
										<Text style={[
											atoms.text_base,
											atoms.font_medium,
											{ color: '#374151' }
										]}
										>
											Order History
										</Text>
									</XStack>
									<Text>
										<FontAwesomeFreeSolid name="chevron-right" size={16} color="#D1D5DB" />
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
											style={[atoms.h_8, atoms.w_8, atoms.justify_center, atoms.items_center, atoms.rounded_lg, { backgroundColor: '#FEF2F2' }]}
										>
											<Text>
												<FontAwesomeFreeSolid name="arrow-right-from-bracket" size={16} color="#EF4444" />
											</Text>
										</View>
										<Text style={[
											atoms.text_base,
											atoms.font_medium,
											{ color: '#EF4444' }
										]}
										>
											Logout
										</Text>
									</XStack>
								</TouchableOpacity>
							</View>
						</YStack>
					</YStack>
				</ScrollView>}
			</View>
		</Background>
	);
};

export { ProfileScreen };