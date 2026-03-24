import { atoms } from '../styles/atoms';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ProductCard } from '../components/ProductCard';
import { theme } from '../styles/theme';
import Background from '../components/Background';
import { XStack } from '../components/XStack';
import { YStack } from '../components/YStack';
import FontAwesomeFreeSolid from '@react-native-vector-icons/fontawesome-free-solid';
import FilterChipList from '../components/FilterChipList';
import useGetProducts from '../hooks/use-get-products';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { useEffect } from 'react';

interface HomeScreenProps {
	navigation: any;
}

// const DATA = [
// 	{
// 		id: "1",
// 		title: "Sonic-ü Wireless...",
// 		category: "Electronics",
// 		price: 129,
// 		previousPrice: 149,
// 		image:
// 			"https://images.unsplash.com/photo-1585386959984-a4155224a1ad",
// 	},
// 	{
// 		id: "2",
// 		title: "Metro Classic Timepiece",
// 		category: "Fashion",
// 		price: 85.5,
// 		image:
// 			"https://images.unsplash.com/photo-1523275335684-37898b6baf30",
// 	},
// 	{
// 		id: "3",
// 		title: "Artisan Ceramic Mug",
// 		category: "Home",
// 		price: 24,
// 		image:
// 			"https://images.unsplash.com/photo-1517685352821-92cf88aee5a5",
// 	},
// 	{
// 		id: "4",
// 		title: "Glow Essentials Kit",
// 		category: "Beauty",
// 		price: 45,
// 		image:
// 			"https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb",
// 	},
// 	{
// 		id: "5",
// 		title: "Artisan Ceramic Mug",
// 		category: "Home",
// 		price: 24,
// 		image:
// 			"https://images.unsplash.com/photo-1517685352821-92cf88aee5a5",
// 	},
// 	{
// 		id: "6",
// 		title: "Glow Essentials Kit",
// 		category: "Beauty",
// 		price: 45,
// 		image:
// 			"https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb",
// 	},
// ];

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
	const { products, getProducts } = useGetProducts();

	useEffect(() => {
		getProducts()
	}, [getProducts])

	return (
		<Background>
			<YStack
				style={[
					atoms.flex_1,
					atoms.pt_4,
					{
						backgroundColor: theme.colors.white
					}]}
			>
				<YStack gap={16}>
					{/* Header */}
					<XStack style={[atoms.px_4, atoms.justify_between]}>
						<Text style={[atoms.text_xl, atoms.font_bold]}>Discover</Text>
						<XStack gap={16}>
							<TouchableOpacity style={[
								atoms.h_9,
								atoms.w_9,
								atoms.justify_center,
								atoms.items_center,
								atoms.rounded_xl,
								{ backgroundColor: '#F3F4F6' }]}
							>
								<Text>
									<FontAwesomeFreeSolid name="bell" size={16} color={'#111827'} />
								</Text>
							</TouchableOpacity>
							<TouchableOpacity style={[
								atoms.h_9,
								atoms.w_9,
								atoms.justify_center,
								atoms.items_center,
								atoms.rounded_xl,
								{ backgroundColor: '#F3F4F6' }]}
							>
								<Text>
									<FontAwesomeFreeSolid name="shopping-cart" size={16} color={'#111827'} />
								</Text>
							</TouchableOpacity>
						</XStack>
					</XStack>

					{/* Search */}
					<View style={[atoms.px_4]}>
						<TextInput
							numberOfLines={1}
							placeholder="Search products, brands..."
							style={[
								atoms.h_10,
								atoms.rounded_xl,
								atoms.px_3,
								atoms.text_sm,
								{
									backgroundColor: '#F3F4F6'
								}
							]}
						/>
					</View>

					{/* Categories */}
					<FilterChipList filterChips={[]} />
				</YStack>

				{/* Products */}
				<FlatList
					data={products}
					style={[atoms.py_6, atoms.px_4]}
					numColumns={2}
					keyExtractor={(item) => item.id.toString()}
					columnWrapperStyle={[atoms.justify_between]}
					renderItem={({ item, index }) =>
						<ProductCard item={item} isRightItem={index % 2 === 1} />
					}
					ItemSeparatorComponent={<View style={[atoms.h_4]} />}
					contentContainerStyle={[atoms.pb_10]}
					ListEmptyComponent={<LoadingIndicator />}
				/>
			</YStack>
		</Background>
	);
};
