export class CreateUserDto {
  nick: string;
  email: string;
  password: string;
  avatar?: string;
  image?: string;
  age?: number;
  chips?: number;
  country?: string;
}
