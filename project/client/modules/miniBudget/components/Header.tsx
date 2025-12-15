import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useStyleContext } from '../../../core/services/providers/styleProvider';
import { View, Text } from '../../../core/ui/components/interfaceComponents';
import { useNavigation } from '../../../core/services/hooks/navigationAdapter';
import Svg, { Path } from "react-native-svg";

interface HeaderProps {
    title: string;
    action?: {
        icon: string; // Emoji or text for now
        onPress: () => void;
    };
    showBackButton?: boolean;
}

export function Header({ title, action, showBackButton = true }: HeaderProps) {
    const { theme } = useStyleContext();
    const navigation = useNavigation();

    const styles = useMemo(() => StyleSheet.create({
        content: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: theme?.tokens.sizes.spacing.lg,
            paddingVertical: theme?.tokens.sizes.spacing.sm,
            minHeight: 50,
        },
        leftContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme?.tokens.sizes.spacing.md,
        },
        title: {
            textShadowColor: theme?.tokens.colors.primary,
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 10,
            fontWeight: 'bold',
        },
        backButton: {
            padding: theme?.tokens.sizes.spacing.xs,
            justifyContent: 'center',
            alignItems: 'center',
        }
    }), [theme]);

    if (!theme) return null;

    return (
        <View style={styles.content}>
            <View style={styles.leftContainer}>
                {showBackButton && (
                    <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
                        <ArrowLeft size={28} color={theme.tokens.colors.primary} />
                    </TouchableOpacity>
                )}
                <Text style={styles.title} variant="title" colorVariant={'secondary'}>{title}</Text>
            </View>
            {action && (
                <TouchableOpacity onPress={action.onPress}>
                    <Text variant={'subtitle'}>{action.icon}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export const ArrowLeft = ({ size = 24, color = "#000" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M14 5L7 12L14 19"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

