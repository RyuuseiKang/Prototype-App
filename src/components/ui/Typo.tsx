import styled from 'styled-components/native';
import {Animated} from 'react-native';

export type TextProps = {
  color?: string;
  align?: string;
};

const Regular = styled(Animated.Text)<TextProps>`
  font-family: 'Pretendard-Regular';

  color: ${({color, theme}) => color || theme.colors.TEXT};
  text-align: ${({align}) => align || 'left'};
`;

const Medium = styled(Animated.Text)<TextProps>`
  font-family: 'Pretendard-Medium';

  color: ${({color, theme}) => color || theme.colors.TEXT};
  text-align: ${({align}) => align || 'left'};
`;

const SemiBold = styled(Animated.Text)<TextProps>`
  font-family: 'Pretendard-SemiBold';

  color: ${({color, theme}) => color || theme.colors.TEXT};
  text-align: ${({align}) => align || 'left'};
`;

const Bold = styled(Animated.Text)<TextProps>`
  font-family: 'Pretendard-Bold';

  color: ${({color, theme}) => color || theme.colors.TEXT};
  text-align: ${({align}) => align || 'left'};
`;

const ExtraBold = styled(Animated.Text)<TextProps>`
  font-family: 'Pretendard-ExtraBold';

  color: ${({color, theme}) => color || theme.colors.TEXT};
  text-align: ${({align}) => align || 'left'};
`;


const PR11 = styled(Regular)`
  font-size: 11px;
`;

const PR12 = styled(Regular)`
  font-size: 12px;
`;

const PR14 = styled(Regular)`
  font-size: 14px;
`;

const PR15 = styled(Regular)`
  font-size: 15px;
`;

const PM13 = styled(Medium)`
  font-size: 13px;
`;

const PB12 = styled(Bold)`
  font-size: 12px;
`;

const PB16 = styled(Bold)`
  font-size: 16px;
`;

const PSB12 = styled(SemiBold)`
  font-size: 12px;
`;

const PSB14 = styled(SemiBold)`
  font-size: 14px;
`;

const PSB16 = styled(SemiBold)`
  font-size: 16px;
`;

const PSB20 = styled(SemiBold)`
  font-size: 20px;
`;

const PB26 = styled(Bold)`
  font-size: 26px;
`;

export {PR11, PR12, PR14, PR15, PM13, PB12, PB16, PSB12, PSB14, PSB16, PSB20, PB26};
