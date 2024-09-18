import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Container, LoginContainer, Column, Spacing, Title } from "./styles";
import { defaultValues, IFormLogin } from "./types";
import { useState } from "react";

const schema = yup
  .object({
    email: yup.string()
              .email("E-mail inválido")
              .required("Campo obrigatório"),
    password: yup.string()
                  .min(6, "No mínimo 6 caracteres")
                  .required("Campo obrigatório"),
  })
  .required();

const Login = () => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<IFormLogin>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues,
    reValidateMode: "onChange",
  });

  const [loginError, setLoginError] = useState("");

  const onSubmit = async (data: IFormLogin) => {
    try {
      const response = await fetch('http://localhost:5000/users');
      const users = await response.json();
      
      const user = users.find((user: any) => user.email === data.email && user.password === data.password);
      
      if (user) {
        
        alert(`Login bem-sucedido, ${user.name}`);
        setLoginError(""); 
      } else {
        
        setLoginError("E-mail ou senha inválidos");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setLoginError("Erro ao conectar ao servidor");
    }
  };

  return (
    <Container>
      <LoginContainer>
        <Column>
          <Title>Login</Title>
          {loginError && <div style={{ color: 'red' }}>{loginError}</div>}
          <Spacing />
          <Input
            name="email"
            placeholder="Email"
            control={control}
            errorMessage={errors?.email?.message}
          />
          <Spacing />
          <Input
            name="password"
            type="password"
            placeholder="Senha"
            control={control}
            errorMessage={errors?.password?.message}
          />
          <Spacing />
          <Button 
            title="Entrar" 
            onClick={handleSubmit(onSubmit)} 
            disabled={!isValid} 
          />
        </Column>
      </LoginContainer>
    </Container>
  );
};

export default Login;