import styled from 'styled-components/native';

const Spacer = styled.View<{height?: number; width?: number}>`
  height: ${({height}) => height || 0}px;
  width: ${({width}) => width || 0}px;
`;

export default Spacer;
