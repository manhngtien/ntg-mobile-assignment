import FontAwesomeFreeSolid from '@react-native-vector-icons/fontawesome-free-solid';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Image, ImageStyle, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Background } from '../components/Background';
import { XStack } from '../components/XStack';
import { YStack } from '../components/YStack';
import { useGetProductById } from '../features/product/hooks/use-get-product-by-id';
import { atoms } from '../styles/atoms';
import { theme } from '../styles/theme';
import { RootStackParamList } from '../types/app-navigation';

const features = [
  { label: 'Heart Rate', value: '72 bpm' },
  { label: 'Bluetooth', value: '5.2' },
  { label: 'Waterproof', value: 'Yes' },
  { label: 'Battery', value: '18 hrs' },
];

const reviews = [
  {
    name: 'John Doe',
    comment: 'Amazing watch with long battery life.',
  },
  {
    name: 'Jane Smith',
    comment: 'The sound quality is excellent and fits perfectly.',
  },
];

export const ProductDetailsScreen = () => {
  const route = useRoute();
  const { id } = route.params as RootStackParamList['ProductDetails'];
  const { goBack } = useNavigation();
  const { selectedProduct, getProductById } = useGetProductById();

  useEffect(() => {
    getProductById(id);
  }, [id, getProductById]);

  const handleBackPress = () => {
    goBack();
  };

  return (
    <Background>
      <View style={[atoms.flex_1, { backgroundColor: theme.colors.gray_50 }]}>
        {/* Header */}
        <View
          style={[
            atoms.flex_row,
            atoms.justify_between,
            atoms.items_center,
            atoms.p_4,
            {
              backgroundColor: theme.colors.white,
              borderBottomWidth: 1,
              borderBottomColor: theme.colors.gray_50,
            },
          ]}
        >
          <TouchableOpacity
            style={[atoms.h_10, atoms.w_10, atoms.justify_center, atoms.items_center]}
            onPress={handleBackPress}
          >
            <Text>
              <FontAwesomeFreeSolid name="chevron-left" size={20} color={theme.colors.dark_300} />
            </Text>
          </TouchableOpacity>
          <Text style={[atoms.text_lg, atoms.font_semibold, { color: theme.colors.dark_300 }]}>
            Product Details
          </Text>
          <TouchableOpacity
            style={[atoms.h_10, atoms.w_10, atoms.justify_center, atoms.items_center]}
            onPress={() => {}}
          >
            <Text>
              <FontAwesomeFreeSolid name="share" size={20} color={theme.colors.dark_300} />
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{
            backgroundColor: theme.colors.white,
          }}
        >
          <YStack
            gap={16}
            style={[
              {
                backgroundColor: theme.colors.gray_100,
                paddingBottom: 96,
              },
            ]}
          >
            <View
              style={[
                atoms.rounded_xl,
                {
                  backgroundColor: theme.colors.white,
                },
              ]}
            >
              <View
                style={{
                  height: 350,
                }}
              >
                <Image
                  source={{
                    uri: selectedProduct?.image,
                  }}
                  style={[atoms.w_full as ImageStyle, atoms.flex_1 as ImageStyle]}
                  resizeMode="cover"
                />
              </View>

              <YStack gap={8} style={[atoms.px_4, atoms.py_6]}>
                <Text style={[atoms.text_xl2, atoms.font_bold]}>{selectedProduct?.name}</Text>
                <XStack gap={8} style={[atoms.items_end]}>
                  <Text style={[atoms.text_xl3, atoms.font_bold]}>${selectedProduct?.price}</Text>
                  <Text
                    style={[
                      atoms.text_lg,
                      { textDecorationLine: 'line-through', color: theme.colors.gray_400 },
                    ]}
                  >
                    ${selectedProduct?.price ?? 0 + 100}
                  </Text>
                </XStack>
              </YStack>
            </View>

            {/* Key Features */}
            <YStack
              style={[
                atoms.px_4,
                atoms.py_6,
                atoms.rounded_xl,
                {
                  backgroundColor: theme.colors.white,
                },
              ]}
            >
              <Text style={[atoms.font_bold, atoms.text_lg]}>Key Features</Text>
              <View style={[atoms.flex_row, atoms.flex_wrap]}>
                {features.map((item, index) => (
                  <YStack
                    key={index}
                    style={[
                      atoms.mt_4,
                      atoms.p_3,
                      atoms.rounded_xl,
                      atoms.border_sm,
                      {
                        width: '48%',
                        backgroundColor: theme.colors.gray_100,
                        marginRight: index % 2 === 0 ? '4%' : 0,
                        borderColor: theme.colors.gray_50,
                      },
                    ]}
                  >
                    <Text style={[atoms.text_xs, { color: theme.colors.gray_500 }]}>
                      {item.label}
                    </Text>
                    <Text style={[atoms.font_bold]}>{item.value}</Text>
                  </YStack>
                ))}
              </View>
            </YStack>

            {/* Description */}
            <YStack
              gap={12}
              style={[
                atoms.rounded_xl,
                atoms.py_6,
                atoms.px_4,
                {
                  backgroundColor: theme.colors.white,
                },
              ]}
            >
              <Text style={[atoms.font_semibold, atoms.text_lg]}>Product Description</Text>
              <Text style={[{ color: theme.colors.dark_200 }]}>{selectedProduct?.description}</Text>
              <TouchableOpacity>
                <Text style={[atoms.font_semibold, atoms.text_sm, { color: theme.colors.cyan }]}>
                  Read more...
                </Text>
              </TouchableOpacity>
            </YStack>
          </YStack>
        </ScrollView>

        {/* Bottom Buttons */}
        <View
          style={[
            atoms.flex_row,
            atoms.p_4,
            {
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: '#fff',
              borderTopColor: theme.colors.gray_50,
              borderTopWidth: 1,
            },
          ]}
        >
          <XStack gap={16} style={[atoms.flex_1]}>
            <TouchableOpacity
              style={[
                atoms.flex_1,
                atoms.items_center,
                atoms.p_3,
                atoms.rounded_xl,
                atoms.border_md,
                { borderColor: theme.colors.cyan },
              ]}
            >
              <Text style={[atoms.font_semibold, { color: theme.colors.cyan }]}>Add to Cart</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                atoms.flex_1,
                atoms.items_center,
                atoms.p_3,
                atoms.rounded_xl,
                { backgroundColor: theme.colors.cyan },
              ]}
            >
              <Text style={[atoms.font_semibold, { color: theme.colors.black }]}>Buy Now</Text>
            </TouchableOpacity>
          </XStack>
        </View>
      </View>
    </Background>
  );
};
