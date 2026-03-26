import { theme } from '../styles/theme';
import React from 'react';
import { View, Text, TextInput as Input, StyleSheet, TextStyle, ViewStyle } from 'react-native';

type ITextInputProps = {
    label?: string;
    errorText?: string;
    description?: string;
} & React.ComponentProps<typeof Input>;

export function TextInput({
    label,
    errorText,
    description,
    ...props
}: ITextInputProps) {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <Input style={styles.input} {...props} />
            {description && !errorText ? (
                <Text style={styles.description}>{description}</Text>
            ) : null}
            {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
        </View>
    );
}

type ITexInputStyles = {
    label: TextStyle;
    container: ViewStyle;
    input: ViewStyle;
    description: TextStyle
    error: TextStyle;
};

const styles = StyleSheet.create<ITexInputStyles>({
    label: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '500',
        marginBottom: 4,
        color: theme.colors.gray_700
    },
    container: {
        width: '100%',
    },
    input: {
        backgroundColor: theme.colors.white,
        borderColor: theme.colors.gray_200,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
        borderWidth: 1,
    },
    description: {
        fontSize: 13,
        color: theme.colors.gray_500,
        paddingTop: 8,
    },
    error: {
        fontSize: 13,
        color: theme.colors.gray_500,
        paddingTop: 8,
    },
});
