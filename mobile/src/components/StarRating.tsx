import FontAwesomeFreeSolid from '@react-native-vector-icons/fontawesome-free-solid';
import { Text } from 'react-native';
import { atoms } from '../styles/atoms';
import { theme } from '../styles/theme';
import { XStack } from './XStack';

type StarRatingProps = {
  rating: number;
};

export function StarRating({ rating }: StarRatingProps) {
  const fullStars = Math.floor(rating);

  const getStarColor = (index: number) => {
    if (index < fullStars) {
      return theme.colors.yellow;
    } else {
      return theme.colors.gray_200;
    }
  };

  return (
    <XStack style={[atoms.items_center]}>
      <FontAwesomeFreeSolid name="star" size={14} color={getStarColor(0)} />
      <FontAwesomeFreeSolid name="star" size={14} color={getStarColor(1)} />
      <FontAwesomeFreeSolid name="star" size={14} color={getStarColor(2)} />
      <FontAwesomeFreeSolid name="star" size={14} color={getStarColor(3)} />
      <FontAwesomeFreeSolid name="star" size={14} color={getStarColor(4)} />
      <Text style={{ marginLeft: 4, lineHeight: 16, color: theme.colors.gray_500 }}>{rating}</Text>
    </XStack>
  );
}
