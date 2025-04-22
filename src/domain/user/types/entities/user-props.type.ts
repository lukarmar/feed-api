import { BaseEntityProps } from "@core/domain";

export interface UserProps extends BaseEntityProps {
  name: string; 
  email: string;
  password: string;
}