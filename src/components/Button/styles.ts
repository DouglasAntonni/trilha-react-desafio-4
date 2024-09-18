// styles.ts
import styled from 'styled-components';

interface ButtonContainerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}



export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100%;
  height: 42px;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#81259D")};
  color: ${({ disabled }) => (disabled ? "#666" : "#FFF")};
  border: 1px solid ${({ disabled }) => (disabled ? "#ccc" : "#81259D")};
  border-radius: 21px;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.3s;

  &:hover {
    opacity: ${({ disabled }) => (disabled ? 0.6 : 0.8)};
  }
`;