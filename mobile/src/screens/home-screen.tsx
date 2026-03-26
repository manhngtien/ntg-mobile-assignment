import { atoms } from '../styles/atoms';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ProductCard } from '../components/ProductCard';
import { theme } from '../styles/theme';
import { Background } from '../components/Background';
import { XStack } from '../components/XStack';
import { YStack } from '../components/YStack';
import FontAwesomeFreeSolid from '@react-native-vector-icons/fontawesome-free-solid';
import { useEffect } from 'react';
import { FilterChipList } from '../components/FilterChipList';
import { useGetProducts } from '../features/product/hooks/use-get-products';
import { useState } from 'react';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { useGetCategories } from '../features/product/hooks/use-get-categories';

interface HomeScreenProps {
	navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
	const { loading, products, getProducts } = useGetProducts();
	const { categories } = useGetCategories();
	const [selectedCategory, setSelectedCategory] = useState<string>('');

	useEffect(() => {
		getProducts(selectedCategory)
	}, [selectedCategory])

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
								{ backgroundColor: theme.colors.gray_50 }]}
							>
								<Text>
									<FontAwesomeFreeSolid name="bell" size={16} color={theme.colors.dark_200} />
								</Text>
							</TouchableOpacity>
							<TouchableOpacity style={[
								atoms.h_9,
								atoms.w_9,
								atoms.justify_center,
								atoms.items_center,
								atoms.rounded_xl,
								{ backgroundColor: theme.colors.gray_50 }]}
							>
								<Text>
									<FontAwesomeFreeSolid name="shopping-cart" size={16} color={theme.colors.dark_200} />
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
									backgroundColor: theme.colors.gray_50
								}
							]}
						/>
					</View>

					{/* Categories */}
					<FilterChipList
						filterChips={categories}
						handleChipPress={(x) => setSelectedCategory(x)}
					/>
				</YStack>

				{/* Products */}
				<FlatList
					data={products}
					style={[atoms.py_6, atoms.px_4]}
					numColumns={2}
					keyExtractor={(item) => item.id.toString()}
					columnWrapperStyle={[atoms.justify_between]}
					renderItem={({ item }) =>
						<ProductCard item={item} />
					}
					ItemSeparatorComponent={<View style={[atoms.h_4]} />}
					contentContainerStyle={[atoms.pb_10]}
					ListEmptyComponent={
						loading ?
							<LoadingIndicator /> :
							(<YStack style={[atoms.pt_10, atoms.items_center]}>
								<Text>No products found</Text>
							</YStack>)
					}
				/>
			</YStack>
		</Background>
	);
};
