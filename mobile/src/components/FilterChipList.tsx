import * as React from 'react';
import { atoms } from '../styles/atoms';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { XStack } from '../components/XStack';

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
          { borderBottomWidth: 2, borderBottomColor: '#F3F4F6' }
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
                backgroundColor: item === selectedChip ? '#00C2C7' : '#F9FAFB'
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
                  color: item === selectedChip ? '#111827' : '#4B5563',
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
