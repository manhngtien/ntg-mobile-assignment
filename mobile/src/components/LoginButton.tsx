import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { theme } from '../styles/theme';

type ILoginButtonProps = {
    bg?: string;
    style?: ViewStyle | ViewStyle[];
    children: React.ReactNode;
    isTouchable?: boolean;
};

// TODO: Refactor this component to be more reusable and customizable => Merge it with Button
export default function LoginButton({
    bg = theme.colors.white,
    style,
    children,
    isTouchable = true
}: ILoginButtonProps) {
    const styles = StyleSheet.create({
        button: {
            display: 'flex',
            backgroundColor: bg,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 12,
        },
        text: {
            fontSize: 14,
            lineHeight: 20,
            color: '#000',
            fontWeight: '500',
        },
    });

    return (
        <TouchableOpacity
            activeOpacity={isTouchable ? 0.7 : 1}
            style={[styles.button, style]}
        >
            <Text style={styles.text}>
                {children}
            </Text>
        </TouchableOpacity>
    );
}
