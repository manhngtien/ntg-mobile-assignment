import FontAwesomeFreeSolid from '@react-native-vector-icons/fontawesome-free-solid';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ImageStyle, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Background } from '../components/Background';
import { XStack } from '../components/XStack';
import { YStack } from '../components/YStack';
import { atoms } from '../styles/atoms';
import { theme } from '../styles/theme';

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
  const { goBack } = useNavigation();

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
                    uri: 'https://images.unsplash.com/photo-1774423864905-dd93b4ca6fca?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  }}
                  style={[atoms.w_full as ImageStyle, atoms.flex_1 as ImageStyle]}
                  resizeMode="cover"
                />
              </View>

              <YStack gap={8} style={[atoms.px_4, atoms.py_6]}>
                <Text style={[atoms.text_xl2, atoms.font_bold]}>Quantum Pro Smartwatch</Text>
                <XStack gap={8} style={[atoms.items_end]}>
                  <Text style={[atoms.text_xl3, atoms.font_bold]}>$299.00</Text>
                  <Text
                    style={[
                      atoms.text_lg,
                      { textDecorationLine: 'line-through', color: theme.colors.gray_400 },
                    ]}
                  >
                    $349.00
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
              <Text style={[{ color: theme.colors.dark_200 }]}>
                Experience the future on your wrist. The Quantum Pro Smartwatch combines sleek
                design with cutting-edge technology.
              </Text>
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
