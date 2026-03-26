import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { theme } from '../styles/theme';
import { atoms } from '../styles/atoms';

type IButtonProps = {
    loading?: boolean;
    bg?: string;
    textColor?: string;
    style?: ViewStyle | ViewStyle[];
} & React.ComponentProps<typeof TouchableOpacity>;

export function Button({ style, bg, textColor, loading, ...props }: IButtonProps) {
    return (
        <TouchableOpacity
            disabled={loading}
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
            {
                loading ?
                    <ActivityIndicator
                        color={theme.colors.dark_200}
                        size={24}
                    /> :
                    <Text style={[
                        atoms.font_bold,
                        atoms.text_base,
                        {
                            color: textColor ?? theme.colors.dark_200,
                            lineHeight: 24,
                        }]}
                    >
                        {props.children}
                    </Text>
            }
        </TouchableOpacity>
    );
}
