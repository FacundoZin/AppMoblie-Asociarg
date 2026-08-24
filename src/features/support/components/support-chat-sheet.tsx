import { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { Headset, SendHorizontal, X } from 'lucide-react-native';
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { radii, shape, spacing, useTheme } from '@/theme';
import { useSupportChat } from '../hooks';
import type { ChatMessage } from '../types';

/** Slide/fade duration shared by the entrance and exit runs. */
const SHEET_ANIMATION_DURATION_MS = 300;
/** Fraction of the window covered by the open sheet. */
const SHEET_HEIGHT_RATIO = 0.7;
/** Backdrop opacity multiplier applied to the `scrim` token. */
const BACKDROP_MAX_OPACITY = 0.5;

const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });

interface SupportChatSheetProps {
  /**
   * Parent-owned open state. The sheet stays mounted in the tabs layout and
   * animates from this flag; content is only rendered while a run is active
   * so the exit animation completes before anything unmounts.
   */
  visible: boolean;
  /**
   * Close request channel. Pressing the backdrop or the X asks the parent to
   * flip `visible` off; only after the outgoing animation finishes does the
   * sheet drop its content.
   */
  onDismiss: () => void;
}

export function SupportChatSheet({ visible, onDismiss }: SupportChatSheetProps) {
  const { colors } = useTheme();
  const { messages, contact, sendMessage, isClubTyping } = useSupportChat();
  const { height: windowHeight } = useWindowDimensions();
  const sheetHeight = Math.round(windowHeight * SHEET_HEIGHT_RATIO);

  const [isRendered, setIsRendered] = useState(false);
  const [draft, setDraft] = useState('');
  const progress = useSharedValue(0);
  // Latest onDismiss kept in a ref so the worklet callback never goes stale.
  const onDismissRef = useRef(onDismiss);
  // Guards the mount effect against the initial `visible === false` render.
  const wasOpenRef = useRef(false);

  useEffect(() => {
    onDismissRef.current = onDismiss;
  }, [onDismiss]);

  const finishClose = useCallback(() => {
    setIsRendered(false);
    onDismissRef.current();
  }, []);

  useEffect(() => {
    if (visible) {
      wasOpenRef.current = true;
      setIsRendered(true);
      progress.value = withTiming(1, {
        duration: SHEET_ANIMATION_DURATION_MS,
        easing: Easing.out(Easing.cubic),
      });
      return;
    }
    if (!wasOpenRef.current) {
      return;
    }
    wasOpenRef.current = false;
    progress.value = withTiming(
      0,
      { duration: SHEET_ANIMATION_DURATION_MS, easing: Easing.out(Easing.cubic) },
      () => {
        runOnJS(finishClose)();
      },
    );
  }, [visible, progress, finishClose]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: progress.value * BACKDROP_MAX_OPACITY,
  }));

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(progress.value, [0, 1], [sheetHeight, 0]) },
    ],
  }));

  const canSend = draft.trim().length > 0;

  const handleSend = () => {
    sendMessage(draft);
    setDraft('');
  };

  return (
    <View
      testID="support-chat-sheet-root"
      pointerEvents={isRendered ? 'auto' : 'none'}
      style={StyleSheet.absoluteFill}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Cerrar chat de soporte"
        onPress={onDismiss}
        style={StyleSheet.absoluteFill}
      >
        <Animated.View style={[styles.backdrop, backdropStyle, { backgroundColor: colors.scrim }]} />
      </Pressable>

      {isRendered && (
        <Animated.View style={[styles.sheet, sheetStyle, { height: sheetHeight, backgroundColor: colors.surfaceContainerLow }]}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'height' : undefined}
            style={styles.flex}
          >
            <View style={[styles.header, { borderBottomColor: colors.border }]}>
              <View style={[styles.avatar, { backgroundColor: colors.primaryContainer }]}>
                <Headset size={20} color={colors.onPrimaryContainer} />
              </View>
              <View style={styles.flex}>
                <Text style={[styles.contactName, { color: colors.onSurface }]}>{contact.name}</Text>
                <View style={styles.roleRow}>
                  <View style={[styles.onlineDot, { backgroundColor: colors.success }]} />
                  <Text style={[styles.contactRole, { color: colors.onSurfaceVariant }]}>
                    {contact.role}
                  </Text>
                </View>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Cerrar chat"
                onPress={onDismiss}
                hitSlop={spacing.sm}
                style={({ pressed }) => pressed && styles.pressed}
              >
                <X size={22} color={colors.onSurfaceVariant} />
              </Pressable>
            </View>

            {/* Inverted list anchors the newest message at the bottom without
                scroll-to-end bookkeeping; data is reversed once per render. */}
            <FlatList
              inverted
              data={[...messages].reverse()}
              keyExtractor={(message) => message.id}
              renderItem={({ item }) => <ChatBubble message={item} />}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.listContent}
            />

            <View style={styles.typingRow}>
              {isClubTyping && (
                <View style={[styles.typingBubble, { backgroundColor: colors.surfaceContainerHigh }]}>
                  <TypingDot delay={0} color={colors.onSurfaceVariant} />
                  <TypingDot delay={140} color={colors.onSurfaceVariant} />
                  <TypingDot delay={280} color={colors.onSurfaceVariant} />
                </View>
              )}
            </View>

            <View style={[styles.inputRow, { borderTopColor: colors.border }]}>
              <TextInput
                value={draft}
                onChangeText={setDraft}
                placeholder="Escribí un mensaje…"
                placeholderTextColor={colors.onSurfaceVariant}
                multiline
                style={[styles.input, { backgroundColor: colors.surfaceContainerHighest, color: colors.onSurface }]}
              />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Enviar mensaje"
                disabled={!canSend}
                onPress={handleSend}
                style={({ pressed }) => [
                  styles.sendButton,
                  { backgroundColor: canSend ? colors.primary : colors.surfaceContainerHigh },
                  canSend && pressed && styles.pressed,
                ]}
              >
                <SendHorizontal
                  size={18}
                  color={canSend ? colors.onPrimary : colors.onSurfaceVariant}
                />
              </Pressable>
            </View>
          </KeyboardAvoidingView>
        </Animated.View>
      )}
    </View>
  );
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const { colors } = useTheme();
  const isUser = message.author === 'user';

  return (
    <View style={[styles.bubbleContainer, isUser ? styles.bubbleEnd : styles.bubbleStart]}>
      <View
        style={[
          styles.bubble,
          isUser ? styles.bubbleTailRight : styles.bubbleTailLeft,
          { backgroundColor: isUser ? colors.primary : colors.surfaceContainerHigh },
        ]}
      >
        <Text style={[styles.bubbleText, { color: isUser ? colors.onPrimary : colors.onSurface }]}>
          {message.text}
        </Text>
      </View>
      <Text style={[styles.timestamp, { color: colors.onSurfaceVariant }]}>
        {formatTime(message.sentAt)}
      </Text>
    </View>
  );
}

function TypingDot({ delay, color }: { delay: number; color: string }) {
  const pulse = useSharedValue(0);

  useEffect(() => {
    pulse.value = withDelay(
      delay,
      withRepeat(
        withSequence(withTiming(1, { duration: 260 }), withTiming(0, { duration: 260 })),
        -1,
        false,
      ),
    );
  }, [delay, pulse]);

  const dotStyle = useAnimatedStyle(() => ({
    opacity: 0.35 + pulse.value * 0.65,
    transform: [{ translateY: -pulse.value * 3 }],
  }));

  return <Animated.View style={[styles.typingDot, dotStyle, { backgroundColor: color }]} />;
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: shape.extraLarge,
    borderTopRightRadius: shape.extraLarge,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactName: {
    fontSize: 15,
    fontWeight: '700',
  },
  roleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: radii.full,
  },
  contactRole: {
    fontSize: 12,
  },
  listContent: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  bubbleContainer: {
    maxWidth: '82%',
  },
  bubbleStart: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  bubbleEnd: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  bubble: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm + spacing.xs,
  },
  bubbleTailLeft: {
    borderTopLeftRadius: shape.large,
    borderTopRightRadius: shape.large,
    borderBottomRightRadius: shape.large,
    borderBottomLeftRadius: radii.sm,
  },
  bubbleTailRight: {
    borderTopLeftRadius: shape.large,
    borderTopRightRadius: shape.large,
    borderBottomRightRadius: radii.sm,
    borderBottomLeftRadius: shape.large,
  },
  bubbleText: {
    fontSize: 14,
    lineHeight: 20,
  },
  timestamp: {
    fontSize: 11,
    marginTop: spacing.xs,
  },
  typingRow: {
    minHeight: 36,
    justifyContent: 'center',
    paddingHorizontal: spacing.base,
  },
  typingBubble: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    gap: spacing.xs,
    borderRadius: radii.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: radii.full,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
    padding: spacing.sm + spacing.xs,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  input: {
    flex: 1,
    borderRadius: radii.full,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm + 2,
    paddingBottom: spacing.sm + 2,
    fontSize: 14,
    maxHeight: 96,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.85,
  },
});
