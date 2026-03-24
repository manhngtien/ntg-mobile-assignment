import * as React from 'react';
import { atoms } from '../styles/atoms';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { ProductCard } from '../components/ProductCard';
import { theme } from '../styles/theme';
import Background from '../components/Background';

interface HomeScreenProps {
	navigation: any;
}

const DATA = [
	{
		id: "1",
		title: "Sonic-ü Wireless...",
		category: "Electronics",
		price: 129,
		image:
			"https://images.unsplash.com/photo-1585386959984-a4155224a1ad",
	},
	{
		id: "2",
		title: "Metro Classic Timepiece",
		category: "Fashion",
		price: 85.5,
		image:
			"https://images.unsplash.com/photo-1523275335684-37898b6baf30",
	},
	{
		id: "3",
		title: "Artisan Ceramic Mug",
		category: "Home",
		price: 24,
		image:
			"https://images.unsplash.com/photo-1517685352821-92cf88aee5a5",
	},
	{
		id: "4",
		title: "Glow Essentials Kit",
		category: "Beauty",
		price: 45,
		image:
			"https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb",
	},
];

const categories = ["All Items", "Electronics", "Fashion", "Home"];

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
	return (
		<Background>
			<View style={[styles.container, atoms.flex_1, { backgroundColor: theme.colors.white }]}>
				{/* Header */}
				<View style={styles.header}>
					<Text style={styles.title}>Discover</Text>
					<View style={styles.headerIcons}>
						<Text style={styles.icon}>🔔</Text>
						<Text style={styles.icon}>🛒</Text>
					</View>
				</View>

				{/* Search */}
				<TextInput
					placeholder="Search products, brands..."
					style={styles.search}
				/>

				{/* Categories */}
				<View style={styles.categories}>
					{categories.map((item, index) => (
						<View
							key={item}
							style={[
								styles.categoryItem,
								index === 0 && styles.activeCategory,
							]}
						>
							<Text
								style={
									index === 0
										? styles.activeCategoryText
										: styles.categoryText
								}
							>
								{item}
							</Text>
						</View>
					))}
				</View>

				{/* Products */}
				<FlatList
					data={DATA}
					numColumns={2}
					keyExtractor={(item) => item.id}
					columnWrapperStyle={{ justifyContent: "space-between" }}
					renderItem={({ item }) => <ProductCard item={item} />}
					contentContainerStyle={{ paddingBottom: 100 }}
				/>

				{/* Bottom Tabs (mock) */}
				<View style={styles.tabBar}>
					<TabItem label="Shop" active />
					<TabItem label="Categories" />
					<TabItem label="Saved" />
					<TabItem label="Profile" />
				</View>
			</View>
		</Background>
	);
};

const TabItem = ({ label, active }: any) => {
	return (
		<View style={styles.tabItem}>
			<Text style={{ color: active ? "#00C2C7" : "#999" }}>
				{label}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5F5F5",
		padding: 16,
	},

	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},

	title: {
		fontSize: 24,
		fontWeight: "700",
	},

	headerIcons: {
		flexDirection: "row",
		gap: 12,
	},

	icon: {
		fontSize: 18,
	},

	search: {
		marginTop: 16,
		backgroundColor: "#EDEDED",
		borderRadius: 12,
		padding: 12,
	},

	categories: {
		flexDirection: "row",
		marginVertical: 16,
		gap: 10,
	},

	categoryItem: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
		backgroundColor: "#EAEAEA",
	},

	activeCategory: {
		backgroundColor: "#00C2C7",
	},

	categoryText: {
		color: "#555",
	},

	activeCategoryText: {
		color: "#fff",
		fontWeight: "600",
	},

	card: {
		width: "48%",
		marginBottom: 16,
	},

	image: {
		width: "100%",
		height: 150,
		borderRadius: 16,
	},

	heart: {
		position: "absolute",
		top: 8,
		right: 8,
		backgroundColor: "#fff",
		padding: 6,
		borderRadius: 20,
	},

	productTitle: {
		marginTop: 8,
		fontWeight: "600",
	},

	category: {
		color: "#888",
		fontSize: 12,
	},

	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 6,
	},

	price: {
		fontWeight: "700",
		fontSize: 16,
	},

	addBtn: {
		backgroundColor: "#00C2C7",
		width: 32,
		height: 32,
		borderRadius: 16,
		justifyContent: "center",
		alignItems: "center",
	},

	tabBar: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 12,
		backgroundColor: "#fff",
		borderTopWidth: 1,
		borderColor: "#eee",
	},

	tabItem: {
		alignItems: "center",
	},
});
