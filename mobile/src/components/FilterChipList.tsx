import * as React from 'react';
import { atoms } from '../styles/atoms';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { XStack } from '../components/XStack';
import { theme } from '../styles/theme';

interface FilterChipListProps {
  filterChips: string[];
  handleChipPress: (category: string) => void
}

export function FilterChipList({
  filterChips,
  handleChipPress
}: FilterChipListProps) {
  const [selectedChip, setSelectedChip] = React.useState('');

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <XStack
        gap={12}
        style={[
          atoms.pb_3,
          atoms.px_4,
          { borderBottomWidth: 2, borderBottomColor: theme.colors.gray_50 }
        ]}
      >
        {filterChips.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              atoms.rounded_2xl,
              atoms.px_4,
              atoms.py_2,
              {
                backgroundColor: item === selectedChip ? theme.colors.teal : theme.colors.gray_100
              }
            ]}
            onPress={() => {
              if (item === selectedChip) {
                setSelectedChip('')
                handleChipPress('')
              }
              else {
                setSelectedChip(item)
                handleChipPress(item)
              }
            }}
          >
            <Text
              style={[
                atoms.text_sm,
                item === selectedChip ? atoms.font_semibold : atoms.font_medium,
                {
                  color: item === selectedChip ? theme.colors.dark_200 : theme.colors.gray_600,
                }
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </XStack>
    </ScrollView>
  );
};
