import { View, Image, StyleSheet } from 'react-native';
import { Text } from './text';
import { radii } from '@/theme';
import { useTheme } from '@/theme';

type AvatarSize = 'sm' | 'md' | 'lg';

interface AvatarProps {
  uri?: string;
  initials?: string;
  size?: AvatarSize;
}

const sizeConfig: Record<AvatarSize, { width: number; height: number; fontSize: number }> = {
  sm: { width: 36, height: 36, fontSize: 13 },
  md: { width: 48, height: 48, fontSize: 16 },
  lg: { width: 64, height: 64, fontSize: 22 },
};

export function Avatar({ uri, initials, size = 'md' }: AvatarProps) {
  const { colors } = useTheme();
  const config = sizeConfig[size];

  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={[styles.avatar, { width: config.width, height: config.height }]}
      />
    );
  }

  return (
    <View
      style={[
        styles.avatar,
        { backgroundColor: colors.primaryContainer },
        { width: config.width, height: config.height },
      ]}
    >
      <Text
        variant="base"
        weight="semibold"
        color={colors.onPrimaryContainer}
        style={{ fontSize: config.fontSize }}
      >
        {initials || '?'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: radii.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
