import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { atoms } from "../styles/atoms";
import FontAwesomeFreeSolid from "@react-native-vector-icons/fontawesome-free-solid";
import { YStack } from "./YStack";
import { XStack } from "./XStack";
import { theme } from "../styles/theme";

type ProductCardProps = {
  item: any;
  isRightItem?: boolean;
};

export const ProductCard = ({ item, isRightItem = false }: ProductCardProps) => {
  return (
    <YStack gap={12} style={[atoms.flex_1, isRightItem ? { marginLeft: 8 } : { marginRight: 8 }]}>
      <View>
        <Image source={{ uri: item.image }} style={{ height: 214, borderRadius: 12 }} />
        <TouchableOpacity style={[
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
            backgroundColor: '#FFFFFFCC',
          }]}
        >
          <Text>
            <FontAwesomeFreeSolid name="heart" size={14} color="#4B5563" />
          </Text>
        </TouchableOpacity>
      </View>

      <YStack gap={4}>
        <YStack>
          <Text style={[
            atoms.text_sm,
            atoms.font_medium,
            { color: '#111827' }
          ]}>
            {item.title}
          </Text>
          <Text
            style={[
              atoms.text_xs,
              { color: '#6B7280' }
            ]}
          >
            {item.category}
          </Text>
        </YStack>

        <XStack style={[atoms.justify_between]}>
          <XStack gap={4} style={[atoms.h_6, atoms.items_end]}>
            <Text style={[
              atoms.text_base,
              atoms.font_bold,
              { color: '#111827' }]}
            >
              ${item.price.toFixed(2)}
            </Text>
            {item.previousPrice && (
              <Text style={[
                atoms.text_xs2,
                { lineHeight: 20, color: '#9CA3AF', textDecorationLine: 'line-through' }
              ]}>
                ${item.previousPrice.toFixed(2)}
              </Text>
            )}
          </XStack>
          <TouchableOpacity
            style={[
              atoms.h_8,
              atoms.w_8,
              atoms.shadow_xs,
              atoms.justify_center,
              atoms.items_center,
              atoms.rounded_xl,
              { backgroundColor: '#0DF2F2' }]}
          >
            <Text style={[]}>
              <FontAwesomeFreeSolid name="plus" size={14} color={theme.colors.black} />
            </Text>
          </TouchableOpacity>
        </XStack>
      </YStack>
    </YStack>
  );
};
