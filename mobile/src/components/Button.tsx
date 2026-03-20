import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { theme } from '../styles/theme';
import { atoms } from '../styles/atoms';

type IButtonProps = {
    bg?: string;
    textColor?: string;
    style?: ViewStyle | ViewStyle[];
} & React.ComponentProps<typeof TouchableOpacity>;

export default function Button({ style, bg, textColor, ...props }: IButtonProps) {
    return (
        <TouchableOpacity
            style={[
                atoms.py_3,
                atoms.rounded_xl,
                atoms.text_base,

                atoms.justify_center,
                atoms.items_center,
                {
                    backgroundColor: bg ?? theme.colors.cyan,
                },
                style
            ]}
            {...props}
        >
            <Text style={[
                atoms.font_bold,
                atoms.text_base,
                {
                    color: textColor ?? "#111827",
                    lineHeight: 24,
                }]}
            >
                {props.children}
            </Text>
        </TouchableOpacity>
    );
}
