import * as React from 'react';
import { atoms } from '../styles/atoms';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { XStack } from '../components/XStack';

interface FilterChipListProps {
  filterChips: string[];
}

export function FilterChipList({
  filterChips,
}: FilterChipListProps) {
  const [selectedChipIdx, setSelectedChipIdx] = React.useState(0);

  // TODO
  const handleChipPress = (index: number) => {
    setSelectedChipIdx(index);
  };

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
        {filterChips.map((item, index) => (
          <TouchableOpacity
            key={item}
            style={[
              atoms.rounded_2xl,
              atoms.px_4,
              atoms.py_2,
              {
                backgroundColor: index === selectedChipIdx ? '#00C2C7' : '#F9FAFB'
              }
            ]}
            onPress={() => setSelectedChipIdx(index)}
          >
            <Text
              style={[
                atoms.text_sm,
                index === selectedChipIdx ? atoms.font_semibold : atoms.font_medium,
                {
                  color: index === selectedChipIdx ? '#111827' : '#4B5563',
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
