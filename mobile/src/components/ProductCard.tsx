import FontAwesomeFreeSolid from '@react-native-vector-icons/fontawesome-free-solid';
import { useNavigation } from '@react-navigation/native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Product } from '../models/product';
import { atoms } from '../styles/atoms';
import { theme } from '../styles/theme';
import { AppNavigation } from '../types/app-navigation';
import { XStack } from './XStack';
import { YStack } from './YStack';

type ProductCardProps = {
  item: Product;
  isRightItem?: boolean;
};

export const ProductCard = ({ item }: ProductCardProps) => {
  const { navigate } = useNavigation<AppNavigation>();
  const onPress = () => {
    navigate('ProductDetails', { id: 1 });
  };

  return (
    <YStack gap={12} style={{ width: '48%' }}>
      <TouchableOpacity style={[atoms.flex_1]} onPress={onPress}>
        <View>
          <Image source={{ uri: item.image }} style={{ height: 214, borderRadius: 12 }} />
          <TouchableOpacity
            style={[
              atoms.shadow_xs,
              atoms.rounded_full,
              atoms.w_7,
              atoms.h_7,
              atoms.justify_center,
              atoms.items_center,
              {
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: theme.colors.white_80,
              },
            ]}
          >
            <Text>
              <FontAwesomeFreeSolid name="heart" size={14} color={theme.colors.gray_600} />
            </Text>
          </TouchableOpacity>
        </View>

        <YStack gap={4}>
          <YStack>
            <Text
              numberOfLines={1}
              style={[atoms.text_sm, atoms.font_medium, { color: theme.colors.dark_200 }]}
            >
              {item.name}
            </Text>
            <Text numberOfLines={1} style={[atoms.text_xs, { color: theme.colors.gray_500 }]}>
              {item.category}
            </Text>
          </YStack>

          <XStack style={[atoms.justify_between]}>
            <XStack gap={4} style={[atoms.h_6, atoms.items_end]}>
              <Text style={[atoms.text_base, atoms.font_bold, { color: theme.colors.dark_200 }]}>
                ${item.price.toFixed(2)}
              </Text>
              {/* TODO: oldPrice handling code */}
              {/* {item.oldPrice && (
              <Text style={[
                atoms.text_xs2,
                { lineHeight: 20, color: theme.colors.gray_400, textDecorationLine: 'line-through' }
              ]}>
                ${item.oldPrice.toFixed(2)}
              </Text>
            )} */}
            </XStack>
            <TouchableOpacity
              style={[
                atoms.h_8,
                atoms.w_8,
                atoms.shadow_xs,
                atoms.justify_center,
                atoms.items_center,
                atoms.rounded_xl,
                { backgroundColor: theme.colors.cyan },
              ]}
            >
              <Text style={[]}>
                <FontAwesomeFreeSolid name="plus" size={14} color={theme.colors.black} />
              </Text>
            </TouchableOpacity>
          </XStack>
        </YStack>
      </TouchableOpacity>
    </YStack>
  );
};
