import React from 'react';
import { Text, View } from 'react-native';
import FontAwesomeFreeSolid from '@react-native-vector-icons/fontawesome-free-solid';
import { atoms } from '../styles/atoms';

export default function Logo() {
    return (
        <View
            style={[
                atoms.rounded_full,
                atoms.h_16,
                atoms.w_16,
                atoms.items_center,
                atoms.justify_center,
                {
                    backgroundColor: '#0DF2F21A',
                }
            ]}
        >
            <Text>
                <FontAwesomeFreeSolid name="shopping-bag" size={32} color="#0DF2F2" />;
            </Text>
        </View>
    )
}